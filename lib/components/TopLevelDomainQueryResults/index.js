"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
//批量查询结果组件

const TopLevelDomainQueryResults = _ref => {
  let {
    results
  } = _ref;
  // Object.entries将results对象转换为键值对数组
  const resultEntries = Object.entries(results);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '15px',
      backgroundColor: 'white'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '5px',
      padding: '2px'
    }
  }, /*#__PURE__*/_react.default.createElement("h4", null, "Other Top-Level Domain (TLD) Query Results:")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '2px',
      display: 'flex',
      flexDirection: 'column'
    }
  }, resultEntries.map((_ref2, index) => {
    let [key, value] = _ref2;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      style: {
        padding: '15px'
      }
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: "/index.html",
      style: {
        textDecoration: 'none'
      },
      onClick: () => console.log('Key clicked:', key)
    }, key), " - ", value);
  })));
};
var _default = exports.default = TopLevelDomainQueryResults;