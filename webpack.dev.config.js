const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.base.config.js');
const devWebpackConfig = merge(baseWebpackConfig, {
    // 开发环境的配置
    mode: 'development',
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',  //指定 html 模板
            filename: 'index.html',        //指定 html 名称
            title: 'index',        //指定 html title
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/aboutus.html',  //指定 html 模板
            filename: 'aboutus.html',        //指定 html 名称
            title: 'aboutus',        //指定 html title
            chunks: ['aboutus']
        }),
        new MiniCssExtractPlugin({
            filename: './css/main.css'
        }),
        new ESlintPlugin({
            fix: true         // 自动修正不符合规范的代码
        }),
        new webpack.DefinePlugin({
            API_BASE_URL: JSON.stringify('https://api-dev.nftool.cn')
        }),
        // new BundleAnalyzerPlugin()
    ]
})

module.exports = devWebpackConfig;