
注:本笔记基于python2.6而编辑,尽量的偏向3.x的语法


Python的特色
  1.简单
  2.易学
  3.免费、开源
  4.高层语言: 封装内存管理等
  5.可移植性: 程序如果避免使用依赖于系统的特性，那么无需修改就可以在任何平台上运行
  6.解释性: 直接从源代码运行程序,不再需要担心如何编译程序,使得程序更加易于移植。
  7.面向对象: 支持面向过程的编程也支持面向对象的编程。
  8.可扩展性: 需要保密或者高效的代码，可以用C或C++编写，然后在Python程序中使用它们。
  9.可嵌入性: 可以把Python嵌入C/C++程序，从而向你的程序用户提供脚本功能。
  10.丰富的库: 包括正则表达式、文档生成、单元测试、线程、数据库、网页浏览器、CGI、FTP、
     电子邮件、XML、XML-RPC、HTML、WAV文件、密码系统、GUI(图形用户界面)、Tk和其他与系统有关的操作。
     除了标准库以外，还有许多其他高质量的库，如wxPython、Twisted和Python图像库等等。
  11.概括: Python确实是一种十分精彩又强大的语言。它合理地结合了高性能与使得编写程序简单有趣的特色。
  12.规范的代码: Python采用强制缩进的方式使得代码具有极佳的可读性。


Python 下载地址
    http://www.python.org/download/

Python 安装：
    windows时，运行安装文件之后，还需要配置环境变量，在环境变量的“Path”后面加上英文的分号及python安装目录
    如：“;C:\promg\python2.6”
    不配置环境变量的话，没法在命令行直接使用python

有两种使用Python运行你的程序的方式
   1.使用交互式的带提示符的解释器
     直接双击运行“python.exe”，在里面输入内容，如： print 'haha...'
   2.使用源文件
     在Python的安装目录下，建一个批处理(test.bat)，写入：
     @echo off
     python.exe test.py
     pause

     而“test.py”里面的内容是需要执行的程序


Python命令行选项
    选项      作用
    -c cmd   在命令行直接执行python代码。如python -c 'print "hello world"'。
    -d       脚本编译后从解释器产生调试信息。同PYTHONDEBUG=1。
    -E       忽略环境变量。
    -h       显示python命令行选项帮助信息。
    -i       脚本执行后马上进入交互命令行模式。同PYTHONINSPECT=1。
    -O       在执行前对解释器产生的字节码进行优化。同 PYTHONOPTIMIZE=1。
    -OO      在执行前对解释器产生的字节码进行优化，并删除优化代码中的嵌入式文档字符串。
    -Q arg   除法规则选项，-Qold(default)，-Qwarn，-Qwarnall，-Qnew。
    -S       解释器不自动导入site.py模块。
    -t       当脚本的tab缩排格式不一致时产生警告。
    -u       不缓冲stdin、stdout和stderr，默认是缓冲的。同PYTHONUNBUFFERED=1。
    -v       产生每个模块的信息。如果两个-v选项，则产生更详细的信息。同PYTHONVERBOSE=x。
    -V       显示Python的版本信息。
    -W arg   出错信息控制。(arg is action:message:category:module:lineno)
    -x       忽略源文件的首行。要在多平台上执行脚本时有用。
    file     执行file里的代码。
    -        从stdin里读取执行代码。


easy_install
    这是个很常用的python安装工具
    可以直接安装ez_setup.py脚本(下载网址： http://peak.telecommunity.com/dist/ez_setup.py):
        python ez_setup.py

    windows 下的使用：
      安装：
        下载: http://peak.telecommunity.com/dist/ez_setup.py
        执行: python ez_setup.py
      使用：
        easy_install.exe -U %modal%  # %modal% 是模块名

    linux 下：
      安装：
        sudo apt-get install python-setuptools
      或者：
        wget -q http://peak.telecommunity.com/dist/ez_setup.py
        sudo python ez_setup.py
      使用：
        sudo easy_install 模块名

        安装完后，最好确保easy_install所在目录已经被加到PATH环境变量里:
        Windows: C:\Python25\Scripts
        Linux: /usr/local/bin

    不能使用easy_install的特殊情况：
        a、安装默认版本的MySQL-python会报错，需要指定版本如下：easy_install "MySQL-python==1.2.2"
        b、有些包直接easy_install会失败，需要自行下载安装：
           wxpython，pil要下载exe安装程序
           robotide因为在pypi上找不到，要下载后再easy_install

    通过easy_install安装软件，相关安装信息会保存到easy-install.pth文件里，路径类似如下形式：
    Windows：C:\Python25\Lib\site-packages\easy-install.pth
    Linux：/usr/local/lib/python25/site-packages/easy-install.pth

    如果想删除通过easy_install安装的软件包，比如说：MySQL-python，可以执行命令：
        easy_install -m MySQL-python

    此操作会从easy-install.pth文件里把MySQL-python的相关信息抹去，剩下的egg文件，你可以手动删除。


版本问题
   python3.0版本较之前的有很大变动，而且不向下兼容。
   Python 2.6作为一个过渡版本，基本使用了Python 2.x的语法和库，同时考虑了向Python 3.0的迁移。即2.6版本兼容2.x和3.0的语法
       Python 2.6保持了对之前版本的全兼容，而且还包含了Python 3.0的新玩意(一些新特性需要通过“from __future__ import”来启用)。
       如，在Python2.6要使用3.0的打印,得写上“ from __future__ import print_function”
   基于早期Python版本而能正常运行于Python 2.6并无警告的程序可以通过一个2 to 3的转换工具无缝迁移到Python 3.0。

   部分函数和语句的改变
      最引人注意的改变是print语句没有了，取而代之的是print函数
      同样的还有exec语句，已经改为exec()函数。去除了<>，全部改用!=。
        在python2.x版本中
          #!/usr/bin/env python
          # 或者上句写: #!/usr/bin/python
          print "Hello, world!"
          或者：
          import sys
          sys.stdout.write("Hello, world\n")

        在python3.x中
          print('Hello world!')
   用迭代器来替代列表
      一些知名的API将不再返回列表。
      而字典的dict.iterkeys()、dict.itervalues()和dict.iteritems()方法将会移除，而你可以使用.keys()、.values()和.items()，它们会返回更轻量级的、类似于集合的容器对象，而不是返回一个列表来复制键值。
      这样做的优点是，可以直接在键和条目上进行集合操作，而不需要再复制一次。
   整型数
      移除了含糊的除法符号('/')，而只返回浮点数。
      在以前的版本中，如果参数是int或者是long的话，就会返回相除后结果的向下取整(floor)，而如果参数是float或者是complex的话，那么就会返回相除后结果的一个恰当的近似。
      在2.6版本中可以通过from __future__ import division来启用这项特性。


python2 to python3 问题
    1.print 语句
           2.x                        3.x                           说明
       ① print                      print()                      # 输出一个空白行
       ② print 1                    print(1)                     # 输出一个单独的值
       ③ print 1, 2                 print(1, 2)                  # 输出多个值，以空格分割
       ④ print 1, 2,                print(1, 2, end=' ')         # 输出时取消在末尾输出回车符。
       ⑤ print >>sys.stderr, 1, 2   print(1, 2, file=sys.stderr) # 把输出重定向到一个管道

    2.被重命名或者重新组织的模块
      1)http
        在Python 3里，几个相关的HTTP模块被组合成一个单独的包，即http。
             2.x                     3.x
        ①  import httplib          import http.client     # http.client 模块实现了一个底层的库，可以用来请求HTTP资源，解析HTTP响应。
        ②  import Cookie           import http.cookies    # http.cookies 模块提供一个蟒样的(Pythonic)接口来获取通过HTTP头部(HTTP header)Set-Cookie发送的cookies
        ③  import cookielib        import http.cookiejar  # 常用的流行的浏览器会把cookies以文件形式存放在磁盘上，http.cookiejar 模块可以操作这些文件。
        ④  import BaseHTTPServer   import http.server     # http.server 模块实现了一个基本的HTTP服务器
            import SimpleHTTPServer
            import CGIHttpServer

      2)urllib
        Python 2有一些用来分析，编码和获取URL的模块，但是这些模块就像老鼠窝一样相互重叠。在Python 3里，这些模块被重构、组合成了一个单独的包，即urllib。
             2.x                                 3.x
        ①  import urllib                       import urllib.request, urllib.parse, urllib.error
        ②  import urllib2                      import urllib.request, urllib.error
        ③  import urlparse                     import urllib.parse
        ④  import robotparser                  import urllib.robotparser
        ⑤  from urllib import FancyURLopener   from urllib.request import FancyURLopener
            from urllib import urlencode        from urllib.parse import urlencode
        ⑥  from urllib2 import Request         from urllib.request import Request
            from urllib2 import HTTPError       from urllib.error import HTTPError

        以前，Python 2里的 urllib 模块有各种各样的函数，包括用来获取数据的 urlopen()，还有用来将URL分割成其组成部分的 splittype(), splithost()和 splituser()函数。
        在python3的 urllib 包里，这些函数被组织得更有逻辑性。2to3将会修改这些函数的调用以适应新的命名方案。
        在Python 3里，以前的 urllib2 模块被并入了 urllib 包。同时，以 urllib2 里各种你最喜爱的东西将会一个不缺地出现在Python 3的 urllib 模块里，比如 build_opener()方法, Request 对象， HTTPBasicAuthHandler 和 friends 。
        Python 3里的 urllib.parse 模块包含了原来Python 2里 urlparse 模块所有的解析函数。
        urllib.robotparse 模块解析 robots.txt 文件。
        处理HTTP重定向和其他状态码的 FancyURLopener 类在Python 3里的 urllib.request 模块里依然有效。 urlencode()函数已经被转移到了 urllib.parse 里。
        Request 对象在 urllib.request 里依然有效，但是像HTTPError这样的常量已经被转移到了 urllib.error 里。

      3)dbm
        所有的DBM克隆(DBM clone)现在在单独的一个包里，即dbm。如果你需要其中某个特定的变体，比如GNU DBM，你可以导入dbm包中合适的模块。
              2.x                3.x
         ①  import dbm         import dbm.ndbm
         ②  import gdbm        import dbm.gnu
         ③  import dbhash      import dbm.bsd
         ④  import dumbdbm     import dbm.dumb
         ⑤  import anydbm      import dbm
             import whichdb

      4)xmlrpc
        XML-RPC是一个通过HTTP协议执行远程RPC调用的轻重级方法。一些XML-RPC客户端和XML-RPC服务端的实现库现在被组合到了独立的包，即xmlrpc。
              2.x                        3.x
         ①  import xmlrpclib           import xmlrpc.client
         ②  import DocXMLRPCServer     import xmlrpc.server
             import SimpleXMLRPCServer

      5)其他模块
             2.x                               3.x
        ①  try:                              import io
                import cStringIO as StringIO  # 在Python 2里，你通常会这样做，首先尝试把cStringIO导入作为StringIO的替代，如果失败了，再导入StringIO。
            except ImportError:               # 不要在Python 3里这样做；io模块会帮你处理好这件事情。它会找出可用的最快实现方法，然后自动使用它。
                import StringIO
        ②  try:                              import pickle
                import cPickle as pickle      # 在Python 2里，导入最快的pickle实现也与上边 io 相似。在Python 3里，pickle模块会自动为你处理，所以不要再这样做。
            except ImportError:
                import pickle
        ③  import __builtin__                import builtins
        ④  import copy_reg                   import copyreg # copyreg模块为用C语言定义的用户自定义类型添加了pickle模块的支持。
        ⑤  import Queue                      import queue   # queue模块实现一个生产者消费者队列(multi-producer, multi-consumer queue)。
        ⑥  import SocketServer               import socketserver # socketserver模块为实现各种socket server提供了通用基础类。
        ⑦  import ConfigParser               import configparser # configparser模块用来解析INI-style配置文件。
        ⑧  import repr                       import reprlib # reprlib 模块重新实现了内置函数 repr()，并添加了对字符串表示被截断前长度的控制。
        ⑨  import commands                   import subprocess # subprocess 模块允许你创建子进程，连接到他们的管道，然后获取他们的返回值。

        builtins模块包含了在整个Python语言里都会使用的全局函数，类和常量。重新定义builtins模块里的某个函数意味着在每处都重定义了这个全局函数。这听起来很强大，但是同时也是很可怕的。


注释
  “#”后面的内容


数据类型
   共4种: 整数、长整数、浮点数和复数。
   1.整数,如:2
   2.长整数,如:22L  # 长整数不过是大一些的整数。Python 3已经取消这种类型,被int取代了。
   3.浮点数,如:3.23 和 52.3E-4  # E标记表示10的幂。在这里，52.3E-4表示52.3 * 10-4。
   4.复数,如:(-5+4j) 和 (2.3-4.6j)

   在Python 2和Python 3的变化:
   1.八进制(octal)数:
     Python 2: x = 0755   # 0开头
     Python 3: x = 0o755  # 0o开头
   2.long 类型
     Python 2有为非浮点数准备的 int 和 long 类型。 int 类型的最大值不能超过 sys.maxint,而且这个最大值是平台相关的。
       整数可以通过在数字的末尾附上一个L来定义长整型，显然，它比 int 类型表示的数字范围更大。
     Python 3里，只有一种整数类型 int,大多数情况下，它很像Python 2里的长整型。
       由于已经不存在两种类型的整数，所以就没有必要使用特殊的语法去区别他们。

     由于 long 类型在Python 3的取消,引起以下改变
          Python 2              Python 3            说明
      ① x = 1000000000000L    x = 1000000000000   # 十进制的普通整数
      ② x = 0xFFFFFFFFFFFFL   x = 0xFFFFFFFFFFFF  # 十六进制的普通整数
      ③ long(x)               int(x)              # long()函数没有了。可以使用int()函数强制转换一个变量到整型。
      ④ type(x) is long       type(x) is int      # 检查一个变量是否是整型
      ⑤ isinstance(x, long)   isinstance(x, int)  # 也可以使用 isinstance()函数来检查数据类型
   3.sys.maxint(sys.maxsize)
     由于长整型和整型被整合在一起了, sys.maxint常量不再精确。
     因为这个值对于检测特定平台的能力还是有用处的，所以它被Python 3保留，并且重命名为 sys.maxsize。
         Python 2                Python 3
     ① from sys import maxint  from sys import maxsize  # maxint变成了maxsize。
     ② a_function(sys.maxint)  a_function(sys.maxsize)  # 所有的sys.maxint都变成了sys.maxsize。

  int 是 types.IntType 的代名词
    print(id(int)) # 打印如：505210872
    import types;print(id(types.IntType)) # 打印如：505210872


标识符的命名
    变量是标识符的例子。 标识符 是用来标识 某样东西 的名字。在命名标识符的时候，你要遵循这些规则：
    1.标识符的第一个字符必须是字母表中的字母(大写或小写)或者一个下划线(‘_’)。
    2.标识符名称的其他部分可以由字母(大写或小写)、下划线(‘_’)或数字(0-9)组成。
    3.标识符名称是对大小写敏感的。例如，myname和myName不是一个标识符。
    有效 标识符名称的例子有i、__my_name、name_23和a1b2_c3。
    无效 标识符名称的例子有2things、this is spaced out和my-name。



逻辑行与物理行
  物理行是在编写程序时文本的一行。逻辑行是程序的一个语句。
  Python假定每个 物理行 对应一个 逻辑行 。 他希望每行都只使用一个语句，这样使得代码更加易读。
  1. 如果你想要在一个物理行中使用多于一个逻辑行，那么你需要使用分号(;)来特别地标明这种用法。
     分号表示一个逻辑行/语句的结束。
     如: i = 5; print i; # 强烈建议你坚持在每个物理行只写一句逻辑行。 让程序见不到分号，而更容易阅读。
  2. 明确的行连接
     在多个物理行中写一个逻辑行,行结尾用反斜杠标明
     如: s = 'This is a string. \
         This continues the string.'
         # 上面这两行是一个逻辑行,打印是: This is a string. This continues the string.
         print \
         i
         # 上面这两行也是一个逻辑行, 等同于: print i
  3. 暗示的行连接
     在多个物理行中写一个逻辑行,行结尾不需要使用反斜杠标明。
     这种情况出现在逻辑行中使用了圆括号、方括号或波形括号的时候。
  4. 缩进
     行首的空白是重要的。在逻辑行首的空白(空格和tab符)用来决定逻辑行的缩进层次，从而用来决定语句的分组。
     同一层次的语句必须有相同的缩进。每一组这样的语句称为一个块。
     不要混合使用tab符和空格来缩进，因为这在跨越不同的平台的时候，无法正常工作。强烈建议只使用一种风格来缩进。


语法规则
   1.缩进规则
     一个模块的界限，完全是由每行的首字符在这一行的位置来决定的(而不是花括号{})。这一点曾经引起过争议。
     不过不可否认的是，通过强制程序员们缩进，Python确实使得程序更加清晰和美观。
     在逻辑行首的空白(空格和tab)用来决定逻辑行的缩进层次，从而用来决定语句的分组。错误的缩进会引发错误。
     注意: 强制缩进的问题,最常见的情况是tab符和空格的混用会导致错误，而这是用肉眼无法分别的。
   2.变量没有类型
     使用变量时只需要给它们赋值。 不需要声明或定义数据类型。
   3.单语句块
     如果你的语句块只包含一句语句，那么你可以在条件语句或循环语句的同一行指明它。如: if 1!=2: print('Yes')
     强烈建议不要使用这种缩略方法。这会破坏Python清晰美观的代码风格,违背设计者的初衷。
     如果是在Python解释器输入,它的把提示符会改变为...以表示语句还没有结束。这时按回车键用来确认语句已经完整了。然后，Python完成整个语句的执行，并且返回原来的提示符来等待下一句输入。



运算符与表达式:

运算符
   运算符   名称          说明
     +       加          两个对象相加,也可以字符串拼接
     -       减          得到负数或是一个数减去另一个数
     *       乘          两个数相乘 或是返回一个被重复若干次的字符串
     **      幂          返回x的y次幂
     /       除          x除以y
     //      取整除      返回商的整数部分
     %       取模        返回除法的余数  # 8%3得到2。 -25.5%2.25得到1.5
     <<      左移        把一个数的二进制向左移一定数目 # 2 << 2得到8
     >>      右移        把一个数的二进制向右移一定数目 # 11 >> 1得到5
     &       按位与      数的按位与 # 5 & 3得到1。
     |       按位或      数的按位或 # 5 | 3得到7。
     ^       按位异或    数的按位异或 # 5 ^ 3得到6
     ~       按位翻转    x的按位翻转是-(x+1) # ~5得到6。
     <       小于        返回x是否小于y
     >       大于        返回x是否大于y
     <=      小于等于    返回x是否小于等于y
     >=      大于等于    返回x是否大于等于y
     ==      等于        比较对象是否相等
     !=      不等于      比较两个对象是否不相等(python3删除了“<>”符号)
     not     布尔“非”  如果x为True，返回False。如果x为False，它返回True。 # x = True; not x返回False。
     and     布尔“与”  如果x为False，x and y返回False，否则它返回y的计算值。 # x=False; y=True; x and y返回False。
     or      布尔“或”  如果x是True，它返回True，否则它返回y的计算值。# x = True; y = False; x or y返回True。
     in, not in          成员测试 (由类里面的 __contains__ 函数指定返回值)
     is, is not          同性测试 (两值的 is 运算是判断引用,与“==”的比较有所不同)


   说明:
     1.加号“+”:有数学相加，也有字符串拼接作用,注意:不能字符串和数字相加。如: 3 + 5得到8; 'a' + 'b'得到'ab'。
     2.乘号“*”:两个数相乘，也可以把字符串重复拼接若干次,如: 2 * 3得到6; 'la' * 3得到'lalala'。
     3.幂“**” :这种写法,其他语言好像没见到过,如: 3 ** 4得到81(即3 * 3 * 3 * 3)
     4.除号“/”:整数的除法得到整数结果,浮点数的得到浮点数,如:4/3得到1(返回相除后结果的向下取整(floor)); 4.0/3或4/3.0得到1.333...
       注意:Python 3.0开始,移除了含糊的除法符号('/')，而只返回浮点数。如:4/3得到1.333...
     5.取整除“//”:将两数相除,然后对结果取整,如: 7 // 3得到2; 4 // 3.0得到1.0
     6.比较运算符:所有比较运算符返回1表示真，返回0表示假。这分别与特殊的变量 True 和 False 等价。注意大小写。
       如果两个操作数都是数字，它们首先被转换为一个共同的类型(如double)。否则，它总是返回 False 。
       5 < 3返回0(即False); 而3 < 5返回1(即True)。比较可以被任意连接: 3 < 5 < 7返回True。
       大于、小于、小于等于、大于等于时:数字跟数字可以比较，字符串跟字符串可以比较，但数字不能跟字符串比较。
       等于、不等于时: 数字跟数字可以比较，字符串跟字符串可以比较，数字跟字符串比较返回 False (表示不相等)
       等于: Python 使用“==”来做比较，用“=”来赋值。但不允许内嵌的赋值，所以不会出现你本以为在做比较而意外的写成赋值的情况。
     7.布尔运算: and 和 or 都是短路运算,没有非短路运算的运算符。
       短路运算:当前面一个表达式可以决定结果时，后面的语句不用再判断。非短路运算时，还照样判断后面的。
       注意：在 and or 运算中，空字符串'',数字0,空列表[],空字典{},空元组(), None,在逻辑运算中都被当作假来处理。
     8.and 和 or 的特殊用法:
       由于语言的松散性,用 and 和 or 在赋值语句时有判断作用。
       1) or 用在赋值语句里，返回第一个逻辑为真的值, 没有逻辑为真的返回最后一个。(如下这写法比较常用)
          如:ss = False or None or 0 or '' or -1 or 'sss'; print(ss) # 打印:-1 (-1作if判断时返回 True)
          设定预设值的写法: edittype = edittype or "text"; # 如果 edittype 之前有值,则取之前的值; 之前为空,则取默认值
       2) and 用在赋值语句里，与 or 刚好相反，返回第一个逻辑为假的值, 没有逻辑为假的返回最后一个。
          如: a = 0 and 1; print(a) # 打印: 0
          a = 2 and 1; print(a) # 打印: 1
          应用： valid = True; valid = valid and checkLength(name, 16); valid = valid and checkLength(name, 16); # 如果前面的验证不通过，则后面的不再验证
       简便的记忆是: and 偏 False, or 偏 True
       要理解 and 和 or 的这种写法，得考虑到它的短路运算特性。它是在做逻辑判断，但返回的是前或后一个的值，而不是返回 True 或 False 。
     9.三目运算符：
       Python 没有三目运算符“cond ? a : b”,但可以使用 and 和 or 来代替(需理解前面的 and 和 or 的特殊用法)，如下：
       1) c = cond and a or b   # 这多数情况下是正确的，但当 a 是空字符串''、数字0等逻辑运算为假的情况下会出错。
       2) c = (cond and [a] or [b])[0] # 即使 a或者b为一个逻辑假的值，将他放入集合中后，就为真了，也就是[False] [None]都不为假。
       3) c = (b, a)[cond and 1 or 0] # 注意 a和b的位置是颠倒的,将表达式结果转成1和0来作为元组下标而选择结果。
       4) c = a if cond else b # 使用 if else 写条件(python特有的写法,建议使用,前3种写法难理解也容易出错)
     10.自增,自减:
       Python 没有“++”和“--”两个语法,自增自减时只能写: i = i + 1 或者 i += 1, 不能用 i++
       这在一定程度上避免出错，因为新手经常搞错“++”放前面还是放后面; 但这也导致 for 循环的写法与其它语言很不同
     11.switch/case 语句
        Python现在不支持这语句，但可以用 range(N) 生成一个 列表
     12.一次性的多比较
        “ if (0 < n < 4000) ”这种写法在python是允许的，它等价于“ if ((0 < n) and (n < 4000)) ”但前者更适合阅读。


运算符优先级
    下面这个表给出Python的运算符优先级，从最低的优先级(最松散地结合)到最高的优先级(最紧密地结合)。
    在一个表达式中，Python会首先计算下表中较下面的运算符，然后在计算列在下表上部的运算符。
    在下表中列在同一行的运算符具有 相同优先级 。例如，+和-有相同的优先级。
    建议使用圆括号来分组运算符和操作数，以便能够明确地指出运算的先后顺序，使程序尽可能地易读。例如，2 + (3 * 4)显然比2 + 3 * 4清晰。

    运算符                   描述
    lambda                  Lambda表达式
    or                      布尔“或”
    and                     布尔“与”
    not x                   布尔“非”
    in，not in              成员测试
    is，is not              同一性测试
    <，<=，>，>=，!=，==    比较
    |                       按位或
    ^                       按位异或
    &                       按位与
    <<，>>                  移位
    +，-                    加法与减法
    *，/，%                 乘法、除法与取余
    +x，-x                  正负号
    ~x                      按位翻转
    **                      指数
    x.attribute             属性参考
    x[index]                下标
    x[index:index]          寻址段
    f(arguments...)         函数调用
    (experession,...)       绑定或元组显示
    [expression,...]        列表显示
    {key:datum,...}         字典显示
    'expression,...'        字符串转换


