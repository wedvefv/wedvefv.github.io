(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{443:function(s,t,e){"use strict";e.r(t);var a=e(56),r=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"linux-常见命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#linux-常见命令"}},[s._v("#")]),s._v(" linux 常见命令")]),s._v(" "),e("ul",[e("li",[s._v("rpm -q centos-release")])]),s._v(" "),e("h2",{attrs:{id:"查看是否安装ssh"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看是否安装ssh"}},[s._v("#")]),s._v(" 查看是否安装ssh")]),s._v(" "),e("ul",[e("li",[s._v("rpm -qa | grep ssh")]),s._v(" "),e("li",[s._v("没有则 yum install openssh-server")]),s._v(" "),e("li",[s._v("/etc/init.d/sshd status|start|stop")]),s._v(" "),e("li",[s._v("netstat -antp | grep sshd")]),s._v(" "),e("li",[s._v("查看运行级别 chkconfig --list sshd")]),s._v(" "),e("li",[s._v("开启 chkconfig --level 2345 sshd on")]),s._v(" "),e("li",[s._v("开机启动 chkconfig sshd on")])]),s._v(" "),e("h2",{attrs:{id:"安装go语言-通过源"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装go语言-通过源"}},[s._v("#")]),s._v(" 安装go语言 通过源")]),s._v(" "),e("ul",[e("li",[s._v("rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm")]),s._v(" "),e("li",[s._v("yum install golang -y")]),s._v(" "),e("li",[s._v("查看go所在目录然后配置环境变量")]),s._v(" "),e("li",[s._v("export PATH=$PATH:$GOPATH/bin")])]),s._v(" "),e("h2",{attrs:{id:"升级centos6的gcc到4-8"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#升级centos6的gcc到4-8"}},[s._v("#")]),s._v(" 升级centos6的gcc到4.8")]),s._v(" "),e("ul",[e("li",[s._v("wget http://people.centos.org/tru/devtools-2/devtools-2.repo")]),s._v(" "),e("li",[s._v("mv devtools-2.repo /etc/yum.repos.d")]),s._v(" "),e("li",[s._v("yum install devtoolset-2-gcc devtoolset-2-binutils devtoolset-2-gcc-c"),e("code",[s._v("保存以前的gcc mv /usr/bin/gcc /usr/bin/gcc-4.4.7 mv /usr/bin/g")])])]),s._v(" "),e("h2",{attrs:{id:"查看动态库所在的包名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看动态库所在的包名"}},[s._v("#")]),s._v(" 查看动态库所在的包名")]),s._v(" "),e("ul",[e("li",[s._v("yum whatprovides /usr/lib64/libopcodes-2.20.51.0.2-5.48.el6_10.1.so")]),s._v(" "),e("li",[s._v("最好写全路径")])]),s._v(" "),e("h2",{attrs:{id:"查看进程的socket连接数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看进程的socket连接数"}},[s._v("#")]),s._v(" 查看进程的socket连接数")]),s._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" /proc/18709/fd -l "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" socket: "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("wc")]),s._v(" -l     "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#18709是进程ID")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("h2",{attrs:{id:""}},[e("a",{staticClass:"header-anchor",attrs:{href:"#"}},[s._v("#")])])])}),[],!1,null,null,null);t.default=r.exports}}]);