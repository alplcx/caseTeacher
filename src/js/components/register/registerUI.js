window.$ = window.jQuery = require('jquery-min');  
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./registerUI.html');
var _            = require('../../common/util.js');
var Notify =  require('./../../base/notify.js');
var Cookie       = require('../../../node_modules/js-cookie/src/js.cookie.js');
var _md5          = require('../../common/md5.js');

var register = BaseComponet.extend({ 
    name : "register", 
	service :cacheService, 
	template:template,
	config:function(data){
  		this.data.curState = "register";

		this.data.phoneerror="";
		this.data.vcerror="";
		this.data.unerror="";
		this.data.pwderror="";
		this.data.repwderror="";
		this.data.orgNameError="";

		this.data.leftTime = 60;
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
		this.getAlist(1) ;//获取省份列表
		this.watchAll();
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
        this.data.hasGotCode = true;
		if(!!this.data.leftTimeInerval){
			clearInterval(this.data.leftTimeInerval);
		}
		this.$update();
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
	getCode:function(){
		var _phone = this.$refs.phoneinput.value || '';
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
                if(_code == 10000){

                }else if(_code == 20010){
                	this.data.phoneerror = data.msg;
                	this.data.hasGotCode = false;
					if(!!this.data.leftTimeInerval){
						clearInterval(this.data.leftTimeInerval);
					}
                }else if(_code == 20007){
					this.data.vcerror = data.msg;
					this.data.hasGotCode = false;
					if(!!this.data.leftTimeInerval){
						clearInterval(this.data.leftTimeInerval);
					}
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
		var _data = this.data;
		if(!_un){
			this.data.unerror = "用户名不能为空";
			return false;
		}		
		if(_un.length > 12){
			this.data.unerror = "用户名不能超过12字符";
			return false;
		}
		if(!_pwd){
			this.data.pwderror = "密码不能为空";
			return false;
		}			
		if(!/^[\x21-\x7E]{6,20}$/.test(_pwd)){
			this.data.pwderror = "密码长度不是6-20位字符数字";
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
		if(this.data.createInfo.type ==2){

			if(!_orgName){
				this.data.orgNameError = "用户名不能为空";
				return false;
			}		
			if(_orgName.length > 20){ 
				this.data.orgNameError = "机构名不能超过20个字符";
				return false;
			}
			if(!_data.proID || !_data.cityID || !_data.areaID){
				Notify.error("请选择省、市、区信息");
			}
		}	

		return true;
	},
	createSubmit:function(){
		var _phone = this.$refs.phoneinput.value || '';
		var _vc = this.$refs.vcinput.value || '';
		var _un = this.$refs.uninput.value || '';
		var _pwd = this.$refs.pwdinput.value || '';
		var _repwd = this.$refs.repwdinput.value || '';
		var _orgName = this.$refs.orgNameinput.value || '';

		if(!this.verifyCreateData()) return ;

		var _param = "type=" + this.data.createInfo.type + "&phone=" +_phone+
					"&userName=" + _un + "&passWord=" +  _md5.hex_md5(_pwd.trim())+
					"&rePassWord=" + _md5.hex_md5(_repwd) +"&orgName=" + _orgName +
					"&proID=" + this.data.proID + "&cityID=" + this.data.cityID + "&areaID=" + this.data.areaID;
		$.ajax({  
            type: "get",
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/register?" + _param,  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {  
            	var _code = data.code;
                this.data.hasGotCode = true;
                if(_code == 10000){
                	Cookie.set('CT_accessToken', data.data.accessToken,{ expires: 1000000 });
                	Cookie.set('CT_tel', data.data.tel,{ expires: 1000000 });
                	Cookie.set('CT_username', data.data.userName,{ expires: 1000000 });
                	Cookie.set('CT_userID', data.data.userID,{ expires: 1000000 });
                	Cookie.set('CT_userType', data.data.userType,{ expires: 1000000 });
                	window.location.href = "http://teacher.xcase.com.cn/index.html";
                }else if(_code == 20010 || _code == 20007 || _code == 20008){
                	Notify.error(data.msg);
                }
                this.$update();
            }.bind(this),  
            error: function () {  
                alert('fail');  
            }  
        });
	},

	//获取省份列表
	getAlist:function (rid) {
		var self = this,
			_data = self.data;
		self.service.getRegions({'rid':rid},function (data,result) {
			_data.aList = data.regions;
			self.$update();
		})
	},

	//监听
	watchAll:function () {
		var self =  this,
			_data = self.data;

		//监听省
		this.$watch('proID',function (nValue,oVaule) {
			if(nValue==''||nValue === null){
				_data.bList = [];
				_data.cList = [];
				_data.cityID ='';
				_data.areaID = "";
				self.$update();
			}else{
				self.service.getRegions({'rid':nValue},function (data,result) {
					_data.bList = data.regions;
					_data.cList = [];
					_data.areaID = "";
					self.$update();
				})
			}
		})

		//监听市
		this.$watch('cityID',function (nValue,oVaule) {
			if(nValue==''||nValue === null){
				_data.cList = [];
				_data.areaID = "";
				self.$update();
			}else{
				self.service.getRegions({'rid':nValue},function (data,result) {
					_data.cList = data.regions;
					self.$update();
				})
			}
		})

		//监听区
		this.$watch('areaID',function (nValue,oVaule) {
			
		})
	},
});


module.exports = register;

