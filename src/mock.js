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
	},


	//input parmas{phone : 15000000000,pwd}
	"GET /Api/LoginOut": function(req, res, next) {
		res.send({"code":"10000","msg":"succ","data":[]})
	},

	//修改用户
	"post /Api/modifyUser": function(req, res, next) {
		res.send({"code":"10000","msg":"succ","data":[]})
	}


	//获取地区列表
	,"GET /Api/getRegions": function(req, res, next) {
		res.send({
			"code":"10000",
			"msg":"succ",
			"data":{
				"regions":[
				{
					"regionID":"11",
					"regionName":"\u5317\u4eac"
				},
				{
					"regionID":"12",
					"regionName":"\u5929\u6d25"
				},
				{
					"regionID":"13",
					"regionName":"\u6cb3\u5317"
				},
				{
					"regionID":"14",
					"regionName":"\u5c71\u897f"
				}]
			}
		})
	}

	

	//获取课堂列表
	,"GET /Api/classList": function(req, res, next) {
		var classList = [];
		for (var i = 0; i < 13; i++) {
			classList.push({
				subject:i%5,
				classID:i,
				creator:'zhangzhang'+i,
				createTime:'2016-12-12',
				createTimeStr:'2016-12-12',
				taskNum:12,
				className:'小學課程'+i,
				minNum:Math.floor(Math.random()*5),
				maxNum:Math.floor(Math.random()*20)
			});
		}
		res.send({
			"code": "10000",
			"data": {
				classList:classList
			},
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
			taskResult = {
				type:2,
				classID:77,
				taskID:1235,
				blockNum:4,
				taskType:2,
				taskName:"图片关联单词",
				taskImage:"",
				taskSound:0, 
				taskCont:[{"image":"http://nos.netease.com/edu-image/FF9AE63D396C03A1B84107D08D0A0B8C.jpg?imageView&thumbnail=225y150&quality=100","word":"uncel"},{"image":"http://nos.netease.com/edu-image/DBEFAD26116BBCD6A023478CE30ECB45.png?imageView&thumbnail=370y258&quality=100","word":"grandma"}]
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
				classDetail:{
					subject:i,
					classID:classID,
					className:'音乐朗读',
					creator:'zhangzhang',
					createTime:'2016-12-12',
					taskNum:12,
					number:'12',//小块数量
					classDesc:'这是一段描述'
				}
			},
			"msg": ""
		})
	}

	//获取互动环节列表接口 v2.0
	,"Get /Api/interactList": function(req, res, next) {
		var params = getParams(req.url);
		var classID = params.classID;
		var taskList = [];
		for (var i = 0; i < 2; i++) {
			taskList.push({
				taskName:'第'+i+'节课',
				taskID:i,
				blockNum:i
			});
		}
		res.send({
			"code":"10000",
			"msg":"succ",
			"data":{
				"interactList":
					[
						{
							"interID":"29",
							"type":"2",
							"options":[{"id":"2","item_cont":"how are you"},{"id":"3","item_cont":"how old are you"}]
						},
						{
							"interID":"294",
							"type":"1",
							"options":[
								{"id":"4","item_cont":"{\"id\":1,\"en\":\"bear\",\"zh\":\"\\u718a\",\"proTag\":\"default\"}"},
								{"id":"5","item_cont":"{\"id\":2,\"en\":\"bee\",\"zh\":\"\\u871c\\u8702\",\"proTag\":\"default\"}"},
								{"id":"6","item_cont":"{\"id\":3,\"en\":\"bird\",\"zh\":\"\\u9e1f\",\"proTag\":\"default\"}"},
								{"id":"7","item_cont":"{\"id\":4,\"en\":\"cat\",\"zh\":\"\\u732b\",\"proTag\":\"default\"}"}]
							}
					]
			}
		})
	}

	//课堂列表中点击完成
	,"POST /Api/saveInteract":function(req, res, next) {
		res.send({
			"code": "10000",
			"data": {},
			"msg": ""
		})
	}


	//获取课程列表接口 v2.0
	,"Get /Api/taskList": function(req, res, next) {
		var params = getParams(req.url);
		var classID = params.classID;
		var taskList = [];
		for (var i = 0; i < 2; i++) {
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
	,"GET /Api/templateList": function(req, res, next) {
		var templates = [];
		for (var i = 0; i < 5; i++) {
			templates.push({
				type:i,
				url:'http://g.hiphotos.baidu.com/image/pic/item/5243fbf2b21193130e676fb067380cd791238d8e.jpg',//图片路径
				gifUrl:'../dev/img/1.gif',
				name:"听声音得单词"
			});
		}
		res.send({
			"code": "10000",
			"data": {
				templates:templates
			},
			"msg": "获取课程模板"
		})
	}

	//9.课程科目列表
	,"GET /Api/getSubjectList": function(req, res, next) {

		res.send({
			"code": "10000",
			"data": {subjects:[
		                {'id':1,'subjectName':'英语'},
		                {'id':2,'subjectName':'数学'},
		                {'id':1,'subjectName':'日本语'}
		            ]},
			"msg": ""
		})
	} 


	//获取素材导航 废弃
	,"GET /Api/commResCates": function(req, res, next) {
		var params = getParams(req.url);
		var type   = params.type;
		if(type == 1){

		}
		res.send({
			"code":"10000",
			"msg":"succ",
			"data":{
				"resCateList":[
					{"tID":"1","tName":"\u98df\u7269"},
					{"tID":"2","tName":"\u5efa\u7b51\u7269"},
					{"tID":"3","tName":"\u52a8\u7269"},
					{"tID":"5","tName":"\u4eba\u7269"},
					{"tID":"6","tName":"\u7269\u54c1"}]
			}})
	} 


	

	//11.公共素材资源列表
	,"GET /Api/commRes": function(req, res, next) {
		var params = getParams(req.url);
		var type   = params.type;
		var tID   = params.tID;
		
		var resList = [];

		for(var i =0;i<40;i++){
			resList.push({
				"id":i,
				"name":"图片"+i,
				'sUrl':'http://img4.duitang.com/uploads/blog/201407/28/20140728221431_2nNhd.thumb.224_0.gif',
				'BUrl':'http://c.hiphotos.baidu.com/image/pic/item/aa64034f78f0f736f514e2010855b319eac413c3.jpg'
			})
		}
		res.send(
			{
				"code":"10000",
				"msg":"succ",
				"data":{
					"resList":resList
				}
			}
		)
	}



	//12.搜索资源 //这个接口跟文档有点不一样
	,"GET /Api/searchRes": function(req, res, next) {
		res.send({
			"code":"10000",
			"msg":"succ",
			"data":
				{
					"resInfo"://这个接口跟文档有点不一样
					{
						"id":"1",
						"zh":"\u82f9\u679c",
						"en":'bear',
						'imageProTags':["http://teacher.xcase.com.cn/commres/default/images/1.png","http://teacher.xcase.com.cn/commres/default/images/1.png","http://teacher.xcase.com.cn/commres/default/images/1.png",'http://teacher.xcase.com.cn/commres/default/images/1.png']
					}
				}
			}
		)
	}

	//20.互动环节模板列表
	,"GET /Api/playTemplateList": function(req, res, next) {
		var params = getParams(req.url);
		var type   = params.type;
		var keywords   = params.keywords;
		res.send({"code":"10000","msg":"succ","data":{"templates":[{
				"type":"1",
				"flag":"1",
				"url":"http:\/\/teacher.xcase.com.cn\/img\/tem4.png",
				"gifUrl":"http:\/\/teacher.xcase.com.cn\/img\/tem4.gif",
				"name":"\u8bed\u8a00\u8bcd\u6c47\u5b66\u4e60\u96c6",
				"desc":"\u8f93\u5165\u5b66\u8f93\u5165\u5b66\u4e60\u7684\u8bcd\u6c47\uff0c\u6dfb\u52a0\u6ce8\u91ca\u548c\u56fe\u7247\uff0c\u5305\u542b\u591a\u79cd\u73a9\u6cd5\u3002"
			},{
				"type":"3",
				"flag":"1",
				"url":"http:\/\/teacher.xcase.com.cn\/img\/tem4.png",
				"gifUrl":"http:\/\/teacher.xcase.com.cn\/img\/tem4.gif",
				"name":"\u8bed\u8a00\u8bcd\u6c47\u5b66\u4e60\u96c6",
				"desc":"\u8f93\u5165\u5b66\u4e60\u7684\u8bcd\u6c47\uff0c\u6dfb\u52a0\u6ce8\u91ca\u548c\u56fe\u7247\uff0c\u5305\u542b\u591a\u79cd\u73a9\u6cd5\u3002"
			},
			{
				"type":"4",
				"flag":"1",
				"url":"http:\/\/teacher.xcase.com.cn\/img\/tem4.png",
				"gifUrl":"http:\/\/teacher.xcase.com.cn\/img\/tem4.gif",
				"name":"\u8bed\u8a00\u8bcd\u6c47\u5b66\u4e60\u96c6",
				"desc":"\u8f93\u5165\u5b66\u4e60\u7684\u8bcd\u6c47\uff0c\u6dfb\u52a0\u6ce8\u91ca\u548c\u56fe\u7247\uff0c\u5305\u542b\u591a\u79cd\u73a9\u6cd5\u3002"
			},
		{"type":"2","flag":"0","url":"http:\/\/teacher.xcase.com.cn\/img\/tem3.png","gifUrl":"http:\/\/teacher.xcase.com.cn\/img\/tem3.gif","name":"\u987a\u5e8f\u6392\u5217","desc":"\u6309\u6b63\u786e\u987a\u5e8f\u8f93\u5165\u6587\u672c\uff0c\u5c0f\u670b\u53cb\u6309\u6b63\u786e\u987a\u5e8f\u62fc\u51fa\u7b54\u6848\u3002"}]}})
	}


}
