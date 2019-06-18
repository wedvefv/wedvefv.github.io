---
layout: post
title: syntastic vim  静态分析插件
category: vim
tags: vim
date: 2016-10-5 20:10:30
comments: true

---

# syntastic vim  静态分析插件，里面带有各种语言的分析工具，是为了代码补全提示

```html
配置如下：
_vimrc文件加入：
Bundle 'scrooloose/syntastic'
打开vim： BundleInstall 安装插件。
配置如下：
let g:syntastic_error_symbol='>>'
let g:syntastic_warning_symbol='>'
let g:syntastic_check_on_open=1
let g:syntastic_check_on_wq=0
let g:syntastic_enable_highlighting=1
#下面一行是指定使用哪种工具分析python语法和javascript语法
let g:syntastic_python_checkers=['pyflakes'] " 使用pyflakes,速度比pylint快
let g:syntastic_javascript_checkers = ['jsl', 'jshint']
let g:syntastic_html_checkers=['tidy', 'jshint']

```
