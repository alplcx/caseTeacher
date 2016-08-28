var Modal    = require('../../base/r-modal.js');
var template = require('./sourceUIModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');
var PS = require('perfect-scrollbar');
var Notify   = require('../../base/notify.js');


var str1 = "请从下方选择发音并点击试听";
var str2 = "请在下方输入框中输入并搜索单词";
var str3 = "对不起，没有找到您想要的素材";
var addSound = "添加声音";
var imgSource = "图片素材库";
var host =  "http://teacher.xcase.com.cn/";

var CreateCourseModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '',
            'class': '', //弹窗类
            flag:1,//两个按钮都显示，默认为0 
            showSearchFlag:0,
            current:1
        },true);
        this.supr();

        this.$on('ok',function () {
            //将相关的值返回给用户
            if(this.data.chooseId==null || this.data.chooseId ==''){
                Notify.warning('请选择一个素材');
            }else{
                //调用父级方法
                this.data.parent.$emit('sourceCheck',this.data.type + '_'+ this.data.current + "_"+ this.data.chooseId);
                this.destroy();
            }

        })
    },
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');
    },

    init:function(){
        if(this.data.type){
            //如果是声音则选择
            this.data.title = imgSource;
        }else{
             this.data.title = addSound;
        }
        this.supr();
    	this.getNav(this.data.type); //获取导航
    	PS.initialize(this.$refs.sourceUIModal);//滚轮特效
    },

   	update:function () {
   		this.$update();
   	},


   	//获取导航列表
    getNav:function (type) {

    	this.service.getNav(type,function (data,result) {

    		this.data.navList = data.resCateList;
    		//默认取第一个
    		this.getCommonSourceList(type,data.resCateList[0].tID);//默认取第一个
    		this.update();
    	}.bind(this),function (data,result) {
    		Notify.error(result.msg);
    	}.bind(this))
    },	

    //获取公共素材
    getCommonSourceList:function (type,tID) {
    	this.data.current = tID;  //当前导航条
    	
    	var params = {
    		type:type,
    		tID :tID
    	}


        this.data.imgURL = null;//图片置空
        this.data.soundURL = null;//音频回滚
        //特殊情况处理
        if(type ==2 && tID == 1){
            this.data.soundList =[];
            this.data.searchStr = str2;
            this.data.showSearchFlag = 1;
            return;
        }else{
            this.data.searchStr = str1;
            this.data.showSearchFlag = 0;
        }
    	this.update();

    	this.service.getCommonSourceList(params,function (data,result) {
            this.data.chooseId = null;//置空
    		

            if(type == 1){
    			//图片列表
    			this.data.imgList = data.resList;
    		}else{
    			//声音列表
    			this.data.soundList = data.resList;
    		}
    		this.update();
    	}.bind(this),function (data,result) {
    		Notify.error(result.msg);
    	}.bind(this))
    },	

    //素材搜索
    searchRes:function (type,keywords) {
    	var params = {
    		type:type,
    		keywords :keywords
    	}
    	this.service.searchRes(params,function (data,result) {

    		if(type == 1){
    			//图片列表
    			this.data.imgList = data;
    		}else{
    			//声音列表
    			this.data.soundList = data;

    		}
    		this.update();
    	}.bind(this),function (data,result) {
    		Notify.error(result.msg);
    	}.bind(this))
    },	

    
    __searchRes:function () {
    	var keywords = this.data.searchResValue||'';

    	if(keywords.length<1){
    		this.$refs.searchResValue.setAttribute('placeholder',"输入文本");
    		return;//字符为空 不参与搜索
    	}

    	var params ={
    		type     :this.data.type,
    		keywords : keywords
    	}

		this.service.searchRes(params,function (data,result) {
			this.data.soundList = data.resInfo;
            if(data.resInfo.length == 0){
                this.data.searchStr = str3;
            }
			this.update();
		}.bind(this),function (data,result) {
			Notify.error(result.msg);
		}.bind(this))
    },

    /**
     * 预览声音
     * @param  {[type]} id        [description]
     * @param  {[type]} soundName [description]
     * @return {[type]}           [description]
     */
    __showSound:function(id,soundName) {
    	this.data.soundURL =  host+"/commres/sounds/"+this.data.type+"_"+this.data.current+"_"+id+".mp3";;
        this.data.soundName =soundName;
        this.$update();
    },

    /**
     * 播放声音
     * @return {[type]} [description]
     */
    __play:function () {
        this.$refs.sound.play();
    },

    /**
     * 预览图片
     * @param  {[type]} id        [description]
     * @param  {[type]} imageName [description]
     * @return {[type]}           [description]
     */
    __showImg:function(id,imageName) {
        this.data.chooseId =  id;
        this.data.imgURL   = host+"/commres/images/big/"+this.data.type+"_"+this.data.current+"_"+id+".png";
        this.data.imageName = imageName;
        this.$update();
    }
    
});
module.exports = CreateCourseModal;
