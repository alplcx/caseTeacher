window.$ = window.jQuery = require('./../../lib/jquery-min.js');

require('../../lib/jquery.SuperSlide.2.1.1.js');

var Modal    = require('../../base/modal.js');
var template = require('./createTaskTplModal.html');
var _        = require('../../common/util.js');
var cacheService = require('../../service.js');
var Notify =  require('../../base/notify.js');

var SortUI = require('../../components/interact/sortUI/sortUI.js');
var VocabularyUI =  require('../../components/interact/vocabularyUI/vocabularyUI.js');

var CreateTaskTplModal = Modal.extend({
    service : cacheService,
    config: function(data) {
        _.extend(this.data, {
            contentTemplate: template,//body 体
            width: 960, //宽度
            cancelButton: false, //显示确定按钮
            okButton:true,//显示取消按钮
            title: '互动环节模板选择-英语',
            'class': '', //弹窗类
            okValue:"下一步"
        },true);
        this.supr();
        this.$on('ok',function () {
            if(this.data.type==null||this.data.type===''){
                Notify.warning('请选择一个模板');
            }else{
                //创建环节接口
                var _accessToken = _.getCookie('CT_accessToken');
                var params = {
                    accessToken:_accessToken,
                    temType:this.data.type,
                    type:1,
                    classID:this.data.classID
                };

                this.service.operInteract(params,function(data,result){
                    this.onCbCreateInteract(data);
                }.bind(this),function(data,result){
                    Notify.error(result.msg);
                }.bind(this));
            }
        }.bind(this))
    },
    init:function(){
        
        this.getTaskTplList();
        this.supr();
    },
    ok: function() {
        /**
         * @event ok 确定对话框时触发
         */
        this.$emit('ok');
    },
    /*close: function() {
        
        this.$emit('close');
        this.destroy();
    },*/
    //创建互动环节以后接口回调函数，接下来在页面中生成相应的UI
    onCbCreateInteract:function(_data){
        var params = {
            id :this.data.type,//模板类型
            classID:this.data.classID,
            interactInfo:_data[0]||[]
        }
           
        if(this.data.type ==1 ){
            params.ref = "VocabularyUI";
            window.VocabularyUI = new VocabularyUI({
                data:params
            }).$inject(document.getElementById('inter-container'));//注入到interactList 

            window.VocabularyUI.data.classID = this.data.classID;
            window.VocabularyUI.data.options = (_data.interactList[0]||{}).options;
            window.VocabularyUI.data.interID = (_data.interactList[0]||{}).interID;
            window.VocabularyUI.data.interactInfo = _data.interactList[0]||{};
            //window.vocabularyUI.$update();
        }else{
            params.ref = "SortUI";
            window.SortUI = new SortUI({
                data:params
            }).$inject(document.getElementById('inter-container'));//注入到interactList 
            
            window.SortUI.data.classID = this.data.classID;
            window.SortUI.data.options = (_data.interactList[0]||{}).options;
            window.SortUI.data.interID = (_data.interactList[0]||{}).interID;
            window.SortUI.data.interactInfo = _data.interactList[0]||{};
            //window.SortUI.$update();
        }

        //销毁当前弹窗组件
        this.destroy();
    },

    //选择当前点击模板
    choose:function (type,$event) {
        var item = document.getElementsByClassName('tplItem')
        for (var i = 0; i < item.length; i++) { //这个要考虑一下 
            item[i].style.border = '1px solid #ccc';
        }
        var target = $event.target;
        target.style.border = "1px solid #00b8f3";
        var gifUrl = target.getAttribute('data-src');
        target.setAttribute('src',gifUrl);
        this.data.type =  type;
        this.$update();
    },
    //获取课程模板
    getTaskTplList:function () {
        this.service.getTaskTpl({classID:this.data.classID},function (data,result) {
            this.data.taskTplList =  result.data.templates;
            this.$update();

            //只有模板个数大于3的情况才进行幻灯效果
            if(result.data.templates.length>2){
                jQuery(".slideTxtBox").slide({
                    titCell:".hd ul",
                    mainCell:".bd ul",
                    autoPage:true,
                    effect:"left",
                    pnLoop:true,
                    autoPlay:false,
                    vis:3
                });
            }

        }.bind(this),function (data,result) {
            Notify.error(result.msg);
        }.bind(this))
    }
});
module.exports = CreateTaskTplModal;
