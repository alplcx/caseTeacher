
// 创建课堂组件
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./taskItem.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');



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
	enter:function(){
	  	
	},	
	/**
	 * 操作课程
	 * @param  {[type]} id   [description]
	 * @param  {[type]} type 操作类型
	 * @return {[type]}      [description]
	 */
	__opTodo:function (taskID,type) {
		var params = {
			taskID: taskID,
			type:type
		}
		this.service.opTask(params,function (data,result) {
			if(result.code == 10000){
				//操作成功
				if(type == 3){
					//删除当前节点
					this.close();
				}
			}
		}.bind(this),function(data,result){
			//操作失败
		}.bind(this))
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
    }
});

module.exports = CourseInstructionUI;

