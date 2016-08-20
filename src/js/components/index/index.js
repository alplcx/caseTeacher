
var BaseComponet = require('../../common/component.js'); 
var template     = require('./index.html');
var _            = require('../../common/util.js')


var CreateCourse = require('./createCouseUI/createCouseUI.js');//创建课程
var CourseInstruction = require('./courseInstructionUI/courseInstructionUI.js'); //课程详情列表


var Contanier = BaseComponet.extend({ 
    name : "contanier",     
	template:template,   
	config:function(data){ 
		this.supr();  
		_.extend(this.data,{
			courseFlag:0,//默认没有课程
			couseList :[{
				couseName:'音乐朗读',
				id:'2',
				author:'zhangzhang',
				createTime:'2016-12-12',
				questionNum:12,
				minNum:3,
				maxNum:12
			}]
		},true); 
	}, 
	init:function () {
		this.supr();
	},  
	enter:function(){
	  	
	}	 
});

module.exports = Contanier;

