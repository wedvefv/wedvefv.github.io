---
layout: post
title: centos6.4 安装python mysql扩展 
date: 2018-6-30 10:15:00
category: c

---



要想使python可以操作mysql 就需要MySQL-python驱动，它是python 操作mysql必不可少的模块。

下载地址：https://pypi.python.org/pypi/MySQL-python/

下载MySQL-python-1.2.5.zip 文件之后直接解压。进入MySQL-python-1.2.5目录:

python setup.py install

报错：

[root@centos7 MySQL-python-1.2.4]# python setup.py install

sh: mysql_config: command not found

Traceback (most recent call last):

  File "setup.py", line 18, in <module>

    metadata, options = get_config()

  File "/root/MySQL-python-1.2.4/setup_posix.py", line 43, in get_config

    libs = mysql_config("libs_r")

  File "/root/MySQL-python-1.2.4/setup_posix.py", line 25, in mysql_config

    raise EnvironmentError("%s not found" % (mysql_config.path,))

EnvironmentError: mysql_config not found

网上查了一下需安装mysql-devel 

#yum -y install mysql-devel 

安装成功后

# python setup.py install

安装成功。
