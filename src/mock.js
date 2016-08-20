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

	//获取课堂列表
	"GET /Api/classList": function(req, res, next) {
		var classList = [];
		for (var i = 0; i < 2; i++) {
			classList.push({
				subject:'音乐朗读'+i,
				classID:i,
				creator:'zhangzhang'+i,
				createTime:'2016-12-12',
				taskNum:12,
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

	//登录
	//input parmas{phone : 15000000000,pwd}
	,"POST /Api/Login": function(req, res, next) {
		res.send({
			"code": "10000",
			"data": {
				'token':'121214432343243'
			},
			"msg": ""
		})
	}


	//新增、修改、删除课堂
	//input parmas{phone : 15000000000,pwd}
	,"POST /Api/Login": function(req, res, next) {
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
