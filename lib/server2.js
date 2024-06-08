"use strict";

const http = require('http');
const fs = require('fs'); //文件系统，fs.readFile() 读取文件
const url = require('url'); //解析 URL 字符串的模块
const https = require('https');
//querystring.parse() 方法来解析 POST 请求中的请求体
const querystring = require('querystring');
const path = require('path'); //path.join() 方法来构造文件的绝对路径
var body = ''; //初始化请求体
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const DomainInfo = require('../lib/components/DomainInfo').default; //导入react组件,必须要在Babel编译后的
var yumingable = {}; //域名批量查询结果对象 将一个空对象赋值yumingable = Object.create(null);

async function main(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname; // 将变量名修改为 reqPath
  if (req.method === 'GET' && reqPath === '/') {
    res.writeHead(302, {
      'Location': '/index.html'
    });
    res.end();
  } else if (req.method === 'GET' && reqPath === '/index.html') {
    //读取数据库    
    var tempDomains = []; //过渡变量用于获取initialDomains
    await getFromMongoDB(async extractedData => {
      //console.log('callback success');
      tempDomains = extractedData;
      //console.log(tempDomains)
    });
    //JSON类型转换为数组类型
    const tempDomains1 = 'www.' + tempDomains[0].name + '.' + tempDomains[0].suffix;
    const tempDomains2 = 'www.' + tempDomains[1].name + '.' + tempDomains[1].suffix;
    const tempDomains3 = 'www.' + tempDomains[2].name + '.' + tempDomains[2].suffix;
    var initialDomains = [tempDomains1, tempDomains2, tempDomains3];
    console.log(initialDomains); //打印最近查询的三个网址记录
    // 读取 index.html 模板
    const templatePath = path.join(__dirname, '..', 'build', 'index.html');
    // console.log(templatePath)
    let templateData = await fs.promises.readFile(templatePath, 'utf8');
    // console.log(templateData)
    // 下发windows全局变量
    templateData = templateData.replace('</body>', "<script>window.__INITIAL_DOMAINS__ = ".concat(JSON.stringify(initialDomains), ";</script></body>"));
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(templateData);
  } else if (req.method === 'POST' && req.url === '/server') {
    req.on('data', onDataReceived);
    req.on('end', fuc_end);
  } else if (req.url === '/favicon.ico') {
    res.writeHead(204); // 无内容
    res.end();
    return;
  } else {
    // 处理其他静态文件
    const filePath = path.join(__dirname, '..', 'build', reqPath);
    fs.promises.access(filePath, fs.constants.F_OK).then(async () => {
      const ext = path.extname(filePath).slice(1);
      const mimeTypes = {
        html: 'text/html',
        js: 'application/javascript',
        css: 'text/css',
        png: 'image/png',
        jpg: 'image/jpeg',
        gif: 'image/gif',
        svg: 'image/svg+xml',
        ico: 'image/x-icon'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const data = await fs.promises.readFile(filePath);
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(data);
    }).catch(() => {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('Not found\n');
    });
  }
  function onDataReceived(chunk) {
    //console.log('chunk:', chunk.toString())
    body += chunk.toString();
  }
  async function fuc_end() {
    const post_data = querystring.parse(body);
    const domainName = post_data.name;
    console.log('Received domain name:', domainName);
    //对域名进行分解
    var domainParts = domainName.split('.');
    if (domainParts.length > 2) {
      // 获取域名后缀com
      var suffix = domainParts[2];
      // 获取域名baidu
      var wwwname = domainParts[1];
      //调用批量查询函数发起批量查询请求，不含后缀
      await piliangchaxun(wwwname);
      // 使用 await 等待 getapi 的 Promise 解决
      const jsonData = await getapi(wwwname, suffix);
      // 下面的操作都在 async 函数内，所以不需要再使用 await
      console.log('Promise resolved with:', jsonData);
      const jsonString = JSON.stringify(jsonData); // 将jsonData转换为JSON字符串
      // 重置 yumingable 变量
      yumingable = Object.create(null);
      // 读取 result.html 文件
      let htmlString = await fs.promises.readFile(path.join(__dirname, '..', 'build', 'result.html'), 'utf-8');
      // 这里假设你已经定义了 DomainInfo 组件
      const reactAppString = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(DomainInfo, {
        domainData: jsonString,
        results: results
      }));
      // 替换 HTML 字符串中的相关部分
      htmlString = htmlString.replace('<div id="root"></div>', "<div id=\"root\">".concat(reactAppString, "</div>"));
      // 发送响应
      await connectToMongoDB(senddata); //插入数据库新增记录
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(htmlString);
      // 清空body数据
      body = '';
    }
  }
}

