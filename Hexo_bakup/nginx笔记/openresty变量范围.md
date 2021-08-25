+++
title="openresty 变量"
categories=["openresty"] 
tags=["openresty"] 
date="2019-06-30 14:00:00+0800"
toc=true
+++


### NGX_LUA的三种变量范围

1. 进程间共享， nginx的所有work进程共享，使用lua_shared_dict定义，这样高并发就出触发锁。

2. 进程内共享，lua代码中不加local关键字就是全局变量，这样的变量在同一个进程的所有请求之间共享,因为开启了lua缓存，每个work的VM虚拟机都会缓存全局变量.

3. 同一个请求，比如local声明的或者ngx.ctx

4. lua_shared_dict 有模块[lua-resty-lrucache](https://github.com/openresty/lua-resty-lrucache)可以实现在一个work中共享，由于nginx是单进程的，所以永远不会触发锁
就是兼顾效率而且没有锁的问题，缺点内存比进程间共享占用比较大。