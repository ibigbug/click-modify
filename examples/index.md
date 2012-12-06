#演示文档
- oder: 1

---

创建如下html结构

````html
<form method="post" action="."> <!--optionally-->
<p class="click-modify" name="required">Demo Text</p>
</form>
````

js脚本如下

````javascript

seajs.use('../src/click-modify', function(ClickModify){
        var options = {
trigger: '.click-modify',
action: 'http://127.0.0.1',
type: 'input',
};
var click_modify = new ClickModify(options);
});
````
