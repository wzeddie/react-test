"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
require("./mycss.css");
var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _DomainInfo = _interopRequireDefault(require("./components/DomainInfo"));
//result.html页面的react页面的入口页面
//添加tailwind的入口文件

_client.default.hydrateRoot( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_DomainInfo.default, null)), document.getElementById('root'));