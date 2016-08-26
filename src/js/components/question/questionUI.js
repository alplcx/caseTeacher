// 题目页面整体UI
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./questionUI.html');
var _            = require('../../common/util.js')

//taskType( 1 看图片猜单词 、2 图片关联单词 、3 智能排序 、4 听声音猜图片)
var questionUI = BaseComponet.extend({ 
    name : "questionUI",
	service :cacheService, 
	template:template,
	config:function(data){ 
		// _.extend(this.data, {
  //       });
  //       this.data.taskDetail  = {
		// 	type:2,
		// 	classID:66,
		// 	taskID:123,
		// 	blockNum:4,
		// 	taskType:1,
		// 	taskName:"看图片猜单词",
		// 	taskImage:"http://nos.netease.com/edu-image/FF9AE63D396C03A1B84107D08D0A0B8C.jpg?imageView&thumbnail=225y150&quality=100",
		// 	taskSound:2,
		// 	taskCont:[{"word":"uncel","is_correct":1},{"word":"grandma","is_correct":0}]
		// }; 
		this.data.taskDetail = {};
		this.data.blockNum = 0;
		this.data.sentence = "";
 	}, 
	init:function () { 
		this.supr();
		// 请求信息
		this.service.opTask({type:2},function (data,result) {
			this.data.taskDetail = data;
			this.$update();
		}.bind(this),function () {
			
		}.bind(this)); 
		//块数量显示
		setTimeout(function() {
			var _len = (this.data.taskDetail.taskCont||{}).length;
			if(this.data.taskDetail.taskType == 2){
				this.data.blockNum = _len*2
			}else{
				this.data.blockNum = _len;
			}
			this.getSentence();
		}.bind(this),0)
	},
	getSentence:function(){
		this.data.sentence = "";
		// 生成句子
		for(var i=0 ; i<(this.data.taskDetail.taskCont||{}).length ; i++){
			this.data.sentence += this.data.taskDetail.taskCont[i].word+" ";
		}
		this.$update();
	},
	enter:function(){
		
	},
	handleCheck:function(_index){
		var _cnt = this.data.taskDetail.taskCont;
		for(var i=0;i<_cnt.length;i++ ){
			if(_index == i){
				_cnt[i].is_correct= 1;
			}else{
				_cnt[i].is_correct = 0;
			}
		}
	},
	addBlock:function(){
		var _newItem = {"word":"","is_correct":0};
		this.data.taskDetail.taskCont.push(_newItem);
	},
	delBlock:function(_index){
		this.data.taskDetail.taskCont.splice(_index , 1);
	},
	input:function($event){
		var _val = this.$refs.sentenceIpt.value;
		var _arr = _val.trim().split(" ");
		var _newTaskCont = [];
		for(var i=0;i<_arr.length;i++){
			var _temObj = {};
			_temObj.word = _arr[i];
			_temObj.id = i+1;
			_newTaskCont.push(_temObj);
		}
		this.data.taskDetail.taskCont = _newTaskCont;
		this.getSentence();
	}
});


module.exports = questionUI;

