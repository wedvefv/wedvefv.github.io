# apache支持python脚本

配置httpd.conf
追加：
```shell
LoadModule wsgi_module modules/mod_wsgi.so 

WSGIScriptAlias / C:/xampp/www/py/myweb/myweb/wsgi.py  
WSGIPythonPath C:/xampp/www/py/myweb   #django 项目目录
DocumentRoot "C:/xampp/www/py/myweb/myweb" #具体应用目录
<Directory "C:/xampp/www">

Options Indexes FollowSymLinks Includes ExecCGI
AllowOverride All
Require all granted
</Directory>
```
Options Indexes FollowSymLinks Includes ExecCGI
禁止显示Apache目录列表-Indexes FollowSymLinks
如何修改目录的配置以禁止显示 Apache 目录列表。
减号和去掉indexes是一样的效果 ，都是不存在index时，不要显示目录结构，安全起见。
xampp 中的不带减号，依然不可以访问目录。目前不知道原因。可能做了某些安全设置。

AllowOverride参数就是指明Apache服务器是否去找.htacess文件作为配置文件，如果设置为none,那么服务器将忽略.htacess文件，如果设置为All,那么所有在.htaccess文件里有的指令都将被重写。

Require all granted
    允许所有请求访问资源