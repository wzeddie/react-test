"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _RecentlySearched = _interopRequireDefault(require("../RecentlySearched"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
//获取用户input组件

//传递上一层的初始化参数initialDomains给RecentlySearched
const DomainSearchForm = _ref => {
  let {
    initialDomains
  } = _ref;
  const [domainName, setDomainName] = (0, _react.useState)(''); //初始目标域名为空
  const formRef = (0, _react.useRef)(null); // 使用 useRef 来引用 form 元素
  const domainInputRef = (0, _react.useRef)(null); // 使用 useRef 来引用 input 元素
  const [isSubmittable, setIsSubmittable] = (0, _react.useState)(true); // 控制按钮可点击状态
  // 处理表单提交的函数
  const handleSubmit = event => {
    //event.preventDefault(); // 阻止表单的默认提交行为
    console.log('client to search:', domainName);
    setIsSubmittable(false); // 表单提交后，设置为不可再提交
    // 手动触发表单提交
    // if (formRef.current) {
    //   formRef.current.submit();
    // }
  };
  const handleInputClick = () => {
    setDomainName(''); // 清空输入框的值
  };
  // 处理输入框值变化的函数,通过setDomainName更新domainName变量
  const handleInputChange = event => {
    setDomainName(event.target.value); // 更新输入框的值到状态
  };
  // 这个函数将被 RecentlySearched 组件调用，回调函数
  const handleDomainClick = domain => {
    if (domainInputRef.current) {
      domainInputRef.current.value = domain; //设置输入框的值为传入的 domain
    }
    if (formRef.current) {
      formRef.current.submit(); // 直接调用表单的 submit 方法触发表单提交
    }
  };
  return /*#__PURE__*/_react.default.createElement("section", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "input"
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginBottom: '1px'
    }
  }, "Please enter the domain name you wish to query."), /*#__PURE__*/_react.default.createElement("p", null, "Currently, only domain names with the following suffixes are supported: com, net, org, me, xyz, info, io, co, ai, biz, us, etc."), /*#__PURE__*/_react.default.createElement("form", {
    id: "myForm",
    method: "post",
    action: "/server",
    onSubmit: handleSubmit,
    ref: formRef
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "domainname"
  }, "input like: www.xxx.com"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("input", {
    style: {
      marginBottom: '5px'
    },
    type: "text",
    id: "domainname",
    name: "name",
    required: true,
    minLength: "4",
    maxLength: "18",
    size: "20",
    value: domainName,
    onClick: handleInputClick //添加光标鼠标点击事件
    ,
    onChange: handleInputChange //通过事件触发setDomainName，然后在更新domainName
    ,
    placeholder: "www.example.com",
    ref: domainInputRef
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    id: "searchdomain",
    disabled: !isSubmittable,
    style: {
      opacity: isSubmittable ? 1 : 0.5
    }
  }, "submit"), /*#__PURE__*/_react.default.createElement(_RecentlySearched.default, {
    initialDomains: initialDomains,
    handleDomainClick: handleDomainClick // 将 handleDomainClick 传递给 RecentlySearched
  }))));
};
var _default = exports.default = DomainSearchForm;