(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{475:function(s,a,t){"use strict";t.r(a);var n=t(56),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"docker-安装mysql5-6"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-安装mysql5-6"}},[s._v("#")]),s._v(" docker 安装mysql5.6")]),s._v(" "),t("div",{staticClass:"language-SHELL line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull mysql:latest\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" images\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -itd --name mysql-test -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 -e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" mysql\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -itd -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 --name mysql5  -e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" -d mysql5.5.41 // "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5.5")]),s._v("版本\n\n- 映射本地目录\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run -p "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(":3306 --name mysql5.5  -v /opt/docker/mysql/conf:/etc/mysql -v /opt/docker/mysql/logs:/var/log/mysql -v /opt/docker/mysql/data:/var/lib/mysql -e "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("MYSQL_ROOT_PASSWORD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" -d mysql:5.5\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" 查看进程\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v("  -a 查看全部容器\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" -it 621b7a3e9 /bin/bash 进入容器\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" /etc/mysql5.cnf mysql5:/etc/mysql/my.cnf   // 复制本地文件到容器内\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" start 0507f9672f83\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" restart 0507f9672f83 \n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" stop 0507f9672f83\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" 0507f9672f83\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" images //查看下载的镜像\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" image  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v("  81ef0945fb33"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("镜像id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br")])]),t("h1",{attrs:{id:"mysql配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql配置"}},[s._v("#")]),s._v(" mysql配置")]),s._v(" "),t("div",{staticClass:"language-SHELL line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("// mysql添加索引时，如果提示 the table xxx is full\n\ntmp_table_size "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" 256M\n\nmax_heap_table_size "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" 256M\n\n// 开启binlog\n\nlog-bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/var/lib/mysql/data/mysql-bin\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("binlog_format")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ROW"')]),s._v("\nserver-id"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h1",{attrs:{id:"mysql5-6-权限控制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql5-6-权限控制"}},[s._v("#")]),s._v(" mysql5.6 权限控制")]),s._v(" "),t("h2",{attrs:{id:"用户管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用户管理"}},[s._v("#")]),s._v(" 用户管理")]),s._v(" "),t("p",[s._v("查看用户权限")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("show")]),s._v(" grants "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'test'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("添加用户1")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIVILEGES")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'test'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'192.168.1.0\\/255.255.255.0'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//默认会创建用户，如果用户不存在")]),s._v("\n添加用户 只允许 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".2")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v(".0")]),s._v("段的客户端ip链接。\nflush  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("privileges")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 这一句会让他生效")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIVILEGES")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'test'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'%'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("添加用户2")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'finley'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'%'")]),s._v(" IDENTIFIED "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建用户")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'finley'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'%'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WITH")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("OPTION")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 设置权限; %是任何机器都可以通过ip链接这个mysql")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- GRANT SELECT ON db2.invoice TO 'jeffrey'@'localhost';")]),s._v("\nflush  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("privileges")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 设置权限生效。")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("修改密码, 4种方法")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("use")]),s._v(" mysql"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("update")]),s._v(" mysql"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("user")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("set")]),s._v(" password"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("PASSWORD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("where")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("User")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'test'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" PASSWORD "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FOR")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'jeffrey'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" PASSWORD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'password'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" PASSWORD "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" PASSWORD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'password'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 可以直接修改当前用户的密码")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USAGE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'jeffrey'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),s._v(" IDENTIFIED "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'password'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("p",[s._v("查看当前用户")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CURRENT_USER")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"权限赋值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#权限赋值"}},[s._v("#")]),s._v(" 权限赋值")]),s._v(" "),t("p",[s._v("数据库权限")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("表权限")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mytbl "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mytbl "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("列权限")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("col1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("col1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" col2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mytbl "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("create routine 权限(有此权限，可以创建函数和存储过程， 数据库级别)")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ROUTINE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("EXECUTE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PROCEDURE")]),s._v(" mydb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("myproc "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'someuser'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'somehost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"设置用户的资源limit"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置用户的资源limit"}},[s._v("#")]),s._v(" 设置用户的资源limit")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[s._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'francis'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),s._v(" IDENTIFIED "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'frank'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" customer"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'francis'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WITH")]),s._v(" MAX_QUERIES_PER_HOUR "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" MAX_UPDATES_PER_HOUR "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" MAX_CONNECTIONS_PER_HOUR "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" MAX_USER_CONNECTIONS "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h2",{attrs:{id:"重命名user"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重命名user"}},[s._v("#")]),s._v(" 重命名user")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RENAME")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'user1'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("RENAME")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'user2'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'%.example.com'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'user2'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'remote.example.com'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"撤销操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#撤销操作"}},[s._v("#")]),s._v(" 撤销操作")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("REVOKE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'jeffrey'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 撤销select 权限")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("REVOKE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v("\n "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'finley'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'%.example.com'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n \n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("REVOKE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("UPDATE")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DELETE")]),s._v("\n \t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" customer"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("addresses\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'custom'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'%.example.com'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);