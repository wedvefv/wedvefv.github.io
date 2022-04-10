(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{456:function(a,s,t){"use strict";t.r(s);var n=t(56),e=Object(n.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"proto文件转lua文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#proto文件转lua文件"}},[a._v("#")]),a._v(" proto文件转lua文件")]),a._v(" "),t("h3",{attrs:{id:"方法一-将proto文件转成lua文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法一-将proto文件转成lua文件"}},[a._v("#")]),a._v(" 方法一:  将proto文件转成lua文件")]),a._v(" "),t("h4",{attrs:{id:"安装protoc工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装protoc工具"}},[a._v("#")]),a._v(" 安装protoc工具")]),a._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/protocolbuffers/protobuf/releases",target:"_blank",rel:"noopener noreferrer"}},[a._v("源码下载地址"),t("OutboundLink")],1)]),a._v(" "),t("p",[a._v("下载第一个 protobuf-all-3.17.3.tar.gz")]),a._v(" "),t("p",[a._v("tar -xf  protobuf-all-3.17.3.tar.gz")]),a._v(" "),t("p",[a._v("cd  protobuf-3.17.3")]),a._v(" "),t("p",[a._v("make && make install")]),a._v(" "),t("h3",{attrs:{id:"安装protoc-gen-lua-工具"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装protoc-gen-lua-工具"}},[a._v("#")]),a._v(" 安装protoc-gen-lua 工具")]),a._v(" "),t("p",[a._v("python扩展 pip install protobuf")]),a._v(" "),t("p",[a._v("git clone https://github.com/sean-lin/protoc-gen-lua.git")]),a._v(" "),t("p",[a._v("进入 protoc-gen-lua/protobuf  编译pb.c 得到pb.so  按理说直接make即可")]),a._v(" "),t("h3",{attrs:{id:"解决pb-so-编译错误"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解决pb-so-编译错误"}},[a._v("#")]),a._v(" 解决pb.so 编译错误")]),a._v(" "),t("p",[a._v("一般会报错 , 提示lua5.1")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("Package lua5.1 was not found in the pkg-config search path.\nPerhaps you should add the directory containing `lua5.1.pc'\nto the PKG_CONFIG_PATH environment variable\nNo package 'lua5.1' found\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br")])]),t("p",[a._v("查看Makefile")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("# 源文件\nSRC=pb.c \n# 目标文件\nTARGET=pb.so\n\n#头文件目录\nCFLAGS=`pkg-config --cflags lua5.1` -std=gnu99\n#静态文件目录\nLDFLAGS=`pkg-config --libs lua5.1`\n\nall:$(TARGET)\n$(TARGET):$(SRC)\n    gcc -O3 -shared -fPIC $(SRC) $(CFLAGS) $(LDFLAGS) -o $@\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br")])]),t("p",[a._v("-static 使用静态库.a链接")]),a._v(" "),t("p",[a._v("-shared 使用共享库.so链接(默认行为)")]),a._v(" "),t("p",[a._v("-fPIC 编译时生成位置无关的代码，全部使用相对地址, 这样可被多个进程使用, 如果不加次选项，库被加载时位置不固定，所以每个进程都有一份copy，这样浪费内存， 也失去了共享的属性。")]),a._v(" "),t("p",[a._v("pkconfig可以使用.pc文件生成对应程序的include文件和lib文件目录, 它会搜索$PKG_CONFIG_PATH目录下的pc文件")]),a._v(" "),t("p",[a._v("如何知道lua的pc文件呢:"),t("br"),a._v("\nyum provides */lua.pc 这是查看哪个包有lua.pc 文件的")]),a._v(" "),t("ul",[t("li",[a._v("结果一般都是lua-devel-5.1.4-15.el7.x86_64 : Development files for lua\n如果拿你安装了openresty， 可以直接查找\nfind / -name lua.pc")])]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("/opt/openresty-1.9.7.4/bundle/lua-5.1.5/etc/lua.pc\n/opt/openresty-1.9.7.4/build/lua-5.1.5/etc/lua.pc\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("建立软连接到pc文件目录")]),a._v(" "),t("ul",[t("li",[a._v("ln -s /opt/openresty-1.9.7.4/build/lua-5.1.5/etc/lua.pc $PKG_CONFIG_PATH/lua5.1.pc")])]),a._v(" "),t("p",[a._v("pkgconfig查看lua的头文件和库文件, 确实没问题")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("[root@v1 protobuf]# pkg-config --cflags lua5.1\n-I/usr/local/include  \n[root@v1 protobuf]# pkg-config --libs lua5.1\n-L/usr/local/lib -llua -lm  \n[root@v1 protobuf]# \n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br")])]),t("p",[a._v("回到protoc-gen-lua/protobuf目录执行make， 又报错了")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("gcc -O3 -shared -fPIC pb.c `pkg-config --cflags lua5.1` -std=gnu99 `pkg-config --libs lua5.1` -o pb.so\n/usr/bin/ld: /usr/local/lib/liblua.a(lapi.o): relocation R_X86_64_32 against hidden symbol `luaO_nilobject_' can not be used \n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("错误翻译过来就是动态库/usr/local/lib/liblua.a 里面的函数luaO_nilobject_无法重定位，就是编译lua静态库是时没加-fPIC选项")]),a._v(" "),t("p",[a._v("解决上一个文件， 下载lua-5.1.4 重新编译安装")]),a._v(" "),t("ul",[t("li",[a._v("curl -R -O http://www.lua.org/ftp/lua-5.1.4.tar.gz")]),a._v(" "),t("li",[a._v("tar -xf lua-5.1.4.tar.gz")]),a._v(" "),t("li",[a._v("cd lua-5.1.4/src")]),a._v(" "),t("li",[a._v("修改Makefile 文件 修改CFLAGS 为 CFLAGS= -fPIC -O2 -Wall")]),a._v(" "),t("li",[a._v("回到lua-5.1.4目录  make linux && make install")])]),a._v(" "),t("h3",{attrs:{id:"把protoc-gen-lua-添加到path中"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#把protoc-gen-lua-添加到path中"}},[a._v("#")]),a._v(" 把protoc-gen-lua 添加到PATH中")]),a._v(" "),t("p",[a._v("我直接放入/usr/bin了， 它默认就在PATH中:")]),a._v(" "),t("ul",[t("li",[a._v("ln -s /usr/local/src/protoc-gen-lua/plugin/protoc-gen-lua   /usr/bin/")])]),a._v(" "),t("p",[a._v("也可以放入/usr/local/bin ，但是需要把这个路径加入PATH")]),a._v(" "),t("h3",{attrs:{id:"见证奇迹了"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#见证奇迹了"}},[a._v("#")]),a._v(" 见证奇迹了")]),a._v(" "),t("p",[a._v("cd到protoc-gen-lua/example目录")]),a._v(" "),t("p",[a._v("执行 protoc --lua_out=./ person.proto")]),a._v(" "),t("p",[a._v("报错了，需要修改 person.proto文件")]),a._v(" "),t("p",[a._v('这个例子文件是proto第二版的格式， 在文件开头加入一行 syntax = "proto2";')]),a._v(" "),t("p",[a._v("再次执行，就ok了。")]),a._v(" "),t("h2",{attrs:{id:"方法二-使用新库lua-protobuf-支持2和3两个版本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#方法二-使用新库lua-protobuf-支持2和3两个版本"}},[a._v("#")]),a._v(" 方法二: 使用新库lua-protobuf（支持2和3两个版本）")]),a._v(" "),t("p",[a._v("它可以直接loadfile加载proto2和proto3的文件格式，而不用再转成lua文件了")]),a._v(" "),t("p",[a._v("具体"),t("a",{attrs:{href:"https://github.com/starwing/lua-protobuf",target:"_blank",rel:"noopener noreferrer"}},[a._v("github地址"),t("OutboundLink")],1)]),a._v(" "),t("p",[a._v("linux下编译选项命令:")]),a._v(" "),t("p",[a._v('gcc -O2 -shared -fPIC -I "$LUA_HEADERS" pb.c -o pb.so')]),a._v(" "),t("p",[a._v("-I 可以直接指定lua头文件路径 /usr/local/include")]),a._v(" "),t("p",[a._v("为什么lua头文件在这里，可以看lua源码Makefile")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("\tINSTALL_TOP= /usr/local\n\tINSTALL_BIN= $(INSTALL_TOP)/bin\n\tINSTALL_INC= $(INSTALL_TOP)/include\n\tINSTALL_LIB= $(INSTALL_TOP)/lib\n\tINSTALL_MAN= $(INSTALL_TOP)/man/man1\n\t...\n\tTO_BIN= lua luac\n\tTO_INC= lua.h luaconf.h lualib.h lauxlib.h ../etc/lua.hpp\n\tTO_LIB= liblua.a\n\tTO_MAN= lua.1 luac.1\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br")])]),t("p",[a._v("编译后:")]),a._v(" "),t("p",[a._v("/usr/local/bin生成可执行文件lua，luac")]),a._v(" "),t("p",[a._v("/usr/local/include生成头文件")]),a._v(" "),t("p",[a._v("/usr/local/lib是静态库 liblua.a")]),a._v(" "),t("p",[a._v("回到正题，新库编译pb.c 生成pb.so 可以直接用了")]),a._v(" "),t("p",[a._v("如果是openresty接口调用，需要在nginx.conf 加入当前目录到库的搜索路径")]),a._v(" "),t("div",{staticClass:"language-perl line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-perl"}},[t("code",[a._v("\tlua_package_path "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/usr/local/openresty/lualib/lua-protobuf-master/?.lua;;'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\tlua_package_cpath "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'/usr/local/openresty/lualib/lua-protobuf-master/?.so;;'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("例子代码")]),a._v(" "),t("div",{staticClass:"language-lua line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-lua"}},[t("code",[a._v("  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("local")]),a._v(" pb "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" require "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"pb"')]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("local")]),a._v(" protoc "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" require "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"protoc"')]),a._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("load schema from "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("text")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("just "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),a._v(" demo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" use protoc"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("new")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v(" real world"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("assert")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("protoc"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v("load "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("[[\n     message Phone {\n        optional string name        = 1;\n        optional int64  phonenumber = 2;\n     }\n     message Person {\n        optional string name     = 1;\n        optional int32  age      = 2;\n        optional string address  = 3;\n        repeated Phone  contacts = 4;\n     } ]]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("lua table data\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("local")]),a._v(" data "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n     name "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"ilse"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n     age  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("18")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n     contacts "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"alice"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" phonenumber "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("12312341234")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" name "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"bob"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("   phonenumber "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("45645674567")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n     "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("encode lua table data into binary format "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v(" lua string "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("and")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("local")]),a._v(" bytes "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("assert")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("pb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("encode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Person"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("pb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("tohex")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("bytes"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("and")]),a._v(" decode the binary data back into lua table\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("local")]),a._v(" data2 "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("assert")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("pb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("decode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Person"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" bytes"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("print")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("require "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"serpent"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("block")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("data2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br"),t("span",{staticClass:"line-number"},[a._v("14")]),t("br"),t("span",{staticClass:"line-number"},[a._v("15")]),t("br"),t("span",{staticClass:"line-number"},[a._v("16")]),t("br"),t("span",{staticClass:"line-number"},[a._v("17")]),t("br"),t("span",{staticClass:"line-number"},[a._v("18")]),t("br"),t("span",{staticClass:"line-number"},[a._v("19")]),t("br"),t("span",{staticClass:"line-number"},[a._v("20")]),t("br"),t("span",{staticClass:"line-number"},[a._v("21")]),t("br"),t("span",{staticClass:"line-number"},[a._v("22")]),t("br"),t("span",{staticClass:"line-number"},[a._v("23")]),t("br"),t("span",{staticClass:"line-number"},[a._v("24")]),t("br"),t("span",{staticClass:"line-number"},[a._v("25")]),t("br"),t("span",{staticClass:"line-number"},[a._v("26")]),t("br"),t("span",{staticClass:"line-number"},[a._v("27")]),t("br"),t("span",{staticClass:"line-number"},[a._v("28")]),t("br"),t("span",{staticClass:"line-number"},[a._v("29")]),t("br"),t("span",{staticClass:"line-number"},[a._v("30")]),t("br"),t("span",{staticClass:"line-number"},[a._v("31")]),t("br"),t("span",{staticClass:"line-number"},[a._v("32")]),t("br"),t("span",{staticClass:"line-number"},[a._v("33")]),t("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);