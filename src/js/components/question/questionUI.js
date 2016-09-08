// 题目页面整体UI
window.$ = window.jQuery = require('./../../lib/jquery-min.js');
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./questionUI.html');
var _            = require('../../common/util.js')
var sourceUIModal    = require('./../../modalBox/sourceUIModal/sourceUIModal.js');
var Notify =  require('./../../base/notify.js');
var head =  require('./../../base/head.js');

require('./../../lib/ajaxfileupload.js');  

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
		// 	taskType:3,
		// 	taskName:"看图片猜单词",
		// 	taskImage:"http://nos.netease.com/edu-image/FF9AE63D396C03A1B84107D08D0A0B8C.jpg?imageView&thumbnail=225y150&quality=100",
		// 	taskSound:2,
		// 	taskCont:[{"word":"uncel","is_correct":1},{"word":"grandma","is_correct":0}]
		// }; 
		this.$on('sourceCheck', this.getSourceData);
 
		this.data.taskDetail = {};  
		this.data.taskDetail.blockNum = 0;
		this.data.taskDetail.taskCont = [];
		this.data.taskDetail.taskSound = 0;
		this.data.isFinished = 0;
		this.data.sentence = "";
		this.data.taskID = 0;
		this.data.type = 0;
 	}, 

	init:function () { 
		this.supr();
		var _urlparam = _.getParams(window.location.href);
		this.data.taskID = _urlparam.taskID;
		this.data.type = _urlparam.type;
		var _accessToken = _.getCookie('CT_accessToken');
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
            url: "http://teacher.xcase.com.cn/Api/taskDetail?taskID=" + this.data.taskID + "&accessToken=" +_accessToken || 0,  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {
            	var _code = data.code;
                if(_code == 10000){
	            	var _data = data.data.taskDetail;
	            	_data.taskCont = _data.taskCont || [];
            		this.data.taskDetail = _data;
            		if(this.data.taskDetail.taskType == 3){
            			this.initSentence();
            		}
					this.$update();
                }else if(_code == 20000){
                }else if(_code == 20001){
                }else if(_code > 50000){
                	Notify.error(data.msg);  
                }
                this.$update();
            }.bind(this),  
            error: function () {  
                Notify.error('后台数据返回错误！');  
            } 
        }); 
		// //块数量显示

	},
	getBlockNum:function(){
		var _len = (this.data.taskDetail.taskCont||{}).length;
		var _s = [];
		if(this.data.taskDetail.taskType == 2){
			this.data.taskDetail.blockNum = _len*2
		}else{
			this.data.taskDetail.blockNum = _len;
		}
		return this.data.taskDetail.blockNum;
	},
	initSentence:function(){
		var _len = (this.data.taskDetail.taskCont||{}).length;
		var _s = [];
		// 生成句子
		for(var i=0 ; i<_len ; i++){
			_s.push(this.data.taskDetail.taskCont[i].word);
		}
		this.data.sentence = _s.join(" ");
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
	validAddblcok:function(){
		var _blockNum = this.getBlockNum();
		if(this.data.taskDetail.taskType != 3 && _blockNum >=12){
			Notify.error("小块数量不能超过12个");
			return false;
		}
		return true;
	},
	addBlock:function(){
		if(!this.validAddblcok()) return;

		var _newItem = {};
		if(this.data.taskDetail.taskType == 1){
			_newItem = {"word":"","is_correct":0};
		}else if(this.data.taskDetail.taskType == 2){
			_newItem = {"image":"1_0_0","word":""};
		}else if(this.data.taskDetail.taskType == 3){
			_newItem = {"word":""};
		}else if(this.data.taskDetail.taskType == 4){
			_newItem = {"image":"1_0_0","is_correct":0};
		}
		
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
	__play:function () {
		var voiceChange =  this.$refs.voiceChange;
		voiceChange.setAttribute('src','../img/voiceSpeek.gif');
		var audio = new Audio('http://teacher.xcase.com.cn/commres/sounds/'+this.data.taskDetail.taskSound+'.mp3');
		audio.play();
		audio.onended = function () {
			voiceChange.setAttribute('src','../img/voice.png');
		}
	},
	input:function($event){
		var _val = this.$refs.sentenceIpt.value;
		var reg = /[\u4e00-\u9fa5\w]+/g;	
		var _arr = _val.match(reg) || [];
		var _newTaskCont = [];
		for(var i=0;i<_arr.length;i++){
			var _temObj = {};
			_temObj.word = _arr[i];
			_temObj.id = i+1;
			_newTaskCont.push(_temObj);
		}
		if(_arr.length	< 1){
			_newTaskCont = [];
		}
		this.data.taskDetail.taskCont = _newTaskCont;
		this.getSentence();
	},
	addSourceSound:function(){
		this.data.curChoseBlcok = null;
		//题目和选项两个地方公用
		new sourceUIModal({data:{
	  		parent:this,
	  		type:2// type ：2 表示聲音；1表示圖片
	  	}});
	},
	getSourceData:function(_data){
		//素材库回调
		if(this.data.taskDetail.taskType == 1){
			this.data.taskDetail.taskCont[this.data.curChoseBlcok].image = _data;
		}else if(this.data.taskDetail.taskType == 2){
			this.data.taskDetail.taskCont[this.data.curChoseBlcok].image = _data;
		}else if(this.data.taskDetail.taskType == 4){
			if(this.data.curChoseBlcok == null){
				this.data.taskDetail.taskSound = _data;
			}else{
				this.data.taskDetail.taskCont[this.data.curChoseBlcok].image = _data;
			}
		}
		this.$update();
	},
	addSourceImg:function(_index){
		this.data.curChoseBlcok = _index;
		new sourceUIModal({data:{
	  		parent:this,
	  		type:1// type ：2 表示聲音；1表示圖片
	  	}});

	},
	valid:function(){

		var _detail = this.data.taskDetail,
			_len = (_detail.taskCont || []).length,
			_isRight = 0,
			_hasWord = true,
			_isWordNormal = true,
			_hasImage = true;

		if(!_detail.taskName){
			Notify.error("题目内容不能为空");
			return false;
		}else if(_detail.taskName.length > 12){
			Notify.error("课程名不能超过12个字符"); 
			return false;
		}else if(_detail.blockNum < 1 || _len <1){
			Notify.error("请设置小块数量"); 
			return false;
		}else if(_detail.taskType == 3 && _detail.blockNum > 4){
			Notify.error("小块数量不能超过4个"); 
			return false;
		}


		for(var i= 0 ; i<_len ; i++){
			if(_detail.taskCont[i].is_correct == 1){
				_isRight = 1;
			}
			if(!_detail.taskCont[i].word){
				_hasWord = false;
			}		
			if(!!_detail.taskCont[i].word && _detail.taskCont[i].word.length > 10){
				_isWordNormal = false;
			}	
			if(!_detail.taskCont[i].image || _detail.taskCont[i].image == "1_0_0"){
				_hasImage = false;
			}
		}

		if((_isRight==0)&&(_detail.taskType == 1 || _detail.taskType == 4)){
			Notify.error("请设置正确答案");
			return false;
		}
		if(_detail.taskType == 1 ){
			if(!_detail.taskImage){
				Notify.error("请设置题目图片");
				return false;
			}
			if(!_hasWord){
				Notify.error("请设置小块内单词");
				return false;
			}			
			if(!_isWordNormal){
				Notify.error("小块内单词长度不能超过10");
				return false;
			}
		}else if(_detail.taskType == 2 ){
			if(!_hasWord){
				Notify.error("请设置小块内单词");
				return false;
			}		
			if(!_isWordNormal){
				Notify.error("小块内单词长度不能超过10");
				return false;
			}	
			if(!_hasImage){
				Notify.error("请设置小块内图片");
				return false;
			}
		}else if(_detail.taskType == 3 ){
			if(_detail.blockNum < 1 || _len <1){
				Notify.error("请设置题目内容");
				return false;
			}
			if(!_hasWord){
				Notify.error("请设置小块内单词");
				return false;
			}		
			if(!_isWordNormal){
				Notify.error("小块内单词长度不能超过10");
				return false;
			}	
		}else if(_detail.taskType == 4 ){
			if(!_detail.taskSound){
				Notify.error("请设置题目声音");
				return false;
			}
			if(!_hasImage){
				Notify.error("请设置小块内图片");
				return false;
			}		
		}

		return true;
	},
	uploadImg:function(){
		var self = this;
		$("#fileToUpload").click();
		$("#fileToUpload").change(function(){
	        $.ajaxFileUpload({
	            url:"http://teacher.xcase.com.cn/Api/uploadTaskImage",
	            secureuri:false,
	            fileElementId:"fileToUpload",
	            dataType: 'json',
	            data:{phoid:"fileToUpload" , taskID:self.data.taskDetail.taskID},
	            success: function (data, status){	
					self.data.taskDetail.taskImage = data.data.fileurl;
					Notify.success("图片上传成功");
					self.$update();
	            },
	            error: function (data, status, e){
	                alert(e);
	            }
	        })
		}.bind(this));
	},
	save:function() {
		if(!this.valid()) return;
		var _detail = this.data.taskDetail;
		var _taskCont = JSON.stringify(_detail.taskCont);
		var _accessToken = _.getCookie('CT_accessToken') || 0;
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
					"&taskImage=" + _detail.taskImage + "&taskSound=" +_detail.taskSound + "&taskCont=" + _taskCont + "&accessToken=" + _accessToken || 0;
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
                	window.location.href = "/classDetail.html?classID=" + _detail.classID || 0;
                }
            }.bind(this),  
            error: function () {  
                alert('fail');  
            } 
        }); 
	}
});



module.exports = questionUI;

