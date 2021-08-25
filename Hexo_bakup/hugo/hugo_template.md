## 介绍hugo的模板

- hugo 使用go的html/template 和text/templete 库为基础进行模板操作

> 下面只是基础的go template操作，为了更深度的了解请看 [go文档](https://golang.org/pkg/text/template/)

- go 模板提供了一种非常简单的模板语言，他坚信只有最基本的逻辑才是属于模板和视图层。





### 基本语法

go 模板是html文件，加上一些变量和函数，变量和函数使用   {{ }} 获取。

```
{{ .Title }}
{{ $address }}
```

 函数的参数使用 空格分隔 ，像这样

```
{{ function arg1 arg2 }}
```

- 方法和字段通过点号访问

```
{{ .Params.bar }}
```

- 圆括号可以分组

```
{{if or (isset .Params "alt") (isset .Params "caption")}} Catption {{end}}
```

- 一条语句能拆成多行

```
{{ if or 
  (isset .Params "alt") 
  (isset .Params "caption")
}}
```

- 原始字符串可以包含换行

```
{{ $msg := `Line one 
Line two. `}}
```



### 变量- variable

- 每个go模板都有一个data对象， 在hugo中，每个模板传递一个页面，在下面的例子中， .Title 是

  可以访问的page  变量中的一个。

- 因为页面的默认范围就是整个模板， 所以Title元素可以用.Title 访问。

```
<title> {{.Title }} </title>
```

- 变量也可以存储自定义变量，在后续被提及到。

```
{{ $address := "123 main st." }}
{{ $address }}

```
> hugo 在v0.47以及更老的版本，if条件中被定义的变量

> hugo 在v0.48以后的版本，可以用=号重新定义
>
> ```
> {{ $var := "hello "}}
> {{ if .IsHome }}
> 	{{ $var = "wolrd"}}
> {{end}}
> var is {{$var}}
> ```



## 函数- functions

- go模板只附带了一部分基本的函数，但是也提供了一种机制来扩展原始集。
- hugo模板函数提供了额外的功能函数明确用户构建网站， 函数调用方法是函数名 空格加参数。
- 如果不重新编译hugo，就不能增加模板函数。



## includes 

- 当需要包含一个模板时， 需要传递他需要的数据



## partial 

- 这个函数是用来include partial模板

- ```
  {{ partial 'header.html' .}}
  ```



## Template

- 这个函数也是包含partial模板，是应用于更老的hugo版本。现在更多地用于调用内部模板。

- 语法

- ```
  	{{ templete "_internal/hello.html" .}}
  ```



##  迭代 iteration

- go 模板使用 range 来迭代map、array、slice等

- ```
  {{ range $array }}
  	{{.}}  
  {{end}}
  ```

- ```
  {{ range $elem_val := $array }}
  	{{ $ele_val }}
  {{end}}
  ```

- ```
  {{ range $ele_index, $elem_val := $array }}
  	{{ $elem_index }} -- {{ $elem_val }}
  {{end}}
  ```

-   如果map， array，slice长度为0， 则range时条件为假， 会走到else分支。



## Conditionals

- If、else、with、or、and 、not 构建了go模板操作的逻辑框架。
- Range、if 、with 都是以 {{end}}来结束的。
- go 模板对于以下值认为是false： false(boolean)、0、zero-length的map、slice、string、array

### with

- 如果条件值不存在，或者为false，则跳过次block

```
{{ with .Params.title }}
	<h4> {{.}} </h4>
{{end}}
```



## with .. else

