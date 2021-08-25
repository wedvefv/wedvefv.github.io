+++
title="hugo模板语法"
categories=["go"]
tags=["hugo"] 
date="2021-08-19 12:00:00+0800"
toc=true
+++

## single模板

如果在markdown前面指定了type和layout，会优先选择顺序，一般使用single.html

```
/layouts/TYPE-or-SECTION/LAYOUT.html
/layouts/TYPE-or-SECTION/single.html
/layouts/_default/single.html
/themes/THEME/layouts/TYPE-or-SECTION/LAYOUT.html
/themes/THEME/layouts/TYPE-or-SECTION/single.html
/themes/THEME/layouts/_default/single.html

```

## list 模板

如果是content目录下的子目录，则比如post目录

访问 http://localhost:1313/post/ ， 则会渲染list.html 模板

post就是section类型的页面



## 模板嵌套规则

hugo引入了partial， template 只用来引入内部模板

如果用define 定义了模板名字，则子模板会输出到baseof.html 中block部分。

hugo会先找到需要解析的模板，比如single.html .如果开头有define 定义的模板名字，则将这个模板输出到baseof.html 中，放入block的位置。

baseof.html 相当于是顶级模板。



## with

with 是关键词 重新设置上下文

```html
{{with pipeline}} T1 {{end}}
如果pipeline的值为空, 点`.`的值不受影响,不输出任何结果
否则点`.`的值设置成pipeline的值, 输出T1

{{with pipeline}} T1 {{else}} T0 {{end}}
如果pipeline的值为空, 点`.`的值不受影响,输出T1
否则点`.`的值设置成pipeline的值, 输出T0
```



## define

```html
{{define "name"}} T1 {{end}}
定义一个特定名称的模板
```



## template

```html
{{template "name"}}
引入指定名称的模板, 不传入任何数据.

{{template "name" pipeline}}
引入指定名称的模板, 设置模板上下文点`.`的值为pipeline的值
```



## block

```html
{{block "name" pipeline}} T1 {{end}}
定义特定名称的模板, 并在当前位置引入该名称的模板, 模板的上下文点`.`的值为pipline的值, 
如果该名称的模板未实现(不存在), 则输出T1
就相当于在基础模板页中定义了一个子模板占位符.
```



## 循环

```html
{{range pipeline}} T1 {{end}}
pipeline的值必须是数组, 切片, map, channel. 
如果pipeline的长度为0则不会输出任何结果. 否则设置点`.`为数组, 切片, map的遍历值, 输出T1.
```



## 条件

```html
{{if pipeline}} T1 {{end}} 
如果pipeline为空则不会输出任何结果, 否则输出T1.
下面这些情况pipeline的值为空, false, 0, 值为nil的指针或接口, 长度为0的数组, 切片, map和字符串

{{if pipeline}} T1 {{else}} T0 {{end}}
如果不为空则输出T1, 否则输出T0

{{if pipeline}} T1 {{else if pipeline}} T0 {{end}}
```



## 模板

```bash
├── layouts
└── themes
    └── mytheme
        └── layouts
            ├── 404.html             // 404页面模板
            ├── _default
            │   ├── baseof.html      // 默认的基础模板页, 使用的方式是'拼接', 而不是'继承'.
            │   ├── list.html        // 列表模板  
            │   └── single.html      // 单页模板
            ├── index.html           // 首页模板
            └── partials             // 局部模板, 通过partial引入
                ├── footer.html
                ├── header.html
                └── head.html       
```



## content和URL的关系

