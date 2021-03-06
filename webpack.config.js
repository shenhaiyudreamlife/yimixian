var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
module.exports = {
  //入口
  // entry:'./src/scripts/app.js',
  entry:{
    app:'./src/scripts/app.js'
  },
  //出口
  output:{
    path:__dirname+'/build',
    // filename:'[name]_[hash].js'
    filename:'app.js'
  },
  //服务器
  devServer:{
    contentBase:'./build',//目标目录
    host:'localhost',
    port:7000,
    proxy: {
      '/api': {
        target: 'https://api.1mxian.com',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      },
      '/con': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {'^/con': ''}
      }
    }
  },
  //模块
  module:{
    loaders:[
      //babel-loader ,解析ES6
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'react-hot-loader!babel-loader'
      },
      //babel-loader ,解析jsx
      {
        test:/\.jsx$/,
        exclude:/node_modules/,
        loader:'react-hot-loader!babel-loader'
      },
      //css打包
      // {
      //   test:/\.css$/,
      //   loader:'style-loader!css-loader'
      // },
      {
        test:/\.css$/,
        loader:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:'css-loader'
        })
      },
      //scss打包
      // {
      //   test:/\.scss$/,
      //   loader:'style-loader!css-loader!sass-loader'
      // }
      {
        test:/\.scss$/,
        loader:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:'css-loader!sass-loader'
        })
      }
    ]
  }
  ,
  //插件
  plugins:[
    //1:抽离css样式到文件
    new ExtractTextPlugin({
      // filename:'[name]_[hash].css',
      filename:'app.css',
      allChunks:true,
      disable:false
    }),
    //2:根据模板自动生成html
    new HtmlWebpackPlugin({
      template:'./index.ejs',
      filename:'index.html',
      title:'ReactApp'
    }),
    // ,
    //3:压缩代码
    // new webpack.optimize.UglifyJsPlugin({
    //   compress:{
    //     warnings:false
    //   },
    //   output:{
    //     //注释
    //     comments:false
    //   }
    // }),
    //4:自动打开浏览器
    // new OpenBrowserPlugin({
    //   url:'http://localhost:7000'
    // })
    //,
    // 组件抽离
    // externals: {
    //   'react': 'window.React',
    //   'react-dom': 'window.ReactDOM',
    //   'react-router': 'window.ReactRouter'
    // }
    // 5: 更改环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
