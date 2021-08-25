+++
title="mysql join查询优化"
categories=["mysql"] 
tags=["mysql"] 
date="2020-12-25 00:33:58+0800"
toc=true
+++

# mysql join 方式


### 外连接 可以省略outer关键字
- A left join  B 按on条件取交集，在加上A剩余部分， A是主表。
- A right join B 按on条件取交集，再加上B剩余部分，b是主表。

## 内连接 inner join
- 两个表按on条件取交集的意思。
- select * from A  inner join  B ON  A.x = b.x

- select *from A, B  where A.x = b.x 

- 第一中方式mysql会默认转成下面的方式。


## 外连接 （full ）outer join 
- mysql 不支持，可以用left join结果 union  right join的结果
- 也就是取并集， 把A独有的，B独有的，AB共有的都取了。



## 内连接inner join 如何join
- 如果A表 1万条， B表 2万条， inner join 没有on条件的话：
   - 如果按SQL标准，可能是先求笛卡尔积 cross join 出虚拟表v1（2亿条数据)，在用ON条件和where 条件过滤，
   - mysql做了优化， 用小表A作为驱动表，作为外循环，取查询关联的大表，取出符合on条件的，顺便根据where条件过滤掉不符和条件的。
   - 这样1万join2万，的出来的结果可能是符合on的1万条，满足where条件的 9000条。


## 驱动表的选择
- left join 使用左表作为驱动表， right 是右表是驱动表
- inner join，mysql会先扫描出相关表， **拿数据少的作为驱动表**

- 无论 left join, right join, inner join mysql都有自己的优化算法，不会傻傻的直接两层循环，这样被驱动表就会频繁读取驱动表，效率很慢
- mysql优化了算法： 
	- 而是把驱动表的部分数据先存入缓存，这样被驱动表就避免读取驱动表表，会加快很多，实质还是A cross join B。


## 总结
- 多个join， 最好把小表作为驱动表，放前面
- 多个join，是驱动表的一条记录匹配贯穿到底和其他关联之后，在去另一条记录重复前面的操作, 而不是前两个表join完了，在join第三个表。
- 如果inner join的表有where 条件， mysql会自己优化，先根据where条件过滤无用的记录，然后确定哪个表小就作为驱动表。
- 索引嵌套循环： 驱动表逐条记录和被驱动表的索引进行匹配，减少直接和被驱动表比较的次数。



[参考链接-MYSQL的联表细节](https://www.cnblogs.com/youzhibing/p/12004986.html)

