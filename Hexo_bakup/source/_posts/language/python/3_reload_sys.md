---
layout: post
title: python 编码reload(sys)的作用
category: python
date: 2019-05-02 14:00:00

---

## 为什么需要sys.setdefaultencoding("utf-8")
* 因为python转码是通过unicode作为中间码的。
* 比如字符串 x = "你们"，本身是str，
首先我们指定了文件编码uft8，所以x是utf8编码的。
* 如果要转化gb18030， 默认是x用默认解码方式（ASCII）decode成中间码 unicode ->   encode成gb18030
* 如果x是abc这些ascii字符本身ascii和utf8方式是一样的,不会报错;
* 但是x是中文，就不能按ascii方式解码了。。怎么办呢？
* 1 . 自己指定解码方式，在编码
```py
	y = x.decode("utf-8").encode("gb18030")
```

* 2.开头设置默认编解码方式
```py
	import sys
	reload(sys)
	sys.setdefaultencoding("utf-8")
```

## 为什么reload(sys)呢
* 因为模块/lib/site.py删除了sys.setdefaultencoding这个函数。

## site.py 有什么作用
* 是解释器初始化时自动导入的，这个模块的作用是：自动将第三方模块路径加入到sys.path中。

## import的实质
* import sys导入语句，只是导入了一个对sys的引用，因为别人已经提前导入了sys，后面的模块使用sys都是引用这个对象。
* 而作为初始化模块site.py,导入了许多内建模块包括sys，而且删除了sys.setdefaultencoding这个方法，后面你写的模块，只要导入sys,都是没有这个方法的。
* 所以需要reload一把，reload也是有前提的，就是之前已经加载过的模块，如果没有加载过的，就无重谈起重新加载了。

