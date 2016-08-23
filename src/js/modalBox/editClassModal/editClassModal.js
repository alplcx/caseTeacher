
var Modal    = require('../../base/modal.js');
var template = require('./editClassModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

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
            console.log(this.data)
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
            }
        }.bind(this),function(data,result){
            //操作失败
        }.bind(this))
    }
});
module.exports = CreateCourseModal;
