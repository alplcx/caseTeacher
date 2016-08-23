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
		for (var i = 0; i < 4; i++) {
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
	,"POST /Api/operTask": function(req, res, next) {
		var params = getParams(req.url);
		var type   = params.type;
		var classList = [];
		if(type == 1){
			//新增
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
