import Store from '../redux';
import Config from '../../config.js';
import Network from '../../util/network';
import braintree from 'braintree-web';
function getState() {
    return Store.getState().paymentRecord;
}

function paypalPayment(paymentRecord, onErr, onSucc) {
    Network.ajaxApi('payment', 'post', paymentRecord, onErr, onSucc);
}

function braintreePayment(paymentRecord, creditCard, onErr, onSucc) {
    braintree.client.create({
        authorization: Config.BRAINTREE_CLIENT_AUTHORIZATION
    }, function (err, client) {
        client.request({
            endpoint: 'payment_methods/credit_cards',
            method: 'post',
            data: {
                creditCard: {
                    number: '4111111111111111',
                    expirationDate: '10/20',
                    cvv: '123'
                }
            }
        }, function (err, response) {
            // Send response.creditCards[0].nonce to your server
            console.log('braintreePayment, done', response);
            paymentRecord.nonce = response.creditCards[0].nonce;
            Network.ajaxApi('payment', 'post', paymentRecord, onErr, onSucc);
        });
    });
}

function createPayment(name, phone, currency, price, payment, holderName, cardNum, ccv, exp, onErr, onSucc) {
    var paymentRecord = { name, phone, currency, price, payment }
    var creditCard = {
        number: cardNum,
        expirationDate: exp,
        cvv: ccv,
        billingAddress: {
            postalCode: '518000'
        }
    }
    switch (payment) {
        case 'braintree':
            braintreePayment(paymentRecord, creditCard, onErr, onSucc);
            break;
        case 'paypal':
            paypalPayment(paymentRecord, onErr, onSucc);
            break;
    }
}

function downloadAllRecord(onError, onSucc) {
    Network.ajaxApi('get_all_record', 'get', {}, onError, (response) => {
        console.log('downloadAllRecord', response);
        Store.dispatch({ type: 'PAYMENT_RECORD_INIT', payload: { records: response.records } })
        if (onSucc) {
            onSucc();
        }
    });
}

function getAllRecord() {
    return getState().records;
}
function getAllValidRecord() {
    var records = getAllRecord();
    return records ?
        records.filter((r) => {
            return r.refNum;
        }) :
        [];
}
export default {
    createPayment,
    downloadAllRecord,
    getAllRecord,
    getAllValidRecord
}