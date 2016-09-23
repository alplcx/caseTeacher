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
    	this.$on('getImageResult',function(_data){
    		alert('d')
    		console.log(_data);
    	});
    },
    getImage:function($event,words,id){
     	if(words==''||words==null){
     		//不让搜索
     		return;
     	}
    	if(id == localStorage.getItem('souceId')){
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
    		localStorage.setItem('souceId',id);
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

            for(var i=0 , _len = _options.length; i<_len ;i++){
            	if(options[i].optionID === _optionID){
            		options[i].zh = data.resInfo.zh;
            		options[i].item_cont.sound.proTag = (data.resInfo.soundProTags||[])[0];
            		options[i].item_cont.sound.id = data.resInfo.id;
            		this.update();
            	}
            }
        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
	},
	addItem:function(){
		var _accessToken = _.getCookie('CT_accessToken');
		var item_cont={"id":4,"en":"cat","zh":"\\u732b","proTag":"default"};
		var params = {
			accessToken:_accessToken,
			type:1,
			interID:this.data.interID,
			item_cont:item_cont
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