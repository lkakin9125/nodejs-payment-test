import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AutoBind from 'react-autobind';
import PropTypes from 'prop-types';
export default class ConfirmSection extends React.Component {

    constructor(props) {
        super(props);
        AutoBind(this);
    }

    renderField(key, value) {
        key = key.firstCharUpperCase();
        var fieldNameArray = key.match(/[A-Z][a-z]+/g);
        var fieldName = "";

        for (var i = 0; i < fieldNameArray.length; i++) {
            fieldName = fieldName + fieldNameArray[i].firstCharUpperCase() + " ";
        }
        return (
            <TableRow key={`${key}_${value}`}>
                <TableCell>{fieldName}</TableCell>
                <TableCell >{value}</TableCell>
            </TableRow>

        )
    }

    renderTable() {

        var tableBody = []
        var { orderSection, paymentSection } = this.props;
        for (var key in orderSection) {
            tableBody.push(
                this.renderField(key, orderSection[key])
            )
        }
        for (var key in paymentSection) {
            tableBody.push(
                this.renderField(key, paymentSection[key])
            )
        }
        return (
            <Table className="valign">
                <TableHead>
                    <TableRow>
                        <TableCell>Field Name</TableCell>
                        <TableCell >Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBody}
                </TableBody>
            </Table>
        )
    }

    render() {
        var { handleSubmit, toSection } = this.props
        console.log(`ConfirmSection render `);
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
                                    {this.renderTable()}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button raised
                                        color="primary"
                                        type="submit">
                                        Pay
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

ConfirmSection.propTypes = {
    toSection: PropTypes.func,
    handleSubmit: PropTypes.func,
    orderSection: PropTypes.object,
    paymentSection: PropTypes.object,
}