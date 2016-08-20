'use strict';

var Regular = require('regularjs');
var filter = require('./filter.js');
var path = require('path');

var dom = Regular.dom; 

var Component = Regular.extend({
	// request
	$request: function(){},

    // 考试相关， 懒得再弄个类了
    $authority: function(authority){
        var test = this.$state.test;
        return test && ( (test.authority||0) & authority)
    },
    $canSubmit: function(){
        var test = this.$state.test;
        return test && ( test.remainTime !== 0 && test.status == 0 ) && this.$authority(2);
    },
    $login:function () {
        
    }
})
.filter(filter)
.directive({
    // if expression evaluated to true then addClass z-crt.
    // otherwise, remove it
    // <li z-crt={this.$state.current.name==='app.test.exam.choice'}>
    'z-crt': function(elem, value){
        this.$watch(value, function(val){
            dom[val? 'addClass': 'delClass'](elem, 'z-crt');
        })
    },
    'q-render': function(elem, value){
        this.$watch(value, function(val){
            if(val) elem.innerHTML = qs.render(val)
        })
    },
    'r-autofocus': function(elem, value){
        setTimeout(function() {
            elem.focus();
        }, 0);
    },
    'r-scroll': function(elem, value) {
        this.$watch(value, function(newValue) {
            if(newValue && elem) {
                var grid_db = elem.parentElement.parentElement.parentElement;
                grid_db.scrollTop = elem.offsetTop;
            }
        });
    },
    'r-href': function(elem, value) {
        this.$watch(value, function(newValue) {
            var hash = location.href.split('#');
            hash = hash[1] || '';
            dom.attr(elem, 'href', '#' + path.join(hash, newValue + ''));
        });
    }
})

module.exports = Component;