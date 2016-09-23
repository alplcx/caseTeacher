// 语言词汇学习集ui
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./vocabularyUI.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');


var DeleteTaskModal =  require('../../../modalBox/deleteTaskModal/deleteTaskModal.js');
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
		//todo
		if(this.data.options.length){

		}
		var _accessToken = _.getCookie('CT_accessToken');
		var params = {
			accessToken:_accessToken,
			type:2,
			optionID:_optionID
		};

		this.service.operInteractOption(params,function(data,result){
			// Notify.success(result.msg ||"保存成功");
			this.data.options.splice(_index , 1);
			this.$update();
		}.bind(this),function(data,result){
			Notify.error(result.msg);
		}.bind(this))

	},
	delInter:function(){
		//输入：accessToken、type(1 新增 、2 删除) 、interID(删除传 互动环节自增ID)、classID(课堂ID 新增传)
		
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
	},
	/**
	 * 操作课程
	 * @param  {[type]} id   [description]
	 * @param  {[type]} type 操作类型
	 * @return {[type]}      [description]
	 */
	__opTodo:function (taskID,type) {
		var params = {
			taskID: taskID,
			type:type,
		}
		if(type == 2){
			//编辑课程	
			location.href = 'question.html?taskID='+taskID+"&type="+type;
		}else if(type ==3 ){
			//删除课程
			new DeleteTaskModal({
				data:{
					params:params,
					parent:this //将父节点传入
				}
			});
		}
	}
});

module.exports = VocabularyUI;