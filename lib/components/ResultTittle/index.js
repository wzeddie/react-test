"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
//返回首页组件

const ResultTittle = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "  bg-gray-50 text-center m-4"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full"
  }, "Domain Information"));
};
var _default = exports.default = ResultTittle;