import React, { Component } from 'react';
import {connect} from 'react-redux';


class MapUpdater extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isOnline !== this.props.isOnline) {
            this.props.onNetStatus(this.props.isOnline);
        }
    }

    render() {
        return (
            null
        );
    }
}

function mapStateToProps(state) {
    return {
        online: state.isOnline.online,
    };
}

export default connect(mapStateToProps)(MapUpdater);