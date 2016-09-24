
// 语言词汇学习集ui
var BaseComponet = require('../../../common/component.js'); 
var template     = require('./sortUI.html');
var _            = require('../../../common/util.js')
var Service      = require('../../../service.js');
var Notify   = require('../../../base/notify.js');
var Modal   = require('../../../base/modal.js');

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
		// this.$watch("interactInfo",function(){
		// 	this.$update();
		// }.bind(this));
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

    },
	onkeyUp:function(_cnt , _index){
    	var _elm = this.$refs["error" + _index];
    	var reg = /[\u4e00-\u9fa5\w]+/g;	
		var _arr = _cnt.match(reg) || [];
		var _isWord2Long = false;
		var _rightCnt = "";

		for(var i=0 , _len = _arr.length ; i<_len ; i++){
			if(_arr[i].length >10){
				_isWord2Long = true;
			}
		}

    	if(_arr.length > 4){
    		_elm.style.display = "block";
    		this.data.options[_index].item_cont = this.data.rightCnt;
    		_elm.innerHTML = "单词个数不能超过4个";
    		this.$update();
    	}else if(_isWord2Long){
    		_elm.style.display = "block";
    		this.data.options[_index].item_cont = this.data.rightCnt;
    		_elm.innerHTML = "每个单词不能超过10个字符";
    		this.$update();
    	}else{
    		this.data.rightCnt = _cnt;
    		_elm.style.display = "none";
    		_elm.innerHTML = "";
    	}
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
		if(this.data.options.length < 3){
			Notify.error("互动环节题目不得少于两个");
			return;
		}
		//弹出确认框
		var confirmModalUI = new Modal.confirm("确认要删除该题目吗？", "删除题目", "确认", '取消',1,"m-oper-inter");
        confirmModalUI.$on('ok',function () {
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
		}.bind(this));
	},
	delInter:function(){
		//输入：accessToken、type(1 新增 、2 删除) 、interID(删除传 互动环节自增ID)、classID(课堂ID 新增传)
		
		//弹出确认框
		var confirmModalUI = new Modal.confirm("确认要删除该互动环节吗？", "删除互动环节", "确认", '取消',1,"m-oper-inter");
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

module.exports = SortUI;

