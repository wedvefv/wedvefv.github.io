(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{505:function(t,v,_){"use strict";_.r(v);var e=_(56),r=Object(e.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"什么是正则表达式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么是正则表达式"}},[t._v("#")]),t._v(" 什么是正则表达式")]),t._v(" "),_("ul",[_("li",[t._v("起源于神经网络研究，由数学家Stephen Kleene总结 Warren McCulloch和Walter Pitts早期工作基础之上,发表了一篇题目是《神经网事件的表示法》的论文, 利用称之为正则集合的数学符号来描述此模型，引入了正则表达式的概念")]),t._v(" "),_("li",[t._v("unix之父Ken Thompson 将其利用到搜索算法，将此富豪系统引入编辑器QED，然后是unix上ed编辑器，最后引入grep。")]),t._v(" "),_("li",[t._v("perl的正则源于regex, 之后演化成pcre（perl兼容的正则表达式）")]),t._v(" "),_("li",[t._v("正则表达式引擎\n"),_("ul",[_("li",[t._v("DFA 引擎在线性时状态下执行，因为它们不要求回溯（并因此它们永远不测试相同的字符两次）。DFA 引擎还可以确保匹配最长的可能的字符串。但是，因为 DFA 引擎只包含有限的状态，所以它不能匹配具有反向引用的模式；并且因为它不构造显示扩展，所以它不可以捕获子表达式")]),t._v(" "),_("li",[t._v("NFA 引擎运行所谓的“贪婪的”匹配回溯算法，以指定顺序测试正则表达式的所有可能的扩展并接受第一个匹配项。因为传统的 NFA 构造正则表达式的特定扩展以获得成功的匹配，所以它可以捕获子表达式匹配和匹配的反向引用。但是，因为传统的 NFA 回溯，所以它可以访问完全相同的状态多次（如果通过不同的路径到达该状态）。因此，在最坏情况下，它的执行速度可能非常慢。因为传统的 NFA 接受它找到的第一个匹配，所以它还可能会导致其他（可能更长）匹配未被发现")]),t._v(" "),_("li",[t._v("POSIX NFA 引擎与传统的 NFA 引擎类似，不同的一点在于：在它们可以确保已找到了可能的最长的匹配之前，它们将继续回溯。因此，POSIX NFA 引擎的速度慢于传统的 NFA 引擎；并且在使用 POSIX NFA 时，您恐怕不会愿意在更改回溯搜索的顺序的情况下来支持较短的匹配搜索，而非较长的匹配搜索")])])]),t._v(" "),_("li",[t._v("使用DFA引擎的程序主要有：awk,egrep,flex,lex,MySQL,Procmail等；")]),t._v(" "),_("li",[t._v("使用传统型NFA引擎的程序主要有：GNU Emacs,Java,ergp,less,more,.NET语言,PCRE library,Perl,PHP,Python,Ruby,sed,vi；")]),t._v(" "),_("li",[t._v("使用POSIX NFA引擎的程序主要有：mawk,Mortice Kern Systems’ utilities,GNU Emacs(使用时可以明确指定)；")]),t._v(" "),_("li",[t._v("也有使用DFA/NFA混合的引擎：GNU awk,GNU grep/egrep,Tcl。")]),t._v(" "),_("li",[t._v("举例简单说明NFA与DFA工作的区别：\n"),_("ul",[_("li",[t._v("比如有字符串this is yansen’s blog，正则表达式为 /ya(msen|nsen|nsem)/ (不要在乎表达式怎么样，这里只是为了说明引擎间的工作区别)。")]),t._v(" "),_("li",[t._v("NFA工作方式如下，先在字符串中查找 y 然后匹配其后是否为 a ，如果是 a 则继续，查找其后是否为 m 如果不是则匹配其后是否为 n (此时淘汰msen选择支)。然后继续看其后是否依次为 s,e，接着测试是否为 n ，是 n 则匹配成功，不是则测试是否为 m 。为什么是 m ？因为 NFA 工作方式是以正则表达式为标准，反复测试字符串，这样同样一个字符串有可能被反复测试了很多次！")]),t._v(" "),_("li",[t._v("而DFA则不是如此，DFA会从 this 中 t 开始依次查找 y，定位到 y ，已知其后为a，则查看表达式是否有 a ，此处正好有a 。然后字符串a 后为n ，DFA依次测试表达式，此时 msen 不符合要求淘汰。nsen 和 nsem 符合要求，然后DFA依次检查字符串，检测到sen 中的 n 时只有nsen 分支符合，则匹配成功！")])])]),t._v(" "),_("li",[t._v("由此可以看出来，两种引擎的工作方式完全不同\n"),_("ul",[_("li",[t._v("一个(NFA)以表达式为主导，一个(DFA)以文本为主导！一般而论，DFA引擎则搜索更快一些！")]),t._v(" "),_("li",[t._v("但是NFA以表达式为主导，反而更容易操纵，因此一般程序员更偏爱NFA引擎！")]),t._v(" "),_("li",[t._v("两种引擎各有所长，而真正的引用则取决与你的需要以及所使用的语言")])])])]),t._v(" "),_("h2",{attrs:{id:"正则表达式语法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#正则表达式语法"}},[t._v("#")]),t._v(" 正则表达式语法")]),t._v(" "),_("h3",{attrs:{id:"非打印字符"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#非打印字符"}},[t._v("#")]),t._v(" 非打印字符")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("字符")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("\\cx")]),t._v(" "),_("td",[t._v("x必须是大小写字母，表示控制字符 \\cM 匹配control### 特殊字符(匹配时需要\\转义)")])])])]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("字符")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody")]),t._v(" "),_("p",[t._v("$｜匹配字符串的结尾，如果设置了regExp对象设置了Multiline，也可以匹配\\n和\\r\n()|标记子表达式的开始和结尾，子表达式可被后来捕获。\n*｜匹配前面子表达式0或多次\n.|匹配一次或者多次\n[|标记一个中括号表达式的开始\n?|前面子表达式匹配0或1次\n|标记下一个字符是特殊字符, 或者原义字符，或向后引用，或8进制转义符 ?ascii是63,8进制是77, 可以用?或者\\077 表示。\n^｜输入字符串的开头，如果在中括号内，表示不接受中括号中的字符集合\n{|标记限定符号,\n||指明两项之间的一个选择")]),t._v(" "),_("h3",{attrs:{id:"限定字符"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#限定字符"}},[t._v("#")]),t._v(" 限定字符")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("字符")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("*")]),t._v(" "),_("td",[t._v("匹配前面的子表达式0次或者多次 等价于{0,}")])])])]),t._v(" "),_("h3",{attrs:{id:"定位符"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#定位符"}},[t._v("#")]),t._v(" 定位符")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("字符")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("^")]),t._v(" "),_("td",[t._v("匹配输入字符串的开始位置")])]),t._v(" "),_("tr",[_("td",[t._v("$")]),t._v(" "),_("td",[t._v("匹配输入字符串的结束位置")])]),t._v(" "),_("tr",[_("td",[t._v("\\b")]),t._v(" "),_("td",[t._v("匹配一个单词的边界")])]),t._v(" "),_("tr",[_("td",[t._v("\\B")]),t._v(" "),_("td",[t._v("匹配非单词边界")])])])]),t._v(" "),_("h3",{attrs:{id:"元字符"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#元字符"}},[t._v("#")]),t._v(" 元字符")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("字符")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("\\")]),t._v(" "),_("td",[t._v('将下一个字符标记为一个特殊字符、或一个原义字符、或一个 向后引用、或一个八进制转义符。例如，\'n\' 匹配字符 "n"。\'\\n\' 匹配一个换行符。序列 \'\\\' 匹配 "" 而 "(" 则匹配 "("。')])]),t._v(" "),_("tr",[_("td",[t._v("^")]),t._v(" "),_("td",[t._v("匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\\n' 或 '\\r' 之后的位置。")])]),t._v(" "),_("tr",[_("td",[t._v("$")]),t._v(" "),_("td",[t._v("匹配输入字符串的结束位置。如果设置了RegExp 对象的 Multiline 属性，$ 也匹配 '\\n' 或 '\\r' 之前的位置。")])]),t._v(" "),_("tr",[_("td",[t._v("*")]),t._v(" "),_("td",[t._v('匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。')])])])]),t._v(" "),_("h3",{attrs:{id:"运算符优先级-高到低"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#运算符优先级-高到低"}},[t._v("#")]),t._v(" 运算符优先级(高到低)")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("字符")]),t._v(" "),_("th",[t._v("说明")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("|\t转义符")]),t._v(" "),_("td")]),t._v(" "),_("tr",[_("td",[t._v("(), (?😃, (?=), []")]),t._v(" "),_("td",[t._v("圆括号和方括号")])]),t._v(" "),_("tr",[_("td",[t._v("*, +, ?, {n}, {n,}, {n,m}")]),t._v(" "),_("td",[t._v("限定符")])]),t._v(" "),_("tr",[_("td",[t._v("^, $, \\任何元字符、任何字符")]),t._v(" "),_("td",[t._v("定位点和序列（即：位置和顺序）")])]),t._v(" "),_("tr",[_("td"),t._v(" "),_("td",[t._v('替换，"或"操作字符具有高于替换运算符的优先级，使得"m')])])])])])}),[],!1,null,null,null);v.default=r.exports}}]);