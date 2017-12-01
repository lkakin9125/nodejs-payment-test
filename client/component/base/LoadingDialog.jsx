import React, { Component } from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import LoadingView from './LoadingView.jsx';

import UI from '../../model/dao/UI.js';
import Store from '../../model/redux';

export default class LoadingDialog extends Component {
    render() {
        var loadingDialog = UI.getLoadingDialog();
        return (
            // <Dialog
            //     modal={true}
            //     open={loadingDialog.open}>
            //     <LoadingView isCenter={false} />
            // </Dialog>
            <Dialog open={loadingDialog.open}>
                {
                    loadingDialog.title ?
                        <DialogTitle>{loadingDialog.title}</DialogTitle> :
                        null
                }
                <DialogContent>
                    <DialogContentText>
                        <LoadingView isCenter={false} />
                    </DialogContentText>
                </DialogContent>
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
