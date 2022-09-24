(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{476:function(n,i,r){"use strict";r.r(i);var t=r(56),e=Object(t.a)({},(function(){var n=this,i=n.$createElement,r=n._self._c||i;return r("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[r("h1",{attrs:{id:"mysql的各种join方式"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#mysql的各种join方式"}},[n._v("#")]),n._v(" mysql的各种join方式")]),n._v(" "),r("h3",{attrs:{id:"外连接-可以省略outer关键字"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#外连接-可以省略outer关键字"}},[n._v("#")]),n._v(" 外连接 可以省略outer关键字")]),n._v(" "),r("ul",[r("li",[n._v("A left join  B 按on条件取交集，在加上A剩余部分， A是主表。")]),n._v(" "),r("li",[n._v("A right join B 按on条件取交集，再加上B剩余部分，b是主表。")])]),n._v(" "),r("h2",{attrs:{id:"内连接-inner-join"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#内连接-inner-join"}},[n._v("#")]),n._v(" 内连接 inner join")]),n._v(" "),r("ul",[r("li",[r("p",[n._v("两个表按on条件取交集的意思。")])]),n._v(" "),r("li",[r("p",[n._v("select * from A  inner join  B ON  A.x = b.x")])]),n._v(" "),r("li",[r("p",[n._v("select *from A, B  where A.x = b.x")])]),n._v(" "),r("li",[r("p",[n._v("第一中方式mysql会默认转成下面的方式。")])])]),n._v(" "),r("h2",{attrs:{id:"外连接-full-outer-join"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#外连接-full-outer-join"}},[n._v("#")]),n._v(" 外连接 （full ）outer join")]),n._v(" "),r("ul",[r("li",[n._v("mysql 不支持，可以用left join结果 union  right join的结果")]),n._v(" "),r("li",[n._v("也就是取并集， 把A独有的，B独有的，AB共有的都取了。")])]),n._v(" "),r("h2",{attrs:{id:"内连接inner-join-如何join"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#内连接inner-join-如何join"}},[n._v("#")]),n._v(" 内连接inner join 如何join")]),n._v(" "),r("ul",[r("li",[n._v("如果A表 1万条， B表 2万条， inner join 没有on条件的话：\n"),r("ul",[r("li",[n._v("如果按SQL标准，可能是先求笛卡尔积 cross join 出虚拟表v1（2亿条数据)，在用ON条件和where 条件过滤，")]),n._v(" "),r("li",[n._v("mysql做了优化， 用小表A作为驱动表，作为外循环，取查询关联的大表，取出符合on条件的，顺便根据where条件过滤掉不符和条件的。")]),n._v(" "),r("li",[n._v("这样1万join2万，的出来的结果可能是符合on的1万条，满足where条件的 9000条。")])])])]),n._v(" "),r("h2",{attrs:{id:"驱动表的选择"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#驱动表的选择"}},[n._v("#")]),n._v(" 驱动表的选择")]),n._v(" "),r("ul",[r("li",[r("p",[n._v("left join 使用左表作为驱动表， right 是右表是驱动表")])]),n._v(" "),r("li",[r("p",[n._v("inner join，mysql会先扫描出相关表， "),r("strong",[n._v("拿数据少的作为驱动表")])])]),n._v(" "),r("li",[r("p",[n._v("无论 left join, right join, inner join mysql都有自己的优化算法，不会傻傻的直接两层循环，这样被驱动表就会频繁读取驱动表，效率很慢")])]),n._v(" "),r("li",[r("p",[n._v("mysql优化了算法：")]),n._v(" "),r("ul",[r("li",[n._v("而是把驱动表的部分数据先存入缓存，这样被驱动表就避免读取驱动表表，会加快很多，实质还是A cross join B。")])])])]),n._v(" "),r("h2",{attrs:{id:"总结"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[n._v("#")]),n._v(" 总结")]),n._v(" "),r("ul",[r("li",[n._v("多个join， 最好把小表作为驱动表，放前面")]),n._v(" "),r("li",[n._v("多个join，是驱动表的一条记录匹配贯穿到底和其他关联之后，在去另一条记录重复前面的操作, 而不是前两个表join完了，在join第三个表。")]),n._v(" "),r("li",[n._v("如果inner join的表有where 条件， mysql会自己优化，先根据where条件过滤无用的记录，然后确定哪个表小就作为驱动表。")]),n._v(" "),r("li",[n._v("索引嵌套循环： 驱动表逐条记录和被驱动表的索引进行匹配，减少直接和被驱动表比较的次数。")])]),n._v(" "),r("p",[r("a",{attrs:{href:"https://www.cnblogs.com/youzhibing/p/12004986.html",target:"_blank",rel:"noopener noreferrer"}},[n._v("参考链接-MYSQL的联表细节"),r("OutboundLink")],1)])])}),[],!1,null,null,null);i.default=e.exports}}]);