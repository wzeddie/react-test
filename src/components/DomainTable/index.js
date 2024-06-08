//域名结果详情组件
import React from 'react';
import TopLevelDomainQueryResults from '../TopLevelDomainQueryResults'; // 确保路径正确

const DomainTable = ({ domainData, results }) => {
  const safeData1 = domainData || {};
  const safeData = JSON.parse(safeData1);//将字符串转变为json对象
  //console.log(safeData)

  return (
    <section>
      <div style={{ margin: '2px' }}>

        <table id="info-table">
          <tbody>
            <tr>
              <th>Domain Name</th>
              <td>{safeData.domain}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{safeData.status}</td>
            </tr>
            <tr>
              <th>Available</th>
              <td>{safeData.available ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th>Creation Date</th>
              <td>{safeData.creation_datetime}</td>
            </tr>
            <tr>
              <th>Expiry Date</th>
              <td>{safeData.expiry_datetime}</td>
            </tr>
            <tr>
              <th>WHOIS Information</th>
              <td style={{ whiteSpace: 'pre-wrap' }}>{safeData.info}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <TopLevelDomainQueryResults results={results} />
    </section>
  );
};


export default DomainTable;