import express from 'express';
import ServerConfig from './ServerConfig';
import DbObject from './db';
import bodyParser from 'body-parser'
import Validation from './validation';
import Paypal from './payment/paypal';
import Braintree from './payment/braintree';
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


app.get(`${ServerConfig.apiSubPath}/test`, (req, res) => {
    res.send({
        test: 'it is test2'
    });
});

app.get(`${ServerConfig.apiSubPath}/get_all_record`, async (req, res) => {
    try {
        var records = await DbObject.getAllRecord();
        res.send({
            status: 1,
            records
        });
    } catch (err) {
        responseError(res, err, 'get_all_record')
    }
})

async function paypalPayment(req, res) {
    console.log(`add_record, req.body: ${JSON.stringify(req.body)}`);
    var recordKey = await DbObject.addPaymentRecord(req.body);
    var host = req.get('host');
    var successUrl = `http://${host}${ServerConfig.paypalSubPath}/success/${encodeURIComponent(recordKey)}`;
    var failUrl = `http://${host}${ServerConfig.paypalSubPath}/fail/${encodeURIComponent(recordKey)}`;
    var items = [{
        "name": 'Payment Form',
        "sku": '001',
        "price": req.body.price,
        "currency": req.body.currency,
        "quantity": 1
    }]
    var { approvalUrl } = await Paypal.redirecToPayment(successUrl, failUrl, items, 'it is a payment form');
    if (approvalUrl) {
        res.send({ approvalUrl });
    } else {
        responseError(res, 'approval url is null', 'add_record')
    }
}
async function baintreePayment(req, res) {
    var result = await Braintree.salse(req.price, req.nonce);
    var record = {
        ...req.body,
        refNum: result.id
    }
    await DbObject.addPaymentRecord(req.body);
    res.send({ status: 1 });
}

app.post(`${ServerConfig.apiSubPath}/payment`, Validation.paymentCheck(), async (req, res) => {
    // console.log('add_record start');
    const errors = Validation.validationResult(req);
    // console.log('the errors',errors);
    if (!errors.isEmpty()) {
        console.log('is error');
        var errorMsg = errors.mapped()
        console.log('errorMsg', errorMsg);
        responseError(res, errorMsg, 'add_record')
        return;
    }
    try {
        switch (payment) {
            case 'paypal':
                paypalPayment(req, res);
                break;
            case 'braintree':
                baintreePayment(req, res);
                break;
        }
    } catch (err) {
        responseError(res, err, 'add_record')
    }
})

app.get(`${ServerConfig.paypalSubPath}/success/:recordKey`, async (req, res) => {
    var record = await DbObject.getRecord(req.params.recordKey);
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    try {
        await Paypal.executePayment(paymentId, payerId, record.currency, record.price);
        DbObject.updateRefNum(req.params.recordKey, paymentId);
        res.send('paypal done');
    } catch (err) {
        responseError(res, err, `${ServerConfig.paypalSubPath}/success/${req.params.recordKey}`);
    }
})

app.get(`${ServerConfig.paypalSubPath}/fail/:recordKey`, (req, res) => {

    res.send(`req.params.recordKey: ${req.params.recordKey}`);

})

app.get(`${ServerConfig.apiSubPath}/url`, (req, res) => {
    var host = req.get('host');
    res.send(`host: ${host}`);
});



app.listen(ServerConfig.port, () => {
    console.log(`server start at port ${ServerConfig.port}`)
});