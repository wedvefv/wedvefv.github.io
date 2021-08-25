+++
title="nginx如何server_name和http版本"
categories=["nginx"] 
tags=["nginx"] 
date="2020-08-03 23:00:00+0800"
toc=true
+++

# nginx 的http版本的问题
  - http1.0 需要客户端请求header 指明 connection：keep-alive 表明长链接， 请求完不会立刻关闭。
  - http1.1 默认就是connection: keep-alive的， 大部分脚本语言发送http默认都是1.1了。
  - 问题来了： 如果访问的域名没有配置到server_name后，或者使用的ip访问， nginx如何处理？
  - 没配置server_name， nginx就找不到配置文件处理对应接口，就会自动设置server_name匹配""，表示不匹配任何域名，就会交给其他server配置处理 
  - 这样即使你客户端http的请求header使用connection: keep-alive了，nginx依旧会认为connection是close，且使用http1.0 响应。
  - 这样就表示短链接，表示http客户端发送完请求到nginx后，客户端会主动断开链接，导致nginx服务器产生大量TIME_WAIT状态的tcp链接
  - 大量TIME_WAIT会占用内存，达到内核限制的的tcp TIME_WAIT状态的连接数限制， 进而导致nginx处理不了后续进来的请求
  - 客户端就会报错...  
