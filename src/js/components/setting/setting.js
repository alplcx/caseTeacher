
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./setting.html');
var _            = require('../../common/util.js');
var Cookie       = require('../../../node_modules/js-cookie/src/js.cookie.js');

var Notify       = require('../../base/notify.js');
var LogOutModal =  require('../../modalBox/logOutModal/logOutModal.js');
var ChangePassModal =  require('../../modalBox/changePassModal/changePassModal.js');


var Setting = BaseComponet.extend({ 
    name : "setting",
	service :cacheService, 
	template:template,
	config:function(data){
		_.extend(this.data,{
			userName : _.getCookie('CT_username'),
			tel      : _.getCookie('CT_tel'),
			userType : _.getCookie('CT_userType')
		},true);
 	}, 
	init:function () {

	},
	userNamefocus:function($event) {
		var target =  $event.target;
		target.style.border = "1px solid #00b8f3 ";
	},

	userNameBlur:function($event) {
		var target =  $event.target;
		target.style.border = "1px solid #e1e8ed ";
		
	},
	logOut:function () {
		//退出
		new LogOutModal();
	},

	//修改密码
	changePass:function ($event) {
		$event.preventDefault();
		new ChangePassModal();
	},

	//修改用户名
	modifyUser:function(){
		var params = {
			type : 2,
			userName :this.data.userName
		}
		this.service.modifyUser(params,function (data,result) {
			Notify.success('操作成功！3秒后自动跳转到首页！');
			Cookie.set('CT_username',params.userName);
			setTimeout(function () {
				window.location.href = "index.html"
			}, 3000);
		}.bind(this),function (data,result) {
			Notify.error(result.msg)
		}.bind(this))	
	}
});

module.exports = Setting;

