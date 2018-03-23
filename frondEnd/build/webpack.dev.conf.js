var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// var path = require('path')
// var manifestPlugin = require('pwa-manifest-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //      原本的模板名字:template: 'index.html',
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.dev.html',//改变dev模式下运行的index.html
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([//3-10新增
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
    // new manifestPlugin({
    //   name:'Blog for Gui',
    //   description:'A pwa Blog',
    //   display:'fullscreen',
    //   icon:{
    //     src:path.resolve('src/assets/blog.png'),
    //     sizes:[64]
    //   }
    // }),
  ]
});

if(process.env.npm_config_report){
  var BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports=webpackConfig;