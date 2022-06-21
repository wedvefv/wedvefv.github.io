(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{513:function(t,s,a){"use strict";a.r(s);var n=a(56),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"lua正则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lua正则"}},[t._v("#")]),t._v(" lua正则")]),t._v(" "),a("h2",{attrs:{id:"lua正则特别之处"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lua正则特别之处"}},[t._v("#")]),t._v(" lua正则特别之处")]),t._v(" "),a("ul",[a("li",[t._v("并未使用POSIX规范的正则表达式，主要是太大，4000行")]),t._v(" "),a("li",[t._v("lua自己实现了模式匹配只有400行，基本满足要求")]),t._v(" "),a("li",[t._v("lua 使用%转义字符，其他语言貌似都是\\")])]),t._v(" "),a("h2",{attrs:{id:"模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模式"}},[t._v("#")]),t._v(" 模式")]),t._v(" "),a("ul",[a("li",[t._v("lua支持一下字符类")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("字符类")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v(".")]),t._v(" "),a("td",[t._v("任意字符")])]),t._v(" "),a("tr",[a("td",[t._v("%a")]),t._v(" "),a("td",[t._v("字母")])]),t._v(" "),a("tr",[a("td",[t._v("%c")]),t._v(" "),a("td",[t._v("控制字符")])]),t._v(" "),a("tr",[a("td",[t._v("%d")]),t._v(" "),a("td",[t._v("数字")])]),t._v(" "),a("tr",[a("td",[t._v("%l")]),t._v(" "),a("td",[t._v("小写字母")])]),t._v(" "),a("tr",[a("td",[t._v("%p")]),t._v(" "),a("td",[t._v("标点字符")])]),t._v(" "),a("tr",[a("td",[t._v("%s")]),t._v(" "),a("td",[t._v("空白符")])]),t._v(" "),a("tr",[a("td",[t._v("%u")]),t._v(" "),a("td",[t._v("大写字母")])]),t._v(" "),a("tr",[a("td",[t._v("%w")]),t._v(" "),a("td",[t._v("字母和数字")])]),t._v(" "),a("tr",[a("td",[t._v("%x")]),t._v(" "),a("td",[t._v("十六进制数字")])]),t._v(" "),a("tr",[a("td",[t._v("%z")]),t._v(" "),a("td",[t._v("代表0的字符")])])])]),t._v(" "),a("p",[t._v("上面的字符类，大写形式，表示补集， %A表示非字母")]),t._v(" "),a("h2",{attrs:{id:"特殊字符-匹配串需要-来转义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特殊字符-匹配串需要-来转义"}},[t._v("#")]),t._v(" 特殊字符 (匹配串需要%来转义)")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("字符类")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("(")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v(")")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v(".")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("%")]),t._v(" "),a("td")])])]),t._v(" "),a("h2",{attrs:{id:"修饰符-4个"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修饰符-4个"}},[t._v("#")]),t._v(" 修饰符(4个)")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("字符类")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody")]),t._v(" "),a("ul",[a("li",[t._v("* 是最长匹配 比如替换注释")])]),t._v(" "),a("div",{staticClass:"language-lua line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-lua"}},[a("code",[t._v("test"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"intx;/*x*/ inty;/*y*/"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("gsub")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/%*.*%*/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<COMMENT>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("--\x3e int x; <COMMENT>")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("- 是最短匹配")])]),t._v(" "),a("div",{staticClass:"language-lua line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-lua"}},[a("code",[t._v("test"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"intx;/*x*/ inty;/*y*/"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("gsub")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/%*.-%*/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<COMMENT>"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("--\x3e int x; <COMMENT> int y; <COMMENT>")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h2",{attrs:{id:"模式-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模式-2"}},[t._v("#")]),t._v(" 模式")]),t._v(" "),a("ul",[a("li",[t._v("就是多个字符类在一起表示的一个模式\n"),a("ul",[a("li",[t._v("比如日期 %d%d%d%d-%d%d-%d%d 就是一个模式串")]),t._v(" "),a("li",[t._v("lua语言的转义符还是\\ , 只有作用于函数的模式串使用%做转义。")]),t._v(" "),a("li",[t._v("[0-9] 这种叫做自定义的字符类，匹配一个数字 等价于%d")]),t._v(" "),a("li",[t._v("\\bxy 匹配x开始，y结束的字符串")])])])]),t._v(" "),a("div",{staticClass:"language-lua line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-lua"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("gsub")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"a (enclosed (in) aa) line"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%b()"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("---\x3e a line")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("常见的还有 '%b[]'，'%b%{%}' 和 '%b<>' 都是对称匹配")])]),t._v(" "),a("h2",{attrs:{id:"捕获"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#捕获"}},[t._v("#")]),t._v(" 捕获")]),t._v(" "),a("h2",{attrs:{id:"string库用到正则的函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string库用到正则的函数"}},[t._v("#")]),t._v(" string库用到正则的函数")])])}),[],!1,null,null,null);s.default=r.exports}}]);