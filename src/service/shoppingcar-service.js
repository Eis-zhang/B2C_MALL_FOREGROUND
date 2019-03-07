/*
* @Author: Eis
* @Date:   2019-03-07 17:38:29
* @Last Modified by:   Eis
* @Last Modified time: 2019-03-07 18:57:58
*/
'use strict'

var _b2cm = require('util/b2cm.js');

var _shoppingcar = {
	getShoppingcarCount : function(resolve, reject){
		_b2cm.request({
			url : _b2cm.getServerUrl('/Shoppingcar/getShoppingcarProductCount.do'),
			success : resolve,
			error : reject
		});
	}
}
module.exports = _shoppingcar;