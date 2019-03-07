/*
* @Author: Eis
* @Date:   2019-03-07 16:56:03
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-07 20:50:05
*/
'use strict'
require('./index.css');

var _user = require('service/user-service.js');
var _shoppingcar = require('service/shoppingcar-service.js');
var _b2cm = require('util/b2cm.js');

var navi = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadShoppingcarCount();
		return this;
	},
	bindEvent : function(){
		//登录点击事件
		$('.js-login').click(function(){
			_b2cm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './register.html';
		});
		//退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			}
			, function(errmsg){
				_b2cm.errorHint(errmsg);
			});
		});
	},
	//加载用户信息
	loadUserInfo : function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		}, function(errmsg){
			//无任何动作
		});
	},
	//加载购物车数量
	loadShoppingcarCount : function(){
		_shoppingcar.getShoppingcarCount(function(res){
			$('.navi .shoppingcar-count').text(res || 0);
		},function(errmsg){
			$('.navi .shoppingcar-count').text(0);
		});
	}
};

module.exports = navi.init();