webpackJsonp([9],{

/***/ 920:
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

var _trees = __webpack_require__(955);

var actions = _interopRequireWildcard(_trees);

var _require_auth = __webpack_require__(929);

var _require_auth2 = _interopRequireDefault(_require_auth);

var _search_trees = __webpack_require__(199);

var _search_trees2 = _interopRequireDefault(_search_trees);

var _pagination_trees = __webpack_require__(350);

var _pagination_trees2 = _interopRequireDefault(_pagination_trees);

var _config = __webpack_require__(13);

var _globalTrees = __webpack_require__(51);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//config
var env = "development" || "development";

var SERVER_URL = __webpack_require__(13)[env].SERVER_URL;

var TreesIndex = function (_Component) {
    _inherits(TreesIndex, _Component);

    function TreesIndex(props) {
        _classCallCheck(this, TreesIndex);

        var _this = _possibleConstructorReturn(this, (TreesIndex.__proto__ || Object.getPrototypeOf(TreesIndex)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(TreesIndex, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.searchTrees();
        }

        // componentWillReceiveProps(nextProps) {
        //   // if newly navigated from the router link...
        //   if((nextProps.location !== this.props.location) && nextProps.location.key) {
        //     this.searchTrees();
        //   }
        // }

    }, {
        key: 'searchTrees',
        value: function searchTrees() {
            this.props.dispatch((0, _globalTrees.searchTrees)(this.props.globalFilterData));
        }
    }, {
        key: 'onDeleteTreeClick',
        value: function onDeleteTreeClick(event) {
            var slug = event.target.getAttribute("data-slug");
            var id = event.target.getAttribute("data-id");
            var _props$searchResults = this.props.searchResults,
                offset = _props$searchResults.offset,
                limit = _props$searchResults.limit;
            //slug, search, offset, limit
            //todo: get [] to use real stored search if any

            this.props.dispatch(actions.deleteTree({ id: parseInt(id), slug: slug }, [], offset, limit));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            //fire the updated globalFilterData to the search action whenever the themes or categores get updated
            if (this.props.globalFilterData && prevProps.globalFilterData !== this.props.globalFilterData) {
                this.searchTrees();
            }
        }
    }, {
        key: 'renderTrees',
        value: function renderTrees() {
            var _this2 = this;

            return this.props.searchResults.trees.map(function (tree) {
                return _react2.default.createElement(
                    'li',
                    { className: 'list-group-item', key: tree.id },
                    _react2.default.createElement(
                        'span',
                        null,
                        tree.common_name
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#', 'data-id': tree.id, 'data-slug': tree.slug, onClick: _this2.onDeleteTreeClick.bind(_this2) },
                        'Delete'
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/' + _config.globals.ADMIN_URL + '/trees-list/' + tree.slug },
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
                            'Trees'
                        ),
                        _react2.default.createElement(_search_trees2.default, {
                            placeholder: 'search',
                            hasButton: false
                        }),
                        _react2.default.createElement(
                            'ul',
                            { className: 'list-group item-list' },
                            this.renderTrees()
                        ),
                        _react2.default.createElement(_pagination_trees2.default, null)
                    )
                )
            );
        }
    }]);

    return TreesIndex;
}(_react.Component);

function mapStateToProps(state) {
    return {
        searchResults: state.trees.searchResults,
        globalFilterData: state.globalTrees,
        treeDeleted: state.tree.treeDeleted
    };
}

exports.default = (0, _require_auth2.default)((0, _reactRedux.connect)(mapStateToProps)(TreesIndex));

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

/***/ 955:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchTrees = fetchTrees;
exports.getTree = getTree;
exports.addTree = addTree;
exports.updateTree = updateTree;
exports.deleteTree = deleteTree;
exports.clearTree = clearTree;
exports.clearTreeError = clearTreeError;
exports.clearUpdateTree = clearUpdateTree;
exports.addTreeError = addTreeError;
exports.updateTreeError = updateTreeError;

var _axios = __webpack_require__(122);

var _axios2 = _interopRequireDefault(_axios);

var _globalTrees = __webpack_require__(51);

var _types = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config
var env = "development" || "development";

var SERVER_URL = __webpack_require__(13)[env].SERVER_URL;

function fetchTrees() {
    return function (dispatch) {
        _axios2.default.get(SERVER_URL + '/trees/all').then(function (response) {

            dispatch({
                type: _types.FETCH_TREES,
                payload: response.data
            });
            return Promise.resolve();
        }).catch(function (err) {
            console.log('error fetching trees', err);
            //todo: if request is bad
            // dispatch(fetchTreesError('response.data.error'));
        });
    };
}

function getTree(slug) {
    return function (dispatch) {
        _axios2.default.get(SERVER_URL + '/trees/single/' + slug).then(function (response) {
            //if no response data, return a formatted object
            var data = {};
            if (!response.data) {
                data = {
                    category: [],
                    themes: [],
                    // make images null so we know it's an intentional clear
                    // an empty array makes it show the placeholder image
                    images: null
                };
            } else {
                data = response.data;
            }

            dispatch({
                type: _types.GET_TREE,
                payload: data
            });
        }).catch(function (err) {
            console.log('error getting tree: ', err);
        });
    };
}

function addTree(formData) {
    //needed for image file submission
    var config = {
        headers: { 'content-type': 'multipart/form-data' }
    };
    return function (dispatch) {
        _axios2.default.post(SERVER_URL + '/trees/create', formData, config).then(function (response) {
            if (response.data.error) {
                dispatch(addTreeError('There was an error creating the tree: ' + response.data.error));
            } else {
                dispatch({
                    type: _types.ADD_TREE,
                    payload: response.data
                });
            }
        }).catch(function (err) {
            dispatch(addTreeError('there was an error creating the tree: ' + err));
        });
    };
}

function updateTree(formData) {
    //needed for image file submission
    var config = {
        headers: { 'content-type': 'multipart/form-data' }
    };
    return function (dispatch) {
        // post to http://192.168.99.100/api/trees/update
        _axios2.default.post(SERVER_URL + '/trees/update', formData, config).then(function (response) {
            if (response.data.error) {
                dispatch(updateTreeError('there was an error updating the tree: ' + response.data.error));
            } else {
                dispatch({
                    type: _types.UPDATE_TREE,
                    payload: response.data
                });
            }
        }).catch(function (err) {
            console.log('there was an error updating the tree: ', err);
            //dispatch(updateTreeError(`there was an error updating the tree: ${err}`));
        });
    };
}

function deleteTree(tree, search, offset, limit) {
    return function (dispatch, getState) {
        // post to http://192.168.99.100/trees/delete
        _axios2.default.post(SERVER_URL + '/trees/delete', { tree: tree }).then(function (response) {
            if (response.data.error) {
                console.log('error: ', response.data.error);
                //dispatch(deleteTreeError(`there was an error deleting the tree: ${response.data.error}`));
            } else {
                //get the new list of trees now that one is deleted
                //we can access the globalTrees reducer from getState (passed in above)
                dispatch((0, _globalTrees.searchTrees)(getState().globalTrees));
            }
        }).catch(function (err) {
            console.log('error deleting the tree: ', err);
        });
    };
}

function clearTree() {
    return {
        type: _types.ADD_TREE,
        payload: ''
    };
}

function clearTreeError(error) {
    return {
        type: _types.ADD_TREE_ERROR,
        payload: ''
    };
}

function clearUpdateTree() {
    return {
        type: _types.UPDATE_TREE,
        payload: ''
    };
}

function addTreeError(error) {
    return {
        type: _types.ADD_TREE_ERROR,
        payload: error
    };
}

function updateTreeError(error) {
    return {
        type: _types.UPDATE_TREE_ERROR,
        payload: error
    };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ })

});
//# sourceMappingURL=9.react.js.map