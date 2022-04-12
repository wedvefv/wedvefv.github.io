(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{432:function(a,i,t){"use strict";t.r(i);var e=t(56),s=Object(e.a)({},(function(){var a=this,i=a.$createElement,t=a._self._c||i;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"ipv6"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ipv6"}},[a._v("#")]),a._v(" ipv6")]),a._v(" "),t("h3",{attrs:{id:"ipv6格式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ipv6格式"}},[a._v("#")]),a._v(" ipv6格式")]),a._v(" "),t("ul",[t("li",[a._v("冒号分割， 每一段都是16位，一般显示4个16进制数， xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx")]),a._v(" "),t("li",[a._v("连续的0 可以用两个冒号表示 就会出现 fe80::315:b3ba:674b:3fdc的 ，实际上是\nfe80:0000:0000:0000:0315:b3ba:674b:3fdc")])]),a._v(" "),t("h3",{attrs:{id:"linux中的ipv6有两种类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux中的ipv6有两种类型"}},[a._v("#")]),a._v(" linux中的ipv6有两种类型")]),a._v(" "),t("ul",[t("li",[a._v("Scope:Global")]),a._v(" "),t("li",[a._v("Scope:Link  这种方式是由mac地址按照一定格式转换出来的全球唯一本地链路")])]),a._v(" "),t("h3",{attrs:{id:"ping"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ping"}},[a._v("#")]),a._v(" ping")]),a._v(" "),t("ul",[t("li",[a._v("Scope:Link  这种方式直接ping6 fe80::315:b3ba:674b:3fdc 会连接不上，不通。")]),a._v(" "),t("li",[a._v("需要绑定一个网卡这样操作才能ping通： ping6 -I eht0  fe80::315:b3ba:674b:3fdc")])]),a._v(" "),t("h3",{attrs:{id:"nginx-配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#nginx-配置"}},[a._v("#")]),a._v(" nginx 配置")]),a._v(" "),t("ul",[t("li",[a._v("listen [::]:80;")]),a._v(" "),t("li",[a._v("nginx最近版本都默认支持ipv6了，不需要编译指定 --with-ipv6了。")])]),a._v(" "),t("h3",{attrs:{id:"配置-scope-global-类型的ipv6地址"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置-scope-global-类型的ipv6地址"}},[a._v("#")]),a._v(" 配置 Scope:Global 类型的ipv6地址")]),a._v(" "),t("ul",[t("li",[a._v("vim /etc/sysconfig/network-scripts/ifcfg-eth0")])]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("IPV6INIT=yes\nIPV6_AUTOCONF=no\nIPV6ADDR=2003:ac18::30a/64\nIPV6_DEFAULTGW=2003:ac18/64 \n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br")])]),t("ul",[t("li",[a._v("service network restart 重启网络服务")]),a._v(" "),t("li",[a._v("查看ip, ip addr  会看到 inet6 2003:ac18::30a/64 scope global")]),a._v(" "),t("li",[a._v("这样可以ping6 直接ping通, ping6 2003:ac18::30a")]),a._v(" "),t("li",[a._v("curl 也可以: curl -6 -g http://[2003:ac18::30a]:80/lua")]),a._v(" "),t("li",[a._v("ipv6地址需要使用中括号把地址括起来，端口80也可以省略")]),a._v(" "),t("li",[a._v("-6是ipv6; -g是表示使用{}或者[]限定范围, 或者禁用网址序列。")])]),a._v(" "),t("p",[t("a",{attrs:{href:"https://www.jianshu.com/p/3c8a4cce9cd1",target:"_blank",rel:"noopener noreferrer"}},[a._v("ipv6格式介绍"),t("OutboundLink")],1)])])}),[],!1,null,null,null);i.default=s.exports}}]);