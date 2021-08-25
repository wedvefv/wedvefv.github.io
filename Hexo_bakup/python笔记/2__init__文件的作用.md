+++
title="python模块导入"
categories=["python"] 
tags=["python"] 
date="2019-02-14 14:00:00+0800"
toc=true
+++

## python 导入模块文件的2中方式

```python
import lib or from lib import *



# 导入子目录中模块
import tmp.lib3  or  from tmp.lib3 import *


# 导入上级目录

import sys
sys.path.append('home/app/')
import mod
import xxxx

```

- 与import类似, 被导入的module仍然会执行且仅执行一次

- from *** import 的实质

- 当以 "from *** import " 方式导入module时, python会在当前module 的命名空间中新建相应的命名. 即, "from t2 import var1" 相当于:

```python
  import t2
  var1= t2.var1
```

- from package import item  # 这种方式，item可以是包中的一个子模块或子包，也可以是包中定义的其他命名，像函数、类、变量。
- import item.subitem.subsubitem # 这些子项必须是包，最后的子项是包或模块。但不能为函数、类或变量。否则出错：No module named ***

##  \_\_init__.py 的作用

python import package都是根据每个module的__name__来实现的。 
比如说，有一个文件夹结构为：

```python
package/
    __init__.py
    subpackage1/
        __init__.py
        moduleX.py
    moduleA.py
```

- 那么，如果（在这个package文件夹之外，比如package的同级文件夹下建立运行一个run.py）运行一个script，来导入moduleX模块，那么这个moduleX的__name__就是.package.subpackage1.moduleX，由于moduleX获得了前述名称，那么在moduleX.py内部就可以有relative import的语句，比如说：from .. import moduleA

- 而moduleX之所以能够获得的.package.subpackage1.moduleX的__name__ attribute属性，前提是package被python解释器识别成了一个package来处理（比如在package的同级文件夹下的运行的run.py有import package.subpackage1.moduleX之类的语句）。可是，如果每一个被我直接run的python script都会被视作是top-level script。top-level script的__name__被自动设置成__main__。因此，如果我从package文件夹内部直接运行moduleA.py这个脚本，那么它的__name__就被置成了__main__，python也不会把它当作一个package，其中的relative import的语句自然就无法起作用了。


## 总之，运行脚本要在包目录的外层，包里面的模块之间才能用. 或则 ..等相对路径做导入操作。换句话，就是存在from .. import xxx 的文件不能直接python xxx.py操作，即使存在__init__.py, .也不会被认为是一个包。