var ajax = require('./common/request.js');



//获取课堂列表
exports.getCourseList = function(params, callback,errback){
 ajax.request({
      url: ' /Api/classList',
      method: 'get',
      data: params,
      success: callback,
      error:errback
  });
}


//操作课堂  增加 | 删除 | 编辑
exports.opCourse = function(params, callback,errback){
 ajax.request({
      url: ' /Api/operClass',
      method: 'POST',
      data: params,
      success: callback,
      error:errback
  });
}


//课堂详情
exports.getClassDetail = function(classID, callback,errback){
 ajax.request({
      url: ' /Api/classDetail',
      method: 'GET',
      data: {'classID':classID},
      success: callback,
      error:errback
  });
}

//課程列表 v1.0
/*exports.getTaskList = function(classID, callback,errback){
 ajax.request({
      url: ' /Api/taskList',
      method: 'GET',
      data: {'classID':classID},
      success: callback,
      error:errback
  });
}*/

//互动环节列表 V2.0
exports.getTaskList = function(classID, callback,errback){
 ajax.request({
      url: ' /Api/interactList',
      method: 'GET',
      data: {'classID':classID},
      success: callback,
      error:errback
  });
}

//互动环节保存
exports.interactListSave = function(params, callback,errback){
 ajax.request({
      url: '/Api/saveInteract',
      method: 'POST',
      data: params,
      success: callback,
      error:errback
  });
}

//新增、修改、删除选项接口【type(1 新增 、2 删除)】
exports.operInteractOption = function(params, callback,errback){
 ajax.request({
      url: '/Api/operInteractOption',
      method: 'POST',
      data: params,
      success: callback,
      error:errback
  });
}
//新增、修改、删除选项接口【type(1 新增 、2 删除)】
exports.operInteract = function(params, callback,errback){
 ajax.request({
      url: '/Api/operInteract',
      method: 'POST',
      data: params,
      success: callback,
      error:errback
  });
}

//操作课程  增加 | 编辑 | 删除
exports.opTask = function(params, callback,errback){
 ajax.request({ 
      url: ' /Api/operTask',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}


//获取课程模板 v1.0
/*exports.getTaskTpl = function(params, callback,errback){
 ajax.request({
      url:' /Api/templateList',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}*/


//获取课程模板 v2.0
exports.getTaskTpl = function(params, callback,errback){
 ajax.request({
      url:' /Api/playTemplateList',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}





//获取科目
exports.getSubjectList = function(params, callback,errback){
 ajax.request({
      url:' /Api/getSubjectList',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}


//获取素材导航
exports.getNav = function(type, callback,errback){
 ajax.request({
      url:' /Api/commResCates',
      method: 'GET',
      data: {'type':type},
      success: callback,
      error:errback
  });
}


//11.公共素材资源列表
exports.getCommonSourceList = function(params, callback,errback){
 ajax.request({
      url:' /Api/commRes',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}


//12.公共素材资源列表
exports.searchRes = function(params, callback,errback){
 ajax.request({
      url:'/Api/searchInteractRes',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}


//13.登出
exports.logOut = function(params, callback,errback){
 ajax.request({
      url:' /Api/LoginOut',
      method: 'GET',
      data: params,
      success: callback,
      error:errback
  });
}




//14 修改用户信息
exports.modifyUser = function(params, callback,errback){
 ajax.request({
      url:' /Api/modifyUser',
      method: 'POST',
      data: params,
      success: callback,
      error:errback
  });
}

//18.获取地区列表
exports.getRegions = function(params, callback,errback){
 ajax.request({
      url:'/Api/getRegions',
      method: 'get',
      data: params,
      success: callback,
      error:errback
  });
}