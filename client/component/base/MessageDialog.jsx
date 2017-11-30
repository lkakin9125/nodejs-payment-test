import React, { Component } from 'react';
import AutoBind from 'react-autobind';
import Dialog from 'material-ui/Dialog';
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
        var messagedialog = UI.getMessageDialog();
        const actions = UI.getMessageDialogAction();

        return (
            <Dialog
                modal={true}
                actions={actions}
                open={messagedialog.open}>
                {messagedialog.message}
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
