(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{458:function(a,t,s){"use strict";s.r(t);var n=s(56),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"nginx执行阶段顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx执行阶段顺序"}},[a._v("#")]),a._v(" nginx执行阶段顺序")]),a._v(" "),s("p",[a._v("初始化阶段:")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("init_by_lua\n\ninit_work_by_lua \n")])])]),s("p",[a._v("rewrite/access阶段:")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("是https请求-> 先ssl_certificate_by_lua\n\nset_by_lua 流程分支判断，变量初始化\n\nrewrite_by_lua 转发，重定向，缓存\n\naccess_by_lua ip限制，接口权限，类似防火墙的功能功能个\n")])])]),s("p",[a._v("content阶段:")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("如果content是lua则走content_by_lua\n\n如果content是upstream，则走balancer_by_lua\n\nheader_filter_by_lua,响应头处理\n\nbody_filter_by_lua， 响应body处理\n")])])]),s("p",[a._v("Log阶段:\nlog_by_lua阶段")]),a._v(" "),s("p",[a._v("例如加密的场景：")]),a._v(" "),s("div",{staticClass:"language-lua line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-lua"}},[s("code",[a._v("\nlocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mixed")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n\taccess_by_lua_file "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" 请求解密\n\tcontent_by_lua_file "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" 请求处理，不关心加密解密协议\n\tbody_filter_by_lua "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" 应答加密\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br")])]),s("h2",{attrs:{id:"正确记录日志"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#正确记录日志"}},[a._v("#")]),a._v(" 正确记录日志")]),a._v(" "),s("p",[a._v("使用 lua-resty-logger-socket")]),a._v(" "),s("p",[a._v("由于实现中存在一种情况：如果消息大小太小，可能不会刷盘，导致丢失")]),a._v(" "),s("p",[a._v("原因：\n当我们初始化一个syslog服务器链接后，每次发送消息时，调用logger.log函数, 它是累计到flush_limit才会刷盘; 当没到flush_limit 时，函数保存数据到变量buffer中，然后直接返回， 这时候接口结束，buffer也释放了，所以日志就丢了。")]),a._v(" "),s("p",[a._v("解决方法：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("将flush_limit设置的很小，保证每次log都刷盘\n\n把写日志放到log_by_lua阶段,这个阶段会异步完成日志记录。\n")])])]),s("h2",{attrs:{id:"热装载代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#热装载代码"}},[a._v("#")]),a._v(" 热装载代码")]),a._v(" "),s("h2",{attrs:{id:"阻塞操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#阻塞操作"}},[a._v("#")]),a._v(" 阻塞操作")]),a._v(" "),s("p",[a._v("避免以下操作")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("高cpu的调用，如加解密\n\n高磁盘操作，如文件操作\n\n非openresty提供的网络库\n\n系统命令 os.execute \n")])])]),s("p",[a._v("因为以上都是阻塞cpu的操作耗时操作\n阻塞的原因是，因为不会发生协成切换，而是进程切换，导致不处理别的协程")]),a._v(" "),s("p",[a._v("一、 我们可以减少这类函数调用")]),a._v(" "),s("p",[a._v("二、我们把这类操作封装成http或者tcp服务(使用cosocket技术)， 这样操作这些调用时，由于是网络io，也会协程切换，避免阻塞cpu。")]),a._v(" "),s("h2",{attrs:{id:"缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[a._v("#")]),a._v(" 缓存")]),a._v(" "),s("p",[a._v("lua shared dict")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("work进程间共享的, 需要在配置文件定义空间大小\n\n内部使用LRU算法(清除最少使用的内存）\n")])])]),s("p",[a._v("lua LRU cache")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("resty.lrucache 库\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);