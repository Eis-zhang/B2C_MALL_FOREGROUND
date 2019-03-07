/*
* @Author: Eis
* @Date:   2019-03-07 21:21:30
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-07 21:57:01
*/
'use strict'
require('./index.css');

require('page/common/simple-navi/index.js');
var _b2cm = require('util/b2cm.js');

$(function(){
	var type = _b2cm.getUrlParam('type') || 'default',
	$element = $('.' + type + '-success');
	//显示对应的提示页面
	$element.show();
})