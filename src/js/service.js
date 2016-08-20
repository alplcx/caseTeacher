var ajax = require('./common/request.js');


exports.actionA = function(positionId, callback){
 ajax.request({
      url: '/position/actionA.do',
      method: 'get',
      data: {id:positionId},
      success: callback
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
