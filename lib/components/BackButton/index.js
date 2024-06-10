"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
//返回首页组件

const BackButton = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "/index.html"
  }, "Back to Home"));
};
var _default = exports.default = BackButton;