+++
title="python http请求"
categories=["python"] 
tags=["python"] 
date="2020-06-13 14:00:00+0800"
toc=true
+++

## urlib 模块

* urlib.urlopen(url) 只由url参数，不能设置header等信息
* urllib有urlencode函数，可以把字典编码转成get参数（&方式连接）, urllib2 没有
* urllib.quote(s, safe='/') 是转义编码用的, 默认不编码/, 且把空格转成%20
* urllib.quote_plus(s, safe='') 默认全部编码, 会调用quote(s, safe=' ') 不编码空格, 最后替换s中的空格为+ 号。 
* urllib.urlretrieve(url, filename="xxx.log") 可以直接下载网页写入文件。

## urllib2 模块

* urllib2.Request(url,data,headers) 构造一个Request对象
* urllib2.urlopen(request对象或者url)，如果传url只能是url，不能附带header和data。
* 由于urllib2 没有编码函数，所以经常和urllib一起导入，使用urlencode函数或者quote函数。
* cookie支持方法 

```python
cookie=cookielib.CookieJar() # 声明CookieJar对象实例来保存cookie
	handler=urllib2.HTTPCookieProcessor(cookie) # 利用urllib2库的HTTPCookieProcessor对象来创建cookie处理器
	opener=urllib2.build_opener(handler) # 通过handler构建opener
	urllib2.install_opener(opener)
```

* 如果没有data字段就是get方式，否则是post请求
* 如果post是json格式， headr指定json，data需要json.dumps()
* 如果表单方式，需要data需要urllib.urlencode() 
* request 对象有add_header(key,value)函数, 添加header 字段名key，值是value。
* urlopen(url, timeout=1) 可以有超时函数,单位秒
* read() 读取返回body数据

```python
# 使用代理服务器, 打开请求过程的 debuglog
def use_proxy(proxy_addr, url, data, headers):
	print proxy_addr
	proxyHandler = urllib2.ProxyHandler({"http": proxy_addr})
	# build_opener(*handlers) 绑定一些句柄
	opener = urllib2.build_opener(proxyHandler, urllib2.HTTPHandler(debuglevel=1))
	urllib2.install_opener(opener)

	request = urllib2.Request(url, data=data, headers=headers)
	response = urllib2.urlopen(request,timeout=5)

	return response.read()

# linux 需要安装代理软件squid, 默认代理http_proxy 端口是3128

```

## 附带一个有道翻译接口例子

```python
#encoding=utf8

import urllib, urllib2
# 请求地址url
url = "http://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule"

request_headers = {
    "Host":'fanyi.youdao.com',
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
}
 
# 发送给服务器的表单
form_data = {
    "i": "woman",
    "from": "AUTO",
    "to": "AUTO",
    "smartresult": "dict",
    "doctype": "json",
    "version": "2.1",
    "keyfrom": "fanyi.web",
    "action": "FY_BY_REALTIME",
    "typoResult": "false"
}
 
# POST发送的data必须为bytes或bytes类型的可迭代对象，不能是字符串
form_data = urllib.urlencode(form_data) 
 
# 构造请求对象Request
# req = urllib2.Request(url, data=form_data, headers=request_headers)

def use_proxy(proxy_addr, url, data, headers):
	print proxy_addr
	proxy = urllib2.ProxyHandler({"http": proxy_addr})
	# build_opener(*handlers) 绑定一些句柄
	han = urllib2.build_opener(proxy, urllib2.HTTPHandler(debuglevel=1))
	urllib2.install_opener(han)
	print url
	request = urllib2.Request(url, data=data, headers=headers)
	response = urllib2.urlopen(request,timeout=5)

	return response.read()


# 发起请求
# response = urllib2.urlopen(req)
# data = response.read()

data = use_proxy("127.0.0.1:3128", url, form_data, request_headers)
print data
```

## URLError 异常

## request 模块
* 第三方模块，需要pip install 安装
* 其实也是封装了urllib3的功能, 也改进了一部分