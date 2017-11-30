import React, { Component } from 'react';
import AutoBind from 'react-autobind';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// styling components
import Store from '../model/redux';





import UI from '../model/factory/UI.js';


import LoadingDialog from './BaseComponent/LoadingDialog.jsx';
import MessageDialog from './BaseComponent/MessageDialog.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        AutoBind(this);
        if (global.isIOS) {
            require('../css/ios.css');
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="app-parent">
                    {React.cloneElement(this.props.children, {})}
                </div>
                <LoadingDialog />
                <MessageDialog />

            </MuiThemeProvider>
        );
    }


    componentWillMount() {
        this.unsubscribeStore = Store.subscribe(() => { this.forceUpdate(); });
    }
    componentWillUnmount() {
        this.unsubscribeStore();
    }
}
