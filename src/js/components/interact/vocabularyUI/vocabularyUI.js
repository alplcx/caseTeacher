// 语言词汇学习集ui
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./vocabularyUI.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');
var Notify   = require('../../../base/notify.js');
var Modal   = require('../../../base/modal.js');

var SourceImgUIModal = require('../../../modalBox/sourceImgUIModal/sourceImgUIModal.js')

var VocabularyUI = BaseComponet.extend({
    name : "VocabularyUI",     
	template:template,   
	service: Service,
	config:function(data){  
		_.extend(this.data,{
			interactInfo : this.data.interactInfo || {},
			options:(this.data.interactInfo || {}).options || [],
			classID:this.data.classID,
			interID:(this.data.interactInfo || {}).interID || 0	
		},true)
		// this.$watch("interactInfo",function(){
		// 	this.$update();
		// }.bind(this));
		// this.$on("createok" , function(){
		// 	console.log(123);
		// });
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
    } ,
    init:function(){

    	//整理一下选项
    	var options = this.data.options;
    	for (var i = 0; i < options.length; i++) {

    		if(options[i].item_cont.image.proTag!=null){
				options[i].item_cont.souceImg = "http://teacher.xcase.com.cn/commres/"+options[i].item_cont.image.proTag+"/images/"+ options[i].item_cont.image.id+".png";
    		}
		}
	    this.$update();

	    //获取返回值
    	this.$on('getImageResult',function(_data){
    		var options = this.data.options;
    		for (var i = 0; i < options.length; i++) {
	    		if(options[i].optionID == _data.optionID ){
	    			options[i].item_cont.souceImg = "http://teacher.xcase.com.cn/commres/"+_data.source+"/images/"+ _data.id+".png";
	    			options[i].item_cont.image.proTag = _data.source;//数据源
	    			options[i].item_cont.image.id     = _data.id;
	    			this.$update();
	    		}
    		}
    	}.bind(this));
    },
    playSound:function(optionID){
    	var options = this.data.options;
    	for (var i = 0; i < options.length; i++) {
	    	if(options[i].optionID == optionID ){
	    		if(!options[i].item_cont.sound.proTag)
	    			return;
    			var audio = new Audio('http://teacher.xcase.com.cn/commres/'+options[i].item_cont.sound.proTag+'/sounds/'+options[i].item_cont.sound.id+'.mp3');
    			audio.play();
			}
    	}
    },
    clearImg:function(optionID){
    	var options = this.data.options;
    	for (var i = 0; i < options.length; i++) {
    		if(options[i].optionID == optionID ){
    			options[i].item_cont.souceImg ="";
    			options[i].item_cont.image ={};//置空
    			this.$update();
    		}
		}
    },
    getImage:function($event,words,optionID){
     	if(words==''||words==null){
     		//不让搜索
     		return;
     	}
    	if(optionID == localStorage.getItem('optionID')){
    	   //如果这个id存在
    		if(document.getElementById('u-Imgmodal')){
	    		document.getElementById('u-Imgmodal').remove();
	    	}else{
	    		new SourceImgUIModal({
			        data:{
			            searchResValue:words,
			            sourceTarget:$event.target,
			            parent:this
			        }
			    })
	    	}

    	}else{
    		localStorage.setItem('optionID',optionID);
	    	if(document.getElementById('u-Imgmodal')){
	    		document.getElementById('u-Imgmodal').remove();
	    	}
			new SourceImgUIModal({
		        data:{
		            searchResValue:words,
		            sourceTarget:$event.target,
		            parent:this
		        }
		    })
	    	
    	}
	},
	enInputBlur:function($event , _word , _optionID){
		//{"code":"10000","msg":"succ","data":{"resInfo":{"id":"4","en":"cat","zh":"\u732b","imageProTags":["default","pro1","pro2"],"soundProTags":[]}}}
        if(!_word){
            return;//字符为空,不处理
        }
        var params  ={
            'words':_word
        }

        this.service.searchRes(params,function (data,result) {
            var options = this.data.options || [];

            for(var i=0 , _len = options.length; i<_len ;i++){
            	if(options[i].optionID === _optionID){
            		options[i].item_cont.zh = data.resInfo.zh;
            		options[i].item_cont.sound.proTag = (data.resInfo.soundProTags||[])[0] || null;
            		options[i].item_cont.sound.id = data.resInfo.id || null;
            		options[i].item_cont.id = data.resInfo.id;
            		this.$update();
            	}
            }
        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
	},
	addItem:function(){
		var _accessToken = _.getCookie('CT_accessToken');
		//var item_cont={"id":4,"en":"cat","zh":"\\u732b","proTag":"default"};
		var params = {
			accessToken:_accessToken,
			type:1,
			interID:this.data.interID,
			item_cont:{}
		};

		this.service.operInteractOption(params,function(data,result){
			// Notify.success(result.msg ||"保存成功");
			this.data.options.push(data);
			this.$update();
		}.bind(this),function(data,result){
			Notify.error(result.msg);
		}.bind(this))

	},	
	delItem:function(_index,_optionID){
		//
		if(this.data.options.length < 3){
			Notify.error("互动环节题目不得少于两个");
			return;
		}
		//弹出确认框
		var confirmModalUI = new Modal.confirm("确认要删除该题目吗？", "删除题目", "确认", '取消',1,"m-oper-inter");
        confirmModalUI.$on('ok',function () {
        	//确认回调
			var _accessToken = _.getCookie('CT_accessToken');
			var params = {
				accessToken:_accessToken,
				type:2,
				optionID:_optionID
			};

			this.service.operInteractOption(params,function(data,result){
				// Notify.success(result.msg ||"删除成功");
				this.data.options.splice(_index , 1);
				this.$update();
			}.bind(this),function(data,result){
				Notify.error(result.msg);
			}.bind(this))
        	
        }.bind(this))
	},
	delInter:function(){
		//输入：accessToken、type(1 新增 、2 删除) 、interID(删除传 互动环节自增ID)、classID(课堂ID 新增传)
		
		//弹出确认框
		var confirmModalUI = new Modal.confirm("确认要删除该互动环节？", "删除互动环节", "确认", '取消',1,"m-oper-inter");
        confirmModalUI.$on('ok',function () {
			var _accessToken = _.getCookie('CT_accessToken');
			var params = {
				accessToken:_accessToken,
				type:2,
				interID:this.data.interID
			};

			this.service.operInteract(params,function(data,result){
				//Notify.success(result.msg ||"删除成功");
				this.destroy();
			}.bind(this),function(data,result){
				Notify.error(result.msg);
			}.bind(this))
		}.bind(this))
	}
});

module.exports = VocabularyUI;