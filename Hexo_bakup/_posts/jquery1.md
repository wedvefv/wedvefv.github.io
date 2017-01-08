---
layout: "post"
title: "jquery学习笔记1(基础)"
date: "2016-9-23 11:12"

---

## 1.安装
jquery就是一个js文件,国内CDN下载 引入：
```js
<head>
<script src="jquery-1.10.2.min.js"></script>
</head>
```

## 2.jquery语法
基础语法：
$(selector).action()
$:定义jquery
selector：查询的html元素
action：对元素执行的函数
实例：
```js
$(this).hide()  //隐藏当前元素
$("p").hide() //隐藏p元素
$("p.test").hide() //隐藏class属性是test的<p>元素
$("#test").hide() //隐藏所有id为test的元素

```

 文档必须就绪完成才能执行jquery代码，否则操作不存在的元素，就会报错。
 ```js
 $(document).ready(function(){

   // 开始写 jQuery 代码...

});
 ```

## jquery选择器
jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。
jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素。 它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器。
jQuery 中所有选择器都以美元符号开头：$()。

元素选择器 ：依据元素名
```js
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide();
  });
});
```
id选择器 依据元素id
```js
$(document).ready(function(){
  $("button").click(function(){
    $("#test").hide();
  });
});
```
class选择器 依据class属性
```js
$(document).ready(function(){
  $("button").click(function(){
    $(".test").hide();
  });
});
```

更多实例：

语法|描述
---|---
$("*") |选取所有元素
$(this)|选取当前html元素
$("p.intro")|选取class是intro的p元素
$("p:first")|选取第一个p元素
$("ul li:first")|选取第一个ul元素的第一个li元素
$("ul li:first-child")|选取每个ul的第一个li
$("[href]")|选取带有href属性的元素
$("a[target='blank']") |所有target属性是_blank的a元素_
$("a[target!='blank']") | 所有target属性不是_blank的a元素_
$(":button") | 选取所有 type='button' 的 \<input> 元素 和 \<button> 元素
$("tr:even") | 偶数行
$("tr:odd") | 奇数行

对于多个页面需要jquery代码文件，需要把你写的jquery代码放到单独文件：
```js
<head>
<script src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js">
<\/script>
<script src="my_jquery_functions.js"> <\/script>
<\/head>
```

## jquery 事件

鼠标事件    | 键盘事件   | 表单事件    |文档/窗口事件
---|---|---|---
click      | keypress  |  submit    |load
dblclick   | keydown   |change      |resize
mouseenter  | keyup   |focus   |scroll
mouseleave  |blur    |unload   |

每个事件都如此：
```js
$("p").dblclick(function(){   //选择器+事件+函数部分
  $(this).hide();
});
```
