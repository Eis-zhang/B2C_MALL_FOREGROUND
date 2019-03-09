/*
* @Author: Eis
* @Date:   2019-03-09 17:22:47
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 18:07:51
*/
'use strict'
require('./index.css')
require('page/common/header/index.js');
require('page/common/navi/index.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/side-navi/index.js');
var _b2cm = require('util/b2cm.js');
var templateIndex = require('./index.string');

var page = {
	init: function(){
		this.onLoad();
	},
	onLoad: function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _b2cm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errmsg){
			_b2cm.errorHint(errmsg);
		});
	}
};
$(function(){
	page.init();
})