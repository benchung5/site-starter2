import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions/db';
import Sidebar from '../sidebar';
import RequireAuth from '../auth/require_auth';

class BackupDB extends Component {

  onBackupSubmit(e) {
    this.props.backupDb();
  }

  renderSuccess() {
    //only render if there's no error message
    if(this.props.backupDbSuccess && !this.props.errorMessage) {
      return (
        <div className="submission-message">
          <span>Database successfully backed up.</span>
        </div>
        )
    }
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        );
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.backupDbSuccess && (prevProps.backupDbSuccess !== this.props.backupDbSuccess)) {
      this.props.backupDbError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    //by calling these actions
    this.props.backupDbError('');
    this.props.clearBackupDb();
  }
    
  render() {
      const { handleSubmit } = this.props;
      return (
        <div className="admin-main">
          <div className="row">
            <Sidebar/>
            <div className="main-window columns small-12 large-9">
              <h3>Backup database</h3>
              <button className="btn" onClick={this.onBackupSubmit.bind(this)}>backup</button>
              {this.renderSuccess()}
              {this.renderError()}
            </div>
          </div>
        </div>
      );
  }

}

function mapStateToProps(state) {
  return { 
    backupDbSuccess: state.db.backupDbSuccess,
    errorMessage: state.db.backupDbError
  };
}


export default RequireAuth(connect(mapStateToProps, actions)(BackupDB));