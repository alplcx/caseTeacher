
// 课堂详情

var BaseComponet = require('../../../common/component.js'); 
var template     = require('./courseDetail.html');
var _            = require('../../../common/util.js')

var CourseDetailUI = BaseComponet.extend({
    name : "courseDetail",     
	template:template,   
	config:function(data){  
	  
	}, 
	init:function () {
		      
	},  
	enter:function(){
	  	
	}	 
});

module.exports = CourseDetailUI;

