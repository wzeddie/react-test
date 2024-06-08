#  v7.0 research for tailwind
初始化脚手架react项目
初始化git init
管理员仓库 git remote add origin <remote-repository-URL>
从远程仓库中拉取同步数据 git pull origin main
推送到远程仓库 git push -u origin master

## 熟悉create react app脚手架
默认启动的，Webpack Dev Server ，是一个小型的 Express 服务器，主要用于开发阶段的前端项目，并不是用来运行 Node.js 服务器端代码的，比如 server.js 中的 HTTP 服务器。
researchdomain项目是node.js后端渲染的，http服务器。CRA 主要支持客户端渲染的单页应用。（可能需要考虑使用 Next.js ）
所以通过CRA直接迁移源代码和配置文件，不一定会直接生效。

运行：Webpack Dev Server默认启动 ，npm start
## 拷贝源代码src文件，不拷贝package.json
拷贝后，会自动编译，因为脚手架自带的eslint插件，会自动提示react的语法规则——热模块功能。
做以下调整：
index.js,入口需要切换为客户端渲染，render，不支持服务端渲染hydrateRoot。同时导入mycss.css。
相关组件报错修改，比如未调用的函数需要删除，并做对应的代码调整：
  const recentDomains= React.useRef(initialDomains || ['domain1','domain1','domain1']);
  recentDomains.current.map，

## v7.0.0前端页面可以正常加载，并显示
dev启动方式：npm start
编译方式：npm run build ，在目录下生成静态打包文件
项目构建成功后，在build目录下生成index.html，并在build/static/下生成，js和css文件，等其他public的静态资源图片，视频，字体等

# 下一步
因为手动安装react是支持修改配置文件，让npm启动node.js的，如何让create react app的react项目，支持node.js启动？
是否直接修改配置文件，即可：


