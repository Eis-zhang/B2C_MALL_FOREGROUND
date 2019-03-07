/*
* @Author: Eis
* @Date:   2019-03-07 18:59:23
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-07 19:23:15
*/

'use strict'

require('./index.css');
var _b2cm = require('util/b2cm.js');
//通用页面头部
var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _b2cm.getUrlParam('keyword');
		//keyword若存在则输入框回填
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		//点击后提交搜索
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后同样提交搜索
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				//13即为回车
				_this.searchSubmit();	
			}
		})
	},
	//搜索功能提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//提交时有keyword，正常跳转
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			//如果为空返回到首页
			_b2cm.goHome();
		}
	}
};

header.init();