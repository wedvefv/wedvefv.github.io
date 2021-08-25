+++
title="proto转lua"
categories=["lua"] 
tags=["lua"] 
date="2021-06-12 12:00:00+0800"
toc=false
+++

## 记录安装笔记

### 方法一:  将proto文件转成lua文件
#### 安装protoc工具

[源码下载地址](https://github.com/protocolbuffers/protobuf/releases)

下载第一个 protobuf-all-3.17.3.tar.gz

tar -xf  protobuf-all-3.17.3.tar.gz

cd  protobuf-3.17.3

make && make install


### 安装protoc-gen-lua 工具

python扩展 pip install protobuf 

git clone https://github.com/sean-lin/protoc-gen-lua.git

进入 protoc-gen-lua/protobuf  编译pb.c 得到pb.so  按理说直接make即可


### 解决pb.so 编译错误

一般会报错 , 提示lua5.1
```
Package lua5.1 was not found in the pkg-config search path.
Perhaps you should add the directory containing `lua5.1.pc'
to the PKG_CONFIG_PATH environment variable
No package 'lua5.1' found
```

查看Makefile

```
# 源文件
SRC=pb.c 
# 目标文件
TARGET=pb.so

#头文件目录
CFLAGS=`pkg-config --cflags lua5.1` -std=gnu99
#静态文件目录
LDFLAGS=`pkg-config --libs lua5.1`

all:$(TARGET)
$(TARGET):$(SRC)
    gcc -O3 -shared -fPIC $(SRC) $(CFLAGS) $(LDFLAGS) -o $@
```

-static 使用静态库.a链接

-shared 使用共享库.so链接(默认行为)

-fPIC 编译时生成位置无关的代码，全部使用相对地址, 这样可被多个进程使用, 如果不加次选项，库被加载时位置不固定，所以每个进程都有一份copy，这样浪费内存， 也失去了共享的属性。

pkconfig可以使用.pc文件生成对应程序的include文件和lib文件目录, 它会搜索$PKG_CONFIG_PATH目录下的pc文件

如何知道lua的pc文件呢:   
yum provides \*/lua.pc 这是查看哪个包有lua.pc 文件的
* 结果一般都是lua-devel-5.1.4-15.el7.x86_64 : Development files for lua
如果拿你安装了openresty， 可以直接查找
find / -name lua.pc 
```
/opt/openresty-1.9.7.4/bundle/lua-5.1.5/etc/lua.pc
/opt/openresty-1.9.7.4/build/lua-5.1.5/etc/lua.pc
```

建立软连接到pc文件目录
- ln -s /opt/openresty-1.9.7.4/build/lua-5.1.5/etc/lua.pc $PKG_CONFIG_PATH/lua5.1.pc

pkgconfig查看lua的头文件和库文件, 确实没问题

```
[root@v1 protobuf]# pkg-config --cflags lua5.1
-I/usr/local/include  
[root@v1 protobuf]# pkg-config --libs lua5.1
-L/usr/local/lib -llua -lm  
[root@v1 protobuf]# 
```

回到protoc-gen-lua/protobuf目录执行make， 又报错了

```
gcc -O3 -shared -fPIC pb.c `pkg-config --cflags lua5.1` -std=gnu99 `pkg-config --libs lua5.1` -o pb.so
/usr/bin/ld: /usr/local/lib/liblua.a(lapi.o): relocation R_X86_64_32 against hidden symbol `luaO_nilobject_' can not be used 
```
错误翻译过来就是动态库/usr/local/lib/liblua.a 里面的函数luaO_nilobject_无法重定位，就是编译lua静态库是时没加-fPIC选项

解决上一个文件， 下载lua-5.1.4 重新编译安装
- curl -R -O http://www.lua.org/ftp/lua-5.1.4.tar.gz
- tar -xf lua-5.1.4.tar.gz
- cd lua-5.1.4/src
- 修改Makefile 文件 修改CFLAGS 为 CFLAGS= -fPIC -O2 -Wall
- 回到lua-5.1.4目录  make linux && make install


### 把protoc-gen-lua 添加到PATH中

我直接放入/usr/bin了， 它默认就在PATH中:
- ln -s /usr/local/src/protoc-gen-lua/plugin/protoc-gen-lua   /usr/bin/

也可以放入/usr/local/bin ，但是需要把这个路径加入PATH

### 见证奇迹了

cd到protoc-gen-lua/example目录

执行 protoc --lua_out=./ person.proto 

报错了，需要修改 person.proto文件

这个例子文件是proto第二版的格式， 在文件开头加入一行 syntax = "proto2";

再次执行，就ok了。


## 方法二: 使用新库lua-protobuf（支持2和3两个版本）

它可以直接loadfile加载proto2和proto3的文件格式，而不用再转成lua文件了

具体[github地址](https://github.com/starwing/lua-protobuf)

linux下编译选项命令:

gcc -O2 -shared -fPIC -I "$LUA_HEADERS" pb.c -o pb.so

-I 可以直接指定lua头文件路径 /usr/local/include

为什么lua头文件在这里，可以看lua源码Makefile 
```
	INSTALL_TOP= /usr/local
	INSTALL_BIN= $(INSTALL_TOP)/bin
	INSTALL_INC= $(INSTALL_TOP)/include
	INSTALL_LIB= $(INSTALL_TOP)/lib
	INSTALL_MAN= $(INSTALL_TOP)/man/man1
	...
	TO_BIN= lua luac
	TO_INC= lua.h luaconf.h lualib.h lauxlib.h ../etc/lua.hpp
	TO_LIB= liblua.a
	TO_MAN= lua.1 luac.1
```
编译后:

/usr/local/bin生成可执行文件lua，luac

/usr/local/include生成头文件

/usr/local/lib是静态库 liblua.a

回到正题，新库编译pb.c 生成pb.so 可以直接用了

如果是openresty接口调用，需要在nginx.conf 加入当前目录到库的搜索路径
```perl
	lua_package_path '/usr/local/openresty/lualib/lua-protobuf-master/?.lua;;';
	lua_package_cpath '/usr/local/openresty/lualib/lua-protobuf-master/?.so;;';
```

例子代码
```lua
  local pb = require "pb"
  local protoc = require "protoc"

  -load schema from text (just for demo, use protoc.new() in real world)
  assert(protoc:load [[
     message Phone {
        optional string name        = 1;
        optional int64  phonenumber = 2;
     }
     message Person {
        optional string name     = 1;
        optional int32  age      = 2;
        optional string address  = 3;
        repeated Phone  contacts = 4;
     } ]])

  -lua table data
  local data = {
     name = "ilse",
     age  = 18,
     contacts = {
        { name = "alice", phonenumber = 12312341234 },
        { name = "bob",   phonenumber = 45645674567 }
     }
  }

  -encode lua table data into binary format in lua string and return
  local bytes = assert(pb.encode("Person", data))
  print(pb.tohex(bytes))

  -and decode the binary data back into lua table
  local data2 = assert(pb.decode("Person", bytes))
  print(require "serpent".block(data2))
  ```
