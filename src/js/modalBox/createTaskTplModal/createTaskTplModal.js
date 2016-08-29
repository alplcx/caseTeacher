
var Modal    = require('../../base/modal.js');
var template = require('./createTaskTplModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

//加载perfect-scrollbar
var PS = require('perfect-scrollbar');
var Notify =  require('../../base/notify.js');

var CreateCourseModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 960, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '选择模板',
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
                    taskType :this.data.type,//模板类型
                    type :1,//新增
                    classID:this.data.classID
                }
                this.opTask(params);
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

    opTask:function (params) {
        this.service.opTask(params,function (data,result) {
            this.destroy();
            location.href = 'question.html?taskID='+data.taskID+'&type=2';
        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
    },
    showGIF:function ($event) {
        var target = $event.target;
        var gifUrl = target.getAttribute('data-src');
        target.setAttribute('src',gifUrl);
    },

    //选择当前点击模板
    choose:function (type,$event) {
        var item = document.getElementsByClassName('tplItem')
        for (var i = 0; i < item.length; i++) { //这个要考虑一下 
            item[i].children[0].style.border = '1px solid #ccc';
        }
        var target = $event.target;
        target.style.border = "1px solid #00b8f3";
        this.data.type =  type;
        this.$update();
    },

    //获取课程模板
    getTaskTplList:function () {
        this.service.getTaskTpl(null,function (data,result) {
            this.data.taskTplList =  result.data.templates;
            this.$update();
            if(this.data.taskTplList.length>4){
                PS.initialize(this.$refs.scrollbar)
            }
        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
    }
});
module.exports = CreateCourseModal;
