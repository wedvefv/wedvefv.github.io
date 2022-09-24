(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{415:function(t,s,a){"use strict";a.r(s);var n=a(56),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git-基本操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-基本操作"}},[t._v("#")]),t._v(" git 基本操作")]),t._v(" "),a("h2",{attrs:{id:"创建分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建分支"}},[t._v("#")]),t._v(" 创建分支")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch new_branch\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"本地删除分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地删除分支"}},[t._v("#")]),t._v(" 本地删除分支")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -D delete_branch \n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"更新到远程删除分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更新到远程删除分支"}},[t._v("#")]),t._v(" 更新到远程删除分支")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout master \n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull -u   -u origin :delete_branch\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h2",{attrs:{id:"git-pull-失败提示fatal-refusing-to-merge-unrelated-histories-处理方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-pull-失败提示fatal-refusing-to-merge-unrelated-histories-处理方法"}},[t._v("#")]),t._v(" git pull 失败提示fatal: refusing to merge unrelated histories ,处理方法")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin master --allow-unrelated-historiesn\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h2",{attrs:{id:"查看提交提记录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看提交提记录"}},[t._v("#")]),t._v(" 查看提交提记录")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log -p -2  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#查看最近两次的提交差异")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --stat "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#仅仅现实行数的变更")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --pretty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("oneline "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#每次提交，在一行显示")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --pretty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("format:"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%h - %an, %ar : %s"')]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#格式显示")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("table",[a("thead",[a("tr",[a("th",[t._v("选项")]),t._v(" "),a("th",[t._v("说明")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("%H")]),t._v(" "),a("td",[t._v("提交对象（提交）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%h")]),t._v(" "),a("td",[t._v("提交对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%T")]),t._v(" "),a("td",[t._v("树对象（树）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%t")]),t._v(" "),a("td",[t._v("树对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%P")]),t._v(" "),a("td",[t._v("父对象（父）的完整哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%p")]),t._v(" "),a("td",[t._v("父对象的简短哈希字串")])]),t._v(" "),a("tr",[a("td",[t._v("%an")]),t._v(" "),a("td",[t._v("作者（作者）的名字")])]),t._v(" "),a("tr",[a("td",[t._v("%ae")]),t._v(" "),a("td",[t._v("作者的电子邮件地址")])]),t._v(" "),a("tr",[a("td",[t._v("%ad")]),t._v(" "),a("td",[t._v("作者修订日期（可以用-date =选项定制格式）")])]),t._v(" "),a("tr",[a("td",[t._v("%ar")]),t._v(" "),a("td",[t._v("作者修订日期，按多久以前的方式显示")])]),t._v(" "),a("tr",[a("td",[t._v("%cn")]),t._v(" "),a("td",[t._v("提交者（提交者）的名字")])]),t._v(" "),a("tr",[a("td",[t._v("%ce")]),t._v(" "),a("td",[t._v("提交者的电子邮件地址")])]),t._v(" "),a("tr",[a("td",[t._v("%cd")]),t._v(" "),a("td",[t._v("提交日期")])]),t._v(" "),a("tr",[a("td",[t._v("%cr")]),t._v(" "),a("td",[t._v("提交日期，按多久以前的方式显示")])]),t._v(" "),a("tr",[a("td",[t._v("%s")]),t._v(" "),a("td",[t._v("提交说明")])])])]),t._v(" "),a("h2",{attrs:{id:"缓存git密码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缓存git密码"}},[t._v("#")]),t._v(" 缓存git密码")]),t._v(" "),a("p",[t._v("git config --global credential.helper store")]),t._v(" "),a("h2",{attrs:{id:"服务端搭建git-centos7"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#服务端搭建git-centos7"}},[t._v("#")]),t._v(" 服务端搭建git(centos7)")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("id")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看是否存在git用户，存在就不创建了。")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useradd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("passwd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\n\t输入密码，我设置的是xxx@123\n\t\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("h2",{attrs:{id:"客户端开启公钥认证认证-免密push-pull"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端开启公钥认证认证-免密push-pull"}},[t._v("#")]),t._v(" 客户端开启公钥认证认证，免密push/pull")]),t._v(" "),a("ul",[a("li",[t._v("首先服务端需要开启ssh服务")])]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" /etc/ssh/sshd_config\nRSAAuthentication "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yes")]),t._v(" \nPubkeyAuthentication "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yes")]),t._v("\nAuthorizedKeysFile .ssh/authorized_keys\n如果是centos7.4以上（含7.4），ssh1已经不支持了，只支持ssh2代协议。所以RSAAuthentication项是没有的\n\n- 客户端执行 执行ssh-keygen -t rsa 生成公钥和私钥\n- 复制客户端公钥到服务器端ssh-copy-id -i ~/.ssh/id_rsa.pub git@192.168.61.128 \n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])]),a("h2",{attrs:{id:"服务端创建git仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#服务端创建git仓库"}},[t._v("#")]),t._v(" 服务端创建git仓库")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -p /data/git/gittest.git\n\t\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 初始化这个仓库")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /data/git/gittest.git\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init --bare "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n\t\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 目录所属用户设置")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("chown")]),t._v(" -R git:git /data/git \n\t\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])]),a("h2",{attrs:{id:"客户端clone远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#客户端clone远程仓库"}},[t._v("#")]),t._v(" 客户端clone远程仓库")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" localgit\n\t"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" localgit\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone git@192.168.61.128:/data/git/gittest.git "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提示输入服务端git账户的密码。")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#修改完就可以提交了")]),t._v("\n\t\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("touch")]),t._v(" abc.txt\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'aaa'")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push \n\t\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("h2",{attrs:{id:"tag-和branch的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tag-和branch的区别"}},[t._v("#")]),t._v(" tag 和branch的区别")]),t._v(" "),a("ul",[a("li",[t._v("Git tag是一系列commit的中的一个点，只能查看，不能移动。")]),t._v(" "),a("li",[t._v("branch是一系列串联的commit的线。")])]),t._v(" "),a("h3",{attrs:{id:"git-tag的用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-tag的用法"}},[t._v("#")]),t._v(" git tag的用法")]),t._v(" "),a("ul",[a("li",[t._v("我们常常在代码封板时,使用git 创建一个tag ,这样一个不可修改的历史代码版本就像被我们封存起来一样,不论是运维发布拉取,或者以后的代码版本管理,都是十分方便的")])]),t._v(" "),a("h3",{attrs:{id:"git的tag功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git的tag功能"}},[t._v("#")]),t._v(" git的tag功能")]),t._v(" "),a("ul",[a("li",[t._v("git 下打标签其实有2种情况\n轻量级的：它其实是一个独立的分支,或者说是一个不可变的分支.指向特定提交对象的引用")]),t._v(" "),a("li",[t._v("带附注的：实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证,电子邮件地址和日期，一般我们都建议使用含附注型的标签，以便保留相关信息\n所以我们推荐使用第二种标签形式")])]),t._v(" "),a("h3",{attrs:{id:"创建tag"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建tag"}},[t._v("#")]),t._v(" 创建tag")]),t._v(" "),a("ul",[a("li",[t._v("git tag -a V1.2 -m 'release 1.2'")]),t._v(" "),a("li",[t._v("上面的命令我们成功创建了本地一个版本 V1.2 ,并且添加了附注信息 'release 1.2'")])]),t._v(" "),a("h2",{attrs:{id:"查看tag"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看tag"}},[t._v("#")]),t._v(" 查看tag")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("git tag")])]),t._v(" "),a("li",[a("p",[t._v("要显示附注信息,我们需要用 show 指令来查看")])]),t._v(" "),a("li",[a("p",[t._v("git show V1.2")])]),t._v(" "),a("li",[a("p",[t._v("但是目前这个标签仅仅是提交到了本地git仓库.如何同步到远程代码库")])]),t._v(" "),a("li",[a("p",[t._v("git push origin --tags")])]),t._v(" "),a("li",[a("p",[t._v("如果刚刚同步上去,你缺发现一个致命bug ,需要重新打版本,现在还为时不晚.")])]),t._v(" "),a("li",[a("p",[t._v("git tag -d V1.2")])]),t._v(" "),a("li",[a("p",[t._v("到这一步我们只是删除了本地 V1.2的版本,可是线上V1.2的版本还是存在,如何办?这时我们可以推送的空的同名版本到线下,达到删除线上版本的目标:")])]),t._v(" "),a("li",[a("p",[t._v("git push origin :refs/tags/V1.2")])]),t._v(" "),a("li",[a("p",[t._v("如何获取远程版本?")])]),t._v(" "),a("li",[a("p",[t._v("git fetch origin tag V1.2")])]),t._v(" "),a("li",[a("p",[t._v("这样我们可以精准拉取指定的某一个版本.适用于运维同学部署指定版本.")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);