```bash
└── content
    ├── _index.md          // [home]            <- https://example.com/ **
    ├── about.md           // [page]            <- https://example.com/about/
    ├── posts               
    |   ├── _index.md      // [section]         <- https://example.com/posts/ **         
    |   ├── firstpost.md   // [page]            <- https://example.com/posts/firstpost/
    |   ├── happy           
    |   |   ├── _index.md  // [section]         <- https://example.com/posts/happy/ **
    |   |   └── ness.md    // [page]            <- https://example.com/posts/happy/ness/
    |   └── secondpost.md  // [page]            <- https://example.com/posts/secondpost/
    └── quote   
        ├── _index.md      // [section]         <- https://example.com/quote/ **           
        ├── first.md       // [page]            <- https://example.com/quote/first/
        └── second.md      // [page]            <- https://example.com/quote/second/

// hugo默认生成的页面, 没有对应的markdown文章
分类列表页面               // [taxonomyTerm]    <- https://example.com/categories/  **
某个分类下的所有文章的列表  // [taxonomy]        <- https://example.com/categories/one-category  **
标签列表页面               // [taxonomyTerm]    <- https://example.com/tags/  **
某个标签下的所有文章的列表  // [taxonomy]        <- https://example.com/tags/one-tag  **
```



## functions 

delimit函数， 相当于explode函数 

```go
// Front matter
+++
tags: [ "tag1", "tag2", "tag3" ]
+++

// Used anywhere in a template
Tags: {{ delimit .Params.tags ", " }}

// Outputs Tags: tag1, tag2, tag3

// Example with the optional "last" parameter
Tags: {{ delimit .Params.tags ", " " and " }}

// Outputs Tags: tag1, tag2 and tag3
```



dict函数

字典可以传递给模板

```go
{{$important := .Site.Params.SomethingImportant }}
{{range .Site.Params.Bar}}
    {{partial "foo" (dict "content" . "important" $important)}}
{{end}}
```

“foo.html”

```
Important {{.important}}
{{.content}}
```

echoParam 函数，打印参数

```go
{{ echoParam .Params "project_url" }}
```



eq 函数, 如果相等则返回true

```go
{{ if eq .Section "blog" }}current{{ end }}
```

**first**函数 , 只遍历前10个元素

```go
{{ range first 10 .Data.Pages }}
    {{ .Render "summary" }}
{{ end }}
```



last函数，只遍历最后10个元素

```go
{{ range last 10 .Data.Pages }}
    {{ .Render "summary" }}
{{ end }}
```

after函数

```go
{{ range after 10 .Data.Pages }}
    {{ .Render "title" }}
{{ end }}
```



### getenv函数

```go
{{ getenv "HOME" }}
```



in函数

```go
{{ if in .Params.tags "Git" }}Follow me on GitHub!{{ end }}
```

or

```go
{{ if in "this string contains a substring" "substring" }}Substring found!{{ end }}
```



intersect函数, 求两个数组的交集

```go
<ul>
{{ $page_link := .Permalink }}
{{ $tags := .Params.tags }}
{{ range .Site.Pages }}
    {{ $page := . }}
    {{ $has_common_tags := intersect $tags .Params.tags | len | lt 0 }}
    {{ if and $has_common_tags (ne $page_link $page.Permalink) }}
        <li><a href="{{ $page.Permalink }}">{{ $page.Title }}</a></li>
    {{ end }}
{{ end }}
</ul>
```



### isset函数， 值是否被设置。已设置返回true

```go
{{ if isset .Params "project_url" }} {{ index .Params "project_url" }}{{ end }}
```



### seq 整数序列

### sort函数。排列数组，切片，map。 返回sorted slice

```go
// Front matter
+++
tags: [ "tag3", "tag1", "tag2" ]
+++

// Site config
+++
[params.authors]
  [params.authors.Derek]
    "firstName"  = "Derek"
    "lastName"   = "Perkins"
  [params.authors.Joe]
    "firstName"  = "Joe"
    "lastName"   = "Bergevin"
  [params.authors.Tanner]
    "firstName"  = "Tanner"
    "lastName"   = "Linsley"
+++

// Use default sort options - sort by key / ascending
Tags: {{ range sort .Params.tags }}{{ . }} {{ end }}

// Outputs Tags: tag1 tag2 tag3

// Sort by value / descending
Tags: {{ range sort .Params.tags "value" "desc" }}{{ . }} {{ end }}

// Outputs Tags: tag3 tag2 tag1

// Use default sort options - sort by value / descending
Authors: {{ range sort .Site.Params.authors }}{{ .firstName }} {{ end }}

// Outputs Authors: Derek Joe Tanner

// Use default sort options - sort by value / descending
Authors: {{ range sort .Site.Params.authors "lastName" "desc" }}{{ .lastName }} {{ end }}

// Outputs Authors: Perkins Linsley Bergevin
```



