(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{492:function(t,s,a){"use strict";a.r(s);var n=a(56),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"python-导入模块文件的2中方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#python-导入模块文件的2中方式"}},[t._v("#")]),t._v(" python 导入模块文件的2中方式")]),t._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" lib "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("or")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" lib "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 导入子目录中模块")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" tmp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lib3  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("or")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" tmp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lib3 "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 导入上级目录")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" sys\nsys"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("append"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'home/app/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" mod\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" xxxx\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br")])]),a("ul",[a("li",[a("p",[t._v("与import类似, 被导入的module仍然会执行且仅执行一次")])]),t._v(" "),a("li",[a("p",[t._v("from *** import 的实质")])]),t._v(" "),a("li",[a("p",[t._v('当以 "from *** import " 方式导入module时, python会在当前module 的命名空间中新建相应的命名. 即, "from t2 import var1" 相当于:')])])]),t._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" t2\n  var1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" t2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("var1\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("from package import item  # 这种方式，item可以是包中的一个子模块或子包，也可以是包中定义的其他命名，像函数、类、变量。")]),t._v(" "),a("li",[t._v("import item.subitem.subsubitem # 这些子项必须是包，最后的子项是包或模块。但不能为函数、类或变量。否则出错：No module named ***")])]),t._v(" "),a("h2",{attrs:{id:"init-py-的作用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#init-py-的作用"}},[t._v("#")]),t._v(" __init__.py 的作用")]),t._v(" "),a("p",[t._v("python import package都是根据每个module的__name__来实现的。\n比如说，有一个文件夹结构为：")]),t._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("package"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("\n    __init__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("py\n    subpackage1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("\n        __init__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("py\n        moduleX"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("py\n    moduleA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("py\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("ul",[a("li",[a("p",[t._v("那么，如果（在这个package文件夹之外，比如package的同级文件夹下建立运行一个run.py）运行一个script，来导入moduleX模块，那么这个moduleX的__name__就是.package.subpackage1.moduleX，由于moduleX获得了前述名称，那么在moduleX.py内部就可以有relative import的语句，比如说：from .. import moduleA")])]),t._v(" "),a("li",[a("p",[t._v("而moduleX之所以能够获得的.package.subpackage1.moduleX的__name__ attribute属性，前提是package被python解释器识别成了一个package来处理（比如在package的同级文件夹下的运行的run.py有import package.subpackage1.moduleX之类的语句）。可是，如果每一个被我直接run的python script都会被视作是top-level script。top-level script的__name__被自动设置成__main__。因此，如果我从package文件夹内部直接运行moduleA.py这个脚本，那么它的__name__就被置成了__main__，python也不会把它当作一个package，其中的relative import的语句自然就无法起作用了。")])])]),t._v(" "),a("h2",{attrs:{id:"总之-运行脚本要在包目录的外层-包里面的模块之间才能用-或则-等相对路径做导入操作。换句话-就是存在from-import-xxx-的文件不能直接python-xxx-py操作-即使存在-init-py-也不会被认为是一个包。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总之-运行脚本要在包目录的外层-包里面的模块之间才能用-或则-等相对路径做导入操作。换句话-就是存在from-import-xxx-的文件不能直接python-xxx-py操作-即使存在-init-py-也不会被认为是一个包。"}},[t._v("#")]),t._v(" 总之，运行脚本要在包目录的外层，包里面的模块之间才能用. 或则 ..等相对路径做导入操作。换句话，就是存在from .. import xxx 的文件不能直接python xxx.py操作，即使存在__init__.py, .也不会被认为是一个包。")])])}),[],!1,null,null,null);s.default=e.exports}}]);