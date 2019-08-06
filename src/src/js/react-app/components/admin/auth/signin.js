import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import renderField from '../parts/form_fields';
import { globals } from '../../../config.js';


class Signin extends Component {

    componentWillMount() {
        if (this.props.authenticated) {
          // if the user is already logged in, just forward them right to the dashboard
          this.props.history.push('/'+globals.ADMIN_URL);
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.authenticated) {
          //if just authenticated, redirect to dashboard
          this.props.history.push('/'+globals.ADMIN_URL);
        }
    }

    handleFormSubmit({ email, password, key }) {
        //need to do sometihing to log user in
        this.props.signinUser({ email, password, key });
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

    render() {
        //props that are pulled off of redux form
        const { handleSubmit, fields: {email, password, key} } = this.props;

        return (
            <div className="admin-main">
            <div className="row">
                    <div className="columns small-12">
                        <h1 className="margin-bottom">Login:</h1>
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
                              label="Key:"
                              name="key"
                              component={renderField}
                            />

                            { this.renderAlert() }
                            <button action="submit" className="btn btn-primary">Sign in</button>
                        </form>
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

  if (!formProps.key) {
    errors.key = 'Please enter a key';
  }
  
  return errors;
}

function mapStateToProps(state) {
    //have our state to show up in props as errorMessage
    return {
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error,
        authenticated: state.auth.authenticated
    }
}

export default reduxForm({
    validate,
    form: 'signin',
    fields: ['email', 'password']
})(
    connect(mapStateToProps, { signinUser })(Signin)
    );
