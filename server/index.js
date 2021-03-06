import express from 'express';
import ServerConfig from './ServerConfig';
import DbObject from './db';
import bodyParser from 'body-parser'
import Validation from './validation';
import Paypal from './payment/paypal';
import Braintree from './payment/braintree';
import path from 'path';
import SocketIO from './socketio';
import http from 'http';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

function responseError(res, errors, tag) {
    if (tag) {
        console.error(tag);
    }
    console.error(errors);
    res.send({
        status: -1,
        errors
    });
}

function successApiResponse(res, object) {
    object.status = 1;
    res.send(object);
}

app.get(`${ServerConfig.apiSubPath}/get_all_record`, async (req, res) => {
    try {
        var records = await DbObject.getAllRecord();
        var lastUpdateTime = await DbObject.getLastUpdate();
        successApiResponse(res, { records, lastUpdateTime })
    } catch (err) {
        responseError(res, err, 'get_all_record')
    }
})

async function paypalPayment(req, res) {
    // console.log(`add_record, req.body: ${JSON.stringify(req.body)}`);
    var { recordKey } = await DbObject.addPaymentRecord(req.body);
    var host = req.get('host');
    var successUrl = `http://${host}${ServerConfig.paypalSubPath}/success/${encodeURIComponent(recordKey)}/paypal`;
    var failUrl = `http://${host}${ServerConfig.paypalSubPath}/fail/${encodeURIComponent(recordKey)}/paypal`;
    var items = [{
        "name": 'Payment Form',
        "sku": '001',
        "price": req.body.price,
        "currency": req.body.currency,
        "quantity": 1
    }]
    // console.log('recordKey',recordKey);
    var { approvalUrl } = await Paypal.redirecToPayment(successUrl, failUrl, items, 'it is a payment form');
    if (approvalUrl) {
        successApiResponse(res, { approvalUrl });
    } else {
        responseError(res, 'approval url is null', 'add_record')
    }
}
async function baintreePayment(req, res) {
    var result = await Braintree.salse(req.body.price, req.body.nonce, Braintree.findMerchantAccountId(req.body.currency));

    var record = {
        ...req.body,
        refNum: result.transaction.id
    }
    delete record.nonce;
    await DbObject.addPaymentRecord(record);
    sendLastUpdateToAllClient();
    successApiResponse(res, { refNum: result.transaction.id });
}

async function sendLastUpdateToAllClient() {
    try {
        var lastUpdateTime = await DbObject.getLastUpdate();
        SocketIO.sendToAllClient(ServerConfig.updatePaymentChannel, JSON.stringify({ lastUpdateTime }));
    } catch (e) {
        console.error('sendLastUpdateToAllClient err');
        console.error(e);
    }
}

app.post(`${ServerConfig.apiSubPath}/payment`, Validation.paymentCheck(), async (req, res) => {
    // console.log('add_record start');
    const errors = Validation.validationResult(req);
    // console.log('the errors',errors);
    if (!errors.isEmpty()) {
        console.log('is error');
        var errorMsg = errors.mapped()
        console.log('errorMsg', errorMsg);
        responseError(res, errorMsg, 'payment')
        return;
    }
    try {
        switch (req.body.payment) {
            case 'paypal':
                await paypalPayment(req, res);
                return;
            case 'braintree':
                await baintreePayment(req, res);
                return;
            default:
                console.error('payment not paypal or braintree');
                res.send({ status: -2, errors: 'payment should be papay or braintree' });
                return;
        }
    } catch (err) {
        responseError(res, err, 'payment')
    }
})

app.get(`${ServerConfig.paypalSubPath}/success/:recordKey/paypal`, async (req, res) => {
    var record = await DbObject.getRecord(req.params.recordKey);
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    try {
        await Paypal.executePayment(paymentId, payerId, record.currency, record.price);
    } catch (err) {
        console.error('payment fail', err)
        res.redirect('/fail');
        return;

    }
    try {
        await DbObject.updateRefNum(req.params.recordKey, paymentId);
        sendLastUpdateToAllClient();
    } catch (err) {
        console.error('payment success, but db err', err);
    }


    res.redirect(`/success/${paymentId}`);
})

app.get(`${ServerConfig.paypalSubPath}/fail/:recordKey/paypal`, (req, res) => {
    console.error('paypal fail', req)
    res.redirect(`/fail`);

})



//default route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})


var server = http.createServer(app);
SocketIO.init(server);
server.listen(3000, () => {
    console.log(`server start at port ${ServerConfig.port}`)
});