计算顺序
    默认地，运算符优先级表决定了哪个运算符在别的运算符之前计算。然而，如果要改变它们的计算顺序，得使用圆括号。
    例如，你想要在一个表达式中让加法在乘法之前计算，那么你就得写成类似(2 + 3) * 4的样子。


结合规律
    运算符通常由左向右结合，即具有相同优先级的运算符按照从左向右的顺序计算。例如，2 + 3 + 4被计算成(2 + 3) + 4。
    一些如赋值运算符那样的运算符是由右向左结合的，即a = b + c被处理为a = (b + c)。

对象
    Python 将 "一切皆对象" 贯彻得非常彻底，不区分什么 "值类型" 和 "引用类型"。所谓变量，实质就是一个通用类型指针 (PyObject*)，它仅仅负责指路，至于目标是谁，一概不管。
    Python Object 对象的自身结构了。任何对象，就算一个最简单的整数，它的头部都会拥有 2 个特殊的附加信息，分别是："引用计数" 和 "类型 (type) 指针" 。前者指示 GC 何时回收，而后者标明了对象的身份，如此我们就可以在运行期动态执行对象成员调用。

    连同附加头，一个 "普通" 的整数起码得 12 字节：
    a = 8; import sys; print(sys.getsizeof(a)) # 打印： 12  (python3.2中，打印的是14)
    print(sys.getsizeof(None)) # 打印： 8


