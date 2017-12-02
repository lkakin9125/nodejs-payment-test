import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App.jsx';
import CreatePaymentPage from './container/CreatePaymentPage.jsx'
import RecordCheckPage from './container/RecordCheckPage.jsx'
export default class MyRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Route path="/" exact component={CreatePaymentPage} />
                    <Route path="/record_check" component={RecordCheckPage} />
                    <Route path="/success/:refNum" component={CreatePaymentPage} />
                    <Route path="/fail" component={CreatePaymentPage} />
                </App>
            </Router>
        )
    }
}