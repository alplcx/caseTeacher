
var Modal    = require('../../base/modal.js');
var template = require('./changePassConformModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var Notify   = require('../../base/notify.js');

var ChangePassConformModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '修改成功',
            'class': '', //弹窗类
            okValue:"知道了",
            cancelValue:'取消',
            flag:0 ,  // 表示存在取消按钮 
        },true);
        this.supr();
    },
    init:function(){
        this.supr();
    },
    close:function () {
        this.toIndex();
        this.destroy();
    },
    toIndex:function () {
        Notify.success('操作成功！3秒后自动跳转到登录页！');
        setTimeout(function () {
            window.location.href = "login.html"
        }, 3000);  
    }

});
module.exports = ChangePassConformModal;
