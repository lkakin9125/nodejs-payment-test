import Store from '../redux';
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Theme from "../../theme/theme";
const defaultMessageDialogAction = [
    <Button
        color="primary"
        onClick={closeMessageDialog}>
        OK
    </Button>
]
const defaultSnackbarDuration = 2000;

var messageDialogAction = defaultMessageDialogAction;

var snackbarAction = null;

function getState() {
    return Store.getState().ui;
}

function getLoadingDialog() {
    return getState().loadingdialog;
}

function setLoadingDialogOpen(open) {
    Store.dispatch({ type: "UI_SET_LOADING_DIALOG_OPEN", payload: { open: open } });
}

function getMessageDialog() {
    return getState().messagedialog;
}

function showMessageDialog(message, action = defaultMessageDialogAction) {
    messageDialogAction = action;
    Store.dispatch({ type: "UI_SET_MESSAGE_DIALOG", payload: { open: true, message: message } });
}

function closeMessageDialog() {
    Store.dispatch({ type: "UI_SET_MESSAGE_DIALOG", payload: { open: false, message: "" } });
}

function getMessageDialogAction() {
    return messageDialogAction;
}

function showSnackbar(message, duration = defaultSnackbarDuration, actionMessage = "", action = null) {
    snackbarAction = action;
    Store.dispatch({ type: "UI_SET_SNACKBAR", payload: { open: true, message: message, actionMessage, duration } });
}

function closeSnackBar() {
    Store.dispatch({ type: "UI_SET_SNACKBAR", payload: { open: false, message: "", actionMessage: "", duration: defaultSnackbarDuration } });
}

function getSnackbar() {
    return getState().snackbar;
}

function getSnackbarAction() {
    return snackbarAction
}

function getTitle() {
    return getState().title;
}
function setTitle(title) {
    Store.dispatch({
        type: 'UI_SET_TITLE',
        payload: { title }
    })
}


export default {
    getLoadingDialog,
    setLoadingDialogOpen,
    getMessageDialog,
    showMessageDialog,
    closeMessageDialog,
    getMessageDialogAction,
    showSnackbar,
    closeSnackBar,
    getSnackbar,
    getSnackbarAction,
    setTitle,
    getTitle
};
