(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{411:function(t,s,a){"use strict";a.r(s);var e=a(56),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git-基本操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-基本操作"}},[t._v("#")]),t._v(" git 基本操作")]),t._v(" "),a("h2",{attrs:{id:"创建分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建分支"}},[t._v("#")]),t._v(" 创建分支")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch new_branch\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"本地删除分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地删除分支"}},[t._v("#")]),t._v(" 本地删除分支")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -D delete_branch \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"更新到远程删除分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更新到远程删除分支"}},[t._v("#")]),t._v(" 更新到远程删除分支")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout master \n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull -u   -u origin :delete_branch\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h2",{attrs:{id:"git-pull-失败提示fatal-refusing-to-merge-unrelated-histories-处理方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-pull-失败提示fatal-refusing-to-merge-unrelated-histories-处理方法"}},[t._v("#")]),t._v(" git pull 失败提示fatal: refusing to merge unrelated histories ,处理方法")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin master --allow-unrelated-historiesn\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h1",{attrs:{id:"查看提交提记录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看提交提记录"}},[t._v("#")]),t._v(" 查看提交提记录")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log -p -2  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#查看最近两次的提交差异")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --stat "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#仅仅现实行数的变更")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --pretty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("oneline "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#每次提交，在一行显示")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --pretty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("format:"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%h - %an, %ar : %s"')]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#格式显示")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("table",[a("thead",[a("tr",[a("th",[t._v("选项")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("%H")]),t._v(" "),a("td",[t._v("提交对象（提交）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%h")]),t._v(" "),a("td",[t._v("提交对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%T")]),t._v(" "),a("td",[t._v("树对象（树）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%t")]),t._v(" "),a("td",[t._v("树对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%P")]),t._v(" "),a("td",[t._v("父对象（父）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%p")]),t._v(" "),a("td",[t._v("父对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%an")]),t._v(" "),a("td",[t._v("作者（作者）的名字")])]),t._v(" "),a("tr",[a("td",[t._v("%ae")]),t._v(" "),a("td",[t._v("作者的电子邮件地址")])]),t._v(" "),a("tr",[a("td",[t._v("%ad")]),t._v(" "),a("td",[t._v("作者修订日期（可以用-date =选项定制格式）")])]),t._v(" "),a("tr",[a("td",[t._v("%ar")]),t._v(" "),a("td",[t._v("作者修订日期，按多久以前的方式显示")])]),t._v(" "),a("tr",[a("td",[t._v("%cn")]),t._v(" "),a("td",[t._v("提交者（提交者）的名字")])]),t._v(" "),a("tr",[a("td",[t._v("%ce")]),t._v(" "),a("td",[t._v("提交者的电子邮件地址")])]),t._v(" "),a("tr",[a("td",[t._v("%cd")]),t._v(" "),a("td",[t._v("提交日期")])]),t._v(" "),a("tr",[a("td",[t._v("%cr")]),t._v(" "),a("td",[t._v("提交日期，按多久以前的方式显示")])]),t._v(" "),a("tr",[a("td",[t._v("%s")]),t._v(" "),a("td",[t._v("提交说明")])])])]),t._v(" "),a("h1",{attrs:{id:"待续"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#待续"}},[t._v("#")]),t._v(" 待续......")]),t._v(" "),a("h1",{attrs:{id:"缓存git密码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存git密码"}},[t._v("#")]),t._v(" 缓存git密码")]),t._v(" "),a("p",[t._v("git config --global credential.helper store")])])}),[],!1,null,null,null);s.default=r.exports}}]);