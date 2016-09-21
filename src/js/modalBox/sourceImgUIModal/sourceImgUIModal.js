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

    

    update:function () {
        this.$update();
    },

    
    __searchRes:function () {
        var keywords = this.data.searchResValue;
        if(keywords.length<1){
            this.$refs.searchResValue.setAttribute('placeholder',"输入文本");
            return;//字符为空 不参与搜索
        }
        var params  ={
            'words':keywords
        }

        this.service.searchRes(params,function (data,result) {
            debugger;
            this.data.souceId = data.resInfo.id;
            this.data.sourceImgList = data.resInfo.imageProTags;
            this.update();
             //只有模板个数大于3的情况才进行幻灯效果
            if(data.resInfo.imageProTags.length>2){
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