## where

```go
// Front matter on some pages
+++
series: golang
+++

{{ range where .Site.Pages "Params.series" "golang" }}
   {{ .Content }}
{{ end }}
```



## chomp

删除字符串末尾的\n



## highlight

## lower

转小写

## markdownify

经过markdown处理器过滤。go模板不会过滤。

````go
{{ .Title | markdownify }}
````



## pluralize 变成复数名词

````go
{{ "cat" | pluralize }} → “cats”
````



## replace

```go
{{ replace "Batman and Robin" "Robin" "Catwoman" }} → “Batman and Catwoman”
```



## safeHTML

```go
copyright = "© 2015 Jane Doe.  <a href=\"http://creativecommons.org/licenses/by/4.0/\">Some rights reserved</a>."
{{ .Site.Copyright | safeHTML }} would then output:
© 2015 Jane Doe. Some rights reserved.
```

## safeCSS

```go
Example: Given style = "color: red;" defined in the front matter of your .md file:

<p style="{{ .Params.style | safeCSS }}">…</p> ⇒ <p style="color: red;">…</p> (Good!)
<p style="{{ .Params.style }}">…</p> ⇒ <p style="ZgotmplZ">…</p> (Bad!)
```

## safeJS

```go
Example: Given hash = "619c16f" defined in the front matter of your .md file:

<script>var form_{{ .Params.hash | safeJS }};…</script> ⇒ <script>var form_619c16f;…</script> (Good!)
<script>var form_{{ .Params.hash }};…</script> ⇒ <script>var form_"619c16f";…</script> (Bad!)

```



## singularize 转单数

```go
{{ "cats" | singularize }} → “cat”
```



## slicestr

```go
{{slicestr "BatMan" 3}} → “Man”
{{slicestr "BatMan" 0 3}} → “Bat”
```



## substr

````go
{{substr "BatMan" 0 -3}} → “Bat”
{{substr "BatMan" 3 3}} → “Man”
````



## title

```go
{{title "BatMan"}} → “Batman”

```



## trim

```go
{{ trim "++Batman--" "+-" }} → “Batman”
```



## upper 

```go
{{upper "BatMan"}} → “BATMAN”
```

## URLs

```go
{{ "mystyle.css" | absURL }} → “http://mysite.com/hugo/mystyle.css"
{{ "mystyle.css" | relURL }} → “/hugo/mystyle.css”
{{ "http://gohugo.io/" | relURL }} → “http://gohugo.io/"
{{ "http://gohugo.io/" | absURL }} → “http://gohugo.io/"
```



## Page 变量



Tile  文章的标题

Content 文章内容

Summary  文章内容摘要

Truncated 如果是true，会显示 **阅读更多**链接

Description 文章描述

Keywords  文章元数据 keywords

Date 关联的日期

PublishDate 文章发布时间

Type 文章类型

Section 文章的归属

Permalink 文章的固定链接

RelPermalink 文章相对永久链接

LinkTitle 

RSSLink

**TableOfContents** 文章目录, markdown 目录必须是##（二级标题） 不能是#

Prev  上一篇文章

Next 下一篇文章

PrevInSection

NextInSection

**FuzzyWordCount**  文章大致字数

**WordCount**文章字数

**ReadingTime** 阅读需要的时间

**Weight** 权重，用于文章排序

