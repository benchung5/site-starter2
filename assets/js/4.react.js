webpackJsonp([4],{

/***/ 917:
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

var _global = __webpack_require__(67);

var actions = _interopRequireWildcard(_global);

var _articles = __webpack_require__(349);

var _require_auth = __webpack_require__(929);

var _require_auth2 = _interopRequireDefault(_require_auth);

var _search_articles = __webpack_require__(962);

var _search_articles2 = _interopRequireDefault(_search_articles);

var _pagination_articles = __webpack_require__(963);

var _pagination_articles2 = _interopRequireDefault(_pagination_articles);

var _config = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//config
var env = "development" || "development";

var SERVER_URL = __webpack_require__(13)[env].SERVER_URL;

var ArticlesIndex = function (_Component) {
    _inherits(ArticlesIndex, _Component);

    function ArticlesIndex(props) {
        _classCallCheck(this, ArticlesIndex);

        var _this = _possibleConstructorReturn(this, (ArticlesIndex.__proto__ || Object.getPrototypeOf(ArticlesIndex)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(ArticlesIndex, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.searchArticles();
        }

        // componentWillReceiveProps(nextProps) {
        //   // if newly navigated from the router link...
        //   if((nextProps.location !== this.props.location) && nextProps.location.key) {
        //     this.resetArticlesList();
        //   }
        // }

        // resetArticlesList() {
        //     this.props.searchArticles(this.props.globalFilterData);
        // }

    }, {
        key: 'searchArticles',
        value: function searchArticles() {
            this.props.searchArticles(this.props.globalFilterData);
        }
    }, {
        key: 'onDeleteArticleClick',
        value: function onDeleteArticleClick(event) {
            var slug = event.target.getAttribute("data-slug");
            var id = event.target.getAttribute("data-id");
            var _props$articles = this.props.articles,
                offset = _props$articles.offset,
                limit = _props$articles.limit;
            //slug, search, offset, limit
            //todo: get [] to use real stored search if any

            this.props.dispatch((0, _articles.deleteArticle)({ id: parseInt(id), slug: slug }, [], offset, limit));
        }
    }, {
        key: 'onDuplicateArticleClick',
        value: function onDuplicateArticleClick(event) {
            var slug = event.target.getAttribute("data-slug");
            var _props$articles2 = this.props.articles,
                offset = _props$articles2.offset,
                limit = _props$articles2.limit;
            //slug, search, offset, limit
            //todo: get [] to use real stored search if any

            this.props.duplicateArticle(slug, [], offset, limit);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            //fire the updated globalFilterData to the search action whenever the themes or categores get updated
            if (this.props.globalFilterData && prevProps.globalFilterData !== this.props.globalFilterData) {
                this.searchArticles();
            }
        }
    }, {
        key: 'renderArticles',
        value: function renderArticles() {
            var _this2 = this;

            return this.props.articles.articles.map(function (article) {
                return _react2.default.createElement(
                    'li',
                    { className: 'list-group-item', key: article.id },
                    _react2.default.createElement(
                        'span',
                        null,
                        article.name
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#', 'data-id': article.id, 'data-slug': article.slug, onClick: _this2.onDeleteArticleClick.bind(_this2) },
                        'Delete'
                    ),
                    _react2.default.createElement(
                        'a',
                        { href: '#', 'data-id': article.id, 'data-slug': article.slug, onClick: _this2.onDuplicateArticleClick.bind(_this2) },
                        'Duplicate'
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/' + _config.globals.ADMIN_URL + '/articles-list/' + article.slug },
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
                            'Articles'
                        ),
                        _react2.default.createElement(_search_articles2.default, {
                            placeholder: 'search',
                            hasButton: false
                        }),
                        _react2.default.createElement(
                            'ul',
                            { className: 'list-group item-list' },
                            this.renderArticles()
                        ),
                        _react2.default.createElement(_pagination_articles2.default, null)
                    )
                )
            );
        }
    }]);

    return ArticlesIndex;
}(_react.Component);

function mapStateToProps(state) {
    return {
        articles: state.articles.searchResults,
        articleDeleted: state.article.articleDeleted,
        globalFilterData: state.global
    };
}

exports.default = (0, _require_auth2.default)((0, _reactRedux.connect)(mapStateToProps, actions)(ArticlesIndex));

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

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reduxForm = __webpack_require__(121);

var _reactRedux = __webpack_require__(8);

var _global = __webpack_require__(67);

var actions = _interopRequireWildcard(_global);

var _field_search = __webpack_require__(198);

var _field_search2 = _interopRequireDefault(_field_search);

var _stringUtils = __webpack_require__(38);

var _utils = __webpack_require__(50);

var _views = __webpack_require__(68);

var _config = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchForm = function (_Component) {
	_inherits(SearchForm, _Component);

	function SearchForm() {
		_classCallCheck(this, SearchForm);

		return _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).apply(this, arguments));
	}

	_createClass(SearchForm, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var search = (0, _utils.getUrlParams)('search');
			if (search) {
				//update the global filter and search
				this.props.dispatch(actions.filterSearchArticles(search[0]));

				//fill in the search box with the value
				this.props.dispatch((0, _reduxForm.change)('search-form', 'search', search[0]));
			}
		}
	}, {
		key: 'handleFormSubmit',
		value: function handleFormSubmit(formProps) {
			//call action for data (send the text along with the global data)
			// if empty search, make it empty
			if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
				this.props.dispatch(actions.filterSearchArticles(null));
			} else {
				//else, update the global filter and search
				var search = (0, _stringUtils.formatSearchString)(formProps.search);
				this.props.dispatch(actions.filterSearchArticles(search));

				//store in the url
				(0, _utils.setUrlParams)('search', search);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (this.props.globalFilterData && prevProps.globalFilterData.search !== this.props.globalFilterData.search) {
				this.props.dispatch(actions.searchArticles(this.props.globalFilterData));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var handleSubmit = this.props.handleSubmit;

			return _react2.default.createElement(
				'form',
				{ ref: 'form', className: 'search-form', onSubmit: handleSubmit(this.handleFormSubmit.bind(this)) },
				this.props.hasButton && _react2.default.createElement('button', { type: 'submit', className: 'search-button' }),
				_react2.default.createElement(_reduxForm.Field, {
					name: 'search',
					component: _field_search2.default,
					placeholder: this.props.placeholder
				})
			);
		}
	}]);

	return SearchForm;
}(_react.Component);