// 定义批量查询的函数
async function piliangchaxun(wwwname) {
  // 定义批量查询的后缀数组
  const suffixs = ['com', 'net', 'org', 'me', 'xyz', 'info', 'io', 'co', 'ai', 'biz', 'us', 'etc'];
  // 初始化一个数组来保存所有的 Promise
  const promises = suffixs.map(temp_suffix => getapi(wwwname, temp_suffix));
  try {
    // 并发执行所有异步查询
    const results = await Promise.all(promises);
    // 处理 results，或者返回它们
    return results;
  } catch (error) {
    // 处理可能发生的错误
    console.error('批量查询中出现错误:', error);
    throw error; // 可以重新抛出错误，或根据需要进行其他错误处理
  }
}
//修改为promise类型
function getapi(wwwname, suffix) {
  const promise = new Promise((resolve, reject) => {
    //var jsonData = ''
    const options = {
      hostname: 'whois.freeaiapi.xyz',
      path: "/?name=".concat(wwwname, "&suffix=").concat(suffix),
      method: 'GET'
    };
    const req = https.request(options, res => {
      //console.log(`statusCode: ${res.statusCode}`);
      var mydata = '';
      // 接收到数据时，累加数据
      res.on('data', d => {
        mydata += d;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(mydata);
          if (jsonData.available === false) {
            yumingable[jsonData.domain] = 'registered';
          } else if (jsonData.available === true) {
            yumingable[jsonData.domain] = 'unregistered';
          }
          // if (callback) callback(jsonData); // 如果提供了回调函数，调用它
          resolve(jsonData);
        } catch (e) {
          reject(e); // 如果解析 JSON 失败，拒绝 Promise
        }
      });
    });
    // 监听请求错误
    req.on('error', error => {
      reject(error); // 如果请求过程中出现错误，拒绝 Promise
    });

    // 发送请求
    req.end();
  });
  return promise;
}

//vercel向远程数据库添加
async function connectToMongoDB(sendData) {
  const {
    MongoClient,
    ServerApiVersion
  } = require('mongodb');
  const uri = process.env.MONGODB_URI;
  let client; // 声明 client 变量
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      },
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    });
    await client.connect();
    //console.log('DB Connected ');
    const database = client.db('mydatabase');
    const collection = database.collection('searchdomain');
    const document = sendData;
    //await collection.deleteMany({})
    //console.log('Document delete success ');
    const result = await collection.insertOne(document);
    console.log('Document inserted with _id:', sendData.domain, result.insertedId);
    await client.close();
  } catch (error) {
    console.error('An error occurred while connecting to MongoDB Atlas:', error);
    throw error;
  }
}

//从数据库中获取数据最近访问的三条网址
async function getFromMongoDB(callback) {
  let extractedData;
  const {
    MongoClient,
    ServerApiVersion
  } = require('mongodb');
  const uri = process.env.MONGODB_URI;
  let client; // 声明 client 变量
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      },
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    });
    await client.connect();
    //console.log('DB Connected ');
    const database = client.db('mydatabase');
    const collection = database.collection('searchdomain');
    const recentDocuments = await collection.find().sort({
      _id: -1
    }).limit(3).toArray();
    extractedData = recentDocuments.map(doc => ({
      _id: doc._id,
      name: doc.name,
      suffix: doc.suffix
    }));
    //console.log('extractedData:', extractedData);
    await client.close();
  } catch (error) {
    console.error('An error occurred while connecting to MongoDB Atlas:', error);
    throw error;
  }
  callback(extractedData);
}
module.exports = main;