字符串
   1.使用单引号“'”引起来: 'Quote me on this'
   2.使用双引号“"”引起来: "What's your name?"
   3.使用三引号('''或"""): 可以指示一个多行的字符串。你可以在三引号中自由的使用单引号和双引号。 /'''
     如:
     """This is a multi-line string. This is the first line.
     "What's your name?," I asked.
     He said "Bond, James Bond."
     """
   4.转义符“\”
     \\  指示反斜杠本身
     \'  指示单引号
     \"  指示双引号
     注意: 行末的单独一个反斜杠表示字符串在下一行继续，而不是开始一个新的行。
   5.自然字符串
     自然字符串通过给字符串加上前缀r或R来指定，取消转义符的功能。例如: r"Newlines are indicated by \n"。
     三引号的字符串也可以同样用法，如：R'''Newlines are indicated by \n'''
   6.Unicode字符串
     Python允许你处理Unicode文本(超过拉丁文字范围的)——只需要在字符串前加上前缀u或U。
     例如，u"This is a Unicode string.哈哈.."。(Python3.x之后不需要这样了,可以直接写中文;而这样写会报错)
     Python 3.0开始对unicode全面支持，所有的文本(str)都是Unicode的；并引入了一个叫做bytes的新类型来处理字节序列。而编码过的Unicode会以二进制的数据来表示。
     因为在2.x的世界里，大量的bug都是因为已编码的文本和未编码的文本混杂在一起而产生的。
   7.按字面意义级连字符串
     如果你把两个字符串按字面意义相邻放着，他们会被Python自动级连。
     例如，"What's" ' your name?'会被自动转为"What's your name?"。
     即是说，两个字符串放在一起，会有字符拼接的效果。加号“+”也有字符拼接的效果。
   8.字符串拼接
     可以使用“str1.__add__(str2)”或者“str1 + str2”或者直接两个字符串放一起,来拼接字符串
     但字符串与其它类型拼接时，得先把其它类型转成字符串类型，否则会出错。如“str1 + 2”就会出错，需要“str1 + str(2)”
   9.格式化
     使用“%控制符”可以格式化字符串,非常方便。如: str1 = "Swaroop's age is %d, weight is %f" % (5, 65.5)
     “%(name)控制符”可按名称传参数(不写名称是按位置传参数)，如: str = "%(row)d Rows is %(value)s" % { 'value': 'kkkk', 'row': 22 }
     格式化的符号用法参考下面的“字符串格式化控制表”
     另外，string.format()函数也可以格式化字符串
     例如：'subtracting {0}, adding {1}'.format(1, 'haha') # 参数讲对应到“{number}”的位置上
   10.字符串序列(索引和切片)
     字符串可以使用下标来获取字符串中某个项目，以及截取字符串。详情参考“序列”
     用法如: name = 'swaroop'; name[1]; name[1:3]; name[1:-1]
   11.str(anything)函数和 unicode(anything)函数
     Python 2有两个全局函数可以把对象强制转换成字符串:unicode()把对象转换成Unicode字符串，还有 str()把对象转换为非Unicode字符串。
     Python 3只有一种字符串类型，Unicode字符串，所以 str()函数即可完成所有的功能。(unicode()函数在Python 3里不再存在了。)
   另外:
     没有专门的char数据类型，确实没有需要有这个类型。
     单引号和双引号字符串是完全相同的——它们没有在任何方面有不同。
     正则表达式: 一定要用自然字符串处理正则表达式。否则会需要使用很多的反斜杠。
     使用 help(str) 可查看字符串对象定义的所有方法及属性。
     由于百分号有特殊作用，所以字符串里面要用百分号的话需要使用“%%”，如："select * from my_table where name like '%%测试%%'"


字符串格式化控制：(未参考帮助文档，只是个人猜测)
   转义符 (Escape Sequence)：
   \ddd     1到3位8进制数指定Unicode字符输出(如：“\127”显示“W”)
   \uxxxx   1到4位16进制数指定Unicode字符输出(Python3.x开始支持此写法,如: \u54C8 显示“哈”字)
   \xhh     16进制数指定Unicode字符输出(如：“\xe5\x93\x88”显示“哈”)
   \\       \
   \        \ (单独的一个斜杠也显示斜杠,即不后接有转移作用的字符时，作为斜杠使用)
   \'       '
   \"       "
   \a       字符：0x07    响铃(ASCII控制字符)
   \b       字符：0x08    退格(光标向左走一格)(ASCII控制字符)
   \f       字符：0x0c    Formfeed(FF)(走纸转页,换页)(ASCII控制字符)
   \n       字符：0x0a    换行(ASCII控制字符)
   \N{name} Unicode字符   只能针对Unicode
   \r       字符：0x0d    回车
   \t       字符：0x09    跳格(tab符号),水平制表符
   \v       字符：0x0b    垂直制表符

   %%       %
   %d       输出10进制整数，只能是数字类型，输出字符串类型会出错；浮点类型的数字将被取整(直接删除小数部分)。
   %f,%F    以10进制输出浮点数，只能是数字类型，输出字符串类型会出错。
   %e,%E    以科学计数法输出10进制的浮点数，大小写的“e”反应在显示时科学计数法的“e/E”上，只能是数字类型。
   %a       Python3.0开始支持此写法，原样输出结果，字符串类型会加上单引号引起来。
   %o       (字母o)以8进制整数方式输出，只能是数字类型；浮点类型的数字将被取整(直接删除小数部分)。
   %x,%X    将数字以16进制方式输出，只能是数字类型；浮点类型的数字将被取整(直接删除小数部分)。
   %s       将字符串格式化输出(可输出任何类型)
   %c       以字符方式输出，提供的类型必须是 char 或 int 。
   注：布尔类型的 True 或 False,用数字类型输出是 1或0,字符串输出是 True 或 False。

   字符串转换成数字
    float(str)     转换成浮点数,如, float("1e-1") 结果：0.1
    int(str)       转换成整数,如, int("12") 结果：12
    int(str,base)  转换成base进制的整数,如, int("11",2) 转换成2进制的整数,结果：3
    long(str)      转换成长整数,Python3取消此语法,如, long("12L") 结果：12L
    long(str,base) 转换成base进制的长整数,Python3取消此语法,如, long("11L",2) 结果：3L

字符串用例
    name = 'Swaroop' # This is a string object

    # 检查字符串的开头部分
    if name.startswith('Swa'):  # 类似函数如 endswith()
        print('Yes, the string starts with "Swa"')

    # 检查是否包含有此内容
    if 'a' in name:
        print('Yes, it contains the string "a"')

    # 找出给定字符串的位置,找不到则返回-1
    if name.find('war') != -1:
        print('Yes, it contains the string "war"', 's')

    # join()函数把列表拼接起来
    delimiter = '; '
    mylist = ['Brazil', 'Russia', 'India', 'China']
    print(delimiter.join(mylist)) # 打印: Brazil; Russia; India; China

    # 大小写转换
    print("THIS IS TEST".lower())    # 转换成小写,打印：this is test
    print("this is test".upper())    # 转换成大写,打印：THIS IS TEST
    print("This Is Test".swapcase()) # 大小写互换,打印：tHIS iS tEST

    print("  This Is Test  ".strip()) # 去掉前后空格,打印：This Is Test

    # 常用 string 函数
    replace(string,old,new[,maxsplit])
        字符串的替换函数，把字符串中的old替换成new。默认是把string中所有的old值替换成new值，如果给出maxsplit值，还可控制替换的个数，如果maxsplit为1，则只替换第一个old值。
        如： a="11223344";print(string.replace(a,"1","one")) # 打印： oneone2223344
             print(string.replace(a,"1","one",1)) # 打印： one12223344
        b = "dfsdf   dfsdfsd dfsdf  ";print(a.replace(' ', '')) # 打印: dfsdfdfsdfsddfsdf

    capitalize(string)
        该函数可把字符串的首个字符替换成大字。
    如： import string; print(string.capitalize("python")) # 打印： Python

    split(string,sep=None,maxsplit=-1)
        从string字符串中返回一个列表，以sep的值为分界符。
    如： import string; ip="192.168.3.3"; print(string.split(ip,'.')) # 打印： ['192', '168', '3', '3']


控制台输入
    使用 raw_input()函数 或者 input()函数 能够很方便的控从制台读入数据，得到的是字符串。
    Python2.x时,raw_input()和 input()的区别:
        当输入为纯数字时:input()返回的是数值类型，如:int,float; raw_input()返回的是字符串类型
        input()会计算在字符串中的数字表达式，而 raw_input()不会。如输入“57+3”: input()得到整数60,raw_input()得到字符串'57+3'
    注:Python3.0将 raw_input()函数去除了,而用 input() 取代它的功能。另外,input()获取的字符串会包括结尾的换行符。
    例:(此处是Python2.6的写法，3.x时应该把 raw_input() 改成 input())
      1.输入字符串
        nID = raw_input("Input your id plz:\n"); print('your id is %s' % (nID))
      2.输入整数
        nAge = int(raw_input("input your age plz:\n")); print('your age is %d\n' % nAge)
      3.输入浮点型
        fWeight = float(raw_input("input your weight:\n")); print('your weight is %f' % fWeight)
      4.输入16进制数据
        nHex = int(raw_input('input hex value(like 0x20):\n'),16); print('nHex = %x,nOct = %d\n' %(nHex,nHex))
      5.输入8进制数据
        nOct = int(raw_input('input oct value(like 020):\n'),8); print('nOct = %o,nDec = %d\n' % (nOct,nOct))
    注:打印字符串时，“%”作为特殊符号，两个百分号才能打印出一个百分号

    Python 2 与 Python 3 的比较
       Python 2             Python 3
    ① raw_input()          input()          # 最简单的形式，raw_input()被替换成input()。
    ② raw_input('prompt')  input('prompt')  # 可以指定一个提示符作为参数
    ③ input()              eval(input())    # 如果想要请求用户输入一个Python表达式，计算结果



控制流:

if 语句
    写法: if ... elif ... else ...  # if后面不用圆括号
    注:在Python中没有switch语句。你可以使用 if..elif..else 语句来完成同样的工作(在某些场合，使用字典会更加快捷。)
    在C/C++里面可以使用 else if ,但这里不行，得写成: else :\n\t if,故此增加关键字 elif

    例:
    number = 23
    # int是一个类，不过这里它只是把一个字符串转换为一个整数(假设这个字符串含有一个有效的整数文本信息)。
    guess = int(raw_input('Enter an integer : '))

    if guess == number:
        print('Congratulations, you guessed it.')
    elif guess < number:
        print('No, it is a little higher than that') # Another block
    else:
        print('No, it is a little lower than that')


while 语句
    只要条件为真，while语句允许你重复执行一块语句。
    注:while语句有一个可选的else从句。else块事实上是多余的，因为可以把其中的语句跟在while语句里面。

    例:
    number = 23
    running = True

    while running:
        guess = int(raw_input('Enter an integer : '))

        if guess == number:
            print('Congratulations, you guessed it.')
            running = False # this causes the while loop to stop
        elif guess < number:
            print('No, it is a little higher than that')
        else:
            print('No, it is a little lower than that')
    else:
        # Do anything else you want to do here
        print('The while loop is over.')


for 循环
    for..in 是另外一个循环语句，它在一序列的对象上 递归 即逐一使用队列中的每个项目。
    else 部分是可选的。如果包含 else,它总是在 for 循环结束后执行一次，除非遇到 break 语句。

    例:
    for i in range(1, 5):
        print(i)
    else:
        print('The for loop is over')

    # 打印结果: 1 至 4 以及 else 的内容
    # range(1,5)给出序列[1, 2, 3, 4]。range默认步长为1,第三个参数是步长。如，range(1,5,2)给出[1,3]。
    # 记住，range包含第一个数,但不包含第二个数。

    注:
    Python的 for 循环从根本上不同于C/C++的 for 循环。类似 foreach 循环。
    在C/C++中，如果你想要写 for (int i = 0; i < 5; i++)，那么用Python，你写成 for i in range(0,5)。

    # 范例：九九乘法表
    # 由于Python2 与Python3的 print 语法不相同，改用string来打印，保证两个版本的输出结果相同。
    str = ''
    for i in range(1,10):
        for j in range(1, i+1):
            str += ('%d * %d = %d \t' % (j, i, i*j))
        str += '\n'
    print(str)


break 语句
    break 语句是用来 终止 循环语句的，即哪怕循环条件没有称为 False 或序列还没有被完全递归，也停止执行循环语句。
    一个重要的注释是，如果你从 for 或 while 循环中 终止 ，任何对应的循环 else 块将不执行。

continue 语句
    continue 语句被用来告诉Python跳过当前循环块中的剩余语句，然后 继续 进行下一轮循环。
    break 语句 和 continue 语句 对于 while 循环 和 for 循环 都有效。

    例(2.x写法):
    while True:
        s = raw_input('Enter something : ')
        if s == 'quit':
            break
        if len(s) < 3:
            print 'Input is not of sufficient length'
            continue
        # Do other kinds of processing here...
        print 'Length of the string is', len(s)

    例(3.x写法):
    while True:
        s = input('Enter something : ')  # 3.x用input()代替raw_input(),且会获取结尾输入的换行符
        s = s[:-1] # 去掉结尾的换行符
        if s == 'quit':
            break
        if len(s) < 3:
            print('Input is not of sufficient length')
            continue
        # Do other kinds of processing here...
        print('Length of the string is', len(s))


函数:

定义函数
    函数通过def关键字定义。
    def关键字后跟一个函数的 标识符 名称，然后跟一对圆括号。圆括号之中可以包括一些变量名，该行以冒号结尾。
    接下来是一块语句，它们是函数体。

    例:
    def sayHello():
        print('Hello World!') # block belonging to the function

    sayHello() # call the function


函数形参
    函数中的参数名称为 形参 而你提供给函数调用的值称为 实参 。

局部变量
    当你在函数定义内声明变量的时候，它们与函数外具有相同名称的其他变量没有任何关系，即变量名称对于函数来说是 局部 的。
    这称为变量的 作用域 。所有变量的作用域是它们被定义的块，从它们的名称被定义的那点开始。

    例:
    x = 50
    def func(x):
        print('x is', x)
        x = 2
        print('Changed local x to', x) # 打印: 2
    func(x)
    print('x is still', x) # 打印: 50, 值没有变


global 语句
    如果要为一个定义在函数外的变量赋值，那么你就得告诉Python这个变量名不是局部的，而是 全局 的。使用global语句完成这一功能。
    没有global语句，是不可能为定义在函数外的变量赋值的。
    你可以使用定义在函数外的变量的值(假设在函数内没有同名的变量)。然而，应避免这样做，因为这降低程序的可读性,不清楚变量在哪里定义的。
    使用global语句可以清楚地表明变量是在外面的块定义的。
    注:可以使用同一个global语句指定多个全局变量。例如 global x, y, z。

    例:
    def func():
        global x
        print('x is', x)
        x = 2
        print('Changed local x to', x)  # 打印: 2

    x = 50
    func()
    print('Value of x is', x)  # 打印: 2, 值被改变了


默认参数值
    如果希望一些参数是 可选 的，这些参数可使用默认值。
    可以在函数定义的形参名后加上赋值运算符(=)和默认值，从而给形参指定默认参数值。
    注意，默认参数值应该是一个参数。

    例:
    def say(message, times = 2):
        print(message * times)

    say('Hello ')     # 打印:Hello Hello
    say('World ', 5)  # 打印:World World World World World

    重要:
    只有在形参表末尾的那些参数可以有默认参数值，即不能在声明函数形参的时候，先声明有默认值的形参而后声明没有默认值的形参。
    这是因为赋给形参的值是根据位置而赋值的。例如，def func(a, b=5)是有效的，但是def func(a=5, b)是 无效 的。


关键参数
    如果某个函数有许多参数，而你只想指定其中的一部分，那么可以通过命名来为这些参数赋值
    ——这被称作 关键参数 ——使用名字(关键字)而不是位置来给函数指定实参。
    这样做有两个优势:
      一、由于我们不必担心参数的顺序，使用函数变得更加简单了。
      二、假设其他参数都有默认值，我们可以只给我们想要的那些参数赋值。

    例:
    def func(a, b=5, c=10):
        print('a is', a, 'and b is', b, 'and c is', c)

    func(3, 7)        # 参数a得到值3，参数b得到值7，而参数c使用默认值10。
    func(25, c=24)    # 根据实参的位置,变量a得到值25。根据命名，即关键参数，参数c得到值24。变量b根据默认值，为5。
    func(c=50, a=100) # 使用关键参数来完全指定参数值。a得到值100,c得到值50。变量b根据默认值，为5。


return 语句
    return语句用来从一个函数 返回 即跳出函数。我们也可选从函数 返回一个值 。

    例:
    def maximum(x, y):
        if x > y:
            return x
        else:
            return y

    print(maximum(2, 3)) # 打印 3


None
    None 是Python中表示没有任何东西的特殊类型(相当于java的 null)。例如，如果一个变量的值为None，可以表示它没有值。
    注意:函数没有返回值的,等价于最后返回return None。通过运行print someFunction()，你可以明白这一点。

    例:
    def someFunction():
        # pass语句在Python中表示一个空的语句块。它后面的代码会照常运行。
        pass

    print(someFunction())


DocStrings
    DocStrings:文档字符串。它是一个重要的工具，帮助你的程序文档更加简单易懂，应该尽量使用它。甚至可以在程序运行的时候，从函数恢复文档字符串！
    在函数的第一个逻辑行的字符串是这个函数的 文档字符串 。注意，DocStrings也适用于模块和类。
    文档字符串的惯例是一个多行字符串，它的首行以大写字母开始，句号结尾。第二行是空行，从第三行开始是详细的描述。 强烈建议遵循这个惯例。

    例:
    def printMax(x, y):
        '''Prints the maximum of two numbers.

        The two values must be integers.'''

        x = int(x) # convert to integers, if possible
        y = int(y)
        if x > y:
            print(x, 'is maximum')
        else:
            print(y, 'is maximum')

    printMax(3, 5)  # 打印: 5 is maximum
    print(printMax.__doc__)   # 打印: Prints the maximum ... must be integers.

    注:
    使用__doc__(注意是两个下划线)调用printMax函数的文档字符串属性。请记住Python把 每一样东西 都作为对象，包括这个函数。
    Python中help()函数即是使用DocStings的了,它只是抓取函数的__doc__属性，然后整洁地展示给你。可以对上面的函数尝试一下: help(printMax)。记住按q退出help。
    自动化工具也可以以同样的方式从你的程序中提取文档。因此强烈建议你对你所写的任何正式函数编写文档字符串。


函数属性 func_*
    在Python 2里，函数的里的代码可以访问到函数本身的特殊属性。在Python 3里，为了一致性，这些特殊属性被重新命名了。

    Python 2 与 Python 3 的比较
          Python 2                  Python 3                说明
      ① a_function.func_name      a_function.__name__     # 包含了函数的名字。
      ② a_function.func_doc       a_function.__doc__      # 包含了在函数源代码里定义的文档字符串(docstring)。
      ③ a_function.func_defaults  a_function.__defaults__ # 是一个保存参数默认值的元组。
      ④ a_function.func_dict      a_function.__dict__     # 一个支持任意函数属性的名字空间。
      ⑤ a_function.func_closure   a_function.__closure__  # 一个由cell对象组成的元组，包含了函数对自由变量(free variable)的绑定。
      ⑥ a_function.func_globals   a_function.__globals__  # 一个对模块全局名字空间的引用，函数本身在这个名字空间里被定义。
      ⑦ a_function.func_code      a_function.__code__     # 一个代码对象，表示编译后的函数体。



模块:
    如果要在其他程序中重用很多函数，那么你该使用模块。
    模块基本上就是一个包含了所有你定义的函数和变量的文件。
    为了在其他程序中重用模块，模块的文件名必须以.py为扩展名。

sys模块(标准库模块)
    sys模块包含了与Python解释器和它的环境有关的函数。

    例:
    import sys  # 输入 sys模块。基本上，这句语句告诉Python，我们想要使用这个模块。
    print('The command line arguments are:')
    # 打印调用文件的命令行参数
    for i in sys.argv:
        print(i)

    print('\nThe PYTHONPATH is', sys.path)

    输出:
    $ python using_sys.py we are arguments
    The command line arguments are:
    using_sys.py
    we
    are
    arguments

    The PYTHONPATH is ['/home/swaroop/byte/code', '/usr/lib/python23.zip',
    '/usr/lib/python2.3', '/usr/lib/python2.3/plat-linux2',
    '/usr/lib/python2.3/lib-tk', '/usr/lib/python2.3/lib-dynload',
    '/usr/lib/python2.3/site-packages', '/usr/lib/python2.3/site-packages/gtk-2.0']

    注:
    执行 import sys 语句的时候，它在 sys.path 变量中所列目录中寻找 sys.py 模块。
    如果找到了这个文件，这个模块的主块中的语句将被运行，然后这个模块将能够被你使用。
    注意，初始化过程仅在我们 第一次 输入模块的时候进行。另外，“sys”是“system”的缩写。
    脚本的名称总是sys.argv列表的第一个参数。所以，在这里，'using_sys.py'是sys.argv[0]、'we'是sys.argv[1]。

    sys.path包含输入模块的目录名列表。
    可以观察到sys.path的第一个字符串是空的——这个空的字符串表示当前目录也是sys.path的一部分，这与PYTHONPATH环境变量是相同的。
    这意味着你可以直接输入位于当前目录的模块。否则，你得把你的模块放在sys.path所列的目录之一。

    另外:
    sys.exit() # 程序结束
    sys.stdin、 sys.stdout 和 sys.stderr 分别对应你的程序的标准输入、标准输出和标准错误流。


字节编译的.pyc文件
    输入一个模块相对来说是一个比较费时的事情，所以Python做了一些技巧，以便使输入模块更加快一些。
    一种方法是创建 字节编译的文件，这些文件以.pyc作为扩展名。另外，这些字节编译的文件也是与平台无关的。
    当你在下次从别的程序输入这个模块的时候，.pyc文件是十分有用的——它会快得多，因为一部分输入模块所需的处理已经完成了。


from ... import 语句
    如果你想要直接输入 argv 变量到你的程序中(避免在每次使用它时打sys.)，那么你可以使用 from sys import argv 语句。
    如果你想要输入所有 sys 模块使用的名字，那么你可以使用 from sys import *语句。
    这对于所有模块都适用。
    注意:
        1.使用 from package import item 方式导入包时，这个子项(item)既可以是包中的一个子模块(或一个子包)，也可以是包中定义的其它命名，像函数、类或变量。
          import 语句首先核对是否包中有这个子项，如果没有，它假定这是一个模块，并尝试加载它。如果没有找到它，会引发一个 ImportError 异常。
        2.使用像 import item.subitem.subsubitem 这样的语句时，这些子项必须是包，最后的子项可以是包或模块，但不能是前面子项中定义的类、函数或变量。
        3.应该避免使用 from...import 而使用 import 语句，因为这样可以使你的程序更加易读，也可以避免名称的冲突。


import ... as
    为 import 的模块起一个简称。如: import cPickle as p
    起简称后,下面的语句即可使用简称,如原本的 cPickle.dump() 可写成 p.dump()

模块的 __name__
    每个模块都有一个名称，在模块中可以通过语句来找出模块的名称。
    这在一个场合特别有用——就如前面所提到的，当一个模块被第一次输入的时候，这个模块的主块将被运行。
    假如我们只想在程序本身被使用的时候运行主块，而在它被别的模块输入的时候不运行主块，我们该怎么做呢？这可以通过模块的__name__属性完成。
    每个Python模块都有它的__name__，如果它是'__main__'，这说明这个模块被用户单独运行，我们可以进行相应的恰当操作。

    例:
    # Filename: using_name.py
    if __name__ == '__main__':
        print('This program is being run by itself')
    else:
        print('I am being imported from another module')

    输出:
    $ python using_name.py
    This program is being run by itself

    $ python
    >>> import using_name
    I am being imported from another module


自定义模块
    每个Python程序也是一个模块。

    模块,例:
    # Filename: mymodule.py

    def sayhi():
        print('Hi, this is mymodule speaking.')

    version = '0.1'

    # End of mymodule.py

   上面是一个 模块 的例子。你已经看到，它与我们普通的Python程序相比并没有什么特别之处。
   记住这个模块应该被放置在我们输入它的程序的同一个目录中，或者在 sys.path 所列目录之一。

    用例1:
    import mymodule
    mymodule.sayhi()
    print('Version', mymodule.version)

    注:函数和成员都以点号来使用。

    用例2:  使用from..import语法的版本。
    from mymodule import sayhi, version  # 或者写: from mymodule import *

    sayhi()
    print('Version', version)


包(Packages)
    包通常是使用用“圆点模块名”的结构化模块命名空间。例如， A.B 表示名为"A" 的包中含有名为"B"的子模块。
    使用圆点模块名保存不同类库的包可以避免模块之间的命名冲突。(如同用模块来保存不同的模块架构可以避免变量之间的命名冲突)
    包目录必须要有一个 __init__.py 文件的存在；这是为了防止命名冲突而无意中在随后的模块搜索路径中覆盖了正确的模块。
    最简单的情况下， __init__.py 可以只是一个空文件，不过它也可能包含了包的初始化代码，或者设置了 __all__ 变量。


dir()函数
    使用内建的dir函数来列出模块定义的标识符。标识符有函数、类和变量。
    当你为 dir()提供一个模块名的时候，它返回模块定义的名称列表。如果不提供参数，它返回当前模块中定义的名称列表。

    $ python
    >>> import sys
    >>> dir(sys) # get list of attributes for sys module
    ['__displayhook__', '__doc__', '__excepthook__', '__name__', '__stderr__',
    '__stdin__', '__stdout__', '_getframe', 'api_version', 'argv',
    'builtin_module_names', 'byteorder', 'call_tracing', 'callstats',
    'copyright', 'displayhook', 'exc_clear', 'exc_info', 'exc_type',
    'excepthook', 'exec_prefix', 'executable', 'exit', 'getcheckinterval',
    'getdefaultencoding', 'getdlopenflags', 'getfilesystemencoding',
    'getrecursionlimit', 'getrefcount', 'hexversion', 'maxint', 'maxunicode',
    'meta_path','modules', 'path', 'path_hooks', 'path_importer_cache',
    'platform', 'prefix', 'ps1', 'ps2', 'setcheckinterval', 'setdlopenflags',
    'setprofile', 'setrecursionlimit', 'settrace', 'stderr', 'stdin', 'stdout',
    'version', 'version_info', 'warnoptions']
    >>> dir() # get list of attributes for current module
    ['__builtins__', '__doc__', '__name__', 'sys']
    >>>
    >>> a = 5 # create a new variable 'a'
    >>> dir()
    ['__builtins__', '__doc__', '__name__', 'a', 'sys']
    >>>
    >>> del a # delete/remove a name; 这个得留意
    >>>
    >>> dir()
    ['__builtins__', '__doc__', '__name__', 'sys']
    >>>


数据结构
    可以处理一些 数据 的 结构 。或者说，它们是用来存储一组相关数据的。
    在Python中有三种内建的数据结构——列表、元组和字典。

列表(list, 有的语言称为:数组)
    是处理一组有序项目的数据结构，即你可以在一个列表中存储一个 序列 的项目。
    列表中的项目应该包括在方括号中，每个项目之间用逗号分割。
    可以添加、删除或是搜索列表中的项目。列表是 可变的 数据类型。
    列表对象定义的所有方法可以通过 help(list) 获得完整的知识。我比较习惯称它为“数组”。

    例:
    shoplist = ['apple', 'mango', 'carrot', 'banana']
    #查看长度
    print('I have', len(shoplist),'items to purchase.')
    #遍历
    print('These items are:', end=' ') # 注意这行的结尾,打印时可以不换行,python 2.x应该用逗号结尾
    for item in shoplist:
        print(item, end=' ') # python 2.x 此行应该写：“print item,”

    #添加
    print('\nI also have to buy rice.')
    shoplist.append('rice')
    print('My shopping list is now:', shoplist)

    #排序
    print('I will sort my list now')
    shoplist.sort()
    print('Sorted shopping list is:', shoplist)

    #删除,以及使用下标
    print('The first item I will buy is:', shoplist[0])
    olditem = shoplist[0]
    del shoplist[0]
    print('I bought the', olditem)
    print('My shopping list is now:', shoplist)

    #多维列表时,保存的对象只是引用
    newlist = ['waa','dd']
    shoplist.append(newlist)
    print('My shopping list is now:', shoplist)
    del newlist[0]
    print('My shopping list is now', shoplist)

    # 删除重复, 用 set (对元组也可以这样写)
    L = [1,1,1,2,2]
    print(list(set(L))) # 打印：[1, 2]
    l = [(1, 2), (1, 2), 3, 5, 4, 3, 4, (1, 2), 0, 5]
    l = list(set(l))
    print(l) # 打印: [(1, 2), 0, 3, 4, 5]

    # 复制列表(浅拷贝)
    c = shoplist[:]
    # 复制(深拷贝)
    import copy
    c = copy.deepcopy(shoplist)


元组(tuple)
    元组和列表十分类似，只不过元组和字符串一样是 不可变的 即你不能修改元组。
    元组通过圆括号中用逗号分割的项目定义。
    元组通常用在使语句或用户定义的函数能够安全地采用一组值的时候，即被使用的元组的值不会改变。
    如果你想要知道元组对象定义的所有方法，可以通过 help(tuple) 获得完整的知识。

    例:
    #一维元组
    zoo = ('wolf', 'elephant', 'penguin')
    print('Number of animals in the zoo is %s' % len(zoo))  # 打印: 3

    newlist = ['waa','dd']
    #多维元组
    new_zoo = ('monkey', 'dolphin', zoo, newlist)
    print('Number of animals in the new zoo is %s' % len(new_zoo))  # 打印: 3
    print('All animals in new zoo are %s' % str(new_zoo))  # 打印: ('monkey','dolphin',('wolf','elephant','penguin'),['waa','dd'])
    print('Animals brought from old zoo are %s' % str(new_zoo[2]))  # 打印: ('wolf', 'elephant', 'penguin')
    print('Last animal brought from old zoo is %s' % new_zoo[2][2]) # 打印: penguin

    #多维元组时,保存的对象只是引用
    del newlist[0]
    print('new_zoo is now:' + str(new_zoo) )  # 打印: ('monkey','dolphin',('wolf','elephant','penguin'),['dd'])

    注意:含有0个或1个项目的元组
    一个空的元组(含有0个项目)由一对空的圆括号组成，如myempty = ()。
    含有单个元素的元组必须在第一个(唯一一个)项目后跟一个逗号。如: singleton = (2 , )。
    如果小括号里面只有唯一一个项目,而这个项目后面又没有跟一个逗号的话,Python会认为它是一个表达式。


字典(dict, 有的语言称为:json)
    字典把键(名字)和值(详细情况)联系在一起。
    注意，键必须是唯一的，且只能使用不可变的对象(比如字符串)来作为字典的键，但字典的值没有此限制。应该说只能使用简单的对象作为键。
    键值对在字典中以这样的方式标记：d = {key1 : value1, key2 : value2 }。
    键值对用冒号分割，而各个对用逗号分割，所有这些都包括在花括号中。
    记住字典中的键/值对是没有顺序的。如果要一个特定的顺序，那么应该在使用前自己对它们排序。
    字典是dict类的实例/对象，可以用 help(dict) 来查看其属性和函数。

    例:
    ab = { 'Swaroop': 'swar',
           'Larry'  : 'larry',
           'Spammer': 'spammer'
         }
    print(ab) # 打印: {'Swaroop':'swar', 'Larry':'larry', 'Spammer':'spammer'}
    print("Swaroop's address is %s" % ab['Swaroop'])  # 打印: swar

    # 添加值,或者设值
    ab['Guido'] = 'guido'

    # 删除值
    del ab['Spammer']
    # ab.pop('Spammer') # 也可以用 pop 来删除，但建议后面的这种写法，避免没有这个键时会报错： ab.pop('Spammer', None)

    print('\nThere are %d contacts in the address-book\n' % len(ab)) # 打印: 3
    # 遍历(这写法得留意)
    for name, address in ab.items():
        print('Contact %s at %s' % (name, address))

    # 包含key
    if 'Guido' in ab: # 或者写： if ab.has_key('Guido'):
        print("\nGuido's address is %s" % ab['Guido'])

    # 原字典上创建新字典
    print(ab) # 打印: {'Swaroop':'swar', 'Larry':'larry', 'Guido':'guido'}
    dd = dict(ab, slug_field='slug', test=5) # 创建新字典,字典作为参数的只能放第一个，其余不能再是字典；字典参数可省略
    print(dd) # 打印: {'Swaroop':'swar', 'test':5, 'slug_field':'slug', 'Larry':'larry', 'Guido':'guido'}

    # 建议的取值方法
    print( ab['test'] )  # 这样取值，当字典里面没有对应的key时会报错:“KeyError”
    print( ab.get('test', 'default_value') )  # get取值，当字典里面没有对应的key时可取后面的预设值,预设值是可选的(默认是 None)

    # 所有的键和值
    print(ab.keys())   # 所有的键
    print(ab.values()) # 所有的值

    # 复制(浅拷贝)
    print(ab.copy())
    # 复制(深拷贝)
    import copy
    c = copy.deepcopy(ab)


序列
    列表、元组和字符串都是序列，序列的两个主要特点是“索引”操作符和“切片”操作符。
    索引操作符让我们可以从序列中抓取一个特定项目。(即使用下标)
    切片操作符让我们能够获取序列的一个切片，即一部分序列。(即在下标的中括号里面使用冒号)

    例:
    shoplist = ['apple', 'mango', 'carrot', 'banana']

    # Indexing or 'Subscription' operation
    print('Item 0 is %s' % shoplist[0])
    print('Item 3 is %s' % shoplist[3])
    print('Item -1 is %s' % shoplist[-1])   # 打印:banana   即倒数第一个
    print('Item -2 is %s' % shoplist[-2])   # 打印:carrot   即倒数第二个

    # Slicing on a list
    print('Item 1 to 3 is %s' % shoplist[1:3])      # 打印:['mango', 'carrot']   即下标[1]到[3],包括开始但不包括结束
    print('Item 2 to end is %s' % shoplist[2:])     # 打印:['carrot', 'banana']  即下标[2]到结束,包括最后一个
    print('Item 1 to -1 is %s' % shoplist[1:-1])    # 打印:['mango', 'carrot']   即下标[1]到[-1],包括开始但不包括结束
    print('Item start to end is %s' % shoplist[:])  # 打印整个列表,跟直接写“shoplist”效果一样

    # Slicing on a string (string与列表有同样的操作,)
    name = 'swaroop'
    print('characters 1 to 3 is %s' % name[1:3])     # 打印:wa
    print('characters 2 to end is %s' % name[2:])    # 打印:aroop
    print('characters 1 to -1 is %s' % name[1:-1])   # 打印:waroo
    print('characters start to end is %s' % name[:]) # 打印:swaroop  跟直接写这个字符串一样


参考(引用)
    当你创建一个对象并给它赋一个变量的时候，这个变量仅仅 参考 那个对象，而不是表示这个对象本身！
    也就是说，变量名指向你计算机中存储那个对象的内存。
    这被称作名称到对象的绑定。

    例:
    shoplist = ['apple', 'mango', 'carrot', 'banana']
    mylist = shoplist # mylist 只是对象的另一个名称,他们指向相同的内存空间

    del shoplist[0]

    # 他们此时打印相同的内容,都少了'apple'
    print('shoplist is', shoplist)
    print('mylist is', mylist)

    # 深拷贝,复制成另一个对象(得记住用切片操作符来取得拷贝)
    mylist = shoplist[:] # make a copy by doing a full slice
    del mylist[0] # remove first item

    # 注意，现在他们打印出不同的内容
    print('shoplist is', shoplist)
    print('mylist is', mylist)


列表综合
    通过列表综合，可以从一个已有的列表导出一个新的列表。
    [返回值 for 元素 in 列表 if 条件] 比如 [num for num in xrange(100) if num%2==0] 返回0～99之间的偶数列表

    # 例如，你有一个数的列表，而你想要得到一个对应的列表，使其中所有大于2的数都是原来的2倍。对于这种应用，列表综合是最理想的方法。
    listone = [2, 3, 4]
    listtwo = [2*i for i in listone if i > 2] # 为满足条件(if i > 2)的数指定了一个操作(2*i)，从而导出一个新的列表。
    print(listtwo) # 打印: [6, 8]

    ls=[1,3,5,7] # reduce 在python3去掉了
    print(reduce(lambda x,y:x+y,ls)) # 计算过程就是 1+3=4 然后4+5得到结果9，再加7，以此类推，最后返回最终计算的结果(总和)；打印：16

    # 将字典的key，value倒过来的写法：
    a_dict = {'a': 1, 'b': 2, 'c': 3}
    # python3 的写法:
    b_dict = {value:key for key, value in a_dict.items()}
    # python2 时的写法：
    b_dict = {}
    for key, value in a_dict.iteritems():
        b_dict[value] = key
    print(b_dict) # key与value翻转，打印: {1:'a', 2:'b', 3:'c'}

    说明:
    注意原来的列表并没有发生变化。
    在很多时候，我们都是使用循环来处理列表中的每一个元素，而使用列表综合可以用一种更加精确、简洁、清楚的方法完成相同的工作。

    小心 list 的 += 操作(python2时可以用，python3不可以再这样用)


集合
    Python3 开始有这写法,跟之前的差不多,只是用大括号括起来,如： a = {1, 'aa', 3, 5, 6}
    集合同样可以使用综合计算，如： a = {x for x in range(10) if x % 2 == 0}



成员测试 in, not in
    检查是否包含有此内容,返回 True 或者 False, 例如：

    # 1.对字符串
    if 'a' in 'Swaroop':
        print('Yes, it contains the string "a"')

    # 2.对集合(列表、元组和字典)
    if 'genre' in ('genre', 'jazz'):
        print('Yes, it contains the genre')
    print('genre' in ('genre', 'jazz')) # 元组,打印： True
    print('genre' in ['genre', 'jazz']) # 列表,打印： True
    print('genre' in {'genre':'sss', 'jazz':'dddd'}) # 字典,检查key，打印： True
    print('sss' in {'genre':'sss', 'jazz':'dddd'}) # 字典,打印： False


排序
    1.sort方法
      Python语言内置了sort方法，可以很方便地对某个List进行排序
      例如：
        L = [6, 5, 1, 3, 4, 2]
        L.sort()
        print(L) # 打印：[1, 2, 3, 4, 5, 6]
        li=[(2,'a'),(4,'b'),(1,'d')]
        li.sort() # 元组列表排序
        print(li) # 打印： [(1, 'd'), (2, 'a'), (4, 'b')]

    2.自定义排序(例如，按关键词的权重排序，按人的年龄排序，等等)
      若List中每个元素都是2-tuple，tuple中第一个元素为String类型的keyword，第二个元素为该字符串对应的权重(int类型)，希望按照权重排序(从高到低)，则可以这样：

        L = [('b', 1), ('a', 0), ('c', 2), ('d', 3)]
        # L.sort(lambda E1, E2: -cmp(E1[1], E2[1])) # cmp函数里面是需比较的两个值，负号表示倒序。(python2 的写法)
        L.sort(key=lambda d:-d[1]) # Python3的写法，由于去掉了cmp()函数,得传入key参数； python2也可以这样用；负号表示倒序
        print(L) # 打印：[('d', 3), ('c', 2), ('b', 1), ('a', 0)]

    3.dict排序
      对字典的排序，因为每一个项包括一个键值对，所以要选择可比较的键或值进行排序
        sorted(iterable[, cmp[, key[, reverse]]])
        # cmp 和 key 一般使用 lambda
        如：

        d={"ok":1,"no":2}
        # 对字典按键排序，用元组列表的形式返回
        print(sorted(d.items(), key=lambda a:a[0])) # 打印： [('no', 2), ('ok', 1)]
        print(sorted(d)) # 打印：['no', 'ok']
        print(d) # 原字典并未改变，打印：{'ok':1, 'no':2}
        # 对字典按值排序，用元组列表的形式返回
        print(sorted(d.items(), key=lambda d:d[1])) # 打印：[('ok', 1), ('no', 2)]

        # 排序后再转成字典，就无法再保证排序了
        b = sorted(d.items(), key=lambda v:v[0])
        print(b) # 打印： [('no', 2), ('ok', 1)]
        print(dict(b)) # (排序又乱了)打印： {'ok': 1, 'no': 2}


    4.类的排序
        class test:
            def __init__(self,a,b):
                self.a = a
                self.b = b

        test1 = test(5,25)
        test2 = test(50,35)
        test3 = test(10,15)
        tests = [test1, test2, test3]

        # 以 cmp 来指定排序方式, python3不可以这样写(没有cmp参数及cmp函数)
        result = sorted(tests,cmp = lambda x,y: cmp(x.a, y.a))
        # 遍历排序结果，结果是已排序的： a:5  a:10  a:50
        for item in result:
            print("a:%s" % item.a)

        # 以 key 来排序，结果也是可以的
        result2 = sorted(tests,key = lambda d:d.a)
        for item in result2:
            print("a:%s" % item.a)

        # 遍历原资料，原资料的顺序没有改变
        for item in tests:
            print("a:%s" % item.a)

    5.注意：
      python3 由于去掉了 cmp() 函数，可以用“(a > b) - (a < b)”代替“ cmp(a, b) ”

    6.冒泡算法，如下：
        num = [23,2,3,6,18,9,33,13,24,19]
        for i in range(len(num)-1):
            for j in range(len(num)-i-1):
                if (num[j] > num[j+1]):
                    num[j], num[j+1] = num[j+1], num[j] # 置换，这样写比较简便，不需再用临时变量
        print(num)


综合实例：
﻿    在Python中对列表，元组，字典等内置的数据结构的处理是很方便的事情，python借鉴了Lisp中的很多函数式计算的方法来处理列表，可以极大的简化我们的代码。
    1. set():  将元组，列表 转化成没有重复项的集合
    2. list(): 将集合，元组转化成列表
    3. tuple(): 将集合，列表转化成元组

    4. map(func,list):将list的每一个元素传递给func的函数，这个函数有一个参数，且返回一个值，map将每一次调用函数返回的值组成一个新列表返回
    5. filter(func,list):将list的每一个元素传递给func的函数，这个函数有一个参数，返回bool类型的值，filter将返回True的元素组成新列表返回
    6. reduce(func,list):将list的元素，挨个取出来和下一个元素通过func计算后将结果和再下一个元素继续计算


    一、列表去重
        ls = [1,3,2,5,2,1,3,4,6]
        ls = list(set(ls)) # 最简单的列表去除重复

        L = [1, 8, 3, 4, 6, 2, 3, 4, 5]
        kk = [x for x in L if x not in locals()['_[1]']] # 保留原顺序的去除重复,只有 2.6 上可以, 2.7 以上版本不能这样写
        # '_[1]' 是个内部临时变量，可查看:  [x for x, y in locals().items()]


    二、假如有列表：
        books = [
            {"name":"C#从入门到精通",  "price":23.7,  "store":"卓越"},
            {"name":"ASP.NET高级编程", "price":44.5,  "store":"卓越"},
            {"name":"C#从入门到精通",  "price":24.7,  "store":"当当"},
            {"name":"ASP.NET高级编程", "price":45.7,  "store":"当当"},
            {"name":"C#从入门到精通",  "price":26.7,  "store":"新华书店"},
            {"name":"ASP.NET高级编程", "price":55.7,  "store":"新华书店"},
        ]

        2.1 求《ASP.NET高级编程》价格最便宜的店：
        storename=min([b for b in books if b['name']=="ASP.NET高级编程"],key=lambda b:b['price'])["store"]
        过程：先用列表解析取出《ASP.NET高级编程》的列表，通过min函数，比较字典的price键获取price最小的项


        2.2 求在新华书店购买两本书一样一本要花的钱：
        price=sum([b['price'] for b in books if b['store']=="新华书店"])


        2.3 求列表中有那几本书：
        booknames=list(set([b['name'] for b in books]))


        2.4 列表里的书都打5折：
        books=map(lambda b:dict(name=b['name'],price=b['price']*0.5,store=b['store']),books)


        2.5 《C#从入门到精通》的平均价格：
        avg=(lambda ls:sum(ls)/len(ls))([b['price'] for b in books if b['name']=="C#从入门到精通"])


        2.6 求每本书的平均价格：
        book_avg=map(lambda bookname:dict(name=bookname,avg=(lambda ls:sum(ls)/len(ls))([b['price'] for b in books if b['name']==bookname])),list(set([b['name'] for b in books])))

        这段代码放在一行比较难看懂，但是格式化一下就很好懂了，构建的过程如下：

            step1: 要求每本书的平均价格，首先要得到共有几本书，方法见2.3，得到去重的书名列表
            list(set([b['name'] for b in books])) #去重后的书名列表

            step2: 要求每一本书的均价，需要将计算均价的函数映射到每一本书上，于是
            map(
                #计算均价的函数，
                list(set([b['name'] for b in books])) #去重后的书名列表
            )

            step3: 加入计算单本书均价的函数，参考2.5的方法，由于只用一行，所以用lambda来搞定：
            func=lambda bookname:(lambda ls:sum(ls)/len(ls))([b.price for b in books if b['name']==bookname])

            step4: 将计算单本均价的lambda函数加入map中，得到最终结果：
            经过格式化后的结果，前面的单行代码可以格式化为下面容易阅读的形式
            book_avg=map(
                lambda bookname:
                    dict(
                        name = bookname,
                        # 计算单本书均价的函数
                        avg  = (lambda ls:sum(ls)/len(ls)) ([b['price'] for b in books if b['name']==bookname])
                    ),
                #去重后的书名列表
                list(
                     set(
                         [b['name'] for b in books]
                     )
                )
            )


在函数中接收元组和列表(函数的参数数量可以变动,即可变长参数)
    当要使函数接收元组或字典形式的参数的时候，有一种特殊的方法，它分别使用*和**前缀。
    这种方法在函数需要获取可变数量的参数的时候特别有用。
    而且，使用*和**前缀的参数还可以传递给其它函数。

    例:
    # 由于在args变量前有*前缀，所有多余的函数参数都会作为一个元组存储在args中
    def sum(message, *args):
        '''Return the sum of each argument.'''
        total = 0
        # 除了用循环,也可以用下标来读取参数,如: args[0]
        for i in args:
            total += i
        print (str(type(args)) + '  ' + message + ":" + str(total))
        sum2(args) # 这样传过去的 args 是一个元组；打印如： ((3, 5.5),)
        sum2(*args) # 这样传过去的 *args 表示多个参数；打印如：(3, 5.5)

    def sum2(*args):
        print(args)

    sum('hight', 3, 5.5) # 打印: <type 'tuple'>  hight:8.5
    sum('weight', 10)    # 打印: <type 'tuple'>  weight:10


    # 函数参数接收字典用法。使用的是**前缀，多余的参数则会被认为是一个字典的键/值对。
    def printDict(message, **args):
        print(str(type(args)) + '  ' + message + ':' + str(args))
        printDict2(args = args) # 可这样，把 args 当做一个值(里面是字典)，传过去；打印如: {'args': {'a': 3, 'b': 'dd'}}
        printDict2(**args) # 也可这样，把 **args 看做传过来的多个键/值对，传过去；打印如：{'a': 3, 'b': 'dd'}

    def printDict2(**args):
        print(args)

    # 注意:参数为字典时,参数里面必须使用等号,否则运行出错
    printDict('hight', a=3, b='dd') # 打印: <type 'dict'>  hight:{'a': 3, 'b': 'dd'}


    # 可以混合使用*和**前缀的参数, 但是必须 *args 在前, **args 在后,否则编译不通过
    def printMul(message, *args1, **args2):
        print(message + '  args1:' + str(args1) + '  args2:' + str(args2))

    printMul('hello', 5, 4, a=2, b=3) # 打印： hello  args1:(5, 4)  args2:{'a': 2, 'b': 3}


面向对象的编程
    面向过程的编程:根据操作数据的函数或语句块来设计程序的。
    面向对象的编程:把数据和功能结合起来，用称为对象的东西包裹起来组织程序的方法。
    类和对象是面向对象编程的两个主要方面。“类”创建一个新类型，而“对象”是这个类的实例。
    域:属于一个对象或类的变量。
    方法:属于类的函数，被称为类的方法。
    域和方法可以合称为类的属性。
    域有两种类型——属于每个实例/类的对象或属于类本身。它们分别被称为实例变量和类变量。
    类使用class关键字创建。类的域和方法被列在一个缩进块中。

self 参数
    类的方法与普通的函数只有一个特别的区别——它们“必须”有一个额外的第一个参数名称，但是在调用这个方法的时候你不为这个参数赋值，Python会提供这个值。这个特别的变量指对象本身，按照惯例它的名称是self。
    虽然你可以给这个参数任何名称，但是“强烈建议”使用self这个名称——其他名称都是不赞成使用的。
    使用一个标准的名称有很多优点——1.方便别人阅读；2.有些IDE(集成开发环境)也可以帮助你。
    Python中的self等价于C++中的self指针和Java、C#中的this参考。

    例:
    class Person:
        def sayHi(self):  # self参数必须写
            print('Hello, how are you?')

    p = Person()
    p.sayHi() # self参数不需赋值
    print(p)  # 打印: <__main__.Person instance at 0xf6fcb18c>   (已经在__main__模块中有了一个Person类的实例)


类的变量和对象的变量
    类的变量: 由一个类的所有对象(实例)共享使用。当某个对象对类的变量做了改动的时候，这个改动会反映到所有其他的实例上。
    对象的变量: 由类的每个对象/实例拥有。它们不是共享的，在同一个类的不同实例中，虽然对象的变量有相同的名称，但是是互不相关的。
    使用的数据成员名称以“双下划线前缀”且不是双下划线后缀,比如__privatevar，Python的名称管理体系会有效地把它作为私有变量。
    惯例: 如果某个变量只想在类或对象中使用，就应该以单下划线前缀。而其他的名称都将作为公共的，可以被其他类/对象使用。

    例:
    class Person:
        '''Represents a person.'''
        population = 0 # 类的变量

        def __init__(self, name):
            '''Initializes the person's data.'''
            # 每创建一个对象都增加1
            Person.population += 1 # 调用类的变量,必须用 类名.变量名,如果写 self.变量名 则是对象的变量了
            self.name = name # 对象的变量,每个对象独立的
            print('(Initializing %s) We have %d persons here.' % (self.name, Person.population))

        def __del__(self):
            '''I am dying.'''
            print('%s says bye.' % self.name)
            Person.population -= 1

        def sayHi(self):
            self.__sayHi2() # 调用私有方法,外部不能调用的

        # 以双下划线开头(但没有双下划线结尾),则变成私有,仅供内部调用
        def __sayHi2(self): # 使用 self.population 也可以读取类的变量,只是改变的时候却只改变对象的变量
            print('Hi, my name is %s. We have %d persons here.' % (self.name, self.population))

    swaroop = Person('Swaroop')
    swaroop.sayHi() # 打印: Swaroop, 1

    kalam = Person('Abdul Kalam')
    kalam.sayHi() # 打印: Abdul Kalam, 2

    swaroop.sayHi() # 打印: Swaroop, 2
    print(Person.population) # 打印: 2
    del swaroop # 调用对象的 __del__ 方法
    print(Person.population) # 打印: 1

    print(Person.__doc__) # 打印类的docstring
    print(Person.__init__.__doc__) # 打印类的方法的docstring


继承
    多态现象:一个子类型在任何需要父类型的场合可以被替换成父类型，即对象可以被视作是父类的实例。
    被继承的类被称为“基本类”或“超类”、“父类”。继承的类被称为“导出类”或“子类”。

    例:
    # 父类
    class Member:
        def __init__(self, name, age):
            self.name = name
            self.age = age
            print('(Initialized Member: %s)' % self.name)

        def tell(self):
            print('Member Name:"%s" Age:"%s"' % (self.name, self.age))

        def tell2(self):
            print('Member haha...')

    # 子类
    class Student(Member): # 继承的父类写括号里面;多继承则写多个,这括号的称为继承元组
        def __init__(self, name, age, marks):
            Member.__init__(self, name, age) # 父类的初始化,需手动写；Python不会自动调用父类的constructor
            self.marks = marks
            print('(Initialized Student: %s)' % self.name)

        def tell(self):
            Member.tell(self) # 调用父类的方法,注意:方法调用之前要加上父类名称前缀，然后把self变量及其他参数传递给它。
            print('Marks: "%d"' % self.marks)

    s = Student('Swaroop', 22, 75)
    s.tell() # 会调用子类的方法
    s.tell2() # 子类没有的，则使用父类的；如果多继承,且父类都有这个方法,则使用继承元组中排前面的


特殊的方法
__init__ 方法
    __init__ 方法在类的一个对象被建立时，马上运行。用来对你的对象做初始化。
    注意，这个名称的开始和结尾都是双下划线。( __init__ 方法类似于C++、C#和Java中的 constructor )

    例:
    class Person:
        def __init__(self, name):
            self.test_name = name
        def sayHi(self):
            print('Hello, my name is ' + self.test_name)
            self.test = 'sss'  # 属性可以随处定义,不需事先定义
            print('the test is ' + self.test)

    p = Person('Swaroop')
    p.sayHi() # 打印: Swaroop , sss
    print('the Person test is ' + p.test) # 打印: sss
    p.test2 = 'haha...'
    print('the Person test2 is ' + p.test2) # 打印: haha...

    名称   说明
    __init__(self,...) 这个方法在新建对象恰好要被返回使用之前被调用。
    __del__(self) 在对象要被删除之前调用。如使用 del 删除时。
    __str__(self) 在我们对对象使用 print 语句或是使用 str() 的时候调用。
    __lt__(self,other) 当使用 小于 运算符 (<) 的时候调用。
    __gt__(self,other) 当使用 大于 运算符 (>) 的时候调用。
    __eq__(self,other) 当使用 等于 运算符 (==) 的时候调用。
    __ne__(self,other) 当使用 不等于 运算符 (!=) 的时候调用。
    __le__(self,other) 当使用 小于等于 运算符 (<=) 的时候调用。
    __ge__(self,other) 当使用 大于等于 运算符 (>=) 的时候调用。
    __add__(self,other)当使用 加 运算符 (+) 的时候调用。
    __getitem__(self,key) 使用x[key]索引操作符的时候调用。
    __len__(self) 对序列对象使用内建的 len() 函数的时候调用。


try ... except (处理异常)
    使用 try ... except 语句来处理异常。
    except 从句可以专门处理单一的错误或异常，或者一组包括在圆括号内的错误/异常。没有给出错误或异常的名称，则处理所有的错误和异常。
    如果某个错误或异常没有被处理，默认的Python处理器就会被调用。它会终止程序的运行，并且打印一个消息。
    还可以关联上一个 else 从句,当没有异常发生的时候执行。

    常见异常(可避免的):
        使用不存在的字典关键字 将引发 KeyError 异常。
        搜索列表中不存在的值 将引发 ValueError 异常。
        调用不存在的方法 将引发 AttributeError 异常。
        引用不存在的变量 将引发 NameError 异常。
        未强制转换就混用数据类型 将引发 TypeError 异常。
        导入一个并不存在的模块将引发一个 ImportError 异常。

try ... finally
    假如希望在无论异常发生与否的情况下都执行一段代码,可以使用 finally 块来完成。
    注意，在一个 try 块下，你可以同时使用 except 从句和 finally 块。
    如果在 finally 前面的 try 或者 except, else 等里面有 return 语句,会先跳去执行 finally 再执行 return

raise 语句
    可以使用 raise 语句引发异常(抛出异常)。你还得指明错误/异常的名称和伴随异常触发的异常对象。
    可以引发 Error 或 Exception 类的直接或间接导出类。

    在Python 3里，抛出自定义异常的语法有细微的变化。
        Python 2                                        Python 3
    ① raise MyException                                MyException
    ② raise MyException, 'error message'               raise MyException('error message')
    ③ raise MyException, 'error message', a_traceback  raise MyException('error message').with_traceback(a_traceback)
    ④ raise 'error message'                            unsupported(不支持)
    说明:
    ① 抛出不带自定义错误信息的异常，这种最简单的形式下，语法没有改变。
    ② 抛出带自定义错误信息的异常时:Python 2用一个逗号来分隔异常类和错误信息；Python 3把错误信息作为参数传递给异常类。
    ③ 抛出一个带用户自定义回溯(stack trace,堆栈追踪)的异常。在Python 2和3里这语法完全不同。
    ④ 在Python 2里，可以仅仅抛出一个异常信息。在Python 3里，这种形式不再被支持。2to3将会警告你它不能自动修复这种语法。

    例：
    raise RuntimeError("有异常发生")


生成器的 throw 方法
    在Python 2里，生成器有一个 throw()方法。
    调用 a_generator.throw()会在生成器被暂停的时候抛出一个异常，然后返回由生成器函数获取的下一个值。

       Python 2                                         Python 3
    ① a_generator.throw(MyException)                   a_generator.throw(MyException) # 没有变化
    ② a_generator.throw(MyException, 'error message')  a_generator.throw(MyException('error message'))
    ③ a_generator.throw('error message')               unsupported(不支持)
    说明:
    ① 最简单的形式下，生成器抛出不带用户自定义错误信息的异常。这种情况下，从Python 2到Python 3语法上没有变化 。
    ② 如果生成器抛出一个带用户自定义错误信息的异常，你需要将这个错误信息字符串(error string)传递给异常类来以实例化它。
    ③ Python 2还支持抛出只有异常信息的异常。Python 3不支持这种语法，并且2to3会显示一个警告信息，告诉你需要手动地来修复这处代码。

    例(3.x)语法:
    # 定义一个异常类,继承 Exception
    class ShortInputException(Exception):
        '''A user-defined exception class.'''
        def __init__(self, length, atleast):
            Exception.__init__(self)
            self.length = length
            self.atleast = atleast

    try:
        s = input('Enter something --> ') # Python 2 的输入是 raw_input()
        if len(s) < 3:
            raise ShortInputException(len(s), 3) # 引发异常;Python 2可以写：raise ShortInputException,(len(s), 3)
    # 捕获 EOFError 异常
    except EOFError:
        print('\nWhy did you do an EOF on me?')
    # 捕获一组错误/异常,Python 2 时应该写: “except (RuntimeError, ImportError), e:”
    except (RuntimeError, ImportError) as e:
        pass
    # Python 2 时应该写: “except ShortInputException, x:”
    except ShortInputException as x:
        print('ShortInputException: The input was of length %d,\
              was expecting at least %d' % (x.length, x.atleast))
    # 捕获所有异常
    except:
        print('\nWhy did you do an Exception on me?')
    # 没有任何异常时执行
    else:
        print('No exception was raised.')
    # 不管是否有异常,都会执行
    finally:
        print('finally .....')



lambda 形式
    lambda 语句被用来创建新的函数对象，并且在运行时返回它们。
    注意, lambda 形式中，只能使用表达式。

    例:
    def make_repeater(n):
        return lambda s: s*n    # 注意: lambda 返回的是函数,而不是表达式的值

    # 注意, twice 接收的是函数, 而不是表达式的值, 所以 twice 是一个函数,而不是值
    twice = make_repeater(2)
    print(twice('word '))       # 因为 twice 是一个函数,这里是调用这个函数,打印结果: word word

    print(make_repeater(3)(5))  # 这里的“make_repeater(3)”可以认为是匿名函数,打印结果: 15


    # 上面例子貌似太过复杂,下面是简单点的写法
    # 记住, twice2 是一个函数
    twice2 = lambda s: s*2

    print(twice2('word '))  # 打印: word word
    print(twice2(5))        # 打印: 10

    # 上面的 twice2 相当于正常的函数这样写(lambda 后面的是参数，而结果是返回冒号后面的表达式)：
    def twice3(s):
        return s*2

    print(twice3('word '))  # 打印: word word
    print(twice3(5))        # 打印: 10


    # 可认为 lambda 是一个匿名函数
    print((lambda s: s*2)('word '))  # 打印: word word

    # 而 def 是不能申明匿名函数的
    print((def (s): return s*2)(10)) # 这写法将会报错
    print((def twice3(s): return s*2)(10)) # 这写法也同样会报错


    # lambda 可以有多个参数
    twice4 = lambda x,y: x*y
    print(twice4('word ', 3))  # 打印: word word word
    print(twice4(5, 3))        # 打印: 15


exec 和 eval
    exec 用来执行储存在字符串或文件中的Python语句。
    eval 用来计算存储在字符串中的有效Python表达式。
    exec 跟 eval 是相似的，但是 exec 更加强大并更具有技巧性。
    eval 只能执行单独一条表达式；但是 exec 能够执行多条语句，导入(import)，函数声明
    实际上 exec 能执行整个Python程序的字符串。

    Python 2 与 Python 3 的比较
            Python 2                                              Python 3
        ① exec codeString                                       exec(codeString)
        ② exec codeString in global_namespace                   exec(codeString, global_namespace)
        ③ exec codeString in global_namespace, local_namespace  exec(codeString, global_namespace, local_namespace)
    说明:
        ① 就像 print 语句在Python 3里变成了一个函数一样, exec 语句在Python 3里也变成一个函数。
        ② exec 可以指定名字空间，代码将在这个由全局对象组成的私有空间里执行。
        ③ exec 还可以指定一个本地名字空间(比如一个函数里声明的变量)。

    例：
    exec('print("Hello World")')  # 执行打印语句
    print(eval('2*3'))  # 打印：6


execfile 语句
    Python 2里的 execfile 语句也可以像执行Python代码那样使用字符串。不同的是 exec 使用字符串，而 execfile 则使用文件。
    在Python 3里,execfile 语句已经被去掉了。如果你真的想要执行一个文件里的Python代码(但是你不想导入它)，你可以通过打开这个文件，读取它的内容，然后调用 compile()全局函数强制Python解释器编译代码，然后调用 exec() 函数。

    Python 2 写的： execfile('a_filename')
    Python 3 写的： exec(compile(open('a_filename', 'rb').read(), 'a_filename', 'exec'))


assert 语句
    assert 语句用来声明某个条件是真的。
    当 assert 语句失败的时候，会引发一个 AssertionError 错误。
    比较常用于检验错误。

    例:
    assert 2 >= 1  # 正常运行
    assert 0 >= 1  # 出现错误


repr 函数
    repr 函数用来取得对象的规范字符串表示。反引号(也称转换符)可以完成相同的功能。
    注意，在大多数时候有 eval(repr(object)) == object。
    基本上, repr 函数和反引号用来获取对象的可打印的表示形式。
    你可以通过定义类的 __repr__ 方法来控制你的对象在被repr函数调用的时候返回的内容。

    例：
    i = ["item"]
    print(repr(i)) # 打印：['item']


yield 用法
    1) 包含 yield 的函数是一个 Generator, 与平常的函数不同

    例：
        def gen():
            print 'enter'
            yield 1
            print 'next'
            yield 2
            print 'next end'

        print('begin...')
        gen() # 直接调用,发现打印没有执行(与平常的函数不同)
        # 从容器里拿到 iterator 的时候它还什么也不是，处在容器入口处，对于数组来说就是下标为-1的地方，对于函数来说就是函数入口嘛事没干，但是万事俱备就欠 next 。
        print('end...')

        print
        for i in gen():
            print('...%d...' % i)

        # 开始 for in , next 让 itreator 爬行到 yield 语句存在的地方并返回值,
        # 再次 next 就再爬到下一个 yield 语句存在的地方并返回值,依次这样直到函数返回(容器尽头)。

    上面代码的输出是：
        begin...
        end...

        enter
        ...1...
        next
        ...2...
        next end


    2) Generator 里面的 send(msg) 与 next()
        调用 for in 时，相当于是使用 next() 语句或是 send(None)
        如果没有接收值则使用 send 发送的值必须是 None ，否则会出错的，因为 yield 语句没有接收这个值，但 send 又必须传参数的。

    例，用上例的 gen() 函数
        c = gen()
        print(c.next()) # 调用第一个 yield
        print(c.send(None)) # 调用第二个 yield, 这里 next() 与 send(None) 是同样效果的
        print(c.next()) # 第三次调用则出错了，因为数组下标越界, 抛出 StopIteration 的异常； 但会把最后的“next end”打印出来，前两个是没法把它打印出来的


        # send(msg) 貌似没法把 msg 传到参数中
        def gen2(m):
            for i in range(10):
                print(m)
                yield i + 101

        d = gen2('***')
        print(c.next())
        print(c.send(5555)) # 打印的依然是 ***, 而不是 5555


    3) throw() 与 close() 中断 Generator
        中断 Generator 是一个非常灵活的技巧，可以通过 throw 抛出一个 GeneratorExit 异常来终止 Generator 。 Close() 方法作用是一样的，其实内部它是调用了 throw(GeneratorExit) 的。我们看：

        def close(self):
            try:
                self.throw(GeneratorExit)
            except (GeneratorExit, StopIteration):
                pass
            else:
                raise RuntimeError("generator ignored GeneratorExit")  # Other exceptions are not caught

    因此，当我们调用了 close() 方法后，再调用 next() 或是 send(msg) 的话会抛出一个异常
    例，继续用前面例的 gen() 函数
        c = gen()
        print(c.next()) # 调用第一个 yield
        c.close()
        print(c.next()) # 调用第二个 yield 出错了，抛出 StopIteration 的异常, 因为前面的 close 已经关闭它了



