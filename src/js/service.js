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


//操作课堂  增加 | 删除 | 编辑
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

//課程列表
exports.getTaskList = function(classID, callback,errback){
 ajax.request({
      url: '/Api/taskList',
      method: 'GET',
      data: {'classID':classID},
      success: callback,
      error:errback
  });
}
//操作课程  增加 | 编辑 | 删除
exports.opTask = function(params, callback,errback){
 ajax.request({ 
      url: '/Api/operTask',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}


//获取课程模板
exports.getTaskTpl = function(params, callback,errback){
 ajax.request({
      url:'/Api/getTaskTpl',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}


//获取科目
exports.getSubjectList = function(params, callback,errback){
 ajax.request({
      url:'/Api/getSubjectList',
      method: 'GET',
      data: params,
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
