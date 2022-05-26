(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{430:function(t,_,v){"use strict";v.r(_);var a=v(56),r=Object(a.a)({},(function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"_32和64位cpu的不同"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_32和64位cpu的不同"}},[t._v("#")]),t._v(" 32和64位cpu的不同")]),t._v(" "),v("h2",{attrs:{id:"_16位cpu"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_16位cpu"}},[t._v("#")]),t._v(" 16位cpu")]),t._v(" "),v("p",[t._v("int是2个字节")]),t._v(" "),v("p",[t._v("long是4个字节")]),t._v(" "),v("h2",{attrs:{id:"_32位cpu"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_32位cpu"}},[t._v("#")]),t._v(" 32位cpu")]),t._v(" "),v("p",[t._v("Int 是4个字节")]),t._v(" "),v("p",[t._v("long是4个字节")]),t._v(" "),v("p",[t._v("只能装"),v("strong",[t._v("32")]),t._v("位操作系统")]),t._v(" "),v("h2",{attrs:{id:"_64位cpu"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_64位cpu"}},[t._v("#")]),t._v(" 64位cpu")]),t._v(" "),v("p",[t._v("int是4个直接（为了兼容32程序）")]),t._v(" "),v("p",[t._v("long是8个字节")]),t._v(" "),v("p",[t._v("可以装"),v("strong",[t._v("32")]),t._v("位系统或者"),v("strong",[t._v("64")]),t._v("位系统。")]),t._v(" "),v("h2",{attrs:{id:"time-t为什么是long"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#time-t为什么是long"}},[t._v("#")]),t._v(" time_t为什么是long")]),t._v(" "),v("p",[t._v("因为时间戳是10位，目前来说必须要4个字节才能表示(-2147483648 --2147483647 ) 也就是(-2^32) - (2^31-1)")]),t._v(" "),v("p",[t._v("16位时期 int是2字节，long是4字节，所以 time_t才是long;")]),t._v(" "),v("h1",{attrs:{id:"内存寻址范围范围和cpu架构的关系"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#内存寻址范围范围和cpu架构的关系"}},[t._v("#")]),t._v(" 内存寻址范围范围和cpu架构的关系")]),t._v(" "),v("h2",{attrs:{id:"_32位cpu为什么内存只能用4g"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_32位cpu为什么内存只能用4g"}},[t._v("#")]),t._v(" 32位cpu为什么内存只能用4G")]),t._v(" "),v("p",[t._v("因为32的cpu，设计的寄存器位宽就是32，因为寄存器要放"),v("strong",[t._v("指针")]),t._v("(地址)，地址最大值只能是2^32（4294967296）")]),t._v(" "),v("p",[t._v("4294967296 换算成计算机里面的存储单位:")]),t._v(" "),v("p",[t._v("​\t4G = (4 * 1024)MB = (4 * 1024 * 1024)KB = (4*1024 * 1024 * 1024)b")]),t._v(" "),v("p",[v("strong",[t._v("所以我们说32位机器只能用4G内存条，装个8G的也是浪费，这就是由于寄存器构造决定的，最大地址就是0xffffffff (8个f, 32位)")])]),t._v(" "),v("h2",{attrs:{id:"内存是如何存放数据的"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#内存是如何存放数据的"}},[t._v("#")]),t._v(" 内存是如何存放数据的")]),t._v(" "),v("p",[t._v("内存的物理模型可以理解为海量的小格子，一个格子是1bit，只能放0和1")]),t._v(" "),v("p",[t._v("但是cpu不是一个bit一个bit的去读取，而是8个bit当做一个整体去访问（也就是一字节，byte），所以说每个地址都是指向这某一个字节的。")]),t._v(" "),v("p",[t._v("为什么cpu有地址就能访问到数据呢? 因为我们定义时指定了类型，比如char就是一个字节，int是4个字节，也就值告诉cpu读取字节的长度，所以cpu知道什么时候结束。")]),t._v(" "),v("p",[t._v("字符串char* s 是连续的字节，所以规定结尾使用\\0来标志字符串的结束。")])])}),[],!1,null,null,null);_.default=r.exports}}]);