import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    renderLoading() {
        return (
            // <Segment>
            // <Dimmer active>
            <CircularProgress />
            // </Dimmer>

            // </Segment>
        )
    }
    render() {
        var loadingContent = (
            <Grid container
                alignItems="center"
                justify="center"
                direction="row"
                className={this.props.className}
                style={{ ...this.props.containerStyle }} >
                <Grid item style={{ flex: '0 0 auto' }} >
                    {this.renderLoading()}
                </Grid>
                <Grid item style={{
                    flex: '1 1 auto',
                    marginLeft: 10
                    //position: 'relative',
                }}>
                    {/* <div
                        style={{
                            left: '10%',
                            right: 0,
                            position: 'absolute',
                            bottom: 15,
                            overflowX: 'visible',
                        }}> */}
                    Loading...
                    {/* </div> */}
                </Grid>
            </Grid>
        );

        return (
            <div className="loading-view" style={this.props.containerStyle}>
                <div>
                    {this.props.isCenter ?
                        <center>
                            {/* <CircularProgress color={this.props.color} /> */}
                            {this.renderLoading()}
                        </center> :
                        loadingContent
                    }

                </div>
            </div>
        )
    }

}





LoadingView.propTypes = {
    isCenter: PropTypes.bool,
    containerStyle: PropTypes.object,
    color: PropTypes.string,
    className: PropTypes.string
}

LoadingView.defaultProps = {
    isCenter: true,
    containerStyle: {},
    color: '#fff',
    className: ''
}

export default LoadingView;