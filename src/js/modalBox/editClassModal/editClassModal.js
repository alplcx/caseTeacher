
var Modal    = require('../../base/modal.js');
var template = require('./editClassModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var EditClassModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '编辑课堂信息',
            'class': '', //弹窗类
            okValue:"保存更改",
            cancelValue:'取消',
            disabled:1,//默认不可点击 0为默认值
            flag:1    // 表示存在取消按钮 
        },true);
        this.supr();
        this.$on('ok',function () {
            this.opCourse(this.data.params)
        }.bind(this))
    },
    init:function(){
        this.getSubjectList();
        this.watchAll();
        this.supr();
    },
    watchAll:function () {
        this.$watch('params.className',function (newValue,oldValue) {
            this.validatiton()
        }.bind(this)) ; 
        this.$watch('params.subject',function (newValue,oldValue) {
            this.validatiton()
        }.bind(this))  ;
        this.$watch('params.classDesc',function (newValue,oldValue) {
            this.validatiton()
        }.bind(this))  ;
    },
    validatiton:function () {
        var error = this.data.error = {
            success :true
        }

        if(this.data.params.className == undefined || this.data.params.className ==''){
            error.success = false;
        }
        if(this.data.params.subject == undefined || this.data.params.subject ==''){
            error.success = false;
        }
        if(this.data.params.classDesc == undefined || this.data.params.classDesc ==''){
            error.success = false;
        }
        if(error.success){
            this.data.disabled = 0;
        }else{
            this.data.disabled = 1;
        }
        this.$update();
    },
    getSubjectList:function () {
        this.service.getSubjectList(null,function (data,result) {
            this.data.subjectList =  data.subjects;
            this.$update();
        }.bind(this),function (data,result) {
            
        }.bind(this))
    },
    opCourse:function (params) {
        this.service.opCourse(params,function (data,result) {
            if(result.code == 10000){
                this.data.parent,close();
            }
        }.bind(this),function(data,result){
            //操作失败
        }.bind(this))
    }
});
module.exports = EditClassModal;
