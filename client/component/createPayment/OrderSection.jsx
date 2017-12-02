import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
// import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import MoneyTextField from '../base/MoneyTextField.jsx';

export default class OrderSection extends React.Component {

    render() {
        var { price, name, phone, currencyType, currency, handleRadioButtonChange, handleTextChange, handleSubmit } = this.props
        return (

            <Grid container
                alignItems="top"
                justify="center" >
                <Grid item xs={8} sm={8} md={11} >
                    <Card
                        className="my-card"
                        style={{ width: '100%', marginTop: 15 }}>
                        <form style={{ padding: 15 }} onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth={true}
                                        id="name"
                                        label="Name"
                                        value={name}
                                        onChange={(event) => { handleTextChange('name', event) }}
                                        InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth={true}
                                        id="phone"
                                        type="tel"
                                        label="Phone"
                                        value={phone}
                                        onChange={(event) => { handleTextChange('phone', event) }}
                                        InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required component="fieldset">
                                        <FormLabel component="legend">Currency</FormLabel>
                                        <RadioGroup row
                                            onChange={(event, value) => { handleRadioButtonChange('currency', event, value) }}
                                            aria-label="anchorOriginHorizontal"
                                            name="anchorOriginHorizontal"
                                            value={currency}
                                        >
                                            {
                                                currencyType.map((ct, index) => {
                                                    return (
                                                        <FormControlLabel
                                                            value={ct}
                                                            control={<Radio />}
                                                            label={ct}
                                                            key={`${ct}_${index}`} />
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <MoneyTextField
                                        required
                                        onChange={(event) => { handleTextChange('price', event) }}
                                        id="price"
                                        fullWidth={true}
                                        label="Price"
                                        value={price} />
                                </Grid>
                                <Grid item xs={12} >

                                    <Button raised
                                        color="primary"
                                        type="submit">
                                        Next
                                    </Button>

                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>

        )
    }
}

OrderSection.propTypes = {
    price: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    phone: PropTypes.string,
    currencyType: PropTypes.arrayOf(PropTypes.string),
    currency: PropTypes.string,
    handleRadioButtonChange: PropTypes.func,
    handleTextChange: PropTypes.func,
    handleSubmit: PropTypes.func
}