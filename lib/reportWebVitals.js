"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _interopRequireWildcard2 = _interopRequireDefault(require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/esm/interopRequireWildcard.js"));
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('web-vitals'))).then(_ref => {
      let {
        getCLS,
        getFID,
        getFCP,
        getLCP,
        getTTFB
      } = _ref;
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
var _default = exports.default = reportWebVitals;