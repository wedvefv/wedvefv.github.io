+++
title="linux常用命令"
categories=["linux"] 
tags=["linux"] 
date="2020-08-27 14:00:00+0800"
toc=true
+++


## 查看centos版本

* rpm -q centos-release

## 查看是否安装ssh

* rpm -qa | grep ssh 
* 没有则 yum install openssh-server
* /etc/init.d/sshd status|start|stop
* netstat -antp | grep sshd
* 查看运行级别 chkconfig --list sshd
* 开启 chkconfig --level 2345 sshd on
* 开机启动 chkconfig sshd on

## 安装go语言 通过源
* rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
* yum install golang -y
* 查看go所在目录然后配置环境变量
* export PATH=$PATH:$GOPATH/bin

## 升级centos6的gcc到4.8
* wget http://people.centos.org/tru/devtools-2/devtools-2.repo
* mv devtools-2.repo /etc/yum.repos.d
* yum install devtoolset-2-gcc devtoolset-2-binutils devtoolset-2-gcc-c++

```
保存以前的gcc
mv /usr/bin/gcc /usr/bin/gcc-4.4.7
mv /usr/bin/g++ /usr/bin/g++-4.4.7
mv /usr/bin/c++ /usr/bin/c++-4.4.7
 
#为新版本的gcc创建软连接
ln -s /opt/rh/devtoolset-2/root/usr/bin/gcc /usr/bin/gcc
ln -s /opt/rh/devtoolset-2/root/usr/bin/c++ /usr/bin/c++
ln -s /opt/rh/devtoolset-2/root/usr/bin/g++ /usr/bin/g++

```


# 查看动态库所在的包名
* yum whatprovides /usr/lib64/libopcodes-2.20.51.0.2-5.48.el6_10.1.so 
* 最好写全路径

