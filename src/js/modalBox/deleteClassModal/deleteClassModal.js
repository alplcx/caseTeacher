
var Modal    = require('../../base/modal.js');
var template = require('./deleteClassModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var Notify   = require('../../base/notify.js');

var DeleteClassModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        this.supr();
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 600, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '删除课堂',
            'class': '', //弹窗类
            okValue:"确定",
            cancelValue:'取消',
            flag:1//两个按钮都显示，默认为0 
        },true);
        this.$on('ok',function () {
            this.opCourse(this.data.params)
        }.bind(this))
    },
    init:function(){
        this.supr();
    },
    opCourse:function (params) {
        this.service.opCourse(params,function (data,result) {
            if(result.code == 10000){
                //操作成功
                this.data.parent.close();
            }
        }.bind(this),function(data,result){
            //操作失败
            Notify.error(result.msg);
        }.bind(this))
    }
});
module.exports = DeleteClassModal;
