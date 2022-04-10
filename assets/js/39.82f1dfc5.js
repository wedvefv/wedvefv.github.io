(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{435:function(s,a,t){"use strict";t.r(a);var n=t(56),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"dll导出方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dll导出方法"}},[s._v("#")]),s._v(" DLL导出方法")]),s._v(" "),t("h2",{attrs:{id:"dll导出方法1"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dll导出方法1"}},[s._v("#")]),s._v(" dll导出方法1 ：")]),s._v(" "),t("p",[s._v("模块定义def文件，不支持c++的重载，以c的方式编译，导出的函数名不被修改，这样\n显示调用dll取得函数地址就没事。提供给vb，python等语言,需要_stdcall约定(函数自己清理堆栈)，这样无论是c文件还是c++文件，导出函数都会被改名字。所以dll做成必须要用def文件，否则找不到名字。除非你记得\n修饰过的函数名。")]),s._v(" "),t("h2",{attrs:{id:"dll导出方法2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dll导出方法2"}},[s._v("#")]),s._v(" dll导出方法2：")]),s._v(" "),t("p",[s._v("函数声明头文件声明如下：\n__declspec(dllexport)这种方式，方便c++代码的重载，同名函数不同参数，导出名字会被修饰，所以能区分开。\n这种方式实现了DLL的隐式调用（只提供dll的导出符号lib文件，就可直接调用函数，（只是导出函数符号，没有具体实现，\n不同于静态库的lib文件），def文件导出的dll不能用隐式调用，只能取得函数地址getProcAddress方式）")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("ifndef")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("_EXSOPINF_H_")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("_EXSOPINF_H_")])]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("ifdef")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__cplusplus  ")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//cpp文件时，用c方式编译导出，不会修改导出函数名。但是_stdcall")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//调用也会修改，_cdecl(默认)调用不会修改")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extern")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"C"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("__declspec")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("dllexport"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" DWORD WINAPI "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("function1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" LPCSTR lpszFolderName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" LPSTR lpszCode "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("__declspec")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("dllexport"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" DWORD WINAPI "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("function2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" LPCSTR lpszFolderName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" LPSTR lpszCode "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("ifdef")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__cplusplus")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n函数定义时，也需要在函数名前：加入修饰\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("__declspec")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("dllexport"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" DWORD WINAPI "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("function1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("LPCSTR lpszFolderName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" LPSTR lpszCode "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n其中WINAPI是调用约定。\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br")])]),t("h2",{attrs:{id:"常见调用约定"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见调用约定"}},[s._v("#")]),s._v(" 常见调用约定")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("\n调用协议常用场合\n__stdcall：Windows API默认的函数调用协议。\n__cdecl：C"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("C"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),s._v("默认的函数调用协议。\n__fastcall：适用于对性能要求较高的场合。\n函数参数入栈方式\n__stdcall：函数参数由右向左入栈。\n__cdecl：函数参数由右向左入栈。\n__fastcall：从左开始不大于"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("字节的参数放入CPU的ECX和EDX寄存器，其余参数从右向左入栈。\n问题一：__fastcall在寄存器中放入不大于"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("字节的参数，故性能较高，适用于需要高性能的场合。\n栈内数据清除方式\n__stdcall：函数调用结束后由被调用函数清除栈内数据。\n__cdecl：函数调用结束后由函数调用者清除栈内数据。\n__fastcall：函数调用结束后由被调用函数清除栈内数据。\n问题一：不同编译器设定的栈结构不尽相同，跨开发平台时由函数调用者清除栈内数据不可行。\n问题二：某些函数的参数是可变的，如printf函数，这样的函数只能由函数调用者清除栈内数据。\n问题三：由调用者清除栈内数据时，每次调用都包含清除栈内数据的代码，故可执行文件较大。\nC语言编译器函数名称修饰规则\n__stdcall：编译后，函数名被修饰为“_functionname@number”。\n__cdecl：编译后，函数名被修饰为“_functionname”。\n__fastcall：编译后，函数名给修饰为“@functionname@nmuber”。\n注：“functionname”为函数名，“number”为参数字节数。\n注：函数实现和函数定义时如果使用了不同的函数调用协议，则无法实现函数调用。\nC"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),s._v("语言编译器函数名称修饰规则\n__stdcall：编译后，函数名被修饰为“"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v("functionname@@YG"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("@Z”。\n__cdecl：编译后，函数名被修饰为“"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v("functionname@@YA"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("@Z”。\n__fastcall：编译后，函数名被修饰为“"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),s._v("functionname@@YI"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("@Z”。\n注：“"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v("”为函数返回值类型和参数类型表。\n注：函数实现和函数定义时如果使用了不同的函数调用协议，则无法实现函数调用。\nC语言和C"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),s._v("语言间如果不进行特殊处理，也无法实现函数的互相调用。\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br")])]),t("h2",{attrs:{id:"stdcall与-cdecl的区别-函数调用方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#stdcall与-cdecl的区别-函数调用方式"}},[s._v("#")]),s._v(" _stdcall与_cdecl的区别(函数调用方式)")]),s._v(" "),t("p",[s._v("(1). 是C Declaration的缩写，表示C语言默认的函数调用方法，实际上也是C++的默认的函数调用方法。\n(2). 所有参数从右到左依次入栈，这些参数由调用者清除，称为手动清栈。具体所示：调用方的函数调用->被调用函数的执行->被调用函数的结果返回->调用方清除调整堆栈。\n(3). 被调用函数无需要求调用者传递多少参数，调用者传递过多或者过少的参数，甚至完全不同的参数都不会产生编译阶段的错误。总的来说函数的参数个数可变的(就像printf函数一样)，因为只有调用者才知道它传给被调用函数几个参数，才能在调用结束时适当地调整堆栈。\n(4). 因为每个调用的地方都需要生成一段调整堆栈的代码，所以最后生成的文件较大。")]),s._v(" "),t("h3",{attrs:{id:"stdcall-callback-winapi"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#stdcall-callback-winapi"}},[s._v("#")]),s._v(" _stdcall(CALLBACK/WINAPI)")]),s._v(" "),t("p",[s._v("(1). 是Standard Call的缩写，要想函数按照此调用方式必须在函数名加入_stdcall，通常_ win32 api 应该是_stdcall调用规则。通过VC++编写的DLL欲被其他语言编写的程序调用，应将函数的调用方式声明为_stdcall 方式，WINAPI都采用这种方式。\n(2).  所有参数从右到左依次入栈，如果是调用类成员的话，最后一个入栈的是this指针。具体所示：调用方的函数调用->被调用函数的执行-> 被调用方清除调整堆栈->被调用函数的结果返回。\n(3).  这些堆栈中的参数由被调用的函数在返回后清除，使用的指令是 retn X，X表示参数占用的字节数，CPU在ret之后自动弹出X个字节的堆栈空间。称为自动清栈。\n(4).  函数在编译的时候就必须确定参数个数，并且调用者必须严格的控制参数的生成，不能多，不能少，否则返回后会出错。总的来说，就是函数的参数个数不能是可变的。是从 _cdecl 修改而来, _stdcall 不支持可变参数,并且清栈由被调用者负责,其他的都一样\n(5).  因为只需在被调用函数的地方生成一段调整堆栈的代码，所以最后生成的文件较小。")]),s._v(" "),t("p",[s._v("PASCAL 是Pascal语言的函数调用方式，也可以在C/C++中使用，参数压栈顺序与前两者相反。返回时的清栈方式忘记了。。。")]),s._v(" "),t("p",[s._v("_fastcall 是编译器指定的快速调用方式。由于大多数的函数参数个数很少，使用堆栈传递比较费时。因此_fastcall通常规定将前两个（或若干个）参数由寄存器传递，其余参数还是通过堆栈传递。不同编译器编译的程序规定的寄存器不同。返回方式和_stdcall相当。")]),s._v(" "),t("p",[s._v("_thiscall 是为了解决类成员调用中this指针传递而规定的。_thiscall要求把this指针放在特定寄存器中，该寄存器由编译器决定。VC使用ecx，Borland的C++编译器使用eax。返回方式和_stdcall相当。")]),s._v(" "),t("p",[s._v("_fastcall 和 _thiscall涉及的寄存器由编译器决定，因此不能用作跨编译器的接口。所以Windows上的COM对象接口都定义为_stdcall调用方式。")]),s._v(" "),t("p",[s._v("C中不加说明默认函数为_cdecl方式（C中也只能用这种方式），C++也一样，但是默认的调用方式可以在IDE环境中设置。")]),s._v(" "),t("p",[s._v("带有可变参数的函数必须且只能使用_cdecl方式，例如下面的函数:\nint printf(char * fmtStr, ...);")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("  int scanf(char * fmtStr, ...);\n")])])]),t("h3",{attrs:{id:"函数名修饰"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#函数名修饰"}},[s._v("#")]),s._v(" 函数名修饰")]),s._v(" "),t("p",[s._v("(1). _cdecl ：对于_cdecl而言，如果对于定义在C程序文件(编译器会通过后缀名为.C判断)的输出函数，函数名会保持原样；对于定义在C++程序文件中的输出函数，函数名会被修饰(见10)。为使函数名不被修饰，有两种方法：A.可通过在前面加上extern “c”以去除函数名修饰；B. 可通过.def文件去除函数名修饰。")]),s._v(" "),t("p",[s._v("(2). _stdcall：无论是C程序文件中的输出函数还是C++程序文件中的输出函数，函数名都会被修饰。对于定义在C++程序文件中的输出函数，好像更复杂，和_cdecl的情况类似。去除函数名修饰方法：只能通过.def文件去除函数名修饰。")]),s._v(" "),t("h3",{attrs:{id:"函数名修饰规则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#函数名修饰规则"}},[s._v("#")]),s._v(" 函数名修饰规则：")]),s._v(" "),t("p",[s._v("(1). 为什么要函数名修饰：\n函数名修饰就是编译器在编译期间创建的一个字符串，用来指明函数的定义和原型。LINK程序或其他工具有时需要指定函数的名字修饰来定位函数的正确位置。多少情况下程序员并不需要知道函数的名字修饰，LINK程序或其他工具会自动区分他们。当然，在某些情况下需要指定函数名修饰，例如在c++程序中，为了让LINK程序或其他工具能够匹配到正确的函数名字，就必须为重载函数后一些特殊函数(如构造函数和析构函数)指定名字修饰。另一种需要指定函数名修饰的情况是在汇编程序中调用C或C++函数。\n(2). C语言：\n对于_stdcall调用约定，编译器和链接器会在输出函数名前加上一个下划线前缀，函数名后面加上一个“@”符号和其参数的字节数，例如_functionname@number。_cdecl调用约定仅在输出函数名前加上一个下划线前缀，例如_functionname。_fastcall调用约定在输出函数名前加上一个 “@“符号，后面也是一个”@“符号和其参数的字节数，例如@functionname@number。\n(3). C++语言：\nC++的函数名修饰规则有些复杂，但是信息更充分，通过分析修饰名不仅能够知道函数的调用方式，返回值类型，参数个数甚至参数类型。不管__cdecl，__fastcall还是__stdcall调用方式，函数修饰都是以一个“?”开始，后面紧跟函数的名字，再后面是参数表的开始标识和按照参数类型代号拼出的参数表。对于__stdcall方式，参数表的开始标识是“@@YG”，对于__cdecl方式则是“@@YA”，对于__fastcall方式则是“@@YI”。参数表的拼写代号如下所示：\nX--void\nD--char\nE--unsigned char\nF--short\nH--int\nI--unsigned int\nJ--long\nK--unsigned long（DWORD）\nM--float\nN--double\n_N—bool\nU—struct")]),s._v(" "),t("p",[s._v("指针的方式有些特别，用PA表示指针，用PB表示const类型的指针。后面的代号表明指针类型，如果相同类型的指针连续出现，以“0”代替，一个“0”代表一次重复。U表示结构类型，通常后跟结构体的类型名，用“@@”表示结构类型名的结束。函数的返回值不作特殊处理，它的描述方式和函数参数一样，紧跟着参数表的开始标志，也就是说，函数参数表的第一项实际上是表示函数的返回值类型。参数表后以“@Z”标识整个名字的结束，如果该函数无参数，则以“Z”标识结束。下面举两个例子，假如有以下函数声明：\nint Function1(char *var1,unsigned long);\n其函数修饰名为“?Function1@@YGHPADK@Z”，而对于函数声明：\noid Function2();\n其函数修饰名则为“?Function2@@YGXXZ” 。\n对于C++的类成员函数（其调用方式是thiscall），函数的名字修饰与非成员的C++函数稍有不同，首先就是在函数名字和参数表之间插入以“@”字符引导的类名；其次是参数表的开始标识不同，公有（public）成员函数的标识是“@@QAE”,保护（protected）成员函数的标识是“@@IAE”,私有（private）成员函数的标识是“@@AAE”，如果函数声明使用了const关键字，则相应的标识应分别为“@@QBE”，“@@IBE”和“@@ABE”。如果参数类型是类实例的引用，则使用“AAV1”，对于const类型的引用，则使用“ABV1”。")]),s._v(" "),t("h3",{attrs:{id:"查看函数的名字修饰"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#查看函数的名字修饰"}},[s._v("#")]),s._v(" 查看函数的名字修饰")]),s._v(" "),t("p",[s._v("有两种方式可以检查你的程序中的函数的名字修饰：使用编译输出列表或使用Dumpbin工具。使用/FAc，/FAs或/FAcs命令行参数可以让编译器输出函数或变量名字列表。使用dumpbin.exe /SYMBOLS命令也可以获得obj文件或lib文件中的函数或变量名字列表。此外，还可以使用 undname.exe 将修饰名转换为未修饰形式。")]),s._v(" "),t("h3",{attrs:{id:"beginthread需要-cdecl的线程函数地址-beginthreadex和-createthread需要-stdcall的线程函数地址。"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#beginthread需要-cdecl的线程函数地址-beginthreadex和-createthread需要-stdcall的线程函数地址。"}},[s._v("#")]),s._v(" _beginthread需要_cdecl的线程函数地址，_beginthreadex和_CreateThread需要_stdcall的线程函数地址。")]),s._v(" "),t("div",{staticClass:"language-c line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-c"}},[t("code",[s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("CALLBACK")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__stdcall ")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//这就是传说中的回调函数")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("WINAPI")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__stdcall ")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//这就是传说中的WINAPI")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("WINAPIV")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__cdecl")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("APIENTRY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("WINAPI ")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//DllMain的入口就在这里")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("APIPRIVATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__stdcall")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token macro property"}},[t("span",{pre:!0,attrs:{class:"token directive-hash"}},[s._v("#")]),t("span",{pre:!0,attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token macro-name"}},[s._v("PASCAL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("__stdcall")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);