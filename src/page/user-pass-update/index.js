/*
* @Author: Eis
* @Date:   2019-03-09 22:14:15
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 22:38:47
*/
'use strict'
require('./index.css')
require('page/common/header/index.js');
require('page/common/navi/index.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/side-navi/index.js');
var _b2cm = require('util/b2cm.js');

var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		navSide.init({
			name : 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				passwordO       : $.trim($('#password').val()),
				passwordN       : $.trim($('#passwordN').val()),
                passwordConfirm      : $.trim($('#passwordN-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordO : userInfo.passwordO,
					passwordN : userInfo.passwordN
				}, function(res, msg){
					_b2cm.successHint(msg);
				},function(errmsg){
					_b2cm.errorHint(errmsg)
				});
			}else{
				_b2cm.errorHint(validateResult.msg)
			}
		});
	},
	validateForm : function(formData){
		var result = {
            status  : false,
            msg     : ''
        };
       // 验证手机号
        if(!_b2cm.validate(formData.passwordO, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formData.passwordN || formData.passwordN.length < 6){
            result.msg = '新密码不能为空且长度不得少于6位';
            return result;
        }
        // 验证邮箱格式
        if(formData.passwordN !== formData.passwordConfirm){
            result.msg = '两次密码输入不一致！';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
	}
};
$(function(){
	page.init();
})