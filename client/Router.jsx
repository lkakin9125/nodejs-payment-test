import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
export default class App extends React.Component {
    render() {
        <Router>
<App>
<Route path="/" component={MainPage}/>
<Route path="/record_check" component={RecordCheckPage}/>
</App>
        </Router>
    }
}