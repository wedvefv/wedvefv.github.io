----
layout: post
title: html5标签
category: html
date: 2016-8-10 11:30:55
tags: html5
comments: true

----


# html5标签总结

```html

1. <!---->       注释
2. <!DOCTYPE>    定义html文本类型
3. <a>           定义超链接
4. <abbr>        把一段字符串用缩写表示<abbr title ="People world">PW </abbr>
5. <address>     在article元素内部，表示该文章的作者身份信息
6. <applet>      定义嵌入的applet ，html5不支持了。请用object代替
7. <acronym>     html5不支持了，请用<abbr代替哦
8. <area>        标签定义图像映射内部的区域，图像中部分区域可以点击，就是说有链接的
9. 两栏式架构   
    |header---------------------------------------------------------------------------------------|顶部
    |nav------------------------------------------------------------------------------------------|外链
    |article---包含<section>-----------------<aside>--------------------------|文章主体--段落或章节-侧边栏
    |footer---------------------------------------------------------------------------------------|底部
   以前都是用<div id="header">  <div id ="nav">......
   这样来定义页面的结构，html5新定义了这些，避免div太多混乱.

10. <aside>     可用于文章的侧边栏
11. <audio>     定义声音链接
12. <b>         定义粗体字体，强调
13. <base>      放在head里面，用于页面中的链接的基地址。后面的链接就可以写相对地址了。
                比如base =www.xxx000.com/img  ,链接一个图片就可以不写全路径，直接src="xxx.jpeg"
14. <basefont>  html不支持了。设置文档中所有字体的默认颜色，大小
15. <bdi>       通过脱离父元素的文本设置方向
16. <bdo>       定义文本方向，指定dir属性是rtl还是ltr
17. <big>       html不支持了。请用css控制 ，制作更大的文本
18. <blockquote>摘自另一个源的块引用
19. <body>      定义文档主体
20. <br >       换行符
21. <button>    定义按钮，多种属性，可以是按钮，提交，重置.....
22. <canvas>    只是承载图形的容器。需要script脚本绘制图形，然后传给canvas标签中
23. <caption>   放在table后面，定义表格的标题的
24. <canter>    5不支持了，请用CSS定义居中
25. <cite>      定义歌曲，影视，书籍等作品的标题
26. <code>      HTML5 <em> <strong> <dfn> <code> <samp> <kbd> <var> <cite> 等短标签，
                不推荐使用了。css能有更丰富的表现
27. <col>       只能在table或者colgroup元素内使用，定义一列或多列表格的属性值。默认
                至少一列，只有span属性能用了，其他的用css
28. <colgroup>  里面只能有col元素 H5已经不支持大部分属性了，用于对表格中的列进行组合，
                并格式化。要区别于col
29. <command>   可以指定消息事件处理函数。目前只支持ＩＥ
30. <datalist>  定义选项列表。和input元素配合使用，对于输入框提示作用
31. <dd>　　　  dl定义列表，dt定义项目,dd对项目进行描述
32. <del>       定义已经删除的文本。中划线
33. <details>   描述文档中的某个细节。目前只chrome支持
34. <div>       定义文档中的分割和部分。以便对块元素进行格式化。
35. <dl>        定义一个list　配合dt和dd使用。dt是项目。dd是项目具体描述
36. <em>        被强调的文本。一般配合css使用啦。
37. <embed>     定义嵌入的内容。属性src=""
38. <fieldset>  表单中 配合legend标签定义fieldset的标题。相当与通过legend定义的标题话一个框框,\
                把许多表单元素圈住。
39. <figcaptio> 标签定义 figure 元素的标题（caption）。
40. <figure>    标签规定独立的流内容（图像、图表、照片、代码等等）。定义的内容与主内容无关，              定义的内容不存在时也不对文档有影响
41. <font>      H5不支持了，请用CSS
42. <footer>    定义页脚，作者信息等等
43. <form>      form 元素包含一个或多个表单元素，比如：
                button
                input
                keygen
                object
                output
                select
                textarea

44. <frame>     H5不支持了。
45. <frameset>  5也不支持了。
46. <h1-h6>     定义标题大小
47. <head>      头部元素，下面是可用在 head 部分的标签：
                base
                link
                meta
                script
                style
                title
48. <header>    定义文档的页眉
49. <hgroup>    对标题进行组合 .H5的新标签
50. <hr>        定义主题变化，表现为一条水平线。
51. <html>      定义html文档
52. <i>         斜体。应该使用CSS
53. <iframe>    创建包含另个文档的内嵌框架。
54. <img>       必须要的两个属性src和alt（指定图片表述，以备图片无法加载时显示文字）
55. <input>     定义用户的输入字段，根据不同的 type 属性，输入字段有多种形态。输入字段可以是 文本字段、复选框、密码字段、单选按钮、按钮等等。
56. <ins>       地难以插入文本，一般和del一起使用。ins定义的文字会加入下划线
57. <keygen>    类似input,定义表单的密钥生成器字段。H5新标签
58.  <kbd>      表示文本是键盘输入的
59. <label>     input标签配合使用。点击label标签定义的文字，相当与自动点击input控件
60.  <legend>   给一下元素定义标题的：<fieldset>、<figure>、<details>。
61.  <li>       定义列表项。在<ul>标签和<ol>标签中使用/有序和无序列表
62. <link>      文档链接外部资源的。大部分用来链接外部样式表css文件
63.  <map>      定义图像区域映射，name属性和ｉｍｇ的usemap属性关联，包含area元素。
64. <mark>      突出显示文本。文本背景黄色。
65. <menu>      标签定义菜单列表。用于排列表单控件

                <menu>
                <li><input type="checkbox" />Red</li>
                <li><input type="checkbox" />blue</li>
                </menu>

67. <meta>      定义页面相关信息。位于head中定义关键词，利于搜索引擎检索：

                <meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript" />
                定义对页面的描述：
                <meta name="description" content="w3c html web 技术标准教程。" />
                每５秒刷新一次页面：
                <meta http-equiv="refresh" content="5" />

68. <meter>     定义度量范围，可以用属性,max/min　也可以用文本中定义范围。
69. <nav>       定义导航栏的链接的部分
70. <noframes>  H5不支持了，用于不能显示框架的时候提示文本
71. <noscript>  当不支持脚本时。显示提示的文本
72. <object>    定义一个嵌入的对象，多媒体等。图像请使用ｉｍｇ代替。大部分html4中的属性H5不支持了。
73. <ol>        有序列表
74. <optgroup>  组合选项：

              <select>
              <optgroup label="Swedish Cars">
              <option value ="volvo">Volvo</option>
              <option value ="saab">Saab</option>
              </optgroup>
              <optgroup label="German Cars">
              <option value ="mercedes">Mercedes</option>
              <option value ="audi">Audi</option>
              </optgroup>
              </select>

75. <optlon>    定义一个下拉列表选项：
76.
              <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel" selected="selected">Opel</option>
              <option value="audi">Audi</option>
              </select>

76. <output>    标签定义不同类型的输出，比如脚本的输出。:

              <form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0<input type="range" id="a" value="50">100+<input type="number" id="b" value="50">
              =<output name="x" for="a b"></output>
              </form>
              计算0-100的随机数加50＝多少，<input type="range" id="a" value="50">表示一个随机滚动条。

77. <p>         段落
78. <param>     http://www.w3chtml.com/html5/tag/param.html
79. <pre>       文本原样输出。不会改变格式
80. <progress>  表示时间函数有关的进度条：

                <progress>
                <span id="objprogress">85</span>%
                </progress>

81. <q>         短引用，cite属性指定来源地址，显示是会插入了一个引号，表示后面的内容是引用的内容。
82. <rp>        指示不支持ruby元素时，显示的文本注释
83. <ruby>      显示中文注音或者字符。里面用<rt>和<rp>元素包裹。
84. <s>         增加删除线文本。H5不支持了。请用css，
85. <samp>      如下标签都是不推荐使用的，请用css样式表，更好。
    <em>        呈现为被强调的文本。
    <strong>    定义重要的文本。
    <dfn>       定义一个定义项目。
    <code>      定义计算机代码文本。
    <samp>      定义样本文本。
    <kbd>       定义键盘文本。它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中。
    <var>       定义变量。您可以将此标签与 <pre> 及 <code> 标签配合使用。
    <cite>      定义引用。可使用该标签对参考文献的引用进行定义，比如书籍或杂志的标题。
86. <script>    javascript脚本置于其中。可链接外部ｊｓ脚本，一般脚本用于图像操作，表单验证和动态内容更改。
87. <select>    多个option标签置于其中，形成选择下拉列表。
88. <small>     小型文本，一般作为旁注信息
89. <source>    多媒体资源标签：

                <audio controls>
                <source src="horse.ogg" type="audio/ogg">
                <source src="horse.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
                </audio>

90 .<span>      对文档中行内元素进行分组。一遍对单独的一组文本进行样式控制。
91 .<strike>    加删除线。请用del代替。不建议使用，用css吧
92. <strong>    加粗文本
93. <style>     html插入样式信息标签。
94 .<sub>       定义上标文本，相当于脚注信息
95. <summary>   <datails>元素的地一个元素，定义details的标题内容。
96. <sup>       定义上标文本，相当于脚注信息
97. <table>     定义表格　<tr>定义一行,<th>定义表的第一行头。<td>定义表的内容

                <table border="1">
                <tr>
                <th>月份</th>
                <th>存款</th>
                </tr>
                <tr>
                <td>一月</td>
                <td>1000 元</td>
                </tr>
                </table>

98. <tbody>     表格的正文部分。H５已废除
99. <td>        表格内容行
100. <textarea> 文本域，相当于MFC中的编辑框
101. <tfoot> 	  表格的页脚部分，H5已废除
102. <th>       表格的头一行
103. <thead>    表格的头部分，需要有tr行
104. <time>     定义时间或者日期，目前浏览器还都不支持
105 .<title>    浏览器显示的标题
106. <tr>       定义表格中的行
107. <track>    为视频媒体文件制定外部文本轨道。比如字幕啥的。目前浏览器还不要支持此标签。

                <video width="320" height="240" controls="controls">
                <source src="forrest_gump.mp4" type="video/mp4" />
                <source src="forrest_gump.ogg" type="video/ogg" />
                <track kind="subtitles" src="subs_chi.srt" srclang="zh" label="Chinese">
                <track kind="subtitles" src="subs_eng.srt" srclang="en" label="English">
                </video>

108. <tt>       定义打印机文本。目前h5已经不支持了。
109. <u>        下划线。目前已不支持
110. <ul>       无需列表。
111. <var>      定义变量。您可以将此标签与 <pre> 及 <code> 标签配合使用。
112. <video>    视频标签：
                <video src="movie.ogg" controls="controls">
                您的浏览器不支持 video 标签。
                </video>

113. <wbr>      标志在何处适合加入换行符，避免有些单词加入换行符没拆开，不明意义。
114. <rt>       在ruby元素中加入汉字的注音：

                <ruby>
                漢 <rt> ㄏㄢˋ </rt>
                </ruby>

115. <section>  定义区段。页眉，页脚.......
116. <label>    定义一个选项组的标注		
```
