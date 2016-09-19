
// 创建互动环节组件

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
		new CreateTaskTplModal({
			data:{
				classID:this.data.classID,
				success:function (result) {
					console.log(result);//这里的result 就是前端需要的值
				}
			}
		})

	}	
});

module.exports = CreateCouseUI;

