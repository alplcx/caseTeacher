
var Modal    = require('../../base/modal.js');
var template = require('./logOutModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');
var Cookies       = require('../../../node_modules/js-cookie/src/js.cookie.js');
var Notify   = require('../../base/notify.js');

var DeleteClassModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        this.supr();
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: true, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '退出登录',
            'class': '', //弹窗类
            okValue:"确定",
            cancelValue:'取消',
            flag:1//两个按钮都显示，默认为0 
        },true);
        this.$on('ok',function () {
            this.logOut()
        }.bind(this))
    },
    init:function(){
        this.supr();
    },
    logOut:function () {
        //退出
        this.service.logOut(null,function (data,result) {
            Cookies.remove('CT_accessToken');
            window.location.href = "login.html"
        }.bind(this),function (data,result) {
            Notify.error(result.msg)
        }.bind(this))   
    },

});
module.exports = DeleteClassModal;
