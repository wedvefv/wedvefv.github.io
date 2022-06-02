(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{480:function(s,a,n){"use strict";n.r(a);var t=n(56),e=Object(t.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"学习nginx变量-openresty"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#学习nginx变量-openresty"}},[s._v("#")]),s._v(" 学习nginx变量[openresty]")]),s._v(" "),n("p",[s._v('使用set $a  "hello" 创建变量')]),s._v(" "),n("p",[s._v("可以向php一样${a} 插入变量, nginx变量只有一种类型，即字符串")]),s._v(" "),n("p",[s._v("不创建变量，加载conf会失败")]),s._v(" "),n("p",[s._v("变量创建后，可见性是整个nginx，无论在哪个location set，其他location都可见\n但是只有所在的location，能使用，其他location会视为空字符串\n也就是nginx的变量生命期，是不能跨越请求边界的。")]),s._v(" "),n("h2",{attrs:{id:"变量2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量2"}},[s._v("#")]),s._v(" 变量2")]),s._v(" "),n("p",[s._v("ngx_echo 模块和rewrite模块实现的内部跳转，location A 到location B，则A中设置的变量，b中也可见。使用的是同一套变量副本")]),s._v(" "),n("p",[s._v("nginx 变量的生命期和正在处理的请求绑定，与location无关")]),s._v(" "),n("p",[s._v("nginx set创建的用户变量， 还有nginx自己定义的内建变量: $uri..$request_uri")]),s._v(" "),n("p",[s._v("get参数这一系列变量时都是arg_前缀开始的，而且nginx灰板get参数统一都转成小写")]),s._v(" "),n("p",[s._v("一些只读的内建变量，是不允许 修改的")]),s._v(" "),n("h2",{attrs:{id:"变量3"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量3"}},[s._v("#")]),s._v(" 变量3")]),s._v(" "),n("p",[s._v('通过 set $args "foo=1&bar=2"; 可以修改get参数部分, 这是整体修改,$arg_xxx也会变')]),s._v(" "),n("p",[s._v("proxy_pass 之前也是可以通过set 修改$args的")]),s._v(" "),n("h2",{attrs:{id:"变量4"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量4"}},[s._v("#")]),s._v(" 变量4")]),s._v(" "),n("p",[s._v("map 会存在惰性求值（也就是为了避免重复计算，会缓存第一次得到的值）")]),s._v(" "),n("h2",{attrs:{id:"变量5"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量5"}},[s._v("#")]),s._v(" 变量5")]),s._v(" "),n("p",[s._v("内部location自请求，各自的内部都有自己的变量，一般不会和主请求共用一套变量，但是有些模块会共用")]),s._v(" "),n("h2",{attrs:{id:"变量6"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量6"}},[s._v("#")]),s._v(" 变量6")]),s._v(" "),n("p",[s._v("curl --data 选项会自动请求post方法")]),s._v(" "),n("p",[s._v("并非所有的内建变量都作用于当前请求，少数请求只作用于主请求, 比如$request_method（只返回父请求的方法）")]),s._v(" "),n("p",[s._v("ngx_echo 模块发起的子请求都禁用了父子请求之间的变量共享, 所以$request_method 获取函数是只会取（主请求的方法）")]),s._v(" "),n("p",[s._v("这些变量都是通过自己的get方法获取的（取值程序： 而不是直接获取变量的值） 类型java对象的get/set")]),s._v(" "),n("p",[s._v("通过$echo_request_method 能取到父子请求各自的请求方法")]),s._v(" "),n("p",[s._v("ngx_auth_request模块就是父子共享一套变量。这会很坑, 如果在main里你设置tag=1, 但是如果你在echo tag之前发起子请求，自请求设置的tag=2； namemain中echo tag也是2，而不是设置的1；")]),s._v(" "),n("h2",{attrs:{id:"变量7"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量7"}},[s._v("#")]),s._v(" 变量7")]),s._v(" "),n("p",[s._v('nginx set创建的变量，是整个文件可见的。如果在某个location中未初始化就使用： nginx取值处理程序就会默认缓存成空字符串，在error.log 中输出 using uninitialized "" varuable ....')]),s._v(" "),n("p",[s._v("如果压根就没有set创建，直接使用，则reload配置文件就会失败, 如果在lua中判断就是nil")]),s._v(" "),n("p",[s._v('如果$arg_xxx不存在，这个参数，打印的时候nginx会处理成功空字符串显示，和name=""这种就不好区分了， ngx_lua可以区分，因为参数不存在是nil； 值不存在，nginx不会打印警告，所以我们可以通过ngx_lua来捕捉这种痕迹。')]),s._v(" "),n("h2",{attrs:{id:"变量8"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#变量8"}},[s._v("#")]),s._v(" 变量8")]),s._v(" "),n("p",[s._v("content_by_lua指令并不支持 变量插值 比如$x;")]),s._v(" "),n("p",[s._v("尝试获取未初始化的 “不合法”变量，nginx就会自动调用 “取处理程序” 返回空字符串， 所以不合法这种情况，不太好捕捉。")]),s._v(" "),n("h2",{attrs:{id:"执行顺序1"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#执行顺序1"}},[s._v("#")]),s._v(" 执行顺序1")]),s._v(" "),n("p",[s._v("先执行rewrite, access，content")]),s._v(" "),n("p",[s._v("set指令是rewrite阶段的指令，都会先执行")]),s._v(" "),n("p",[s._v("echo指令是content阶段执行的")]),s._v(" "),n("p",[s._v("某些声明性的指令，一般没有运行阶段，当配置指令运行在content阶段，则一般会指示运行阶段。")]),s._v(" "),n("h2",{attrs:{id:"执行顺序2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#执行顺序2"}},[s._v("#")]),s._v(" 执行顺序2")]),s._v(" "),n("p",[s._v("location中的set， rewrite指令都运行在 rewrite阶段")]),s._v(" "),n("p",[s._v("server中的 set， rewrite执行运行在更早的server-rewrite阶段")]),s._v(" "),n("p",[s._v("ngx_set_misc模块也运行在rewrite阶段，所以其包含的指令可以和ngx_rewrite模块混合在一起用。")]),s._v(" "),n("p",[s._v("set_by_lua 指令也可以和set这样的ngx_rewrite模块一起混用，")]),s._v(" "),n("div",{staticClass:"language-perl line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-perl"}},[n("code",[s._v("set_bylua "),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$c")]),s._v(' "'),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" ngx"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(".")]),s._v("var"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(".")]),s._v("a ngx_rewrite模块以及能和他一起混合使用的第三方都是把指令注入到ngx_rewrite执行序列中（借助了ngx_devel_kit模块）\n\n另外一些常规的在rewrite阶段的模块，虽然也运行在rewrite阶段，但是和ngx_rewrite模块的指令是分开的，所以执行顺序不确定。\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 执行顺序3")]),s._v("\n\nrewrite_by_lua 是运行在 rewrite阶段的末尾， more_set_input_headers 也是rewrite末尾，二者执行顺序不固定，不应该写二者有依赖关系的配置。\n\nrewrite_by_lua 是运行在所有set指令之后。\n\n标准的ngx_access 运行在rewrite之后，比如allow和deny限制ip的指令"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" ngx_auth_request指令也是这个阶段\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 执行顺序4")]),s._v("\n\nngx_lua 模块的access_by_lua指令运行在access阶段末尾"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(".")]),s._v("因此也是在allow。deny这样的指令之后。\n\nngx_access标准模块，比access_by_lua快了一个数量级，前者是c写的，\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);