+++
title="tcp连接过程，半连接队列和全连接队列"
categories=["linux"] 
tags=["linux"] 
date="2019-02-15 12:06:00+0800"
toc=true
+++



## tcp三次握手的过程

- 第一次：客户端发送SYN(Synchronize Sequence Numbers)报文，标志位SYN=1,序列号seq=j。
- 第二次：服务端收到SYN报文后，回应ACK(Acknowledgement)，标志位ACK=1,确认号ack为j+1， 同时自己也发送一个SYN报文，SYN=1,序列号seq假设为k， 即一个ACK+SYN包
- 第三次：客户端收到报文后，发送一个ACK报文，标志位ACK=1，确认号ack=(k+1) 到服务器，客户端和服务器进入ESTABLISHED状态，TCP链接成功。
- SYN是同步报文标志位，建立连接时为1，连接建立后置为0，ACK时确认标志位一般为1

## tcp四次挥手过程，为什么是4次呢？

- 假如客户端主动发起关闭操作
- 第一次： 客户端发送FIN报文，假设为序列号seq=i给服务器。
- 第二次： 服务发送ACK报文，ack=(i+1)给客户端，可能数据还没有接收完毕，所以服务端socket状态由ESTABLISHED -> CLOSE_WAIT状态。
- 第三次： 服务端端处理完毕，发送FIN报文，序列号为j。
- 第四次： 客户端收到报文后，发送ACK报文，ack=j+1, 并进入TIME_WAIT状态。等待2MSL后自动关闭

> * 为什么客户端不发完ack就释放呢，因为服务器可能没收到ack，服务器会重新发送FIN请求关闭连接，客户端重新发送ack，所以一个来回就是2
个报文周期。当连接处于2MSL等待阶段时任何迟到的报文段都将被丢弃。

借用一张图表示一下
![aa](https://img-blog.csdnimg.cn/20190214095421560.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pXRTc2MTYxNzU=,size_16,color_FFFFFF,t_70)


## 如果已经建立了连接，但是客户端突然出现故障了怎么办？

> TCP还设有一个保活计时器，显然，客户端如果出现故障，服务器不能一直等下去，白白浪费资源。服务器每收到一次客户端的请求后都会重新复位这个计时器，时间通常是设置为2小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔75分钟发送一次。若一连发送10个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。


## 查看网络链接的命令

* 查看不同状态的链接数
> * netstat -an | awk '/^tcp/ {++y[$NF]} END {for(w in y) print w, y[w]}'



## 半连接状态队列sync_queue和全连接队列accept_queue

 * 第一种实现：
> - BSD实现和在linux2.2之前，listen系统调用backlog参数表示半链接+全链接队列数之和
> - 当队列满了以后，服务端再收到SYN时，将不会返回SYN/ACK。比较优雅的处理方法就是不处理这条连接，不返回RST，让客户端重试.
> - accept系统调用只是简单地从完成队列中取出连接.
* 第二种实现：
> - linux内核2.2以上的版本，SYN_RCVD队列的大小由proc/sys/net/ipv4/tcp_max_syn_backlog系统参数指定，ESTABLISHED队列由backlog和/proc/sys/net/core/somaxconn中较小的指定

- ![](http://img2.cnxct.com/2015/06/tcp-sync-queue-and-accept-queue-small.jpg)
 

* 如果全连接队列满了怎么办？

> - 服务器不予处理，这样客户端会任务数据丢失，重新发送ack确认，如果服务器有空间，会重新加入到ESTABLISHED队列。

* 如果client端没收到服务器发来的FIN，那么client会一直是FIN_WAIT_2吗？

> - 设置系统变量
> - sysctl -w net.ipv4.tcp_fin_timeout=5  
> - 直接ctrl+c杀死客户端，发现FIN_WAIT_2的状态的链接，一会就消失了，并不会进入TIMEWAIT状态。

* 怎么查看链接状态呢？

```sh
netstat -natp | grep 8888

#8888是服务端监听的端口，因为tcp链接总是有一端是8888端口的。
```

* 查看每个ip和服务器的连接数

```sh
netstat -nat|awk '{print$5}'|awk -F : '{print$1}'|sort|uniq -c|sort -rn
```

* 什么是MSL呢？

> - linux上的定义，就是60s

```c
#define TCP_TIMEWAIT_LEN (60*HZ) /* how long to wait to destroy TIME-WAIT
                  * state, about 60 seconds */
```

* 全连接队列满了怎么办呢？
> -  服务器根据 /proc/sys/net/ipv4/tcp_abort_on_overflow的值处理
> - 0 表示丢弃ack，让客户端重新发ack
> - 1 表示表示发送一个RST给客户端，直接废弃掉这个握手过程，客户端会出现connection reset by peer的错误


* [tcp协议RFC文档](https://tools.ietf.org/html/rfc793)
* [参考链接1](https://blog.csdn.net/yangbodong22011/article/details/60399728)
* [参考链接2](https://blog.csdn.net/hhhanpan/article/details/79388945)
* [参考链接3](https://blog.csdn.net/dog250/article/details/81256550)
* [socket耗尽，半连接队列限制](https://blog.csdn.net/jhcsdb/article/details/34921167)
* [参考链接4](https://www.cnblogs.com/jessezeng/p/5617105.html)