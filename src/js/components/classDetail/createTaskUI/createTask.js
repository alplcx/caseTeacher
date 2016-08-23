
// 创建课堂组件

var BaseComponet = require('../../../common/component.js'); 
var template     = require('./createTask.html');
var _            = require('../../../common/util.js');

//引用参数创建课程的弹框
var CreateTaskTplModal = require('../../../modalBox/createTaskTplModal/createTaskTplModal.js');

var CreateCouseUI = BaseComponet.extend({
    name : "createTask",     
	template:template,   
	config:function(data){   
	}, 
	init:function () {
		      
	},
	__createTask:function(){
		new CreateTaskTplModal()
	}	
});

module.exports = CreateCouseUI;

