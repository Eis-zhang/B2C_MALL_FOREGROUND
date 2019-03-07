/*
* @Author: Eis
* @Date:   2019-03-07 17:21:48
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-07 21:02:27
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