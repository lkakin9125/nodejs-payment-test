import braintree from 'braintree';


var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'gcck4dmkw7qpskzw',
    publicKey: '2kdxjjymsx5srz4g',
    privateKey: 'ae002b2f3366d5c18239b6e0bb209cfc'
});

var midMap = {
    "CNY": "cny",
    "HKD": "hkd",
    "JPY": "jpy"
}

async function salse(price, nonce, merchantAccountId, option = {}) {
    return new Promise((resolve, reject) => {
        var saleOption = {
            amount: Number(price).toFixed(2),
            paymentMethodNonce: nonce,
            merchantAccountId: merchantAccountId,
            ...option
        };
        gateway.transaction.sale(saleOption, function (err, result) {  
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

function findMerchantAccountId(code) {
    return midMap[code];
}

export default {
    salse,
    findMerchantAccountId
}