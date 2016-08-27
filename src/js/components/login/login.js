var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./login.html');
var _           = require('../../common/util.js');
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
		  
 	}, 
	init:function () {
	},
	enter:function(){
		
	},
	submit:function(){
		var _name = this.$refs.uninput.value || '';
		var _pwd = this.$refs.pwinput.value || '';
		var _md5pwd = _md5.hex_md5(_pwd);
		var _form = this.$refs.loginform;

		_form.pwd.value = _md5pwd;
		_form.submit();
	}
});

module.exports = Login;

