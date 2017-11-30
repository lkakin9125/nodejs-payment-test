import React from 'react';
import UI from '../model/dao/UI'

import Button from 'material-ui/Button';

export default class CreatePaymentPage extends React.Component {
    componentWillMount(){
        UI.setTitle('Create Payment')
    }
    render() {
        return (
            <div className="app-page">
                <form>

                </form>
            </div>
        )
    }
}