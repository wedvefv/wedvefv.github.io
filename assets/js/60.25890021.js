(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{458:function(t,s,e){"use strict";e.r(s);var n=e(56),r=Object(n.a)({},(function(){var t=this.$createElement,s=this._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[s("h1",{attrs:{id:"有时全表扫描快于索引的原因"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#有时全表扫描快于索引的原因"}},[this._v("#")]),this._v(" 有时全表扫描快于索引的原因")]),this._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/ystyaoshengting/article/details/41043969",target:"_blank",rel:"noopener noreferrer"}},[this._v("参考博客"),s("OutboundLink")],1)]),this._v(" "),s("p",[this._v("因为全表扫描主要是按页加载数据，而二级索引是先查询索引(一般在内存中，时间可以忽略)\n然后利用索引找到的主键id去查询磁盘，这一般是物理io，比较耗时。一般查询数据量大于全部数据的5%-%10\n索引就没全表扫描快了。")])])}),[],!1,null,null,null);s.default=r.exports}}]);