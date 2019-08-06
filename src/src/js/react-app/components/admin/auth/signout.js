import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/auth';
import Sidebar from '../sidebar'

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="admin-main">
      	<div className="row">
      	        <Sidebar/>
      	        <div className="main-window columns small-12 large-9">
      	        	You have been signed out
      	        </div>
      	</div>
      </div>
    	)
  }
}

export default connect(null, actions)(Signout);
