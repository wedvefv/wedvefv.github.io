(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{445:function(s,a,t){"use strict";t.r(a);var n=t(56),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"centos7虚拟机配置静态ip"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos7虚拟机配置静态ip"}},[s._v("#")]),s._v(" centos7虚拟机配置静态ip")]),s._v(" "),t("h2",{attrs:{id:"_1-mac上的虚拟机使用-自动模式-就是桥接模式。"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-mac上的虚拟机使用-自动模式-就是桥接模式。"}},[s._v("#")]),s._v(" 1. mac上的虚拟机使用（自动模式）就是桥接模式。")]),s._v(" "),t("p",[t("img",{attrs:{src:"/img/vmnet.png",alt:""}})]),s._v(" "),t("h2",{attrs:{id:"_2-查看自己的网卡名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-查看自己的网卡名"}},[s._v("#")]),s._v(" 2. 查看自己的网卡名")]),s._v(" "),t("ul",[t("li",[s._v("ifconfig 命令")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@localhost ~"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ifconfig")]),s._v("\nens33: "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("flags")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("416")]),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("3")]),s._v("<")]),s._v("UP,BROADCAST,RUNNING,MULTICAST"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("  mtu "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1500")]),s._v("\n        inet "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".2.132  netmask "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("255.255")]),s._v(".255.0  broadcast "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".2.255\n        inet6 fe80::315:b3ba:674b:3fdc  prefixlen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),s._v("  scopeid 0x2"),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("0")]),s._v("<")]),s._v("link"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n        ether 00:0c:29:14:d2:38  txqueuelen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Ethernet"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        RX packets "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("56630")]),s._v("  bytes "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20928797")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("19.9")]),s._v(" MiB"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        RX errors "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  dropped "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  overruns "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  frame "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n        TX packets "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("24078")]),s._v("  bytes "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2636531")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.5")]),s._v(" MiB"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        TX errors "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  dropped "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" overruns "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  carrier "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  collisions "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n\nlo: "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("flags")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("3")]),s._v("<")]),s._v("UP,LOOPBACK,RUNNING"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("  mtu "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("65536")]),s._v("\n        inet "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1  netmask "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("255.0")]),s._v(".0.0\n        inet6 ::1  prefixlen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("128")]),s._v("  scopeid 0x1"),t("span",{pre:!0,attrs:{class:"token operator"}},[t("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("0")]),s._v("<")]),s._v("host"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n        loop  txqueuelen "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Local Loopback"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        RX packets "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2517")]),s._v("  bytes "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("223561")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("218.3")]),s._v(" KiB"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        RX errors "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  dropped "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  overruns "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  frame "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n        TX packets "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2517")]),s._v("  bytes "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("223561")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("218.3")]),s._v(" KiB"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        TX errors "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  dropped "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" overruns "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  carrier "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("  collisions "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("ul",[t("li",[s._v("我的网卡就是ens33,下面lo是本地回环地址，ip是127.0.0.1")])]),s._v(" "),t("h2",{attrs:{id:"修改网卡配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改网卡配置文件"}},[s._v("#")]),s._v(" 修改网卡配置文件")]),s._v(" "),t("p",[s._v("vim /etc/sysconfig/network-scripts/ifcfg-ens33")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("TYPE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Ethernet\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("PROXY_METHOD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("none\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BROWSER_ONLY")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#BOOTPROTO=dhcp")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DEFROUTE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("yes\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPV4_FAILURE_FATAL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPV6INIT")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("yes\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPV6_AUTOCONF")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("yes\n  "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPV6_DEFROUTE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("yes\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPV6_FAILURE_FATAL")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPV6_ADDR_GEN_MODE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("stable-privacy\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("NAME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ens33\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("13")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("UUID")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("5e4d74e0-4fd2-48b9-8856-a206acc5b6ea\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("14")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DEVICE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ens33\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("15")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#ONBOOT=yes")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v(" \n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("17")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下面是新增的部分，上面的BOOTPROTO和ONBOOT注释掉。")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# static config")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("19")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("NM_CONTROLLED")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("no "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# use config file not network manager.")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("BOOTPROTO")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("static\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("21")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ONBOOT")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("yes\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("22")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IPADDR")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".2.132\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("23")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("NETMASK")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("255.255")]),s._v(".255.0\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GATEWAY")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".2.1\n "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("25")]),s._v(" \n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br")])]),t("h2",{attrs:{id:"设置dns"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置dns"}},[s._v("#")]),s._v(" 设置DNS")]),s._v(" "),t("p",[s._v("vim /etc/sysconfig/network")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("\t"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 这个文件主要是设置HOSTNAME,设置是否启动网络，需要reboot，如果修改网关，重启service就行了")]),s._v("\n\t写入：\n\t"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DNS1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.8")]),s._v(".8.8\n\t"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DNS2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("114.114")]),s._v(".114.114\n\t"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GATEWAY")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".2.1 "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 一般是路由器的ip，我家两个路由器，一个是192.168.1.1，一个是192.168.2.1。")]),s._v("\n\t\n\t\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("h2",{attrs:{id:"重启服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重启服务"}},[s._v("#")]),s._v(" 重启服务")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("service")]),s._v(" network restart\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);