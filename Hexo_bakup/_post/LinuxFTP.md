----
layout: post
title: LinuxFTP的建立
category: linux
tags: linux 
date: 2016-7-31 1l:30:55
comments: true

----

# linux FTP建立，条件：
安装vsftpd：
配置vsftpd的配置文件：
vim /etc/vsftpd.conf

anonymous_enbale =NO  //关闭匿名登录
local_enbale=YES  //允许本地用户，就是ftp建立者的用户名和密码
write_enbale=YES  //允许写入，就是上传文件到ftp

反注释掉：
ascii_upload_enbale=YES
ascii_download_enbale=YES

默认的ftp目录就是home下的user目录，包含桌面，下载等等文件夹。






