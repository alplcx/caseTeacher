var Component = require("../common/component.js");
var html = require("../../html/base/slideshow.html");
var _ = require("../common/util.js");
var slideShow = Component.extend({
    name: "slideShow",
    template: html,
    // is called before compile. 一般用来处理数据
    config: function(data){
      this.supr();
      this.data = {
        autoplay:true,
        goHide : false,
        dotnavHide : false,
        height : 400,
        width  : 400,
        autoplayInterval: 2000,
        animation : "scroll",
        duration :  1000,
        start  : 0,
        slides : []
      }


      this.animationMap = {
        'fade': {
          classIn: 'fade-in',
          classOut: 'fade-out'
        },
        'scroll':{
          classIn: 'scroll-backward-in',
          classOut: 'scroll-backward-out'
        }

      }

      this.capRandomMap = [
        'slideshow_left fade-slide-left-in',
        'slideshow_right fade-slide-right-in',
        'slideshow_bottom fade-slide-bottom-in',
        'slideshow_top fade-slide-top-in'
      ]

      this.data.capClassName = "slideshow_top fade-slide-top-in";
      
      
      this.hovering = false;

      _.extend(this.data, data, true);

      // 初始化当前选中页
      this.data.current = {
        index : 0 ,
        slide : this.data.slides[0],
        caption:this.data.slides[0].caption
      } 


    },

    init:function(){
      debugger;

      var $this = this;

      this.data.classIn = this.animationMap[this.data.animation]['classIn'];
      this.data.classOut = this.animationMap[this.data.animation]['classOut'];

      if(this.data.autoplay && this.data.slides.length > 1){
        this.interval = setInterval(function() {
            if (!$this.hovering)
               $this.next();
        }, this.data.autoplayInterval)
      }
    },

    prev: function(index){
      if(this.data.slides.lenght < 2)
        return;
      var length = this.data.slides.length,
          index = this.data.current['index'],
          preIndex = index == 0 ? length - 1 : index - 1;

      this.data.before = {
        index : this.data.current['index'],
        slide : this.data.current['slide'],
        caption:this.data.current['slide'].caption
      }

      this.data.current = {
        index : preIndex,
        slide : this.data.slides[preIndex],
        caption:this.data.slides[preIndex].caption
      }
      this.data.capClassName = ''
      setTimeout(function(){
        this.data.capClassName = this.capRandomMap[_.randomNum(2, 3)];
        this.$update();
      }.bind(this),100)
      this.$update();
      return false;
    },

    next: function(index){
      if(this.data.slides.lenght < 2)
        return;
      var length = this.data.slides.length,
          index = this.data.current['index'],
          nextIndex = (index == length - 1) ? 0 : index + 1;

      this.data.before = {
        index : this.data.current['index'],
        slide : this.data.current['slide']
      }

      this.data.current = {
        index : nextIndex,
        slide : this.data.slides[nextIndex],
        caption: this.data.slides[nextIndex].caption
      }

      this.data.capClassName = ''
      setTimeout(function(){
        this.data.capClassName = this.capRandomMap[_.randomNum(2, 3)];
        this.$update();
      }.bind(this),100)

      this.$update();
      return false;
    },
    goNav: function(index){
      this.data.before = {
        index : this.data.current['index'],
        slide : this.data.current['slide'],
        caption:this.data.current['slide'].caption

      }
      this.data.current = {
        index : index,
        slide : this.data.slides[index],
        caption: this.data.slides[index].caption

      }

     this.data.capClassName = ''
      setTimeout(function(){
        this.data.capClassName = this.capRandomMap[_.randomNum(2, 3)];
        this.$update();
      }.bind(this),100)


      this.$update();
      return false;
    }
  });


module.exports = slideShow;