/*
* @Author: Eis
* @Date:   2019-03-09 20:47:54
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 22:16:32
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
	data : {
		username : '',
		question : '',
		answer : '',
		findToken : ''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadStepUsername();
	},
	bindEvent: function(){
		var _this = this;

		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errmsg){
					formError.show(errmsg);
				});
			}else{
				formError.show('请输入用户名！');
			}
		});

		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer : answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.findToken = res;
					_this.loadStepPassword();
				},function(errmsg){
					formError.show(errmsg);
				});
			}else{
				formError.show('请输入答案！');
			}
		});

		

		$('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            // 密码不为空
            if(password && password.length >= 6){
                // 检查密码提示问题答案
                _user.resetPassword({
                	username : _this.data.username,
                	passwordN : password,
                	findToken : _this.data.findToken
                },function(res){
                	window.location.href = './result.html?type=pass-reset';
                },function(errmsg){
                	formError.show(errmsg);
                });
            }
            // 密码为空
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        
	},
	/*第一步*/
	loadStepUsername : function(){
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function(){
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入password的一步
    loadStepPassword : function(){
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
};
$(function(){
	page.init();
})