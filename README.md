#  branch research for tailwind
初始化脚手架react项目
初始化git init
管理员仓库 git remote add origin <remote-repository-URL>
从远程仓库中拉取同步数据 git pull origin main
推送到远程仓库 git push -u origin master

## v7.0 通过CRA安装react，并熟悉脚手架
CRA 主要支持客户端渲染的单页应用,默认安装后的服务器为，Webpack Dev Server ，是一个小型的 Express 服务器，主要用于开发阶段的前端项目，并不是用来运行 Node.js 服务器端代码的，比如 server.js 中的 HTTP 服务器。而researchdomain项目是node.js后端渲染的http服务器。（可能需要考虑使用 Next.js ）

所以通过CRA直接迁移源代码和配置文件，不一定会直接生效。

1、拷贝源代码src文件，但不拷贝package.json
在服务器运行期间，拷贝时，会自动编译，因为脚手架自带的eslint插件，会自动提示react的语法规则——热模块功能。
2、同时对源代码做以下调整：
  index.js,入口需要切换为客户端渲染，render，不支持服务端渲染hydrateRoot。同时导入mycss.css。
  相关组件报错修改，比如未调用的函数需要删除，并做对应的代码调整：
    const recentDomains= React.useRef(initialDomains || ['domain1','domain1','domain1']);
    recentDomains.current.map

3、v7.0.0前端页面可以正常加载，并显示
dev启动方式：npm start
编译方式：npm run build ，在目录下生成静态打包文件
项目构建成功后，在build目录下生成index.html，并在build/static/下生成，js和css文件，等其他public的静态资源图片，视频，字体等

# v7.1.0，前端CRA，后端通过node.js来运行

如何让create react app的react项目，支持node.js启动？
1、修改package配置文件
将 "start": "react-scripts start" 修改为 "start": "node src/server.js"
启动后报错：——Babel插件导致
  将编译后的lib组件库要迁移过去，服务器代码用有导入。
  同时服务端有很多ES6语法规则，需要通过Babel插件进行编译。
    import React from 'react';——提示无法识别该语法
2、再次通过修改，参数配置文件，来安装Babel插件，等其他依赖库
  "devDependencies": {
        "@babel/cli": "^7.24.6",
        "@babel/core": "^7.24.6",
        "@babel/preset-env": "^7.24.6",
        "@babel/preset-react": "^7.24.6",
        "@emotion/babel-plugin": "^11.11.0",
        "babel-loader": "^8.2.5",
        "css-loader": "^7.1.2",
        "html-webpack-plugin": "^5.6.0",
        "style-loader": "^4.0.0",
        "webpack": "^5.73.0",
        "webpack-cli": "^4.9.2"
    }
根据最新的配置文件重新安装，重新安装npm install，默认已安装的包，不会重新安装。
3、添加Babel插件的配置文件.babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
4、运行编译指令，可以成功编译jsx，
npx babel src --out-dir lib --extensions ".js,.jsx"
5、再次运行npm start，提示：数据库报错，需要修改上一个版本的用于vercel的的数据库配置文件
mongodb+srv://vercel-admin-user:79wInWz1Luoxtq82@cluster0.rpimotu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
6、再次运行，提示：无result.html，从源代码拷贝到build文件下
因为CRA是单页面，通常只包含一个 index.html 文件。这是因为 CRA 使用 React Router 或其他路由库来处理页面路由，webpack没有构建result.html结果页面。
---直接修改代码统一读取index.html页面进行渲染。（不行，会重定向到首页）
只能将原版本的三个跟result相关的文件复制过来。
顺利执行项目代码
打版本v7.1.0
启动方式：npm start
# v7.2.0 下一步
引入tailwind
