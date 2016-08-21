
// 课堂详情

var BaseComponet = require('../../common/component.js'); 
var template     = require('./classDetail.html');
var _            = require('../../common/util.js')

var ClassDetail = BaseComponet.extend({
    name : "classDetail",     
	template:template,   
	config:function(data){  
	   
	}, 
	init:function () {
		   
	},  
	enter:function(){
	  	
	}	 
});

module.exports = ClassDetail;

