
// 创建课堂组件
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./courseInstructionUI.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');



var CourseInstructionUI = BaseComponet.extend({
    name : "courseInstruction",     
	template:template,   
	service: Service,
	config:function(data){  
		_.extend(this.data,{
		},true)
	}, 
	init:function () {
		this.data.item = this.data.item % 4;
		this.$update();
	},  
	enter:function(){
	  	
	},	
	/**
	 * 操作课堂
	 * @param  {[type]} id   [description]
	 * @param  {[type]} type 操作类型
	 * @return {[type]}      [description]
	 */
	__opTodo:function (classID,type) {
		var params = {
			classID: classID,
			type:type
		}
		this.service.opCourse(params,function (data,result) {
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
	 * 课程详情
	 * @return {[type]} [description]
	 */
	__opDetail:function (classID) {
		alert('ff');
		location.href = 'classDetail.html?'+classID;
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

