(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{429:function(s,a,t){"use strict";t.r(a);var n=t(56),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"elasticsearch-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch-安装"}},[s._v("#")]),s._v(" elasticsearch 安装")]),s._v(" "),t("h3",{attrs:{id:"_1-概况"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-概况"}},[s._v("#")]),s._v(" 1.概况")]),s._v(" "),t("p",[t("img",{attrs:{src:"http://192.168.1.8:1234/server/index.php?s=/api/attachment/visitFile/sign/0803a3b7478a5ce3bc777787c9157acd&showdoc=.jpg",alt:""}})]),s._v(" "),t("ul",[t("li",[s._v("图片是elasticsearch-head插件查看的集群状态")]),s._v(" "),t("li",[s._v("这是一台虚拟机，创建了index为megacorp, ES默认是5个分片，然后每个分片一个副本，也就是10个分片;三个节点，就会出现如图的样子。")]),s._v(" "),t("li",[s._v("同一个分片必然不在一个节点，不然副本就没意义了。")]),s._v(" "),t("li",[s._v("绿色表示状态健康，黄色表示主分片能工作写入，副本分片可能不正常；比如只有一个节点的情况")])]),s._v(" "),t("h3",{attrs:{id:"_2-数据预览"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-数据预览"}},[s._v("#")]),s._v(" 2.数据预览")]),s._v(" "),t("p",[t("img",{attrs:{src:"http://192.168.1.8:1234/server/index.php?s=/api/attachment/visitFile/sign/63812f26961deb2e9a886deef765ba11&showdoc=.jpg",alt:""}})]),s._v(" "),t("ul",[t("li",[s._v("上图可能会感觉 employee是表，但是这个type字段7.x版本就去除了。\n有人说索引类似MySQL的数据库，其实我觉得不太合适，索引应该是表，ES并没有数据库这一层。")]),s._v(" "),t("li",[s._v("可以看出我们设置的数据是_source字段, id 是插入数据时随机生成的。")]),s._v(" "),t("li",[s._v("6.3以上的版本就有了elasticsearch-sql-cli工具，俨然快成数据库了....,可以看出index其实是表而不是库。")])]),s._v(" "),t("p",[t("img",{attrs:{src:"http://192.168.1.8:1234/server/index.php?s=/api/attachment/visitFile/sign/15eca3b156876d2e3df90b861eb86e91&showdoc=.jpg",alt:""}})]),s._v(" "),t("h2",{attrs:{id:"_3-如何启动安装启动es"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-如何启动安装启动es"}},[s._v("#")]),s._v(" 3.如何启动安装启动ES")]),s._v(" "),t("h3",{attrs:{id:"启动单节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动单节点"}},[s._v("#")]),s._v(" 启动单节点")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/local/src\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.3.0.zip\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v("  elasticsearch-6.3.0.zip\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" elasticsearch-6.3.0\n./bin/elasticsearch -d \n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("-d表示放到后台运行了"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h3",{attrs:{id:"启动集群-三个节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#启动集群-三个节点"}},[s._v("#")]),s._v(" 启动集群，三个节点")]),s._v(" "),t("ul",[t("li",[s._v("复制三份刚才的解压的文件夹, 配置端口不一致就ok了")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /usr/local/server1\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /usr/local/server2\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /usr/local/server3\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" -rf /usr/local/src/elasticsearch-6.3.0/* /usr/local/server1\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" -rf /usr/local/src/elasticsearch-6.3.0/* /usr/local/server2\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" -rf /usr/local/src/elasticsearch-6.3.0/* /usr/local/server3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("ul",[t("li",[s._v("修改/usr/local/server1/config/elasticsearch.yml 修改或者添加部分如下")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("cluster.name: my-application\nnode.name: master\nhttp.cors.enabled: "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\nhttp.cors.allow-origin: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*"')]),s._v("\nnetwork.host: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0\nhttp.port: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9200")]),s._v("\ntransport.tcp.port: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9300")]),s._v("\ndiscovery.zen.ping.unicast.hosts: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9300"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9310"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9320"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("egrep")]),s._v(" -v "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"^#|^$"')]),s._v(" config/elasticsearch.yml 命令可以确认\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ul",[t("li",[s._v("修改/usr/local/server2/config/elasticsearch.yml")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("cluster.name: my-application\nnode.name: slave1 \nhttp.cors.enabled: "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\nhttp.cors.allow-origin: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*"')]),s._v("\nnetwork.host: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0\nhttp.port: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9210")]),s._v("\ntransport.tcp.port: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9310")]),s._v("\ndiscovery.zen.ping.unicast.hosts: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9300"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9310"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9320"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("ul",[t("li",[s._v("修改/usr/local/server3/config/elasticsearch.yml")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("cluster.name: my-application\nnode.name: slave2\nhttp.cors.enabled: "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\nhttp.cors.allow-origin: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"*"')]),s._v("\nnetwork.host: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.0")]),s._v(".0.0 \nhttp.port: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9220")]),s._v("\ntransport.tcp.port: "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9320")]),s._v("\ndiscovery.zen.ping.unicast.hosts: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9300"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9310"')]),s._v(","),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"127.0.0.1:9320"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("ul",[t("li",[t("p",[s._v("解释一下")]),s._v(" "),t("ul",[t("li",[s._v("cluster.name 集群名字必须一样")]),s._v(" "),t("li",[s._v("node.name 节点名字不要一样")]),s._v(" "),t("li",[s._v("以下两行是跨域设置，不然3个节点之间是互相发现不了的。")]),s._v(" "),t("li",[s._v("http.cors.enabled: true")]),s._v(" "),t("li",[s._v('http.cors.allow-origin: "*"')]),s._v(" "),t("li",[s._v("在外部可以允许外部ip访问操作节点， 不然只能是在本地使用127.0.0.1访问ES")]),s._v(" "),t("li",[s._v("network.host: 0.0.0.0 这个是访问节点的ip")]),s._v(" "),t("li",[s._v("http.port 9200 节点对外端口")]),s._v(" "),t("li",[s._v("transport.tcp.port: 9320 这个是节点内部同步数据使用的端口")]),s._v(" "),t("li",[s._v("discovery.zen.ping.unicast.hosts: 这是节点列表")])])]),s._v(" "),t("li",[t("p",[s._v("启动三个ES服务把")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("分别进入/usr/local/server1, /usr/local/server2, /usr/local/server3\n执行./bin/elasticsearch -d 放入后台运行就好了，可能需要1，2分钟。。")])]),s._v(" "),t("li",[t("p",[s._v("查看节点健康状态信息")])])])])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("可以通过任意节点ip和端口，比如节点1， 端口9200，在浏览器访问，返回的是json信息\nhttp://192.168.1.8:9200/_cluster/health?pretty\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ul",[t("li",[s._v("查看节点数")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("    同样三个节点是对等的，所以任意ip和对应端口都能获取到结果:\n    http://localhost:9200/_cat/nodes?v\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ul",[t("li",[s._v("elasticsearch-head插件\n"),t("ul",[t("li",[s._v("这个安装需要node版本是9以上，可以百度安装")]),s._v(" "),t("li",[s._v("node -v 没问题了，就可以装了")]),s._v(" "),t("li",[s._v("命令如下")])])])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone git://github.com/mobz/elasticsearch-head.git\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" elasticsearch-head\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#这时候可能会报错需要升级openssl,如果没报错则不用安装")]),s._v("\nyum update openssl -y\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#再安装")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run start\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("h3",{attrs:{id:"添加数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#添加数据"}},[s._v("#")]),s._v(" 添加数据")]),s._v(" "),t("ul",[t("li",[s._v("可以通过url发送POST请求，这是我用openresty写的一个lua接口")])]),s._v(" "),t("div",{staticClass:"language-lua line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-lua"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" http "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"resty.http"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" json "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cjson"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" i"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("500000")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" httpc "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" http"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("new")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" name  "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"name_"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("..")]),s._v("i\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" age "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" math"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("random")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" addr "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"addr_"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("..")]),s._v("i\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" body1 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"name"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("  name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"age"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("  age"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"addr"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" addr\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("    \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" url "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"http://192.168.1.8:9200/megacorp/employee/?pretty"')]),s._v("\n   "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("local")]),s._v(" res"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" err_ "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" httpc"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("request_uri")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("url"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        method "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"POST"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        body "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" json"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("encode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("body1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        headers "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Content-Type"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"application/json"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("err"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("end")]),s._v(" \n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br")])]),t("ul",[t("li",[s._v("我测了一下mysql 400万数据(我这数据只有id，name，age，addr四个字段)，我用like匹配了一下addr，同样400万条数据觉得ES的SQL还是要快很多。。")])]),s._v(" "),t("h3",{attrs:{id:"既然是搜索引擎-如何查询呢"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#既然是搜索引擎-如何查询呢"}},[s._v("#")]),s._v(" 既然是搜索引擎，如何查询呢")]),s._v(" "),t("ul",[t("li",[s._v("可以通过简单的q指定关键字段或者DSL(领域特定语言)")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -XGET "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost:9200/megacorp/employee/_search?q=name:name_100&pretty'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#或者 DSL ,这个比较复杂了， 需要GET方式，且有请求体json")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -XGET "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost:9200/megacorp/employee/_search?pretty'")]),s._v(" -H "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Content-Type: application/json'")]),s._v(" -d"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('\'\n{\n    "query" : {\n        "match" : {\n        "last_name" : "Smith"\n        }\n    }\n}\'')]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("ul",[t("li",[s._v("参考了"),t("a",{attrs:{href:"https://www.linuxidc.com/Linux/2019-01/156356.htm",target:"_blank",rel:"noopener noreferrer"}},[s._v("这篇文章"),t("OutboundLink")],1),s._v("，自己实践一把，好费劲，有点类似单机配置kafka。")])]),s._v(" "),t("ul",[t("li",[s._v("新版本可以用SQL了。。。。。。就简单记这么多吧。。。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);