
import React from 'react';
import AutoBind from 'react-autobind'
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import AlertIcon from 'material-ui-icons/Error';
import SearchIcon from 'material-ui-icons/Search';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import LoadingView from '../base/LoadingView';
import IconButton from 'material-ui/IconButton';
import RecordDialog from './RecordDialog';
export default class RecordCheckPage extends React.Component {
    constructor(props) {
        super(props);
        AutoBind(this);
    }

    renderSearchCard() {
        var { searchText, handleTextChange, filterRecord } = this.props
        return (
            <Card
                className="my-card"
                style={{ width: '100%', marginTop: 15 }}>
                <form onSubmit={filterRecord} style={{ padding: 15 }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1 1 auto' }}>
                            <TextField
                                fullWidth={true}
                                id="searchText"
                                label="Search"
                                value={searchText}
                                onChange={(event) => { handleTextChange('searchText', event) }} />
                        </div>
                        <div style={{ flex: '0 0 auto' }}>
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        </div>
                    </div>
                </form>
            </Card>
        )
    }

    renderSearchContent() {
        var { records, searchText, onSelectItem } = this.props;
        var contentDom = null;
        if (records.length == 0) {
            if (searchText) {
                contentDom = (
                    <Grid container
                        alignItems="center"
                        justify="center" >
                        <Grid item xs={12}>
                            <AlertIcon />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="center">
                                Result Not Found
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
        } else {
            contentDom = (<List style={{ width: '100%' }}>
                {
                    records.map((r, index) => {
                        return [
                            <ListItem key={`item_${index}`} button onClick={() => { onSelectItem(r) }}>
                                <ListItemText primary={r.name} secondary={r.refNum} />
                            </ListItem>,
                            <Divider key={`divider_${index}`} light />
                        ]
                    })
                }
            </List>
            )
        }

        return (
            <Card
                className="my-card"
                style={{ width: '100%', marginTop: 15 }}>
                {contentDom}
            </Card>
        );
    }

    render() {
        var { dialog, onDialogClose } = this.props;
        return (
            [
                <Grid container style={{ height: '100%' }} direction={'column'}>
                    <Grid item >
                        <Grid container
                            alignItems="top"
                            justify="center" >
                            <Grid item xs={8} sm={8} md={11} >
                                {this.renderSearchCard()}
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12}> */}
                    <Grid item >
                        <Grid container
                            alignItems="top"
                            justify="center" >
                            <Grid item xs={8} sm={8} md={11} >
                                {
                                    this.props.loading ?
                                        <LoadingView /> :
                                        this.renderSearchContent()
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>,
                <RecordDialog {...dialog} onClose={onDialogClose} />
            ]
        );
    }
}