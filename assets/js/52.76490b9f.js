(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{451:function(t,e,s){"use strict";s.r(e);var a=s(56),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"tcp三次握手的过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tcp三次握手的过程"}},[t._v("#")]),t._v(" tcp三次握手的过程")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("第一次：客户端发送SYN(Synchronize Sequence Numbers)报文，标志位SYN=1,序列号seq=j。")])]),t._v(" "),s("li",[s("p",[t._v("第二次：服务端收到SYN报文后，回应ACK(Acknowledgement)，标志位ACK=1,确认号ack为j## tcp四次挥手过程，为什么是4次呢？")])]),t._v(" "),s("li",[s("p",[t._v("假如客户端主动发起关闭操作")])]),t._v(" "),s("li",[s("p",[t._v("第一次： 客户端发送FIN报文，假设为序列号seq=i给服务器。")])]),t._v(" "),s("li",[s("p",[t._v("第二次： 服务发送ACK报文，ack=(i> * 为什么客户端不发完ack就释放呢，因为服务器可能没收到ack，服务器会重新发送FIN请求关闭连接，客户端重新发送ack，所以一个来回就是2\n个报文周期。当连接处于2MSL等待阶段时任何迟到的报文段都将被丢弃。")])])]),t._v(" "),s("p",[t._v("借用一张图表示一下\n"),s("img",{attrs:{src:"https://img-blog.csdnimg.cn/20190214095421560.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pXRTc2MTYxNzU=,size_16,color_FFFFFF,t_70",alt:"aa"}})]),t._v(" "),s("h2",{attrs:{id:"如果已经建立了连接-但是客户端突然出现故障了怎么办"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如果已经建立了连接-但是客户端突然出现故障了怎么办"}},[t._v("#")]),t._v(" 如果已经建立了连接，但是客户端突然出现故障了怎么办？")]),t._v(" "),s("blockquote",[s("p",[t._v("TCP还设有一个保活计时器，显然，客户端如果出现故障，服务器不能一直等下去，白白浪费资源。服务器每收到一次客户端的请求后都会重新复位这个计时器，时间通常是设置为2小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔75分钟发送一次。若一连发送10个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。")])]),t._v(" "),s("h2",{attrs:{id:"查看网络链接的命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查看网络链接的命令"}},[t._v("#")]),t._v(" 查看网络链接的命令")]),t._v(" "),s("ul",[s("li",[t._v("查看不同状态的链接数")])]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("netstat -an | awk '/^tcp/ {")])])]),t._v(" "),s("h2",{attrs:{id:"半连接状态队列sync-queue和全连接队列accept-queue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#半连接状态队列sync-queue和全连接队列accept-queue"}},[t._v("#")]),t._v(" 半连接状态队列sync_queue和全连接队列accept_queue")]),t._v(" "),s("ul",[s("li",[t._v("第一种实现：")])]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("BSD实现和在linux2.2之前，listen系统调用backlog参数表示半链接- "),s("img",{attrs:{src:"http://img2.cnxct.com/2015/06/tcp-sync-queue-and-accept-queue-small.jpg",alt:""}})])])]),t._v(" "),s("ul",[s("li",[t._v("如果全连接队列满了怎么办？")])]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("服务器不予处理，这样客户端会任务数据丢失，重新发送ack确认，如果服务器有空间，会重新加入到ESTABLISHED队列。")])])]),t._v(" "),s("ul",[s("li",[t._v("如果client端没收到服务器发来的FIN，那么client会一直是FIN_WAIT_2吗？")])]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("设置系统变量")]),t._v(" "),s("li",[t._v("sysctl -w net.ipv4.tcp_fin_timeout=5")]),t._v(" "),s("li",[t._v("直接ctrl* 怎么查看链接状态呢？")])])]),t._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("netstat")]),t._v(" -natp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8888")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#8888是服务端监听的端口，因为tcp链接总是有一端是8888端口的。")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("ul",[s("li",[t._v("查看每个ip和服务器的连接数")])]),t._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("netstat")]),t._v(" -nat"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("awk")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'{print$5}'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("awk")]),t._v(" -F "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'{print$1}'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sort")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("uniq")]),t._v(" -c"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sort")]),t._v(" -rn\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ul",[s("li",[t._v("什么是MSL呢？")])]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("linux上的定义，就是60s")])])]),t._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("define")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token macro-name"}},[t._v("TCP_TIMEWAIT_LEN")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token expression"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("60")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("HZ"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" ")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* how long to wait to destroy TIME-WAIT\n                  * state, about 60 seconds */")])]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("ul",[s("li",[t._v("全连接队列满了怎么办呢？")])]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("服务器根据 /proc/sys/net/ipv4/tcp_abort_on_overflow的值处理")]),t._v(" "),s("li",[t._v("0 表示丢弃ack，让客户端重新发ack")]),t._v(" "),s("li",[t._v("1 表示表示发送一个RST给客户端，直接废弃掉这个握手过程，客户端会出现connection reset by peer的错误")])])]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://tools.ietf.org/html/rfc793",target:"_blank",rel:"noopener noreferrer"}},[t._v("tcp协议RFC文档"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://blog.csdn.net/yangbodong22011/article/details/60399728",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考链接1"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://blog.csdn.net/hhhanpan/article/details/79388945",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考链接2"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://blog.csdn.net/dog250/article/details/81256550",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考链接3"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://blog.csdn.net/jhcsdb/article/details/34921167",target:"_blank",rel:"noopener noreferrer"}},[t._v("socket耗尽，半连接队列限制"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"https://www.cnblogs.com/jessezeng/p/5617105.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考链接4"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=n.exports}}]);