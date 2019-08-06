import { connect } from 'react-redux';
import React, { Component } from 'react';
import MapComponent from './map_component';
import Modal from './admin/parts/modal';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        { (this.props.online === false) &&
          <div className="offline-message-side">
            You are currently offline
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    online: state.isOnline.online
  }
}

export default connect(mapStateToProps)(Main);