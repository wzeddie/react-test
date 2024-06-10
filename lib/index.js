"use strict";

var _interopRequireDefault = require("D:/git_home/search-for-tailwind/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;
require("./mycss.css");
var _react = _interopRequireDefault(require("react"));
var _Main = _interopRequireDefault(require("./components/Main"));
var _client = require("react-dom/client");
//首页加载react的入口文件

//import ReactDOM from 'react-dom';

//import { hydrateRoot } from 'react-dom/client';//取消服务器渲染

//hydrateRoot(rootElement, <Main initialDomains={initialDomains}/>);//取消服务器渲染

//以下为客户端渲染方式
//react18版本之后的新功能
const rootElement = document.getElementById('root');
const initialDomains = window.__INITIAL_DOMAINS__ || ['test1', 'test2', 'test3'];
const root = (0, _client.createRoot)(rootElement);
root.render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_Main.default, {
  initialDomains: initialDomains
})));