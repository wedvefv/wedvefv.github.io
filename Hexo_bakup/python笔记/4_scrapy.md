+++
title="scrapy笔记"
categories=["python"] 
tags=["python"] 
date="2019-06-12 21:00:00+0800"
toc=true
+++


## 1.初识爬虫

* 开启项目: scrapy startproject example 
* 定义爬虫文件: cd example; scrapy genspider book_psider http://books.toscrape.com/
* 定义数据最终需要的字段, 修改items.py。
* 如果不用pipeline处理，则yeild item， 直接 -o 到文件json文件即可。
* 执行爬虫 scrapy crawl book_spider -o book.json

## 2. 核心概念

### 爬虫组件

|组件|描述|类型|
|-|-|-|
|ENGINE|引擎，框架核心组件|	内部组件|
|SCHEDULER|调度器|	 内部组件|
|DOWNLOADER|下载器|	内部组件|	
|SPIDER|爬虫，负责提取页面数据，发起页面请求|	用户实现|
|MIDDLEWARE|中间件，负责对req和res对象的处理|	可选组件|
|ITEM PEIPELINE|数据管道|	可选组件|

### 爬虫流程

* request和response，item三个主要对象。
* 爬虫文件， 利用url构造一个request对象交给 ENGINE
* ENGINE将request对象加入调度器队列排队，之后取出交给下载器
* 下载器根据request对象发起http请求，生成response对象，传递到ENGINE。
* response对象最后送回爬虫文件，由parse函数处理，提取数据成item定义的格式，送回ENGINE
* 数据最后被送往PIPELINE处理，或者EXPORTER直接导出json、csv等格式。
* parse可能继续构造request交给ENGINE处理，循环爬取....

### request对象

* url 参数
* callback参数
* method参数， 默认GET
* headers 请求头
* body POST参数
* cookies cookie 字典信息,dict类型
* meta 元数据字典，dict类型，用于给Pipeline中间件或处理函数传递数据。
* encoding 默认编码方式 utf8, 如果url和body体是str，就用该参数编码。
* priority 请求优先级，默认0. 优先级高的先下载。
* dont_filter ，默认false。 对同一个请求，只会下载一次，如果需要重复请求下载，设置为true，比如频繁更新的同一url。
* errback 请求出现异常的回调函数。
* 除了url，其他有默认值。我们只需要关心url和callback函数。

### response对象

* response是一个父类， 具体根据内容可能是TextResponse，HtmlResponse，XmlResponse
* 请求完成后，根据http响应的content-type确定子类对象。
* TextResponse是其他两个的父类，三者微小的差别。
* url，响应的url
* status http状态码
* headers 相应头部.， 可以get获取response.headers.get("Content-Type")
* body, 响应征文。bytes类型
* text 响应正文，str类型。由body使用response.encoding 解码得到。
* encoding http响应正文的编码， 一般由http响应头部解析出来。
* request http响应的Reuquest对象。
* meta  实际是response.request.meta , 通过response.meta 使用。
* selector 选择器，用于提取数据。
* xpath xpath选择器，用于提取数据。
* css css选择器。
* urljoin(url) 构造出绝对路径url。


## 3. 编写爬虫文件 spider

* 编写 start_requests函数
* 编写parse函数

## 4. 选择器

### Selector选择器(CSS)

   * 可以直接通过html文本作为Selector参数
   * 可以直接用Reponse响应对象作为Selector的response参数 Selector(response=response)
   * 构造了对象，可以用xpath方法或者css方法， 返回的是list， 里面还是子的Selector对象，可以继续迭代。
   * Selector对象可以有以下方法取数据
       * selector.xpath(".//li")[0].extract() 返回整个li标签  `<li>xxxxx</li>`
       * 选择器列表使用extract_first 相当于直接取第一个选择器的内容 == text() 然后extract()[0]
       * xpath获得的列表，可以直接使用.re(), 会自动将列表中每个元素都正则过滤一下。
       * 列表的re_first() 方法同样直接去第一个内容，并匹配正则。
       * 为了方便，response 会自动创建selector对象， 而且定义了xpath和css方法，实际调用的是selector对象的xpath和css方法。

### xpath 选择器

   * html也属于xml文档，都是树结构
   * / 跟路径
   * ./当前节点
   * ..当前节点的父节点
   * E 选择当前节点中的全部E元素
   * //E 选择html下的全部E元素
   * * 全部元素
   * text() 元素的文本内容
   * @attr 元素的某个属性 比如 @href
   * @* 全部属性
   * /div[@id] 含有id属性的div
   * /div[@id="xxx"] id等于xxx的div
   * /div[@class="xxx"] class等于xxx的div
   * //a[last()] 最后一个a
   * //a[position() <=3] 选中前三个
   * string(路径).extract() 会把列表中内容连接成一个字符串，放入列表。
   * contains(x, y ) 判断x中是否包含y

### CSS 选择器
   * \* 全部元素
   * E 选中E元素
   * E1,E2 选中E1，E2元素
   * E1 E2 选中E1后代，和E1同一级的元素中的E2元素
   * E1>E2 E1子元素中的E2
   * .cls 选中class属性是cls的元素
   * #idd 选中id为idd的元素
   * [href] 包含href属性的元素
   * [href="www"] href属性等于www的元素
   * [href~="www"] href属性值不等于www的元素
   * E:nth-child(n) 选择E元素，E元素是他爹的第n的子元素
   * E:nth-last-child(n)  选择E，且E是她爹的倒数第n个元素
   * E:first-child 选择E，且E必须是她爹的第一个元素
   * E:last-child 选择E， 且E是她爹的倒数第一个元素
   * E:empty  选中没有子元素的E元素
   * E:text 选中E的文本内容
   
<a href="https://github.com/wedvefv/scrapy_example">我练习scrapy的代码 </a>