---
layout: post
title: git_linux搭建服务器 
category: git 
tags: git 
date: 2019-03-02 12:00:00
comments: true

---

## 为什么本地搭建一个git服务器

- 对于自己学习使用的代码，在没有网络的情况下不能用github，gitlab,所以本地建立一个git服务器。

## git服务器环境准备centos7


## 服务端创建git用户
```shell
	id git # 查看是否存在git用户，存在就不创建了。
	useradd git
	passwd git
	输入密码，我设置的是xxx@123
	
```


## 客户端开启公钥认证认证，免密push/pull

- 首先服务端需要开启ssh服务
```shell
vim /etc/ssh/sshd_config
RSAAuthentication yes 
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
如果是centos7.4以上（含7.4），ssh1已经不支持了，只支持ssh2代协议。所以RSAAuthentication项是没有的

```
- 客户端执行 执行ssh-keygen -t rsa 生成公钥和私钥
- 复制客户端公钥到服务器端ssh-copy-id -i ~/.ssh/id_rsa.pub git@192.168.61.128 



## 服务端创建git仓库
```shell
	mkdir -p /data/git/gittest.git
	
	# 初始化这个仓库
	cd /data/git/gittest.git
	git init --bare .
	
	# 目录所属用户设置
	chown -R git:git /data/git 
	
```

## 客户端clone远程仓库
```shell
	mkdir localgit
	cd localgit
	git clone git@192.168.61.128:/data/git/gittest.git .
	# 提示输入服务端git账户的密码。
	#修改完就可以提交了
	
	touch abc.txt
	git add .
	git commit -m 'aaa'
	git push 
	
```

















