+++
title="ipv6配置"
categories=["linux"] 
tags=["linux"] 
date="2020-09-18 20:00:00+0800"
toc=true
+++


### ipv6格式
   - 冒号分割， 每一段都是16位，一般显示4个16进制数， xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx
   - 连续的0 可以用两个冒号表示 就会出现 fe80::315:b3ba:674b:3fdc的 ，实际上是
fe80:0000:0000:0000:0315:b3ba:674b:3fdc

### linux中的ipv6有两种类型 
   - Scope:Global
   - Scope:Link  这种方式是由mac地址按照一定格式转换出来的全球唯一本地链路


### ping 
 -  Scope:Link  这种方式直接ping6 fe80::315:b3ba:674b:3fdc 会连接不上，不通。
 -   需要绑定一个网卡这样操作才能ping通： ping6 -I eht0  fe80::315:b3ba:674b:3fdc

### nginx 配置
 - listen [::]:80;
- nginx最近版本都默认支持ipv6了，不需要编译指定 --with-ipv6了。

      
### 配置 Scope:Global 类型的ipv6地址
 - vim /etc/sysconfig/network-scripts/ifcfg-eth0
  ```
 IPV6INIT=yes
 IPV6_AUTOCONF=no
 IPV6ADDR=2003:ac18::30a/64
 IPV6_DEFAULTGW=2003:ac18/64 
  ```
- service network restart 重启网络服务
- 查看ip, ip addr  会看到 inet6 2003:ac18::30a/64 scope global 
- 这样可以ping6 直接ping通, ping6 2003:ac18::30a
- curl 也可以: curl -6 -g http://[2003:ac18::30a]:80/lua
-  ipv6地址需要使用中括号把地址括起来，端口80也可以省略
-  -6是ipv6; -g是表示使用{}或者[]限定范围, 或者禁用网址序列。


[ipv6格式介绍](https://www.jianshu.com/p/3c8a4cce9cd1)