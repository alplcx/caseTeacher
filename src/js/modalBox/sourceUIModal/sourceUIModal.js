
var Modal    = require('../../base/r-modal.js');
var template = require('./sourceUIModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var CreateCourseModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '选择模板',
            'class': '', //弹窗类
            flag:1//两个按钮都显示，默认为0 
        },true);
        this.supr();
        this.$on('ok',function () {
            
        })
    },
    init:function(){
        this.supr();
    }
});
module.exports = CreateCourseModal;
