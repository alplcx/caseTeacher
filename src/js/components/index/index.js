
var BaseComponet = require('../../common/component.js'); 
var template     = require('./index.html');
var _            = require('../../common/util.js')
var Service      = require('../../service.js');


var CreateCourse = require('./createCouseUI/createCouseUI.js');//创建课程
var CourseInstruction = require('./courseInstructionUI/courseInstructionUI.js'); //课程详情列表


var Index = BaseComponet.extend({ 
    name : "contanier",
    service:Service,
	template:template,   
	config:function(data){ 
		this.supr();  
		_.extend(this.data,{
			courseDetailShow:0,//默认不显示课堂详情
			couseList :[]
		},true); 
	}, 
	init:function () {
		this.supr();
		this.service.getCourseList(null,function (data,result) {
			if(result.code ==10000){
				this.data.couseList = data.classList;
			}
			this.$update();
		}.bind(this),function () {
			
		}.bind(this));
	},  
	enter:function(){
	  	
	}	 
});

module.exports = Index;

