(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{441:function(s,a,t){"use strict";t.r(a);var n=t(56),r=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"centos7-升级python"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#centos7-升级python"}},[s._v("#")]),s._v(" centos7 升级python")]),s._v(" "),t("h1",{attrs:{id:"_1-download-source"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-download-source"}},[s._v("#")]),s._v(" 1. download source")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("wget https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//www.python.org/ftp/python/2.7.12/Python-2.7.12.tgz")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h1",{attrs:{id:"_2-compire-and-install"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-compire-and-install"}},[s._v("#")]),s._v(" 2. compire and install")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("tar zxvf Python"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.7")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".12")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("tgz\ncd Python"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.7")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".12")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("configure "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("prefix"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python27 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" make "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" make install "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" echo $"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v("\n如果以上输出为"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("，说明没有报错，安装正常\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h1",{attrs:{id:"_3-add-path-and-backup-the-python2-6"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-add-path-and-backup-the-python2-6"}},[s._v("#")]),s._v(" 3. add path and backup the python2.6")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("移除以前的版本\nmv "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python26\n创建软连接\nln "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("s "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python27"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python\n查看版本是否升级成功\npython "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("V\nPython "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.7")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".12")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("h1",{attrs:{id:"_4-modify-yum"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-modify-yum"}},[s._v("#")]),s._v(" 4. modify yum")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("如果不修改此项，会导致yum无法使用\nvim "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("yum\n修改第一行即可，将环境变量指向以前的python版本\n#"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python26\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h1",{attrs:{id:"_5-reinstall-pip"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-reinstall-pip"}},[s._v("#")]),s._v(" 5. reinstall pip")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.")]),s._v("安装pip之前首先需要安装setuptools\n下载链接\nhttps"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//pypi.python.org/pypi/setuptools")]),s._v("\n下载地址\nwget https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//pypi.python.org/packages/ff/d4/209f4939c49e31f5524fa0027bf1c8ec3107abaf7c61fdaad704a648c281/setuptools-21.0.0.tar.gz#md5=81964fdb89534118707742e6d1a1ddb4 --no-check-certificate")]),s._v("\n解压\ntar zxvf setuptools"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("21.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("tar"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("gz\n安装\ncd setuptools"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("21.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),s._v("\npython setup"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("py  install\n\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.")]),s._v("安装pip\n下载链接\nhttps"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//pypi.python.org/pypi/pip")]),s._v("\n下载地址\nwget https"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//pypi.python.org/packages/41/27/9a8d24e1b55bd8c85e4d022da2922cb206f183e2d18fee4e320c9547e751/pip-8.1.1.tar.gz#md5=6b86f11841e89c8241d689956ba99ed7 --no-check-certificate")]),s._v("\n解压\ntar zxvf pip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.1")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("tar"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("gz \n安装 \ncd pip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.1")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),s._v("\npython setup"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("py install\n\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3.")]),s._v("添加环境变量\n安装完之后，之后执行pip还是调用的以前的环境变量，需要手动添加环境变量\nmv "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("pip "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("pip26\nln "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("s "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python27"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("pip "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("\n再次查看版本\npip "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("V\npip "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.1")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),s._v(" from "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("local"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python27"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("lib"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("python2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("site"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("packages"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("pip"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.1")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("py2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7.")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("egg")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("python "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.7")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br")])]),t("h1",{attrs:{id:"_6-使用pip安装第三方库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-使用pip安装第三方库"}},[s._v("#")]),s._v(" 6.使用pip安装第三方库")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("如果报错locale"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Error"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" unsupported locale setting\n加入环境变量：\nexport LANGUAGE"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("en_US"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UTF"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("\nexport LC_ALL"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("en_US"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("UTF"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("\n\npip install psutil\npip install MySQLdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("python\npip install django"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.8")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".2")]),s._v("\n\n报错：\n pip install MySQLdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("python\nCollecting MySQLdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("python\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Retrying")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Retry")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("total"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" connect"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("None"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" read"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("None"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" redirect"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("None"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" after connection broken by '"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ReadTimeoutError")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("\"HTTPSConnectionPool(host='pypi.python.org', port=443): Read timed out. (read timeout=15)\"")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("'"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("simple"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("mysqldb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("python"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("\n  Could not find a version that satisfies the requirement MySQLdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("python")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("from versions"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nNo matching distribution found "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" MySQLdb"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("python\nYou are using pip version "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("8.1")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" however version "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".1")]),s._v(" is available"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\nYou should consider upgrading via the "),t("span",{pre:!0,attrs:{class:"token char"}},[s._v("'pip install --upgrade pip'")]),s._v(" command"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n当安装中提示版本太低的时候，执行提示的命令进行升级即可\npip install "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("upgrade pip\n升级完重新执行要安装的库\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);