import { connect } from 'react-redux';
import React, { Component } from 'react';
import Modal from './admin/parts/modal';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.online !== prevProps.online) {
      //if offline, open model, then close after a few seconds.
      if(!this.props.online) {
        this.refs.modal.openModal();
        setTimeout(() => {
          this.refs.modal.close();
        }, 1500);
      }
    }
  }


  render() {
    return (
      <Modal ref="modal" className="modal">
        <div className="modal-inner offline-message">
          You are currently offline
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    online: state.isOnline.online
  }
}

export default connect(mapStateToProps)(Main);
