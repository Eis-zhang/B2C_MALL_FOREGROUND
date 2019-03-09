/*
* @Author: Eis
* @Date:   2019-03-07 17:21:48
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 22:39:44
*/
'use strict'

var _b2cm = require('util/b2cm.js');

var _user = {
	//登录状态检查
	checkLogin : function(resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/getUserInfo.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	checkUsername : function(username, resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/checkEffectiveness.do'),
			data : {
				type : 'username',
				str : username
			},
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	register : function(userInfo,resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/register.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	getQuestion : function(username,resolve,reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/getFindQuestion.do'),
			data : {
				username : username
			},
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	checkAnswer : function(userInfo,resolve,reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/checkFindAnswer.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	updatePassword : function(userInfo,resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/resetPassword.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	login : function(userInfo,resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/login.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	getUserInfo : function(resolve,reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/getUserInfo.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	resetPassword : function(userInfo,resolve,reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/resetPasswordInForget.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	updateUserInfo : function(userInfo,resolve,reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/updateUserInfo.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	logout : function(resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	}
}
module.exports = _user;