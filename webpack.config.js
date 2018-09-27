const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {test1:"./src/test1.js",test2:"./src/test2.js"},
    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.js'
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({ //要有一个模板 不然打包出来的没有这个<div id='app'></div>， 会报 Target container is not a DOM element
            title: 'first webpack',
            filename: 'index.html',
            // chunks: [],
            template: 'index.html'
        }),
        new ExtractTextWebpackPlugin("[name].css"),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname
        })
    ],
    module:{
        rules:[{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {loader: "babel-loader"}
        },{
            test: /\.less$/,
            // use:[
            //     'style-loader',
            //     'css-loader',
            //     // 'css-loader?modules&localIdentName=[name]-[hash:base64:5]',
            //     'less-loader'
            // ]
            use: ExtractTextWebpackPlugin.extract(['css-loader','less-loader'])  // 单独打包出CSS，这里配置注意下
        },{
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 8192
                }
            }
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2, maxInitialRequests: 5,
                    minSize: 0
                },
                // vendor: {
                //     test: /node_modules/,
                //     chunks: 'initial',
                //     name: 'vendor',
                //     priority: 10,
                //     enforce: true
                // }
            }
        }
    }
}