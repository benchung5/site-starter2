webpackJsonp([7],{

/***/ 915:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _sidebar = __webpack_require__(928);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _reduxForm = __webpack_require__(121);

var _auth = __webpack_require__(954);

var _reactRedux = __webpack_require__(8);

var _form_fields = __webpack_require__(930);

var _form_fields2 = _interopRequireDefault(_form_fields);

var _require_auth = __webpack_require__(929);

var _require_auth2 = _interopRequireDefault(_require_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_Component) {
  _inherits(Signup, _Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

    _this.state = {
      renderSuccess: false
    };
    return _this;
  }

  _createClass(Signup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // if newly navigated from the router link...
      if (nextProps.location !== this.props.location) {
        //clear the form fields
        this.props.reset('signup');
      }
    }
  }, {
    key: 'handleFormSubmit',
    value: function handleFormSubmit(formProps) {
      // Call action creator to sign up the user!
      this.props.signupUser(formProps);
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
    key: 'renderSuccess',
    value: function renderSuccess() {
      if (this.props.user && !this.props.errorMessage) {
        var user = this.props.user;

        return _react2.default.createElement(
          'p',
          null,
          'user: ',
          user,
          ' successfully added'
        );
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      //clear out error messsages if any
      if (this.props.user && this.props.user !== this.props.user) {
        this.props.authError('');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      //clear messages when navigating away
      //by calling these actions
      this.props.authError('');
      this.props.clearUser();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          handleSubmit = _props.handleSubmit,
          _props$fields = _props.fields,
          email = _props$fields.email,
          password = _props$fields.password,
          passwordConfirm = _props$fields.passwordConfirm;


      return _react2.default.createElement(
        'div',
        { className: 'admin-main' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_sidebar2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'columns small-12 large-9' },
            _react2.default.createElement(
              'h3',
              { className: 'margin-bottom' },
              'Add User'
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
                label: 'Confirm Password:',
                name: 'passwordConfirm',
                component: _form_fields2.default
              }),
              _react2.default.createElement(
                'button',
                { action: 'submit', className: 'btn btn-primary' },
                'Sign up!'
              )
            ),
            this.renderAlert(),
            this.renderSuccess()
          )
        )
      );
    }
  }]);

  return Signup;
}(_react.Component);

function validate(formProps) {
  var errors = {};

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
  var lightRegex = new RegExp("^((?=.*[A-Z]|[a-z])(?=.*[0-9]))(?=.{6,})");
  if (!lightRegex.test(formProps.password)) {
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

exports.default = (0, _require_auth2.default)((0, _reduxForm.reduxForm)({
  validate: validate,
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm']
})((0, _reactRedux.connect)(mapStateToProps, { signupUser: _auth.signupUser, authError: _auth.authError, clearUser: _auth.clearUser })(Signup)));

/***/ }),

/***/ 928:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(346);

var _cloneDeep = __webpack_require__(196);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideMenu = function (_Component) {
    _inherits(SideMenu, _Component);

    function SideMenu(props) {
        _classCallCheck(this, SideMenu);

        var _this = _possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props));

        _this.state = {
            linkList: [{ title: 'Website', link: '/', active: false }, { title: 'Logout', link: '/' + _config.globals.ADMIN_URL + '/signout', active: false }, { title: 'Dashboard', link: '/' + _config.globals.ADMIN_URL + '', active: false }, { title: 'View Articles', link: '/' + _config.globals.ADMIN_URL + '/articles-list', active: false }, { title: 'Add Articles', link: '/' + _config.globals.ADMIN_URL + '/article-add', active: false }, { title: 'View Plants', link: '/' + _config.globals.ADMIN_URL + '/trees-list', active: false }, { title: 'Add Plants', link: '/' + _config.globals.ADMIN_URL + '/tree-add', active: false }, { title: 'View Users', link: '/' + _config.globals.ADMIN_URL + '/users-list', active: false }, { title: 'Add User', link: '/' + _config.globals.ADMIN_URL + '/signup', active: false }, { title: 'View Categories', link: '/' + _config.globals.ADMIN_URL + '/category-list', active: false }, { title: 'Add Category', link: '/' + _config.globals.ADMIN_URL + '/category-add', active: false }, { title: 'Backup', link: '/' + _config.globals.ADMIN_URL + '/backup', active: false }]
        };
        return _this;
    }

    _createClass(SideMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //check url and highlight accordingly
            var linkListClone = (0, _cloneDeep2.default)(this.state.linkList);
            linkListClone.forEach(function (item, index) {

                //set all to inactive at first
                if (item.active) {
                    item.active = false;
                }
                //if url path equals link, activate it
                if (item.link === window.location.pathname) {
                    item.active = true;
                }
            });
            this.setState({ linkList: linkListClone });
        }
    }, {
        key: 'onLinkClick',
        value: function onLinkClick(e) {}
    }, {
        key: 'renderButtons',
        value: function renderButtons() {
            var _this2 = this;

            return this.state.linkList.map(function (item, index) {
                //title to lowercase, replace slashes with dashes
                return _react2.default.createElement(
                    'li',
                    { key: index, className: '' + (item.active ? 'active' : '') },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { onClick: _this2.onLinkClick.bind(_this2), className: 'nav-link', to: item.link, 'data-id': index },
                        item.title
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'columns small-12 large-3 admin-sidebar' },
                _react2.default.createElement(
                    'ul',
                    { className: 'vertical menu admin-side-menu' },
                    this.renderButtons()
                )
            );
        }
    }]);

    return SideMenu;
}(_react.Component);

exports.default = SideMenu;

/***/ }),

/***/ 929:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
    var Authentication = function (_Component) {
        _inherits(Authentication, _Component);

        function Authentication() {
            _classCallCheck(this, Authentication);

            return _possibleConstructorReturn(this, (Authentication.__proto__ || Object.getPrototypeOf(Authentication)).apply(this, arguments));
        }

        _createClass(Authentication, [{
            key: 'componentWillMount',


            // comment out these two blocks to disable auth
            //if not authenticated at start, push to the home page
            value: function componentWillMount() {
                if (!this.props.authenticated) {
                    //this.context.router.push('/protected');
                    this.props.history.push('/' + _config.globals.ADMIN_URL + '/protected');
                }
            }
            //this one fires when component is updated

        }, {
            key: 'componentWillUpdate',
            value: function componentWillUpdate(nextProps) {
                if (!nextProps.authenticated) {
                    //this.context.router.push('/protected');
                    this.props.history.push('/' + _config.globals.ADMIN_URL + '/protected');
                }
            }
        }, {
            key: 'render',
            value: function render() {
                //the this.props is for passing up new props from the combined component *instance to 
                //existing props on the original composed component below
                return _react2.default.createElement(ComposedComponent, this.props);
            }
        }]);

        return Authentication;
    }(_react.Component);

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return (0, _reactRedux.connect)(mapStateToProps)(Authentication);
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

////example usage of this HOC
// import Authenticatoin // this is the HOC
// import Resources // this is the component to wraps
// const ComposedComponent = Authentication(Resources);
//// in some render method...
// <ComposedComponent resources={resourceList}>
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from "prop-types";

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it

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
//# sourceMappingURL=7.react.js.map