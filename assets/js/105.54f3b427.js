(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{505:function(_,v,t){"use strict";t.r(v);var e=t(56),s=Object(e.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"scrapy-爬虫学习"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#scrapy-爬虫学习"}},[_._v("#")]),_._v(" scrapy 爬虫学习")]),_._v(" "),t("ul",[t("li",[_._v("开启项目: scrapy startproject example")]),_._v(" "),t("li",[_._v("定义爬虫文件: cd example; scrapy genspider book_psider http://books.toscrape.com/")]),_._v(" "),t("li",[_._v("定义数据最终需要的字段, 修改items.py。")]),_._v(" "),t("li",[_._v("如果不用pipeline处理，则yeild item， 直接 -o 到文件json文件即可。")]),_._v(" "),t("li",[_._v("执行爬虫 scrapy crawl book_spider -o book.json")])]),_._v(" "),t("h2",{attrs:{id:"_2-核心概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-核心概念"}},[_._v("#")]),_._v(" 2. 核心概念")]),_._v(" "),t("h3",{attrs:{id:"爬虫组件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#爬虫组件"}},[_._v("#")]),_._v(" 爬虫组件")]),_._v(" "),t("table",[t("thead",[t("tr",[t("th",[_._v("组件")]),_._v(" "),t("th",[_._v("描述")]),_._v(" "),t("th",[_._v("类型")])])]),_._v(" "),t("tbody",[t("tr",[t("td",[_._v("ENGINE")]),_._v(" "),t("td",[_._v("引擎，框架核心组件")]),_._v(" "),t("td",[_._v("内部组件")])]),_._v(" "),t("tr",[t("td",[_._v("SCHEDULER")]),_._v(" "),t("td",[_._v("调度器")]),_._v(" "),t("td",[_._v("内部组件")])]),_._v(" "),t("tr",[t("td",[_._v("DOWNLOADER")]),_._v(" "),t("td",[_._v("下载器")]),_._v(" "),t("td",[_._v("内部组件")])]),_._v(" "),t("tr",[t("td",[_._v("SPIDER")]),_._v(" "),t("td",[_._v("爬虫，负责提取页面数据，发起页面请求")]),_._v(" "),t("td",[_._v("用户实现")])]),_._v(" "),t("tr",[t("td",[_._v("MIDDLEWARE")]),_._v(" "),t("td",[_._v("中间件，负责对req和res对象的处理")]),_._v(" "),t("td",[_._v("可选组件")])]),_._v(" "),t("tr",[t("td",[_._v("ITEM PEIPELINE")]),_._v(" "),t("td",[_._v("数据管道")]),_._v(" "),t("td",[_._v("可选组件")])])])]),_._v(" "),t("h3",{attrs:{id:"爬虫流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#爬虫流程"}},[_._v("#")]),_._v(" 爬虫流程")]),_._v(" "),t("ul",[t("li",[_._v("request和response，item三个主要对象。")]),_._v(" "),t("li",[_._v("爬虫文件， 利用url构造一个request对象交给 ENGINE")]),_._v(" "),t("li",[_._v("ENGINE将request对象加入调度器队列排队，之后取出交给下载器")]),_._v(" "),t("li",[_._v("下载器根据request对象发起http请求，生成response对象，传递到ENGINE。")]),_._v(" "),t("li",[_._v("response对象最后送回爬虫文件，由parse函数处理，提取数据成item定义的格式，送回ENGINE")]),_._v(" "),t("li",[_._v("数据最后被送往PIPELINE处理，或者EXPORTER直接导出json、csv等格式。")]),_._v(" "),t("li",[_._v("parse可能继续构造request交给ENGINE处理，循环爬取....")])]),_._v(" "),t("h3",{attrs:{id:"request对象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#request对象"}},[_._v("#")]),_._v(" request对象")]),_._v(" "),t("ul",[t("li",[_._v("url 参数")]),_._v(" "),t("li",[_._v("callback参数")]),_._v(" "),t("li",[_._v("method参数， 默认GET")]),_._v(" "),t("li",[_._v("headers 请求头")]),_._v(" "),t("li",[_._v("body POST参数")]),_._v(" "),t("li",[_._v("cookies cookie 字典信息,dict类型")]),_._v(" "),t("li",[_._v("meta 元数据字典，dict类型，用于给Pipeline中间件或处理函数传递数据。")]),_._v(" "),t("li",[_._v("encoding 默认编码方式 utf8, 如果url和body体是str，就用该参数编码。")]),_._v(" "),t("li",[_._v("priority 请求优先级，默认0. 优先级高的先下载。")]),_._v(" "),t("li",[_._v("dont_filter ，默认false。 对同一个请求，只会下载一次，如果需要重复请求下载，设置为true，比如频繁更新的同一url。")]),_._v(" "),t("li",[_._v("errback 请求出现异常的回调函数。")]),_._v(" "),t("li",[_._v("除了url，其他有默认值。我们只需要关心url和callback函数。")])]),_._v(" "),t("h3",{attrs:{id:"response对象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#response对象"}},[_._v("#")]),_._v(" response对象")]),_._v(" "),t("ul",[t("li",[_._v("response是一个父类， 具体根据内容可能是TextResponse，HtmlResponse，XmlResponse")]),_._v(" "),t("li",[_._v("请求完成后，根据http响应的content-type确定子类对象。")]),_._v(" "),t("li",[_._v("TextResponse是其他两个的父类，三者微小的差别。")]),_._v(" "),t("li",[_._v("url，响应的url")]),_._v(" "),t("li",[_._v("status http状态码")]),_._v(" "),t("li",[_._v('headers 相应头部.， 可以get获取response.headers.get("Content-Type")')]),_._v(" "),t("li",[_._v("body, 响应征文。bytes类型")]),_._v(" "),t("li",[_._v("text 响应正文，str类型。由body使用response.encoding 解码得到。")]),_._v(" "),t("li",[_._v("encoding http响应正文的编码， 一般由http响应头部解析出来。")]),_._v(" "),t("li",[_._v("request http响应的Reuquest对象。")]),_._v(" "),t("li",[_._v("meta  实际是response.request.meta , 通过response.meta 使用。")]),_._v(" "),t("li",[_._v("selector 选择器，用于提取数据。")]),_._v(" "),t("li",[_._v("xpath xpath选择器，用于提取数据。")]),_._v(" "),t("li",[_._v("css css选择器。")]),_._v(" "),t("li",[_._v("urljoin(url) 构造出绝对路径url。")])]),_._v(" "),t("h2",{attrs:{id:"_3-编写爬虫文件-spider"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-编写爬虫文件-spider"}},[_._v("#")]),_._v(" 3. 编写爬虫文件 spider")]),_._v(" "),t("ul",[t("li",[_._v("编写 start_requests函数")]),_._v(" "),t("li",[_._v("编写parse函数")])]),_._v(" "),t("h2",{attrs:{id:"_4-选择器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-选择器"}},[_._v("#")]),_._v(" 4. 选择器")]),_._v(" "),t("h3",{attrs:{id:"selector选择器-css"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#selector选择器-css"}},[_._v("#")]),_._v(" Selector选择器(CSS)")]),_._v(" "),t("ul",[t("li",[_._v("可以直接通过html文本作为Selector参数")]),_._v(" "),t("li",[_._v("可以直接用Reponse响应对象作为Selector的response参数 Selector(response=response)")]),_._v(" "),t("li",[_._v("构造了对象，可以用xpath方法或者css方法， 返回的是list， 里面还是子的Selector对象，可以继续迭代。")]),_._v(" "),t("li",[_._v("Selector对象可以有以下方法取数据\n"),t("ul",[t("li",[_._v('selector.xpath(".//li")[0].extract() 返回整个li标签  '),t("code",[_._v("<li>xxxxx</li>")])]),_._v(" "),t("li",[_._v("选择器列表使用extract_first 相当于直接取第一个选择器的内容 == text() 然后extract()[0]")]),_._v(" "),t("li",[_._v("xpath获得的列表，可以直接使用.re(), 会自动将列表中每个元素都正则过滤一下。")]),_._v(" "),t("li",[_._v("列表的re_first() 方法同样直接去第一个内容，并匹配正则。")]),_._v(" "),t("li",[_._v("为了方便，response 会自动创建selector对象， 而且定义了xpath和css方法，实际调用的是selector对象的xpath和css方法。")])])])]),_._v(" "),t("h3",{attrs:{id:"xpath-选择器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#xpath-选择器"}},[_._v("#")]),_._v(" xpath 选择器")]),_._v(" "),t("ul",[t("li",[_._v("html也属于xml文档，都是树结构")]),_._v(" "),t("li",[_._v("/ 跟路径")]),_._v(" "),t("li",[_._v("./当前节点")]),_._v(" "),t("li",[_._v("..当前节点的父节点")]),_._v(" "),t("li",[_._v("E 选择当前节点中的全部E元素")]),_._v(" "),t("li",[_._v("//E 选择html下的全部E元素")]),_._v(" "),t("li",[t("ul",[t("li",[_._v("全部元素")])])]),_._v(" "),t("li",[_._v("text() 元素的文本内容")]),_._v(" "),t("li",[_._v("@attr 元素的某个属性 比如 @href")]),_._v(" "),t("li",[_._v("@* 全部属性")]),_._v(" "),t("li",[_._v("/div[@id] 含有id属性的div")]),_._v(" "),t("li",[_._v('/div[@id="xxx"] id等于xxx的div')]),_._v(" "),t("li",[_._v('/div[@class="xxx"] class等于xxx的div')]),_._v(" "),t("li",[_._v("//a[last()] 最后一个a")]),_._v(" "),t("li",[_._v("//a[position() <=3] 选中前三个")]),_._v(" "),t("li",[_._v("string(路径).extract() 会把列表中内容连接成一个字符串，放入列表。")]),_._v(" "),t("li",[_._v("contains(x, y ) 判断x中是否包含y")])]),_._v(" "),t("h3",{attrs:{id:"css-选择器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#css-选择器"}},[_._v("#")]),_._v(" CSS 选择器")]),_._v(" "),t("ul",[t("li",[_._v("* 全部元素")]),_._v(" "),t("li",[_._v("E 选中E元素")]),_._v(" "),t("li",[_._v("E1,E2 选中E1，E2元素")]),_._v(" "),t("li",[_._v("E1 E2 选中E1后代，和E1同一级的元素中的E2元素")]),_._v(" "),t("li",[_._v("E1>E2 E1子元素中的E2")]),_._v(" "),t("li",[_._v(".cls 选中class属性是cls的元素")]),_._v(" "),t("li",[_._v("#idd 选中id为idd的元素")]),_._v(" "),t("li",[_._v("[href] 包含href属性的元素")]),_._v(" "),t("li",[_._v('[href="www"] href属性等于www的元素')]),_._v(" "),t("li",[_._v('[href~="www"] href属性值不等于www的元素')]),_._v(" "),t("li",[_._v("E:nth-child(n) 选择E元素，E元素是他爹的第n的子元素")]),_._v(" "),t("li",[_._v("E:nth-last-child(n)  选择E，且E是她爹的倒数第n个元素")]),_._v(" "),t("li",[_._v("E:first-child 选择E，且E必须是她爹的第一个元素")]),_._v(" "),t("li",[_._v("E:last-child 选择E， 且E是她爹的倒数第一个元素")]),_._v(" "),t("li",[_._v("E:empty  选中没有子元素的E元素")]),_._v(" "),t("li",[_._v("E:text 选中E的文本内容")])]),_._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/wedvefv/scrapy_example"}},[_._v("我练习scrapy的代码 ")])])])}),[],!1,null,null,null);v.default=s.exports}}]);