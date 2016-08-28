'use strict';

var reqwest = require('reqwest');
var _       = require('./util.js');

var ajax = {};

ajax.request = function(opt) {
    var noop = function(){};
    var oldError = opt.error || noop,
        oldSuccess = opt.success || noop,
        oldComplete = opt.complete || noop;

    opt.data = opt.data || {};

    opt.data.accessToken = _.getCookie('CT_accessToken');
    if(opt.method && opt.method.toLowerCase() !== 'get')
        opt.contentType = opt.contentType || 'application/json';
    else
        opt.data.timestamp = +new Date;

    
    if(opt.contentType === 'application/json' || opt.headers && opt.headers.contentType === 'application/json' ) {

        opt.data = JSON.stringify(opt.data);
    }

    opt.success = function(data) {
        //ajax.$emit('success', data);

        if(data.code != 10000) {
            oldError(data.result||data.data, data);
            return;
        }
        oldSuccess(data.result||data.data, data);
    }

    opt.error = function(data) {
        //ajax.$emit('error', data);
        oldError(data.result, data);
    }

    opt.complete = function(data) {
        //ajax.$emit(ecomplete', data);
        oldComplete(data.result, data);
    }

    reqwest(opt);
}

module.exports = ajax;