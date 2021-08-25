+++
title="centos6.4 升级python到2.7"
categories=["linux"] 
tags=["linux"] 
date="2018-06-30 10:15:00+0800"
toc=true
+++


# 1. download source

```c
wget https://www.python.org/ftp/python/2.7.12/Python-2.7.12.tgz

```

# 2. compire and install

```c
tar zxvf Python-2.7.12.tgz
cd Python-2.7.12
./configure --prefix=/usr/local/python27 && make && make install && echo $?
如果以上输出为0，说明没有报错，安装正常
```

# 3. add path and backup the python2.6 

```c
移除以前的版本
mv /usr/bin/python /usr/bin/python26
创建软连接
ln -s /usr/local/python27/bin/python /usr/bin/python
查看版本是否升级成功
python -V
Python 2.7.12
```

# 4. modify yum

```c
如果不修改此项，会导致yum无法使用
vim /usr/bin/yum
修改第一行即可，将环境变量指向以前的python版本
#!/usr/bin/python26
```

# 5. reinstall pip 

```c
1.安装pip之前首先需要安装setuptools
下载链接
https://pypi.python.org/pypi/setuptools
下载地址
wget https://pypi.python.org/packages/ff/d4/209f4939c49e31f5524fa0027bf1c8ec3107abaf7c61fdaad704a648c281/setuptools-21.0.0.tar.gz#md5=81964fdb89534118707742e6d1a1ddb4 --no-check-certificate
解压
tar zxvf setuptools-21.0.0.tar.gz
安装
cd setuptools-21.0.0
python setup.py  install

2.安装pip
下载链接
https://pypi.python.org/pypi/pip
下载地址
wget https://pypi.python.org/packages/41/27/9a8d24e1b55bd8c85e4d022da2922cb206f183e2d18fee4e320c9547e751/pip-8.1.1.tar.gz#md5=6b86f11841e89c8241d689956ba99ed7 --no-check-certificate
解压
tar zxvf pip-8.1.1.tar.gz 
安装 
cd pip-8.1.1
python setup.py install

3.添加环境变量
安装完之后，之后执行pip还是调用的以前的环境变量，需要手动添加环境变量
mv /usr/bin/pip /usr/bin/pip26
ln -s /usr/local/python27/bin/pip /usr/bin/
再次查看版本
pip -V
pip 8.1.1 from /usr/local/python27/lib/python2.7/site-packages/pip-8.1.1-py2.7.egg (python 2.7)
```

# 6.使用pip安装第三方库

```c
如果报错locale.Error: unsupported locale setting
加入环境变量：
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

pip install psutil
pip install MySQLdb-python
pip install django=1.8.2

报错：
 pip install MySQLdb-python
Collecting MySQLdb-python
  Retrying (Retry(total=4, connect=None, read=None, redirect=None)) after connection broken by 'ReadTimeoutError("HTTPSConnectionPool(host='pypi.python.org', port=443): Read timed out. (read timeout=15)",)': /simple/mysqldb-python/
  Could not find a version that satisfies the requirement MySQLdb-python (from versions: )
No matching distribution found for MySQLdb-python
You are using pip version 8.1.1, however version 9.0.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
当安装中提示版本太低的时候，执行提示的命令进行升级即可
pip install --upgrade pip
升级完重新执行要安装的库
```

