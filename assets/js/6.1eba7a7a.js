(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{398:function(t,v,_){t.exports=_.p+"assets/img/vm1.068122e4.png"},399:function(t,v,_){t.exports=_.p+"assets/img/vm2.e6921cf4.png"},432:function(t,v,_){"use strict";_.r(v);var s=_(56),r=Object(s.a)({},(function(){var t=this,v=t.$createElement,s=t._self._c||v;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"虚拟机的三种联网方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机的三种联网方式"}},[t._v("#")]),t._v(" 虚拟机的三种联网方式")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("链接模式")]),t._v(" "),s("th",[t._v("ip段")]),t._v(" "),s("th",[t._v("能和外部通")]),t._v(" "),s("th",[t._v("虚拟机之间通信")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("桥接模式")]),t._v(" "),s("td",[t._v("和宿主机同网段")]),t._v(" "),s("td",[t._v("能")]),t._v(" "),s("td",[t._v("能")])]),t._v(" "),s("tr",[s("td",[t._v("NAT网络转换")]),t._v(" "),s("td",[t._v("单独的网段")]),t._v(" "),s("td",[t._v("能")]),t._v(" "),s("td",[t._v("能")])]),t._v(" "),s("tr",[s("td",[t._v("仅主机模式")]),t._v(" "),s("td",[t._v("单独网段")]),t._v(" "),s("td",[t._v("不能")]),t._v(" "),s("td",[t._v("能")])])])]),t._v(" "),s("h1",{attrs:{id:"配置ip的关键点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置ip的关键点"}},[t._v("#")]),t._v(" 配置ip的关键点")]),t._v(" "),s("p",[t._v("如果配成  "),s("em",[s("strong",[t._v("桥接模式")])]),t._v(" ， 虚拟机和window宿主机器同一个网段 例如：windows的ip是 172.16.102.11 可能是172.16.102.12， 都是172.16.102.* 这个网段。这个ip可以直接和外部网络通信。这样 "),s("strong",[s("em",[t._v("能通过ssh链接")])])]),t._v(" "),s("p",[s("img",{attrs:{src:_(398),alt:"输入图片说明"}})]),t._v(" "),s("p",[t._v("如果你配成 "),s("em",[s("strong",[t._v("NAT转换模式")])]),t._v(" ， 虚拟机就不能和主机同一个段。 假如宿主机172段， 虚拟机一般会默认给你一个192.168段的ip例如192.168.11.12，  "),s("strong",[t._v("这样能通过ssh链接")])]),t._v(" "),s("p",[t._v("NAT模式就是信息转化，加入虚拟机要联网，只能通过172的宿主机。")]),t._v(" "),s("p",[t._v("如果你配成 "),s("em",[s("strong",[t._v("主机模式")])]),t._v(" ， 那么就不能和外网或者宿主机通信了，只能自己玩单机，或者和邻居虚拟机通信(前提是俩虚拟机都是主机模式，ip段一样)。")]),t._v(" "),s("p",[t._v("再附一张图\n"),s("img",{attrs:{src:_(399),alt:"输入图片说明"}})])])}),[],!1,null,null,null);v.default=r.exports}}]);