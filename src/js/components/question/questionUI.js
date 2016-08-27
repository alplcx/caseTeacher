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
		this.data.taskDetail.blockNum = 0;
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
			var _s = [];
			// 生成句子
			for(var i=0 ; i<_len ; i++){
				_s.push(this.data.taskDetail.taskCont[i].word);
			}
			this.data.sentence = _s.join(" ");
			this.$update();
		}.bind(this),0)
	},
	getBlockNum:function(){
		var _len = (this.data.taskDetail.taskCont||{}).length;
		var _s = [];
		if(this.data.taskDetail.taskType == 2){
			this.data.taskDetail.blockNum = _len*2
		}else{
			this.data.taskDetail.blockNum = _len;
		}
	},
	getSentence:function(){
		var _s = [];
		var _len = (this.data.taskDetail.taskCont||{}).length;
		// 生成句子
		for(var i=0 ; i<_len ; i++){
			_s.push(this.data.taskDetail.taskCont[i].word);
		}
		this.getBlockNum();
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
		this.getBlockNum();
	},
	delBlock:function(_index){
		this.data.taskDetail.taskCont.splice(_index , 1);
		this.getBlockNum();
	},
	delTaskSound:function(){
		this.data.taskDetail.taskSound="";
	},
	input:function($event){
		var _val = this.$refs.sentenceIpt.value;
		var reg = /\w+/g;	
		var _arr = _val.match(reg);
		var _newTaskCont = [];
		for(var i=0;i<_arr.length;i++){
			var _temObj = {};
			_temObj.word = _arr[i];
			_temObj.id = i+1;
			_newTaskCont.push(_temObj);
		}
		this.data.taskDetail.taskCont = _newTaskCont;
		this.getSentence();
	},
	save:function() {
		var _detail = this.data.taskDetail,
			_len = _detail.length;

		if(!_detail.taskName){
			alert("题目内容不能为空");
			return;
		}else if(_detail.taskName.length > 24){
			alert("课程名不能超过24个字符");
			return;
		}else if(_detail.blockNum < 1){
			alert("请设置小块数量");
			return;
		}

		for(var i= 0 ; i<_len ; i++){
			var _isRight = 0;
			if(!!_detail[i].is_correct){
				_isRight = 1;
				return ;
			}//todo判断内容为空
			if(_detail.word){

			}
			if((_isRight==0)&&(_detail.type == 1 || _detail.type == 4)){
				alert("请设置正确答案");
				return;
			}
		}

		// if(_detail.type == 1 || _detail.type == 4){
		// 	if(_len<1){
		// 		alert("请设置小块");
		// 	}
		// 	return;
		// }else if(_detail.type == 2){
		// 	alert("课程名不能超过24个字符");
		// 	return;
		// }else if(_detail.type == 3){
		// 	alert("课程名不能超过24个字符");
		// 	return;
		// }else if(_detail.type == 4){

		// }
	}
});


module.exports = questionUI;

