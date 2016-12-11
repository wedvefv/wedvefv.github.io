----
layout: post
title: windowFTP的建立
category: windows 
tags: windows 
date: 2016-7-31 15:30:55
comments: true

----

# windows下建立ftp服务器 
需要单独建立一个用户，然后把特定目录设置为ftp目录（单独的用户需要有访问权限哦），这样避免别人知道你的计算机用户名和密码。
可以把新建的这个用户名密码告诉他们。别的目录不属于这个用户的文件夹，他就没法访问了。。

# 运行：appwiz.cpl 添加ftp服务组件

# 右键计算机 -管理-服务应用程序管理-IIS管理 ，添加ftp站点

上传目录：一步一步设置，IP ,ftp上传目录，点口为21  ，基本，权限：可读可写，用户：所有用户，ssL可选，证书 ,完成。

下载目录：IP ，端口2121 ，用户：所有用户，SSL可选，基本，权限：可读，完成。

# 注意
如果你使用的用户是administrator ，需要FTP上传目录和下载目录，添加用户权限，加入新建的用户。


windows下访问，可在文件浏览器输入ftp://IP  默认端口21  
linux下访问 ,当前目录home/username/  ,输入ftp ip port   提示输入ftp服务器的用户名和密码
提示 user logged in。
ls 可显示ftp上面的文件和文件夹。
下载文件: get xxx   ./（/home/username/）
上传文件:  cd 进入到ftp的目录11/  cd 11 
         然后 put  home/username/index.php  ,就把index.php上传了。。
          







