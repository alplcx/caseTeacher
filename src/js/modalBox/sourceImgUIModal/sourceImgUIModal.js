

/**
 *
 * getImage:function($event,words){
        new SourceImgUIModal({
            data:{
                searchResValue:words,
                sourceTarget:$event.target
            }
        })
    },
 */

window.$ = window.jQuery = require('./../../lib/jquery-min.js');

require('../../lib/jquery.SuperSlide.2.1.1.js');

var Modal    = require('../../base/r-modal.js');
var template = require('./sourceImgUIModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var Notify   = require('../../base/notify.js');

var SourceImgUIModal = Modal.extend({
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
            current:1,
            currentIndex:-1 //默认当前
        },true);
        this.supr();
    },
    init:function(){
        this.supr();
        if(this.data.searchResValue!=''||this.data.searchResValue!=null){
            this.__searchRes();
        }
    },

    inputChange:function(){
        this.$refs.searchResValue.style.border = "1px solid #e1e8ed";
    },

    update:function () {
        this.$update();
    },

    choose:function(souceId,tpl,e){
        var params = {
            optionID : localStorage.getItem('optionID'),
            id:souceId,//图片id
            source:tpl //图片机构
        }
        this.destroy();
        this.data.parent.$emit('getImageResult',params);
    },
    
    __searchRes:function () {
        
        var keywords = this.data.searchResValue;
        if(keywords.length<1){
            this.$refs.searchResValue.setAttribute('placeholder',"请输入文本");
            this.$refs.searchResValue.style.border = "1px solid #f00";
            return;//字符为空 不参与搜索
        }
        var params  ={
            'words':keywords
        }

        this.service.searchRes(params,function (data,result) {
            this.data.souceId = data.resInfo.id;
            this.data.sourceImgList = data.resInfo.imageProTags||[];
            this.update();
             //只有模板个数大于3的情况才进行幻灯效果
            if(this.data.sourceImgList.length>2){
                jQuery(".slideTxtBox").slide({
                    titCell:".hd ul",
                    mainCell:".bd ul",
                    autoPage:true,
                    effect:"left",
                    pnLoop:true,
                    autoPlay:false,
                    vis:3
                });
            }
        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
    }
});
module.exports = SourceImgUIModal;
