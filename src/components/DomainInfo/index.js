//result.html汇总组件，用于接收参数，并将各个组件汇总
import React from 'react';
import DomainTable from '../DomainTable';
import BackButton from '../BackButton';
import Footer from '../Footer';
import Header from '../Header';
const DomainInfo = ({ domainData,results }) => {
  //console.log('domaininfo',domainData)
  return (
    <div>
      <Header />
      <h1 style={{ textAlign: 'center' }}>Domain Information</h1>
      <DomainTable domainData={domainData } results={results} />
      <BackButton />
      <Footer />
    </div>
  );
};

export default DomainInfo;