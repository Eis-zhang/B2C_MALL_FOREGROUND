/*
* @Author: Eis-zhangyu
* @Date:   2019-03-05 23:04:29
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-07 21:42:20
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置，dev/online两种环境
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plubgin参数
var getHtmlConfig = function(name, title){
	return {
		template : './src/view/'+name+'.html',
		filename : 'view/'+name+'.html',
		title : title,
		inject : true,
		hash : true,
		chunks : ['common',name]
	};
};

//webpack参数
var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js'],
		'result' : ['./src/page/result/index.js']
	},
	devServer: {
    	host: "test.b2cmall.charlesproxy.com",
    	disableHostCheck: true,
    	port: 8088
  	},
	output: {
		//生成目录
		path: './dist',
		//访问地址
		publicPath : '/dist',
		filename: 'js/[name].js'	
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module: {
		loaders: [
			//css
			{ test : /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
			//字体与图片
			{ test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
			{
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
		]
	},
	resolve : {
		alias :  {
			util :  __dirname+'/src/util/',
			page :  __dirname+'/src/page/',
			image :  __dirname+'/src/image/',
			service :  __dirname+'/src/service/',
			node_modules : __dirname+'/node_modules'
		}
	},
	plugins : [
		//html模板处理
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
		//将css单独打包到文件中
		new ExtractTextPlugin("css/[name].css"),
		//独立通用模块
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		})
	]
};

if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;