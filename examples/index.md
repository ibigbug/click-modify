#演示文档
- oder: 1

---

创建如下html结构

````html
<p class="click-modify" name="required">Demo Text</p>
````

js脚本如下

````javascript

seajs.use('../src/click-modify', function(ClickModify){
        var options = {
trigger: '.click-modify',
type: 'input',
};
var click_modify = new ClickModify(options, function($trigger, $box){
    console.log($trigger);
    console.log($box);
    }));
});
````
