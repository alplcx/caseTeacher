var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./login.html');
var _            = require('../../common/util.js')

var Login = BaseComponet.extend({ 
    name : "login",
	service :cacheService, 
	template:template,
	config:function(data){
		 _.extend(this.data, {
            jobId: '0'
        });
  
		  
 	}, 
	init:function () {
		this.data.name = this.$refs.uninput.value || '';
		this.data.name = this.$refs.pwinput.value || '';
	},
	enter:function(){
		
	}	
});

module.exports = Login;

