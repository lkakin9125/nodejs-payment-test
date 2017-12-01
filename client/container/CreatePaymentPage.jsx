import React from 'react';
import UI from '../model/dao/UI'
import CreatePaymentForm from '../component/createPayment/CreatePaymentForm';
import AutoBind from 'react-autobind'

export default class CreatePaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currSection: 0,
            section: ['Order Section', 'Payment Section', 'Confirm'],
            orderSection: {
                price: '',
                name: "",
                phone: "",
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
                cardHolderName: '',
                cardNumber: '',
                cardExp: '',
                ccv: ''
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
            alert('submit')
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