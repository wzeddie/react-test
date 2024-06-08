"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _DomainInfo = _interopRequireDefault(require("./components/DomainInfo"));
//result.html页面的react页面的入口页面

_reactDom.default.hydrateRoot( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_DomainInfo.default, null)), document.getElementById('root'));