webpackJsonp([13],{

/***/ 914:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _auth = __webpack_require__(954);

var actions = _interopRequireWildcard(_auth);

var _sidebar = __webpack_require__(928);

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signout = function (_Component) {
  _inherits(Signout, _Component);

  function Signout() {
    _classCallCheck(this, Signout);

    return _possibleConstructorReturn(this, (Signout.__proto__ || Object.getPrototypeOf(Signout)).apply(this, arguments));
  }

  _createClass(Signout, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.signoutUser();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'admin-main' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_sidebar2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'main-window columns small-12 large-9' },
            'You have been signed out'
          )
        )
      );
    }
  }]);

  return Signout;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(null, actions)(Signout);

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
//# sourceMappingURL=13.react.js.map