webpackJsonp([15],{

/***/ 912:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(346);

var _config = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProtectedWarning = function (_Component) {
	_inherits(ProtectedWarning, _Component);

	function ProtectedWarning() {
		_classCallCheck(this, ProtectedWarning);

		return _possibleConstructorReturn(this, (ProtectedWarning.__proto__ || Object.getPrototypeOf(ProtectedWarning)).apply(this, arguments));
	}

	_createClass(ProtectedWarning, [{
		key: 'render',
		value: function render() {
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
							'p',
							null,
							'Please sign up or ',
							_react2.default.createElement(
								_reactRouterDom.Link,
								{ className: '', to: '/' + _config.globals.ADMIN_URL + '/signin' },
								'login'
							),
							'.'
						)
					)
				)
			);
		}
	}]);

	return ProtectedWarning;
}(_react.Component);

exports.default = ProtectedWarning;

/***/ })

});
//# sourceMappingURL=15.react.js.map