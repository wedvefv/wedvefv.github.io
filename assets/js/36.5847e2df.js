(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{434:function(s,a,t){"use strict";t.r(a);var e=t(56),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"ip和掩码的关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ip和掩码的关系"}},[s._v("#")]),s._v(" ip和掩码的关系")]),s._v(" "),t("h2",{attrs:{id:"什么是ip地址"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是ip地址"}},[s._v("#")]),s._v(" 什么是ip地址？")]),s._v(" "),t("ul",[t("li",[s._v("ip是在一个网段中的一台计算机的ip地址（192.168.1.2）")]),s._v(" "),t("li",[s._v("如果你家的联通宽带给你家的公网ip地址是10.10.123.234(假设的)，那么接到你家路由器，首先路由器需要有一个ip地址，一般是192.168.1.1（也可能是192.168.0.1），这个应该可以登录到路由器中设置。")]),s._v(" "),t("li",[s._v("其中192.168.1.255 就是广播地址，比如centos中ifconfig命令查看的broadcast")]),s._v(" "),t("li",[s._v("剩余的ip段192.168.1.2~192.168.1.254 就是可以分配给手机，电脑等客户端使用的ip。一共是253（255-2）个。")])]),s._v(" "),t("h2",{attrs:{id:"ip由什么组成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ip由什么组成"}},[s._v("#")]),s._v(" ip由什么组成？")]),s._v(" "),t("ul",[t("li",[s._v("例如一个ip 192.168.1.2，是一个C类网络，一般有254台主机。二进制表示就是 网络号标识|1100 0000 |1000 0000| 0000 0001|  + 主机号标识|0000 0010|")]),s._v(" "),t("li",[s._v("点号分割每个数字都是8位二进制,网络号部分就是192.168.1,主机号部分就是2。")]),s._v(" "),t("li",[s._v("网络标识部分越短，那么标识主机部分可用的范围越大，但是需要子网掩码配合决定由多少可用ip")])]),s._v(" "),t("h2",{attrs:{id:"什么是子网掩码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是子网掩码"}},[s._v("#")]),s._v(" 什么是子网掩码？")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("子网掩码，顾名思义，遮掩的意思，子网掩码就是把ip地址分为网络部分和主机部分，主机部分用二进制位用1标识，主机号部分用0标识。C类子网掩码一般是255.255.255.0")])]),s._v(" "),t("li",[t("p",[s._v("如果所需的ip比较多，比如学校这种环境，子网掩码可以设置成255.255.0.0 ,那么ip返回就是255的2次方-2，就是65023个。那么ip网络部分就是192.168,后面两部分是主机号。")])]),s._v(" "),t("li",[t("p",[s._v("网关是什么，比如两个A客户端192.168.1.2 和B客户端192.168.2.2 就是两个网络的设备，前提是他们的子网掩码都是255.255.255.0， 那么他们通信就需要A客户端发送给网关ip，有网关路由转发到B所在的网关，再转发到B客户端。 比如我的路由器ip是192.168.2.1， 我自己的ip是192.168.2.110， 默认网关也是192.168.2.1")])])]),s._v(" "),t("ul",[t("li",[t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("netstat")]),s._v(" -rn\n\nDestination     Gateway         Genmask         Flags   MSS Window  irtt Iface\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0         "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".2.1     "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0         UG        "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("          "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" ens33\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0表示发给任何人的包，都发给192.168.2.1这个网关， Genmask写0.0.0.0是默认路由的网络掩码。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])])])])])}),[],!1,null,null,null);a.default=n.exports}}]);