# click-modify

---

click-modify是一个基于seajs的插件.当页面的文本元素被注册了`click-modify`事件后,点击该元素时自动切换为可编辑状态,离开编辑时,自动发起ajax请求提交由后端处理.

---

## Getting Start

参看[实例](/examples/)

## Config

click-modify支持配置如下参数:

* trigger: 被绑定的元素,同jQuery selector

* name: 提交到后台的变量名 如 `{ name: value }`

* action: 后台处理的地址 如 `/post`

* data: 提交时的附加字段 如`{ _csrf_token: 'token'}`

* style: 生成的input或者textarea的样式

* type: 选择是input还是textarea来装载文本 默认为input

* method: 选择ajax提交的方法 如 `GET`

* success: 提交成功时的回调

* error: 出错时的回调

## API

### 示例

#### html结构
````html
<form action="/post" method="post"> <!--可选的-->
<p class="trigger">Click Me</p>
</form>
````

````javascript
//Basic Usage

seajs.use('ClickModify', function(ClickModify){
    var click_modify = new ClickModify('.trigger');
    });
````

```javascript

//Advanced
seajs.use('ClickModify', function(ClickModify){
    var options = {
        trigger: '.trigger',
        type: 'textarea',
        name: 'key',
        action: '/post',
        method: 'POST',
        data: {
            _csrf: 'csrf',
            },
        style: {
            'color': 'red',
            },
        success: function(msg){ alert(msg) },
        error: function(){ alert('failed') },

        };
    var click_modify = new ClickModify('.trigger');
    });

```
