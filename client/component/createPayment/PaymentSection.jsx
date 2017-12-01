import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
// import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import TextField from 'material-ui/TextField';

export default class PaymentSection extends React.Component {

    render() {
        var { cardHolderName, cardNumber, cardExpiration, ccv, handleTextChange, handleSubmit, toSection } = this.props

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
                                        id="card_holder_name"
                                        label="Card Holder Name"
                                        value={cardHolderName}
                                        onChange={(event) => { handleTextChange('cardHolderName', event) }}
                                        InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth={true}
                                        id="card_number"
                                        type="number"
                                        min="0" step="1"
                                        label="Card Number"
                                        value={cardNumber}
                                        onChange={(event) => { handleTextChange('cardNumber', event) }}
                                        InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth={true}
                                        id="card_exp"
                                        type="date"
                                        label="Card Expiration"
                                        value={cardExpiration}
                                        onChange={(event) => { handleTextChange('cardExpiration', event) }}
                                        InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        fullWidth={true}
                                        id="ccv"
                                        type="number"
                                        min="0" step="1" max="9999"
                                        label="CCV"
                                        value={ccv}
                                        onChange={(event) => { handleTextChange('ccv', event) }}
                                        InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button raised
                                        color="primary"
                                        type="submit">
                                        Next
                                    </Button>

                                    <Button raised
                                        onClick={toSection}
                                        style={{ marginLeft: 15 }}
                                        color="accent"
                                        type="submit">
                                        Back
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