/*
* @Author: Eis
* @Date:   2019-03-06 19:33:50
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 14:18:08
*/
'use strict'

var Hogan = require('hogan.js');

var conf={
	serverHost : ''
};

var _b2cm = {
	//网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type : param.method || 'get',
			url : param.url || '',
			dataType : param.type || 'json',
			data : param.data || '',
			success : function(res){
				//登录成功
				if(res.status === 0){
					typeof param.success === 'function' && param.success(res.data, res.mes);
				}
				//未登录，需迁至登录
				else if(res.status === 10){
					_this.doLogin;
				}
				else if(res.status === 1){
					typeof param.error === 'function' && param.error(res.mes);
				}
			},
			error : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//统一登录处理
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = './index.html';
	},
	getServerUrl : function(path){
        return conf.serverHost + path;
    },
	//获取url参数
	getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //html模板渲染
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
        return result;
    },
    //提示成功
    successHint : function(msg){
    	alert(msg || '操作成功！');
    },
    errorHint : function(msg){
    	alert(msg || '操作出错！');
    },
    //验证字段是否正确，包括是否为空等
    validate : function(value, type){
    	var value = $.trim(value);
    	//非空验证
    	if('require' === type){
    		return !!value;
    	}
    	//验证手机
    	if('phone' === type){
    		//以1开头后接10位数字
    		return /^1\d{10}$/.test(value);
    	}
    	if('email' === type){
    		//email正则表达式
    		return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    	}
    }
};

module.exports = _b2cm;