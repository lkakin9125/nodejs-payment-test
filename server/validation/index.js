/**
 * it is a js file to handle the validation of request
 */
import { check,validationResult } from 'express-validator/check';

const sampleRecord = {
    name:'',
    // refNum:'',
    payment:'',
    phone:'',
    currency:'',
    price:''
}
/**
 * add the middleware of express to do the validation
 */
function paymentCheck(){
    var checking = [];
    for(var key in sampleRecord){
        checking.push(
            check(key,`field ${key} is missing`).exists()
        )
    }
    return checking;
}

export default {
    paymentCheck,
    validationResult
}