正则表达式
    正则表达式有强大并且标准化的方法来处理字符串查找、替换以及用复杂模式来解析文本。
    正则表达式的语法比程序代码更紧凑，格式更严格，比用组合调用字符串处理函数的方法更具有可读性。
    还可以在正则表达式中嵌入注释信息，这样就可以使它有自文档化的功能。

    匹配符：
        ^       匹配字符串开始位置。在多行字符串模式匹配每一行的开头。
        $       匹配字符串结束位置。在多行字符串模式匹配每一行的结尾。
        .       匹配除了换行符外的任何字符，在 alternate 模式(re.DOTALL)下它甚至可以匹配换行。
        \A      匹配字符串开头
        \Z      匹配字符串结尾
        \b      匹配一个单词边界。即 \w 与 \W 之间。
        \B      匹配一个非单词边界；相当于类 [^\b]。
        \d      匹配一个数字。
        \D      匹配一个任意的非数字字符。
        \s      匹配任何空白字符；它相当于类  [ \t\n\r\f\v]。
        \S      匹配任何非空白字符；它相当于类 [^ \t\n\r\f\v]。
        \w      匹配任何字母数字字符；它相当于类 [a-zA-Z0-9_]。
        \W      匹配任何非字母数字字符；它相当于类 [^a-zA-Z0-9_]。
        x?      匹配可选的x字符。即是0个或者1个x字符。
        x*      匹配0个或更多的x。
        x+      匹配1个或者更多x。
        x{n,m}  匹配n到m个x，至少n个，不能超过m个。
        (a|b|c) 匹配单独的任意一个a或者b或者c。
        (x)     捕获组，小括号括起来即可，它会记忆它匹配到的字符串。
                可以用 re.search() 返回的匹配对象的 groups()函数来获取到匹配的值。
        \1      记忆组，它表示记住的第一个分组；如果有超过一个的记忆分组，可以使用 \2 和 \3 等等。
                记忆组的内容也要小括号括起来。
        (?iLmsux)          iLmsux的每个字符代表一种匹配模式
            re.I(re.IGNORECASE): 忽略大小写(括号内是完整写法，下同)
            re.M(re.MULTILINE): 多行模式，改变'^'和'$'的行为(参见上图)
            re.S(re.DOTALL): 点任意匹配模式，改变'.'的行为
            re.L(re.LOCALE): 使预定字符类 \w \W \b \B \s \S 取决于当前区域设定
            re.U(re.UNICODE): 使预定字符类 \w \W \b \B \s \S \d \D 取决于unicode定义的字符属性
            re.X(re.VERBOSE): 松散正则表达式模式。这个模式下正则表达式可以是多行，忽略空白字符，并可以加入注释。
        (?:表达式)         无捕获组。与捕获组表现一样，只是没有内容。
        (?P<name>表达式)   命名组。与记忆组一样，只是多了个名称。
        (?P=name)          命名组的逆向引用。
        (?#...)            “#”后面的将会作为注释而忽略掉。例如：“ab(?#comment)cd”匹配“abcd”
        (?=...)            之后的字符串需要匹配表达式才能成功匹配。不消耗字符串内容。 例：“a(?=\d)”匹配“a12”中的“a”
        (?!...)            之后的字符串需要不匹配表达式才能成功匹配。不消耗字符串内容。 例：“a(?!\d)”匹配“abc”中的“a”
        (?<=...)           之前的字符串需要匹配表达式才能成功匹配。不消耗字符串内容。 例：“(?<=\d)a”匹配“2a”中的“a”
        (?<!...)           之前的字符串需要不匹配表达式才能成功匹配。不消耗字符串内容。 例：“(?<!\d)a”匹配“sa”中的“a”
                           注：上面4个表达式的里面匹配的内容只能是一个字符，多个则报错。
        (?(id/name)yes-pattern|no-pattern)  如果编号为 id 或者别名为 name 的组匹配到字符串，则需要匹配yes-pattern，否则需要匹配no-pattern。 “|no-pattern”可以省略。如：“(\d)ab(?(1)\d|c)”匹配到“1ab2”和“abc”

    元字符:
        "[" 和 "]"
            它们常用来匹配一个字符集。字符可以单个列出，也可以用“-”号分隔的两个给定字符来表示一个字符区间。
                例如，[abc] 将匹配"a", "b", 或 "c"中的任意一个字符；也可以用区间[a-c]来表示同一字符集，和前者效果一致。
            元字符在类别里并不起作用。例如，[a$]将匹配字符"a" 或 "$" 中的任意一个；"$" 在这里恢复成普通字符。
            也可以用补集来匹配不在区间范围内的字符。其做法是把"^"作为类别的首个字符；其它地方的"^"只会简单匹配 "^"字符本身。
                例如，[^5] 将匹配除 "5" 之外的任意字符。
            特殊字符都可以包含在一个字符类中。如，[\s,.]字符类将匹配任何空白字符或","或"."。
        反斜杠 "\"。
            做为 Python 中的字符串字母，反斜杠后面可以加不同的字符以表示不同特殊意义。
            它也可以用于取消所有的元字符，这样你就可以在模式中匹配它们了。
                例如，需要匹配字符 "[" 或 "\"，可以在它们之前用反斜杠来取消它们的特殊意义： \[ 或 \\。

    建议使用原始字符串:
        建议在处理正则表达式的时候总是使用原始字符串。如： r'\bROAD$', 而不要写成 '\\bROAD$'
        否则，会因为理解正则表达式而消耗大量时间(正则表达式本身就已经够让人困惑的了)。

    无捕获组:
        有时你想用一个组去收集正则表达式的一部分，但又对组的内容不感兴趣。你可以用一个无捕获组“(?:...)”来实现这项功能。
        除了捕获匹配组的内容之外，无捕获组与捕获组表现完全一样；可以在其中放置任何字符、匹配符，可以在其他组(无捕获组与捕获组)中嵌套它。
        无捕获组对于修改已有组尤其有用，因为可以不用改变所有其他组号的情况下添加一个新组。
        捕获组和无捕获组在搜索效率方面也一样。

    命名组:
        与用数字指定组不同的是，它可以用名字来指定。除了该组有个名字之外，命名组也同捕获组是相同的。
        (?P<name>...) 定义一个命名组，(?P=name) 则是对命名组的逆向引用。
        MatchObject 的方法处理捕获组时接受的要么是表示组号的整数，要么是包含组名的字符串。所以命名组可以通过数字或者名称两种方式来得到一个组的信息。

    松散正则表达式:
        为了方便阅读和维护，可以使用松散正则表达式，它与普通紧凑的正则表达式有两点不同：
        1, 空白符被忽略。空格、制表符(tab)和回车会被忽略。如果需要匹配他们，可以在前面加一个“\”来转义。
        2, 注释被忽略。注释以“#”开头直到行尾，与python代码中的一样。
        使用松散正则表达式，需要传递一个叫 re.VERBOSE的 参数。详细见下面例子。

    例如:

        # 必须引入 re 标准库
        import re

        # 字符串替换:  sub() 与 subn()
        s = '100 NORTH MAIN ROAD'
        # 将字符串结尾的单词“ROAD”替换成“RD.”；该 re.sub() 函数执行基于正则表达式的字符串替换。
        print(re.sub(r'\bROAD$', 'RD.', s)) # 打印： 100 NORTH MAIN RD.
        ## subn() 与 sub() 作用一样，但返回的是包含新字符串和替换执行次数的两元组。
        print(re.subn(r'\bROAD$', 'RD.', s)) # 打印： ('100 NORTH MAIN RD.', 1)

        # 字符串分割, split()
        # 在正则表达式匹配的地方将字符串分片，将返回列表。只支持空白符和固定字符串。可指定最大分割次数，不指定将全部分割。
        print(re.split(r'\s+', 'this is a test')) # 打印： ['this', 'is', 'a', 'test']
        print(re.split(r'\W+', 'This is a test.', 2)) # 指定分割次数,打印：['this', 'is', 'a test']
        # 如果你不仅对定界符之间的文本感兴趣，也需要知道定界符是什么。在 RE 中使用捕获括号，就会同时传回他们的值。
        print(re.split(r'(\W+)', 'This is a test.', 2)) # 捕获定界符,打印：['this', ' ', 'is', ' ', 'a test']

        ## `MatchObject` 实例的几个方法
        r = re.search(r'\bR(OA)(D)\b', s)
        print(r.groups()) # 返回一个包含字符串的元组,可用下标取元组的内容，打印： ('OA', 'D')
        print(r.group())  # 返回正则表达式匹配的字符串，打印： ROAD
        print(r.group(2)) # 返回捕获组对应的内容(用数字指明第几个捕获组)，打印： D
        print(r.start())  # 返回匹配字符串开始的索引, 打印： 15
        print(r.end())    # 返回匹配字符串结束的索引，打印： 19
        print(r.span())   # 返回一个元组包含匹配字符串 (开始,结束) 的索引，打印： (15, 19)

        # 匹配多个内容, findall() 返回一个匹配字符串行表
        p = re.compile('\d+')
        s0 = '12 drummers drumming, 11 pipers piping, 10 lords a-leaping'
        print(p.findall(s0)) # 打印： [12, 11, 10]
        print(re.findall(r'\d+', s0)) # 也可这样写，打印： [12, 11, 10]

        # 匹配多个内容, finditer() 以迭代器返回
        iterator = p.finditer(s0)
        # iterator = re.finditer(r'\d+', s0) # 上句也可以这样写
        for match in iterator:
            print(match.group()) # 三次分别打印：12、 11、 10

        # 记忆组
        print(re.sub('([^aeiou])y$', 'ies', 'vacancy'))    # 将匹配的最后两个字母替换掉，打印： vacanies
        print(re.sub('([^aeiou])y$', r'\1ies', 'vacancy')) # 将匹配的最后一个字母替换掉，记忆住前一个(小括号那部分)，打印： vacancies
        print(re.search('([^aeiou])y$', 'vacancy').group(1)) # 使用 group() 函数获取对应的记忆组内容，打印： c

        # 记忆组(匹配重复字符串)
        p = re.compile(r'(?P<word>\b\w+)\s+\1') # 注意, re.match() 函数不能这样用，会返回 None
        p = p.search('Paris in the the spring')
        # p = re.search(r'(?P<word>\b\w+)\s+\1', 'Paris in the the spring') # 这一句可以替换上面两句
        print(p.group())  # 返回正则表达式匹配的所有内容，打印： the the
        print(p.groups()) # 返回一个包含字符串的元组，打印： ('the',)

        # 捕获组
        r = re.search(r'\bR(OA)(D)\b', s) # 如过能匹配到，返回一个 SRE_Match 类(正则表达式匹配对象)；匹配不到则返回“None”
        # `MatchObject` 实例的几个方法
        if r: # 如果匹配不到，则 r 为 None,直接执行下面语句则会报错；这里先判断一下，避免这错误
            print(r.groups()) # 返回一个包含字符串的元组,可用下标取元组的内容，打印： ('OA', 'D')
            print(r.group())  # 返回正则表达式匹配的字符串，打印： ROAD
            print(r.group(2)) # 返回捕获组对应的内容(用数字指明第几个捕获组)，打印： D

        # 无捕获组
        print(re.match("([abc])+", "abcdefab").groups())   # 正常捕获的结果： ('c',)
        print(re.match("(?:[abc])+", "abcdefab").groups()) # 无捕获组的结果： ()

        # 命名组
        m = re.match(r'(?P<word>\b\w+\b) *(?P<word2>\b\w+\b)', 'Lots of punctuation')
        print(m.groups())       # 返回正则表达式匹配的所有内容，打印：('Lots', 'of')
        print(m.group(1))       # 通过数字得到对应组的信息，打印： Lots
        print(m.group('word2')) # 通过名称得到对应组的信息，打印： of

        # 命名组 逆向引用
        p = re.compile(r'(?P<word>\b\w+)\s+(?P=word)') # 与记忆组一样用法, re.match() 函数同样不能这样用，会返回 None
        p = p.search('Paris in the the spring') #  r'(?P<word>\b\w+)\s+(?P=word)' 与 r'(?P<word>\b\w+)\s+\1' 效果一样
        print(p.group())  # 返回正则表达式匹配的所有内容，打印： the the
        print(p.groups()) # 返回一个包含字符串的元组，打印： ('the',)

        # 使用松散正则表达式,以判断罗马数字为例
        pattern = '''
            ^                   # beginning of string
            (M{0,3})            # thousands - 0 to 3 Ms
            (CM|CD|D?C{0,3})    # hundreds - 900 (CM), 400 (CD), 0-300 (0 to 3 Cs),
                                #            or 500-800 (D, followed by 0 to 3 Cs)
            (XC|XL|L?X{0,3})    # tens - 90 (XC), 40 (XL), 0-30 (0 to 3 Xs),
                                #        or 50-80 (L, followed by 0 to 3 Xs)
            (IX|IV|V?I{0,3})    # ones - 9 (IX), 4 (IV), 0-3 (0 to 3 Is),
                                #        or 5-8 (V, followed by 0 to 3 Is)
            $                   # end of string
            '''
        print(re.search(pattern, 'M')) # 这个没有申明为松散正则表达式，按普通的来处理了，打印： None
        print(re.search(pattern, 'M', re.VERBOSE).groups()) # 打印： ('M', '', '', '')

        # (?iLmsux) 用法
        # 以下这三句的写法都是一样的效果，表示忽略大小写，打印： ['aa', 'AA']
        print(re.findall(r'(?i)(aa)', 'aa kkAAK s'))
        print(re.findall(r'(aa)', 'aa kkAAK s', re.I))
        print(re.findall(r'(aa)', 'aa kkAAK s', re.IGNORECASE))
        # 可以多种模式同时生效
        print(re.findall(r'(?im)(aa)', 'aa kkAAK s'))  # 直接在正则表达式里面写
        print(re.findall(r'(aa)', 'aa kkAAK s', re.I | re.M)) # 在参数里面写
        print(re.findall(r'(aa)', 'aa kkAAK s', re.I or re.M))

        # 预编译正则表达式解析的写法
        # romPattern = re.compile(pattern)  # 如果不是松散正则表达式,则这样写,即少写 re.VERBOSE 参数
        romPattern = re.compile(pattern, re.VERBOSE)
        print(romPattern.search('MCMLXXXIX').groups()) # 打印： ('M', 'CM', 'LXXX', 'IX')
        print(romPattern.search('MMMDCCCLXXXVIII').groups()) # 打印： ('MMM', 'DCCC', 'LXXX', 'VIII')
        # match()、search()、sub()、findall() 等等都可以这样用

    match() vs search()
        match() 函数只检查 RE 是否在字符串开始处匹配，而 search() 则是扫描整个字符串。记住这一区别是重要的。
        match() 只报告一次成功的匹配，它将从 0 处开始；如果匹配不是从 0 开始的， match() 将不会报告它。
        search() 将扫描整个字符串，并报告它找到的第一个匹配。
    例：
        print(re.match('super', 'superstition').span())  # 打印： (0, 5)
        print(re.match('super', 'insuperable'))          # 打印： None
        print(re.search('super', 'superstition').span()) # 打印： (0, 5)
        print(re.search('super', 'insuperable').span())  # 打印： (2, 7)


Python标准库:

os 模块
    这个模块包含普遍的操作系统功能。如果你希望你的程序能够与平台无关的话，这个模块是尤为重要的。
    os.sep  获取操作系统特定的路径分割符。比如在Linux、Unix下它是'/'，在Windows下它是'\\'，而在Mac OS下它是':'。
    os.name 字符串指示你正在使用的平台。比如对于Windows，它是'nt'，而对于Linux/Unix用户，它是'posix'。
    os.getcwd() 函数得到当前工作目录，即当前Python脚本工作的目录路径。
    os.getenv(key) 函数用来读取环境变量。
    os.putenv(key, value) 函数用来设置环境变量。
    os.listdir(path) 返回指定目录下的所有文件和目录名。
    os.remove(filePath) 函数用来删除一个文件。
    os.system(shellStr) 函数用来运行shell命令，windows平台则是运行批处理命令。
    os.linesep  字符串给出当前平台使用的行终止符。例如，Windows使用'\r\n'，Linux使用'\n'而Mac使用'\r'。
    os.path.split(pathname)  函数返回一个路径的目录名和文件名。
    os.path.isfile(path) 函数检验给出的路径是否一个文件。
    os.path.isdir(path)  函数分别检验给出的路径是否目录。
    os.path.existe(path) 函数用来检验给出的路径是否真地存在。


unittest 模块(单元测试)
    单元测试的好处：
      在编写代码之前，通过编写单元测试来强迫你使用有用的方式细化你的需求。
      在编写代码时，单元测试可以使你避免过度编码。当所有测试用例通过时，实现的方法就完成了。
      重构代码时，单元测试用例有助于证明新版本的代码跟老版本功能是一致的。
      在维护代码期间，可验证代码是否破坏原有代码的状态。
      在团队编码中，缜密的测试套件可以降低你的代码影响别人代码的机率，提前发现代码与其他人的不可以良好工作。
    单元测试的原则：
      完全自动运行，而不需要人工干预。单元测试几乎是全自动的。
      自主判断被测试的方法是通过还是失败，而不需要人工解释结果。
      独立运行，而不依赖其它测试用例(即使测试的是同样的方法)。即，每一个测试用例都是一个孤岛。

    例：

        #### roman1.py 文件的内容  ####

        # 定义异常类型(这里仅做范例，不执行什么)
        class OutOfRangeError(ValueError): pass
        class NotIntegerError(ValueError): pass

        roman_numeral_map = (('M',  1000),
             ('CM', 900), ('D',  500), ('CD', 400), ('C',  100),
             ('XC', 90),  ('L',  50),  ('XL', 40),  ('X',  10),
             ('IX', 9),   ('V',  5),   ('IV', 4),   ('I',  1))

        # 被测试函数
        def to_roman(n):
            '''convert integer to Roman numeral'''
            # 数值范围判断
            if not ( 0 < n < 4000 ):
                raise OutOfRangeError('number out of range (must be less than 4000)')
            # 类型判断, 内建的 isinstance() 方法可以检查变量的类型
            # isinstance(n, int) 与 type(n) is int 等效
            if not isinstance(n, int):
                raise NotIntegerError('non-integers can not be converted')
            result = ''
            for numeral, integer in roman_numeral_map:
                while n >= integer:
                    result += numeral
                    n -= integer
            return result



        #### 测试文件的内容 ####

        import roman1 # 导入被测试的类
        import unittest

        # 需继承 unittest 模块的TestCase 类。TestCase 提供了很多可以用于测试特定条件的有用的方法。
        class KnownValues(unittest.TestCase):
            def setUp(self):
                """初始化"""
                #执行数据库连接，数据初始化等,此函数可不写
                pass

            # setUp 和 tearDown 在执行每个测试函数的前后都会执行
            def tearDown(self):
                """销毁"""
                pass

            # 每一个独立的测试都有它自己的不含参数及没有返回值的方法。如果方法不抛出异常而正常退出则认为测试通过;否则，测试失败。
            # 测试本身是类一个方法，并且该方法以 test 开头命名。如果不是 test 开头，则不会执行。
            def test_to_roman_known_values(self):
                # 对于每一个测试用例， unittest 模块会打印出测试方法的 docstring ，并且说明该测试失败还是成功。
                # 失败时必然打印docstring, 成功时需使用“-v”命令行参数来查看。
                '''to_roman 方法传回的值与用例的数据不相等时,则测试不通过'''
                # 测试的用例，一般是所有明显的边界用例。
                known_values = ( (1, 'I'), (2, 'II'), (3, 'III'), (4, 'IV'),
                    (5, 'V'), (6, 'VI'), (7, 'VII'), (8, 'VIII'),
                    (9, 'IX'), (10, 'X'), (50, 'L'), (100, 'C'),
                    (500, 'D'), (1000, 'M'), (31, 'XXXI'), (148, 'CXLVIII'),
                    (3888, 'MMMDCCCLXXXVIII'), (3940, 'MMMCMXL'), (3999, 'MMMCMXCIX') )
                for integer, numeral in known_values:
                    result = roman1.to_roman(integer) # 这里调用真实的方法。如果该方法抛出了异常，则测试被视为失败。
                    self.assertEqual(numeral, result) # 检查两个值是否相等。如果两个值不一致，则抛出异常，并且测试失败。
                    self.assertNotEqual(0, result, '这两个值不应该相等') # 检查两个值是否不相等。
                    self.assertTrue(5 > 0, '5 > 0 都出错，不是吧')
                    self.assertFalse(5 < 0)
                # 对于每一个失败的测试用例， unittest 模块会打印出详细的跟踪信息。
                # 如果所有返回值均与已知的期望值一致，则 self.assertEqual 不会抛出任何异常，于是此次测试最终会正常退出，这就意味着 to_roman() 通过此次测试。
                assert 5 > 0 # 为了更灵活的判断，可使用 assert

            # 测试异常,让被测试的方法抛出异常，这里来验证异常类型。如果预期的异常没有抛出，则测试失败。
            def test_over_value(self):
                '''参数过大或者过小时, to_roman 方法应该抛出异常信息'''
                # assertRaises 方法需要以下参数：你期望的异常、你要测试的方法及传入给方法的参数。
                #(如果被测试的方法需要多个参数的话，则把所有参数依次传入 assertRaises， 它会正确地把参数传递给被测方法的。)
                self.assertRaises(roman1.OutOfRangeError, roman1.to_roman, 4000)
                # 注意是把 to_roman() 方法作为参数传递;没有调用被测方法，也不是把被测方法作为一个字符串名字传递进去
                self.assertRaises(roman1.OutOfRangeError, roman1.to_roman, 0)
                self.assertRaises(roman1.OutOfRangeError, roman1.to_roman, -1)

            # 验证参数类型
            def test_non_integer(self):
                '''如果参数不是 int 类型时， to_roman 方法应该抛出异常'''
                self.assertRaises(roman1.NotIntegerError, roman1.to_roman, 0.5)
                self.assertRaises(roman1.NotIntegerError, roman1.to_roman, 6.0)

        # 在说明每个用例的详细执行结果之后， unittest 打印出一个简述来说明“多少用例被执行了”和“测试执行了多长时间”。
        if __name__ == '__main__':
            # main 方法会执行每个测试用例
            unittest.main()


with 关键字
    从Python 2.5开始有，需要 from __future__ import with_statement。自python 2.6开始，成为默认关键字。
    with 是一个控制流语句, 跟 if/for/while/try 之类的是一类的，with 可以用来简化 try finally 代码，看起来可以比 try finally 更清晰。
    with obj 语句在控制流程进入和离开其后的相关代码中，允许对象obj管理所发生的事情。
    执行 with obj 语句时，它执行 obj.__enter__() 方法来指示正在进入一个新的上下文。当控制流离开该上下文的时候，它就会执行 obj.__exit__(type, value, traceback)。

    "上下文管理协议"context management protocol: 实现方法是为一个类定义 __enter__ 和 __exit__ 两个函数。
    with expresion as variable的执行过程是，首先执行 __enter__ 函数，它的返回值会赋给 as 后面的 variable, 想让它返回什么就返回什么，如果不写 as variable，返回值会被忽略。
    然后，开始执行 with-block 中的语句，不论成功失败(比如发生异常、错误，设置sys.exit())，在with-block执行完成后，会执行__exit__函数。
    这样的过程其实等价于：
    try:
        执行 __enter__()
        执行 with_block.
    finally:
        执行 __exit__()

    只不过，现在把一部分代码封装成了__enter__函数，清理代码封装成__exit__函数。

    例：
        import sys

        class test:
            def __enter__(self):
                print("enter...")
                return 1

            def __exit__(self,*args):
                print("exit...")
                return True

        with test() as t:
            print("t is not the result of test(), it is __enter__ returned")
            print("t is 1, yes, it is {0}".format(t))
            raise NameError("Hi there")
            sys.exit()
            print("Never here")

    注意:
        1) t不是test()的值，test()返回的是"context manager object"，是给with用的。t获得的是__enter__函数的返回值，这是with拿到test()的对象执行之后的结果。t的值是1.
        2) __exit__函数的返回值用来指示with-block部分发生的异常是否要 re-raise ，如果返回 False,则会抛出 with-block 的异常，如果返回 True,则就像什么都没发生。

    在Python2.5中, file objec t拥有 __enter__ 和 __exit__ 方法，__enter__ 返回 object 自己，而 __exit__ 则关闭这个文件：
    要打开一个文件，处理它的内容，并且保证关闭它，你就可以简简单单地这样做：

        with open("x.txt") as f:
            data = f.read()
            do something with data

    补充：
        数据库的连接好像也可以和with一起使用，我在一本书上看到以下内容：
        conn = sqlite.connect("somedb")
        with conn:
            conn.execute("insert into sometable values (?,?)",("foo","bar"))
        在这个例子中，commit()是在所有with数据块中的语句执行完毕并且没有错误之后自动执行的，如果出现任何的异常，将执行rollback()
        操作，再次提示异常






