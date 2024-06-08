"use strict";

//5.0版本之前的服务端，未react组件化，备份
const http = require('http');
const fs = require('fs'); //文件系统，fs.readFile() 读取文件
const url = require('url'); //解析 URL 字符串的模块
const https = require('https');
//querystring.parse() 方法来解析 POST 请求中的请求体
const querystring = require('querystring');
const path = require('path'); //path.join() 方法来构造文件的绝对路径
var body = ''; //初始化请求体

var yumingable = {}; //域名批量查询结果对象

//定义主函数，默认参数为对应createServer传入的参数
async function main(req, res) {
  //获取url和路径,进行路由控制，其实vercel的配置文件里面就支持，没必要这么写。
  const parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname; // 将变量名修改为 reqPath
  //重定向到index.html
  if (req.method === 'GET' && reqPath === '/') {
    res.writeHead(302, {
      'Location': '/index.html'
    });
    res.end();
  } else if (req.method === 'GET' && reqPath === '/index.html') {
    let Recentlydomain = '';
    await getFromMongoDB(async extractedData => {
      //console.log('callback success');
      Recentlydomain = extractedData;
    });
    // 读取 index.html 文件并发送响应
    //console.log('index.html',__dirname)__dirname始终为当前服务器代码所在的server目录..返回上一级目录
    // 读取 index.html 文件,
    var data = await fs.promises.readFile(path.join(__dirname, '..', 'index.html'), 'utf8');
    // 正则表达式匹配要替换的部分
    const Recentlydomain1 = 'www.' + Recentlydomain[0].name + '.' + Recentlydomain[0].suffix;
    const Recentlydomain2 = 'www.' + Recentlydomain[1].name + '.' + Recentlydomain[1].suffix;
    const Recentlydomain3 = 'www.' + Recentlydomain[2].name + '.' + Recentlydomain[2].suffix;
    //console.log('Recentlydomain:', Recentlydomain1, Recentlydomain2, Recentlydomain3);
    // 正则表达式匹配要替换的部分
    //const regex = /var Recentlydomain1_value = 'www.bing.com'/;
    const regex1 = /var Recentlydomain1_value = '.*'/;
    const regex2 = /var Recentlydomain2_value = '.*'/;
    const regex3 = /var Recentlydomain3_value = '.*'/;
    //很奇怪多了;为什么不能匹配到，以下这句。
    //const regex = /var Recentlydomain1_value = 'www.bing.com';/;
    //console.log(regex1.test(data), regex2.test(data), regex3.test(data))
    // 替换逻辑
    data = data.replace(regex1, "var Recentlydomain1_value = '".concat(Recentlydomain1, "';"));
    data = data.replace(regex2, "var Recentlydomain2_value = '".concat(Recentlydomain2, "';"));
    data = data.replace(regex3, "var Recentlydomain3_value = '".concat(Recentlydomain3, "';"));
    // 发送替换后的HTML内容
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(data);
  } else if (req.url === '/css/mycss.css' && req.method === 'GET') {
    // 读取并发送 mycss.css 文件,针对index页面的css代码加载，服务端也要支持，不然客户端下载不了
    // console.log('mycss.css',__dirname)

    fs.readFile(path.join(__dirname, '..', 'css', 'mycss.css'), (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.end('Not Found\n');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/css'
        });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/server') {
    //在 Node.js 中，req.body 不是默认的属性，它通常由中间件（如 body-parser）或框架（如 Express）、或事件监听器组合提供。
    //请求体body的数据是通过可读流传输的，因此要使用 request.on 方法来监听请求体的数据事件。
    //异步接收请求体data，当请求体的数据块可用时触发函数onDataReceived
    req.on('data', onDataReceived);
    //当请求体的所有数据块都已接收完毕时触发。
    req.on('end', fuc_end);
    //注意，回调函数如果只写函数名，不用箭头的方式。
    //那么回调函数的定义，应该写到母函数体中。
    //可以用函数中调用函数来表示
  } else if (req.url === '/favicon.ico') {
    res.writeHead(204); // 无内容
    res.end();
    return;
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    //在js中使用反引号`${name}，才能显示字符串中的变量，模板字符串
    res.end('Not found\n');
  }
  // 定义处理数据的函数,注意写在主函数体中，而不与主函数并行
  //为什么参数是chunk，与客户端的请求方式有关系Transfer-Encoding:chunk
  function onDataReceived(chunk) {
    //console.log('chunk:', chunk.toString())
    body += chunk.toString();
  }
  //data接收完后，对body数据进行解析
  function fuc_end() {
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
      //调用批量查询函数
      piliangchaxun(wwwname);

      //难度***getapi(参数1，参数2，子函数主体用于api调用，回调函数子接收api返回的json值，并在母函数进行回调处理)
      //异步调用回调函数，也就是说在回调函数之前用异步。因为里面有涉及到数据库连接需要用到await，不然无法插入数据
      getapi(wwwname, suffix, async senddata => {
        const jsonString = JSON.stringify(JSON.stringify(senddata)); //再次对json对象进行2次json化
        // 读取 result.html 文件,
        var htmlString = await fs.promises.readFile(path.join(__dirname, '.', 'result.html'), 'utf-8');
        const regexdomain = /<td id="domain"><\/td>/; //\对/td进行转义
        const regexstatus = /<td id="status"><\/td>/;
        const regexavailable = /<td id="available"><\/td>/;
        const regexcreation_datetime = /<td id="creation_datetime"><\/td>/;
        const regexexpiry_datetime = /<td id="expiry_datetime"><\/td>/;
        const regexinfo = /<td id="info" style="white-space: pre-wrap;"><\/td>/;
        //替换源代码
        //console.log(regexdomain.test(htmlString))
        htmlString = htmlString.replace(regexdomain, "<td id=\"domain\">".concat(senddata.domain, "</td>"));
        htmlString = htmlString.replace(regexstatus, "<td id=\"status\">".concat(senddata.status, "</td>"));
        htmlString = htmlString.replace(regexavailable, "<td id=\"available\">".concat(senddata.available, "</td>"));
        htmlString = htmlString.replace(regexcreation_datetime, "<td id=\"creation_datetime\">".concat(senddata.creation_datetime, "</td>"));
        htmlString = htmlString.replace(regexexpiry_datetime, " <td id=\"expiry_datetime\">".concat(senddata.expiry_datetime, "</td>"));
        htmlString = htmlString.replace(regexinfo, "<td id=\"info\" style=\"white-space: pre-wrap;\">".concat(senddata.info, "</td>"));

        //异步调用
        await connectToMongoDB(senddata);
        //在数据库调用之后为什么能获取批量结果
        //修改继续result.html
        for (let key in yumingable) {
          //console.log(`Domain: ${key}, Available: ${yumingable[key]}`);
          //生成要插入html
          const newElement = "\n                    <span style=\"position: relative; z-index: 1;margin: 5px;\">\n                        <a href=\"/index.html\" style=\"white-space: nowrap; text-decoration: none;\"\">\n                        ".concat(key, ":\n                        </a>\n                        <span style=\"z-index: 0;\">&nbsp; ").concat(yumingable[key], "</span>\n                    </span>\n                    ");
          //匹配的关键字，字符长度51个单位
          const divRegex = /<div style="display: flex;flex-direction: column;">/gs;
          //找到索引位置，默认是出现位置的索引，所以不含匹配本身的长度。
          const insertIndex = htmlString.lastIndexOf(divRegex.source);
          //console.log(insertIndex,insertIndex + divRegex.source.length)
          //执行插入，插入位置等于代码出现的位置+匹配部分代码本身的长度=要插入的位置
          htmlString = htmlString.slice(0, insertIndex + divRegex.source.length) + newElement + htmlString.slice(insertIndex + divRegex.source.length);
        }
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(htmlString);
        //查询完成后，清空body数据
        body = '';
        //console.log(yumingable);
      }); //结束回调函数
    } else {
      console.log('输入的域名格式不正确');
    }
  }
  ;
  //放在这个位置变成每一次请求都会到调用数据库插入函数
}
;
//批量查询函数
async function piliangchaxun(wwwname) {
  //console.log(yumingable);
  //定义批量查询的后缀数组
  const suffixs = ['com', 'net', 'org', 'me', 'xyz', 'info', 'io', 'co', 'ai', 'biz', 'us', 'etc'];
  //进行批量查询
  for (const temp_suffix of suffixs) {
    getapi(wwwname, temp_suffix, () => {
      //空的回调函数
      //console.log(senddata.domain,senddata.available);
      //也可以逐个添加数据库
      //await connectToMongoDB(senddata)
    });
  }
  //这里还无法获取批量结果
  //console.log(yumingable);
}

//异步函数需要修改为回调函数形式，才能获取return值
//参数，参数，函数名称，函数中调用函数名称。
//外部函数重新定义函数内容
async function getapi(wwwname, suffix, callback) {
  var jsonData = '';
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
      // 将JSON 数据转化为JavaScript 对象，方便获取
      jsonData = JSON.parse(mydata);
      //console.log(jsonData.domain,jsonData.available)
      //根据域名是否可用添加对应的注册信息
      if (jsonData.available === false) {
        yumingable[jsonData.domain] = 'registered';
      } else if (jsonData.available === true) {
        yumingable[jsonData.domain] = 'unregistered';
      }
      //yumingable[jsonData.domain]=jsonData.available;
      //console.log(yumingable)
      // 将将 JavaScript 对象转换为JSON数据
      //JSON.stringify(jsonData)
      //console.log('jsonData', jsonData)
      //调用异步函数获取jsonData，返回jsonData
      callback(jsonData);
    });
  });
  req.end();
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

//从数据库中获取数据
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