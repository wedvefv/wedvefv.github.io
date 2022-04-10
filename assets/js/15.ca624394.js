(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{409:function(s,t,n){"use strict";n.r(t);var a=n(56),e=Object(a.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"服务端搭建git-centos7"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#服务端搭建git-centos7"}},[s._v("#")]),s._v(" 服务端搭建git(centos7)")]),s._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[s._v("\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("id")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看是否存在git用户，存在就不创建了。")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("useradd")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("passwd")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v("\n\t输入密码，我设置的是xxx@123\n\t\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("h2",{attrs:{id:"客户端开启公钥认证认证-免密push-pull"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#客户端开启公钥认证认证-免密push-pull"}},[s._v("#")]),s._v(" 客户端开启公钥认证认证，免密push/pull")]),s._v(" "),n("ul",[n("li",[s._v("首先服务端需要开启ssh服务")])]),s._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" /etc/ssh/sshd_config\nRSAAuthentication "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v(" \nPubkeyAuthentication "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v("\nAuthorizedKeysFile .ssh/authorized_keys\n如果是centos7.4以上（含7.4），ssh1已经不支持了，只支持ssh2代协议。所以RSAAuthentication项是没有的\n\n- 客户端执行 执行ssh-keygen -t rsa 生成公钥和私钥\n- 复制客户端公钥到服务器端ssh-copy-id -i ~/.ssh/id_rsa.pub git@192.168.61.128 \n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("h2",{attrs:{id:"服务端创建git仓库"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#服务端创建git仓库"}},[s._v("#")]),s._v(" 服务端创建git仓库")]),s._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[s._v("\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /data/git/gittest.git\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 初始化这个仓库")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /data/git/gittest.git\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init --bare "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 目录所属用户设置")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" -R git:git /data/git \n\t\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("h2",{attrs:{id:"客户端clone远程仓库"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#客户端clone远程仓库"}},[s._v("#")]),s._v(" 客户端clone远程仓库")]),s._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[s._v("\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" localgit\n\t"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" localgit\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone git@192.168.61.128:/data/git/gittest.git "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提示输入服务端git账户的密码。")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#修改完就可以提交了")]),s._v("\n\t\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" abc.txt\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'aaa'")]),s._v("\n\t"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push \n\t\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);