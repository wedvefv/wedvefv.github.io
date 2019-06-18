---
layout: post
title: vim-emmet插件/html/css
date: 2016-10-27
category : vim 
---

# emmet-vim 插件就是以前的zencoding

安装 可以git clone ，可以在vim里面安装PluginInstall

来说一下快捷键
快捷键一：

输入html：5  按下ctrl+y 松开后在按逗号（英文的哦）
立刻展开成如下了
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    
</body>
</html>

```

html:xt 就是兼容的html版本

快捷键二：
div#page>div.logo+ul#navigation*2>li*5>a 
也是ctrl+y，松开后按英文逗号，展开后是：
```html 
<div id="page">
    <div class="logo"></div>
    <ul id="navigation">
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
    </ul>
    <ul id="navigation">
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
    </ul>
</div>

```

可以看出来：

\#号是表示id 
\.表示class 
\+ 表示同一级的元素
可以用*n 产生多个同名同级的元素
\>表示要包含的元素
\#xxx 默认的这个表示默认div元素，且id为xxx
