
var _            = require('../common/util.js');
var CT_username    = _.getCookie('CT_username')||'admin';
var CT_accessToken = _.getCookie('CT_accessToken');
var CT_userID      = _.getCookie('CT_userID');
document.getElementById('telNum').innerHTML = CT_username;


var Head = function () {

	var data = {
		CT_username:CT_usezrname,
		CT_accessToken:CT_accessToken,
		CT_userID:CT_userID,
	}
	return  data;

}

module.exports = Head;

