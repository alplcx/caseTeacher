
var Modal    = require('../../base/modal.js');
var template = require('./deleteTaskModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var Notify   = require('../../base/notify.js');

var CreateCourseModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '删除本题',
            class: '', //弹窗类
            okValue:"确认",
            cancelValue:'取消',
            flag:1//两个按钮都显示，默认为0 
        },true);
        this.supr();
        this.$on('ok',function () {
            this.opTask(this.data.params);
        })
    },
    init:function(){
        this.supr();
    },
    opTask:function (params) {
        this.service.opTask(params,function (data,result) {
            if(result.code == 10000){
                //操作成功
                this.data.parent.close();
            }
        }.bind(this),function(data,result){
            Notify.error(result.msg);
            //操作失败
        }.bind(this))
    }
});
module.exports = CreateCourseModal;
