
var Modal    = require('../../base/modal.js');
var template = require('./createCourseModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');

var CreateCourseModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '创建课堂',
            'class': '', //弹窗类
            okValue:"下一步",
            cancelValue:'取消',
            disabled:1,//默认不可点击
            subjectList:[
                {'id':1,'subjectName':'英语'},
                {'id':2,'subjectName':'数学'},
                {'id':1,'subjectName':'日本语'}
            ]
        },true);
        this.supr();
        this.$on('ok',function () {
            var params = {
                type :'1',//创建课堂
                className:this.data.className,
                subject:  this.data.subjectId,//科目id
                classDesc:this.data.dsc
            }
            this.createClass(params);
        }.bind(this))
    },
    init:function(){
        this.getSubjectList();
        this.watchAll();
        this.supr();
    },
    watchAll:function () {
        this.$watch('className',function (newValue,oldValue) {
            this.validatiton()
        }.bind(this)) ; 
        this.$watch('subjectId',function (newValue,oldValue) {
            this.validatiton()
        }.bind(this))  ;
        this.$watch('dsc',function (newValue,oldValue) {
            this.validatiton()
        }.bind(this))  ;
    },
    validatiton:function () {
        var error = this.data.error = {
            success :true
        }

        if(this.data.className == undefined || this.data.className ==''){
            error.success = false;
        }
        if(this.data.subjectId == undefined || this.data.subjectId ==''){
            error.success = false;
        }
        if(this.data.dsc == undefined || this.data.dsc ==''){
            error.success = false;
        }
        if(error.success){
            this.data.disabled = 0;
        }else{
            this.data.disabled = 1;
        }
        this.$update();
    },
    createClass :function (params) {
        this.service.opCourse(params,function (data,result) {
            //创建课堂成功
            location.reload();
        }.bind(this),function (data,result) {
            
        }.bind(this))
    },
    getSubjectList:function () {
        this.service.getSubjectList(null,function (data,result) {
            this.data.subjectList =  data.subjects;
            this.$update();
        }.bind(this),function (data,result) {
            
        }.bind(this))
    }
});
module.exports = CreateCourseModal;
