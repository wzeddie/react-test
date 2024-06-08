"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
//最近的三个查询网址组件

const RecentlySearched = _ref => {
  let {
    initialDomains,
    handleDomainClick
  } = _ref;
  const recentDomains = _react.default.useRef(initialDomains || ['domain1', 'domain1', 'domain1']);
  //初始化一个如果数据库没有连接成功，获取的值为空时，默认显示3个域名
  const [isClickable, setIsClickable] = _react.default.useState(true); // 控制链接可点击状态

  const onClick_a = (event, domain) => {
    event.preventDefault(); // 阻止链接默认的导航行为
    if (isClickable) {
      // 只有当链接是可点击状态时才处理点击事件
      setIsClickable(false); // 设置链接为不可点击状态
      handleDomainClick(domain); // 调用父组件的函数
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center',
      margin: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      display: 'inline'
    }
  }, "Recently searched:"), recentDomains.current.map((domain, index) => /*#__PURE__*/_react.default.createElement("a", {
    key: index,
    href: ""
    // 添加 data-ssr 属性以标记客户端渲染的内容
    ,
    "data-ssr": "true",
    onClick: event => onClick_a(event, domain),
    style: {
      margin: '0 10px',
      opacity: isClickable ? 1 : 0.5,
      // 当不可点击时，降低透明度
      color: isClickable ? 'black' : 'gray',
      // 设置不可点击时的文字颜色
      pointerEvents: isClickable ? 'auto' : 'none' // 设置不可点击时，禁用鼠标事件
    },
    disabled: !isClickable
  }, domain)));
};
var _default = exports.default = RecentlySearched;