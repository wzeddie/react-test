const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
process.env.NODE_ENV = 'production'; // 或 'production'
process.env.BABEL_ENV = 'production'; // 或 'production'
module.exports = {
  mode: 'development', 
  entry: {
    // 为每个页面指定一个入口文件
    index: './src/index.js', // 首页
    result: './src/result.js', // 关于页
    // 可以继续添加更多页面...
  },
  output: {
    path: path.resolve(__dirname,'..', 'build'), // 输出目录
    filename: '[name].bundle.js', // 输出文件名
    publicPath: '/', // 公共路径
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i, // 正则表达式匹配 CSS 文件
        use: ['style-loader', 'css-loader','postcss-loader'] // 使用 style-loader 和 css-loader，这里要加载tailwind进行编译
      },
      // 如果你还有其他规则，可以继续在这里添加
    ],  
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 指定模板
      filename: 'index.html', // 输出的文件名
      chunks: ['index'],
      templateParameters: {
        PUBLIC_URL: ''
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('process.env.NODE_ENV'), // 或者使用 'development' 或 'test'
        BABEL_ENV: JSON.stringify('process.env.BABEL_ENV'), // 确保与上面的设置一致
        PUBLIC_URL: JSON.stringify(''), // 定义 PUBLIC_URL 为空字符串
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/result.html', // 指定模板
      filename: 'result.html', // 输出的文件名
      chunks: ['result'],
      templateParameters: {
        PUBLIC_URL: ''
      },
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
  
};
