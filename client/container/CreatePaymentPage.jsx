import React from 'react';
import UI from '../model/dao/UI'
import CreatePaymentForm from '../component/createPayment/CreatePaymentForm';
import AutoBind from 'react-autobind'
import CardValidate from 'credit-card-validation';
import Payment from '../model/dao/Payment';
export default class CreatePaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currSection: 0,
            section: ['Order Section', 'Payment Section', 'Confirm'],
            orderSection: {
                price: '100',
                name: "Tom",
                phone: "999",
                currency: 'usd',
                currencyType: [
                    'USD',
                    'HKD',
                    'AUD',
                    'EUR',
                    'JPY',
                    'CNY',
                ]
            },
            paymentSection: {
                cardHolderName: 'Tom',
                cardNumber: '378282246310005',
                cardExpiration: '2020-01-01',
                ccv: '123'
            }
        }
        AutoBind(this);
    }


    componentWillMount() {
        UI.setTitle('Create Payment')
    }

    handleTextChange(key, event) {
        this.handleChange(key, event, event.target.value)
    }
    handleRadioButtonChange(key, event, value) {
        this.handleChange(key, event, value)
    }

    handleChange(key, event, value) {

        if (key == 'price') {
            value = `${value}`.replace(/^0+/, '');
        }
        var nextState = {}
        switch (this.state.currSection) {
            case 0:
                nextState = { orderSection: this.state.orderSection };
                nextState.orderSection[key] = value;
                break;
            case 1:
                nextState = { paymentSection: this.state.paymentSection };
                nextState.paymentSection[key] = value;
                break;
            default:
                nextState[key] = value;
                break
        }

        this.setState(nextState);
    }
    handleSubmit(event) {
        event.preventDefault();
        var { currSection, section } = this.state;
        if (++currSection < section.length) {
            this.setState({ currSection })
        } else {
            var { cardNumber, cardHolderName, cardExpiration, ccv } = this.state.paymentSection
            var cardType = CardValidate(cardNumber).getType();
            var payment = 'braintree';
            var { currency, name, price, phone } = this.state.orderSection;
            if (cardType == 'amex' && currency != 'USD') {
                UI.showMessageDialog('AMEX is possible to use only for USD', 'Error');
                return;
            }

            if (cardType == 'amex' || currency == 'USD' || currency == 'EUR' || currency == 'AUD') {
                payment = "paypal";
            }
            Payment.createPayment(name, phone, currency, price, payment, cardHolderName, cardNumber, ccv, cardExpiration, (err) => {
                console.error('payment err');
                console.error(err);
                UI.showMessageDialog('Network Error');
            }, (res) => {
                console.log('payment success', res);
            })
        }
    }
    /**
     * a function to jump to different section
     * @param {number} toSection, the section want to go, if section < 0 || section>=currSection, nothing will do, default value is currSection-1
     */
    toSection(toSection) {
        if (!Number.isInteger(toSection)) {
            toSection = this.state.currSection - 1;
        }

        if (toSection < 0 || toSection >= this.state.currSection) {
            return;
        }
        console.log(`toSection: ${toSection}, this.state.currSection: ${this.state.currSection}`, toSection);
        this.setState({ currSection: toSection });
    }
    render() {
        return (
            <div className="app-page">
                <CreatePaymentForm
                    {...this.state}
                    toSection={this.toSection}
                    handleSubmit={this.handleSubmit}
                    handleTextChange={this.handleTextChange}
                    handleRadioButtonChange={this.handleRadioButtonChange}
                />
            </div>
        )
    }
}