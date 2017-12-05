import React from 'react';
import UI from '../model/dao/UI'
import AutoBind from 'react-autobind'
import Store from '../model/redux'
import Payment from '../model/dao/Payment'
import RecordChecker from '../component/recordCheck/RecordChecker';
import SocketIO from '../util/socket';
export default class RecordCheckPage extends React.Component {
    constructor(props) {
        super(props);
        AutoBind(this);
        this.initDialog = {
            name: '',
            phone: '',
            price: '',
            currency: '',
            title: '',
            open: false
        }
        var records = Payment.getAllValidRecord();
        this.state = {
            loading: records.length > 0,
            searchText: '',
            records: records,
            dialog: this.initDialog
        }
        this.keepConnectSocket = true;
    }
    /**
     * subscribe the store so that data can be update when Payment.downloadAllRecord no matter by init download or socket.io triggered
     */
    componentWillMount() {
        this.unSub = Store.subscribe(() => {
            this.filterRecord();
        })
        Payment.downloadAllRecord(
            () => {
                UI.showMessageDialog('Network Error', "Records Check");
            }, () => {
                console.log('download done');
                this.setState({ loading: false });
            }
        )
        UI.setTitle('Check Payment')
    }

    componentWillUnmount() {
        this.unSub();
    }
    handleTextChange(key, event) {
        this.setState({ [key]: event.target.value }, () => { this.filterRecord() });
    }
    /**
     * filter the record
     * if searchText.length<2 && event is not exist, it wont execute because of avoid laggy
     * @param {*} event 
     */
    filterRecord(event) {
        if (event) {
            event.preventDefault();
        }
        var records = Payment.getAllValidRecord();
        var { searchText } = this.state;
        if (searchText.length > 2 || event && searchText.length > 0) {
            records = records.filter((r) => {
                return r.name.indexOf(searchText) >= 0 || r.refNum.indexOf(searchText) >= 0
            })
        }
        this.setState({ records });
    }
    /**
     * handle the item select on list
     * it will create the dialog state according to record
     * @param {object} record 
     */
    onSelectItem(record) {
        var dialog = {
            ...this.initDialog,
            ...record,
            title: `${record.name} - ${record.refNum}`,
            open: true
        }
        this.setState({ dialog });
    }
    /**
     * close the dialog handling
     */
    onDialogClose() {
        var nextDialogState = this.state.dialog;
        nextDialogState.open = false;
        this.setState({ dialog: nextDialogState })
    }
    render() {
        return (
            <div className="app-page">
                <RecordChecker
                    {...this.state}
                    onSelectItem={this.onSelectItem}
                    onDialogClose={this.onDialogClose}
                    filterRecord={this.filterRecord}
                    handleTextChange={this.handleTextChange} />
            </div>
        );
    }
}