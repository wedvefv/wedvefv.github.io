(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{425:function(v,_,t){"use strict";t.r(_);var n=t(56),l=Object(n.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"centos7日志查看工具journalctl"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos7日志查看工具journalctl"}},[v._v("#")]),v._v(" centos7日志查看工具journalctl")]),v._v(" "),t("p",[v._v("1  概述")]),v._v(" "),t("p",[v._v("日志管理工具journalctl是centos7上专有的日志管理工具，该工具是从message这个文件里读取信息。Systemd统一管理所有Unit的启动日志。带来的好处就是，可以只用journalctl一个命令，查看所有日志（内核日志和应用日志）。日志的配置文件是/etc/systemd/journald.conf")]),v._v(" "),t("p",[v._v("journalctl功能强大，用法非常多。本文将介绍journalctl的相关使用方法。")]),v._v(" "),t("p",[v._v("2  journalctl 使用方法")]),v._v(" "),t("p",[v._v(".查看所有日志")]),v._v(" "),t("p",[v._v("默认情况下，只保存本次启动的日志")]),v._v(" "),t("p",[v._v("journalctl")]),v._v(" "),t("p",[v._v(".查看内核日志（不显示应用日志）")]),v._v(" "),t("p",[v._v("journalctl -k")]),v._v(" "),t("p",[v._v(".查看系统本次启动的日志")]),v._v(" "),t("p",[v._v("journalctl   -b")]),v._v(" "),t("p",[v._v("journalctl  -b  -0")]),v._v(" "),t("p",[v._v(".查看上一次启动的日志")]),v._v(" "),t("p",[v._v("需更改设置,如上次系统崩溃，需要查看日志时，就要看上一次的启动日志。")]),v._v(" "),t("p",[v._v("journalctl  -b -1")]),v._v(" "),t("p",[v._v(".查看指定时间的日志")]),v._v(" "),t("p",[v._v('journalctl --since="2012-10-3018:17:16"')]),v._v(" "),t("p",[v._v('journalctl --since "20 minago"')]),v._v(" "),t("p",[v._v("journalctl --since yesterday")]),v._v(" "),t("p",[v._v('journalctl --since"2015-01-10" --until "2015-01-11 03:00"')]),v._v(" "),t("p",[v._v('journalctl --since 09:00 --until"1 hour ago"')]),v._v(" "),t("p",[v._v('journalctl --since"15:15" --until now')]),v._v(" "),t("p",[v._v(".显示尾部的最新10行日志")]),v._v(" "),t("p",[v._v("journalctl  -n")]),v._v(" "),t("p",[v._v(".显示尾部指定行数的日志")]),v._v(" "),t("p",[v._v("查看的是/var/log/messages的日志，但是格式上有所调整，如主机名格式不一样而已")]),v._v(" "),t("p",[v._v("journalctl -n 20")]),v._v(" "),t("p",[v._v(".实时滚动显示最新日志")]),v._v(" "),t("p",[v._v("journalctl   -f")]),v._v(" "),t("p",[v._v(".查看指定服务的日志")]),v._v(" "),t("p",[v._v("journalctl  /usr/lib/systemd/systemd")]),v._v(" "),t("p",[v._v(".查看指定进程的日志")]),v._v(" "),t("p",[v._v("journalctl   _PID=1")]),v._v(" "),t("p",[v._v(".查看某个路径的脚本的日志")]),v._v(" "),t("p",[v._v("journalctl    /usr/bin/bash")]),v._v(" "),t("p",[v._v(".查看指定用户的日志")]),v._v(" "),t("p",[v._v("journalctl _UID=33  --since today")]),v._v(" "),t("p",[v._v(".查看某个Unit的日志")]),v._v(" "),t("p",[v._v("journalctl  -u nginx.service")]),v._v(" "),t("p",[v._v("journalctl  -u nginx.service  --since  today")]),v._v(" "),t("p",[v._v(".实时滚动显示某个Unit的最新日志")]),v._v(" "),t("p",[v._v("journalctl  -u nginx.service  -f")]),v._v(" "),t("p",[v._v(".合并显示多个Unit的日志")]),v._v(" "),t("p",[v._v("journalctl  -u nginx.service  -u php-fpm.service  --since today")]),v._v(" "),t("p",[v._v("​查看指定优先级（及其以上级别）的日志")]),v._v(" "),t("p",[v._v("日志优先级共有8级")]),v._v(" "),t("p",[v._v("0: emerg")]),v._v(" "),t("p",[v._v("1: alert")]),v._v(" "),t("p",[v._v("2: crit")]),v._v(" "),t("p",[v._v("3: err")]),v._v(" "),t("p",[v._v("4: warning")]),v._v(" "),t("p",[v._v("5: notice")]),v._v(" "),t("p",[v._v("6: info")]),v._v(" "),t("p",[v._v("7: debug")]),v._v(" "),t("p",[v._v("journalctl  -p err  -b")]),v._v(" "),t("p",[v._v(".不分页标准输出")]),v._v(" "),t("p",[v._v("日志默认分页输出--no-pager改为正常的标准输出")]),v._v(" "),t("p",[v._v("journalctl  --no-pager")]),v._v(" "),t("p",[v._v(".以JSON格式（单行）输出")]),v._v(" "),t("p",[v._v("JSON(JavaScript Object Notation)是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。它基于JavaScriptProgramming Language, Standard ECMA-262 3rd Edition - December 1999的一个子集。JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, CJSON建构于两种结构：")]),v._v(" "),t("p",[v._v("“名称/值”对的集合（A collection ofname/value pairs）：不同的语言中，它被理解为对象（object），纪录（record），结构（struct），字典（dictionary），哈希表（hash table），有键列表（keyed list），或者关联数组（associativearray）。")]),v._v(" "),t("p",[v._v("值的有序列表（An ordered list of values）：在大部分语言中，它被理解为数组（array）。")]),v._v(" "),t("p",[v._v("这些都是常见的数据结构。事实上大部分现代计算机语言都以某种形式支持它们。这使得一种数据格式在同样基于这些结构的编程语言之间交换成为可能。")]),v._v(" "),t("p",[v._v("例子")]),v._v(" "),t("p",[v._v("以JSON格式（单行）输出")]),v._v(" "),t("p",[v._v("journalctl  -b -u httpd.service  -o json")]),v._v(" "),t("p",[v._v(".以JSON格式（多行）输出，可读性更好，建议选择多行输出")]),v._v(" "),t("p",[v._v("journalctl  -b -u httpd.service  -o json-pretty")]),v._v(" "),t("p",[v._v(".显示日志占据的硬盘空间")]),v._v(" "),t("p",[v._v("journalctl  --disk-usage")]),v._v(" "),t("p",[v._v(".指定日志文件占据的最大空间")]),v._v(" "),t("p",[v._v("journalctl   --vacuum-size=1G")]),v._v(" "),t("p",[v._v(".指定日志文件保存多久")]),v._v(" "),t("p",[v._v("journalctl   --vacuum-time=1years")]),v._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code")]),v._v(" "),t("div",{staticClass:"line-numbers-wrapper"})])])}),[],!1,null,null,null);_.default=l.exports}}]);