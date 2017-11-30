import UIReducer from './UIReducer';
import PaymentRecordReducer from './PaymentRecordReducer'
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
var reducer = combineReducers({
    ui: UIReducer,
    paymentRecord:PaymentRecordReducer
});

var store = createStore(
    reducer
);
export default store;