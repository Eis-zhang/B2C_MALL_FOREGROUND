/*
* @Author: Eis
* @Date:   2019-03-09 15:42:55
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 17:05:58
*/
'use strict'
require('./index.css');

require('page/common/simple-navi/index.js');
var _b2cm = require('util/b2cm.js');
var _user = require('service/user-service.js');

//表单中的错误提示
var formError = {
	show: function(errmsg){
		$('.error-item').show().find('.err-msg').text(errmsg);
	},
	hide: function(errmsg){
		$('.error-item').hide().find('.err-msg').text('');
	}

};

var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		//验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//
			if(!username){
				return;
			}
			//异步验证用户名的存在与否
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errmsg){
				formError.show(errmsg);
			});
		});
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车，同样进行提交
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	//提交表单
	submit: function(){
		var formData = {
			uUsername: $.trim($('#username').val()),
			uPassword: $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			uPhone: $.trim($('#phone').val()),
			uEmail: $.trim($('#email').val()),
			uFindquestion: $.trim($('#findquestion').val()),
			uFindanswer: $.trim($('#findanswer').val())
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//成功提交到后台
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
			},function(errmsg){
				formError.show(errmsg);
			});
		}else{
			//失败给出提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证字段
	formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证用户名是否为空
        if(!_b2cm.validate(formData.uUsername, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        // 验证密码是否为空
        if(!_b2cm.validate(formData.uPassword, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 验证密码长度
        if(formData.uPassword.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.uPassword !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
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