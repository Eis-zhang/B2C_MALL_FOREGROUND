/*
* @Author: Eis
* @Date:   2019-03-07 20:14:56
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-09 22:19:54
*/
'use strict';
require('./index.css');

var _b2cm = require('util/b2cm.js');
var templateIndex = require('./index.string');

var sideNavi = {
	option : {
		name : '',
		navList : [
			{name: 'user-center', desc: '个人中心', href: './user-center.html'},
			{name: 'order-list', desc: '我的订单', href: './order-list.html'},
			{name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html'},
			{name: 'about', desc: '关于此商城', href: './about.html'}
		]
	},
	init : function(option){
        // 合并选项
        $.extend(this.option, option);
        this.renderNavi();
    },
	//渲染导航菜单
	renderNavi : function(){
		// 计算active数据
		for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		};
		//渲染list数据
		var naviHtml = _b2cm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
		//把HTML放入容器中
		$('.side-navi').html(naviHtml);
	}
};

module.exports = sideNavi;