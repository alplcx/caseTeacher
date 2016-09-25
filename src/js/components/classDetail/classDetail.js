// 课堂详情

var BaseComponet = require('../../common/component.js'); 
var template     = require('./classDetail.html');
var _            = require('../../common/util.js');
var Service      = require('../../service.js');

var TaskItem    = require('./taskItemUI/taskItem.js');
var CreateTask  = require('./createTaskUI/createTask.js');
var Notify      = require('../../base/notify.js');
var SourceImgUIModal =  require('../../modalBox/sourceImgUIModal/sourceImgUIModal.js');

//引用两个组件

var SortUI = require('../interact/sortUI/sortUI.js');
var VocabularyUI =  require('../interact/vocabularyUI/vocabularyUI.js');


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
		if(classID == null || classID==''){
			//不存在该课程
		}else{
			this.data.classID = classID;
			this.getClassDetail(classID);
			this.getTaskList(classID); //获取互动环节 
		}
	},

	//课堂详情
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

	// 互动环节列表
	getTaskList:function (classID) {
		this.service.getTaskList(classID,function (data,result) {
			//成功函数
			// for (var i = 0; i < data.interactList.length; i++) {
			// 	if(data.interactList[i].type==1){
			// 		new VocabularyUI().$inject(this.$refs.interactList);
			// 	}else if(data.interactList[i].type==2){
			// 		//等有这个组件的时候，将其放开
			// 		//new SortUI().$inject(this.$refs.interactList);
			// 	}
			// }
			this.data.interactList = data.interactList;
			this.$update();
		}.bind(this),function (data,result) {
			//失败函数
			Notify.error(result.msg);
		}.bind(this))
	},

	//返回上一级
	back:function(){
		//需要先判定验证选项中编辑过的是否还有没有保存
		//如果保存了，可以返回上一级
		//否则弹窗提示
		
		location.href = "index.html"
	},

	//互动环节完成 @bob
	InteractListSave:function(){
		
		//互动环节入参，下面是实例
		
		// var params = {
		// 	options:[
		// 		{"optionId":"4","item_cont":"{\"id\":1,\"en\":\"bear\",\"zh\":\"\\u718a\",\"proTag\":\"default\"}"},
		// 		{"optionId":"5","item_cont":"{\"id\":2,\"en\":\"bee\",\"zh\":\"\\u871c\\u8702\",\"proTag\":\"default\"}"},
		// 		{"optionId":"6","item_cont":"{\"id\":3,\"en\":\"bird\",\"zh\":\"\\u9e1f\",\"proTag\":\"default\"}"},
		// 		{"optionId":"7","item_cont":"{\"id\":4,\"en\":\"cat\",\"zh\":\"\\u732b\",\"proTag\":\"default\"}"}
		// 	 ]
		// };
		var _tempArr = [],
			_VocabularyUI = this.$refs.VocabularyUI || window.VocabularyUI,
			_vOptions = _VocabularyUI && _VocabularyUI.data.options||[],
			_SortUI   = this.$refs.SortUI || window.SortUI,
			_sOptions = _SortUI && _SortUI.data.options||[];

		if(!!_VocabularyUI && _vOptions.length > 0){
			for(var i= 0;i<_vOptions.length;i++){
				_tempArr.push(_vOptions[i]);
			}
		}
		if(!!_SortUI && (_SortUI.data.options||[]).length > 0){
			for(var i= 0;i<_sOptions.length;i++){
				_tempArr.push(_sOptions[i]);
			}
		}

		var params ={};
		params.options = JSON.stringify(_tempArr);

		this.service.interactListSave(params,function(data,result){
			Notify.success("保存成功,3s后回到首页");
			setTimeout(function(){
				window.location.href = "http://teacher.xcase.com.cn/index.html";
			},3000)
		}.bind(this),function(data,result){
			Notify.error(result.msg);
		}.bind(this))
	},

	enter:function(){
	  	
	}

});

module.exports = ClassDetail;