#####################################################
范例:
1.运行系统命令行
    import os
    os_command = 'echo haha...'
    # 运行命令行,返回运行结果(成功时返回0,失败返回1或以上的出错数字)
    result = os.system(os_command)
    if result == 0:
        print('run Successful')
    else:
        print('run FAILED')
    # 注:os.system()函数不推荐使用,它容易引发严重的错误。(可能是因为不具备可移植性)

    #os.system(os_command) # 这命令会弹出一个黑乎乎的cmd运行窗口,而且无法获得输出
    p = os.popen(os_command) # 捕获运行的屏幕输出，以文件类型接收，不再另外弹出窗口
    print(p.read()) # p 是个文件类型，可按文件的操作


2.获取系统时间
    import time,datetime
    time.sleep(2)  # 时间暂停两秒
    print(time.strftime('%Y-%m-%d %H:%M:%S')) # 打印如: 2011-04-13 18:30:10
    print(time.strftime('%Y-%m-%d %A %X', time.localtime(time.time()))) # 显示当前日期； 打印如: 2011-04-13 Wednesday 18:30:10
    print(time.strftime("%Y-%m-%d %A %X", time.localtime())) # 显示当前日期； 打印如: 2011-04-13 Wednesday 18:30:10
    print(time.time()) # 以浮点数形式返回自Linux新世纪以来经过的秒数； 打印如: 1302687844.7
    print(time.ctime(1150269086.6630149)) #time.ctime([sec]) 把秒数转换成日期格式，如果不带参数，则显示当前的时间。打印如: Wed Apr 13 21:13:11 2011

    # 得到今天的日期
    print(datetime.date.today()) # 打印如: 2011-04-13
    # 得到前一天的日期
    print(datetime.date.today() + datetime.timedelta(days=-1)) # 打印如: 2011-04-12
    print(datetime.date.today() - datetime.timedelta(days=1))  # 打印如: 2011-04-14
    # 得到10天后的时间
    print(datetime.date.today() + datetime.timedelta(days=10)) # 打印如: 2011-04-23
    # 得到10小时后的时间，上面的 days 换成 hours
    print(datetime.datetime.now() + datetime.timedelta(hours=10)) # 打印如: 2011-04-14 04:30:10.189000

    #两日期相减(也可以大于、小于来比较):
    d1 = datetime.datetime(2005, 2, 16)
    d2 = datetime.datetime(2004, 12, 31)
    print((d1 - d2).days) # 打印： 47

    #运行时间：
    starttime = datetime.datetime.now()
    time.sleep(1) # 暂停1秒
    endtime = datetime.datetime.now()
    print((endtime - starttime).seconds) # 秒, 打印： 1
    print((endtime - starttime).microseconds) # 微秒； 打印： 14000


    日期格式化符号:
    %%: %号本身
    %A: 本地星期(全称),如:Tuesday   %a: 本地星期(简称),如:Tue
    %B: 本地月份(全称),如:February  %b: 本地月份(简称),如:Feb
                                    %c: 本地相应的日期表示和时间表示,如:02/15/11 16:50:57
                                    %d: 月内中的一天(0-31),如:15
    %H: 24进制小时数(0-23)
    %I: 12进制小时数(01-12)
                                    %j: 年内的一天(001-366),如:046
    %M: 分钟(00-59),如:50           %m: 月份(01-12),如:02
                                    %p: 上下午(本地A.M.或P.M.的等价符),如:PM
    %S: 秒钟(00-59),如:57
    %X: 本地的时间,如:16:50:57      %x: 本地的日期,如:02/15/11
    %Y: 四位的年(000-9999)          %y: 两位数的年份表示(00-99)

    %U: 年里的星期数(00-53)从星期天开始,如:07
    %W: 年里的星期数(00-53)从星期一开始,如:07
    %w: 星期(0-6),星期天为星期的开始,如:2 (星期天为0)
    %Z: 当前时区的名称,如:中国标准时间
    %z: 当前时区的名称,如:中国标准时间


3.创建目录
    import os
    pathDir = r'D:\Work' # 不同系统的目录写法有所不同
    if not os.path.exists(pathDir):
        os.mkdir(pathDir) # 创建目录, os.makedirs(pathDir) 创建多个不存在的目录
    target = pathDir + os.sep + 'test.txt'
    print(target)
    # 注意os.sep变量的用法, os.sep 是目录分隔符,这样写方便移植。即在Linux、Unix下它是'/'，在Windows下它是'\\'，而在Mac OS下它是':'。


