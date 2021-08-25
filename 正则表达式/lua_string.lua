+++
title="lua捕获"
categories=["正则表达式"] 
tags=["regex"] 
date="2020-11-02 12:00:00+0800"
toc=true
+++

#### 直接上代码

```lua
-- 实现特定字符分割字符串
local function explode(deli, str)
	local start, find_pos = 1,1
	local t = {}
	while true  do
		find_pos = string.find(str, deli, start,true)  -- 第三个参数是查找的开始位置
		if not find_pos  then 
			break 
		end

		t[#t+1] = string.sub(str, start, find_pos -1) 
		start = find_pos + 1
	end
	-- 最后一段字符串
	t[#t+1] = string.sub(str, start)
	return t
end

-- 测试 explode 
local x = "aaaa,bbb,ccc,111,tt,111"
local arr = explode(",", x)
for i, x in ipairs(arr) do
	print(i,x)
end


print(string.char(97)) -- a
print(string.byte('a')) -- 97
print((#"中")) --3 个字节
print((string.byte("中",1))) -- 228 
print((string.byte("中",2))) -- 184
print((string.byte("中",3))) -- 173
--[[
1110 0100
E 4 
128 +64 + 32 + 4  = 228

1011 1000
B 8
128 + 32 + 16 +8 = 184

1010 1101
A D
128 + 32 + 8 + 4 + 1 = 173 
“中” 字的utf8编码是E4B8AD三个字节
]]


-- string.gsub
s ,c = string.gsub("all lii", 'l', 'x', 2) -- 替换2次l为x
print(s, c) -- axx lii 2 。 c表示替换次数


--[[
. 任意字符
%a 字母
%c 控制字符
%d 数字
%l 小写字母
%p 标点字符
%s 空白符
%u 大写字母
%w 字母和数字
%x 十六进制数字
%z 代表 0 的字符
]]
-- %A 大写的都表示补集，非%a

-- 特殊字符
-- ( ) . % + - * ? [ ^ $

--[[
+ 匹配前一字符 1 次或多次
* 匹配前一字符 0 次或多次
- 匹配前一字符 0 次或多次
? 匹配前一字符 0 次或 1 次
]]

-- 正则匹配
test = "int x; /* 111111 */ int y; /* 22222 */"
-- .* 是匹配0次或多次字符， 最长匹配
print(string.gsub(test, "/%*.*%*/", "注释")) 
-- int x; 注释  1次 

-- .- 也是匹配0次或多次字符，是最短匹配
print(string.gsub(test, "/%*.-%*/", "注释"))
-- int x; 注释 int y; 注释 2


test = "a (enclosed (in) parentheses) line"
print(string.find(test, "%bes")) 
-- 匹配%b后面的两个字母es之间的内容，包括 e和s， 
-- 4， 9


-- 捕获功能1
-- 用括号括起来的部分就叫做一个捕获 capture
pair = 'name = anna'

a, b , key , value = string.find(pair, "(%a+)%s=%s(%a+)")
print(a, b , key, value)
-- 1       11      name    anna 
-- a,b是找到的整个匹配的起点和终点
-- 除了前两个参数，后面的每个值，对应一个小括号中的匹配值

date = "17/7/1970"
_,_,d,m,y = string.find(date, "(%d+)/(%d+)/(%d+)")
print(d, m, y ) -- 17, 7, 1970


-- 捕获功能2 ,匹配引号之间的数据

s = [[then he said: "it's all righ't"!]]
a, b , c,  quote_str= string.find(s, "([\"\'])(.-)%1")
-- a, b , c,  quote_str= string.find(s, "([\"])(.-)[\"]")
print(a,b, c, quote_str)
-- %1 表示第一个小括号的匹配值

print(string.gsub("hello lua", "(%a)", "%1-%1"))
-- h-he-el-ll-lo-o L-Lu-ua-a

print(string.gsub("hello lua", "(.)(.)", "%2%1"))
-- 替换相邻字符
-- --> ehll ouLa

-- 捕获3 -替换
x = "\\command {some text}"  -- LaTeX格式
-- 转成html格式 <command> some text </command>
print(string.gsub(x, "\\(%a+)%s{(.-)}", "<%1> %2 </%1>"))

x = "the \\quote{task} is to \\em{change} that"
print(string.gsub(x, "(.-)\\(%a+){(.-)}(.-)\\(.-){(.-)}(.-)", "%1 <%2>%3</%2>%4<%5>%6</%5>%7"))
-- the  <quote>task</quote> is to <em>change</em> that


-- trim函数替换空格
local function trim(s)
	return string.gsub(s, "^%s*(.-)%s*$", "%1")
end
x = " hello "
print("xxx"..trim(x).."aa")



-- 捕获4
local function expand(s)
	s = string.gsub(s, "$(%w+)", function(n) return _G[n] end) -- %w字母或数字
	return s
end
-- 每次匹配到值，都会传给 第三个参数指定的函数
name = "lua"  status="great"
print(expand("$name is $status, isnt it?"))
-- 匹配到单词 name ，就去_G中寻找_G["name"], name = "lua" status也是如此


-- 捕获5
s = "sin(3) = $[math.sin(3)]; 2^5 = $[2^5]"
local ret = string.gsub(s, "$(%b[])", function(x)
	x = "return " .. string.sub(x, 2, -2)
	local f = loadstring(x) -- loadstring 类似定义一个函数体
	return f()
end
)

-- 替换匹配的math.sin(3) 为计算额结果, 2^5 也为计算结果
print(ret)

```
