const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/', // 动态引入
		filename: 'js/app.js'
	},
	resolve: {
		alias: {
			page: path.resolve(__dirname, 'src/page'),
			component: path.resolve(__dirname, 'src/component'),
			util: path.resolve(__dirname, 'src/util'),
			service: path.resolve(__dirname, 'src/service')
		}
	},
	devServer: {
		port: 8081,
		historyApiFallback: {
			index: '/dist/index.html'
		},
		proxy: {
			'/manage': {
				target: 'http://admintest.happymmall.com',
				changeOrigin: true
			},
			'/user/logout.do': {
				target: 'http://admintest.happymmall.com',
				changeOrigin: true
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, // 8k
							name: 'static/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, // 8k
							name: 'static/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		// 处理html文件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './favicon.ico'
		}),
		// 独立css文件
		new ExtractTextPlugin('css/[name].css'),
		//提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		})
	]
};
