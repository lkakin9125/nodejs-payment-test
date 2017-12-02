import React from 'react';
import UI from '../model/dao/UI'
import CreatePaymentForm from '../component/createPayment/CreatePaymentForm';
import AutoBind from 'react-autobind'
import CardValidate from 'credit-card-validation';
import Payment from '../model/dao/Payment';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router'
class CreatePaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currSection: 0,
            section: ['Order Section', 'Payment Section', 'Confirm'],
            orderSection: {
                price: '',
                name: "",
                phone: "",
                currency: '',
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
                cardExpiration: '',
                ccv: ''
            }
        }
        AutoBind(this);
    }


    componentWillMount() {
        UI.setTitle('Create Payment')
    }

    componentDidMount() {
        if (this.props.match) {
            if (this.props.match.path.indexOf('/success') >= 0 && this.props.match.params && this.props.match.params.refNum) {
                var action = (
                    <Button
                        key="ok"
                        color="primary"
                        onClick={() => {
                            UI.closeMessageDialog();
                            this.props.history.push('/');
                        }}>
                        OK
                    </Button>
                )
                UI.showMessageDialog(`The payment (ref no: ${this.props.match.params.refNum}) is success`, "Payment", [action])
            } else if (this.props.match.path.indexOf('/fail') >= 0) {
                var action = (
                    <Button
                        key="ok"
                        color="primary"
                        onClick={() => {
                            UI.closeMessageDialog();
                            this.props.history.push('/');
                        }}>
                        OK
                    </Button>
                )
                UI.showMessageDialog(`Sorry, the payment is fail`, "Payment", [action])
            }
        }
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
            price = price.replaceAll(',', '');
            if (cardType == 'amex' && currency != 'USD') {
                UI.showMessageDialog('AMEX is possible to use only for USD', 'Error');
                return;
            }
            UI.setLoadingDialogOpen(true, "payment");
            if (cardType == 'amex' || currency == 'USD' || currency == 'EUR' || currency == 'AUD') {
                payment = "paypal";
            }
            Payment.createPayment(name, phone, currency, price, payment, cardHolderName, cardNumber, ccv, cardExpiration, (err) => {
                if (typeof err == 'object' && err.status == -1) {
                    console.error('payment is not paypal or braintree')
                    UI.showMessageDialog('Data Error, Please re-enter your input', "Error");
                    UI.setLoadingDialogOpen(false);
                } else {
                    console.error('payment err');
                    console.error(err);
                    UI.showMessageDialog('Network Error', "Error");
                    UI.setLoadingDialogOpen(false);
                }
            }, (res) => {
                console.log('payment success', res);

                if (payment == "paypal") {
                    window.location.href = res.approvalUrl
                } else {
                    this.props.history.push(`/success/${res.refNum}`);
                    UI.setLoadingDialogOpen(false);
                }
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
        console.log('render', this.props);
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

export default withRouter(CreatePaymentPage);