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
	},
	enter:function(){
		
	}	
});

module.exports = Login;
