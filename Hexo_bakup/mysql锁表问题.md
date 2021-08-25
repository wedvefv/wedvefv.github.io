+++
title="mysql锁表问题测试"
categories=["mysql"]
tags=["mysql"] 
date="2021-08-19 12:00:00+0800"
toc=true
+++


## mysql锁表问题

- 修改表结构的时候: 添加索引， 添加字段，删除字段 

- 对于mysql5.5以及以前的版本都是会锁表的，不允许insert update等写操作.
  - 因此处出现了好多在线迁移工具。

- 对于mysql5.6版本以上，允许在线修DDL了。

- 

## 整理空间碎片

- MyISAM引擎 才支持修复表repair table test， innodb不支持;
- 整理表空间 optimize table，一般建议只对有可变长度的文本数据进行，MyiSAM比较明显。一般一周一月左一次，不建议频繁，且 会锁表。
  - 为什么要锁表呢？
  - alter过程里，数据不停从旧表拷贝到新表，如果这个时候旧表被delete了数据了，那旧表与新表的数据就不一致了，到最后rename 新表 to 旧表表名 时候，数据量就多了
  - 如果在拷贝数据的过程中，对旧表数据的delete，同时对新表也做delete,那数据就一致了，对于update和insert也一样，这个功能可以通过 insert触发器，delete触发器，update触发器实现

- mysql5.5 次操作会锁表，禁止写入。
- mysql5.6.6不会锁表了，但是，如果在主库执行optimize table会**造成从库延迟**，这种情况下，可以使用 optiminze no_write_to_binlog table xxxx ; 这样就不会把optimize操作写入binlog。主库执行完后，再到从库执行optimize table操作。

- 针对innodb引擎，会提示does not support optimize, doing recreate + analyze  instead
  - 实际innodb不支持optimize，实际执行的是重建表加上表分析操作。也会释放空间。
  - mysql5.6.51测试是不支持 alter table tb1 engine=innodb操作的，会提示文件不正确。
  - mysql5.7 支持且推荐用 alter table tb1 engine=innodb；来整理表，重建记录释放空间。
- 使用mysqld --skip-new重启mysqlserver后，可以支持innodb引擎，不再提示上面的recreate信息了。
- 