var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css'), {
        allChunks: true,
        disable: false
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
new HtmlWebpackPlugin({
      filename: 'plan.html',
      template: './page/plan.html',
      chunks: ['plan'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './page/main.html',
      chunks: ['main'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './page/detail.html',
      chunks: ['detail'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'prefer.html',
      template: './page/index.html',
      chunks: ['prefer'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'share.html',
      template: './page/share.html',
      chunks: ['share'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'buy.html',
      template: './page/index.html',
      chunks: ['buy'],
      inject: true,
      chunksSortMode: 'dependency'
    }),
    // // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
