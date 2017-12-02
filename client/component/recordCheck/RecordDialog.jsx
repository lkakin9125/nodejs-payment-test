import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AutoBind from 'react-autobind';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
export default class ConfirmSection extends React.Component {

    constructor(props) {
        super(props);
        AutoBind(this);
    }

    renderField(fieldName, value) {
        return (
            <TableRow key={`${fieldName}_${value}`}>
                <TableCell>{fieldName}</TableCell>
                <TableCell >{value}</TableCell>
            </TableRow>

        )
    }

    renderTable() {
        var { name, phone, currency, price } = this.props;
        return (
            <Table className="valign">
                <TableBody>
                    {this.renderField('Customer Name', name)}
                    {this.renderField('Customer Phone Number', phone)}
                    {this.renderField('Currency', currency)}
                    {this.renderField('Price', price)}
                </TableBody>
            </Table>
        )
    }

    render() {
        var { onClose, open, title } = this.props
        console.log(`ConfirmSection render `);
        return (
            <Dialog open={open} onRequestClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {this.renderTable()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


ConfirmSection.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    price: PropTypes.oneOf[PropTypes.string, PropTypes.number],
    currency: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
}

ConfirmSection.defaultProps = {
    title: ""
}