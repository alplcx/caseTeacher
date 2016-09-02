window.$ = window.jQuery = require('jquery');
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./register.html');
var _            = require('../../common/util.js');
var Notify =  require('./../../base/notify.js');
var Cookie       = require('../../../node_modules/js-cookie/src/js.cookie.js');
var _md5          = require('../../common/md5.js');

var register = BaseComponet.extend({ 
    name : "register", 
	service :cacheService, 
	template:template,
	config:function(data){
		 _.extend(this.data, {
            jobId: '0'
        });
		window.accessToken = "NTZfNTNlZDY2ZWEwZmYwYmU1ZWI3OTMwNTY4ZTEzNGYyZjBfMTQ3MjU0MjYxOA==";
  		this.data.curState = "create";

		this.data.phoneerror="";
		this.data.vcerror="";
		this.data.unerror="";
		this.data.pwderror="";
		this.data.repwderror="";
		this.data.orgNameError="";

		this.data.leftTime = 10;
		this.data.hasGotCode=false;
		this.data.createInfo = {
			type : 1,
			phone :0,
			userName :"",
			passWord :"",
			rePassWord:"",
			orgName:"",
			proID:0,
			cityID:0,
			areaID:0
		};
 	}, 
	init:function () {

	},
	enter:function(){
		
	},
	phoneFocus:function() {
		this.data.phoneerror = "";
	},
	verifyCodeFocus:function(){
		this.data.vcerror = "";
	},	
	unFocus:function(){
		this.data.unerror = "";
	},	
	pwdFocus:function(){
		this.data.pwderror = "";
	},	
	repwdFocus:function(){
		this.data.repwderror = "";
	},	
	orgNameFocus:function(){
		this.data.orgNameError = "";
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
	initLeftTimeInterval:function(){
		this.data.leftTimeInerval = setInterval(function(){
			if(this.data.leftTime > 0){
				this.data.leftTime -- ;
			}else{
				this.data.leftTime = 10;
				this.data.hasGotCode = false;
				clearInterval(this.data.leftTimeInerval);
			}
			this.$update();
		}.bind(this),1000)
	},
	getCode:function(){
		var _phone = this.$refs.phoneinput.value || '';
		var _vc = this.$refs.vcinput.value || '';
		if(!this.verifyPhone(_phone	)) return;
		this.initLeftTimeInterval();
        $.ajax({  
            type: "get",
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/sendVcode?phone="+_phone +"&type=1",  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {  
            	var _code = data.code;
                this.data.hasGotCode = true;
                if(_code == 10000){
                }else if(_code == 20010 || _code == 20007){
                	this.data.phoneerror = data.msg;
                }
                this.$update();
            }.bind(this),  
            error: function () {  
                alert('fail');  
            }  
        });
	},
	registerSubmit:function(){
		var _phone = this.$refs.phoneinput.value || '';
		var _vc = this.$refs.vcinput.value || '';
//		var _md5pwd = _md5.hex_md5(_pwd.trim());
		if(!this.verifyPhone(_phone)) return;
		if(!_vc){
			this.data.vcerror = "验证码不能为空";
			this.$update();
			return;
		}
        $.ajax({  
            type: "get",
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/checkVcode?phone="+_phone +"&vcode=" + _vc,  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {  
            	var _code = data.code;
                if(_code == 10000){
                	this.data.curState = "create";
                }else if(_code == 20007){
                	this.data.phoneerror = data.msg;
                }else if(_code == 20009){
					this.data.vcerror = data.msg;
                }
                this.data.curState = "create";
                this.$update();
            }.bind(this),  
            error: function () {  
                alert('fail');  
            }  
        });  
	},
	verifyCreateData:function(){
		var _un = this.$refs.uninput.value || '';
		var _pwd = this.$refs.pwdinput.value || '';
		var _repwd = this.$refs.repwdinput.value || '';
		var _orgName = this.$refs.orgNameinput.value || '';
		if(!_un){
			this.data.unerror = "用户名不能为空";
			return false;
		}		
		if(_un.length > 16){
			this.data.unerror = "用户名不能超过16字符";
			return false;
		}
		if(!_pwd){
			this.data.pwderror = "密码不能为空";
			return false;
		}			
		if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(_pwd)){
			this.data.pwderror = "密码长度不满足6-20位之间";
			return false;
		}	
		if(!_repwd){
			this.data.repwderror = "重复密码不能为空";
			return false;
		}		
		if(_pwd !==_repwd){
			this.data.repwderror = "两次输入的密码不一致";
			return false;
		}	
		if(!_orgName){
			this.data.orgNameError = "用户名不能为空";
			return false;
		}		
		if(_orgName.length > 20){
			this.data.orgNameError = "机构名不能超过20个字符";
			return false;
		}

		return true;
	},
	createSubmit:function(){
		var _un = this.$refs.uninput.value || '';
		var _pwd = this.$refs.pwdinput.value || '';
		var _repwd = this.$refs.repwdinput.value || '';
		var _orgName = this.$refs.orgNameinput.value || '';
		if(!this.verifyCreateData()) return 
	}
});


module.exports = register;

