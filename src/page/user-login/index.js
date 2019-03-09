/*
* @Author: Eis-zhangyu
* @Date:   2019-03-05 23:24:05
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 15:35:47
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
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//成功提交到后台
			_user.login(formData,function(res){
				window.location.href = _b2cm.getUrlParam('redirect') || './index.html';
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
        if(!_b2cm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_b2cm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
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