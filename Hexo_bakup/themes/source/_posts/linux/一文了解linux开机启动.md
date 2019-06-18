---
layout: post
title: 如何在centos7中添加开机启动项
category: linux
tags: hexo
date: 2019-6-08 10:34:58
comments: true
---

#### 1. linux的启动等级
0 关机模式
1 单用户模式
2 无网络多用户模式
3 有网络多用户模式，如果没网络和2一样。
4.系统保留，未使用
5.GUI图形界面
6.重启模式，默认不能是这个级别，否则就会无限循环重启
* *正常默认就是3了, 命令行模式，有桌面的，应该默认是5.*
* *关机就可以终端输入init 0，重启就init 6*

7.默认级别在centos7之前是/etc/inittab文件设置的，之后就由systemctl接管了
* 查看默认运行级别的方式为:
> systemctl get-default
* 设置默认运行级别的方式:
> systemctl set-default TARGET.target


*级别分别对应如下: *
* > shutdown.target
* > emergency.target
* > rescure.target
* > multi-user.target
* > 无
* > graphical.target
* > 无

#### 2. 每个等级，系统初始化运行了哪些脚本呢

* /etc/init.d/ 目录是个软连接 实际是/etc/rc.d/init.d
* /etc/rc1.d/
* /etc/rc2.d/
* /etc/rc3.d/
* /etc/rc4.d/
* /etc/rc5.d/
* /etc/rc6.d/ 以上6个目录也都是软连接，实际是/etc/rc.d/目录下的


* *最终就是/etc/rc.d/init.d/ 和/etc/rc.d/rcX.d/目录了*
* *但是rcX.d/目录下的文件实质也是软连接，指向/etc/rc.d/init.d/目录下的脚本*


#### 3. 添加开机启动项(chkconfig)
* 经过之前的分析，实际上就是/etc/rc.d/init.d 目录下的东东，分析发现 都是shell脚本
* 脚本 按自己的操作写就ok
* 比如你写一个nginx自启动的脚本/etc/rc.d/init.d/nginx

```shell
#! /bin/bash

#chkconfig: 2345 80 90
#description:auto_run
. /etc/init.d/functions
if [ "$1" == "start" ]; then
    /usr/local/openresty/nginx/sbin/nginx
    exit  0
fi

if [ "$1" == "stop" ]; then
    /usr/local/openresty/nginx/sbin/nginx -s stop
    exit  0
fi


if [[ $1 == 'reload' ]]; then
    /usr/local/openresty/nginx/sbin/nginx -s reload
    exit  0
fi

echo "sh nginx start|stop|reload"
```
* chmod +x nginx
* chkconfig --add nginx (老写法：chkconfig nginx on)
* **这样在对应等级rcX.d/目录下就会生成对应的链接，K开头脚本这个服务关闭，S开头的脚本是这个服务要开启.**
* 每个添加的自启动脚本必须要有2行注释：
* > #chkconfig: 2345 80 90
* > #description:nginx_test 可以随便写描述
*  centos7 开头这么加也可以
```shell
### BEGIN INIT INFO
# Provides:          php-fpm
# Required-Start:    $remote_fs $network
# Required-Stop:     $remote_fs $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts php-fpm
# Description:       starts the PHP FastCGI Process Manager daemon
### END INIT INFO
```
* 解释下: 2345表示四个启动等级可以需要运行nginx服务; 在rc2|3|4|5.d目录下生成S**80**nginx脚本，rc0|6.d目录下生成K**90**nginx脚本都指向/etc/rc.d/init.d/nginx脚本（80，90为了标识脚本含义是开启还是关闭，虽然脚本内容一样，但是**K开头执行时加参数 stop，S开头的执行时加参数 start**）

#### 4. 在rc.local文件中添加启动项
* /etc/rc.d/init.d/rc.local 这个是init.d--> rc.d 执行或之后执行的脚本，通常是用户自己定义的一些开机启动任务.

* **下次总结一下Centos6的启动顺序**
