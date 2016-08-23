
var Modal    = require('../../base/modal.js');
var template = require('./createTaskTplModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

//加载perfect-scrollbar
var PS = require('perfect-scrollbar');

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
            alert('d');
        })
    },
    init:function(){
        this.getTaskTplList();
        this.supr();
        PS.initialize(this.$refs.scrollbar)
    },
    close: function() {
        /**
         * @event close 确定对话框时触发
         */
        this.$emit('close');
        this.destroy();
    },

    //获取课程模板
    getTaskTplList:function () {
        this.service.getTaskTpl(null,function (data,result) {
            this.data.taskTplList =  result.data;
            this.$update();
        }.bind(this),function (data,result) {
            
        }.bind(this))
    }
});
module.exports = CreateCourseModal;
