# click-modify

---

click-modify是一个基于seajs的插件.当页面的文本元素被注册了`click-modify`事件后,点击该元素时自动切换为可编辑状态,离开编辑时,自动发起ajax请求提交由后端处理.

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

* action: 后台处理的地址 如 `/post`

* data: 提交时的附加字段 如`{ \_csrf_token: 'token'}`

* style: 生成的input或者textarea的样式

* type: 选择是input还是textarea来装载文本 默认为input

* method: 选择ajax提交的方法 如 `GET`

* success: 提交成功时的回调

* error: 出错时的回调
