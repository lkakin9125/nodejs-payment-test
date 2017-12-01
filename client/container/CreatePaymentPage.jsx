import React from 'react';
import UI from '../model/dao/UI'
import CreatePaymentForm from '../component/createPayment/CreatePaymentForm';
import AutoBind from 'react-autobind'
export default class CreatePaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            name: "",
            phone: "",
            currency:'usd',
            currencyType:[
                'usd',
                'hkd',
                'aud',
                'eur',
                'jpy',
                'cny',
            ]
        }
    }
    componentWillMount() {
        UI.setTitle('Create Payment')
    }
    render() {
        return (
            <div className="app-page">
                <CreatePaymentForm
                    {...this.state}
                />
            </div>
        )
    }
}