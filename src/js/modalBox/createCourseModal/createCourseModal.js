
var Modal    = require('../../base/modal.js');
var template = require('./createCourseModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var CreateCourseModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 600, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '提示',
            'class': '', //弹窗类
            okValue:"确定",
            cancelValue:'取消'
        },true);
        this.supr();
    },
    init:function(){
        this.supr();
    }
});
module.exports = CreateCourseModal;
