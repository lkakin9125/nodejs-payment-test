import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
// import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

import TextField from 'material-ui/TextField';
import MoneyTextField from '../base/MoneyTextField.jsx';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import OrderSection from './OrderSection';
import PaymentSection from './PaymentSection';
import ConfirmSection from './ConfirmSection';
import PropTypes from 'prop-types';

export default class CreatePaymentForm extends React.Component {

    renderSectionDom() {
        var { currSection, orderSection, paymentSection, handleRadioButtonChange, handleTextChange, handleSubmit, toSection } = this.props

        switch (currSection) {
            case 0:
                return (
                    <OrderSection
                        {...orderSection}
                        handleRadioButtonChange={handleRadioButtonChange}
                        handleTextChange={handleTextChange}
                        handleSubmit={handleSubmit} />
                )
            case 1:
                return (
                    <PaymentSection
                        {...paymentSection}
                        toSection={toSection}
                        handleTextChange={handleTextChange}
                        handleSubmit={handleSubmit} />
                )
            case 2:
                return (
                    <ConfirmSection
                        orderSection={orderSection}
                        paymentSection={paymentSection}
                        toSection={toSection}
                        handleSubmit={handleSubmit} />
                )
        }
        return null;
    }

    render() {
        var { section, currSection, toSection } = this.props

        return (
            <Grid container direction={'column'}>
                <Grid item >
                    <Grid container
                        alignItems="top"
                        justify="center" >
                        <Grid item xs={8} sm={8} md={11} >
                            <Card
                                className="my-card"
                                style={{ width: '100%', marginTop: 15 }}>
                                <Stepper activeStep={currSection} alternativeLabel>
                                    {section.map((label, index) => {
                                        return (
                                            <Step key={label} onClick={() => { toSection(index); }}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    {this.renderSectionDom()}
                </Grid>
            </Grid>
        )
    }
}

CreatePaymentForm.propTypes = {
    currSection: PropTypes.number,
    orderSection: PropTypes.object,
    paymentSection: PropTypes.object,
    handleRadioButtonChange: PropTypes.func,
    handleTextChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    toSection: PropTypes.func,
    section: PropTypes.arrayOf(PropTypes.string)
}