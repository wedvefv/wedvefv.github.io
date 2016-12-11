----
layout: post
title: nginx  support  php
category: linux
tags: linux 
date: 2016-12-10 11:30:55
comments: true

----

#  ubuntu14.04 +nginx+php5-fpm

## 一，安装Nginx

　　apt-get install nginx

　　1，配置nginx

　　　　nginx所有的配置在 /etc/nginx/nginx.conf中

　　　　nginx.conf配置里面包括了

　　　　　　include /etc/nginx/conf.d/*.conf;
        　　　include /etc/nginx/sites-enabled/*;
        这两个配置，所以这里面的配置也是有效的。
       错误日志 error_log /var/log/nginx/error.log;
 
　　这里我们把配置写在 /etc/nginx/sites-available/default中
　　修改  root /usr/share/nginx/html;   这是网页的根目录，默认里面有一个index.html页面
     index  index.html index.htm修改成index index.php index.html index.htm;
     增加  
       
　　location ~ \.php$ {
              　　  try_files $uri =404;
              　　  fastcgi_pass 127.0.0.1:9000;
              　　  fastcgi_index index.php;
              　　  include fastcgi_params;
      　　  }
 
　　2，保存文件，使配置生效 /etc/init.d/nginx reload
 
　　3，启动nginx
　　　　/etc/init.d/nginx start
 
　　4，在 /usr/share/nginx/html下新建index.php
　　　　<? php
　　　　phpinfo();
　　　　?>

## 二 安装php

sudo apt-get install php5-fpm

sudo apt-get install php5-gd  # Popular image manipulation library; used extensively by Wordpress and it's plugins.
sudo apt-get install php5-cli   # Makes the php5 command available to the terminal for php5 scripting
sudo apt-get install php5-curl    # Allows curl (file downloading tool) to be called from PHP5
sudo apt-get install php5-mcrypt   # Provides encryption algorithms to PHP scripts
sudo apt-get install php5-mysql   # Allows PHP5 scripts to talk to a MySQL Database
sudo apt-get install php5-readline  # Allows PHP5 scripts to use the readline function

查看php5运行进程

ps -waux | grep php5

打开关闭php5进程

sudo service php5-fpm stop
sudo service php5-fpm start
sudo service php5-fpm restart
sudo service php5-fpm status

配置php5监听端口  /etc/php5/fpm/pool.d/www.conf

把

listen = /var/run/php5-fpm.sock  改为

listen = 127.0.0.1:9000

重新运行php进程
