import React, { Component } from 'react';
import AutoBind from 'react-autobind';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import UI from '../../model/dao/UI.js';
import Store from '../../model/redux';



export default class MessageDialog extends Component {
    constructor(props) {
        super(props);
        AutoBind(this);
    }

    handleClose() {
        UI.closeMessageDialog();
    }

    render() {
        var messageDialog = UI.getMessageDialog();
        console.log('messageDialog',messageDialog);
        const actions = UI.getMessageDialogAction();

        return (
            <Dialog open={messageDialog.open}>
                {
                    messageDialog.title ?
                        <DialogTitle>{messageDialog.title}</DialogTitle> :
                        null
                }
                <DialogContent>
                    <DialogContentText>
                        {messageDialog.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount() {
        this.storeUnsubscribe = Store.subscribe(() => { this.forceUpdate(); });
    }
    componentWillUnmount() {
        this.storeUnsubscribe();
    }
}
