(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{499:function(s,t,n){"use strict";n.r(t);var a=n(56),r=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"lua的string相关操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#lua的string相关操作"}},[s._v("#")]),s._v(" lua的string相关操作")]),s._v(" "),n("div",{staticClass:"language-lua line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-lua"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 实现特定字符分割字符串")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("explode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("deli"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" str"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" find_pos "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" t "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("true")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n\t\tfind_pos "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" deli"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 第三个参数是查找的开始位置")]),s._v("\n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("not")]),s._v(" find_pos  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v(" \n\t\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),s._v(" \n\t\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("end")]),s._v("\n\n\t\tt"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("#")]),s._v("t"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("sub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" start"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" find_pos "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n\t\tstart "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" find_pos "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 测试 explode ")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" x "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"aaaa,bbb,ccc,111,tt,111"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" arr "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("explode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('","')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" x "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("ipairs")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("arr"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("i"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("end")]),s._v("\n\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("char")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("97")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- a")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 97")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("#")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"中"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--3 个字节")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"中"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 228 ")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"中"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 184")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("byte")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"中"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 173")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--[[\n1110 0100\nE 4 \n128 1011 1000\nB 8\n128 1010 1101\nA D\n128 \n-- string.gsub\ns ,c = string.gsub(\"all lii\", 'l', 'x', 2) -- 替换2次l为x\nprint(s, c) -- axx lii 2 。 c表示替换次数\n\n\n--[[\n. 任意字符\n%a 字母\n%c 控制字符\n%d 数字\n%l 小写字母\n%p 标点字符\n%s 空白符\n%u 大写字母\n%w 字母和数字\n%x 十六进制数字\n%z 代表 0 的字符\n]]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- %A 大写的都表示补集，非%a")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 特殊字符")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- ( ) . % --[[")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 正则匹配")]),s._v("\ntest "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"int x; /* 111111 */ int y; /* 22222 */"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- .* 是匹配0次或多次字符， 最长匹配")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/%*.*%*/"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"注释"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- int x; 注释  1次 ")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- .- 也是匹配0次或多次字符，是最短匹配")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/%*.-%*/"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"注释"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- int x; 注释 int y; 注释 2")]),s._v("\n\n\ntest "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"a (enclosed (in) parentheses) line"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%bes"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" \n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 匹配%b后面的两个字母es之间的内容，包括 e和s， ")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 4， 9")]),s._v("\n\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 捕获功能1")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 用括号括起来的部分就叫做一个捕获 capture")]),s._v("\npair "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'name = anna'")]),s._v("\n\na"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" key "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" value "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("pair"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"(%a+)%s=%s(%a+)"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" key"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" value"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 1       11      name    anna ")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- a,b是找到的整个匹配的起点和终点")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 除了前两个参数，后面的每个值，对应一个小括号中的匹配值")]),s._v("\n\ndate "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"17/7/1970"')]),s._v("\n_"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("_"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("d"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("m"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("y "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("date"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(' "'),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("%")]),s._v("d\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 捕获功能2 ,匹配引号之间的数据")]),s._v("\n\ns "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("[[then he said: \"it's all righ't\"!]]")]),s._v("\na"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" c"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("  quote_str"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"([\\"\\\'])(.-)%1"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('-- a, b , c,  quote_str= string.find(s, "([\\"])(.-)[\\"]")')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("b"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" c"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" quote_str"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- %1 表示第一个小括号的匹配值")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello lua"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"(%a)"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%1-%1"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- h-he-el-ll-lo-o L-Lu-ua-a")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hello lua"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"(.)(.)"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%2%1"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 替换相邻字符")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- --\x3e ehll ouLa")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 捕获3 -替换")]),s._v("\nx "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\\\command {some text}"')]),s._v("  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- LaTeX格式")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 转成html格式 <command> some text </command>")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\\\(%ax = "')]),s._v("the \\\\"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("quote")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("task"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" is to \\\\"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("em")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("change"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(' that"\n'),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(' "'),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\\\\"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("%")]),s._v("a\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- trim函数替换空格")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("trim")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^%s*(.-)%s*$"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"%1"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("end")]),s._v("\nx "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('" hello "')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"xxx"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("..")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("trim")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("..")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"aa"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 捕获4")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("expand")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\ts "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(' "$'),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("%")]),s._v("w\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 捕获5")]),s._v("\ns "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sin(3) = $[math.sin(3)]; 2^5 = $[2^5]"')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" ret "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("gsub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("s"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"$(%b[])"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\tx "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"return "')]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("..")]),s._v(" string"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("sub")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" f "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("loadstring")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- loadstring 类似定义一个函数体")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("f")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("end")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 替换匹配的math.sin(3) 为计算额结果, 2^5 也为计算结果")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ret"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br"),n("span",{staticClass:"line-number"},[s._v("44")]),n("br"),n("span",{staticClass:"line-number"},[s._v("45")]),n("br"),n("span",{staticClass:"line-number"},[s._v("46")]),n("br"),n("span",{staticClass:"line-number"},[s._v("47")]),n("br"),n("span",{staticClass:"line-number"},[s._v("48")]),n("br"),n("span",{staticClass:"line-number"},[s._v("49")]),n("br"),n("span",{staticClass:"line-number"},[s._v("50")]),n("br"),n("span",{staticClass:"line-number"},[s._v("51")]),n("br"),n("span",{staticClass:"line-number"},[s._v("52")]),n("br"),n("span",{staticClass:"line-number"},[s._v("53")]),n("br"),n("span",{staticClass:"line-number"},[s._v("54")]),n("br"),n("span",{staticClass:"line-number"},[s._v("55")]),n("br"),n("span",{staticClass:"line-number"},[s._v("56")]),n("br"),n("span",{staticClass:"line-number"},[s._v("57")]),n("br"),n("span",{staticClass:"line-number"},[s._v("58")]),n("br"),n("span",{staticClass:"line-number"},[s._v("59")]),n("br"),n("span",{staticClass:"line-number"},[s._v("60")]),n("br"),n("span",{staticClass:"line-number"},[s._v("61")]),n("br"),n("span",{staticClass:"line-number"},[s._v("62")]),n("br"),n("span",{staticClass:"line-number"},[s._v("63")]),n("br"),n("span",{staticClass:"line-number"},[s._v("64")]),n("br"),n("span",{staticClass:"line-number"},[s._v("65")]),n("br"),n("span",{staticClass:"line-number"},[s._v("66")]),n("br"),n("span",{staticClass:"line-number"},[s._v("67")]),n("br"),n("span",{staticClass:"line-number"},[s._v("68")]),n("br"),n("span",{staticClass:"line-number"},[s._v("69")]),n("br"),n("span",{staticClass:"line-number"},[s._v("70")]),n("br"),n("span",{staticClass:"line-number"},[s._v("71")]),n("br"),n("span",{staticClass:"line-number"},[s._v("72")]),n("br"),n("span",{staticClass:"line-number"},[s._v("73")]),n("br"),n("span",{staticClass:"line-number"},[s._v("74")]),n("br"),n("span",{staticClass:"line-number"},[s._v("75")]),n("br"),n("span",{staticClass:"line-number"},[s._v("76")]),n("br"),n("span",{staticClass:"line-number"},[s._v("77")]),n("br"),n("span",{staticClass:"line-number"},[s._v("78")]),n("br"),n("span",{staticClass:"line-number"},[s._v("79")]),n("br"),n("span",{staticClass:"line-number"},[s._v("80")]),n("br"),n("span",{staticClass:"line-number"},[s._v("81")]),n("br"),n("span",{staticClass:"line-number"},[s._v("82")]),n("br"),n("span",{staticClass:"line-number"},[s._v("83")]),n("br"),n("span",{staticClass:"line-number"},[s._v("84")]),n("br"),n("span",{staticClass:"line-number"},[s._v("85")]),n("br"),n("span",{staticClass:"line-number"},[s._v("86")]),n("br"),n("span",{staticClass:"line-number"},[s._v("87")]),n("br"),n("span",{staticClass:"line-number"},[s._v("88")]),n("br"),n("span",{staticClass:"line-number"},[s._v("89")]),n("br"),n("span",{staticClass:"line-number"},[s._v("90")]),n("br"),n("span",{staticClass:"line-number"},[s._v("91")]),n("br"),n("span",{staticClass:"line-number"},[s._v("92")]),n("br"),n("span",{staticClass:"line-number"},[s._v("93")]),n("br"),n("span",{staticClass:"line-number"},[s._v("94")]),n("br"),n("span",{staticClass:"line-number"},[s._v("95")]),n("br"),n("span",{staticClass:"line-number"},[s._v("96")]),n("br"),n("span",{staticClass:"line-number"},[s._v("97")]),n("br"),n("span",{staticClass:"line-number"},[s._v("98")]),n("br"),n("span",{staticClass:"line-number"},[s._v("99")]),n("br"),n("span",{staticClass:"line-number"},[s._v("100")]),n("br"),n("span",{staticClass:"line-number"},[s._v("101")]),n("br"),n("span",{staticClass:"line-number"},[s._v("102")]),n("br"),n("span",{staticClass:"line-number"},[s._v("103")]),n("br"),n("span",{staticClass:"line-number"},[s._v("104")]),n("br"),n("span",{staticClass:"line-number"},[s._v("105")]),n("br"),n("span",{staticClass:"line-number"},[s._v("106")]),n("br"),n("span",{staticClass:"line-number"},[s._v("107")]),n("br"),n("span",{staticClass:"line-number"},[s._v("108")]),n("br"),n("span",{staticClass:"line-number"},[s._v("109")]),n("br"),n("span",{staticClass:"line-number"},[s._v("110")]),n("br"),n("span",{staticClass:"line-number"},[s._v("111")]),n("br"),n("span",{staticClass:"line-number"},[s._v("112")]),n("br"),n("span",{staticClass:"line-number"},[s._v("113")]),n("br"),n("span",{staticClass:"line-number"},[s._v("114")]),n("br"),n("span",{staticClass:"line-number"},[s._v("115")]),n("br"),n("span",{staticClass:"line-number"},[s._v("116")]),n("br"),n("span",{staticClass:"line-number"},[s._v("117")]),n("br"),n("span",{staticClass:"line-number"},[s._v("118")]),n("br"),n("span",{staticClass:"line-number"},[s._v("119")]),n("br"),n("span",{staticClass:"line-number"},[s._v("120")]),n("br"),n("span",{staticClass:"line-number"},[s._v("121")]),n("br"),n("span",{staticClass:"line-number"},[s._v("122")]),n("br"),n("span",{staticClass:"line-number"},[s._v("123")]),n("br"),n("span",{staticClass:"line-number"},[s._v("124")]),n("br"),n("span",{staticClass:"line-number"},[s._v("125")]),n("br"),n("span",{staticClass:"line-number"},[s._v("126")]),n("br"),n("span",{staticClass:"line-number"},[s._v("127")]),n("br"),n("span",{staticClass:"line-number"},[s._v("128")]),n("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);