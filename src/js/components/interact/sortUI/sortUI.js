
// 语言词汇学习集ui
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./sortUI.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');


var DeleteTaskModal =  require('../../../modalBox/deleteTaskModal/deleteTaskModal.js');
var SourceImgUIModal = require('../../../modalBox/sourceImgUIModal/sourceImgUIModal.js')

var SortUI = BaseComponet.extend({
    name : "SortUI",     
	template:template,   
	service: Service,
	config:function(data){  
		_.extend(this.data,{
			interactInfo : this.data.interactInfo || {},
			options:(this.data.interactInfo || {}).options||[],
			classID:this.data.classID,
			interID:(this.data.interactInfo || {}).interID||0
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
    		console.log(_data);
    	});
    },
    getImage:function($event,words){
		new SourceImgUIModal({
	        data:{
	            searchResValue:words,
	            sourceTarget:$event.target,
	            parent:this
	        }
	    })
	},
	addItem:function(){
		var _accessToken = _.getCookie('CT_accessToken');
		var params = {
			accessToken:_accessToken,
			type:1,
			interID:this.data.interID,
			item_cont:""
		};

		this.service.operInteractOption(params,function(data,result){
			this.data.options.push(data);
			this.$update();
		}.bind(this),function(data,result){
			Notify.error(result.msg);
		}.bind(this))

	},	
	delItem:function(_index,_optionID){
		var _accessToken = _.getCookie('CT_accessToken');
		var params = {
			accessToken:_accessToken,
			type:2,
			optionID:_optionID
		};

		this.service.operInteractOption(params,function(data,result){
			//Notify.success(result.msg ||"保存成功");
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
			optionID:this.data.interID
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

module.exports = SortUI;

