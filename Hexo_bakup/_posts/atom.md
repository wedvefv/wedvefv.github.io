---
layout: post
title: atom编辑器
date: 2016：10：09
tags: atom
---
# atom 编辑器

## 比较：
优点：开源，免费，可定制型强，中文支持比sublime做的好，sublime是收费的。
缺点：稍微有一点慢，相对于sublime，画面类似sublime，体积也比较大。

## 发展：
  vim基本都是插件扩展， 插件一般是vimscript编写，现在为了可维护性，加入python支持。
  sublime：也是插件扩展，主要是json配置，可扩展性没atom好。收费，维护仅由编写者维护。       
  atom：开源，界面类似sublime，插件脚本由js编写，利于扩展，社区支持强大。有人说atom是编辑器
  的集大成者。

## windows下安装
1. 需要node.js支持（安装了node.js ，安装npm包管理器（为了解决nodejs代码的部署问题））
2. 安装atom编辑器
3. 打开编辑器，packages->settings-view->manager packages ,安装插件即可。
4. 网络被公司设置代理的，需要设置~/.atom/.apmrc 文件如下：
```js
strict-ssl=false
http-proxy=http://xxxx:xx
https-proxy=https://xxxx:xx
```
有些时候还是提示 atom.io:433访问地址错误。

5. 那么可以登录：https://atom.io/packages/ 搜索需要的插件，进入Repo页面。
复制 git需要的地址。例如qolor插件地址：https://github.com/DavidLGoldberg/qolor.git

6. 进入~/.atom/packages目录下, 打开cmd，执行git clone https://github.com/DavidLGoldberg/qolor.git

7. cd qolor 进入qolor目录，在执行npm install 就会安装 qolor插件了。

8. npm如果需要设置代理，配置文件是~/.npmrc ，写入：
```js
registry=http://registry.cnpmjs.org/
proxy=http://xxx:xx
```
## 测试环境
 windows 8.1

 nodejs-4.6.0

 python2.7.9


 ~表示用户目录。我的是 c:/users/administrator/
