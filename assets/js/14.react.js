webpackJsonp([14],{

/***/ 913:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(121);

var _auth = __webpack_require__(954);

var _reactRedux = __webpack_require__(8);

var _form_fields = __webpack_require__(930);

var _form_fields2 = _interopRequireDefault(_form_fields);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signin = function (_Component) {
    _inherits(Signin, _Component);

    function Signin() {
        _classCallCheck(this, Signin);

        return _possibleConstructorReturn(this, (Signin.__proto__ || Object.getPrototypeOf(Signin)).apply(this, arguments));
    }

    _createClass(Signin, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.authenticated) {
                // if the user is already logged in, just forward them right to the dashboard
                this.props.history.push('/' + _config.globals.ADMIN_URL);
            }
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            if (nextProps.authenticated) {
                //if just authenticated, redirect to dashboard
                this.props.history.push('/' + _config.globals.ADMIN_URL);
            }
        }
    }, {
        key: 'handleFormSubmit',
        value: function handleFormSubmit(_ref) {
            var email = _ref.email,
                password = _ref.password,
                key = _ref.key;

            //need to do sometihing to log user in
            this.props.signinUser({ email: email, password: password, key: key });
        }
    }, {
        key: 'renderAlert',
        value: function renderAlert() {
            if (this.props.errorMessage) {
                return _react2.default.createElement(
                    'div',
                    { className: 'alert alert-danger' },
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Oops!'
                    ),
                    ' ',
                    this.props.errorMessage
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            //props that are pulled off of redux form
            var _props = this.props,
                handleSubmit = _props.handleSubmit,
                _props$fields = _props.fields,
                email = _props$fields.email,
                password = _props$fields.password,
                key = _props$fields.key;


            return _react2.default.createElement(
                'div',
                { className: 'admin-main' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'columns small-12' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'margin-bottom' },
                            'Login:'
                        ),
                        _react2.default.createElement(
                            'form',
                            { onSubmit: handleSubmit(this.handleFormSubmit.bind(this)) },
                            _react2.default.createElement(_reduxForm.Field, {
                                label: 'Email:',
                                name: 'email',
                                component: _form_fields2.default
                            }),
                            _react2.default.createElement(_reduxForm.Field, {
                                label: 'Password:',
                                name: 'password',
                                component: _form_fields2.default
                            }),
                            _react2.default.createElement(_reduxForm.Field, {
                                label: 'Key:',
                                name: 'key',
                                component: _form_fields2.default
                            }),
                            this.renderAlert(),
                            _react2.default.createElement(
                                'button',
                                { action: 'submit', className: 'btn btn-primary' },
                                'Sign in'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Signin;
}(_react.Component);

function validate(formProps) {
    var errors = {};

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
    return _defineProperty({
        authenticated: state.auth.authenticated,
        errorMessage: state.auth.error
    }, 'authenticated', state.auth.authenticated);
}

exports.default = (0, _reduxForm.reduxForm)({
    validate: validate,
    form: 'signin',
    fields: ['email', 'password']
})((0, _reactRedux.connect)(mapStateToProps, { signinUser: _auth.signinUser })(Signin));

/***/ }),

/***/ 930:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderField(field) {
  var _field$meta = field.meta,
      touched = _field$meta.touched,
      error = _field$meta.error;

  var className = 'form-group ' + (touched && error ? 'has-danger' : '');

  if (field.type === 'textarea') {
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'label',
        null,
        field.label
      ),
      _react2.default.createElement('textarea', _extends({
        className: 'form-control',
        rows: '12',
        cols: '50'
      }, field.input)),
      _react2.default.createElement(
        'div',
        { className: 'error' },
        touched ? error : ''
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'label',
        null,
        field.label
      ),
      _react2.default.createElement('input', _extends({
        className: 'form-control',
        type: 'text'
      }, field.input)),
      _react2.default.createElement(
        'div',
        { className: 'error' },
        touched ? error : ''
      )
    );
  }
}

exports.default = renderField;

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signinUser = signinUser;
exports.signupUser = signupUser;
exports.clearUser = clearUser;
exports.authError = authError;
exports.signoutUser = signoutUser;
exports.fetchMessage = fetchMessage;

var _axios = __webpack_require__(122);

var _axios2 = _interopRequireDefault(_axios);

var _history = __webpack_require__(348);

var _history2 = _interopRequireDefault(_history);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config
var env = "development" || "development";

var SERVER_URL = __webpack_require__(13)[env].SERVER_URL;

var POST_CONFIG = __webpack_require__(13)['globals'].POST_CONFIG;

function signinUser(_ref) {
  var email = _ref.email,
      password = _ref.password,
      key = _ref.key;

  return function (dispatch) {
    // Submit email/password to the server
    _axios2.default.post(SERVER_URL + '/users/sign_in', { email: email, password: password, key: key }, POST_CONFIG).then(function (response) {
      // If request is good...
      if (response.data.token) {
        // - Update state to indicate user is authenticated
        dispatch({ type: _types.AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
      } else {
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      }
    }).catch(function () {
      // If request is bad...
      // - Show an error to the user
      dispatch(authError('Error logging in'));
    });
  };
}

function signupUser(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;

  return function (dispatch) {
    _axios2.default.post(SERVER_URL + '/users/create', { email: email, password: password }).then(function (response) {
      if (response.data.error) {
        dispatch(authError('there was an error signing up user: ' + response.data.error));
      } else {
        dispatch({
          type: _types.ADD_USER,
          payload: response.data
        });
        //localStorage.setItem('token', response.data.token);
      }
    }).catch(function (err) {
      return dispatch(authError('there was an error signing up: ' + err));
    });
  };
}

function clearUser() {
  return {
    type: _types.ADD_USER,
    payload: ''
  };
}

function authError(error) {
  return {
    type: _types.AUTH_ERROR,
    payload: error
  };
}

function signoutUser() {
  localStorage.removeItem('token');
  return { type: _types.UNAUTH_USER };
}

function fetchMessage() {
  return function (dispatch) {
    _axios2.default.get(SERVER_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(function (response) {
      dispatch({
        type: _types.FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  };
}

/***/ })

});
//# sourceMappingURL=14.react.js.map