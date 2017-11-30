import $ from 'jquery';

var initValue = {
    loadingdialog: {
        open: false,
    },
    messagedialog: {
        open: false,
        message: "",
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
function setLoadingDialogOpen(state, open) {
    return Object.assign({}, state, {
        loadingdialog: {
            open: open
        }
    });
}

function setMessageDialog(state, open, message) {
    return Object.assign({}, state, {
        messagedialog: {
            open: open,
            message: message
        }
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
            return setLoadingDialogOpen(state, action.payload.open);
        case "UI_SET_MESSAGE_DIALOG":
            return setMessageDialog(state, action.payload.open, action.payload.message);
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