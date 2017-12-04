import React from 'react';
import AutoBind from 'react-autobind'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import AlertIcon from 'material-ui-icons/Error';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
export default class RecordCheckPage extends React.Component {
    constructor(props) {
        super(props);
        AutoBind(this);
    }

    render() {
        return (
            <Grid container
                style={{ height: '100%' }}
                direction={'column'}
                wrap="nowrap"
                alignItems="top"
                justify="center">
                <Grid item >
                    <Grid container
                        alignItems="center"
                        justify="center" >
                        <Grid item xs={8} sm={8} md={11} >
                            <Card
                                className="my-card"
                                style={{ width: '100%', marginTop: 15 }}>
                                <Grid container
                                    style={{ padding: 15 }}
                                    direction={'column'}
                                    alignItems="center"
                                    justify="center" >
                                    <Grid item >
                                        <AlertIcon style={{ height: 100, width: 100, color: '#aaa' }} />
                                    </Grid>
                                    <Grid item >
                                        <Typography align="center" type="title">
                                            Page Not Found
                                    </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}