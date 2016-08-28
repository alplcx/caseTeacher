// 题目页面整体UI
window.$ = window.jQuery = require('jquery');
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./questionUI.html');
var _            = require('../../common/util.js')
var sourceUIModal    = require('./../../modalBox/sourceUIModal/sourceUIModal.js');
var Notify =  require('./../base/notify.js');
// new sourceUIModal({data:{
// 	  		parent:this,
// 	  		type:2// type ：2 表示聲音；1表示圖片
// 	  	}});

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
		this.data.taskID = 0;
		this.data.type = 0;
 	}, 

	init:function () { 
		this.supr();
		var _urlparam = _.getParams(window.location.href);
		this.data.taskID = _urlparam.taskID;
		this.data.type = _urlparam.type;
		// 请求信息
		// this.service.opTask({type:2},function (data,result) {
		// 	this.data.taskDetail = data;
		// 	this.$update();
		// }.bind(this),function () {
			
		// }.bind(this)); 
		// 
		$.ajax({  
            type: "get",  
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/taskDetail?taskID=" + this.data.taskID,  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {
            	var _code = data.code;
                if(_code == 10000){
	            	var _data = data.data.taskDetail;
	            	// _data.taskCont = JSON.parse(_data.taskCont||"[]");
            		this.data.taskDetail = _data;
					this.$update();
                }else if(_code == 20000){
                }else if(_code == 20001){
                }
                this.$update();
            }.bind(this),  
            error: function () {  
                alert('fail');  
            } 
        }); 
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
	valid:function(){

		var _detail = this.data.taskDetail,
			_len = _detail.length;

		if(!_detail.taskName){
			Notify.error("题目内容不能为空");
			return false;
		}else if(_detail.taskName.length > 24){
			Notify.error("课程名不能超过24个字符"); 
			return false;
		}else if(_detail.blockNum < 1){
			Notify.error("请设置小块数量"); 
			return false;
		}

		for(var i= 0 ; i<_len ; i++){
			var _isRight = 0;
			if(!!_detail[i].is_correct){
				_isRight = 1;
				return false ;
			}//todo判断内容为空
			if(_detail.word){

			}
			if((_isRight==0)&&(_detail.type == 1 || _detail.type == 4)){
				Notify.error("请设置正确答案");
				return false;
			}
		}
	},
	save:function() {
		if(!this.valid()) return;
		var _detail = this.data.taskDetail;
		var _taskCont = JSON.stringify(_detail.taskCont);
		//var _taskCont = _detail.taskCont.toString();
		// var _param =  {
		// 	"type":this.data.type,
		// 	"classID":_detail.classID,
		// 	"taskID":this.data.taskID,
		// 	"blockNum":_detail.blockNum,
		// 	"taskType":_detail.taskType,
		// 	"taskName":_detail.taskName,
		// 	"taskImage":_detail.taskImage,
		// 	"taskSound":_detail.taskSound,
		// 	"taskCont": _detail.taskCont
		// };
		//var _result = JSON.stringify(_param);
		var _param =  "type=" +  this.data.type + "&classID=" + _detail.classID + "&taskID=" + this.data.taskID + 
					"&blockNum=" + _detail.blockNum + "&taskType=" +_detail.taskType + "&taskName=" + _detail.taskName + 
					"&taskImage=" + _detail.taskImage + "&taskSound=" +_detail.taskSound + "&taskCont=" + _taskCont;
		$.ajax({  
            type: "get",  
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/operTask?" + _param || "",  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {
            	var _code = data.code;
                if(_code == 10000){
                	Notify.success("保存成功");
                }
            }.bind(this),  
            error: function () {  
                alert('fail');  
            } 
        }); 
	}
});


module.exports = questionUI;

