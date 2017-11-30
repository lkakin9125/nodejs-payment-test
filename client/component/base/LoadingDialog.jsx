import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import LoadingView from './LoadingView.jsx';

import UI from '../../../model/factory/UI.js';
import Store from '../../../model/redux';

export default class LoadingDialog extends Component {
    render() {
        var loadingdialog = UI.getLoadingDialog();
        return (
            <Dialog
                modal={true}
                open={loadingdialog.open}>
                <LoadingView isCenter={false} />
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
