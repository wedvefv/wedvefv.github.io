---
layout: post
title: VM虚拟机三种联网模式区别
category: linux 
date: 2019-02-21 16:00:00
---


## 1.HOST-ONLY  

![](images/vmnet.png) 

* 对应图中的private to my Mac 选项
* 这种模式不能联网，能通过DHCP分配到ip地址，使用VMnet1网卡作为交换机，默认网关就是VMnet1的地址，能和主机通信，不能连接外网。
* VMnet1网卡作为交换机，一个连接主机HOST，一个端口连接DHCP服务器（一个VM组件），剩下的链接虚拟机，没有提供NAT服务，所以没有路由功能。

## 2.NAT模式，网络地址转换

* 对应图中的 share with my Mac 选项 ，这是共享网络模式

* 这种模式，使用DHCP分配ip地址，使用VMnet8作为交换机，能与主机通信，能连接外网。
* VMnet8网卡作为交换机，一个连接主机HOST，一个端口连接DHCP服务器（一个VM组件），一个端口连接NAT服务器（也是一个VM组件）。剩下端口的链接虚拟机。

* 以上模式，主要是NAT服务器的区别，导致一个能链接外网一个不能。

## 3.Bridged模式，（桥接模式）

* 就是图片中的Bridged NetWorking部分，可以看到有自动模式，WIFI模式，蓝牙模式，因为mac可以用多种方式联网。
* 这种模式对VMnet0，它相当于一个网桥，连接主机和虚拟机，这样虚拟机和你的主机就是两个对等的设备了，当然也是可以联网。

## [虚拟机vmnet0、vmnet1和vmnet8的区别](https://www.cnblogs.com/feifei-cyj/p/7686166.html)