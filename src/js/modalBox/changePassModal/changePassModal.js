
var Modal    = require('../../base/modal.js');
var template = require('./changePassModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');


var Notify   = require('../../base/notify.js');

var ChangePassModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '修改密码',
            'class': '', //弹窗类
            okValue:"确定",
            cancelValue:'取消',
            flag:0 ,  // 表示存在取消按钮 
            oldPwderror:"",
		    newPwd1error:"",
		    newPwd2error:''
        },true);
        this.supr();
        this.$on('ok',function () {
            this.modifyPass();
        }.bind(this))
    },
    init:function(){
        this.supr();
        //this.watchAll();
    },

    ok: function() {
        this.$emit('ok');
    },

    oldfocus:function() {
		this.data.oldPwderror = "";
		this.$update()
	},

	newPwd1focus:function(){
		this.data.newPwd1error = "";
		this.$update()
	},

	newPwd2focus:function(){
		this.data.newPwd2error = "";
		this.$update()
	},

    validatiton:function () {
        var error = this.data.error = {
            success :true
        }

        if(this.data.oldPwd == undefined || this.data.oldPwd ==''){
        	this.data.oldPwderror = "原密码不为空";
            error.success = false;
            return;
        }

        if(this.data.newPwd1 == undefined || this.data.newPwd1 ==''){
        	this.data.newPwd1error = "新密码不为空";
            error.success = false;
            return;
        }

        if(this.data.newPwd2 == undefined || this.data.newPwd2 ==''){
        	this.data.newPwd2error = "新密码不为空";
            error.success = false;
            return;
        }

        if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(this.data.oldPwd)){
        	error.success = false;
        	this.data.oldPwderror = "密码格式不对";
        	return;
        }

        if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(this.data.newPwd1)){
        	 error.success = false;
        	this.data.newPwd1error = "密码格式不对";
        	return;
        }

        if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(this.data.newPwd2)){
        	 error.success = false;
        	this.data.newPwd2error = "密码格式不对";
        	return;
        }
        if(this.data.newPwd1 != this.data.newPwd2){
        	error.success = false;
        	this.data.newPwd2error = "两次输入的密码不一致";
        	return;
        }
        this.$update();
    },

    modifyPass:function(){
    	this.validatiton();
    	if(this.data.error.success ==false ){
    		return;
    	}

		var params = {
			type : 1,
			oldPwd :this.data.oldPwd,
			newPwd:this.data.newPwd1
		}
		this.service.modifyUser(params,function (data,result) {
			this.destroy();
			Notify.success('操作成功！3秒后自动跳转到首页！');
			setTimeout(function () {
				window.location.href = "index.html"
			}, 3000);
		}.bind(this),function (data,result) {
			Notify.error(result.msg)
		}.bind(this))	
	}

});
module.exports = ChangePassModal;
