const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin=require('terser-webpack-plugin');

module.exports = {
    // entry: './src/js/index.js',
    entry: {
        index: './src/js/index.js',
        aboutus: './src/js/aboutus.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        // filename: '[name].bundle.[hash].js'
        // filename: '[name].bundle.[chunkhash].js'
        filename: './js/[name].bundle.[contenthash].js'
    },
    resolve:{
        alias:{
            // 指定路径的别名
            '@':resolve('src')
        },
        // 自动解析模块的后缀名
        extensions: ['.js', '.json', '.less'],
    },
    externals:{
        'jquery':'jQuery'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        // 标记未使用的代码
        // usedExports:true,
        // // 删除已经标记未使用的代码
        // minimize:true,
        // minimizer:[new TerserPlugin()],

        // 开启副作用标识
        // sideEffects:true,
    },
    module: {
        rules: [
            // 配置多个模块规则（配置loader、解析器等选项）
            {
                // 匹配css文件
                test: /\.css$/i,
                // 指定加载器，加载顺序是从左到右或者是从下到上
                // use: ['style-loader', 'css-loader'],
                // use: [MiniCssExtractPlugin.loader, 'css-loader']
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'   // 处理css兼容
                ]
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',
                                {
                                    useBuiltIns: 'usage', //按需加载
                                    corejs: 3,            //指定版本
                                    targets: "defaults"
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(png|jp?g|gif)$/i,
                // asset可以在asset/inline和asset/resource之间进行切换，文件小于8kb时使用asset/inline，否则使用asset/resource
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                // asset可以在asset/inline和asset/resource之间进行切换，文件小于8kb时使用asset/inline，否则使用asset/resource
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    devServer: {
        // 告诉服务器从哪里提供内容
        static: {
            directory: resolve(__dirname, 'dist'),
        },
        // 打开自动更新
        liveReload: true,
        // 打开gzip压缩
        compress: true,
        // 指定端口号
        port: 8888,
        proxy: {
            '/api': {
                // 访问的目标地址
                target: 'https://api.nftool.cn',
                // 如果不希望传递/api，则需要重写路径
                pathRewrite: { '^/api': '' },
                // 访问https时需要配置
                secure: false,
            },
            // 覆盖源主机名
            changeOrigin: true,
        },
    },
    // 指定构建的环境
    target: 'web'
};