** RawContent** 没有元数据头的markdown内容 Useful with [remarkjs.com](http://remarkjs.com/)

**Draft** 是否标记为草稿，true是

**IsNode** 对于页面总是false

**IsPage** 对于页面总是true

**Site** 网站相关的数据，是个对象

​	

Hugo huog相关的数据，也是对象



## 页面参数

markdown文件头部数据，可以用 .Params.tags的方式访问

访问只能用小写方式

```go
<a href='{{ .Params.baidu }}'>百度</a>
或者
<a href='{{ $.Params.baidu }}'>百度</a>
```



## $.Param 方法

$.Param("image")  可以安全的在模板中使用

```go
<a href='{{ $.Param "baidu" }}'>百度</a>
```



## 结点变量（node Varibles)

Title 文章标题

Date 文章发布时间

Permalink 文章永久链接

URL 相对于Node的链接

Ref(ref) 返回ref的永久链接

RelRef(ref) 返回ref的相对链接

Data 传递给结点的数据

isHome 如果Node是主页，则是true

isNode 如果时候node，则是true

isPage 如果是node，则是false

Site 网站对象

Hugo hugo对象



## Taxonomy term 变量

Data.Singular 单数形式的分类名

Data.Plural  复数形式的分类名

Data.Pages taxonomy 这个分类的pages列表

Data.Terms 分类本身

Data.Terms.Alphabetical  按字母顺序排序

Data.Terms.ByCount 按欢迎度排序

**.Data.Terms.Alphabetical.Reverse** 倒序

**.Data.Terms.ByCount.Reverse** 倒序



Site 变量

Site.**BaseURL** 配置文件中的BaseUrl

Site.RSSLink  rss site的URL

Site.Taxonomies 整个站点的分类方法， 取代.Site.Indexes 从v0.11开始

SIte.Pages 返回全部文章，按日期倒序  取代旧方法 .Site.Recent 从 v0.13

Site.Params 站点配置文件中的params 部分的值

```go
baseurl = "http://yoursite.example.com/"

[params]
  description = "Tesla's Awesome Hugo Site"
  author = "Nikola Tesla"
```

.Site.Sections 网站顶级目录

Site.Files 全部source 文件

Site.Menus 网站菜单

Site.TItle 站点标题字符串

Site.Author 作者

Site.LanguageCode 定义的网站语言

Site.DisqusShortname 定义的短代码名称

Site.GoogleAnalystics 谷歌跟踪代码

Site.**Copyright** 

Site.**LastChange**

Site.**BuildDrafts** 是都构建草稿， 默认false

Site.Data 用户Data

​	data目录下，可以是json，yml，yaml，toml格式，类似通过Api接口拿到的数据



## Hugo 变量

**.Hugo.Generator** Meta tag for the version of Hugo that generated the site. Highly recommended to be included by default in all theme headers so we can start to track Hugo usage and popularity. e.g. `<meta name="generator" content="Hugo 0.13" />`
**.Hugo.Version** The current version of the Hugo binary you are using e.g. `0.13-DEV`
**.Hugo.CommitHash** The git commit hash of the current Hugo binary e.g. `0e8bed9ccffba0df554728b46c5bbf6d78ae5247`
**.Hugo.BuildDate** The compile date of the current Hugo binary formatted with RFC 3339 e.g. `2002-10-02T10:00:00-05:00`



## 数据驱动, 获取json或者csv

```go
{{ $data = getJSON  "http://127.0.0.1/1.json" }}
或者
{{ $data = getJSON "http://127.0.0.1/" "1.json"}}

或者本地文件
{{ $data = getJSON "/data/test.json" }}


CSV 文件
{{ $data = getCSV "," "http://127.0.0.1/1.csv"}} 第二个参数是分隔符

```



json 渲染

```go
	
	{{ $dataJ := getJSON  "/data/test.json"}}
	
	<p>{{.Permalink}}</p>
	<div>
		<p class="text-info"> 这里是 data json数据: </p>
		{{/*  {{ range $.Site.Data.test.list }}  */}}
		{{ range first 5 $dataJ.list }}
			<span class="text-danger">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp {{ . }} <br>
			</span>		
		{{ end}}
	</div>
```



Csv 渲染

```go
<table>
  <thead>
    <tr>
    <th>Name</th>
    <th>Position</th>
    <th>Salary</th>
    </tr>
  </thead>
  <tbody>
  {{ $url := "http://a-big-corp.com/finance/employee-salaries.csv" }}
  {{ $sep := "," }}
  {{ range $i, $r := getCSV $sep $url }}
    <tr>
      <td>{{ index $r 0 }}</td>
      <td>{{ index $r 1 }}</td>
      <td>{{ index $r 2 }}</td>
    </tr>
  {{ end }}
  </tbody>
</table>
```



## 