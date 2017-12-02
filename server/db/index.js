/**
 * it is a data access object to handle the redis io
 */
import redis from 'redis';
import bluebird, {
    Promise,
    reject
} from 'bluebird';


const ALL_PAYMENT_RECORD_KEY = "all_payment_record";
const LAST_UPDATE_KEY = "last_update";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient();
redisClient.select(1);

redisClient.on('error', (err) => {
    console.error("redisClient error");
    console.error(err);
})

var saveDbScheduleJobId = null;

/**
 * it will back up the redis every ${freq} min
 * if the schedule job have been start, the job will be stoped before the new job start
 * @param {number} freq the frequency of backup, unit is ms, default value is 5 min
 */
function startScheduleBackup(freq = 5 * 60 * 1000) {
    if (saveDbScheduleJobId === null) {
        stopScheduleBackup()
    }
    saveDbScheduleJobId = setInterval(() => {
        redisClient.save()
    }, freq);
}

/**
 * stop the redis back up schedule job
 */
function stopScheduleBackup() {
    if (saveDbScheduleJobId !== null) {
        clearInterval(saveDbScheduleJobId);
    }
}
/**
 * it is a function to generate the record key
 * @param {string} name the customer name
 * @param {string|number} refNum the reference number of payment
 * @param {string} payment the payment method
 */
function genRecordKey(name, payment, currTime) {
    return `record:${currTime}:${name}:${payment}`;
}

/**
 * it is a async function to add the payment record to redis
 * @param {object} record 
 * @return {Promise} reject if any err or no replies, resolve with {replies,recordKey}
 */
async function addPaymentRecord(record) {
    var currTime = new Date().getTime()
    const recordKey = genRecordKey(record.name, record.payment, currTime);
    var multi = redisClient.multi();
    multi.lpush(ALL_PAYMENT_RECORD_KEY, recordKey);
    multi.hmset(recordKey, record);
    multi.set(LAST_UPDATE_KEY, currTime);
    // return multi.execAsync();
    return new Promise((resolve, reject) => {
        multi.exec((err, replies) => {

            if (err || !replies) {
                reject(err);
            } else {
                resolve({
                    replies,
                    recordKey
                });
                redisClient.save();
            }
        })
    })
}

/**
 * it is an async function to get all payment record
 * @return {Promise} reject if any err, resolve with the array of records
 */
async function getAllRecord() {
    return new Promise((resolve, reject) => {
        redisClient.lrange(ALL_PAYMENT_RECORD_KEY, 0, -1, (err, keyList) => {

            if (err || !keyList) {
                reject(err);
            } else {

                var multi = redisClient.multi();
                for (var i = 0; i < keyList.length; i++) {
                    multi.hgetall(keyList[i])
                }
                multi.exec((err, replies) => {

                    if (err || !replies) {
                        reject(err)
                    } else {
                        resolve(replies);
                    }
                });
            }
        });
    })
}
/**
 * it is an sync function to get the record 
 * @param {string} recordKey 
 * @return {Promise} resovle with the data, reject if error
 */
async function getRecord(recordKey) {
    return new Promise((resolve, reject) => {
        redisClient.hgetall(recordKey, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
/**
 * it is an sync function to get the record 
 * @return {Promise} resovle with the data, reject if error
 */
async function getLastUpdate() {
    return new Promise((resolve, reject) => {
        redisClient.get(LAST_UPDATE_KEY, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

async function updateRefNum(recordKey, refNum) {
    console.log(`updateRefNum, recordKey:${recordKey}, refNum: ${refNum}`);
    return new Promise((resolve, reject) => {
        redisClient.hmset(recordKey, { refNum }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
                redisClient.save();
            }
        });
    })
}

async function testHset() {
    return new Promise(async (resovle, reject) => {
        var key = 'record:1512181020548:Tom:paypal', refNum = 'aaaa';

        var record = await getRecord(key);
        console.log('record', record);
        redisClient.hmset(key, { refNum }, (err, data) => {
            console.log('data', data);
            resovle()
        })

    });

}

export default {
    startScheduleBackup,
    stopScheduleBackup,
    addPaymentRecord,
    getAllRecord,
    getRecord,
    getLastUpdate,
    updateRefNum,
    testHset
}