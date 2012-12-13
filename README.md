# click-modify

---

click-modify是一个基于seajs的插件.当页面的文本元素被注册了`click-modify`事件后,点击该元素时自动切换为可编辑状态,离开编辑时,提供回调接口来处理后续的工作.

**Required Library**: jQuery

---

## Getting Start

Install tornado:

`pip install tornado`

Start server:

`python server.py`


## Config

click-modify支持配置如下参数:

* trigger: 被绑定的元素,同jQuery selector

* style: 生成的input或者textarea的样式

* type: 选择是input还是textarea来装载文本 默认为input

* finish: 离开编辑模式的处理回调 提供两个参数`$trigger`和`$box`, 其中, `$trigger`是被绑定的元素,`$box`是编辑状态时候的容器.


## Usage

* basic usage:

    ```javascript
    seajs.use('../src/click-modify', function(ClickModify){
        var c = new ClickModify('trigger', function($trigger, $box){
                //process data
            });
    }
    ```

* advanced:

    ```javascript
    seajs.use('../src/click-modify', function(ClickModify){
        var options = {
                trigger: '.click-modify',
                type: 'input',
                style: {'color':'red'}, //will be passed to $('trigger').css(style);
                success: function($trigger, $box){
                    //process data;
                    }
            };
        var click_modify = new ClickModify(options, function($trigger, $box){
            console.log($trigger);
            console.log($box);
        }));
    });
    ```
