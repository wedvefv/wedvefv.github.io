(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{482:function(t,e,s){"use strict";s.r(e);var a=s(56),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨域"}},[t._v("#")]),t._v(" 跨域")]),t._v(" "),s("ul",[s("li",[t._v("浏览器为了安全，有个策略: 同源策略， 页面中的链接必须域名一致。")])]),t._v(" "),s("h2",{attrs:{id:"为什么跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么跨域"}},[t._v("#")]),t._v(" 为什么跨域")]),t._v(" "),s("ul",[s("li",[t._v("页面请求的接口可能位于独立api服务器， 所以就会有跨域存在。")])]),t._v(" "),s("h2",{attrs:{id:"解决问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决问题"}},[t._v("#")]),t._v(" 解决问题")]),t._v(" "),s("ol",[s("li",[t._v("代理，没怎么研究")]),t._v(" "),s("li",[t._v("jsonp，构造javascrit 标签，利用src属性请求这个链接，返回body是可执行的js代码，代码中的函数需要本地定义，巧妙的接收到了数据")]),t._v(" "),s("li",[t._v('配置api服务器支持跨域资源共享， nginx location中添加 "add_header Access-Control-Allow-Origin *" ,* 表示任意域名过来的都可以请求， 也可以是某个域名 "http://127.0.0.1:5000"')]),t._v(" "),s("li",[t._v("preflight request(预检请求 OPTIONS方法)")])]),t._v(" "),s("ul",[s("li",[t._v("W3C规定的，有些类型的请求比如post，都需要优先发送一个OPTIONS方法的请求，以获得nginx是否支持这种类型，比如post一个json格式的数据，就需要先发options请求")]),t._v(" "),s("li",[t._v("发送options请求，是为了获取nginx是否支持content-type ，所以nginx配置需要增加：")])]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept";\n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ul",[s("li",[s("p",[t._v("这样请求header中有Access-Control-Allow-Headers： content-type,")])]),t._v(" "),s("li",[s("p",[t._v("服务器响应header返回的也有Access-Control-Allow-Headers： content-type,就不会报Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.的错误了。")])]),t._v(" "),s("li",[s("p",[t._v("以下几种post格式不用发options请求，直接发post请求")])])]),t._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("application/x-www-form-urlencoded\nmultipart/form-data\ntext/plain\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("ol",{attrs:{start:"5"}},[s("li",[t._v("vue的axios.post 方法MIME类型默认content-type发送json格式的，所有就会产生options请求，导致失败。")])])])}),[],!1,null,null,null);e.default=n.exports}}]);