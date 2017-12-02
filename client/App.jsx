import React, { Component } from 'react';
import AutoBind from 'react-autobind';
import Drawer from 'material-ui/Drawer';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Theme from './theme/theme'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Store from './model/redux';
import UI from './model/dao/UI.js';
import LoadingDialog from './component/base/LoadingDialog.jsx';
import MessageDialog from './component/base/MessageDialog.jsx';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
const theme = createMuiTheme(Theme);

class App extends Component {
    constructor(props) {
        super(props);
        AutoBind(this);
        this.state = {
            drawerOpen: false
        }
    }

    openDrawer(drawerOpen) {
        this.setState((state) => {
            if (drawerOpen === undefined) {
                drawerOpen = !state.drawerOpen
            }
            return { drawerOpen };
        })
    }

    toPage(url) {
        this.props.history.push(url);
        this.openDrawer(false);
    }

    renderDrawerList() {
        return (
            <List>

                <ListItem onClick={() => { this.toPage('/') }}>
                    <ListItemText primary="Create Payment" />
                </ListItem>


                <ListItem onClick={() => { this.toPage('/record_check') }}>
                    <ListItemText primary="Check Record" />
                </ListItem>

            </List>
        )
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="app-parent">
                    <div className="wrap-content">
                        <Drawer open={this.state.drawerOpen} onRequestClose={()=>{this.openDrawer(false)}}>
                            <div style={{ width: 250 }}>
                                {this.renderDrawerList()}
                            </div>
                        </Drawer>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    style={{ marginLeft: -12, marginRight: 20 }}
                                    color="contrast"
                                    aria-label="Menu"
                                    onClick={this.openDrawer}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography type="title" color="inherit" style={{ flex: 1 }}>
                                    {UI.getTitle()}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                    </div>
                    <div className="weight-1">
                        {this.props.children}
                    </div>
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


export default withRouter(App);