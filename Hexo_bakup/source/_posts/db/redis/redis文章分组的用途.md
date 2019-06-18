---
layout: post
title: redis文章分组的用途
category: redis 
date: 2019-02-22 15:50:00
---


## 文章分组的用途
- 文章分组，可以用set结构存储同一个分组的文章id
- set可以和zset使用zinterstore命令求交集，set默认的score是1， zset默认的一般不是1，可以指定参数max，取score大的值。
- 比如获取一个分组A中的文章按时间排序，就拿这个分组和发布时间集合zset求交集，交集可以取一个临时名字，设置有效期60s。
- 比如获取一个分组B中的文章按照评分大小排序，就拿这个分组和评分集合zset求交集。
- 一般接口直接就拿redis获取的数据返回了。


