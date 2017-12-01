var initValue = {
    records: null
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
    return {
        ...state,
        records: [...payload.records]
    }
}

export default PaymentReducer;
