
// 课堂详情

var BaseComponet = require('../../common/component.js'); 
var template     = require('./classDetail.html');
var _            = require('../../common/util.js');
var Service      = require('../../service.js');

var TaskItem    = require('./taskItemUI/taskItem.js');
var CreateTask  = require('./createTaskUI/createTask.js');

var ClassDetail = BaseComponet.extend({
    name : "classDetail",     
	template:template, 
	service:Service,  
	config:function(data){  
	   _.extend(this.data,{
	   		subject:'',
	   		creator:'',
	   		taskNum:'',
	   		createTime:'',
	   		classDesc:'',
	   		classDetail:[]
	   },true)
	}, 
	init:function () {
		var url = location.href;
		var classID = _.getParams(url).classID;
		if(classID ==null || classID==''){
			//不存在该课程
		}else{
			this.service.getClassDetail(classID,function (data,result) {
				//成功函数
				this.data = data;
				this.$update();
			}.bind(this),function (data,result) {
				//失败函数
				
			}.bind(this))
		}
	},  
	enter:function(){
	  	
	}	 
});

module.exports = ClassDetail;

