define(function(require, exports, module) {

    var $ = require('jquery');

    function ClickModify(options){
        
        if(!(this instanceof ClickModify)){
            return new ClickModify(options);
        }
        if(isString(options)) options = {trigger: options};

        var settings = {
            trigger: null,
            name: null,
            action: null,
            changed: false,
            error: null,
            success: null,
            style: null,
        }

        if (options) $.extend(settings, options);
        var $trigger = $(settings.trigger);

        settings.name = settings.name || 'name';
        settings.action = settings.action || '/post';
        settings.style = settings.style || {},

        this.settings = settings;

        this.setup();

    }

    ClickModify.prototype.setup = function(){
        var value = this.trigger.val();
        var textarea = $('<textarea></textarea>');

        var offset = this.trigger.offset();
        var _style = {
            'left': offset.left,
            'top': offset.top,
            'width': this.trigger.width(),
            'height': this.trigger.height(),
        }
        var style = $.extend(this.style, _style)
        textarea.css(style);
        textarea.after(this.trigger);
    }

    ClickModify.setup();

    module.exports = ClickModify;

    //Helpers
    //-------

    function isString(val){
        return Object.prototype.toString.call(val) === '[object String]';
    }

});
