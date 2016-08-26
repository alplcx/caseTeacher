var getParams = function (url) {
	var reg = /(\w+)=([^&]+)/g,
		params = {},
		result = [];

	url = (url.split('?')[1] || '');

	while(result = reg.exec(url)) {
		params[result[1]] = result[2];
	}

	return params;
};

var extend = function (o1, o2) {
	for (var key in o2) {
		if (o2.hasOwnProperty(key) && o2[key] !== void 0) {
			o1[key] = o2[key];
		}
	}
};

module.exports = {

	//登录
	//input parmas{phone : 15000000000,pwd}
	"POST /Api/Login": function(req, res, next) {
		res.send({
			"code": "10000",
			"data": {
				'token':'121214432343243'
			},
			"msg": ""
		})
	}

	//获取课堂列表
	,"GET /Api/classList": function(req, res, next) {
		var classList = [];
		for (var i = 0; i < 5; i++) {
			classList.push({
				subject:i,
				classID:i,
				creator:'zhangzhang'+i,
				createTime:'2016-12-12',
				taskNum:12,
				className:'小學課程'+i,
				minNum:Math.floor(Math.random()*5),
				maxNum:Math.floor(Math.random()*20)
			});
		}
		res.send({
			"code": "10000",
			"data": classList,
			"msg": ""
		})
	}


	//新增、修改、删除课堂
	,"POST /Api/operClass": function(req, res, next) {
		var params = getParams(req.url);
		var type   = params.type;
		var classList = [];
		if(type == 1){
			//新增
			classList.push({
				subject:'音乐朗读'+i,
				classID:i,
				creator:'zhangzhang'+i,
				createTime:'2016-12-12',
				taskNum:12,
				minNum:Math.floor(Math.random()*5),
				maxNum:Math.floor(Math.random()*20)
			})
		}else if(type ==2){
			//编辑
		}else{
			//删除
		}
		res.send({
			"code": "10000",
			"data": classList,
			"msg": ""
		})
	}
 
	//新增、修改、删除 课程
	,"GET /Api/operTask": function(req, res, next) {
		var params = getParams(req.url);
		var type   = params.type;
		var taskResult = {};
		if(type == 1){
			//新增
		}else if(type ==2){ 
			//编辑
			//type(1 新增 、2 修改、 3 删除)、 classID(新增传)、taskID（修改、删除传）、blockNum(小块数量)、
			//taskType( 1 看图片猜单词 、2 图片关联单词 、3 智能排序 、4 听声音猜图片)、taskName(课程名称)、
			//taskImage(题目图片 taskType 为1传 值为图片ID) 、taskSound (题目声音 taskType 为4传 值为声音ID) 、taskCont(题目的内容 json)
			// taskResult = {
			// 	type:2,
			// 	classID:66,
			// 	taskID:123,
			// 	blockNum:4,
			// 	taskType:1,
			// 	taskName:"看图片猜单词",
			// 	taskImage:"http://nos.netease.com/edu-image/FF9AE63D396C03A1B84107D08D0A0B8C.jpg?imageView&thumbnail=225y150&quality=100",
			// 	taskSound:2,
			// 	taskCont:[{"word":"uncel","is_correct":1},{"word":"grandma","is_correct":0}]
			// };
			// taskResult = {
			// 	type:2,
			// 	classID:77,
			// 	taskID:1235,
			// 	blockNum:4,
			// 	taskType:2,
			// 	taskName:"图片关联单词",
			// 	taskImage:"",
			// 	taskSound:0, 
			// 	taskCont:[{"image":"http://nos.netease.com/edu-image/FF9AE63D396C03A1B84107D08D0A0B8C.jpg?imageView&thumbnail=225y150&quality=100","word":"uncel"},{"image":"http://nos.netease.com/edu-image/DBEFAD26116BBCD6A023478CE30ECB45.png?imageView&thumbnail=370y258&quality=100","word":"grandma"}]
			// };			
			// taskResult = {
			// 	type:2,
			// 	classID:88,
			// 	taskID:12345,
			// 	blockNum:3,
			// 	taskType:3,
			// 	taskName:"智能排序",
			// 	taskImage:"",
			// 	taskSound:0, 
			// 	taskCont:[{"word":"how","id":1},{"word":"are","id":2},{"word" : "you","id" :3}]
			// };
 			taskResult = {
				type:2,
				classID:88,
				taskID:123456,
				blockNum:2,
				taskType:4,
				taskName:"听声音猜图片",
				taskImage:"",
				taskSound:6, 
				taskCont:[{"image":"http://nos.netease.com/edu-image/FF9AE63D396C03A1B84107D08D0A0B8C.jpg?imageView&thumbnail=225y150&quality=100","is_correct" :1},{"image" : "http://nos.netease.com/edu-image/DBEFAD26116BBCD6A023478CE30ECB45.png?imageView&thumbnail=370y258&quality=100","is_correct" :0}]
			};
		}else{
			//删除
		}
		res.send({
			"code": "10000",
			"data": taskResult,
			"msg": "suc"
		})
	}

	//获取课堂详情
	,"Get /Api/classDetail": function(req, res, next) {
		var params = getParams(req.url);
		var classID = params.classID;
		var classDetail = [];
		for (var i = 0; i < 4; i++) {
			classDetail.push({
				taskName:'第'+i+'节课'
			});
		}
		res.send({
			"code": "10000",
			"data": {
				subject:i,
				classID:classID,
				className:'音乐朗读',
				creator:'zhangzhang',
				createTime:'2016-12-12',
				taskNum:12,
				number:'12',//小块数量
				classDesc:'这是一段描述'
			},
			"msg": ""
		})
	}

	//获取課程列表
	,"Get /Api/taskList": function(req, res, next) {
		var params = getParams(req.url);
		var classID = params.classID;
		var taskList = [];
		for (var i = 0; i < 4; i++) {
			taskList.push({
				taskName:'第'+i+'节课',
				taskID:i,
				blockNum:i
			});
		}
		res.send({
			"code": "10000",
			"data": {
				taskList:taskList
			},
			"msg": ""
		})
	}


	//获取课程模板
	,"GET /Api/getTaskTpl": function(req, res, next) {
		var tmplList = [];
		for (var i = 0; i < 5; i++) {
			tmplList.push({
				type:'1',
				url:'http://example.com',//图片路径
				name:"听声音得单词"
			});
		}
		res.send({
			"code": "10000",
			"data": tmplList,
			"msg": ""
		})
	}

		//获取课程模板
	,"GET /Api/getSubjectList": function(req, res, next) {

		res.send({
			"code": "10000",
			"data": {subjectList:[
		                {'id':1,'subjectName':'英语'},
		                {'id':2,'subjectName':'数学'},
		                {'id':1,'subjectName':'日本语'}
		            ]},
			"msg": ""
		})
	} 


	//新增、修改、删除课堂
	//input parmas{phone : 15000000000,pwd}
	,"POST /Api/Login1": function(req, res, next) {
		var params = getParams(req.url);
		var mailList = [];
		for (var i = 0; i < 10; i++) {
			mailList.push({
				isRead:Math.floor(Math.random()*2),
				id:  i,
				sendTime:'2016-12-12 12:12:12',
				content:'这是一段描述文件',
				title: '站内信11_' + i*params.pageNumber
			});
		}
		res.send({
			"code": "10000",
			"data": {
				
				"list": mailList
			},
			"msg": ""
		})
	}

}
