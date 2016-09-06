
var Modal    = require('../../../base/modal.js'); 
var template = require('./forgetPWDModalUI.html');
var ChangePassConformModal = require('./../../../modalBox/changePassModal/changePassConformModal.js');
var _        = require('../../../common/util.js');
var cacheService = require('../../../service.js');
var Cookies       = require('../../../../node_modules/js-cookie/src/js.cookie.js');
var Notify   = require('../../../base/notify.js');
var _md5          = require('../../../common/md5.js');


var ForgetPWDModalUI = Modal.extend({
    service : cacheService,
    config: function(data) {  
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 620, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '找回密码',
            'class': '', //弹窗类
            okValue:"确定",
            cancelValue:'取消',
            flag:0 ,  // 表示存在取消按钮 
            hasGotCode:false,
            phoneerror:"",
            leftTime:60,
            vcerror:"",
		    newPwd1error:"",
		    newPwd2error:''
        },true);
        this.supr();
        this.$on('ok',function () {
            this.findPWDSubmit();
        }.bind(this))
    },
    init:function(){
        this.supr();
    },

    ok: function() {
        this.$emit('ok');
    },
    phoneFocus:function(){
        this.data.phoneerror ="";
        this.$update();
    },
    verifyCodeFocus:function(){
        this.data.vcerror ="";
        this.$update();
    },
	newPwd1focus:function(){
		this.data.newPwd1error = "";
		this.$update()
	},

	newPwd2focus:function(){
		this.data.newPwd2error = "";
		this.$update()
	},
    initLeftTimeInterval:function(){
        this.data.leftTimeInerval = setInterval(function(){
            if(this.data.leftTime > 1){
                this.data.leftTime -- ;
            }else{
                this.data.leftTime = 60;
                this.data.hasGotCode = false;
                clearInterval(this.data.leftTimeInerval);
            }
            this.$update();
        }.bind(this),1000)
    },
    verifyPhone:function(_phone){
        if(!_phone){
            this.data.phoneerror = "手机号不能为空";
            this.$update();
            return false;
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(_phone))){
            this.data.phoneerror = "手机号格式不对";
            this.$update();
            return false;
        }
        return true;
    },
    validatiton:function () {
        var _vc = this.$refs.vcinput.value || '';
        var _phone = this.$refs.phoneinput.value || '';

        if(!this.verifyPhone(_phone)) return;
        if(!_vc){
            this.data.vcerror = "验证码不能为空";
            this.$update();
            return;
        }
        if(this.data.newPwd1 == undefined || this.data.newPwd1 ==''){
        	this.data.newPwd1error = "新密码不为空";
            return false;
        }

        if(!/^[\x21-\x7E]{6,20}$/.test(this.data.newPwd1)){
        	this.data.newPwd1error = "密码格式不对";
        	return false;
        }

        if(this.data.newPwd2 == undefined || this.data.newPwd2 ==''){
            this.data.newPwd2error = "重复密码不为空";
            return false;
        }

        if(this.data.newPwd1 != this.data.newPwd2){
        	this.data.newPwd2error = "两次输入的密码不一致";
        	return false;
        }
        return true;
    },
    getCode:function(){
        var _phone = this.$refs.phoneinput.value || '';
        if(!this.verifyPhone(_phone )) return;
        this.initLeftTimeInterval();
        $.ajax({  
            type: "get",
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/sendVcode?phone="+_phone +"&type=2",  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {  
                var _code = data.code;
                if(_code == 10000){
                    this.data.hasGotCode = true;
                }else{
                    Notify.error(data.msg);
                }
                this.$update();
            }.bind(this),  
            error: function () {  
                alert('fail');  
            }  
        });
    },
    findPWDSubmit:function(){
    	if(!this.validatiton()){
    		return;
    	}

        var _phone = this.$refs.phoneinput.value || '',
		    _vccode = this.$refs.vcinput.value || '',
            _newPwd1 = _md5.hex_md5(this.data.newPwd1.trim()),
            _newPwd2 = _md5.hex_md5(this.data.newPwd2.trim());

        $.ajax({  
            type: "get",
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/forgetPwd?phone="+_phone +"&code=" +_vccode +"&newPwd1=" + _newPwd1+"&newPwd2=" + _newPwd2,  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {  
                var _code = data.code;
                if(_code == 10000){
                    this.destroy();
                    new ChangePassConformModal();
                }else{
                    Notify.error(data.msg)
                }
                this.$update(); 
            }.bind(this),  
            error: function () {  
                alert('fail');  
            }  
        });
	}

});
module.exports = ForgetPWDModalUI;
