import $ from 'jquery';

var initValue = {
    loadingdialog: {
        open: false,
    },
    messagedialog: {
        open: false,
        message: "",
        title: ""
    },
    snackbar: {
        open: false,
        message: "",
        actionMessage: "",
        duration: 2000
    },
    title: 'Main Page'
};


function setTitle(state, title) {
    return {
        ...state,
        title
    }
}
function setLoadingDialogOpen(state, payload) {
    return Object.assign({}, state, {
        loadingdialog: payload
    });
}

function setMessageDialog(state, payload) {
    return Object.assign({}, state, {
        messagedialog: payload
    });
}

function setSnackbar(state, open, message, actionMessage, duration) {
    return {
        ...state,
        snackbar: {
            open: open,
            message: message,
            actionMessage,
            duration
        }
    }
}

function UIReducer(state = initValue, action) {
    switch (action.type) {
        case "UI_SET_LOADING_DIALOG_OPEN":
            return setLoadingDialogOpen(state, action.payload);
        case "UI_SET_MESSAGE_DIALOG":
            return setMessageDialog(state, action.payload);
        case "UI_SET_SNACKBAR":
            return setSnackbar(
                state,
                action.payload.open,
                action.payload.message,
                action.payload.actionMessage,
                action.payload.duration
            );
        case "UI_SET_TITLE":
            return setTitle(state, action.payload.title);
        case "RESET":
            return initValue;
        default:
            return state;
    }
}

export default UIReducer;