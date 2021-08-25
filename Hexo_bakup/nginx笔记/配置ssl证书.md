+++
title="nginx 配置免费的ssl证书"
categories=["nginx"] 
tags=["nginx"] 
date="2020-02-03 14:33:58+0800"
toc=true
+++

## 免费证书申请

```text
wget https://dl.eff.org/certbot-auto
chmod   a+x   ./certbot-auto
./certbot-auto certonly --manual --preferred-challenge dns -d 'xxxx.cn' -d 'xxxxx.com'
 
会提示验证你的域名，如果你在腾讯云或者阿里云注册的域名，需要添加一个TXT类型的记录:

主机记录：_acme-challenge
记录类型： TXT
记录值： foRfz_Vr2vLVGw3U8WsFc4ohMWfk4oETX89vCi-0Lx4 （这个随机生成的，看你自己的是多少）

填写完保存，然后回到终端按下 回车键。
 
```

##  修改nginx 的配置文件

```text
    listen 80;  //.  后面添加下面的内容

	listen 443;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/xxx.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xxxx.com/privkey.pem;
    ssl_session_timeout 5m;

    #ssl_protocols  SSLv2 SSLv3 TLSv1;
    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    ssl_prefer_server_ciphers on;

```

reload nginx， 就可以用http方式访问域名了。