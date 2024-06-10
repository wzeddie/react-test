"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _DomainTable = _interopRequireDefault(require("../DomainTable"));
var _BackButton = _interopRequireDefault(require("../BackButton"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _Header = _interopRequireDefault(require("../Header"));
//result.html汇总组件，用于接收参数，并将各个组件汇总

const DomainInfo = _ref => {
  let {
    domainData,
    results
  } = _ref;
  //console.log('domaininfo',domainData)
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      textAlign: 'center'
    }
  }, "Domain Information"), /*#__PURE__*/_react.default.createElement(_DomainTable.default, {
    domainData: domainData,
    results: results
  }), /*#__PURE__*/_react.default.createElement(_BackButton.default, null), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};
var _default = exports.default = DomainInfo;