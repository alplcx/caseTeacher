window.$ = window.jQuery = require('jquery');
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./login.html');
var _            = require('../../common/util.js');
var Cookie       = require('../../../node_modules/js-cookie/src/js.cookie.js');
var _md5          = require('../../common/md5.js');

var Login = BaseComponet.extend({ 
    name : "login",
	service :cacheService, 
	template:template,
	config:function(data){
		 _.extend(this.data, {
            jobId: '0'
        });
  		this.data.name = "";
  		this.data.password = "";
		this.data.phoneerror="";
		this.data.pwderror="";
		console.log(_.getCookie("CT_accessToken"));
		//console.log(_.getCookie("__utma"));
 	}, 
	init:function () {

	},
	enter:function(){
		
	},
	phonefocus:function() {
		this.data.phoneerror = "";
	},
	pwdfocus:function(){
		this.data.pwderror = "";
	},
	enter :function () {
		alert('enter')	
	},
	submit:function(){
		var _name = this.$refs.uninput.value || '';
		var _pwd = this.$refs.pwinput.value || '';
		var _md5pwd = _md5.hex_md5(_pwd.trim());
		// var _form = this.$refs.loginform;
		if(!_name){
			this.data.phoneerror = "手机号不能为空";
			this.$update();
			return;
		}else if(!_pwd){
			this.data.pwderror = "密码不能为空";
			this.$update();
			return;
		}
        $.ajax({  
            type: "get",  
            async: false,  
            url: "http://teacher.xcase.com.cn/Api/Login?phone="+_name +"&pwd=" + _md5pwd,  
            dataType: "jsonp",  
            jsonp: "callback",
            jsonpCallback: "receive",  
            success: function (data) {  
            	var _code = data.code;
                if(_code == 10000){
                	Cookie.set('CT_accessToken', data.data.accessToken,{ expires: 1000000 });
                	Cookie.set('CT_username', data.data.userName,{ expires: 1000000 });
                	Cookie.set('CT_userID', data.data.userID,{ expires: 1000000 });
                	window.location.href = "http://teacher.xcase.com.cn/index.html";
                }else if(_code == 20000){
                	this.data.phoneerror = data.msg;
                }else if(_code == 20001){
                	this.data.pwderror = data.msg;
                }
                this.$update();
            }.bind(this),  
            error: function () {  
                alert('fail');  
            }  
        });  

		// _form.pwd.value = _md5pwd;
		// _form.submit();
	}
});

module.exports = Login;

