var initValue = {
    records: null,
    lastUpdateTime: 0
};

function PaymentReducer(state = initValue, action) {
    switch (action.type) {
        case "PAYMENT_RECORD_INIT":
            return init(state, action.payload)
        // case "PAYMENT_RECORD_UPDATE":
        //     return updateRundown(state, action.payload);
        case "RESET":
            return initValue;
        default:
            return state;
    }
}

function init(state, payload) {
    console.log('payment init, payload', payload);
    return {
        ...state,
        records: [...payload.records],
        lastUpdateTime: payload.lastUpdateTime
    }
}

export default PaymentReducer;
