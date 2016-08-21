var ajax = require('./common/request.js');



//获取课堂列表
exports.getCourseList = function(params, callback,errback){
 ajax.request({
      url: '/Api/classList',
      method: 'get',
      data: params,
      success: callback,
      error:errback
  });
}


//操作课堂 
exports.opCourse = function(params, callback,errback){
 ajax.request({
      url: '/Api/operClass',
      method: 'POST',
      data: params,
      success: callback,
      error:errback
  });
}


//课堂详情
exports.getClassDetail = function(classID, callback,errback){
 ajax.request({
      url: '/Api/classDetail',
      method: 'GET',
      data: {'classID':classID},
      success: callback,
      error:errback
  });
}


//模拟form表单提交
exports.actionB = function(params,callback,errback){
  ajax.request({
      url: '/position/actionB.do',
      method: 'POST',
      data: params,
      success: callback,
      error:errback,
      contentType:"application/x-www-form-urlencoded"
  });
}
