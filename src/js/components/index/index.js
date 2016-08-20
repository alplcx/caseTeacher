
var BaseComponet = require('../../common/component.js'); 
var template     = require('./index.html');
var _            = require('../../common/util.js')
var Service      = require('../../service.js');


var CreateCourse = require('./createCouseUI/createCouseUI.js');//创建课程
var CourseInstruction = require('./courseInstructionUI/courseInstructionUI.js'); //课程详情列表


var Contanier = BaseComponet.extend({ 
    name : "contanier",
    service:Service,
	template:template,   
	config:function(data){ 
		this.supr();  
		_.extend(this.data,{
			courseFlag:0,//默认没有课程
			couseList :[]
		},true); 
	}, 
	init:function () {
		this.supr();
		this.service.getCourseList(null,function (data,result) {
			if(result.code ==10000){
				this.data.couseList = result.data;
			}
			this.$update();
		}.bind(this),function () {
			
		}.bind(this));
	},  
	enter:function(){
	  	
	}	 
});

module.exports = Contanier;

