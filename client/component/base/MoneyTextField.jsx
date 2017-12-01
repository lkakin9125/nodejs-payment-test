import NumberFormat from 'react-number-format';
import React from 'react';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import PropTypes from 'prop-types';

class NumberFormatCustom extends React.Component {
    render() {
        return (
            <NumberFormat
                {...this.props}
                onValueChange={values => {
                    this.props.onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
            //prefix="$"
            />
        );
    }
}

export default class FormattedInputs extends React.Component {

    render() {
        var { label, value, onChange, id, fullWidth } = this.props;
        return (
            <FormControl fullWidth={!!fullWidth}>
                {
                    label ?
                        <InputLabel
                            htmlFor={`${label}`.toLocaleLowerCase()}>
                            {label}
                        </InputLabel> :
                        null
                }
                <Input
                    id={id}
                    value={value}
                    onChange={onChange}
                    inputComponent={NumberFormatCustom}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    {...this.props}
                />
            </FormControl>
        );
    }
}

FormattedInputs.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    id: PropTypes.string
};