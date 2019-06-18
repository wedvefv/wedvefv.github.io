---
layout: post
title: redis文章发布
category: redis
date: 2019-02-22 15:50:00
---

## 定时任务发布方式

- 如果有后台发布文章，需要有定时任务将mysql中录入的文章同步到redis中
- 1. 这时候文章id当然是mysql自增产生的，生成一个文章id表示的文章内容 
```py
	conn.hmset("article:100:hash",{属性字典}）
``` 
- 2. 作者发布的文章，文章的投票者集合当然有作者，需要设置投票集合。
```py
	conn.sadd("artile:100:set",atrticle.uid)
	conn.expire("artile:100:set",7*86400) # 一周有效期
```

- 3. 文章的评分zset初始化,文章发布时间集合初始化。
```py
	conn.zincrby("article:100:score:zset",432)， 432 是一个投票的评分。
	conn.zadd("article:time:zset",article_id, now) 
```


## 如果是没有mysql，完全用redis这时候，文章id就需要一个string类型的key自增产生，其余步骤一致。
