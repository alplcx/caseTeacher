
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
            location.href = 'question.html?tpl='+this.data.type+'&type=2';
        })
    },
    init:function(){
        
        this.getTaskTplList();
        this.supr();
    },
    /*close: function() {
        
        this.$emit('close');
        this.destroy();
    },*/

    showGIF:function ($event) {
        var target = $event.target;
        var gifUrl = target.getAttribute('data-src');
        target.setAttribute('src',gifUrl);
    },

    //选择当前点击模板
    choose:function (type,$event) {
        var item = document.getElementsByClassName('item')
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
