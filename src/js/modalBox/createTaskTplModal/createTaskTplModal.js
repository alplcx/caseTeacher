window.$ = window.jQuery = require('./../../lib/jquery-min.js');

require('../../lib/jquery.SuperSlide.2.1.1.js');

var Modal    = require('../../base/modal.js');
var template = require('./createTaskTplModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');
var Notify =  require('../../base/notify.js');

var CreateTaskTplModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 960, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '互动环节模板选择-英语',
            'class': '', //弹窗类
            okValue:"下一步",
            cancelValue:'取消'
        },true);
        this.supr();
        this.$on('ok',function () {
            if(this.data.type==null||this.data.type===''){
                Notify.warning('请选择一个模板');
            }else{
                var params = {
                    id :this.data.type,//模板类型
                    classID:this.data.classID
                }
                if(typeof this.data.success == 'function'){
                    this.destroy();
                    this.data.success(params);
                }
                //console.log(params);  //這是一個對象，拋個創建互動環節。
                //this.opTask(params);

            }
        }.bind(this))
    },
    init:function(){
        
        this.getTaskTplList();
        this.supr();
    },
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');
    },
    /*close: function() {
        
        this.$emit('close');
        this.destroy();
    },*/

   /* opTask:function (params) {
        this.service.opTask(params,function (data,result) {
            this.destroy();
            location.href = 'question.html?taskID='+data.taskID+'&type=2';
        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
    },*/

    //选择当前点击模板
    choose:function (type,$event) {
        var item = document.getElementsByClassName('tplItem')
        for (var i = 0; i < item.length; i++) { //这个要考虑一下 
            item[i].style.border = '1px solid #ccc';
        }
        var target = $event.target;
        target.style.border = "1px solid #00b8f3";
        var gifUrl = target.getAttribute('data-src');
        target.setAttribute('src',gifUrl);
        this.data.type =  type;
        this.$update();
    },

    //获取课程模板
    getTaskTplList:function () {
        this.service.getTaskTpl({classID:this.data.classID},function (data,result) {
            this.data.taskTplList =  result.data.templates;
            this.$update();

            //只有模板个数大于3的情况才进行幻灯效果
            if(result.data.templates.length>2){
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
module.exports = CreateTaskTplModal;
