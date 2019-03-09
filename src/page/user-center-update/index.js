/*
* @Author: Eis
* @Date:   2019-03-09 17:27:31
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 20:25:47
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
		this.bindEvent();
	},
	onLoad: function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				uPhone       : $.trim($('#phone').val()),
				uEmail       : $.trim($('#email').val()),
                uFindquestion    : $.trim($('#findquestion').val()),
                uFindanswer      : $.trim($('#findanswer').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo, function(res, msg){
					_b2cm.successHint(msg);
					window.location.href = './user-center.html';
				},function(errmsg){
					_b2cm.errorHint(errmsg)
				});
			}else{
				_b2cm.errorHint(validateResult.msg)
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _b2cm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errmsg){
			_b2cm.errorHint(errmsg);
		});
	},
	validateForm : function(formData){
		var result = {
            status  : false,
            msg     : ''
        };
       // 验证手机号
        if(!_b2cm.validate(formData.uPhone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_b2cm.validate(formData.uEmail, 'email')){
            result.msg = 'email格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_b2cm.validate(formData.uFindquestion, 'require')){
            result.msg = '找回密码问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_b2cm.validate(formData.uFindanswer, 'require')){
            result.msg = '找回密码问题答案不能为空';
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