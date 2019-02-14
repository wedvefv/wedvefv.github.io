---
layout: post
title: git 常见操作 
category: git 
tags: git 
date: 2018-05-26 12:00:00
comments: true

---

## 创建分支

```shell
	git branch new_branch
```

## 本地删除分支

```shell
	git branch -D delete_branch 
```
## 更新到远程删除分支 

```shell
	git checkout master 
	git pull -u   -u origin :delete_branch
```


## git pull 失败提示fatal: refusing to merge unrelated histories ,处理方法

```shell
	git pull origin master --allow-unrelated-historiesn

```

# 查看提交提记录

```shell
	git log
	git log -p -2  #查看最近两次的提交差异
	git log --stat #仅仅现实行数的变更
	git log --pretty=oneline #每次提交，在一行显示
	git log --pretty=format:"%h - %an, %ar : %s"   #格式显示
```
 |选项	|说明|
 |--|--|
 |%H	|提交对象（提交）的完整哈希字串|
 |%h	|提交对象的简短哈希字串|
 |%T	|树对象（树）的完整哈希字串|
 |%t	|树对象的简短哈希字串|
 |%P	|父对象（父）的完整哈希字串|
 |%p	|父对象的简短哈希字串|
 |%an	|作者（作者）的名字|
 |%ae	|作者的电子邮件地址|
 |%ad	|作者修订日期（可以用-date =选项定制格式）|
 |%ar	|作者修订日期，按多久以前的方式显示|
 |%cn	|提交者（提交者）的名字|
 |%ce	|提交者的电子邮件地址|
 |%cd	|提交日期|
 |%cr	|提交日期，按多久以前的方式显示|
 |%s	|提交说明|

# 待续......

