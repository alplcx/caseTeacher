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

	//站内信 - 列表  新增接口 1
	"GET /letter/list.do": function(req, res, next) {
		console.log(req.url)

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
			"code": "200",
			"data": {
				"page": {
					"currentPage": (params.pageNumber),
					"pageSize": 10,
					"startRownum": 1,
					"totalPages": 3,
					"totalResults": 36
				},
				"list": mailList
			},
			"msg": ""
		})
	}
}