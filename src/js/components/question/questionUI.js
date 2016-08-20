// 题目页面整体UI
var BaseComponet = require('../../common/component.js');
var cacheService = require('../../service.js');
var template     = require('./questionUI.html');
var _            = require('../../common/util.js')

var questionUI = BaseComponet.extend({ 
    name : "questionUI",
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

module.exports = questionUI;

