+++
title="tp5url和路由"
categories=["html"] 
tags=["html"] 
date="2021-06-12 12:00:00+0800"
toc=false
+++


## ngxin配置文件

```perl
server {
	listen 81;

    set $root  /usr/local/openresty/nginx/php/tp5/public;
    #access_log /usr/local/openresty/nginx/logs/access.log;
    #默认请求
    location / {
        root $root;
        #index index.php index.html index.htm;
        #定义首页索引文件的名称
        #if ( -f $request_filename) {
	    #    echo $request_filename;
        #    break;
        #}
        
        # 隐藏index.php
        if ( !-e $request_filename) {
	        rewrite ^(.*)$ /index.php?s=/$1 last;
	        break;
        }
    }
    
    location ~ .+\.php($|/) {
        set $script $uri;
        set $path_info "";
        if ($uri ~ "^(.+\.php)(/.+)") {
            set $script $1;
            set $path_info $2;
        }
	    fastcgi_pass 127.0.0.1:9000;
        fastcgi_index    index.php?IF_REWRITE=1;
        fastcgi_param    PATH_INFO    $path_info;
        fastcgi_param    SCRIPT_FILENAME    $root$fastcgi_script_name;
        fastcgi_param    SCRIPT_NAME    $script;
        include        fastcgi_params;
    }
}
```



## url访问

- http://serverName/index.php/模块/控制器/操作

- 默认目录都是小写字母命名

- 进入到php/tp5根目录 php think build --module index2 ; 就创建了一个index2模块目录
- http://192.168.1.8/index.php  等价于（省略了/index/index/index）
- 控制器和操作是不区分大小写的，可以大写，可以小写
- php **单引号是不能用变量插入的，必须双引号**
- url参数可以直接用/ 分隔，不用写key，直接写value。php代码自动按顺序读取
- 或者直接使用a=10&b=20这样指定get参数 



## 定义路由

```php
return [
    '__pattern__' => [
        'name' => '\w+',
    ],

/*
    "hello/:name" => function($name){
	    return "hello ".$name."!";
    },
*/
    'hello/[:name]' => ['index/index/hello',['method'=>'get']]
    
	// [:name] 可选参数 /dd 则name=dd， 否则dd=null
];

```



## 命名空间

### 自动注册

- 使用时直接use  my;的方式  使用extend\my下的php文件类

- 正常情况下是 extend目录下的的自定义命名空间类库
- define('EXTEND_PATH', '../vendor'); 可以将默认的extend目录修改到vendor下

### 手动注册



