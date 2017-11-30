import React, { Component } from 'react';
import AutoBind from 'react-autobind';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// styling components
import Store from '../model/redux';
import AppTheme from './Theme/Theme.js';

import LoadingDialog from './component/base/MessageDialog.jsx';
import MessageDialog from './component/base/LoadingDialog.jsx';

import Snackbar from 'material-ui/Snackbar';
import UI from '../model/factory/UI';


import $ from 'jquery';
class App extends Component {
    constructor(props) {
        super(props);
        AutoBind(this);
        // let fontSizeLevel = localStorage.getItem('fontSizeLevel');
        this.state = {
            navOpen: false,
            menuOpen: false,
            appHeight: '100%',
            parentOverflowY: Device.isAndroid() ? 'scroll' : undefined,
            // fontSizeLevel: fontSizeLevel ? Number(fontSizeLevel) : 0
        }
        let rootDiv = $('div#root');

        this.rootPadding = {
            top: rootDiv.css("padding-top"),
            bottom: rootDiv.css("padding-bottom"),
            left: rootDiv.css("padding-left"),
            right: rootDiv.css("padding-right")
        }
        for (var key in this.rootPadding) {
            this.rootPadding[key] = Number(this.rootPadding[key].substring(0, this.rootPadding[key].length - 2))
        }
        if (Device.isIOS()) {
            rootDiv.css('overflowY', 'hidden');
        }
        console.log(`rootPadding: ${JSON.stringify(this.rootPadding)}`)
    }

    toggleOpen(key) {
        this.setState((state) => {
            let newState = {};
            newState[key] = !state[key];
            return newState;
        })
    }

    toggleNavOpen(open) {
        // console.log('toggleNavOpen, open : ' + open,open);
        this.setState((state) => {
            let navOpen = open == undefined || typeof open == 'object' ? !state.navOpen : open;
            return { navOpen };
        })
    }

    render() {

       
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(AppTheme)}>
                <div id="app-parent" className={`font-size-${fontSizeLevel}`}
                    style={{
                        // backgroundColor: '#0f0',
                        flexFlow: 'column',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: this.state.appHeight,
                        position: 'relative'
                    }}>

                    <div
                        style={{
                            position: 'absolute',
                            top: -this.rootPadding.top,
                            left: -this.rootPadding.left,
                            right: -this.rootPadding.right,
                            bottom: -this.rootPadding.bottom
                        }}>
                        <img src="./image/background.jpg" style={{
                            zIndex: -100,
                            height: '100%', width: '100%',
                            // position: 'absolute',
                            // top: -this.rootPadding.top,
                            // left: -this.rootPadding.left,
                            // right: -this.rootPadding.right,
                            // bottom: -this.rootPadding.bottom
                        }} />
                    </div>
                    <div className="content-shadow"
                        style={{
                            position: 'absolute',
                            //backgroundColor: '#0f0',
                            // paddingTop: Device.isIOS() ? 20 : 0,
                            // paddingBottom: Device.isIOS() ? 20 : 0,
                            // paddingLeft: Device.isIOS() ? 20 : 0,
                            // paddingRight: Device.isIOS() ? 20 : 0,
                            top: 0, bottom: 0, left: 0, right: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        }}>
                        {this.props.children}
                    </div>
                    <LoadingDialog />
                    <MessageDialog />
                    <Snackbar
                        open={snackbar.open}
                        message={snackbar.message}
                        action={snackbar.actionMessage}
                        autoHideDuration={snackbar.duration}
                        onActionTouchTap={UI.getSnackbarAction()}
                        onRequestClose={UI.closeSnackBar}
                    />
                    <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, zIndex: 1100 }}>
                        <NavBar
                            navInterval={48}
                            startDegree={-6}
                            open={this.state.navOpen}
                            onMainButtonClick={this.toggleNavOpen}
                            toggleOpen={this.toggleNavOpen}
                            onNavItemClick={this.onNavItemClick}
                            navIcons={navIcons} />
                        <ExpandFloatingMenu
                            useTransform={!Device.isAndroid() || Device.isAndroid5OrAbove()}
                            autoClose={false}
                            containerStyle={{ position: 'absolute', right: 0 }}
                            open={this.state.menuOpen}
                            onMainButtonClick={() => { this.toggleOpen('menuOpen') }}
                            toggleOpen={() => { this.toggleOpen('menuOpen') }}
                            onMenuItemClick={this.onMenuItemClick}
                            menuIcons={menuIcons} />
                    </div>
                </div>

            </MuiThemeProvider>
        );
    }

    componentDidMount() {
        if (Device.isAndroid()) {
            this.screenHeightUpdate()
            window.onresize = (event) => {
                this.screenHeightUpdate()
            };
        }
        this.updatePushToken();

        let currPathName = this.props.location.pathname;
        console.log(`App componentDidMount, currPathName: ${currPathName},  indexof: ${currPathName.indexOf('passcode')}, isLogin: ${User.isLogin()}`);
        if ((currPathName.indexOf('passcode') > 0 || currPathName == '/') && User.isLogin()) {
            this.props.history.replace(`/about`);
        }
    }

    updatePushToken() {
        if (Device.isMobile()) {
            User.updatePushToken(
                (e) => {
                    if (e == 'no_device_id') {
                        setTimeout(() => {
                            this.updatePushToken();
                        }, 10);
                    } else {
                        console.error(e);
                    }
                },
                (r) => {
                    console.log(`updatePushToken done, r: ${JSON.stringify(r)}`);
                }
            )
        }
    }

    componentWillMount() {
        this.unsubscribeStore = Store.subscribe(() => { this.forceUpdate(); });
        Gallery.init(null, null);

    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }
}


export default withRouter(App);

