import React, { Component } from 'react';
import Sidebar from '../sidebar';
import { reduxForm, Field } from 'redux-form';
import { signupUser, authError, clearUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';
import RequireAuth from './require_auth';

class Signup extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      renderSuccess: false
    }
  }

  componentWillReceiveProps(nextProps) {
    // if newly navigated from the router link...
    if(nextProps.location !== this.props.location) {
      //clear the form fields
      this.props.reset('signup');
    }
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderSuccess() {
    if (this.props.user && !this.props.errorMessage) {
      const { user } = this.props;
      return (
        <p>user: {user} successfully added</p>
        )
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.user && (this.props.user !== this.props.user)) {
      this.props.authError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    //by calling these actions
    this.props.authError('');
    this.props.clearUser();
  }


  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <div className="admin-main">
        <div className="row">
          <Sidebar/>
          <div className="columns small-12 large-9">
            <h3 className="margin-bottom">Add User</h3>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              
              <Field
                label="Email:"
                name="email"
                component={renderField}
              />

              <Field
                label="Password:"
                name="password"
                component={renderField}
              />

              <Field
                label="Confirm Password:"
                name="passwordConfirm"
                component={renderField}
              />

              <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
            {this.renderAlert()}
            {this.renderSuccess()}
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  //password strenth:
  //https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
  //let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  //let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  let lightRegex = new RegExp("^((?=.*[A-Z]|[a-z])(?=.*[0-9]))(?=.{6,})");
  if(!lightRegex.test(formProps.password)) {
      //six characters or more and has at least one lowercase and one uppercase alphabetical 
      //character or has at least one lowercase and one numeric character or has at least one 
      //uppercase and one numeric character
      errors.password = 'password must be at least 6 characters long with at least one numeric character';
  }

  return errors;
}

function mapStateToProps(state) {
  return { 
      errorMessage: state.auth.error,
      user: state.auth.user
     };
}

export default RequireAuth(reduxForm({
  validate,
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
})(
    connect(mapStateToProps, { signupUser, authError, clearUser })(Signup)
    ));
