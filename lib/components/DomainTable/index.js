"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _TopLevelDomainQueryResults = _interopRequireDefault(require("../TopLevelDomainQueryResults"));
//域名结果详情组件

// 确保路径正确

const DomainTable = _ref => {
  let {
    domainData,
    results
  } = _ref;
  const safeData1 = domainData || {};
  const safeData = JSON.parse(safeData1); //将字符串转变为json对象
  //console.log(safeData)

  return /*#__PURE__*/_react.default.createElement("section", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-1 md:col-span-3 bg-white rounded overflow-hidden shadow"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "bg-white rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300",
    style: {
      cursor: 'default'
    }
  }, /*#__PURE__*/_react.default.createElement("table", {
    className: "min-w-full bg-white w-full"
  }, /*#__PURE__*/_react.default.createElement("thead", {
    className: "whitespace-nowrap"
  }, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    className: "p-4 text-sm font-semibold bg-red-500 text-white text-center"
  }, "Information"), /*#__PURE__*/_react.default.createElement("th", {
    className: "p-4 text-sm font-semibold bg-blue-500 text-white text-center"
  }, "Results"))), /*#__PURE__*/_react.default.createElement("tbody", {
    className: "whitespace-nowrap divide-y divide-gray-200"
  }, /*#__PURE__*/_react.default.createElement("tr", {
    className: "hover:bg-gray-50"
  }, /*#__PURE__*/_react.default.createElement("th", {
    className: "border-r border-gray-200"
  }, "Domain Name"), /*#__PURE__*/_react.default.createElement("td", {
    className: "text-gray-800 text-center p-4 text-sm border-l border-gray-200"
  }, safeData.domain)), /*#__PURE__*/_react.default.createElement("tr", {
    className: "hover:bg-gray-50"
  }, /*#__PURE__*/_react.default.createElement("th", {
    className: "border-r border-gray-200"
  }, "Status"), /*#__PURE__*/_react.default.createElement("td", {
    className: "text-gray-800 text-center p-4 text-sm border-l border-gray-200"
  }, safeData.status)), /*#__PURE__*/_react.default.createElement("tr", {
    className: "hover:bg-gray-50"
  }, /*#__PURE__*/_react.default.createElement("th", {
    className: "border-r border-gray-200"
  }, "Available"), /*#__PURE__*/_react.default.createElement("td", {
    className: "text-gray-800 text-center p-4 text-sm border-l border-gray-200"
  }, safeData.available ? 'Yes' : 'No')), /*#__PURE__*/_react.default.createElement("tr", {
    className: "hover:bg-gray-50"
  }, /*#__PURE__*/_react.default.createElement("th", {
    className: "border-r border-gray-200"
  }, "Creation Date"), /*#__PURE__*/_react.default.createElement("td", {
    className: "text-gray-800 text-center p-4 text-sm border-l border-gray-200"
  }, safeData.creation_datetime)), /*#__PURE__*/_react.default.createElement("tr", {
    className: "hover:bg-gray-50"
  }, /*#__PURE__*/_react.default.createElement("th", {
    className: "border-r border-gray-200"
  }, "Expiry Date"), /*#__PURE__*/_react.default.createElement("td", {
    className: "text-gray-800 text-center p-4 text-sm border-l border-gray-200"
  }, safeData.expiry_datetime)), /*#__PURE__*/_react.default.createElement("tr", {
    className: "hover:bg-gray-50"
  }, /*#__PURE__*/_react.default.createElement("th", {
    className: "border-r border-gray-200"
  }, "WHOIS Information"), /*#__PURE__*/_react.default.createElement("td", {
    className: "text-gray-800 text-center p-4 text-sm border-l border-gray-200",
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, safeData.info)))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-span-1 md:col-span-1 bg-white rounded overflow-hidden shadow"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300",
    style: {
      cursor: 'default'
    }
  }, /*#__PURE__*/_react.default.createElement(_TopLevelDomainQueryResults.default, {
    results: results
  }))));
};
var _default = exports.default = DomainTable;