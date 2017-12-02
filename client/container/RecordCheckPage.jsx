import React from 'react';
import UI from '../model/dao/UI'
import AutoBind from 'react-autobind'
import Store from '../model/redux'
import Payment from '../model/dao/Payment'
import RecordChecker from '../component/recordCheck/RecordChecker';
export default class RecordCheckPage extends React.Component {
    constructor(props) {
        super(props);
        AutoBind(this);
        this.state = {
            loading: true,
            searchText: '',
            records: []
        }
        
    }
    componentWillMount() {
        UI.setLoadingDialogOpen(true,"loading");
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
    render() {
        return (
            <div className="app-page">
                <RecordChecker
                    {...this.state}
                    filterRecord={this.filterRecord}
                    handleTextChange={this.handleTextChange} />
            </div>
        );
    }
}