4.文件操作(读写txt文件)
    filePath = 'poem.txt'
    f = open(filePath, 'w') # 以写的模式打开文件,Python 2.x 需将 open() / io.open() 改成 file()
    for a in range( 0, 10 ):
        s = "%5d %5d\n" % (a, a*a)
        f.write( s ) # 把文本写入文件
    f.close() # 关闭io流

    f2 = open(filePath) # 没有提供模式，则默认是读取,即 'r'
    while True:
        line = f2.readline()
        if len(line) == 0: # 读取结束
            break
        print(line, end=' ') # 避免print自动换行, 此行Python2.x应该写：“print line,”
    f2.close() # close the file

    # 删除文件
    import os
    os.remove(filePath)

    说明:
    一、在pythony 3.0 已经废弃了 file 类。

    二、pythony 3.0 内置 open() 函数的构造函数是:
    open(file, mode="r", buffering=None, encoding=None, errors=None, newline=None, closefd=True)
    1.mode(模式):
      r: 读，只能读文件，如果文件不存在，会发生异常
      w: 写，只能写文件，如果文件不存在，创建该文件；如果文件已存在，先清空，再打开文件
      a: 打开供追加
      b: 二进制模式；一般是组合写法,如: rb 以二进制读方式打开；wb 以二进制写方式打开
      t: 文本模式
      +: 打开一个磁盘文件供更新,一般是组合使用,如:
         rb+: 以二进制读方式打开，可以读、写文件，如果文件不存在，会发生异常
         wb+: 以二进制写方式打开，可以读、写文件，如果文件不存在，创建该文件；如果文件已存在，先清空，再打开文件
      u: 通用换行模式
      默认的模式是 rt，即打开供读取的文本模式。
    2.buffering 关键字参数的期望值是以下三个整数中的一个以决定缓冲策略：
      0: 关闭缓冲
      1: 行缓冲
      > 1: 所填的 int 数=缓冲区大小
      默认: 完全缓冲
    3.encoding 默认的编码方式独立于平台。
    4.关闭文件描述符 closefd 可以是 True 或 False 。
      如果是 False,此文件描述符会在文件关闭后保留。若文件名无法奏效的话，那么必须设为 True 。

    三、清空文件内容
    f.truncate()
    注意：当以 "r+","rb+","w","wb","wb+"等模式时可以执行该功能，即具有可写模式时才可以。

    四、文件的指针定位与查询
    (1)文件指针：
         文件被打开后，其对象保存在 f 中， 它会记住文件的当前位置,以便于执行读、写操作，
         这个位置称为文件的指针( 一个从文件头部开始计算的字节数 long 类型 )。
    (2)文件打开时的位置:
         以"r","r+","rb+" 读方式, "w","w+","wb+"写方式 打开的文件，
         一开始，文件指针均指向文件的头部。
    (3)获取文件指针的值:
         L = f.tell()
    (4)移动文件的指针
         f.seek(偏移量, 选项) # 偏移量 是 long 或者 int 类型，计算偏移量时注意换行符是2,汉字可能是2或3
         选项 =0 时， 表示将文件指针指向从文件头部到 "偏移量"字节处。
         选项 =1 时， 表示将文件指针指向从文件的当前位置，向后移动 "偏移量"字节。
         选项 =2 时， 表示将文件指针指向从文件的尾部，，向前移动 "偏移量"字节。

    五、从文件读取指内容
    1.文本文件(以"rt"方式打开的文件)的读取
      s = f.readline()
      返回值： s 是字符串，从文件中读取的一行，含行结束符。
      说明: (1)如果 len(s) = 0 表示已到文件尾(换行符也是有长度的,长度为2)
            (2)如果是文件的最后一行，有可能没有行结束符
    2.二进制文件(以"rb"、"rb+"、"wb+" 方式打开的文件)的读取
      s = f.read(n)
      说明: (1)如果 len( s ) =0 表示已到文件尾
            (2)文件读取后，文件的指针向后移动 len(s) 字节。
            (3)如果磁道已坏，会发生异常。

    六、向文件写入一个字符串
      f.write( s )
      参数: s 要写入的字符串
      说明: (1)文件写入后，文件的指针向后移动 len(s) 字节。
            (2)如果磁道已坏，或磁盘已满会发生异常。

    七、常用文件操作参考
      [1.os]
        1.重命名：os.rename(old, new)
        2.删除：os.remove(file)
        3.列出目录下的文件：os.listdir(path)
        4.获取当前工作目录：os.getcwd()
        5.改变工作目录：os.chdir(newdir)
        6.创建多级目录：os.makedirs(r"c:\python\test")
        7.创建单个目录：os.mkdir("test")
        8.删除多个目录：os.removedirs(r"c:\python") #删除所给路径最后一个目录下所有空目录。
        9.删除单个目录：os.rmdir("test")
        10.获取文件属性：os.stat(file)
        11.修改文件权限与时间戳：os.chmod(file)
        12.执行操作系统命令：os.system("dir")
        13.启动新进程：os.exec(), os.execvp()
        14.在后台执行程序：osspawnv()
        15.终止当前进程：os.exit(), os._exit()
        16.分离文件名：os.path.split(r"c:\python\hello.py") --> ("c:\\python", "hello.py")
        17.分离扩展名：os.path.splitext(r"c:\python\hello.py") --> ("c:\\python\\hello", ".py")
        18.获取路径名：os.path.dirname(r"c:\python\hello.py") --> "c:\\python"
        19.获取文件名：os.path.basename(r"r:\python\hello.py") --> "hello.py"
        20.判断文件是否存在：os.path.exists(r"c:\python\hello.py") --> True
        21.判断是否是绝对路径：os.path.isabs(r".\python\") --> False
        22.判断是否是目录：os.path.isdir(r"c:\python") --> True
        23.判断是否是文件：os.path.isfile(r"c:\python\hello.py") --> True
        24.判断是否是链接文件：os.path.islink(r"c:\python\hello.py") --> False
        25.获取文件大小：os.path.getsize(filename)
        26.*******：os.ismount("c:\\") --> True
        27.搜索目录下的所有文件：os.path.walk()
        28.文件的访问时间 :  os.path.getatime(myfile) # 这里的时间以秒为单位，并且从1970年1月1日开始算起
        29.文件的修改时间:  os.path.getmtime(myfile)

      [2.shutil]
        1.复制单个文件：shultil.copy(oldfile, newfle)
        2.复制整个目录树：shultil.copytree(r".\setup", r".\backup")
        3.删除整个目录树：shultil.rmtree(r".\backup")

      [3.tempfile]
        1.创建一个唯一的临时文件：tempfile.mktemp() --> filename
        2.打开临时文件：tempfile.TemporaryFile()

      [4.StringIO] #cStringIO是StringIO模块的快速实现模块
        1.创建内存文件并写入初始数据：f = StringIO.StringIO("Hello world!")
        2.读入内存文件数据： print f.read() #或print f.getvalue() --> Hello world!
        3.想内存文件写入数据：f.write("Good day!")
        4.关闭内存文件：f.close()

      [5.glob]
        1.匹配文件：glob.glob(r"c:\python\*.py")


5.文件操作(遍历目录和文件名)
    import os
    import os.path
    rootdir = r"D:\Holemar\1.notes\28.Python\test"
    # os.walk 返回一个三元组，其中parent表示所在目录, dirnames是所有目录名字的列表, filenames是所有文件名字的列表
    for parent,dirnames,filenames in os.walk(rootdir):
        # 所在目录
        print("parent is:" + parent)
        # 遍历此目录下的所有目录(不包含子目录)
        for dirname in dirnames:
           print(" dirname is:" + dirname)
        # 遍历此目录下的所有文件
        for filename in filenames:
           print(" filename with full path:" + os.path.join(parent, filename))

    # 列表显示出某目录下的所有文件及目录(不包括子目录的内容)
    ls = os.listdir(rootdir)


6.文件操作(分割路径和文件名)
    import os.path
    #常用函数有三种：分隔路径，找出文件名，找出盘符(window系统)，找出文件的扩展名。
    spath = "d:/test/test.7z"

    # 下面三个分割都返回二元组
    # 分隔目录和文件名
    p,f = os.path.split(spath)  # 注意二元组的接收
    print("dir is:" + p)    # 打印: d:/test
    print(" file is:" + f)  # 打印: test.7z

    # 分隔盘符和文件名
    drv,left = os.path.splitdrive(spath)
    print(" driver is:" + drv)   # 打印: d:
    print(" left is:" + left)    # 打印: /test/test.7z

    # 分隔文件和扩展名
    f,ext = os.path.splitext(spath)
    print(" f is: " + f)    # 打印: d:/test/test
    print(" ext is:" + ext) # 打印: 7z


7.储存器
    pickle标准模块。它可以在一个文件中储存任何Python对象，之后又可以把它完整无缺地取出来。这被称为 持久地 储存对象。
    在pythony 3.0 已经移除了 cPickle 模块，可以使用 pickle 模块代替。

    import pickle as p # 这里使用 as 简称,方便更改模块时只需改一行代码
    # import cPickle as p # Python 2.x 有这个模块(比pickle快1000倍)

    # 将会把资料保存在这个文件里面
    shoplistfile = 'shoplist.data'

    # 需要保存的资料
    shoplist = ['apple', 'mango', 'carrot', 2, 5]

    # 写入文件
    f = open(shoplistfile, "wb") # 以二进制写入,Python2.x时可不用二进制,但3.x必须
    p.dump(shoplist, f) # dump the object to a file
    f.close()

    # 取出资料
    f = open(shoplistfile, "rb") # 以二进制读取
    storedlist2 = p.load(f)
    print(storedlist2)
    f.close()

    # 删除文件
    import os
    os.remove(shoplistfile)


8.url编码操作
    import urllib,sys

    s = '杭州'
    print(urllib.quote(s)) # url 转码,打印如: %E6%9D%AD%E5%B7%9E
    print(urllib.unquote('%E6%9D%AD%E5%B7%9E')) # url 解码,打印如: 杭州

    # 按所用的编码来转码
    print(urllib.quote(s.decode(sys.stdin.encoding).encode('utf8'))) # 打印如: %E6%9D%AD%E5%B7%9E
    print(urllib.quote(s.decode(sys.stdin.encoding).encode('gbk')))  # 打印如: %BA%BC%D6%DD
    print(urllib.quote(s.decode('gbk').encode('utf8'))) # 指定编码来转码
    print(urllib.quote(u'中国'.encode('utf8'))) # unicode编码的，需encode一下；否则中文会出错
    # decode就是把其他编码转换为unicode，等同于unicode函数；encode就是把unicode编码的字符串转换为特定编码。

    # 一些不希望被编码的url
    print urllib.quote("http://localhost/index.html?id=1") # 打印: http%3A//localhost/index.html%3Fid%3D1
    print urllib.quote("http://localhost/index.html?id=1",":?=/") # 打印: http://localhost/index.html?id=1

    # 查看
    print(u'中国'.__class__) # 打印: <type 'unicode'>
    print('中国'.__class__)  # 打印: <type 'str'>


9.数据库连接
    cx_Oracle : 是一个用来连接并操作 Oracle 数据库的 Python 扩展模块， 支持包括 Oracle 9.2 10.2 以及 11.1 等版本。
      安装：
        需先oracle安装客户端，并配置环境变量：
            ORACLE_HOME＝D:\Oracle\Ora81
　　        PATH=D:\Oracle\Ora81\bin;(其他path的地址)
        下载 cx_Oracle 安装包： http://www.python.net/crew/atuining/cx_Oracle/

      Oracle 示例：
        import cx_Oracle
        print(cx_Oracle.version) # 打印出版本信息
        # 建立连接, 3种不同写法
        conn = cx_Oracle.connect('username/pwssword@localhost:1521/db_name') # 参数连写
        conn = cx_Oracle.connect('username', 'pwssword', 'ip_address:1521/db_name') # 分开3个参数写
        dsn_tns = cx_Oracle.makedsn('localhost', 1521, 'db_name')
        conn = cx_Oracle.connect('username', 'pwssword', dsn_tns) # 分开5个参数写


    MySQLdb   : MySQL 数据库的 Python 扩展模块
        import MySQLdb
                下载地址(tar安装包)： http://sourceforge.net/projects/mysql-python
                 (exe安装文件) http://www.lfd.uci.edu/~gohlke/pythonlibs/

    mongodb:
        下载数据库安装文件： http://www.mongodb.org/downloads
        import pymongo


    其他数据库：
    postgresql PostgreSQL psycopg version 1.x, http://initd.org/projects/psycopg1
    postgresql_psycopg2 PostgreSQL psycopg version 2.x, http://initd.org/projects/psycopg2
    sqlite3 SQLite No adapter needed if using Python 2.5+ Otherwise, pysqlite, http://initd.org/tracker/pysqlite
    ado_mssql Microsoft SQL Server adodbapi version 2.0.1+, http://adodbapi.sourceforge.net/

     MySQL 示例：
        # 0. 导入模块(如果导入出错，说明安装驱动不成功)
        import MySQLdb

        # 1. 数据库联结，默认host为本机, port为3306(各数据库的连接写法有所不同)
        conn = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="root", db="testdb")
        # conn = MySQLdb.Connection(host="localhost", port=3306, user="root", passwd="root", db="testdb") # 与上句一样

        # 2. 选择数据库(如果前面还没有选择数据库的话)
        conn.select_db('database name')

        # 3. 获得cursor
        cursor = conn.cursor()

        # 4.1 执行SQL，查询和增删改都这样写； 查询返回查询结果的行数，增删改返回影响的行数
        cursor.execute("SELECT * FROM tb_member")

        # 4.1.1. cursor位置设定及读取结果(仅查询时可这样用)
        # cursor.scroll(int, mode) # mode可为相对位置或者绝对位置，分别为relative和absolute。
        cursor.scroll(0)

        # 4.1.2. Fetch 及 获取结果(每次Fetch,结果集都会下移,下次获取的是剩下的结果集，除非再 cursor.scroll() 移动结果集)
        print(cursor.fetchone()) # 获取对应位置的资料,返回一个一维元组,打印如：(1L, 'stu1', 'm')
        print(cursor.fetchall()) # 返回结果是个二维元组(所有结果) 打印如：((1L, 'stu1', 'm'), (2L, 'stu2', 'f'))

        # 4.2 execute SQL, 返回影响的行数
        rows = cursor.execute("delete from tb_member where memid=2")
        print(rows) # 返回影响的行数(整数类型), 打印如：1

        # 5. 关闭连接
        cursor.close()
        conn.close()


10.需注意的默认参数
    # 默认参数： 如果调用的时候没指定，那它会是函数定义时的引用；
    # 因此，默认参数建议使用基本类型；如果不是基本类型，建议写 None,然后在函数里面设默认值

    ##### 范例1，默认参数如果是 []、{} ，将会影响全局 ########
    def t1(a, b = []):
        b.append(a)
        print('%s  %s' % (id(b), b))

    t1(1)       # 打印： 12523400  [1]
    t1(2)       # 打印： 12523400  [1, 2]
    t1(3, b=[]) # 打印： 12545000  [3]

    def t2(a, b = {}):
        b[len(b)] = a
        print('%s  %s' % (id(b), b))

    t2(1)       # 打印： 12540928  {0: 1}
    t2(2)       # 打印： 12540928  {0: 1, 1: 2}
    t2(3, b={}) # 打印： 11547392  {0: 3}


    ##### 范例2，如果默认的是其它的函数调用，同样原理，默认值只是函数定义时的引用，后面不再改变 ########
    import time
    def cc(a,b = time.time()):print('%s  %s' % (a,b))

    cc(1)      # 打印： 1 1306501851.48
    cc(1,b=2)  # 打印： 1 2
    cc(2)      # 打印： 2 1306501851.48


    ##### 范例3，只是为了更好的理解上述所讲 ########
    def aa():
        print('aa...')
        return []

    # 只在函数定义时，执行被调用的 aa(), 后面不再执行
    def bb(a,b = aa()):
        b.append(1)
        print('%s  %s' % (id(b), b))

    bb(1) # 打印： 12542840  [1]
    bb(2) # 打印： 12542840  [1, 1]

    ################################################
    # 范例4， 为避免上面的出错，正确的写法是这样的：
    def t1(a, b = None):
        b = b or []
        b.append(a)
        print('%s  %s' % (id(b), b))

    def t2(a, b = None):
        b = b or {}
        b[len(b)] = a
        print('%s  %s' % (id(b), b))

    import time
    def cc(a, b = None):
        b = b or time.time()
        print('%s  %s' % (a,b))


11. 随机数
    from random import randint # 产生随机整数
    for i in xrange(100):
        print( randint(10, 90) ) # 产生 10~90 的随机整数


12. 条件参数列表
    在实际开发中，我们会遇到如下一种需求：
    1. 默认条件有 (a, b, c, d ...)，总之很多。
    2. 调用者可以传递 (b = False, c = False) 来提供 "非" 条件，其他默认为 True。
    3. 或者传递 (b = True, c = True)，其他默认为 False。
    4. 还可以用 (all = True, ...) 来明确指定默认值。

    def test(**on):
        # 全部条件列表
        accept_args = ("a", "b", "c", "d", "e")

        # 默认条件
        default = on.pop("all", None)

        # 如果没有显式指明默认条件，则检查参数列：
        #   1. 如果有任何一个 True 条件则默认值为 False。
        #   2. 如果全部为 False，则默认值为 True。
        if default is None: default = not(True in on.values())

        # 使用 setdefault 补全参数字典
        for k in accept_args: on.setdefault(k, default)

        return on


    print test(b = False, e = False)                # 显示：{'a': True, 'c': True, 'b': False, 'e': False, 'd': True}
    print test(c = True)                            # 显示：{'a': False, 'c': True, 'b': False, 'e': False, 'd': False}
    print test(a = True, e = False)                 # 显示：{'a': True, 'c': False, 'b': False, 'e': False, 'd': False}
    print test(all = True, c = False, e = True)     # 显示：{'a': True, 'c': False, 'b': True, 'e': True, 'd': True}
    print test(all = True, c = False, e = False)    # 显示：{'a': True, 'c': False, 'b': True, 'e': False, 'd': True}
    print test(all = False, c = True, e = True)     # 显示：{'a': False, 'c': True, 'b': False, 'e': True, 'd': False}


13. 断点调试
    import pdb; pdb.set_trace() # 运行到这语句，会出现断点

    输入命令：
    命令的详细帮助: h
    查看代码上下文, l(小写L)
    监视变量: p 变量名
    单步执行: n
    加入断点: b 行号
    跳出断点: c
    执行到函数返回前: r


14. 修改注册表(使用 _winreg, python3.x是 winreg 模块, 内置模块)
    官方的参考文档：
    http://docs.python.org/library/_winreg.html
    http://www.python.org/doc/2.6.2/library/_winreg.html

    1.  读取
        读取用的方法是OpenKey方法：打开特定的key
        hkey = _winreg.OpenKey(key,sub_key,res=0,sam=KEY_READ)
        _winreg.CloseKey(hkey) # 关闭之前打开的,如果不关闭则在对象被销毁时关闭

        例子：
        import _winreg
        key = _winreg.OpenKey(_winreg.HKEY_LOCAL_MACHINE, r"SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\{0E184877-D910-4877-B 4C2-04F487B6DBB7}")

        #获取该键的所有键值，遍历枚举
        try:
            i=0
            while 1:
                # EnumValue方法用来枚举键值，EnumKey用来枚举子键
                print _winreg.EnumValue(key,i) # 打印： (name,value,type)
                i+=1
        except WindowsError:
            print

        #假如知道键名，也可以直接取值
        print _winreg.QueryValueEx(key,"ExplorerStartupTraceRecorded") # 打印： (value,type)

    2.  创建 修改注册表
        创建key：_winreg.CreateKey(key,sub_key)
        创建key：_winreg.CreateKeyEx(key, sub_key[, res[, sam]])
        删除key: _winreg.DeleteKey(key,sub_key)
        删除键值： _winreg.DeleteValue(key,value)
        给新建的key赋值： _winreg.SetValue(key,sub_key,type,value)

        例子：
        import _winreg

        key=_winreg.OpenKey(_winreg.HKEY_CURRENT_USER,r"Software\Microsoft\Windows\CurrentVersion\Explorer")
        # 删除键(没有时会报错)
        _winreg.DeleteKey(key, "Advanced")
        # 删除键值(没有时会报错)
        _winreg.DeleteValue(key, "IconUnderline")
        # 创建新的项
        newKey = _winreg.CreateKey(key,"MyNewkey")
        # 给新创建的项，添加键值(会多一个项:ValueName, 默认的值是ValueContent)
        _winreg.SetValue(newKey,"ValueName", _winreg.REG_SZ, "ValueContent")

    3.  访问远程注册表
        # 第二参数必须是HKEY_CURRENT_USER、HKEY_LOCAL_MACHINE等预先定义好的值，拿到返回的key后就可以进行操作了
        key = _winreg.ConnectRegisty("IP地址或者机器名", _winreg.HKEY_CURRENT_USER)

    实例： 修改IE代理服务器
        import _winreg # python3 则写 winreg
        import ctypes

        #proxy = "127.0.0.1:8000"
        proxy = "http=127.0.0.1:8580;https=127.0.0.1:8580;ftp=127.0.0.1:8580" # 代理服务器地址
        ProxyOverride = '<local>;192.168.*;127.*' # 不使用代理服务器的IP段，或者域名段，可以用*代表任意长字符串,如: 192.168.*
        root = _winreg.HKEY_CURRENT_USER
        proxy_path = r"Software\Microsoft\Windows\CurrentVersion\Internet Settings"

        hKey = _winreg.OpenKey(root, proxy_path)
        # value 是代理是否开启的标志，0表示不使用代理，1表示使用
        value, type = _winreg.QueryValueEx(hKey, "ProxyEnable")
        if value: # value 为 0 时
            print("原本已使用代理")
        else:
            print("原本还没使用代理")

        # 修改代理设置
        hKey = _winreg.CreateKey(root, proxy_path)
        _winreg.SetValueEx(hKey, "ProxyEnable", 0, _winreg.REG_DWORD, 0) # 最后的参数是代理的开关，0为关闭代理，1为开启
        _winreg.SetValueEx(hKey, "ProxyServer", 0, _winreg.REG_SZ, proxy)
        # 不使用代理服务器的IP段，或者域名段，可以用*代表任意长字符串
        _winreg.SetValueEx(hKey, "ProxyOverride", 0, _winreg.REG_SZ, ProxyOverride)
        _winreg.SetValueEx(hKey, "MigrateProxy", 0, _winreg.REG_DWORD, 1) # 是否所有协议使用相同代理服务器: 0为否，1为是
        # 最后，关闭注册表连接
        _winreg.CloseKey(hKey)

        # IE Reload注册表的信息, 因为修改注册表之后, ie不会马上生效, 需要这一段； 但在win7系统似乎有点问题
        INTERNET_OPTION_REFRESH = 37
        INTERNET_OPTION_SETTINGS_CHANGED = 39
        internet_set_option = ctypes.windll.Wininet.InternetSetOptionW
        internet_set_option(0, INTERNET_OPTION_REFRESH, 0, 0)
        internet_set_option(0, INTERNET_OPTION_SETTINGS_CHANGED, 0, 0)


14. 修改注册表(使用 win32api, win32con 模块，需安装)
    1.  下载和安装模块： http://starship.python.net/crew/mhammond/downloads/
        下载像“pywin32-212.6.win32-py2.6.exe”来安装

    2.  注册表基本项
            项名                      描述
        HKEY_CLASSES_ROOT          是HKEY_LOCAL_MACHINE\Software 的子项，保存打开文件所对应的应用程序信息
        HKEY_CURRENT_USER          是HKEY_USERS的子项，保存当前用户的配置信息
        HKEY_LOCAL_MACHINE         保存计算机的配置信息，针对所有用户
        HKEY_USERS                 保存计算机上的所有以活动方式加载的用户配置文件
        HKEY_CURRENT_CONFIG        保存计算机的硬件配置文件信息

    3. 打开注册表
        win32api.RegOpenKey(key, subkey, reserved, sam)
        win32api.RegOpenKeyEx(key, subkey, reserved, sam)
        两个函数的参数用法一样。参数含义如下：
          Key：必须为表1中列出的项。
          SubKey：要打开的子项。
          Reserved：必须为0。
          Sam：对打开的子项进行的操作，包括 win32con.KEY_ALL_ACCESS、 win32con.KEY_READ、 win32con.KEY_WRITE 等

    4.  关闭注册表
        win32api.RegCloseKey(key)
        其参数只有一个，其含义如下：
          Key：已经打开的注册表项的句柄。

        如：
        key = win32api.RegOpenKey(win32con.HKEY_CURRENT_USER, 'Software', 0, win32con.KEY_READ)
        print key # 显示： <PyHKEY at 7670448 (220)>
        win32api.RegCloseKey(key)
        print key # 显示： <PyHKEY at 7670448 (0)>

    5.  读取项值
        win32api.RegQueryValue(key，subKey) # 读取项的默认值；其参数含义如下：
            Key：已打开的注册表项的句柄。
            subKey：要操作的子项。

        win32api.RegQueryValueEx(key，valueName) # 读取某一项值；其参数含义如下：
            Key：已经打开的注册表项的句柄。
            valueName：要读取的项值名称。

        win32api.RegQueryInfoKey(key)  # RegQueryInfoKey函数查询项的基本信息； 返回项的子项数目、项值数目，以及最后一次修改时间

      如：
        import win32api
        import win32con

        # 打开“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer”项
        key = win32api.RegOpenKey(win32con.HKEY_LOCAL_MACHINE,'SOFTWARE\\Microsoft\\Internet Explorer',0, win32con.KEY_ALL_ACCESS)

        # 读取项的默认值''
        # 输出为空，表示其默认值未设置
        print win32api.RegQueryValue(key,'')

        #读取项值名称为Version的项值数据，也就是Internet Explorer的版本
        print win32api.RegQueryValueEx(key,'Version') # 显示如：('6.0.2900.2180', 1)
        print win32api.RegQueryInfoKey(key)  # 查询项的基本信息,显示如：(26, 7, 128178812229687500L)

    6.  设置项值
        win32api.RegSetValue(key，subKey，type，value) # 设置项的默认值
            Key：已经打开的项的句柄。
            subKey：所要设置的子项。
            Type：项值的类型，必须为 win32con.REG_SZ。
            Value：项值数据，为字符串。

        win32api.RegSetValueEx(key，valueName，reserved，type，value) # 要修改或重新设置注册表某一项的项值。如果项值存在，则修改该项值，如果不存在，则添加该项值。
            Key：要设置的项的句柄。
            valueName：要设置的项值名称。
            Reserved：保留，可以设为0。
            Type：项值的类型。
            Value：所要设置的值。

      如：
        # 将“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer”的默认值设为python
        win32api.RegSetValue(key,'',win32con.REG_SZ,'python')
        # 修改“Version”的值
        win32api.RegSetValueEx(key,'Version',0,win32con.REG_SZ,'7.0.2900.2180')

    7.  添加、删除项
        win32api.RegCreateKey(key，subKey) # 向注册表中添加项
        win32api.RegDeleteKey(key，subKey) # 删除注册表中的项
        两个函数的参数用法一样。参数含义如下：
            Key：已经打开的注册表项的句柄。
            subKey：所要操作（添加或删除）的子项。

      如：
        # 向“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer”添加子项“Python”
        win32api.RegCreateKey(key,'Python') # 此时会多一个“HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\\Python”
        # 删除刚才创建的子项“Python”
        win32api.RegDeleteKey(key,'Python') # 没有此项时，会抛出错误

    实例： 修改IE代理服务器
        # 注意，新设置好的代理服务器，不会对之前已经开启的IE起效，只对之后开启的IE有效。
        import win32api
        import win32con
        # 打开“HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings”项；代理设置在注册表中的位置
        key = win32api.RegOpenKey(win32con.HKEY_CURRENT_USER, r'Software\Microsoft\Windows\CurrentVersion\Internet Settings', 0, win32con.KEY_ALL_ACCESS)
        # "ProxyEnable"=dword:00000001       ;是否启用代理服务器，dword:00000001表示开启，dword:00000000表示失效
        win32api.RegSetValueEx(key, 'ProxyEnable', 0, win32con.REG_DWORD, 1)
        # "ProxyServer"="192.168.0.1:8088"   ;代理服务器的地址和端口
        win32api.RegSetValueEx(key, 'ProxyServer', 0, win32con.REG_SZ, '127.0.0.1:8000')
        # "ProxyOverride"="192.168.*"        ;不使用代理服务器的IP段，或者域名段，可以用*代表任意长字符串
        win32api.RegSetValueEx(key, 'ProxyOverride', 0, win32con.REG_SZ, '192.168.*')

        # 想把IE代理去掉，如：
        win32api.RegSetValueEx(key, 'ProxyEnable', 0, win32con.REG_DWORD, 0)
        # 最后，关闭注册表连接
        win32api.RegCloseKey(key)


