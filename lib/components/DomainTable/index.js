"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
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

  return /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '2px'
    }
  }, /*#__PURE__*/_react.default.createElement("table", {
    id: "info-table"
  }, /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Domain Name"), /*#__PURE__*/_react.default.createElement("td", null, safeData.domain)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Status"), /*#__PURE__*/_react.default.createElement("td", null, safeData.status)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Available"), /*#__PURE__*/_react.default.createElement("td", null, safeData.available ? 'Yes' : 'No')), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Creation Date"), /*#__PURE__*/_react.default.createElement("td", null, safeData.creation_datetime)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Expiry Date"), /*#__PURE__*/_react.default.createElement("td", null, safeData.expiry_datetime)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "WHOIS Information"), /*#__PURE__*/_react.default.createElement("td", {
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, safeData.info))))), /*#__PURE__*/_react.default.createElement(_TopLevelDomainQueryResults.default, {
    results: results
  }));
};
var _default = exports.default = DomainTable;