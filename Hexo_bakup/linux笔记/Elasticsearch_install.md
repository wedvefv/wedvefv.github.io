+++
title="Elasticsearch 安装笔记"
categories=["ES"] 
tags=["ES"] 
date="2019-06-29 23:10:00+0800"
toc=true
+++


### 1.概况
![](http://192.168.1.8:1234/server/index.php?s=/api/attachment/visitFile/sign/0803a3b7478a5ce3bc777787c9157acd&showdoc=.jpg)
- 图片是elasticsearch-head插件查看的集群状态
- 这是一台虚拟机，创建了index为megacorp, ES默认是5个分片，然后每个分片一个副本，也就是10个分片;三个节点，就会出现如图的样子。
- 同一个分片必然不在一个节点，不然副本就没意义了。
- 绿色表示状态健康，黄色表示主分片能工作写入，副本分片可能不正常；比如只有一个节点的情况

### 2.数据预览
![](http://192.168.1.8:1234/server/index.php?s=/api/attachment/visitFile/sign/63812f26961deb2e9a886deef765ba11&showdoc=.jpg)
- 上图可能会感觉 employee是表，但是这个type字段7.x版本就去除了。
有人说索引类似MySQL的数据库，其实我觉得不太合适，索引应该是表，ES并没有数据库这一层。
- 可以看出我们设置的数据是_source字段, id 是插入数据时随机生成的。
- 6.3以上的版本就有了elasticsearch-sql-cli工具，俨然快成数据库了....,可以看出index其实是表而不是库。

![](http://192.168.1.8:1234/server/index.php?s=/api/attachment/visitFile/sign/15eca3b156876d2e3df90b861eb86e91&showdoc=.jpg)

## 3.如何启动安装启动ES
### 启动单节点
```sh
cd /usr/local/src
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.3.0.zip
unzip  elasticsearch-6.3.0.zip
cd elasticsearch-6.3.0
./bin/elasticsearch -d 
(-d表示放到后台运行了)
```

### 启动集群，三个节点
- 复制三份刚才的解压的文件夹, 配置端口不一致就ok了
```sh
mkdir /usr/local/server1
mkdir /usr/local/server2
mkdir /usr/local/server3
cp -rf /usr/local/src/elasticsearch-6.3.0/* /usr/local/server1
cp -rf /usr/local/src/elasticsearch-6.3.0/* /usr/local/server2
cp -rf /usr/local/src/elasticsearch-6.3.0/* /usr/local/server3
```

- 修改/usr/local/server1/config/elasticsearch.yml 修改或者添加部分如下
```sh
cluster.name: my-application
node.name: master
http.cors.enabled: true
http.cors.allow-origin: "*"
network.host: 0.0.0.0
http.port: 9200
transport.tcp.port: 9300
discovery.zen.ping.unicast.hosts: ["127.0.0.1:9300", "127.0.0.1:9310","127.0.0.1:9320"]
```
```shell
egrep -v "^#|^$" config/elasticsearch.yml 命令可以确认
```
- 修改/usr/local/server2/config/elasticsearch.yml
```sh
cluster.name: my-application
node.name: slave1 
http.cors.enabled: true
http.cors.allow-origin: "*"
network.host: 0.0.0.0
http.port: 9210
transport.tcp.port: 9310
discovery.zen.ping.unicast.hosts: ["127.0.0.1:9300", "127.0.0.1:9310","127.0.0.1:9320"]
```
- 修改/usr/local/server3/config/elasticsearch.yml
```sh
cluster.name: my-application
node.name: slave2
http.cors.enabled: true
http.cors.allow-origin: "*"
network.host: 0.0.0.0 
http.port: 9220
transport.tcp.port: 9320
discovery.zen.ping.unicast.hosts: ["127.0.0.1:9300", "127.0.0.1:9310","127.0.0.1:9320"]
```

- 解释一下
  - cluster.name 集群名字必须一样 
   - node.name 节点名字不要一样
   - 以下两行是跨域设置，不然3个节点之间是互相发现不了的。
   - http.cors.enabled: true
   - http.cors.allow-origin: "*" 
   - 在外部可以允许外部ip访问操作节点， 不然只能是在本地使用127.0.0.1访问ES
   - network.host: 0.0.0.0 这个是访问节点的ip
   - http.port 9200 节点对外端口
   - transport.tcp.port: 9320 这个是节点内部同步数据使用的端口
   - discovery.zen.ping.unicast.hosts: 这是节点列表

- 启动三个ES服务把
   - 分别进入/usr/local/server1, /usr/local/server2, /usr/local/server3 
执行./bin/elasticsearch -d 放入后台运行就好了，可能需要1，2分钟。。

   - 查看节点健康状态信息
```sh
可以通过任意节点ip和端口，比如节点1， 端口9200，在浏览器访问，返回的是json信息
http://192.168.1.8:9200/_cluster/health?pretty
```
   - 查看节点数
```sh
    同样三个节点是对等的，所以任意ip和对应端口都能获取到结果:
    http://localhost:9200/_cat/nodes?v
```

- elasticsearch-head插件
  - 这个安装需要node版本是9以上，可以百度安装
  - node -v 没问题了，就可以装了
  - 命令如下
```sh
git clone git://github.com/mobz/elasticsearch-head.git
cd elasticsearch-head
npm install
#这时候可能会报错需要升级openssl,如果没报错则不用安装
yum update openssl -y
#再安装
npm install
npm run start
```

### 添加数据
  - 可以通过url发送POST请求，这是我用openresty写的一个lua接口
```lua
local http =  require("resty.http")
local json = require("cjson")
for i=0, 500000 do
    local httpc = http:new()
    local name  = "name_"..i
    local age = math.random(30,100);
    local addr = "addr_"..i
    local body1 = {
          ["name"] =  name,
            ["age"]=  age,
            ["addr"]= addr
    }    
    local url = "http://192.168.1.8:9200/megacorp/employee/?pretty"
   local res, err_ = httpc:request_uri(url, {
        method = "POST",
        body = json.encode(body1),
        headers = {
            ["Content-Type"] = "application/json",
        }
    })
    print(err)
end 
```
  - 我测了一下mysql 400万数据(我这数据只有id，name，age，addr四个字段)，我用like匹配了一下addr，同样400万条数据觉得ES的SQL还是要快很多。。

### 既然是搜索引擎，如何查询呢
  - 可以通过简单的q指定关键字段或者DSL(领域特定语言)
```shell
curl -XGET 'localhost:9200/megacorp/employee/_search?q=name:name_100&pretty'
#或者 DSL ,这个比较复杂了， 需要GET方式，且有请求体json
curl -XGET 'localhost:9200/megacorp/employee/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "match" : {
        "last_name" : "Smith"
        }
    }
}'
```

- 参考了[这篇文章](https://www.linuxidc.com/Linux/2019-01/156356.htm)，自己实践一把，好费劲，有点类似单机配置kafka。
* 新版本可以用SQL了。。。。。。就简单记这么多吧。。。