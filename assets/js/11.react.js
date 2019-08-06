webpackJsonp([11],{

/***/ 925:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _sidebar = __webpack_require__(928);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _reactRouterDom = __webpack_require__(346);

var _categories = __webpack_require__(933);

var actions = _interopRequireWildcard(_categories);

var _require_auth = __webpack_require__(929);

var _require_auth2 = _interopRequireDefault(_require_auth);

var _config = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeIndex = function (_Component) {
	_inherits(ThemeIndex, _Component);

	function ThemeIndex() {
		_classCallCheck(this, ThemeIndex);

		return _possibleConstructorReturn(this, (ThemeIndex.__proto__ || Object.getPrototypeOf(ThemeIndex)).apply(this, arguments));
	}

	_createClass(ThemeIndex, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.props.fetchCategories();
		}
	}, {
		key: 'onDeleteCategoryClick',
		value: function onDeleteCategoryClick(event) {
			var slug = event.target.getAttribute('data-slug');
			this.props.deleteCategory({ slug: slug });
		}
	}, {
		key: 'rendercategories',
		value: function rendercategories() {
			var _this2 = this;

			return this.props.categories.map(function (item, index) {
				return _react2.default.createElement(
					'li',
					{ className: 'list-group-item', key: item.slug },
					_react2.default.createElement(
						'span',
						null,
						item.name
					),
					_react2.default.createElement(
						'a',
						{ href: '#', 'data-id': item._id, 'data-slug': item.slug, onClick: _this2.onDeleteCategoryClick.bind(_this2) },
						'Delete'
					),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/' + _config.globals.ADMIN_URL + '/category-list/' + item.slug },
						'edit'
					)
				);
			});
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
						_react2.default.createElement(
							'h3',
							null,
							'categories'
						),
						_react2.default.createElement(
							'ul',
							{ className: 'list-group item-list' },
							this.rendercategories()
						)
					)
				)
			);
		}
	}]);

	return ThemeIndex;
}(_react.Component);

function mapStateToProps(state) {
	return {
		categories: state.categories.all,
		categoriesDeleted: state.category.categoryDeleted
	};
}

exports.default = (0, _require_auth2.default)((0, _reactRedux.connect)(mapStateToProps, actions)(ThemeIndex));

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

/***/ 933:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addCategory = addCategory;
exports.fetchCategories = fetchCategories;
exports.deleteCategory = deleteCategory;
exports.getCategory = getCategory;
exports.updateCategory = updateCategory;
exports.clearUpdateCategory = clearUpdateCategory;
exports.clearCategory = clearCategory;
exports.addCategoryError = addCategoryError;

var _axios = __webpack_require__(122);

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config
var env = "development" || "development";

var SERVER_URL = __webpack_require__(13)[env].SERVER_URL;

function addCategory(formData) {
	return function (dispatch) {
		// post to: http://localhost:8080/api/categories/create
		_axios2.default.post(SERVER_URL + '/categories/create', formData).then(function (response) {
			if (response.data.error) {
				dispatch(addCategoryError('there was an error adding the category: ' + response.data.error));
			} else {
				dispatch({
					type: _types.ADD_CATEGORY,
					payload: response.data
				});
			}
		}).catch(function (err) {
			//todo: if request is bad
			dispatch(addCategoryError('there was an error adding the category: ' + err));
		});
	};
}

function fetchCategories() {
	return function (dispatch) {
		_axios2.default.get(SERVER_URL + '/categories/all').then(function (response) {
			dispatch({
				type: _types.FETCH_CATEGORIES,
				payload: response.data
			});
		}).catch(function (err) {
			console.log('error fetching categories: ', err);
		});
	};
}

function deleteCategory(_ref) {
	var slug = _ref.slug;

	return function (dispatch) {
		_axios2.default.post(SERVER_URL + '/categories/delete', { slug: slug }).then(function (response) {
			if (response.data.error) {
				console.log('error: ', response.data.error);
			} else {
				dispatch(fetchCategories());
			}
		}).catch(function (err) {
			console.log('error deleting the category: ', err);
		});
	};
}

function getCategory(slug) {
	return function (dispatch) {
		_axios2.default.get(SERVER_URL + '/categories/single/' + slug).then(function (response) {
			dispatch({
				type: _types.GET_CATEGORY,
				payload: response.data
			});
		}).catch(function (err) {
			console.log('error getting category: ', err);
		});
	};
}

function updateCategory(formData) {
	return function (dispatch) {
		_axios2.default.post(SERVER_URL + '/categories/update', formData).then(function (response) {
			if (response.data.error) {
				dispatch(updateCategoryError('there was an error updating the category: ' + response.data.error));
			} else {
				dispatch({
					type: _types.UPDATE_CATEGORY,
					payload: response.data
				});
			}
		}).catch(function (err) {
			console.log('error upating category: ', err);
		});
	};
}

function clearUpdateCategory() {
	return {
		type: _types.UPDATE_CATEGORY,
		payload: ''
	};
}

function clearCategory() {
	return {
		type: _types.ADD_CATEGORY,
		payload: ''
	};
}

function addCategoryError(error) {
	return {
		type: _types.ADD_CATEGORY_ERROR,
		payload: error
	};
}

/***/ })

});
//# sourceMappingURL=11.react.js.map