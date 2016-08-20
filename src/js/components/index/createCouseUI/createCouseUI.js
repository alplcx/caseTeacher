
// 创建课堂组件

var BaseComponet = require('../../../common/component.js'); 
var template     = require('./createCouseUI.html');
var _            = require('../../../common/util.js')

var Contanier = BaseComponet.extend({
    name : "createCourse",     
	template:template,   
	config:function(data){   
		//默认没有课程
		this.data.courseFlag = 0;   
	}, 
	init:function () {
		      
	},  
	enter:function(){
	  	
	}	 
});

module.exports = Contanier;

