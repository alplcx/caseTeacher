
// 创建课堂组件
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./taskItem.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');


var DeleteTaskModal =  require('../../../modalBox/deleteTaskModal/deleteTaskModal.js');
//var EditTaskModal    =  require('../../../modalBox/editTaskModal/editTaskModal.js');
var testingModal    = require('../../../modalBox/sourceUIModal/sourceUIModal.js');


var CourseInstructionUI = BaseComponet.extend({
    name : "taskItem",     
	template:template,   
	service: Service,
	config:function(data){  
		_.extend(this.data,{
		},true)
	}, 
	init:function () {
		console.log(this.data);
	},  
	testing:function(){
	  	new testingModal();
	},	
    /**
     * @override
     */
    close: function() {
        /**
         * @event close 确定对话框时触发
         */
        this.$emit('close');
        this.destroy();
    } ,
	/**
	 * 操作课程
	 * @param  {[type]} id   [description]
	 * @param  {[type]} type 操作类型
	 * @return {[type]}      [description]
	 */
	__opTodo:function (taskID,type) {
		var params = {
			taskID: taskID,
			type:type,
		}
		if(type == 2){

			//编辑课程	
			console.log(params);
			location.href = 'question.html?taskID='+taskID+"type="+type;
			/*new EditTaskModal({
				data:{
					params:params,
					parent:this //将父节点传入
				}
			});*/
		}else if(type ==3 ){
			debugger;
			//删除课程
			new DeleteTaskModal({
				data:{
					params:params,
					parent:this //将父节点传入
				}
			});
		}
	}
});

module.exports = CourseInstructionUI;

