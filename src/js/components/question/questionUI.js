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
		// _.extend(this.data, {
  //       });
        this.data.taskDetail = {};
 	}, 
	init:function () { 
		this.supr();
		this.service.opTask({type:2},function (data,result) {
			if(result.code ==10000){
				this.data.taskDetail = result.data;
			}
			this.$update();
		}.bind(this),function () {
			
		}.bind(this));
	},
	enter:function(){
		
	}	
});

module.exports = questionUI;

