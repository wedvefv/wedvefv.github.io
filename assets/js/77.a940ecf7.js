(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{474:function(s,t,a){"use strict";a.r(t);var n=a(56),r=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"urlib-模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#urlib-模块"}},[s._v("#")]),s._v(" urlib 模块")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("urlib.urlopen(url) 只由url参数，不能设置header等信息")])]),s._v(" "),a("li",[a("p",[s._v("urllib有urlencode函数，可以把字典编码转成get参数（&方式连接）, urllib2 没有")])]),s._v(" "),a("li",[a("p",[s._v("urllib.quote(s, safe='/') 是转义编码用的, 默认不编码/, 且把空格转成%20")])]),s._v(" "),a("li",[a("p",[s._v("urllib.quote_plus(s, safe='') 默认全部编码, 会调用quote(s, safe=' ') 不编码空格, 最后替换s中的空格为## urllib2 模块")])]),s._v(" "),a("li",[a("p",[s._v("urllib2.Request(url,data,headers) 构造一个Request对象")])]),s._v(" "),a("li",[a("p",[s._v("urllib2.urlopen(request对象或者url)，如果传url只能是url，不能附带header和data。")])]),s._v(" "),a("li",[a("p",[s._v("由于urllib2 没有编码函数，所以经常和urllib一起导入，使用urlencode函数或者quote函数。")])]),s._v(" "),a("li",[a("p",[s._v("cookie支持方法")])])]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[s._v("cookie"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("cookielib"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("CookieJar"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 声明CookieJar对象实例来保存cookie")]),s._v("\n\thandler"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("HTTPCookieProcessor"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cookie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 利用urllib2库的HTTPCookieProcessor对象来创建cookie处理器")]),s._v("\n\topener"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("build_opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("handler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过handler构建opener")]),s._v("\n\turllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("install_opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("ul",[a("li",[s._v("如果没有data字段就是get方式，否则是post请求")]),s._v(" "),a("li",[s._v("如果post是json格式， headr指定json，data需要json.dumps()")]),s._v(" "),a("li",[s._v("如果表单方式，需要data需要urllib.urlencode()")]),s._v(" "),a("li",[s._v("request 对象有add_header(key,value)函数, 添加header 字段名key，值是value。")]),s._v(" "),a("li",[s._v("urlopen(url, timeout=1) 可以有超时函数,单位秒")]),s._v(" "),a("li",[s._v("read() 读取返回body数据")])]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用代理服务器, 打开请求过程的 debuglog")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("use_proxy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("proxy_addr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" headers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),s._v(" proxy_addr\n\tproxyHandler "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ProxyHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" proxy_addr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# build_opener(*handlers) 绑定一些句柄")]),s._v("\n\topener "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("build_opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("proxyHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("HTTPHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("debuglevel"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\turllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("install_opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\trequest "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" data"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" headers"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("headers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tresponse "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("urlopen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("timeout"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("read"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# linux 需要安装代理软件squid, 默认代理http_proxy 端口是3128")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("h2",{attrs:{id:"附带一个有道翻译接口例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#附带一个有道翻译接口例子"}},[s._v("#")]),s._v(" 附带一个有道翻译接口例子")]),s._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#encoding=utf8")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" urllib"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" urllib2\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 请求地址url")]),s._v("\nurl "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule"')]),s._v("\n\nrequest_headers "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Host"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'fanyi.youdao.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"User-Agent"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 发送给服务器的表单")]),s._v("\nform_data "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"i"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"woman"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"from"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"AUTO"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"to"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"AUTO"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"smartresult"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dict"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"doctype"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"version"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"keyfrom"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"fanyi.web"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"action"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"FY_BY_REALTIME"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"typoResult"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"false"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# POST发送的data必须为bytes或bytes类型的可迭代对象，不能是字符串")]),s._v("\nform_data "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("urlencode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("form_data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 构造请求对象Request")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# req = urllib2.Request(url, data=form_data, headers=request_headers)")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("def")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("use_proxy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("proxy_addr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" headers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),s._v(" proxy_addr\n\tproxy "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ProxyHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" proxy_addr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# build_opener(*handlers) 绑定一些句柄")]),s._v("\n\than "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("build_opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("proxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("HTTPHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("debuglevel"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\turllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("install_opener"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("han"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),s._v(" url\n\trequest "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" data"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" headers"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("headers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tresponse "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" urllib2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("urlopen"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("timeout"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("read"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 发起请求")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# response = urllib2.urlopen(req)")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# data = response.read()")]),s._v("\n\ndata "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" use_proxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:3128"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" form_data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" request_headers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("print")]),s._v(" data\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br")])]),a("h2",{attrs:{id:"urlerror-异常"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#urlerror-异常"}},[s._v("#")]),s._v(" URLError 异常")]),s._v(" "),a("h2",{attrs:{id:"request-模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request-模块"}},[s._v("#")]),s._v(" request 模块")]),s._v(" "),a("ul",[a("li",[s._v("第三方模块，需要pip install 安装")]),s._v(" "),a("li",[s._v("其实也是封装了urllib3的功能, 也改进了一部分")])])])}),[],!1,null,null,null);t.default=r.exports}}]);