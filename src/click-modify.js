define(function(require, exports, module) {

    var $ = require('jquery');

    function ClickModify(options){
        
        if(!(this instanceof ClickModify)){
            return new ClickModify(options);
        }
        if(isString(options)) options = {trigger: options};

        var settings = {
            trigger: null,
            action: null,
            error: null,
            success: null,
            style: null,
            type: null,
            data: null,
            method: null,
        }

        if (options) $.extend(settings, options);
        var $trigger = $(settings.trigger);

        settings.action = settings.action || getDefault($trigger).action || '/post';
        settings.method = settings.method || 'POST';
        settings.style = settings.style || {},
        settings.prefix = 'click-modified',
        settings.type = settings.type || 'textarea',
        settings.data = settings.data || {},

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
                this.changed = true;
            });

            var data = {};
            var _name = $(each_trigger).attr('name');
            data[_name] = $(box).val();
            $.extend(data, _this.settings.data);
            box.blur(function(){
                if (this.changed){
                    $.ajax({
                        type: _this.settings.method,
                        url: _this.settings.action,
                        data: data,
                        error: _this.settings.error || function(){},
                        success: _this.settings.success || function(){},
                    });
                    this.changed = false;
                }
                $(each_trigger).html(each_trigger.box.val()).show();
                each_trigger.box.hide();
            });

            $(each_trigger).click(function(){
                $(this).hide();
                this.box.show();
            });

        });



        return this;
    }

    ClickModify.prototype.error = function(callback){
        if(!callback) return this;
        this.settings.error = callback;
        return this;
    }

    ClickModify.prototype.success = function(callback){
        if(!callback) return this;
        this.settings.success = callback;
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