15. 多线程
  1、函数式：调用thread模块中的start_new_thread()函数来产生新线程。如：
    import time
    import thread

    def timer(no, interval):
        cnt = 0
        while cnt<10:
            print 'Thread:(%d) Time:%s\n'%(no, time.ctime())
            #time.sleep(interval)
            cnt += 1
        # 线程的结束可以等待线程自然结束，也可以在线程函数中调用 thread.exit() 或 thread.exit_thread() 方法。
        thread.exit_thread()

    def test():
        # 用 thread.start_new_thread() 来创建两个线程
        # thread.start_new_thread(function, args[, kwargs]) 的第一个参数是线程函数；第二个参数是传递给线程函数的参数，它必须是tuple类型；kwargs是可选参数
        thread1 = thread.start_new_thread(timer, (1,1))
        thread2 = thread.start_new_thread(timer, (2,2))
        print '开始运行\n'
        time.sleep(1) # 此处如果不睡的话会报错,因为主进程结束而子线程没结束
        print '运行结束'

    if __name__=='__main__':
        test()


  2、创建 threading.Thread 的子类来包装一个线程对象，如下例：
    import threading
    import time

    class timer(threading.Thread): #The timer class is derived from the class threading.Thread
        def __init__(self, num, interval):
            threading.Thread.__init__(self)
            self.thread_num = num
            self.interval = interval
            self.thread_stop = False

        def run(self): #Overwrite run() method, put what you want the thread do here
            while not self.thread_stop:
                print 'Thread Object(%d), Time:%s\n' %(self.thread_num, time.time())
                time.sleep(self.interval)

        def stop(self):
            self.thread_stop = True


    def test():
        thread1 = timer(1, 1)
        thread2 = timer(2, 2)
        thread1.start()
        thread2.start()
        time.sleep(10)
        thread1.stop()
        thread2.stop()
        return

    if __name__ == '__main__':
        test()


    threading.Thread类的使用：
    1，在自己的线程类的__init__里调用threading.Thread.__init__(self, name = threadname) # threadname 为线程的名字
    2， run()，通常需要重写，编写代码实现做需要的功能。
    3，getName()，获得线程对象名称
    4，setName()，设置线程对象名称
    5，start()，启动线程
    6，jion(timeout=None)，等待另一线程结束后再运行。如果给出timeout，则最多阻塞timeout秒
    7，setDaemon(bool)，设置子线程是否随主线程一起结束，必须在start()之前调用。默认为False。
    8，isDaemon()，判断线程是否随主线程一起结束。
    9，isAlive()，检查线程是否在运行中。
       此外threading模块本身也提供了很多方法和其他的类，可以帮助我们更好的使用和管理线程。可以参看http://www.python.org/doc/2.5.2/lib/module-threading.html。

http://www.cnblogs.com/tqsummer/archive/2011/01/25/1944771.html
http://blog.sina.com.cn/s/blog_4b5039210100esc1.html
http://sm4llb0y.blog.163.com/blog/static/18912397200981594357140/


16. 多进程 (从 2.6 起增加了子进程级别的并行开发支持 —— multiprocessing)
    #!/usr/bin/env python
    # -*- coding:utf-8 -*-

    import os, time
    from multiprocessing import *

    def test(x):
        print current_process().pid, x
        #time.sleep(1)

    if __name__ == "__main__":
        print "main:", os.getpid()
        p = Pool(5)
        p.map(test, range(13)) # 启动13个子进程
        time.sleep(1)

  1. Process
    我们先从最根本的 Process 入手，看看是如何启动子进程完成并行计算的。上面的 Pool 不过是创建多个 Process，然后将数据(args)提交给多个子进程完成而已。

    import os, time
    from multiprocessing import *

    def test(x):
        print current_process().pid, x
        time.sleep(1)

    if __name__ == "__main__":
        print "main:", os.getpid()
        p = Process(target = test, args = [100])
        p.start()
        p.join()


17. 进程监视(windows)
    # 定期监视某进程是否存在，不存在则执行
    import os,time

    def __Is_Process_Running(imagename):
        '''
           功能：检查进程是否存在
           返回：返回有多少个这进程名的程序在运行，返回0则程序不在运行
        '''
        p = os.popen('tasklist /FI "IMAGENAME eq %s"' % imagename) # 利用 windows 批处理的 tasklist 命令
        return p.read().count(imagename) # p 是个文件类型，可按文件的操作

    def test():
        '''
           功能：定期地监视测进程是否还在运行，不再运行时执行指定代码
        '''
        while True:
            time.sleep(10)
            pid = __Is_Process_Running('barfoo.exe')
            if pid <= 0:
                # code .....
                break

    if __name__ == "__main__":
        test()


18. 程序退出时执行
    # 注册 atexit 函数来解决
    # 如果中途关闭运行窗口，无法调用结束事件
    import threading
    import time
    import atexit

    def clean():
        print "clean temp data..."

    def test():
        for i in range(10):
            name = threading.currentThread().name
            print name, i
            # time.sleep(1)

    if __name__ == "__main__":
        atexit.register(clean) # 注册程序结束时执行的函数
        threading.Thread(target = test).start()
        time.sleep(1)

        exit(4) # quit() 和 exit() 会等待所有前台线程退出，同时会调用退出函数。
        import sys; sys.exit(4) # 和 exit / quit 作用基本相同。等待前台线程退出，调用退出函数。
        import os; os._exit(4) # os._exit() 通过系统调用来终止进程的，所有线程和退出函数统统滚蛋。

        time.sleep(1)
        print "Ho ..."

    import subprocess


18. 程序退出时执行
    # 通过 subprocess.Popen 函数来解决；但会发生问题，不知道内部是什么原因
    import subprocess
    proc = subprocess.Popen("python test.py")
    proc.wait()

    # 前面的程序结束后，才继续执行下面的代码
    test_file = open('test.txt', 'wb')
    test_file.write('hello') # 这里的写入偶尔会出问题，不知道原因
    test_file.close()


18. 程序退出时执行
    import os

    # 运行另外一个进程
    proxy_server = os.popen('cmd.exe /c start "" barfoo_proxy.exe')
    # 等待这个进程结束(其实是读取程序的输出，但程序如果一直不停止的话，就一直阻塞)，再往下执行
    proxy_server.read()

    # 前面的程序结束后，才继续执行下面的代码
    test_file = open('test.txt', 'wb')
    test_file.write('hello')
    test_file.close()


19. 杀掉进程(windows)
    def kill(pid):
        """ kill process by pid for windows """
        kill_command = "taskkill /F /T /pid %s" % pid
        os.system(kill_command)


20. 反射(自省)
    dir([obj]):                 调用这个方法将返回包含obj大多数属性名的列表（会有一些特殊的属性不包含在内）。obj的默认值是当前的模块对象。
    hasattr(obj, attr):         这个方法用于检查obj是否有一个名为attr的值的属性，返回一个布尔值。
    getattr(obj, attr):         调用这个方法将返回obj中名为attr的属性对象，或者名为attr的函数, 例如如果attr为'bar'，则返回obj.bar。
    setattr(obj, attr, val):    调用这个方法将给obj的名为attr的值的属性赋值为val。例如如果attr为'bar'，则相当于obj.bar = val。
    callable(obj):              如果传入的参数是可以调用的对象或函数，则返回 True, 否则返回 False 。

    例：
        # 测试类
        class Cat(object):
            def __init__(self, name='kitty'):
                self.name = name
            def sayHi(self): #  实例方法，sayHi指向这个方法对象，使用类或实例.sayHi访问
                print(self.name + 'says Hi!') # 访问名为name的字段，使用实例.name访问


        cat = Cat('kitty2')
        print(dir(cat)) # 获取实例的属性名，以列表形式返回
        if hasattr(cat, 'name'): # 检查实例是否有这个属性
            setattr(cat, 'name', 'tiger') # 相当于: cat.name = 'tiger'
        print(getattr(cat, 'name')) # 相当于: print(cat.name)

        getattr(cat, 'sayHi')() # 相当于: cat.sayHi()


        # 下面这段代码列出对象的所有函数或可调用的对象：
        methodList = [method for method in dir(cat) if callable(getattr(cat, method))]

        # globals() 返回一个map，这个map的key是全局范围内对象的名字，value是该对象的实例。
        globals().get('Cat')()  # 相当于执行: Cat();   注意，这用法需要导入相应的类，如果不导入，则会抛出异常。

        # 解决不能直接导入的问题，使用动态导入
        module = __import__('test_lib') # 导入模组, 多重的导入照样使用点运算符, 如: module = __import__('test_lib.test')
        parser = getattr(module, 'test_fun')  # 获取模组里面的对象,可以是函数或者属性或者类
        test_attr = getattr(module, 'test_attr')
        parser()  # 获取模组里面的对象如果是函数或者类，可直接调用
        print(test_attr) # 调用模组里面的属性
        print(dir(module)) # 列表模组里面的所有内容


    http://www.cnblogs.com/huxi/archive/2011/01/02/1924317.html
    http://blog.csdn.net/lokibalder/article/details/3459722


21. @符号修饰函数(有的语言称为:注释)
    python 2.4以后，增加了 @符号修饰函数 对函数进行修饰, python3.0/2.6又增加了对类的修饰。
    修饰符必须出现在函数定义前一行，不允许和函数定义在同一行。也就是说 @A def f(): 是非法的。

        class Person:
            def sayHi(self):  # self参数必须写，正常函数的写法
                print('Hello, how are you?')

            @staticmethod # 申明此方法是一个静态方法，外部可以直接调用
            def tt(a): # 静态方法，第一个参数不需要用 self
                print(a)

            def ff(self):
                self.sayHi() # 正常方法的调用
                self.tt('dd') # 静态方法的调用

        p = Person()
        p.ff() # 正常方法的调用: self参数不需赋值, 必须先 new 出一个类才可以用
        Person.tt('a', 'b') # 可以直接调用


    # 下面的效果类似于: dec1(dec2(test(arg)))
    @dec1
    @dec2
    def test1(arg):
        print(arg)

    #修饰函数还可以带参数, 效果类似于: dec1(arg1,arg2)(test(arg))
    @dec1(arg1,arg2)
    def test2(arg):
        pass


    范例：
    def accepts(*types):
        def check_accepts(f):
            assert len(types) == f.func_code.co_argcount
            def new_f(*args, **kwds):
                for (a, t) in zip(args, types):
                    assert isinstance(a, t), "arg %r does not match %s" % (a,t)
                return f(*args, **kwds)
            new_f.func_name = f.func_name
            return new_f
        return check_accepts

    def returns(rtype):
        def check_returns(f):
            def new_f(*args, **kwds):
                result = f(*args, **kwds)
                assert isinstance(result, rtype), "return value %r does not match %s" % (result,rtype)
                return result
            new_f.func_name = f.func_name
            return new_f
        return check_returns

    @accepts(int, (int,float))
    @returns((int,float))
    def func(arg1, arg2):
        return arg1 * arg2


http://www.python.org/dev/peps/pep-0318/
http://blog.csdn.net/pythoner/article/details/2823260


22. 垃圾回收
    import gc
    gc.collect() # 显示调用垃圾回收

    gc.disable() # 关闭垃圾回收,当程序需要大量内存时可调用这语句,避免频繁的垃圾回收而影响效率
    gc.enable()  # 开启垃圾回收


23. 利用 Python 搭建一个简单的 Web 服务器,快速实现局域网内文件共享。
    1. cd 到准备做服务器根目录的路径下(这目录下的文件将会被共享)
    2. 运行命令：
       python -m Web服务器模块[端口号，默认8000]
       这里的“Web服务器模块”有如下三种：
            BaseHTTPServer: 提供基本的Web服务和处理器类，分别是HTTPServer和BaseHTTPRequestHandler。
            SimpleHTTPServer: 包含执行GET和HEAD请求的SimpleHTTPRequestHandler类。
            CGIHTTPServer: 包含处理POST请求和执行CGIHTTPRequestHandler类。

       运行如: python -m SimpleHTTPServer 8080

    3. 可以在浏览器中访问:
       http://$HOSTNAME:端口号/路径








#############################################################
################## 内置变量 #################################

__all__
    这是一个字符串列表,定义在一个模块出口时使用 from <module> import * 将可以引用到什么变量,但对 import <module> 没有影响。
    没有定义此语句，则 import * 默认的行为是导入所有的符号不以下划线开始的对象。

    例如：
    a1.py 的内容如下:
    __all__=['b','c']
    a='aaa'
    b='bbb'
    c='ccc'

    b1.py 的内容如下:
    import a1
    from a1 import *
    print a1.a # 正常打印
    print b # 正常打印
    print a # 报错了,变量未定义


__call__
    类的调用
    只要定义类的时候，实现 __call__ 函数，这个类型就成为可调用的。
    换句话说，我们可以把这个类型的对象当作函数来使用，相当于 重载了括号运算符。


__del__
    del 类名 # 调用对象的 __del__ 方法


__doc__
    docstring

    例：
    print(Person.__doc__) # 打印类的docstring
    print(Person.func_name.__doc__) # 打印类的方法的docstring


__file__
    当前代码所在的Python模块的文件名。

    例：
    import os, sys
    print( os.path.dirname(os.path.realpath(__file__)) ) # 获取当前目录
    print( os.path.dirname(os.path.dirname(os.path.realpath(__file__))) ) # 获取上一层目录
    print( os.path.dirname(os.path.abspath(sys.argv[0])) ) # 获取当前目录, sys.argv[0] 与 __file__ 一样显示当前文件名
    print( os.getcwd() ) # 获取当前目录
    print( os.path.abspath(os.curdir) ) # 获取当前目录
    print( os.path.abspath( '. ') ) # 获取当前目录, 打印会加上点号，如： /home/holemar/project/ppf_web/.


__init__
    类的构造方法

    例：
    class Human(object):
        def __init__(self, name):
            print(name)

    class Person(Human): # Person 类继承 Human 类
        def __init__(self, name):
            self.name = name # 对象的变量,每个对象独立的
            super(Person, self).__init__(name)  # 调用父类的 __init__ 方法,但这样的调用要求父类必须继承 object 类,或者继承其它的类
            Human.__init__(self, "province") # 这样调用父类的 __init__ 方法也可以


__name__
    每个Python模块都有它的__name__，如果它是'__main__'，这说明这个模块被用户单独运行，我们可以进行相应的恰当操作。

    例:
    if __name__ == '__main__':
        print('This program is being run by itself')
    else:
        print('I am being imported from another module')


__version__
    版本信息

    例如:
    __version__ = '2.6.26'
    print( tuple(int(i) for i in __version__.split('.')) ) # 打印: (2, 6, 26)
    print( float(__version__) ) # 报错


运算符,如大于、小于、等于、加减乘除, 等等
    class Field(object):
        def __init__(self, value):
            self.value = value

        # 小于:  x < y, y > x
        def __lt__(self, value):
            print('__lt__ 被调用啦...')
            return self.value < value
        # 小于等于:  x <= y, y >= x
        def __le__(self, value):
            return self.value <= value
        # x > y, y < x
        def __gt__(self, value):
            return self.value > value
        # x >= y, y <= x
        def __ge__(self, value):
            return self.value >= value

        # 等于: x == y
        def __eq__(self, value):
            return self.value == value
        # 不等于:  x != y, x <> y
        def __ne__(self, value):
            return self.value != value

        # 加:  x + y
        def __add__(self, value):
            return str(self.value) + ' + ' + str(value)
        # y + x
        def __radd__(self, value):
            return str(value) + ' + ' + str(self.value)

        # 减: x - y
        def __sub__(self, value):
            return str(self.value) + ' - ' + str(value)
        # y - x
        def __rsub__(self, value):
            return str(value) + ' - ' + str(self.value)

        # 乘: x * y
        def __mul__(self, value):
            return str(self.value) + ' × ' + str(value)
        # y * x
        def __rmul__(self, value):
            return str(value) + ' × ' + str(self.value)

        # 除: x / y
        def __div__(self, value):
            return str(self.value) + ' ÷ ' + str(value)
        # y / x
        def __rdiv__(self, value):
            return str(value) + ' ÷ ' + str(self.value)
        # 整除: x // y
        def __floordiv__(self, value):
            return str(self.value) + ' // ' + str(value)
        # y // x
        def __rfloordiv__(self, value):
            return str(value) + ' // ' + str(self.value)
        # python2里面不知道怎么调用这个函数,但python3没有了 __div__,除的时候直接调用此函数
        def __truediv__(self, value):
            return str(self.value) + ' / ' + str(value)
        def __rtruediv__(self, value):
            return str(value) + ' / ' + str(self.value)

        # 单元运算符
        # ~x
        def __invert__(self):
            return '~' + str(self.value)
        # -x
        def __neg__(self):
            return '-' + str(self.value)
        # +x
        def __pos__(self):
            return '+' + str(self.value)

        # x[y]
        def __getitem__(self, value):
            return 'this[' + str(value) + ']'
        # x[y] = z
        def __setitem__(self, key, value)
            self[key] = value
        # del x[y]
        def __delitem__(self, value):
            del self[value]
        # x[y:z]
        def __index__(self, y, z):
            return self[y:z]
        # 遍历
        def __iter__(self):
            pass
        # y in x
        def __contains__(self, value): # in 判断,只能返回 True / False
            return False

        # x.name
        #def __getattribute__(self, value): # 覆盖此方法后,调用 self.value 会引起死循环
        #    return 'this.' + str(value)


        # 被特定函数调用时
        # len(x) ,返回值必须大于或等于0
        def __len__(self):
            return 1
        # str(x) ,返回值必须是字符串
        def __str__(self):
            return str(self.value)
        # unicode(x)
        def __unicode__(self):
            return unicode(self.value)

        # abs(x)
        def __abs__(self):
            return abs(self.value)
        # hash(x)
        def __hash__(self):
            return hash(self.value)
        # hex(x)
        def __hex__(self):
            return hex(self.value)

        # int(x)
        def __int__(self):
            return int(self.value)
        # long(x)
        def __long__(self):
            return long(self.value)
        # float(x)
        def __float__(self):
            return float(self.value)

        # oct(x)
        def __oct__(self):
            return oct(self.value)
        # cmp(x, y)
        def __cmp__(self, value):
            return cmp(self.value, value)
        # coerce(x, y)
        def __coerce__(self, value):
            return coerce(self.value, value)
        # divmod(x, y)
        def __divmod__(self, value):
            return divmod(self.value, value)
        # divmod(y, x)
        def __rdivmod__(self, value):
            return divmod(self.value, value)

        # pow(x, y[, z])
        def __pow__(self, value):
            return pow(self.value, value[, z])
        # pow(y, x[, z])
        def __rpow__(self, value):
            return pow(self.value, value[, z])
        # repr(x])
        def __repr__(self, value):
            return repr(self.value)
        # size of S in memory, in bytes
        def __sizeof__(self, value):
            return 1


    a = Field(32)
    print(a < 12)  # 调用 a 的 __lt__
    print(12 > a)  # 调用 a 的 __lt__
    print(a >= 17)
    print(a != 15)
    print(a == 32)
    print(a + 8)   # 调用 a 的 __add__
    print(8 + a)   # 调用 a 的 __radd__
    print(a * 8)   # 调用 a 的 __mul__
    print(8 * a)   # 调用 a 的 __rmul__
    print(a / 8)   # python2时, 调用 a 的 __div__； python3时调用 __truediv__

    print(~a)
    print(-a)
    print(+a)
    #print(a.name2)
    print(a['name3'])
    print('name' in a)

    print(len(a))  # 调用 a 的 __len__
    print(str(a))  # 调用 a 的 __str__


    运算符表：
     二元运算符   特殊方法
        +       __add__,__radd__
        -       __sub__,__rsub__
        *       __mul__,__rmul__
        /       __div__,__rdiv__,__truediv__,__rtruediv__
        //      __floordiv__,__rfloordiv__
        %       __mod__,__rmod__
        **      __pow__,__rpow__
        <<      _lshift__,__rlshift__
        >>      __rshift__,__rrshift__
        &       __and__,__rand__
        ^       __xor__,__rxor__
        |       __or__,__ror__
        +=      __iaddr__
        -=      __isub__
        *=      __imul__
        /=      __idiv__,__itruediv__
        //=     __ifloordiv__
        %=      __imod__
        **= 	__ipow__
        <<= 	__ilshift__
        >>= 	__irshift__
        &=      __iand__
        ^=      __ixor__
        |=      __ior__
        ==      __eq__
        !=,<> 	__ne__
        >       __gt__
        <       __lt__
        >=      __ge__
        <=      __le__


################## 内置变量 end #############################
#############################################################


#############################################################
################## 内置函数 #################################
__import__(name[, globals[, locals[, fromlist[, level]]]])
    被 import 语句调用的函数。它的存在主要是为了你可以用另外一个有兼容接口的函数 来改变 import 语句的语义.

abs(x)
    返回一个数的绝对值。参数也许是一个普通或长整型，或者一个浮点数。如果参数是一个复数，返回它的模。

all(iterable)
    如果迭代的所有元素都是真就返回真。版本2.5中新增.

any(iterable)
    如果迭代中有一个元素为真就返回真。版本2.5中新增.

basestring()
    这个抽象类型是str和unicode的父类。它不能被调用或初始化，但是它可以使用来测试一个对象是否是str或unicode的实例。 isinstance(obj, basestring)等价于 isinstance(obj, (str, unicode)) 版本2.3中新增.

bool([x])
    将一个值转换为 Boolean,使用标准的真测试程序。如果x是假或忽略了，将返回 False;否则将返回 True.bool也是一个 class，它是 int 的一个子类，bool类不能进一步子类化。它仅有 False 和 True 两个实例。

callable(object)
    如果 object 参数是可以调用的函数或者类就返回 True,否则返回 False 。返回 True,仍可能调用失败，但返回 False,就不可能调用成功。
    可调用对象包括函数、方法、代码对象、类和已经定义了“ __call__()”方法的类实例。
    如： a="123"; callable(a) 返回0;  callable(chr) 返回1

chr(i)
    返回一个ascii码是整数i的字符的字符串。例如: chr(97)返回'a'.这和 ord()刚好相反。这参数在[0..255]之间,全部包含。如果超出这个范围，就抛出 ValueError

classmethod(function)
    返回函数的一个类方法。一个类方法接收类作为它的第一个潜在参数，就像一个实例方法接收一个实例。
    类方法不同于C++或Java的静态方法。如果你想这样做，使用 staticmethod()。

cmp(x, y)
    根据比较两介对象x和y的结果，返回一个整数。如果x<y,返回-1,如果x==y,返回0，如果 x > y,根据比较结果返回一个正数.

coerce(number1, number2)
    (可以看成一个数值类型转换函数)有两个参数，都是数字，返回这两个数字的一个列表，将这两个数字的数据类型统一。python3去掉这函数。
    如: coerce(1,2j)，返回(1+0j,2j)

