
// 创建课堂组件

var BaseComponet = require('../../../common/component.js'); 
var template     = require('./createCouseUI.html');
var _            = require('../../../common/util.js');

//引用弹出课程弹窗
var CreateCourseModal = require('../../../modalBox/createCourseModal/createCourseModal.js');

var CreateCouseUI = BaseComponet.extend({
    name : "createCourse",     
	template:template,   
	config:function(data){   
		//默认没有课程
	}, 
	init:function () {
		      
	},  
	__createCourse:function(){
		new CreateCourseModal();
	}	 
});

module.exports = CreateCouseUI;

