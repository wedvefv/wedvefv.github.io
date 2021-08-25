+++
title="mongodb编译安装"
categories=["linux"] 
tags=["linux"] 
date="2020-06-05 20:06:30+0800"
toc=true
+++

```text

CentOS7 编译安装 Mongodb (实测 笔记 Centos 7.0 + Mongodb 2.6.6)
环境：

系统硬件：vmware vsphere (CPU：2*4核，内存2G，双网卡)

系统版本：CentOS-7.0-1406-x86_64-DVD.iso


安装步骤：

1.准备

1.1 显示系统版本
[root@centos ~]# cat /etc/redhat-release
CentOS Linux release 7.0.1406 (Core)


[root@centos ~]# uname -a
Linux tCentos7 3.10.0-123.13.1.el7.x86_64 #1 SMP Tue Dec 9 23:06:09 UTC 2014 x86_64 x86_64 x86_64 GNU/Linux
1.2 安装基本软件包

[root@centos ~]# yum install vim wget lsof gcc gcc-c++ bzip2 -y

[root@centos ~]# yum install net-tools bind-utils -y


1.3 显示IP地址 (centos7需要先安装 net-tools bind-utils包)

[root@centos ~]# ifconfig|grep inet

inet 192.168.1.10 netmask 255.255.255.0 broadcast 192.168.1.255

 

2.编译安装mongodb

2.1 下载包
[root@centos ~]# cd /usr/local/src/

[root@centos ~]# wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.6.6.tgz

[root@centos ~]# tar -zvxf mongodb-linux-x86_64-2.6.6.tgz

[root@centos ~]# mv mongodb-linux-x86_64-2.6.6 /opt/mongodb/

 

2.2 配置path环境变量,确保mongodb的bin目录包含在path环境变量中。

[root@centos ~]# vim /etc/profile

找到export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL，在这行上面添加以下内容：

#set for mongodb
export MONGODB_HOME=/opt/mongodb
export PATH=$MONGODB_HOME/bin:$PATH

保存退出


[root@centos ~]# echo $PATH

[root@centos ~]# source /etc/profile

[root@centos ~]# echo $PATH

[root@centos ~]# mongod -version

显示以下内容，则表示安装成功
db version v2.6.6
2014-12-18T11:02:15.100+0800 git version: 608e8bc319627693b04cc7da29ecc300a5f45a1f


2.3 建立存储数据及日志的目录：

[root@centos ~]# mkdir -p /data/mongodb/journal

[root@centos ~]# mkdir -p /data/mongodb/log

[root@centos ~]# touch /data/mongodb/log/mongodb.log


2.4 增加mongodb用户及设置权限

[root@centos ~]# useradd mongodb -M -s /sbin/nologin

[root@centos ~]# chown -R mongodb.mongodb /data/mongodb
　　

2.5 建立配置文件

[root@centos ~]# vim /etc/mongodb.conf

输入以下内容

dbpath=/data/mongodb
logpath=/data/mongodb/log/mongodb.log
logappend=true
port=27017
fork=true
noauth=true
nojournal = true
smallfiles = true
noprealloc = true

保存，退出

# **********************************************
#　　mongodb的参数说明：
#
#　　--dbpath 数据库路径(数据文件)
#　　--logpath 日志文件路径
#　　--master 指定为主机器
#　　--slave 指定为从机器
#　　--source 指定主机器的IP地址
#　　--pologSize 指定日志文件大小不超过64M.因为resync是非常操作量大且耗时，

#　　　　最好通过设置一个足够大的oplogSize来避免resync(默认的 oplog大小是空闲磁盘大小的5%)。
#　　--logappend 日志文件末尾添加
#　　--port 启用端口号
#　　--fork 在后台运行
#　　--only 指定只复制哪一个数据库
#　　--slavedelay 指从复制检测的时间间隔
#　　--auth 是否需要验证权限登录(用户名和密码)


2.6 将mongod服务加到开机启动服务

[root@centos ~]# vim /lib/systemd/system/mongodb.service

输入以下内容

[Unit]
Description=mongodb
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/data/mongodb/mongod.lock
ExecStart=/opt/mongodb/bin/mongod -f /etc/mongodb.conf
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target


保存，退出


[root@centos ~]# systemctl enable mongodb.service

[root@centos ~]# systemctl list-unit-files|grep enabled|grep mongodb

[root@centos ~]# systemctl daemon-reload

[root@centos ~]# systemctl start mongodb.service

[root@centos ~]# systemctl status mongodb.service -l


3 测试数据库是否正常

[root@centos ~]# ps -ef|grep mongod

[root@centos ~]# mongo admin

添加admin用户名密码,使用创建的用户登录MongoDB：

> show dbs

> use admin

> db.addUser('admin','manager')

> db.auth('admin','manager')

> show collections

> db.system.users.find()

> exit


4 防火墙添加27017端口

[root@centos ~]# iptables -L|grep ACCEPT

[root@centos ~]# firewall-cmd --zone=public --add-port=27017/tcp --permanent

[root@centos ~]# firewall-cmd --reload

[root@centos ~]# iptables -L|grep ACCEPT

```