import braintree from 'braintree';


var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'gcck4dmkw7qpskzw',
    publicKey: '2kdxjjymsx5srz4g',
    privateKey: 'ae002b2f3366d5c18239b6e0bb209cfc'
});

async function salse(price, nonce, option = {}) {
    return new Promise((resolve, reject) => {
        gateway.transaction.sale({
            amount: price,
            paymentMethodNonce: nonce,
            ...option
        }, function (err, result) {
            if (err) {
                reject(err)
            } else if (result.success) {
                resolve(result)
            } else {
                reject(result);
            }
        });
    })
}

export default {
    salse
}