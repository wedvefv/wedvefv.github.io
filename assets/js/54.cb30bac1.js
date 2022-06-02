(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{449:function(_,v,i){"use strict";i.r(v);var l=i(56),a=Object(l.a)({},(function(){var _=this,v=_.$createElement,i=_._self._c||v;return i("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[i("h1",{attrs:{id:"数据库层级优化"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#数据库层级优化"}},[_._v("#")]),_._v(" 数据库层级优化")]),_._v(" "),i("ul",[i("li",[_._v("数据库性能取决于几个因素，比如表，查询，数据库配置。")]),_._v(" "),i("li",[_._v("必须考虑cpu和磁盘io的情况，研究数据库性能需要学习高级规则，和性能测试。")]),_._v(" "),i("li",[_._v("恰当的使用表字段类型，多列少表还是，多表少列")]),_._v(" "),i("li",[_._v("正确的使用索引")]),_._v(" "),i("li",[_._v("使用选择合适的引擎 innodb或者MyISAM(非事务)")]),_._v(" "),i("li",[_._v("每个表的行格式， 压缩表能占用更少的磁盘空间，也会减少磁盘io， 可用于innodb表或者myisam只读表")]),_._v(" "),i("li",[_._v("使用合适的锁策略， 一般innodb能保证并发性，且减少用户调优代码和测试")]),_._v(" "),i("li",[_._v("缓存池配置，主要配置的内存区域包括InnoDB缓冲池、MyISAM密钥缓存和MySQL查询缓存。")])]),_._v(" "),i("h2",{attrs:{id:"硬件层面优化"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#硬件层面优化"}},[_._v("#")]),_._v(" 硬件层面优化")]),_._v(" "),i("ul",[i("li",[i("p",[_._v("磁盘检索速度： 使用现代磁盘通常io操作在10ms内，一秒大概100次操作。而且很难提高，优化寻道速度就是把数据放到不同的磁盘。")])]),_._v(" "),i("li",[i("p",[_._v("磁盘读写速度：一般磁盘吞吐量是10-20M/s, 优化方向就是并行读取多个磁盘。")])]),_._v(" "),i("li",[i("p",[_._v("内存： 相对于大表，内存是限制因素，所以小表通常很快。")])]),_._v(" "),i("li",[i("p",[_._v("内存带宽限制： 贷款=总线宽度×总线频率×一个时钟周期内交换的数据包个数")])])]),_._v(" "),i("h2",{attrs:{id:"sql语句优化"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#sql语句优化"}},[_._v("#")]),_._v(" SQL语句优化")]),_._v(" "),i("ul",[i("li",[_._v("增加索引，为了避免磁盘，选择一组小的索引加快查询速度")]),_._v(" "),i("li",[_._v("可以用explain 查看索引使用情况")]),_._v(" "),i("li",[_._v("隔离优化查询中耗时的操作，比如函数操作")]),_._v(" "),i("li",[_._v("尽量减少扫描行数")]),_._v(" "),i("li",[_._v("定期使用 ANALYZE table ，保证统计信息最新，已便优化器指定有效的执行计划。")]),_._v(" "),i("li",[_._v("使用innodb和myisam特定的优化方法")]),_._v(" "),i("li",[_._v("优化InnoDB只读事务")])]),_._v(" "),i("h2",{attrs:{id:"where-条件优化"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#where-条件优化"}},[_._v("#")]),_._v(" where 条件优化")]),_._v(" "),i("ul",[i("li",[i("p",[_._v("自动优化")]),_._v(" "),i("ul",[i("li",[_._v("((a AND b) AND c OR (((a AND b) AND (c AND d))))")])]),_._v(" "),i("p",[_._v("-> (a AND b AND c) OR (a AND b AND c AND d)")]),_._v(" "),i("ul",[i("li",[_._v("(a<b AND b=c) AND a=5")])]),_._v(" "),i("p",[_._v("-> b>5 AND b=c AND a=5")]),_._v(" "),i("ul",[i("li",[_._v("(b>=5 AND b=5) OR (b=6 AND 5=5) OR (b=7 AND 5=6)")])]),_._v(" "),i("p",[_._v("-> b=5 OR b=6")])]),_._v(" "),i("li",[i("p",[_._v("索引用到的常量，只计算一次")])]),_._v(" "),i("li",[i("p",[_._v("select count(*) 对于MyISAM是直接从信息表中获取的值，或者从内存中，不带where且只有一个表的时候。")])]),_._v(" "),i("li",[i("p",[_._v("如果没有使用group或者聚合函数如max min等，可以having和where 一起用。")])]),_._v(" "),i("li",[i("p",[_._v("常量表示空表或者where条件是主键或者唯一索引，或者索引和常量比较，且字段非空。")])]),_._v(" "),i("li",[i("p",[_._v("最好的join方式，如果order by和groupby 使用的都是同一个表的列，则首选该表。")])]),_._v(" "),i("li",[i("p",[_._v("如果存在order by或者groupby 或者groupby包含非第一个表之外的列，则会创建临时表。")])]),_._v(" "),i("li",[i("p",[_._v("使用SQL_SMALL_RESULT修饰，将使用临时表")])]),_._v(" "),i("li",[i("p",[_._v("范围查询，会把重复的条件转化成true")])]),_._v(" "),i("li")])])}),[],!1,null,null,null);v.default=a.exports}}]);