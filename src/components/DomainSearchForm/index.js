//获取用户input组件
import React, { useState, useRef } from 'react';
import RecentlySearched from '../RecentlySearched';
//传递上一层的初始化参数initialDomains给RecentlySearched
const DomainSearchForm = ({ initialDomains }) => {
  const [domainName, setDomainName] = useState('');//初始目标域名为空
  const formRef = useRef(null); // 使用 useRef 来引用 form 元素
  const domainInputRef = useRef(null); // 使用 useRef 来引用 input 元素
  const [isSubmittable, setIsSubmittable] = useState(true); // 控制按钮可点击状态
  // 处理表单提交的函数
  const handleSubmit = (event) => {
    //event.preventDefault(); // 阻止表单的默认提交行为
    console.log('client to search:', domainName);
    setIsSubmittable(false);    // 表单提交后，设置为不可再提交
    // 手动触发表单提交
    // if (formRef.current) {
    //   formRef.current.submit();
    // }
  };
  const handleInputClick = () => {
    setDomainName(''); // 清空输入框的值
  };
  // 处理输入框值变化的函数,通过setDomainName更新domainName变量
  const handleInputChange = (event) => {
    setDomainName(event.target.value); // 更新输入框的值到状态
  };
  // 这个函数将被 RecentlySearched 组件调用，回调函数
  const handleDomainClick = (domain) => {
    if (domainInputRef.current) {
      domainInputRef.current.value = domain;//设置输入框的值为传入的 domain
    }
    if (formRef.current) {
      formRef.current.submit(); // 直接调用表单的 submit 方法触发表单提交
    }
  };

  return (
    <section>
      <div className="input">
        <p style={{ marginBottom: '1px' }}>Please enter the domain name you wish to query.</p>
        <p>Currently, only domain names with the following suffixes are supported: com, net, org, me, xyz, info, io, co, ai, biz, us, etc.</p>
        <form id="myForm" method="post" action="/server" onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="domainname">input like: www.xxx.com</label><br />
          <input
            style={{ marginBottom: '5px' }}
            type="text"
            id="domainname"
            name="name"
            required
            minLength="4"
            maxLength="18"
            size="20"
            value={domainName}
            onClick={handleInputClick}//添加光标鼠标点击事件
            onChange={handleInputChange}//通过事件触发setDomainName，然后在更新domainName
            placeholder="www.example.com"
            ref={domainInputRef}
          /><br />
          <button type="submit" id="searchdomain"  disabled={!isSubmittable} style={{ opacity: isSubmittable ? 1 : 0.5 }} >submit</button>
          <RecentlySearched
            initialDomains={initialDomains}
            handleDomainClick={handleDomainClick} // 将 handleDomainClick 传递给 RecentlySearched
          />
        </form>
      </div>
    </section>
  );
};

export default DomainSearchForm;