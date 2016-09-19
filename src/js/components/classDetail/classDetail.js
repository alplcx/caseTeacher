// 课堂详情

var BaseComponet = require('../../common/component.js'); 
var template     = require('./classDetail.html');
var _            = require('../../common/util.js');
var Service      = require('../../service.js');

var TaskItem    = require('./taskItemUI/taskItem.js');
var CreateTask  = require('./createTaskUI/createTask.js');

var Notify      = require('../../base/notify.js');

var ClassDetail = BaseComponet.extend({
    name : "classDetail",     
	template:template, 
	service:Service,  
	config:function(data){  
	   _.extend(this.data,{
	   },true)
	}, 
	init:function () {
		var url = location.href;
		var classID = _.getParams(url).classID;
		if(classID ==null || classID==''){
			//不存在该课程
		}else{
			this.getClassDetail(classID);
			//this.getTaskList(classID); //获取课程列表
		}
	},  
	getClassDetail:function (classID) {
		this.service.getClassDetail(classID,function (data,result) {
			//成功函数
			this.data.classDetail = data.classDetail;
			this.$update();
		}.bind(this),function (data,result) {
			//失败函数
			Notify.error(result.msg);
		}.bind(this))
	},
	getTaskList:function (classID) {
		this.service.getTaskList(classID,function (data,result) {
			//成功函数
			this.data.taskList = data.taskList;
			this.$update();
		}.bind(this),function (data,result) {
			//失败函数
			Notify.error(result.msg);
		}.bind(this))
	},
	enter:function(){
	  	
	}
});

module.exports = ClassDetail;

