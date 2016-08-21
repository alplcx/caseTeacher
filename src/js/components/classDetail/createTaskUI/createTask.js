
// 创建课堂组件

var BaseComponet = require('../../../common/component.js'); 
var template     = require('./createTask.html');
var _            = require('../../../common/util.js')

var CreateCouseUI = BaseComponet.extend({
    name : "createTask",     
	template:template,   
	config:function(data){   
	}, 
	init:function () {
		      
	},  
	enter:function(){
	  	
	}	 
});

module.exports = CreateCouseUI;

