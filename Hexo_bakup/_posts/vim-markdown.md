---
layout: post
title: vim-markdown插件
date: 2016-10-27
tags: vim 

---

# 首先为了高亮显示markdown文件 ，安装vim-markdown插件(vundle管理的)

```shell
Plugin 'godlygeek/tabular'
Plugin 'tpope/vim-markdown'
```

# 安装时时预览插件 只支持macos/linux ,打开markdown文件就会出现浏览器窗口预览

```shell
"Plugin 'suan/vim-instant-markdown' 
```
#windows 下有一个python2支持的插件，也能预览

需要python2的支持--python2.7就可以。
需要nodejs的支持，自行安装。
完成后：

```shell
npm -g install instant-markdown-d
```

在vim配置文件中添加:

```shell
Plugin 'suan/vim-instant-markdown'
```
打开vim 更新安装插件 ：

```shell
:PluginInstall
```



