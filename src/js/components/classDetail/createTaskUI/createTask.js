
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

		//获取模板id 注册获取模板相关参数
		this.$on('getTplId',function(_data){
			console.log(_data);
		})      
	},

	//生存模板
	__createTask:function(){
		new CreateTaskTplModal({
			data:{
				classID:this.data.classID,
				parent:this
			}
		})

	}	
});

module.exports = CreateCouseUI;