function validate(formProps) {
	var errors = {};

	//validation...

	return errors;
}

function mapStateToProps(state) {
	return {
		globalFilterData: state.global
	};
}

exports.default = (0, _reduxForm.reduxForm)({
	form: 'search-form',
	validate: validate
})((0, _reactRedux.connect)(mapStateToProps, { viewsToggle: _views.viewsToggle })(SearchForm));

// import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import * as actions from '../../../actions/articles';
// import renderSearch from '../../parts/field_search';
// import { globals } from '../../../config.js';
// import { formatSearchString } from '../../../lib/stringUtils';


// class SearchFormAdmin extends Component {

// 	handleFormSubmit(formProps) {
// 		//call action for data (send the text along with the global data)
// 		// if empty search, just search with blank string
// 		if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
// 			this.props.dispatch(actions.searchArticlesAdmin({ search: [], offset: 0, limit: globals.ADMIN_ENTRIES_PER_PAGE }));
// 		} else {
// 			//else, query it using keywords
// 			this.props.dispatch(actions.searchArticlesAdmin({ 
// 				search: formatSearchString(formProps.search),
// 				offset: 0,
// 				limit: globals.ADMIN_ENTRIES_PER_PAGE
// 			}));
// 		}
// 	}

// 	render() {
// 		const { handleSubmit } = this.props;
// 		return (
// 				<form className="search-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
// 					<Field
// 						name="search"
// 						component={renderSearch}
// 						placeholder="search"
// 					/>
// 				</form>
// 			)
// 	}

// }

// function validate(formProps) {
// 	const errors = {};

// 	//validation...
// 	return errors;
// }

// function mapStateToProps(state) {
// 	return {
// 		// articlesSearch: state.articles.articlesAdmin
// 	}
// }

// export default reduxForm({
// 	form: 'search-form',
// 	validate
// })(
// connect(mapStateToProps, actions)(SearchFormAdmin)
// );

/***/ }),

/***/ 963:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(8);

var _config = __webpack_require__(13);

var _global = __webpack_require__(67);

var actions = _interopRequireWildcard(_global);

