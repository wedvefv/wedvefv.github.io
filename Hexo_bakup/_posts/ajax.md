---
layout: post
title: ajax简介
category: web
tags: ajax
date: 2016-10-6 20:04:30
comments: true
---

# 1.ajax 简介
ajax =  异步javascript+XML
AAJAX是基于现有的Internet标准，并且联合使用它们：
XMLHttpRequest 对象 (异步的与服务器交换数据)
JavaScript/DOM (信息显示/交互)
CSS (给数据定义样式)
XML (作为转换数据的格式)
lamp  AJAX应用程序与浏览器和平台无关的！
实现不刷新整个页面，实现页面动态更新的技术。

ajax工作原理：

![](http://www.ziqiangxuetang.com/static/images/ajax.gif)

# 2.ajax实例
 1.首先建立XMLHttpRequest对象，区分不同的浏览器版本，IE5,IE6不支持直接建立XMLHttpRequest对象，所以： 

```javascript

var xmlhttp;
if(window.XMLHttpRequest){ //如果为真，则支持XMLHttpRequest对象
    xmlhttp = new XMLHttpRequest();
}else{
    //code for IE5,6
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP";)
}

```

2.XMLHttpRequest对象用于和服务器交换数据

open方法用于发送请求，参数1：方法，参数2：url，参数3:异步/同步

> xmlhttp.open("GET","ajax_info.txt",true)

send方法也用于请求，不过只支持post请求，参数：string

> xmlhttp.send(string);

GET和POST的区别：
* GET更简单，更快，大部分情况都能用。以下情况使用POST：
* 无法使用缓存文件更新服务器上的文件或数据库。
* 发送大量数据到服务器。
* 发送用户输入的未知字符到服务器时。 

# 例子 

get请求：
```javascript
xmlhttp.open("GET","demo_get2.html?fname=Henry&lname=Ford",true);
xmlhttp.send();
```
post请求：

如果post表单那样的提交数据，需要添加http头
```javascript

xmlhttp.open("POST","ajax_test.html",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");

setRequestHeader方法：
setRequestHeader(header,value)  
向请求添加 HTTP 头。
header: 规定头的名称
value: 规定头的值
```

# Async=true
* 使用XMLRequest.open()方法时，一般在ajax第三个参数必须是true（异步）
而且规定请求就绪时执行的函数。也就是定义 XMLHttpRequest.onreadystatechange 事件函数。
当请求完成时，触发该函数，类似定时器。
* 因为web请求也许需要一段时间，所以发送异步请求，等待请求的这段时间可以执行其他代码。请求得到返回时，再执行onreadystatechange中的函数。

```javascript
xmlhttp.onreadystatechange=function() //
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)//请求正确返回http code 200时
  //执行修改id为mydiv的html元素内容。
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","ajax_info.txt",true); //请求ajax_info.txt文件，
xmlhttp.send();
```

#Async=false 
* 不推荐，对于小型的请求也下可以。因为javascript会等待服务器返回后才继续向下执行。如果服务器繁忙，应用程序会挂起或者挂掉。

# XMLHttpRequest响应
如果返回200,就可以使用
