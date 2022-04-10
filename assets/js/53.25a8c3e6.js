(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{454:function(_,a,l){"use strict";l.r(a);var e=l(56),t=Object(e.a)({},(function(){var _=this,a=_.$createElement,l=_._self._c||a;return l("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[l("h2",{attrs:{id:"_3-程序接口"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-程序接口"}},[_._v("#")]),_._v(" 3-程序接口")]),_._v(" "),l("p",[_._v("这个部分描述了lua的c api, 也就是宿主程序和lua通讯用的一组c函数，所有的API函数按相关的类型以及常量都生命在头文件lua.h中。")]),_._v(" "),l("p",[_._v("虽然我们说的是"),l("code",[_._v("函数")]),_._v("， 但一部分简单的API是以宏的形式提供的，所有的这些宏都使用它们的参数一次(除了第一个参数，也就是lua状态机), 因此你不需要担心这些宏的展开会引起一些副作用。")]),_._v(" "),l("p",[_._v("在所有的c库中，lua api函数都不去检查参数的有效性和坚固性，然而，你可以在编译lua时加上一个宏开关来开启luaconf.h中的宏lua_apicheck以改变这个行为。")]),_._v(" "),l("h3",{attrs:{id:"_3-1-堆栈"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-堆栈"}},[_._v("#")]),_._v(" 3.1 堆栈")]),_._v(" "),l("p",[_._v("lua使用一个虚拟栈来和C传递值，栈上每个元素有一个lua值(nil, 数字，字符串等等)。")]),_._v(" "),l("p",[_._v("无论何时lua调用C，被调用的函数都得到一个新的栈，这个栈不同于c函数栈，栈中包含了lua传递给C函数的所有参数， C函数要把返回结果也压栈，返回会给调用者lua。")]),_._v(" "),l("p",[_._v("针对栈的API，不同于真正的栈操作，先进后出，而是使用数组的方式访问，1是第一个入栈的，n是最后一个最后一个元素(假设栈中有n个元素); 负数索引是-1栈顶(n的位置), -n是(1的位置，即栈底)")]),_._v(" "),l("h3",{attrs:{id:"_3-2-堆栈的大小限制"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-堆栈的大小限制"}},[_._v("#")]),_._v(" 3.2 堆栈的大小限制")]),_._v(" "),l("p",[_._v("使用Lua API，你有责任控制栈不溢出， 可以通过lua_checkstack函数扩大可用尺寸。")]),_._v(" "),l("p",[_._v("lua调用C，只能保证一般是20个栈空间可用，宏是LUA_MINSTACK, 只要不频繁压栈，一般不需要关心。")]),_._v(" "),l("p",[_._v("所有的查询函数，都可以指定索引， 比如lua_type，查询一个栈值是lua哪个类型的")]),_._v(" "),l("div",{staticClass:"language- line-numbers-mode"},[l("pre",{pre:!0,attrs:{class:"language-text"}},[l("code",[_._v("#define LUA_TNIL                0\n#define LUA_TBOOLEAN            1\n#define LUA_TLIGHTUSERDATA      2\n#define LUA_TNUMBER             3\n#define LUA_TSTRING             4\n#define LUA_TTABLE              5\n#define LUA_TFUNCTION           6\n#define LUA_TUSERDATA           7\n#define LUA_TTHREAD             8\n")])]),_._v(" "),l("div",{staticClass:"line-numbers-wrapper"},[l("span",{staticClass:"line-number"},[_._v("1")]),l("br"),l("span",{staticClass:"line-number"},[_._v("2")]),l("br"),l("span",{staticClass:"line-number"},[_._v("3")]),l("br"),l("span",{staticClass:"line-number"},[_._v("4")]),l("br"),l("span",{staticClass:"line-number"},[_._v("5")]),l("br"),l("span",{staticClass:"line-number"},[_._v("6")]),l("br"),l("span",{staticClass:"line-number"},[_._v("7")]),l("br"),l("span",{staticClass:"line-number"},[_._v("8")]),l("br"),l("span",{staticClass:"line-number"},[_._v("9")]),l("br")])]),l("p",[_._v("0 永远不可以是索引，因为lua是从1开始的，不仅lua中数组，栈也是这样。")]),_._v(" "),l("h3",{attrs:{id:"_3-3-伪索引"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-伪索引"}},[_._v("#")]),_._v(" 3.3-伪索引")]),_._v(" "),l("p",[_._v("被用来访问线程的环境，函数的环境，注册表，和c函数的upvalue")]),_._v(" "),l("p",[_._v("访问方式: lua_getfield(L, LUA_GLOBALSINDEX, varname) 线程的环境(全局变量存放的地方)")]),_._v(" "),l("h3",{attrs:{id:"_3-4-c-closure"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-c-closure"}},[_._v("#")]),_._v(" 3.4- C Closure")]),_._v(" "),l("p",[_._v("闭包 --TODO")]),_._v(" "),l("h3",{attrs:{id:"_3-6-c中的错误处理"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-6-c中的错误处理"}},[_._v("#")]),_._v(" 3.6 C中的错误处理")]),_._v(" "),l("p",[_._v("运行在保护环境下的API，会设置恢复点，不会产生错误出来,例如")]),_._v(" "),l("p",[_._v("lua_newstate, lua_close, lua_load, lua_pcall, lua_cpcall")]),_._v(" "),l("p",[_._v("在c函数中。也可以调用lua_error主动产生一个错误")]),_._v(" "),l("h3",{attrs:{id:"_3-7-函数和类型"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-7-函数和类型"}},[_._v("#")]),_._v(" 3.7 函数和类型")]),_._v(" "),l("p",[_._v("lua_call")]),_._v(" "),l("ul",[l("li",[_._v("是c调用lua中的函数")])]),_._v(" "),l("p",[_._v("lua_checkstack(L, int extra):")]),_._v(" "),l("ul",[l("li",[_._v("确保stack至少有extra个空位，不会缩小栈，只会扩展。")])]),_._v(" "),l("p",[_._v("lua_close(L):")]),_._v(" "),l("ul",[l("li",[_._v("销毁lua状态机中的所有对象")])]),_._v(" "),l("p",[_._v("lua_concat(L, int n):")]),_._v(" "),l("ul",[l("li",[_._v("链接栈顶n个元素未一个字符串，这n个元素出栈，新拼接的字符串入栈。")])]),_._v(" "),l("p",[_._v("lua_cpcall(L, lua_CFunction func, void *ud):")]),_._v(" "),l("ul",[l("li",[_._v("已保护模式在c语言中调用c函数")])]),_._v(" "),l("p",[_._v("lua_createtable(L, int narr, int nrec):")]),_._v(" "),l("ul",[l("li",[_._v("创建新table，并入栈, 适合明确知道元素个数的情况")])]),_._v(" "),l("p",[_._v("lua_newtable(L):")]),_._v(" "),l("ul",[l("li",[_._v("创建空table并入栈, == lua_createtable(L, 0, 0)")])]),_._v(" "),l("p",[_._v("lua_dump(L, lua_Writer writer, void *data):")]),_._v(" "),l("ul",[l("li",[_._v("将函数dump成二进制chunk")])]),_._v(" "),l("p",[_._v("lua_equal(L, int index1, int index2):")]),_._v(" "),l("ul",[l("li",[_._v("比较索引index1和index2处的元素是否相等，相等返回1，否则0， 索引不存在也返回0")])]),_._v(" "),l("p",[_._v("lua_error(L):")]),_._v(" "),l("ul",[l("li",[_._v("产生一个lua错误, 错误信息可以是任意lua类型置入栈顶")])]),_._v(" "),l("p",[_._v("lua_gc(L, int what, int data):")]),_._v(" "),l("ul",[l("li",[_._v("垃圾回收器")]),_._v(" "),l("li",[_._v("what可选值")])]),_._v(" "),l("div",{staticClass:"language- line-numbers-mode"},[l("pre",{pre:!0,attrs:{class:"language-text"}},[l("code",[_._v("LUA_GCSTOP: 停止垃圾收集器。\nLUA_GCRESTART: 重启垃圾收集器。\nLUA_GCCOLLECT: 发起一次完整的垃圾收集循环。\nLUA_GCCOUNT: 返回 Lua 使用的内存总量（以 K 字节为单位）。\nLUA_GCCOUNTB: 返回当前内存使用量除以 1024 的余数。\nLUA_GCSTEP: 发起一步增量垃圾收集。 步数由 data 控制（越大的值意味着越多步）， 而其具体含义（具体数字表示了多少）并未标准化。 如果你想控制这个步数，必须实验性的测试 data 的值。 如果这一步结束了一个垃圾收集周期，返回返回 1 。\nLUA_GCSETPAUSE: 把 data/100 设置为 garbage-collector pause 的新值（参见 §2.10）。 函数返回以前的值。\nLUA_GCSETSTEPMUL: 把 arg/100 设置成 step multiplier （参见 §2.10）。 函数返回以前的值 \n")])]),_._v(" "),l("div",{staticClass:"line-numbers-wrapper"},[l("span",{staticClass:"line-number"},[_._v("1")]),l("br"),l("span",{staticClass:"line-number"},[_._v("2")]),l("br"),l("span",{staticClass:"line-number"},[_._v("3")]),l("br"),l("span",{staticClass:"line-number"},[_._v("4")]),l("br"),l("span",{staticClass:"line-number"},[_._v("5")]),l("br"),l("span",{staticClass:"line-number"},[_._v("6")]),l("br"),l("span",{staticClass:"line-number"},[_._v("7")]),l("br"),l("span",{staticClass:"line-number"},[_._v("8")]),l("br")])]),l("p",[_._v("lua_getallocf(L, void **ud):")]),_._v(" "),l("ul",[l("li",[_._v("返回给定状态机的内存分配器函数。 如果 ud 不是 NULL ，Lua 把调用 lua_newstate 时传入的那个指针放入 *ud 。")])]),_._v(" "),l("p",[_._v("lua_getfenv(L, int index):")]),_._v(" "),l("ul",[l("li",[_._v("把索引处值的环境表压入堆栈")])]),_._v(" "),l("p",[_._v("lua_getfield(L, int index, const char *k):")]),_._v(" "),l("ul",[l("li",[_._v('把 t[k] 值压入堆栈， 这里的 t 是指有效索引 index 指向的值。 在 Lua 中，这个函数可能触发对应 "index" 事件的元方法')])]),_._v(" "),l("p",[_._v("lua_getglobal(L, const char *name):")]),_._v(" "),l("ul",[l("li",[_._v("把全局变量 name 里的值压入堆栈。 这个是用一个宏定义出来的：")]),_._v(" "),l("li",[_._v("#define lua_getglobal(L,s)  lua_getfield(L, LUA_GLOBALSINDEX, s)")])]),_._v(" "),l("p",[_._v("lua_getmetatable(L, int index):")]),_._v(" "),l("ul",[l("li",[_._v("将给定索引指向的值的元表入栈，如果索引无效，返回0， 不会向栈压入任何东西.")])]),_._v(" "),l("p",[_._v("lua_gettable(L, int index):")]),_._v(" "),l("ul",[l("li",[_._v("把t[k]压栈， t是index索引处的值，k是栈顶的值。")])]),_._v(" "),l("p",[_._v("lua_gettop(L):")]),_._v(" "),l("ul",[l("li",[_._v("获取栈元素个数，也就是栈顶的索引")])]),_._v(" "),l("p",[_._v("lua_insert(L, int index):")]),_._v(" "),l("ul",[l("li",[_._v("将栈顶元素插入到index处， 依次移动这个索引上面的元素")])]),_._v(" "),l("p",[_._v("lua_Integer")]),_._v(" "),l("ul",[l("li",[_._v("这个类型用于Lua API接收整数值")])]),_._v(" "),l("p",[_._v("lua_isboolen(L, int index):")]),_._v(" "),l("ul",[l("li",[_._v("判断给定索引是不是bool类型，是返回1，否则返回0")])]),_._v(" "),l("p",[_._v("lua_iscfunction(L, int index):")]),_._v(" "),l("ul",[l("li",[_._v("判断给定索引处是c函数或者lua函数皆可，是返回1，否则0")])]),_._v(" "),l("p",[_._v("lua_islightuserdata(L, int index):")]),_._v(" "),l("p",[_._v("lua_isnil(L, int index)")]),_._v(" "),l("p",[_._v("lua_isnumber(L, int index) 字符串或数字则返回1，否则0，字符串需要是可转数字的字符串")]),_._v(" "),l("p",[_._v("lua_isstring(L, int index) 字符串或数字则返回1，否则0")]),_._v(" "),l("p",[_._v("lua_istable(L, int index)")]),_._v(" "),l("p",[_._v("lua_isuserdata(L, int index) userdata或light userdata 返回1， 否则返回0")]),_._v(" "),l("p",[_._v("lua_isthread(L, int index)")]),_._v(" "),l("p",[_._v("lua_lessthen(L, int index1, int index2) index1 < index2 则返回1, 否则返回0")]),_._v(" "),l("p",[_._v("lua_load(L, lua_Reader reader, void *data, const char *chunkname)")]),_._v(" "),l("p",[_._v("lua_newstate(lua_Alloc f, void *ud) 创建lua状态机")]),_._v(" "),l("p",[_._v("lua_newtable(L) 创建空table，并入栈")]),_._v(" "),l("p",[_._v("lua_newthread(L) 创建一个新线程并入栈")]),_._v(" "),l("p",[_._v("lua_newuserdata(L, size_t size): 分配一块内存，内存地址入栈")]),_._v(" "),l("p",[_._v("lua_next（L, int index):  弹出栈顶的key, 在-2处的table中找到一对key，key入栈，value入栈，再弹出value,保留key，如此循环，弹出全部的key=>value")]),_._v(" "),l("p",[_._v("lua_objlen(L, int index): 字符串长度、 #table、 userdata内存大小，其他情况返回0")]),_._v(" "),l("p",[_._v("lua_pcall(L, int ngars, int nrets, int errfunc):")]),_._v(" "),l("ul",[l("li",[_._v("保护方式调用一个函数，如果不发生错误，和lua_call且完全一致； 如果发生错误，会把error信息压栈(errfunc=0); 如果errfunc!=0, 则认为是错误处理函数在errfunc这个索引上，会调用这个索引上的函数，错误处理完的信息会再次压栈，作为lua_pcall的出错信息进行压栈。")]),_._v(" "),l("li",[_._v("调用成功返回0，其他 LUA_ERRRUN: 运行时错误。LUA_ERRMEM: 内存分配错误。 对于这种错，Lua 调用不了错误处理函数。LUA_ERRERR: 在运行错误处理函数时发生的错误。")])]),_._v(" "),l("p",[_._v("void lua_pop(L, int n): 弹出n个元素, 丢弃。")]),_._v(" "),l("h2",{attrs:{id:""}},[l("a",{staticClass:"header-anchor",attrs:{href:"#"}},[_._v("#")])]),_._v(" "),l("p",[_._v("lua_pushboolean(L, int b): b作为bool值入栈")]),_._v(" "),l("p",[_._v("lua_pushcclosure(L, lua_CFcuntion fn, n): c闭包压栈，n表示闭包内关联的变量个数")]),_._v(" "),l("p",[_._v("lua_pushcfunction(L, lua_CFcuntion fn): 将c函数压栈;  本质是宏    #define lua_pushcfunction(L,f)  lua_pushcclosure(L,f,0)")]),_._v(" "),l("p",[_._v("lua_pushfstring(L, const char *fmt, ...): 类似sprintf， 返回字符串, 内存由lua管理， 不用在c中专门申请空间")]),_._v(" "),l("p",[_._v("lua_pushinteger(L, lua_Interger n): n作为数字入栈")]),_._v(" "),l("p",[_._v("lua_pushlightuserdata(L, void *p): light userdata 压栈，表示一个指针")]),_._v(" "),l("p",[_._v("lua_pushlstring(L, const char *s, size_t len) s处长度为len的字符串压栈，会做一次内存copy")]),_._v(" "),l("p",[_._v("lua_pushnil(L)")]),_._v(" "),l("p",[_._v("lua_pushnumber(L, lua_Number n)")]),_._v(" "),l("p",[_._v("lua_pushstring(L, const char *s)")]),_._v(" "),l("p",[_._v("lua_pushthread(L): 把L中提供的线程压栈，如果是主线程，返回1.")]),_._v(" "),l("p",[_._v("lua_pushvalue(L, int index): 将index处的元素copy一份，再次压栈")]),_._v(" "),l("p",[_._v("lua_pushvfstring(L, const char *fmt, va_list argp): 等价于lua_pushfstring，只不过实际参数是va_list接收")]),_._v(" "),l("p",[_._v("lua_rawequal(L, int index1, int index2) 简单比较相等（不调用元方法) 相等返回1， 否则返回0")]),_._v(" "),l("p",[_._v("lua_rawget(L, int index) 做一次直接访问，不触发元方法")]),_._v(" "),l("p",[_._v("lua_rawgeti(L, int index, int n) 将index处的table[n]压栈")]),_._v(" "),l("p",[_._v("lua_rawset(L, int index) 赋值操作 index处的table[-2的key] = [-1的value], 不会触发元方法")]),_._v(" "),l("p",[_._v("lua_rawseti(L, int index, int n) index处的table[n] = (-1栈顶的v)")]),_._v(" "),l("p",[_._v("lua_Reader(L, void *data, size_t *size) lua_load用到的读取器函数")]),_._v(" "),l("p",[_._v("lua_register(L, const char *name, lua_CFction f) 将函数f设到全局变量name中 是宏\n- #define lua_register(L,n,f) "),l("br"),_._v("\n-         (lua_pushcfunction(L, f), lua_setglobal(L, n))")]),_._v(" "),l("p",[_._v("lua_remove(L, int index) 删除index处的元素，上面的元素移到下面补充。")]),_._v(" "),l("p",[_._v("lua_replace(L, int index) 把栈顶的元素弹出，替换到index处的元素")]),_._v(" "),l("p",[_._v("lua_resume(L, int narg) 启动或继续一个协程")]),_._v(" "),l("p",[_._v("lua_setallocf(L, lua_Alloc f, void *ud) 指定L的分配器函数为f")]),_._v(" "),l("p",[_._v("lua_setenv(L, int index) 从栈上弹出table， 并把它作为指定索引index的环境")]),_._v(" "),l("p",[_._v("lua_setfield(L, int index, const char *k) 把index处的table的[k] 赋值位栈顶的v")]),_._v(" "),l("p",[_._v("lua_setglobal(L, const char *name) 宏，把栈顶弹出的值设置到全局变量name中。")]),_._v(" "),l("ul",[l("li",[_._v("#define lua_setglobal(L,s)   lua_setfield(L, LUA_GLOBALSINDEX, s)")])]),_._v(" "),l("p",[_._v("lua_settable(L, int index)  设置index 处的table  t[k] = v , v是栈顶, k是-2处的值。")]),_._v(" "),l("p",[_._v("lua_settop(L, int index) 设置栈顶位置, 0则清空栈，设置的位置大于当前栈顶，中间空位补nil")]),_._v(" "),l("p",[_._v("lua_State 变量, 保存lua解释器的状态。")]),_._v(" "),l("p",[_._v("lua_status(L) 返回线程L的状态")]),_._v(" "),l("p",[_._v("lua_toboolean(L, index) 把栈index处的lua值转为c中的bool值。")]),_._v(" "),l("p",[_._v("lua_tointeger(L, int index) lua值转为lua_integer的值")]),_._v(" "),l("p",[_._v("lua_tolstring(L, int index, size_t *size)  lua值转为字符串， 如果size 不是NULL，就存字符串长度")]),_._v(" "),l("p",[_._v("lua_tonumber(L, int index) lua值转为lua_Number类型")]),_._v(" "),l("p",[_._v("lua_topointer(L, int index) 索引处的值转为c指针 void *")]),_._v(" "),l("p",[_._v("lua_tostring(L,int index) 等价于lua_tolstring , len 设为null")]),_._v(" "),l("p",[_._v("lua_tothread(L, int index) 索引处的值转为lua_State* 线程")]),_._v(" "),l("p",[_._v("lua_touserdata(L, int index) 返回userdata内存块的地址")]),_._v(" "),l("p",[_._v("lua_type(L, index) 返回index处的值的类型（lua.h中定义的lua类型 9种）")]),_._v(" "),l("p",[_._v("lua_typename(L, int tp) 返回tp表示的类型名， lua.h 定义的9种类型")]),_._v(" "),l("p",[_._v("lua_xmove(lua_state* from, lua_state *to, int n) 传递同一个全局状态机下不同线程中的值。")]),_._v(" "),l("p",[_._v("lua yield(L, int nresults) 切出一个协程， 只能 return yield(L, nresults) 这么用")]),_._v(" "),l("h2",{attrs:{id:"_3-8-调试接口"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_3-8-调试接口"}},[_._v("#")]),_._v(" 3.8 调试接口")]),_._v(" "),l("p",[_._v("lua_Debug是结构体")]),_._v(" "),l("p",[_._v("lua_gethook(L) 返回当前钩子函数")]),_._v(" "),l("p",[_._v("lua_gethookcount(L) 返回当前钩子计数")]),_._v(" "),l("p",[_._v("lua_getinfo(L, const char *what, lua_Debug *ar)  根据what指定的字符，确定要获取的字段，存到ar中")]),_._v(" "),l("ul",[l("li",[_._v("what 以> 开头")])]),_._v(" "),l("p",[_._v("lua_getlocal(L, *ar, int n ) 从活动记录中获取一个局部变量的值， n表示第一个参数或第一个局部变量")]),_._v(" "),l("p",[_._v("lua_getstack（L, level, *ar) 获取解释器的栈信息")]),_._v(" "),l("p",[_._v("lua_getupvalue(L, int funcindex, int n):  获取闭包中第n个元素，压入栈顶")]),_._v(" "),l("p",[_._v("lua_Hook 用于调试的钩子函数")]),_._v(" "),l("p",[_._v("lua_sethook(L, f, mask, count): 设置钩子函数")]),_._v(" "),l("p",[_._v("lua_setlocal(L ,*ar, int n):  设置给定活动记录中局部变量的值")]),_._v(" "),l("p",[_._v("lua_setupvalue(L, int funcindex, int n) 设置闭包的upvalue")]),_._v(" "),l("h1",{attrs:{id:"_4-扩展库"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#_4-扩展库"}},[_._v("#")]),_._v(" 4 扩展库")]),_._v(" "),l("p",[_._v("luaL_addchar(luaL_Buff *B, char c)")]),_._v(" "),l("p",[_._v("luaL_addlstring(B, const char *s , size_t l)\nadd s to B, with length l")]),_._v(" "),l("p",[_._v("luaL_addsize(B, size_t n)")]),_._v(" "),l("p",[_._v("luaL_addstring(B, const char *s)")]),_._v(" "),l("p",[_._v("luaL_addvalue(B)")])])}),[],!1,null,null,null);a.default=t.exports}}]);