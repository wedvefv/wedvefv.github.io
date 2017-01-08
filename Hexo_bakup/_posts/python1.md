---
layout: "post"
title: "python笔记-复制文件"
date: "2016-10-25 11:12"

---


# 复制文件操作：

```python
#!c:/python27/python.exe
# coding=utf8

import os
import shutil
srcpath = r'D:\AM_SOURCE\AM\_BIN\JP\Release'
dstpath = r'C:\ESM\AlertMan\Program'


def copyfile(x):
    src = srcpath + '\\' + x
    dst = dstpath + '\\' + x
    if None is shutil.copy(src, dst):
        return "copy" + "\n" + src + "\n" + "to" + "\n" + dst + "\n" "OK"
while(1):
    x = str(raw_input("please input module:"))
    if os.path.exists(srcpath + "\\" + x):
        print copyfile(x)
    else:
        print "module not exsist"

```
