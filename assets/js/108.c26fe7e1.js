(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{507:function(s,t,a){"use strict";a.r(t);var e=a(56),r=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"centos7免密登陆设置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#centos7免密登陆设置"}},[s._v("#")]),s._v(" centos7免密登陆设置")]),s._v(" "),a("h2",{attrs:{id:"原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[s._v("#")]),s._v(" 原理")]),s._v(" "),a("p",[s._v("免密登陆就是把当前机器的~/.ssh下面的公钥id_rsa.pub 复制到要远程的机器上存入~/.ssh/authorized_keys文件。")]),s._v(" "),a("p",[s._v("主要是用非对称加密，ssh的远程机器时，远程机器会查看自己authorized_keys中是否保存有请求机器的公钥，有就可以说明值得信任。")]),s._v(" "),a("h2",{attrs:{id:"当前机器生成密钥对"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#当前机器生成密钥对"}},[s._v("#")]),s._v(" 当前机器生成密钥对")]),s._v(" "),a("p",[s._v("ssh-keygen -t rsa 一路回车键即可, 会生成用户目录/root/.ssh/id_rsa.pub和/root/.ssh/id_rsa俩文件")]),s._v(" "),a("h2",{attrs:{id:"复制公钥id-rsa-pub到目标机器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#复制公钥id-rsa-pub到目标机器"}},[s._v("#")]),s._v(" 复制公钥id_rsa.pub到目标机器")]),s._v(" "),a("p",[s._v("将当前机器的id_rsa.pub 追加到远程机器的authorized_keys文件")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("直接用工具  ssh-copy-id -i /root/.ssh/id_rsa.pub root@18.19.129.19")])]),s._v(" "),a("li",[a("p",[s._v("使用scp工具 scp -p /root/.ssh/id_rsa.pub root@18.19.129.19:/root/.ssh/authorized_keys")])])]),s._v(" "),a("p",[s._v("需要注意的点：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("ssh-copy-id 默认时用哪个用户链接， 就复制到哪个用户下例如 test@18.19.129.19。 复制到/home/test/.ssh/authorized_keys\n\nssh-copy-id 默认会设置/home/test/.ssh目录权限为700, /home/test/.ssh/authorized_keys权限为600, 这个ssh要求很严格。\n\n如果scp上传，需要直接修改权限:\n    chmod 700 /home/test/.ssh\n    chmod 600 /home/test/.ssh/authorized_keys\n")])])]),a("p",[s._v("测试中的问题：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[s._v("如果你的用户名，比如是app，虽然不是root，但是权限时root， 也就是登录后终端是#结尾，这个在centos8可以修改/etc/passwd实现\n\n就只能使用scp方式上传到/root/.ssh/authorized_keys中，使用app@ip登录就写进/home/app/.ssh/authorized_keys中\n\n因为登录是root权限用户app，所以会使用/root/.ssh/authorized_keys文件验证。\n")])])]),a("h2",{attrs:{id:"修改远程机器sshd-config文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改远程机器sshd-config文件"}},[s._v("#")]),s._v(" 修改远程机器sshd_config文件")]),s._v(" "),a("p",[s._v("vim /etc/ssh/sshd_config")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("PasswordAuthentication "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#这个默认值就是yes，使用密码登录")]),s._v("\nPubkeyAuthentication "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yes")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可以使用公钥认证")]),s._v("\nAuthorizedKeysFile  /root/.ssh/authorized_keys "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定用户认证key文件")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h2",{attrs:{id:"重启sshd服务器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重启sshd服务器"}},[s._v("#")]),s._v(" 重启sshd服务器")]),s._v(" "),a("p",[s._v("service sshd restart")]),s._v(" "),a("p",[s._v("就可以ssh app@18.19.129.19登录这个远程机器了。。")])])}),[],!1,null,null,null);t.default=r.exports}}]);