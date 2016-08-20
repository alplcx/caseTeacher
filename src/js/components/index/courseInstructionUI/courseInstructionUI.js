
// 创建课堂组件

var BaseComponet = require('../../../common/component.js'); 
var template     = require('./courseInstructionUI.html');
var _            = require('../../../common/util.js')

var CourseInstructionUI = BaseComponet.extend({
    name : "courseInstruction",     
	template:template,   
	config:function(data){ 
		console.log(data);  
		_.extend(this.data,{
		},true)
		 
	}, 
	init:function () {
		      
	},  
	enter:function(){
	  	
	}	 
});

module.exports = CourseInstructionUI;