var _utils = __webpack_require__(50);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationArticles = function (_Component) {
  _inherits(PaginationArticles, _Component);

  function PaginationArticles() {
    _classCallCheck(this, PaginationArticles);

    return _possibleConstructorReturn(this, (PaginationArticles.__proto__ || Object.getPrototypeOf(PaginationArticles)).apply(this, arguments));
  }

  _createClass(PaginationArticles, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var offset = (0, _utils.getUrlParams)('offset');
      if (offset) {
        // set offset from url
        this.props.dispatch(actions.filterOffsetArticles(parseInt(offset[0])));
      }
    }
  }, {
    key: 'back',
    value: function back() {
      var offset = this.props.globalFilterData.offset;


      if (offset === 0) {
        return;
      }

      var newOffset = offset - _config.globals.ADMIN_ENTRIES_PER_PAGE;
      this.updateOffset(newOffset);
    }
  }, {
    key: 'advance',
    value: function advance() {
      var count = this.props.searchResults.count;
      var offset = this.props.globalFilterData.offset;

      if (offset + _config.globals.ADMIN_ENTRIES_PER_PAGE >= count) {
        return;
      }

      var newOffset = offset + _config.globals.ADMIN_ENTRIES_PER_PAGE;
      this.updateOffset(newOffset);
    }
  }, {
    key: 'updateOffset',
    value: function updateOffset(newOffset) {
      var count = this.props.searchResults.count;
      var _props$globalFilterDa = this.props.globalFilterData,
          search = _props$globalFilterDa.search,
          categories = _props$globalFilterDa.categories,
          offset = _props$globalFilterDa.offset;

      // set the new offset in the global fields

      this.props.dispatch(actions.filterOffsetArticles(newOffset));

      (0, _utils.setUrlParams)('offset', newOffset);
    }
  }, {
    key: 'left',
    value: function left() {
      var offset = this.props.globalFilterData.offset;

      return _react2.default.createElement(
        'div',
        { className: 'paginate-previous ' + (offset === 0 ? 'disabled' : '') },
        _react2.default.createElement(
          'a',
          { 'aria-label': 'Previous page', onClick: this.back.bind(this) },
          'Previous'
        )
      );
    }
  }, {
    key: 'right',
    value: function right() {
      var count = this.props.searchResults.count;
      var offset = this.props.globalFilterData.offset;

      var end = offset + _config.globals.ADMIN_ENTRIES_PER_PAGE >= count ? true : false;
      return _react2.default.createElement(
        'div',
        { className: 'paginate-next ' + (end ? 'disabled' : '') },
        _react2.default.createElement(
          'a',
          { 'aria-label': 'Next page', onClick: this.advance.bind(this) },
          'Next'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var count = this.props.searchResults.count;
      var offset = this.props.globalFilterData.offset;

      return _react2.default.createElement(
        'div',
        { className: 'paginate-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'paginate', role: 'navigation', 'aria-label': 'Pagination' },
          this.left(),
          _react2.default.createElement(
            'div',
            null,
            'Page ',
            offset / _config.globals.ADMIN_ENTRIES_PER_PAGE + 1
          ),
          this.right()
        ),
        _react2.default.createElement(
          'div',
          { className: 'records-count' },
          '(',
          count,
          ' records total)'
        )
      );
    }
  }]);

  return PaginationArticles;
}(_react.Component);

function mapStateToProps(state) {
  return {
    searchResults: state.articles.searchResults,
    globalFilterData: state.global
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PaginationArticles);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { globals } from '../../../config.js';

// class Paginator extends Component {
//   back() {
//     const { offset, limit } = this.props.sourceData;
//     if (offset === 0 ) { return; }
//     //todo: get this.props.search to pull from stored search if any
//     this.props.searchAction({ search: this.props.search, offset: offset - globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
//   }

//   advance() {
//     const { offset, limit, count } = this.props.sourceData;
//     if ((offset + limit) > count) { return; }
//     //todo: get this.props.search to pull from stored search if any
//     this.props.searchAction({ search: this.props.search, offset: offset + globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
//   }

//   left() {
//     const { offset } = this.props.sourceData;
//     return (
//       <div className={`paginate-previous ${offset === 0 ? 'disabled' : ''}`}>
//         <a aria-label="Previous page" onClick={this.back.bind(this)}>
//           Previous
//         </a>
//       </div>
//     );
//   }

//   right() {
//     const { offset, limit, count } = this.props.sourceData;
//     const end = ((offset + limit) >= count) ? true : false;
//     return (
//       <div className={`paginate-next ${end ? 'disabled' : ''}`}>
//         <a aria-label="Next page" onClick={this.advance.bind(this)}>
//           Next
//         </a>
//       </div>
//     );
//   }

//   render() {
//     const { offset, count } = this.props.sourceData;
//     return (
//       <div className="paginate-wrapper">
//         <div className="paginate" role="navigation" aria-label="Pagination">
//           {this.left()}
//           <div>Page {offset / globals.ADMIN_ENTRIES_PER_PAGE + 1}</div>
//           {this.right()}
//         </div>
//         <div className="records-count">({count} records total)</div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//     return {
//         //articlesResults: state.articles.searchResultsAdmin
//     };
// }

// export default connect(mapStateToProps)(Paginator);

/***/ })

});
//# sourceMappingURL=4.react.js.map