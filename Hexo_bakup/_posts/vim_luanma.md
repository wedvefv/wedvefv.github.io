---
layout: "post"
title: "vim 乱码"
date: "2016-10-26 18:37"
---

# 首先 中文os下，我们一般的设置是：
```shell 
set encoding=utf-8                                "设置gvim内部编码
set fileencoding=utf-8                               "设置当前文件编码
set fileencodings=gbk,utf-8,shift_jis,ucs-bom,latin1,gb2312,cp936,cp932    设置支持打开的文件的编码

set termencoding=utf-8
set guifont=DejaVu\\ Sans\\ Mono\\:h13   
```

上述，set fileencodings设置的文字编码解析顺位，对于中文是可以解析出来的,shift_jis编码的文件，就会出现乱码。除非你把shift_jis设置第一位：

```shell
set fileencodings=shift_jis,gbk,utf-8,ucs-bom,latin1,gb2312,cp936,cp932 
```

# 对于日文os ，安装gvim后，需要如下设置：
由于本地ANSI是cp932 , 所以把cp932 放在第一或者第二的位置，
如果放到第三或者后面就会出现shift_jis编码的日文打开后是文本乱码现象。

```shell
set encoding=utf-8                                    "设置gvim内部编码
set fileencoding=utf-8                               "设置当前文件编码
set fileencodings=CP932,utf-8,gbk,,ucs-bom,latin1,gb2312,cp936 #设置支持打开的文件的编码

set termencoding=utf-8

set guifont=DejaVu\ Sans\ Mono\:h13 
set guifontwide=NSimsun\:h14  
#设置新宋体      

```

由于DejaVu Sans Mono 字体是英文字符字体，无法正确显示宽字体，所以需要特别加入
```shell
set guifontwide=NSimsun\:h14 
#设置新宋体 ，显示汉字
```

所以大家在自己的sublime 或者vim中设置编辑器字体DejaVu Sans Mono就好像可以显示正确的汉字和英文，其实我们设置的只是英文字符显示的样式。汉字其实是系统本地ANSI编码。

## 本地ANSI编码
世界上每种语言对应的windows 系统都有各自的ANSI，互相不兼容。

比如 中文ANSI == GBK(中文) ，gbk是gb2312(简体中文)的扩展，包含繁体，日文片假名。cp936就是gbk
    日文ANSI == Windows-31J  就是cp932. 
shift_jis也是一种日文字符编码,不过，只实现了cp932的部分，所以cp932编码的东东，shift_jis可能乱码。shift_jis编码的，cp932一定正常显示。

这是微软早起应对不同国家一种混合的编码：字母+对应的国家文字,这种字符也是多字节字符。比如：中文ANSI,字母数字是1字节 ,汉字是2字节。两种语言文字有可能在一起就显示乱码。不过微软提供了本地ANSI转换为标准unicode字符的方案，通过代码页转换表技术这一过度方案。

## nnicode编码规范
unicode 是将全世界所有的字符都统一编码的方案(规范))。那么字符a的编码本来是1byte ,现在统一和一个汉字一样长了。那么问题来了，字符串是'\0'字符结尾。世界上的很久以前写的c程序，就没办法用了。所以说unicode应该早点出来。

有了这种全字符集，解决了乱码，却没法用，蛋疼吧，可是utf8这一实现字符保存，传输的方案出现了。因为utf8是可变长的。不同位段，长度不一致。 

## utf-8编码
```html
UCS-2编码(16进制)   UTF-8 字节流(二进制)
0000 - 007F         0xxxxxxx
0080 - 07FF         110xxxxx 10xxxxxx
0800 - FFFF         1110xxxx 10xxxxxx 10xxxxxx 
 
例如“汉”字的Unicode编码是6C49。6C49在0800-FFFF之间，所以肯定要用3字节模板了：1110xxxx 10xxxxxx 10xxxxxx。将6C49写成二进制是：0110 110001 001001，用这个比特流依次代替模板中的x，得到：11100110 10110001 10001001，即E6 B1 89。
 
可见UTF-8是变长的，将Unicode编码为00000000-0000007F的字符，用单个字节来表示； 00000080-000007FF的字符用两个字节表示；00000800-0000FFFF的字符用3字节表示。因为目前为止Unicode-16规范没有指定FFFF以上的字符，所以UTF-8最多是使用3个字节来表示一个字符。但理论上来说，UTF-8最多需要用6字节表示一个字符。 
 
UTF-8兼容ASCII。
```

#utf16编码
utf-16 和unicode规范是一致的，所以不兼容ascii。
以上信息来源参考： ![这里的博客](http://polaris.blog.51cto.com/1146394/377468/)