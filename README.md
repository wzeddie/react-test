#  v7.0 research for tailwind
初始化脚手架react项目
初始化git init
管理员仓库 git remote add origin <remote-repository-URL>
从远程仓库中拉取同步数据 git pull origin main
推送到远程仓库 git push -u origin master

# 熟悉create react app脚手架
默认启动的是，Webpack Dev Server 是一个小型的 Express 服务器，主要用于开发阶段的前端项目，并不是用来运行 Node.js 服务器端代码的，比如 server.js 中的 HTTP 服务器。
但是researchdomain项目是node.js后端http服务器。
所以需求变为:
在开发 React 前端应用的同时，也需要运行 Node.js 后端服务器
# 拷贝源代码src文件
