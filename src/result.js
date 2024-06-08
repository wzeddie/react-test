//result.html页面的react页面的入口页面
import React from 'react';
import ReactDOM from 'react-dom';
import DomainInfo from './components/DomainInfo';

ReactDOM.hydrateRoot (
  <React.StrictMode>
    <DomainInfo />
    </React.StrictMode>,
    document.getElementById('root')
  );
