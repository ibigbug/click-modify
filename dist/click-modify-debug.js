define("./click-modify/1.0.0/click-modify-debug", ["jquery/1.8.2/jquery-debug"], function(require, exports, module) {

    var $ = require('jquery/1.8.2/jquery-debug');

    function ClickModify(options, callback){
        
        if(!(this instanceof ClickModify)){
            return new ClickModify(options, callback=null);
        }
        if(isString(options)) options = {trigger: options};

        var settings = {
            trigger: null,
            style: null,
            type: null,
            callback: null,
        }

        if (options) $.extend(settings, options);
        var $trigger = $(settings.trigger);

        settings.style = settings.style || {};
        settings.type = settings.type || 'textarea';
        settings.finish = settings.finish || callback|| null;
        settings.prefix = 'click-modified';

        this.settings = settings;

        this.setup();

    }

    ClickModify.prototype.setup = function(){
        var $trigger = $(this.settings.trigger), _this = this;
        $trigger.addClass(this.settings.prefix);


        $.map($trigger, function(each_trigger,i){

            var box;
            if (_this.settings.type == 'input'){
                box = $('<input />');
            }
            else {
                box = $('<textarea></textarea>');
            }
            box.attr('id', 'cm-' + new Date().getTime());
            box.attr('for', $(each_trigger).attr('name'));
            box.addClass('click-modify-box');

            var offset = $(each_trigger).offset();
            var _style = {
                'left': offset.left,
                'top': offset.top,
                'width': $trigger.width(),
                'height': $trigger.height(),
                'display': 'none',
            }
            var style = $.extend(_this.settings.style, _style)
            box.css(style);
            box.val($(each_trigger).html());
            $(each_trigger).after(box);
            each_trigger.box = box;

            box.change(function(){
                $(each_trigger).html($(this).val());
            });

            box.blur(function(){
                $(this).hide();
                $(each_trigger).show();
                if (_this.settings.finish){
                    _this.settings.finish($(each_trigger), $(box));
                }
                else return true;
            });

            $(each_trigger).click(function(){
                $(this).hide();
                this.box.show();
            });

        });

        return this;
    }

    ClickModify.prototype.finish = function(callback){
        if(!callback) return this;
        this.settings.finish = callback;
        return this;
    }



    module.exports = ClickModify;

    //Helpers
    //-------

    function isString(val){
        return Object.prototype.toString.call(val) === '[object String]';
    }

    function getDefault($trigger){
        var ret = {};

        //get action
        var parents = $trigger.parentsUntil('body');
        var length = parents.length;
        for (var i=0; i<length; i++){
            var item = parents.eq(i);
            var tagName = item.attr('tagName');
            if (tagName && (tagName.toLowerCase == 'form')){
                console.log(item);
                ret.action = item.attr('action');
            }
            ret.action = null;
        }
        //get name
        ret.name = $trigger.attr('name');

        return ret;
    }

});