compile(string, filename, kind[, flags[, dont_inherit]])
    编译 string 为一个代码对象。代码对象能够通过 exec 语句执行或者通过调用 eval()计算。
    这filename参数指定代码从哪个文件读取。如果不从文件中读取，就须传递一些可识别的值(通常使用'<string>')。
    kind参数指定哪种代码被编译;如果是包含一系列语句组成的子符串可以‘exec’,如果是由一个表达式组成，就'eval',如果由一个交互语句组成就‘singlw’(在后面的例子，表达式语句计算的结果不是 None 将打印出来)。
    当编译一个多行语句时，应用两个警告：必须以' '作为行结束符，同时输入必须至少以一个' '作为结束。如果是以' '作为行结束，使用 string 的 repalce() 方法将其改为‘ ’.
    可先的参数flags和dont_inherit控制影响 string 编译的 future 语句。更详细的请参考英文文档。

complex([real[, imag]])
    可把字符串或数字转换为复数。
    创建一个复数real + imag*j或者将一个 string 或者 number 转化为一个复数.
    如果第一个参数是一个字符串,它将作为复数解释，函数将被调用，而忽略第二个参数。第二个参数不可能是一个字符串。每一个参数都可能是一个数字类型包括复数.如果imag省略了, 它默认为0，函数将当作一个数字转换函数像 int(), long() and float().如果参数都省略了，将返回0j.

delattr(object, name)
    与 setattr()相对的，参数是一个对象和一个 string. string 必须是对象的一个属性。函数删除object这个名为 string 的属性。例如: delattr(x, 'foobar')等价于 del x.foobar

dict([arg])
    返回一个字典。
    例如，下面所有返回都等价于{"one": 2, "two": 3}:
        dict({'one': 2, 'two': 3})
        dict({'one': 2, 'two': 3}.items())
        dict({'one': 2, 'two': 3}.iteritems())
        dict(zip(('one', 'two'), (2, 3)))
        dict([['two', 3], ['one', 2]])
        dict(one=2, two=3)
    版本2.2中新增.

dir([object])
    列出模块定义的标识符。标识符有函数、类和变量。
    当参数为一个模块名的时候，它返回模块定义的名称列表。如果不提供参数，它返回当前模块中定义的名称列表。
    注:因为 dir()主要在交互提示下方便使用，它尝试提供一给有意思的名字而不是尝试提供严格的或与定义一样的名字,在relrase中它的细节行为也许会改变。

divmod(a, b)
    函数完成除法运算，返回商和余数。
    如： divmod(10,3) 返回(3, 1); divmod(9,3) 返回(3, 0)

enumerate(iterable)
    返回 enumerate 对象. iterable 必须是一个序列, 一个迭代, 或者其它对象它支持迭代.
    enumerate()返回的 iterator 的 next()方法 返回一个元组包含一定的数目(从0开始)和从迭代中获取的对应的值。
    enumerate() 对于获取一个索引系列很有用: (0, seq[0]), (1, seq[1]), (2, seq[2]), .... 版本2.3中新增.

eval(expression[, globals[, locals]])
    该参数是一个字符串和可选的 globals 和 locals 。如果提供 globals,globals 必须是一个字典。如果提供 locals,locals 可以是任何映射对象。2.4版本修改：以前 locals 被要求是一个字典。
    expression参数是作为一个Python表达式被分析和评价(技术上来说，一个条件列表)使用 globals 以及 locals 字典作为 global 和 local 名字空间。
    如果提供了 globals 字典但没有'__builtins__'，当前 globals 在表达式被分析前被复制到 globals 中。这意味着表达式可以完全访问标准 __builtin__ 模块和受限的环境。如果 locals 字典省略则默认为 globals 字典。如果两个字典都被省略，表达式在调用 eval 的环境中执行。返回值是计算表达式的结果。语法错误报告为 exceptions 。
    此函数也可以用来执行任意代码的对象(如 compile()创建的)。在这种情况下，传入一个代码对象，而不是一个字符串。该代码对象必须已编译传给'eval'作为这种参数。
    提示： exec 语句支持是动态执行语句。 execfile()函数支持从一个文件中执行语句。 globals()和 locals()函数分别返回当前的 global 和 local 字典，这对使用 eval()或 execfile()很有帮助。

execfile(filename[, globals[, locals]])
    这个功能类似于 exec 语句，但分析一个文件，而不是一个字符串。这是不同之处在于它的 import 语句不使用模块管理 - 它无条件读取文件，并不会创建一个新的 module 。
    该参数是一个文件名和两个可选字典。该文件被作为Python语句序列(类似于一个模块)使用 globals 和 locals 作为 global and local 命名空间来分析和计算。如果提供 locals,locals 可以是任何映射对象。2.4版本修改：以前 locals 被要求是一个字典。如果 locals 字典省略则默认为全局字典。如果两个字典都被省略，表达式 execfile()被调用的环境中执行。返回值为 None 。

    警告：默认的locals为下面的locals()：不要尝试修改默认的本地词典。如果你需要看到在函数execfile()返回后locals代码的的影响，传递一个明确的locals字典。 execfile()不能用于依赖修改函数的locals。

file(filename[, mode[, bufsize]])
    文件类型的构造函数，`文件对象`。构造函数的参数与下面的内建的 open() 函数是一样的。
    当打开一个文件，它是最好使用的 open()，而不是直接调用此构造函数。文件更适合检验类型(例如，isinstance(f, file))。

filter(function, iterable)
    把一个函数应用于序列中的每个项，并返回该函数返回真值时的所有项，从而过滤掉返回假值的所有项。
    function 返回 True 时从iterable的元素中构造一个列表。迭代可以是一个序列，一个支持迭代的容器，或一个迭代器，如果Iterable的是一个字符串或一个元组，其结果也有这种类型的，否则它始终是一个列表。如果 function 是 None, 假定它是恒等函数，即，迭代是 False 其所有元素都被删除。
    请注意， filter(function,iterable)，如果函数不为 None 等价于[item for item in iterable if function(item)]，如果函数为 None 等价于[item for item in iterable if item]。

float( [x])
    将字符串或数字转换或一个浮点数。如果参数是一个字符串，它必须包含一个可能带符号的十进制或浮点数，可能嵌入空格。否则，参数可以是一个普通或长整数或浮点数，返回一个与之相同值的浮点数(在Python的浮点精度内)。如果没有给出参数，返回0.0。
    注意：当传递一个字符串，可能会返回 NaN 和 Infinity，这取决于底层C库。

float(x)
    把一个数字或字符串转换成浮点数。

frozenset([iterable])
    返回一个frozenset对象，其元素来自于Iterable。 Frozensets组没有更新的方法，但可以哈希和其他组成员或作为字典键使用。一个frozenset的元素必须是不可改变。内部sets也应是frozenset对象。如果迭代没有指定，返回一个新的空集，frozenset ([])。 版本2.4中新增

getattr(object, name[, default])
    返回object名为name属性的值。名称必须是一个字符串。如果该字符串是对象的其中属性名字，结果是该属性的值。例如，getattr(x, 'foobar')相当于x.foobar。如果指定的属性不存在，则返回默认提供的，否则抛出AttributeError。

globals()
    返回代表当前 global 符号表字典的字典。这始终是当前模块字典(在一个函数或方法内，是在它被定义的模块，而不是被调用的模块)。

hasattr(object, name)
    该参数是一个对象和一个字符串。如果字符串是对象的其中一个属性，结果为 True,如果没有返回 False 。 (这是通过调用的 getattr(对象名称)，看是否引发异常与否。)

hash(object)
    返回对象(如果有的话)的哈希值。哈希值是整数。它们被用来在词典查找时，作为一个快速比较字典keys键。具有相同的哈希值，数值相等(即使它们属于不同的类型，因为是1和1.0的情况)。

help([object])
    调用内置的帮助系统。(此功能是为交互使用。)如果没有给出参数，交互式帮助系统启动解释控制台。如果参数是一个字符串，然后是字符串被作为一个module，function，class，method，keyword或文档主题名称和帮助页面名字进行查找后在控制台上打印出来。如果参数是任何其他类型的对象，将产生该对象的一个帮助页面。 版本2.2中新增.

hex(x)
    转换一个(任意大小)整数为十六进制字符串。其结果是一个有效的Python表达式。在2.4版本变更：原只产生一个无符号的文字。

id(object)
    返回对象的内存地址。
    这是一个整数(或长整型)，这是保证是唯一的，与对象的生命周期一样长。两个非重叠的生命周期的对象可能有相同的 ID 值。

input([prompt])
    警告：此函数是不安全的，因为用户错误的输入！它期待一个有效的Python表达式作为输入，如果输入语法上是无效的，将抛出SyntaxError。如果地计算过程中有一个的错误，将抛出其他exceptions。 (另一方面，有时这是你为特殊使用需要写一个快速脚本。)
    如果readline模块被加载，input()将使用它来提供详细行编辑和历史特性。
    考虑使用 raw_input() 函数作为从用户进行一般输入。
    python3.x 开始有所变化

int([x[, radix]])
    转换为字符串或数字为纯整数。如果参数是一个字符串，它必须包含一个可能有符号的十进制数作为一个Python整数，可能嵌入空格。
    以radix参数给出的基数为基础进行转换(这是默认10)，可以是任何在[2，36]范围内的整数，或零。如果基数为零，根据字符串的内容猜测正确的基数。如果指定的基数x是不是一个字符串，引发TypeError异常。否则，参数可以是一个普通或长整数或浮点数。转换浮点数截断为整数(直到零)。如果参数是整数范围之外的，将返回一个long object。如果没有给出参数，返回0

isinstance(object, classinfo)
    测试对象类型。返回 True 如果该object参数是classinfo的一个实例，或其(直接或间接)子类的实例。也返回 True 如果classinfo是一种type对象(new-style class)和是该类型或其(直接或间接)子类的对象。如果object不是class一个的实例或者给定类型的对象，函数返回 False 。如果 classinfo 既不是一个类的对象也不是一个 type 的对象，它可能是一个包含类或类型的对象的 tuple, 也可能包含其他的递归元组(序列类型不接受)。如果 classinfo 不是一个类，类型或元组类，类型，或者这种元组，将抛出一个 TypeError 异常。
    自: type(obj) is classinfo 等效于 isinstance(object, classinfo)
    type(obj) in (int, long, float) 等效于 isinstance(object, (int, long, float)) # 多种类型的判断

issubclass(class, classinfo)
    返回true如果class是classinfo(直接或间接)的子类。一个类被认为是自己的子类。 classinfo可能是类对象元组，在这种情况下元组中的每个classinfo项将被进行测试。在其他任何情况下，抛出一个TypeError异常。

iter(o[, sentinel])
    返回一个迭代器对象。第一个参数有不同的解释，视第二个参数的存在与否而定。如果没有第二个参数，o必须是一个对象的集合，支持迭代协议(__iter__()方法)，或者它必须支持序列协议(以整数0开始的参数__getitem__()方法)。如果它不支持这些协议，将抛出TypeError异常。如果第二个参数，sentinel，给出，然后o必须是可调用的对象。在这种情况下创造的每一个迭代器无参调用o它的 next()方法，如果返回值等于sentinel，将抛出StopIteration，否则将返回其它的值。

len(s)
    返回一个对象的长度。参数可以是一个序列(字符串，元组或列表)或映射(词典)。

list([iterable])
    返回一个列表的items与可迭代的项目相同的顺序且相同的items。
    iterable 可以是一个序列，一个容器，支持迭代，或一个迭代器对象。如果 iterable 已经是一个列表，将返回一个副本，类似的于iterable[:]。
    例如，list('abc')返回['a', 'b', 'c']和list( (1, 2, 3) ) 返回[1，2，3]。如果没有给出参数，返回一个新的空列表，[]。

locals()
    更新并返回一个代表当前local符号表的字典。警告：本词典的内容不应该被修改，更改可能不会影响由interpreter用作局部变量的值。

long([x[, radix]])
    转换字符串或数字为一个长整数。如果参数是一个字符串，它必须包含一个任意大小的可能有符号的数字，并有可能嵌入空格。radix参数解释和int()一样，而且只能当x是一个字符串时才需要它。否则，参数可以是一个普通或长整数或浮点数，返回与其相同值的长整数。转换浮点数到截断的整数(直到零)。如果没有给出参数，返回0L。

map(function, iterable, ...)
    应用function在iterable的每一个项上并返回一个列表。如果有其他可迭代的参数，函数必须采取许多参数应用于来自所有iterables项。如果一个迭代比另一个短，将以None进行扩展。如果function是None，将假设为identity function，如果有多个参数，map()返回一个列表包含所有iterables相应的项目的元组组成。可迭代的参数可能是一个序列或任何可迭代的对象，结果总是一个列表。

max(iterable[, args...][key])
    一个Iterable参数，返回其中一个最大的非空可迭代项，(如一个字符串，元组或列表)。如有多个参数，返回最大的参数。
    可选的key参数指定带一个参数的排序函数，用于list.sort()。key参数，如果有，必须在以keyword的形式(例如，"max(a,b,c,key=func)")。

min(iterable[, args...][key])
    一个Iterable参数，返回其中一个最小的非空可迭代项，(如一个字符串，元组或列表)。如有多个参数，返回最小的参数。
    可选的key参数指定带一个参数的排序函数，用于list.sort()。key参数，如果有，必须在以keyword的形式(例如，"max(a,b,c,key=func)")。

object()
    返回一个新特征的对象。object是所有new style class的基类。它的方法是新样式类的所有实例共有的。

oct(x)
    转换一(任意大小)整数到一个八进制字符串。其结果是一个有效的Python表达式。

open(filename[, mode[, bufsize]])
    打开一个文件，返回一个在3.9节中描述的文件类型的对象，`File Objects'。如果文件无法打开，IOError异常引发。当打开一个文件，最好调用open()，而不是直接用file构造。
    前两个参数与stdio的 fopen()函数一样：filename是要打开的文件名，mode是一个字符串，表示该文件是如何被打开。
    mode，最常用的值是'r'读，'w'写(文件如果已存在就截断)，和'a'追加(在一些Unix系统意味着所有写入追加到文件尾部，无论其现在的seek位置)。如果模式被省略，默认为'r'等。当打开一个二进制文件，你应该模式值加上'b'，打开二进制模式，从而提高可行性。 (在某些不区分二进制文件和文本文件的系统追加‘b’，，它将作为文档)。下面是mode的可能值：
    可选bufsize参数指定文件的所需缓冲区大小：0表示无缓冲，1表示行缓冲，任何其他的正数使用其大小(在约)的一个缓冲区。负数bufsize，使用系统默认，这tty设备通常使用行缓冲和其他文件的完全缓冲。如果省略，使用系统默认。
    模式'r+', 'w+'和'a+'打开文件进行更新(请注意，'w+'截断该文件)。附加'b'的模式在区分二进制和文本文件的系统上以二进制方式打开文件，系统上没有这个区别，加入了'b'没有效果。

ord(c)
    返回一个字符串参数的ASCII码或Unicode值。给定一个长度为1的字符串，返回一个整数，当参数是一个Unicode对象，代表字符的 Unicode 代码，或参数是一个8位字符串，代表其字节值。
    例如，ord('a')返回整数97，ord(u'\u2020')返回8224。这是8位串chr()和用于Unicode对象的unichr()的逆函数。如果给出Unicode参数和Python是UCS2 Unicode的，字符的代码点必须在范围[0 .. 65535]内，否则字符串的长度是2，抛出一个 TypeErro 。

pow(x, y[, z])
    返回x的Y次方，如果给出z，返回x的y次方，模Z(比pow(x, y) % z更有效)的。这两个参数的形式pow(x, y)，相当于：x ** y

property([fget[, fset[, fdel[, doc]]]])
    返回一个new-style类(从object派生的类)的属性。
    fget是一个获取属性值的function，同样fset是设置属性值的function，fdel为删除属性的函数。典型的用途是定义一个托管属性x：

range([start,] stop[, step])
    函数可按参数生成连续的有序整数列表。
    这是一个通用函数来创建包含算术级数的列表，这是经常使用于循环。该参数必须是普通整数。如果step参数被省略，默认为1。如果省略start参数，默认为0。完整形式是返回一个普通整数列表[start, start + step, start + 2 * step, ...]。step不能为零(否则引发ValueError)。

raw_input([prompt])
    如果prompt参数存在，它被写入到标准输出，结尾没有换行。然后函数从输入行读取，将其转换为一个字符串(去掉换行)，后返回。当为EOF，抛出EOFError。例如：
    如果的ReadLine模块被加载，然后raw_input()将使用它来提供详细行编辑和历史特性。

reduce(function, iterable[, initializer])
    使用带两参数的函数从左到右计算iterable的项，reduce这iterable得到一个数字。(累计计算结果，直到计算完所有项)
    例如: reduce(lambda x, y: x+y, [1, 2, 3, 4, 5]) 就是计算 ((((1+2)+3)+4)+5)。
    左参数x，是累加值和右边的参数，y，是iterable中更新的值。如果可选的initializer存在，在计算中摆在可迭代的项的前面，当iterable为空时，作为默认。如果没有给出initializer，则只包含一项，返回第一项。

reload(module)
    重新导入先前导入的模块。该参数必须是一个模块对象，因此它之前必须已成功导入。如果您使用外部编辑器编辑源文件的模块，并想不离开Python解释器尝试新版本,这是有用的。返回值是模块对象(与module参数相同的值)。

repr(object)
    返回一个字符串，其中包含一个对象的可打印形式。有时是对能够访问一个普通的函数的操作很有用。对于许多类型，该函数使得试图返回一个字符串，会产生一个对象与传递给 eval() 相同的值产生的对象一样。

reversed(seq)
    返回一个反向迭代器。seq必须是一个支持序列协议的对象(__len__()方法和__getitem__()以0开始的整数参数的方法) 版本2.4中新增

round(x[, n])
    返回浮点值x四舍五入到小数点后n位后数字。如果n被省略，默认为零。结果是一个浮点数。

set([iterable])
    返回其元素都是从iterable得到的set。元素必须是不可改变的。如果iterable没有指定，返回一个新的空集，设置([]). 版本2.4中新增

setattr(object, name, value)
    与getattr()相对应。该参数是一个对象，一个字符串和一个任意值。该字符串可以是现有属性名称或一个新的属性。函数分配给该属性值，只要该对象允许的话。例如，setattr(x, 'foobar', 123)，相当于x.foobar = 123。

slice([start,] stop[, step])
    返回一个切片对象，它表示的是range(start, stop, step)指定的范围。start和step参数默认为None。切片对象有只读数据属性start，stop和step，它只是返回参数值(或默认)。没有其他明确的功能，但它们的作为数值Python和其他第三方扩展使用。当使用扩展索引语法时也产生切片对象。例如：“a[start:stop:step]”或“a[start:stop, i]”。

sorted( iterable[, cmp[, key[, reverse]]])
    返回一个新的排序的列表，包含Iterable的项。
    可选参数cmp，key，reverse与list.sort()具相同涵义(详见第3.6.4)。
    cmp指定带两个参数(Iterable的元素)，返回自一个负数，零或正数的函数“cmp=lambda x,y: cmp(x.lower(), y.lower())“。
    key指定带一个参数的函数，用来从列表每个元素中提取一个比较key：“key=str.lower”
    reverse是一个布尔值。如果设置为True，则对列表中的元素进行排序，同时每一次比较都是逆向的。
    一般而言，key和reverse转换过程是远远快于指定一个相当于cmp的功能。这是因为cmp是为每个列表元素调用很多次，而key和reverse接触每个元素只有一次。
    版本2.4中新增

staticmethod( function)
    函数返回一个静态方法。静态方法没有接收一个隐含的第一个参数。要声明一个静态方法，如下：
    class C:
        @staticmethod
        def f(arg1, arg2, ...): ...

    @staticmethod 形式 是一个function decorator
    它即可以在类上如C.f()进行调用，也可以在实例上，如：C().f()。实例被忽略，除了类。
    在Python静态方法类似于Java或C++的。对于更先进的概念，见classmethod()。

str([object])
    返回对象的可打印字符串。对于字符串，这将返回字符串本身。
    与 repr(object)不同的是， str(object)并不总是试图返回一个 eval()可以接受的字符串，其目标是返回一个可打印字符串。如果没有给出参数，返回空字符串''。

sum(iterable[, start])
    求start和可迭代的从左至右的项和并返回总和。start默认为0。在可迭代的项，通常是数字，不能是字符串。快速，正确的连接的字符串序列的方法是通过调用''.join(sequence)。注意sum(range(n), m)相当于reduce(operator.add, range(n), m)。 版本2.3中新增.

super(type[, object-or-type])
    返回类型的超类。如果第二个参数被省略，返回的超级对象是未绑定。如果第二个参数是一个对象，isinstance(obj, type)必须是true。如果第二个参数是一个类型，issubclass(type2, type)必须是true。super() 只能用于新型类。
    请注意，super是作为显式的点属性绑定过程查找的一部分，例如“super(C, self).__getitem__(name)”。因此，super是未定义对于使用语句或操作进行隐式的查找，如“super(C, self)[name]”。 版本2.2中新增.

tuple([iterable])
    把序列对象转换成 tuple 。返回一个元组的items与可迭代的iterable是相同的且有相同的顺序。iterable可能是一个序列，容器支持迭代，或迭代器对象。如果iterable是元组，直接返回。
    例如，tuple('abc')返回('a', 'b', 'c') 和tuple([1, 2, 3])返回(1, 2, 3)。如果没有给出参数，返回一个新的空元组，()。

type(object)
    返回对象的类型。返回值是一个类型对象。

type(name, bases, dict)
    返回一个新的类型的对象。这基本上是类声明的动态形式。该name字符串是类名，成为__name__的属性;bases元组详细列明了基类，并成为__bases__的属性，以及dict字典是命名空间定义为类体，成为 __dict__ 属性。
    版本2.2中新增.

unichr(i)
    返回一个Unicode码为整数i的字符的Unicode字符串。例如，unichr(97)返回字符串u'a'。这是Unicode字符串的 ord()的逆函数。参数的有效范围取决于Python如何被配置 - 它可以是UCS2 [0 .. 0xFFFF的]或UCS4 [0 .. 0x10FFFF]。否则引发ValueError。 版本2.0中新增

unicode([object[, encoding [, errors]]])
    返回object的Unicode版本字符串，使用下列方式之一：
    如果给出encoding和/或errors，Unicode()将解码可以是一个8位字符串或使用encoding解码器字符缓冲区的对象。编encoding参数是一个编码名称的字符串;如果encoding不知道，抛出LookupError。错误处理是根据errors，errors指定字符是在输入编码无效时的处理方案。如果错误是'strict'(默认)，引发ValueError，而'ignore'将忽略错误，以及'replace'值的导致官方Unicode替换字符，U+FFFD，用来取代输入的不能解码的字符。另见编解码器模块。
    如果没有可选参数，Unicode()将模仿 str()，但它返回Unicode字符串，而不是8位字符串。更确切地说，如果对象是一个Unicode字符串或其子类将返回不带任何附加解码的Unicode字符串。
    对于对象提供 __unicode__()方法，它将不带参数调用这种方法来创建一个Unicode字符串。对于其他所有对象，8位字符串版本或请求representation，使用编码'strict'模式的默认编解码器转换为Unicode字符串。

vars([object])
    如果没有参数，根据现在的local符号表返回一个字典。如果是一个模块，类或类的实例对象作为参数(或其它任何有__dict__属性)，根据对象的符号表返回一个字典。返回的字典不应被被修改：在相应符号表上的影响是未定义的。

xrange([start,] stop[, step])
    与 range()类似，但 xrnage()并不创建列表，而是返回一个xrange对象，它的行为与列表相似，但是只在需要时才计算列表值，当列表很大时，这个特性能为我们节省内存。
    这个功能非常类似于range()，但返回一个'xrange object'而不是一个列表。这是一个不透明的序列类型，包含相应的列表相同的值而实际上没有储存这些值。xrange的优势()比range()是很小的(xrange()还是要创造请求的值)，除非使用一个非常大的范围内存的机器或所有元素从来没有使用过(例如循环通常是被打破终止的)。
    注：xrange()是为了简单和快速而设计的。施加了一定的限制，以实现这一目标。 Python的C语言实现限制所有参数的为native C longs(“short”Python整数)，并要求在这些elements都与native C long兼容。

zip([iterable, ...])
    把两个或多个序列中的相应项合并在一起，并以元组的格式返回它们，在处理完最短序列中的所有项后就停止。
    例如： zip([1,2,3],[4,5],[7,8,9])  返回： [(1, 4, 7), (2, 5, 8)]
    如果参数是一个序列，则zip()会以一元组的格式返回每个项，如：
    zip([1,2,3,4,5])  返回： [(1,), (2,), (3,), (4,), (5,)]
    不带参数，它返回一个空列表。


