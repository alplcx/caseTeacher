var BaseComponet = require('../common/component.js');
var cacheService = require('../service.js');
var _            = require('../common/util.js');
var template     = require('../../html/base/header.html');
var LoginModal   = require('../componets/login/index.js');

var Head = BaseComponet.extend({
	service :cacheService,
	template:template,
	config:function(data){
	},
	init:function () {
		
	},
	enter:function(){
		
	}	
});

Head.component('login',LoginModal);

module.exports = Head;

