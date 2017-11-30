import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';

class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    renderLoading() {
        return (
            // <Segment>
                // <Dimmer active>
                <CircularProgress  />
                // </Dimmer>

            // </Segment>
        )
    }
    render() {
        var loadingContent = (
            <div style={{ display: 'flex', flexDirection: 'row', ...this.props.containerStyle }}>
                <div style={{ flex: '0 0 auto' }}>
                    {this.renderLoading()}
                </div>
                <div style={{
                    flex: '1 1 auto',
                    position: 'relative',
                }}>
                    <div
                        style={{
                            left: '10%',
                            right: 0,
                            position: 'absolute',
                            bottom: 15,
                            overflowX: 'visible',
                        }}>
                        Loading...
                    </div>
                </div>
            </div>
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
    color: PropTypes.string
}

LoadingView.defaultProps = {
    isCenter: true,
    containerStyle: {},
    color: '#fff'
}

export default LoadingView;