---
layout: post
title: linux虚拟机配置静态ip
category: linux 
date: 2019-02-12 14:00:00

---


## 1. mac上的虚拟机使用（自动模式）就是桥接模式。

![](images/vmnet.png)


## 2. 查看自己的网卡名

* ifconfig 命令
```shell
[root@localhost ~]# ifconfig
ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.2.132  netmask 255.255.255.0  broadcast 192.168.2.255
        inet6 fe80::315:b3ba:674b:3fdc  prefixlen 64  scopeid 0x20<link>
        ether 00:0c:29:14:d2:38  txqueuelen 1000  (Ethernet)
        RX packets 56630  bytes 20928797 (19.9 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 24078  bytes 2636531 (2.5 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1  (Local Loopback)
        RX packets 2517  bytes 223561 (218.3 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2517  bytes 223561 (218.3 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0


```

* 我的网卡就是ens33,下面lo是本地回环地址，ip是127.0.0.1

## 修改网卡配置文件
vim /etc/sysconfig/network-scripts/ifcfg-ens33
  
```shell

  1 TYPE=Ethernet
  2 PROXY_METHOD=none
  3 BROWSER_ONLY=no
  4 #BOOTPROTO=dhcp
  5 DEFROUTE=yes
  6 IPV4_FAILURE_FATAL=no
  7 IPV6INIT=yes
  8 IPV6_AUTOCONF=yes
  9 IPV6_DEFROUTE=yes
 10 IPV6_FAILURE_FATAL=no
 11 IPV6_ADDR_GEN_MODE=stable-privacy
 12 NAME=ens33
 13 UUID=5e4d74e0-4fd2-48b9-8856-a206acc5b6ea
 14 DEVICE=ens33
 15 #ONBOOT=yes
 16 
 17 # 下面是新增的部分，上面的BOOTPROTO和ONBOOT注释掉。
 18 # static config
 19 NM_CONTROLLED=no # use config file not network manager.
 20 BOOTPROTO=static
 21 ONBOOT=yes
 22 IPADDR=192.168.2.132
 23 NETMASK=255.255.255.0
 24 GATEWAY=192.168.2.1
 25 

``` 

## 设置DNS

vim /etc/sysconfig/network
```shell
	# 这个文件主要是设置HOSTNAME,设置是否启动网络，需要reboot，如果修改网关，重启service就行了
	写入：
	DNS1=8.8.8.8
	DNS2=114.114.114.114
	GATEWAY=192.168.2.1 # 一般是路由器的ip，我家两个路由器，一个是192.168.1.1，一个是192.168.2.1。
	
	
```

## 重启服务

```shell
service network restart
```
