(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{504:function(t,e,n){"use strict";n.r(e);var o=n(56),a=Object(o.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"python-unicode编码问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#python-unicode编码问题"}},[t._v("#")]),t._v(" python unicode编码问题")]),t._v(" "),n("h2",{attrs:{id:"len函数"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#len函数"}},[t._v("#")]),t._v(" len函数：")]),t._v(" "),n("p",[t._v('len如果是utf8字符串，则计算的字节长度，汉字一般是3个字段， 如果是unicode编码，则计算的字符个数\npython http请求如果对方返回的是utf8格式的数据, 则进入到python代码，会自动转为unicode编码, 可以看到字典字段前带了个u""')]),t._v(" "),n("h2",{attrs:{id:"格式化时-转为unicode"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#格式化时-转为unicode"}},[t._v("#")]),t._v(" %格式化时，转为unicode")]),t._v(" "),n("p",[t._v('格式化输出时，如果参数有unicode编码，最终输出的也是unicode编码。\nlen 再计算就是字符个数，而不是字节长度； 准确计算字节数，需要把unicode的字段.encode("utf-8")编码一下，再拼接进去。')])])}),[],!1,null,null,null);e.default=a.exports}}]);