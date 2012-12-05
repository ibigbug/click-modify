define("./click-modify/1.0.0/click-modify-debug", ["jquery/1.8.2/jquery-debug"], function(require, exports, module) {

    var $ = require('jquery/1.8.2/jquery-debug');

    function ClickModify(options){
        
        if(!(this instanceof ClickModify)){
            return new ClickModify(options);
        }
        if(isString(options)) options = {trigger: options};

        var settings = {
            trigger: null,
            name: null,
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

        settings.name = settings.name || getDefault($trigger).name || 'name';
        settings.action = settings.action || getDefault($trigger).action || '/post';
        settings.method = settings.method || 'POST';
        settings.style = settings.style || {},
        settings.prefix = 'click-modified',
        settings.type = settings.type || 'textarea',
        settings.data = settings.data || {},

        this.settings = settings;
        this.changed = false;

        this.setup();

    }

    ClickModify.prototype.setup = function(){
        var $trigger = $(this.settings.trigger), _this = this;
        $trigger.addClass(this.settings.prefix);
        var value = $trigger.html();

        var box
        if (this.settings.type == 'input'){
            box = $('<input />');
        }
        else {
            box = $('<textarea></textarea>');
        }
        box.attr('id', 'cm-' + new Date().getTime());

        var offset = $trigger.offset();
        var _style = {
            'left': offset.left,
            'top': offset.top,
            'width': $trigger.width(),
            'height': $trigger.height(),
            'display': 'none',
        }
        var style = $.extend(this.settings.style, _style)
        box.css(style);
        box.val(value);
        box.insertAfter($trigger).focus();
        box.change(function(){
            _this.changed = true;
        })
        this.box = box;

        $trigger.click(function(){
            $(this).hide();
            _this.box.show();
        });

        var data = {}
        data[this.settings.name] = this.box.val();
        $.extend(data, this.settings.data);
        box.blur(function(){
            if (_this.changed){
                $.ajax({
                    type: _this.settings.method,
                    url: _this.settings.action,
                    data: data,
                    error: _this.settings.error || function(){},
                    success: _this.settings.success || function(){},
                });
                _this.changed = false;
            }
            $trigger.html(_this.box.val()).show();
            _this.box.hide();
        })

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
