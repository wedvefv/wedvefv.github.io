(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{481:function(t,r,e){"use strict";e.r(r);var a=e(56),l=Object(a.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"ngx-lua的三种变量范围"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ngx-lua的三种变量范围"}},[t._v("#")]),t._v(" NGX_LUA的三种变量范围")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("进程间共享， nginx的所有work进程共享，使用lua_shared_dict定义，这样高并发就出触发锁。")])]),t._v(" "),e("li",[e("p",[t._v("进程内共享，lua代码中不加local关键字就是全局变量，这样的变量在同一个进程的所有请求之间共享,因为开启了lua缓存，每个work的VM虚拟机都会缓存全局变量.")])]),t._v(" "),e("li",[e("p",[t._v("同一个请求，比如local声明的或者ngx.ctx")])]),t._v(" "),e("li",[e("p",[t._v("lua_shared_dict 有模块"),e("a",{attrs:{href:"https://github.com/openresty/lua-resty-lrucache",target:"_blank",rel:"noopener noreferrer"}},[t._v("lua-resty-lrucache"),e("OutboundLink")],1),t._v("可以实现在一个work中共享，由于nginx是单进程的，所以永远不会触发锁\n就是兼顾效率而且没有锁的问题，缺点内存比进程间共享占用比较大。")])])])])}),[],!1,null,null,null);r.default=l.exports}}]);