(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{435:function(s,n,t){"use strict";t.r(n);var e=t(56),a=Object(e.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"centos7-安装mysql-python"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos7-安装mysql-python"}},[s._v("#")]),s._v(" centos7 安装MySQL-python")]),s._v(" "),t("p",[s._v("要想使python可以操作mysql 就需要MySQL-python驱动，它是python 操作mysql必不可少的模块。")]),s._v(" "),t("p",[s._v("下载地址：https://pypi.python.org/pypi/MySQL-python/")]),s._v(" "),t("p",[s._v("下载MySQL-python-1.2.5.zip 文件之后直接解压。进入MySQL-python-1.2.5目录:")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("python setup.py install\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("报错：")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('\n[root@centos7 MySQL-python-1.2.4]# python setup.py install\n\nsh: mysql_config: command not found\n\nTraceback (most recent call last):\n\n  File "setup.py", line 18, in &lt;module>\n\n    metadata, options = get_config()\n\n  File "/root/MySQL-python-1.2.4/setup_posix.py", line 43, in get_config\n\n    libs = mysql_config("libs_r")\n\n  File "/root/MySQL-python-1.2.4/setup_posix.py", line 25, in mysql_config\n\n    raise EnvironmentError("%s not found" % (mysql_config.path,))\n\nEnvironmentError: mysql_config not found\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("p",[s._v("网上查了一下需安装mysql-devel")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("#yum -y install mysql-devel \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("安装成功后")]),s._v(" "),t("div",{staticClass:"language-text line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("# python setup.py install\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("安装成功。")])])}),[],!1,null,null,null);n.default=a.exports}}]);