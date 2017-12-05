import paypal from 'paypal-rest-sdk'

import { resolve } from 'url';

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXNLsONEbadBpWcO3ZPIIX30crZcU8Mwa5Nw-iTJ-t4X6DT0Mze1fpqKEJjiu0B6d5Rx0IwFGgO03G5h',
    'client_secret': 'EP5_K1TWBx7Cjw_Sm-BPhMUqDxIY4tVfXZCGc-QnHIutcsTy_ol_BlGnN3IYZfzoIuvisD569vxY5Wt8'
});

/**
 * it is an async function that implement PayPal rest api
 * @param {*} successUrl the redirect url when the payment success
 * @param {*} cancelUrl the redirect url when the payment fail
 * @param {*} items the purchase items, here assume all items currency are the same
 * @param {*} description the payemnt description
 * @return {Promise} it will resolve with an object: {approvalUrl,payment} which approvalUrl is the url to payment and payment is the raw response from PayPal.
 */
async function redirecToPayment(successUrl, cancelUrl, items, description) {
    if (items.length <= 0) {
        throw 'PayPal redirecToPayment, items is empty'
    }
    var currency = items[0].currency;
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += Number(items[i].price)
        items[i].price = Number(items[i].price).toFixed(2)
    }

    var paymentJSON = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": successUrl,
            "cancel_url": cancelUrl
        },
        "transactions": [{
            "item_list": {
                items
                // "items": [{
                //     "name": productName,
                //     "sku": sku,
                //     "price": price,
                //     "currency": currency,
                //     "quantity": quantity
                // }]
            },
            "amount": {
                "currency": currency,
                "total": total.toFixed(2)
            },
            "description": description
        }]
    };
    return new Promise((resolve, reject) => {
        paypal.payment.create(paymentJSON, function (error, payment) {
            if (error) {
                throw error;
            } else {
                var approvalUrl = '';
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        // res.redirect(payment.links[i].href);
                        approvalUrl = payment.links[i].href
                    }
                }
                resolve({
                    approvalUrl,
                    payment
                });
            }
        });
    })
}
/**
 * 
 * @param {*} payerId 
 * @param {string} currency 
 * @param {numer} total 
 */
async function executePayment(paymentId, payerId, currency, total) {
    if (Number.isInteger(total)) {
        total = total.toFixed(2)
    }
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": currency,
                "total": total
            }
        }]
    };
    return new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    })

}

export default {
    redirecToPayment,
    executePayment
}