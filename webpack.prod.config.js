const {merge} = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');

const baseWebpackConfig=require('./webpack.base.config.js');
const prodWebpackConfig=merge(baseWebpackConfig,{
  // 生产环境的配置
  mode: 'production',
  // devtool:"source-map",
  devtool:"eval-cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',  //指定 html 模板
        filename: 'index.html',        //指定 html 名称
        title: 'index',         //指定 html title
        minify: {
            collapseWhitespace: true,  // 清除空格换行
            removeComments: true,      // 清除注释
        },
    }),
    new HtmlWebpackPlugin({
        template: './src/aboutus.html',  //指定 html 模板
        filename: 'aboutus.html',        //指定 html 名称
        title: 'aboutus',        //指定 html title
        minify: {
            collapseWhitespace: true,  // 清除空格换行
            removeComments: true,      // 清除注释
        },
    }),
    new MiniCssExtractPlugin({
        filename: './css/main.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new ESlintPlugin({
        fix: true         // 自动修正不符合规范的代码
    }),
    new webpack.DefinePlugin({
      API_BASE_URL:JSON.stringify('https://api.nftool.cn')
    })
  ]
});

module.exports=prodWebpackConfig;