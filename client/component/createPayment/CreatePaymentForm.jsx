import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
// import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';

import TextField from 'material-ui/TextField';
import MoneyTextField from '../base/MoneyTextField.jsx';

export default class CreatePaymentForm extends React.Component {

    render() {
        var { price, name, phone, currencyType, currency } = this.props
        return (
            <div className="app-page">
                <Grid container
                    alignItems="top"
                    justify="center"
                    style={{ flexGrow: 1, height: '100%' }} >
                    <Grid item xs={8} sm={8} md={11} >
                        <Card
                            className="my-card"
                            style={{ width: '100%', marginTop: 30}}>
                            <form style={{padding: 15 }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField required
                                            fullWidth={true}
                                            id="name"
                                            label="Name"
                                            margin="normal"
                                            value={name}
                                            InputLabelProps={{ shrink: true }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required
                                            fullWidth={true}
                                            id="phone"
                                            type="tel"
                                            label="Phone"
                                            value={phone}
                                            InputLabelProps={{ shrink: true }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Currency</FormLabel>
                                            <RadioGroup
                                                row
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
                                                                label={ct.toUpperCase()}
                                                                key={`${ct}_${index}`} />
                                                        )
                                                    })
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MoneyTextField
                                            id="price"
                                            fullWidth={true}
                                            label="Price"
                                            value={price} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button raised
                                            color="primary"
                                            type="submit">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}