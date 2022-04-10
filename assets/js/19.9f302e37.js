(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{416:function(a,s,e){"use strict";e.r(s);var t=e(56),l=Object(t.a)({},(function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h2",{attrs:{id:"介绍hugo的模板"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#介绍hugo的模板"}},[a._v("#")]),a._v(" 介绍hugo的模板")]),a._v(" "),e("ul",[e("li",[a._v("hugo 使用go的html/template 和text/templete 库为基础进行模板操作")])]),a._v(" "),e("blockquote",[e("p",[a._v("下面只是基础的go template操作，为了更深度的了解请看 "),e("a",{attrs:{href:"https://golang.org/pkg/text/template/",target:"_blank",rel:"noopener noreferrer"}},[a._v("go文档"),e("OutboundLink")],1)])]),a._v(" "),e("ul",[e("li",[a._v("go 模板提供了一种非常简单的模板语言，他坚信只有最基本的逻辑才是属于模板和视图层。")])]),a._v(" "),e("h3",{attrs:{id:"基本语法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基本语法"}},[a._v("#")]),a._v(" 基本语法")]),a._v(" "),e("p",[a._v("go 模板是html文件，加上一些变量和函数，变量和函数使用   "+a._s()+" 获取。")]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ .Title }}\n{{ $address }}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br")])]),e("p",[a._v("函数的参数使用 空格分隔 ，像这样")]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ function arg1 arg2 }}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("ul",[e("li",[a._v("方法和字段通过点号访问")])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ .Params.bar }}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("ul",[e("li",[a._v("圆括号可以分组")])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{{if or (isset .Params "alt") (isset .Params "caption")}} Catption {{end}}\n')])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("ul",[e("li",[a._v("一条语句能拆成多行")])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{{ if or \n  (isset .Params "alt") \n  (isset .Params "caption")\n}}\n')])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br"),e("span",{staticClass:"line-number"},[a._v("4")]),e("br")])]),e("ul",[e("li",[a._v("原始字符串可以包含换行")])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ $msg := `Line one \nLine two. `}}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br")])]),e("h3",{attrs:{id:"变量-variable"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#变量-variable"}},[a._v("#")]),a._v(" 变量- variable")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("每个go模板都有一个data对象， 在hugo中，每个模板传递一个页面，在下面的例子中， .Title 是")]),a._v(" "),e("p",[a._v("可以访问的page  变量中的一个。")])]),a._v(" "),e("li",[e("p",[a._v("因为页面的默认范围就是整个模板， 所以Title元素可以用.Title 访问。")])])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("<title> {{.Title }} </title>\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("ul",[e("li",[a._v("变量也可以存储自定义变量，在后续被提及到。")])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{{ $address := "123 main st." }}\n{{ $address }}\n\n')])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])]),e("blockquote",[e("p",[a._v("hugo 在v0.47以及更老的版本，if条件中被定义的变量")])]),a._v(" "),e("blockquote",[e("p",[a._v("hugo 在v0.48以后的版本，可以用=号重新定义")]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('{{ $var := "hello "}}\n{{ if .IsHome }}\n\t{{ $var = "wolrd"}}\n{{end}}\nvar is {{$var}}\n')])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br"),e("span",{staticClass:"line-number"},[a._v("4")]),e("br"),e("span",{staticClass:"line-number"},[a._v("5")]),e("br")])])]),a._v(" "),e("h2",{attrs:{id:"函数-functions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#函数-functions"}},[a._v("#")]),a._v(" 函数- functions")]),a._v(" "),e("ul",[e("li",[a._v("go模板只附带了一部分基本的函数，但是也提供了一种机制来扩展原始集。")]),a._v(" "),e("li",[a._v("hugo模板函数提供了额外的功能函数明确用户构建网站， 函数调用方法是函数名 空格加参数。")]),a._v(" "),e("li",[a._v("如果不重新编译hugo，就不能增加模板函数。")])]),a._v(" "),e("h2",{attrs:{id:"includes"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#includes"}},[a._v("#")]),a._v(" includes")]),a._v(" "),e("ul",[e("li",[a._v("当需要包含一个模板时， 需要传递他需要的数据")])]),a._v(" "),e("h2",{attrs:{id:"partial"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#partial"}},[a._v("#")]),a._v(" partial")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("这个函数是用来include partial模板")])]),a._v(" "),e("li",[e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ partial 'header.html' .}}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])])])]),a._v(" "),e("h2",{attrs:{id:"template"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#template"}},[a._v("#")]),a._v(" Template")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("这个函数也是包含partial模板，是应用于更老的hugo版本。现在更多地用于调用内部模板。")])]),a._v(" "),e("li",[e("p",[a._v("语法")])]),a._v(" "),e("li",[e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('\t{{ templete "_internal/hello.html" .}}\n')])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])])])]),a._v(" "),e("h2",{attrs:{id:"迭代-iteration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#迭代-iteration"}},[a._v("#")]),a._v(" 迭代 iteration")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("go 模板使用 range 来迭代map、array、slice等")])]),a._v(" "),e("li",[e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ range $array }}\n\t{{.}}  \n{{end}}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])])]),a._v(" "),e("li",[e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ range $elem_val := $array }}\n\t{{ $ele_val }}\n{{end}}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])])]),a._v(" "),e("li",[e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ range $ele_index, $elem_val := $array }}\n\t{{ $elem_index }} -- {{ $elem_val }}\n{{end}}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])])]),a._v(" "),e("li",[e("p",[a._v("如果map， array，slice长度为0， 则range时条件为假， 会走到else分支。")])])]),a._v(" "),e("h2",{attrs:{id:"conditionals"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#conditionals"}},[a._v("#")]),a._v(" Conditionals")]),a._v(" "),e("ul",[e("li",[a._v("If、else、with、or、and 、not 构建了go模板操作的逻辑框架。")]),a._v(" "),e("li",[a._v("Range、if 、with 都是以 "+a._s(a.end)+"来结束的。")]),a._v(" "),e("li",[a._v("go 模板对于以下值认为是false： false(boolean)、0、zero-length的map、slice、string、array")])]),a._v(" "),e("h3",{attrs:{id:"with"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#with"}},[a._v("#")]),a._v(" with")]),a._v(" "),e("ul",[e("li",[a._v("如果条件值不存在，或者为false，则跳过次block")])]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("{{ with .Params.title }}\n\t<h4> {{.}} </h4>\n{{end}}\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])]),e("h2",{attrs:{id:"with-else"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#with-else"}},[a._v("#")]),a._v(" with .. else")])])}),[],!1,null,null,null);s.default=l.exports}}]);