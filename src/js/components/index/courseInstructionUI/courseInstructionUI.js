
// 创建课堂组件
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./courseInstructionUI.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');

//加载弹框
var DelelteClassModal =  require('../../../modalBox/deleteClassModal/deleteClassModal.js');
var EditClassModal    =  require('../../../modalBox/editClassModal/editClassModal.js');



var CourseInstructionUI = BaseComponet.extend({
    name : "courseInstruction",     
	template:template,   
	service: Service,
	config:function(data){  
		_.extend(this.data,{
		},true)
	}, 
	init:function () {
		//this.data.item = this.data.item % 4;
		
		this.$update();
	},  
	/**
	 * 操作课堂
	 * @param  {[type]} id   [description]
	 * @param  {[type]} type 操作类型
	 * @return {[type]}      [description]
	 */
	__opTodo:function (classID,type,$event) {
		$event.stopPropagation();
		var params = {
			classID: classID,
			type:type,
			
		}

		if(type == 2){
			//编辑课堂
			params.className = this.data.info.className;
			params.subject   = this.data.info.subject;
			params.classDesc = this.data.info.classDesc||'testing';
			
			new EditClassModal({
				data:{
					params:params,
					parent:this //将父节点传入
				}
			});
		}else if(type ==3 ){
			//删除课堂
			new DelelteClassModal({
				data:{
					params:params,
					parent:this //将父节点传入
				}
			});
		}
	},
	courseInstructionUpdate:function(params) {
		_.extend(this.data.info,params,true);
		this.$update();
	},
	/**
	 * 课程详情
	 * @return {[type]} [description]
	 */
	__opDetail:function (classID,$event) {
		location.href = 'classDetail.html?classID='+classID;
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

