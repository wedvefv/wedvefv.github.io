(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{454:function(o,t,n){"use strict";n.r(t);var e=n(56),v=Object(e.a)({},(function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[n("h1",{attrs:{id:"centos7-编译安装mongodb"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#centos7-编译安装mongodb"}},[o._v("#")]),o._v(" centos7 编译安装mongoDB")]),o._v(" "),n("p",[o._v("CentOS7 编译安装 Mongodb (实测 笔记 Centos 7.0 系统硬件：vmware vsphere (CPU：2*4核，内存2G，双网卡)")]),o._v(" "),n("p",[o._v("系统版本：CentOS-7.0-1406-x86_64-DVD.iso")]),o._v(" "),n("p",[o._v("安装步骤：")]),o._v(" "),n("p",[o._v("1.准备")]),o._v(" "),n("p",[o._v("1.1 显示系统版本\n[root@centos ~]# cat /etc/redhat-release\nCentOS Linux release 7.0.1406 (Core)")]),o._v(" "),n("p",[o._v("[root@centos ~]# uname -a\nLinux tCentos7 3.10.0-123.13.1.el7.x86_64 #1 SMP Tue Dec 9 23:06:09 UTC 2014 x86_64 x86_64 x86_64 GNU/Linux\n1.2 安装基本软件包")]),o._v(" "),n("p",[o._v("[root@centos ~]# yum install vim wget lsof gcc gcc-c++ bzip2 -y")]),o._v(" "),n("p",[o._v("[root@centos ~]# yum install net-tools bind-utils -y")]),o._v(" "),n("p",[o._v("1.3 显示IP地址 (centos7需要先安装 net-tools bind-utils包)")]),o._v(" "),n("p",[o._v("[root@centos ~]# ifconfig|grep inet")]),o._v(" "),n("p",[o._v("inet 192.168.1.10 netmask 255.255.255.0 broadcast 192.168.1.255")]),o._v(" "),n("p",[o._v("2.编译安装mongodb")]),o._v(" "),n("p",[o._v("2.1 下载包\n[root@centos ~]# cd /usr/local/src/")]),o._v(" "),n("p",[o._v("[root@centos ~]# wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.6.6.tgz")]),o._v(" "),n("p",[o._v("[root@centos ~]# tar -zvxf mongodb-linux-x86_64-2.6.6.tgz")]),o._v(" "),n("p",[o._v("[root@centos ~]# mv mongodb-linux-x86_64-2.6.6 /opt/mongodb/")]),o._v(" "),n("p",[o._v("2.2 配置path环境变量,确保mongodb的bin目录包含在path环境变量中。")]),o._v(" "),n("p",[o._v("[root@centos ~]# vim /etc/profile")]),o._v(" "),n("p",[o._v("找到export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL，在这行上面添加以下内容：")]),o._v(" "),n("p",[o._v("#set for mongodb\nexport MONGODB_HOME=/opt/mongodb\nexport PATH=$MONGODB_HOME/bin:$PATH")]),o._v(" "),n("p",[o._v("保存退出")]),o._v(" "),n("p",[o._v("[root@centos ~]# echo $PATH")]),o._v(" "),n("p",[o._v("[root@centos ~]# source /etc/profile")]),o._v(" "),n("p",[o._v("[root@centos ~]# echo $PATH")]),o._v(" "),n("p",[o._v("[root@centos ~]# mongod -version")]),o._v(" "),n("p",[o._v("显示以下内容，则表示安装成功\ndb version v2.6.6\n2014-12-18T11:02:15.100\n2.3 建立存储数据及日志的目录：")]),o._v(" "),n("p",[o._v("[root@centos ~]# mkdir -p /data/mongodb/journal")]),o._v(" "),n("p",[o._v("[root@centos ~]# mkdir -p /data/mongodb/log")]),o._v(" "),n("p",[o._v("[root@centos ~]# touch /data/mongodb/log/mongodb.log")]),o._v(" "),n("p",[o._v("2.4 增加mongodb用户及设置权限")]),o._v(" "),n("p",[o._v("[root@centos ~]# useradd mongodb -M -s /sbin/nologin")]),o._v(" "),n("p",[o._v("[root@centos ~]# chown -R mongodb.mongodb /data/mongodb")]),o._v(" "),n("p",[o._v("2.5 建立配置文件")]),o._v(" "),n("p",[o._v("[root@centos ~]# vim /etc/mongodb.conf")]),o._v(" "),n("p",[o._v("输入以下内容")]),o._v(" "),n("p",[o._v("dbpath=/data/mongodb\nlogpath=/data/mongodb/log/mongodb.log\nlogappend=true\nport=27017\nfork=true\nnoauth=true\nnojournal = true\nsmallfiles = true\nnoprealloc = true")]),o._v(" "),n("p",[o._v("保存，退出")]),o._v(" "),n("h1",{attrs:{id:""}},[n("a",{staticClass:"header-anchor",attrs:{href:"#"}},[o._v("#")]),o._v(" **********************************************")]),o._v(" "),n("p",[o._v("#　　mongodb的参数说明：")]),o._v(" "),n("h1",{attrs:{id:"-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#-2"}},[o._v("#")])]),o._v(" "),n("p",[o._v("#　　--dbpath 数据库路径(数据文件)\n#　　--logpath 日志文件路径\n#　　--master 指定为主机器\n#　　--slave 指定为从机器\n#　　--source 指定主机器的IP地址\n#　　--pologSize 指定日志文件大小不超过64M.因为resync是非常操作量大且耗时，")]),o._v(" "),n("p",[o._v("#　　　　最好通过设置一个足够大的oplogSize来避免resync(默认的 oplog大小是空闲磁盘大小的5%)。\n#　　--logappend 日志文件末尾添加\n#　　--port 启用端口号\n#　　--fork 在后台运行\n#　　--only 指定只复制哪一个数据库\n#　　--slavedelay 指从复制检测的时间间隔\n#　　--auth 是否需要验证权限登录(用户名和密码)")]),o._v(" "),n("p",[o._v("2.6 将mongod服务加到开机启动服务")]),o._v(" "),n("p",[o._v("[root@centos ~]# vim /lib/systemd/system/mongodb.service")]),o._v(" "),n("p",[o._v("输入以下内容")]),o._v(" "),n("p",[o._v("[Unit]\nDescription=mongodb\nAfter=network.target remote-fs.target nss-lookup.target")]),o._v(" "),n("p",[o._v("[Service]\nType=forking\nPIDFile=/data/mongodb/mongod.lock\nExecStart=/opt/mongodb/bin/mongod -f /etc/mongodb.conf\nExecReload=/bin/kill -s HUP $MAINPID\nExecStop=/bin/kill -s QUIT $MAINPID\nPrivateTmp=true")]),o._v(" "),n("p",[o._v("[Install]\nWantedBy=multi-user.target")]),o._v(" "),n("p",[o._v("保存，退出")]),o._v(" "),n("p",[o._v("[root@centos ~]# systemctl enable mongodb.service")]),o._v(" "),n("p",[o._v("[root@centos ~]# systemctl list-unit-files|grep enabled|grep mongodb")]),o._v(" "),n("p",[o._v("[root@centos ~]# systemctl daemon-reload")]),o._v(" "),n("p",[o._v("[root@centos ~]# systemctl start mongodb.service")]),o._v(" "),n("p",[o._v("[root@centos ~]# systemctl status mongodb.service -l")]),o._v(" "),n("p",[o._v("3 测试数据库是否正常")]),o._v(" "),n("p",[o._v("[root@centos ~]# ps -ef|grep mongod")]),o._v(" "),n("p",[o._v("[root@centos ~]# mongo admin")]),o._v(" "),n("p",[o._v("添加admin用户名密码,使用创建的用户登录MongoDB：")]),o._v(" "),n("blockquote",[n("p",[o._v("show dbs")])]),o._v(" "),n("blockquote",[n("p",[o._v("use admin")])]),o._v(" "),n("blockquote",[n("p",[o._v("db.addUser('admin','manager')")])]),o._v(" "),n("blockquote",[n("p",[o._v("db.auth('admin','manager')")])]),o._v(" "),n("blockquote",[n("p",[o._v("show collections")])]),o._v(" "),n("blockquote",[n("p",[o._v("db.system.users.find()")])]),o._v(" "),n("blockquote",[n("p",[o._v("exit")])]),o._v(" "),n("p",[o._v("4 防火墙添加27017端口")]),o._v(" "),n("p",[o._v("[root@centos ~]# iptables -L|grep ACCEPT")]),o._v(" "),n("p",[o._v("[root@centos ~]# firewall-cmd --zone=public --add-port=27017/tcp --permanent")]),o._v(" "),n("p",[o._v("[root@centos ~]# firewall-cmd --reload")]),o._v(" "),n("p",[o._v("[root@centos ~]# iptables -L|grep ACCEPT")]),o._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code")]),o._v(" "),n("div",{staticClass:"line-numbers-wrapper"})])])}),[],!1,null,null,null);t.default=v.exports}}]);