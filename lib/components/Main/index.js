"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Header = _interopRequireDefault(require("../Header"));
var _DomainSearchForm = _interopRequireDefault(require("../DomainSearchForm"));
var _Footer = _interopRequireDefault(require("../Footer"));
//index.html的汇总组件，用于接收参数，加载各个子组件。

// 确保路径正确

const Main = _ref => {
  let {
    initialDomains
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("main", null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_DomainSearchForm.default, {
    initialDomains: initialDomains
  }), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};
var _default = exports.default = Main;