
本笔记以 Python2.6, Django-1.2.5 为开发基础

1. 安装 Django
   安装官方发布版本的Django 下载tarball的“Django-*.tar.gz”
   http://www.djangoproject.com/download/

   Linux 的安装命令
   # 解压
   tar xzvf Django-*.tar.gz
   # 进入解压的目录(目录名的“*”需要改成对应的名称)
   cd Django-*
   # 安装 Django
   sudo python setup.py install

   Windows 下安装则是直接解压“Django-*.tar.gz”并运行
   # 进入解压的目录(目录名的“*”需要改成对应的名称)
   cd Django-*
   # 安装 Django
   python setup.py install

   安装完以后，在Python交互环境下应该可以 import django 模块
   import django; print(django.VERSION)  # 打印:  (1, 0, 'official')


1.1 Django 卸载
    通过执行命令“ setup.py install ”来安装 Django, 只要在“site-packages”目录下删除“django”目录就可以了.
    使用 Python egg 来安装 Django, 直接删除 Django “.egg” 文件, 并且删除 “easy-install.pth”中的 egg 引用就可以了.这个文件应当可以在“site-packages”目录中.

    提示: 如何找到“site-packages”目录?
    “site-packages” 目录的位置取决于使用何种操作系统以及 Python 的安装位置.
    可以通过如下的命令来显示:
        python -c "from distutils.sysconfig import get_python_lib; print get_python_lib()"
    (注意,上面的命令请在shell 中执行,不是在 Python中执行.) 结果如：
    /usr/lib/python2.6/dist-packages   (linux 的时候，而实际上需要删除的是“/usr/local/lib/python2.6/dist-packages”目录的，他显示那个目录没有django)
    D:\Program\1.Work_soft\Python26\Lib\site-packages  (windows 的时候)


1.2安装 tornado
   下载tarball
   http://packages.debian.org/zh-cn/source/sid/python-tornado

   Linux 的安装命令
   # 解压
   tar xvzf tornado-1.2.tar.gz
   # 进入解压的目录
   cd tornado-1.2
   # 安装
   python setup.py build
   sudo python setup.py install

   Windows 下安装则是直接解压“tornado-*.tar.gz”并运行
   # 进入解压的目录(目录名的“*”需要改成对应的名称)
   cd Django-*
   # 安装 Django
   python setup.py build
   python setup.py install

   安装完以后，在Python交互环境下应该可以 import django 模块
   import tornado; print(tornado.version)  # 打印:  '1.2'


1.2 django 常用命令
    1) 创建一个项目：
       运行“django-admin.py startproject 项目名”(前提是“django-admin.py”在你的PATH系统变量下)
    2) 没有配置环境变量时，创建一个项目
       # Python 安装目录
       set workPath=D:/Holemar/Program/Python26
       # 建立新项目(“mysite”是项目名，可以任意定义名称)
       %workPath%/python.exe %workPath%/Lib/site-packages/django/bin/django-admin.py startproject 项目名
    3) 创建一个新的app
       # 在项目目录下，运行
       python manage.py startapp app名称
    4) 验证模型是否有错
       python manage.py validate
    5) 生成 CREATE TABLE 语句：
       python manage.py sqlall app名称
       sqlall命令事实上并没有接触数据库或建表，它仅仅将输出打印到屏幕上
    6) 把模型同步到数据库
       python manage.py syncdb
       它检查数据库和你的INSTALLED_APPS中的所有app的所有模型，看看是否有些表已经存在，如果表不存在就创建表
       注意syncdb不会同步改动或删除了的模型，如果你改动或删除了一个模型，syncdb不会更新数据库
    7) 调用数据库操作的客户端(此客户端必须可用)
       python manage.py dbshell
       基于你的DATABASE_SERVER设置，django将计算出运行哪个命令行客户端


2. 开始一个项目
   如果这是你第一次使用Django，你必须注意一些初始化过程
   运行“django-admin.py startproject mysite”将会在你的当前目录下创建一个mysite目录
   运行的命令行如:
     # Python 安装目录
     set workPath=D:/Holemar/Program/Python26
     # 建立新项目(“mysite”是项目名，可以任意定义名称)
     %workPath%/python.exe %workPath%/Lib/site-packages/django/bin/django-admin.py startproject mysite

   注意，如果你使用setup.py安装Django，django-admin.py应该在你的PATH系统变量下
   如果不在PATH里面，你可以从“Python安装目录/Lib/site-packages/django/bin/”找到它
   考虑符号链接它到你的PATH里面，例如/usr/local/bin
   一个项目就是一个Django实例的设置的集合，包括数据库配置、Django的专有设置以及应用程序专有设置
   项目的代码放在Web服务器以外的目录，这样避免别人可能从Web看到你的代码，增强安全性

   startproject创建了什么：
    /mysite/     # 目录，项目名称
    __init__.py  #
    manage.py    # 一个命令行工具，可以让你以多种方式与Django项目交互
    settings.py  # Django项目的配置
    urls.py      # Django项目的URL定义


3. 开发用服务器
   切换到mysite目录，运行“python manage.py runserver”,运行代码如:
        # Python 安装目录
        set pythonPath=D:/Program/Python26
        # 项目目录
        set webPath=D:/PythonTest/mysite
        # 运行“python manage.py runserver”
        %pythonPath%/python.exe %webPath%/manage.py runserver

   这样你就启动了Django开发用服务器，这是一个包含在Django中的开发阶段使用的轻量级Web服务器
   在Django中包含了这个服务器是为了快速开发，这样在产品投入应用之前，就可以不用处理生产环境中web server的配置工作了。
   这个服务器查看你的代码，如果有改动，它自动reload，让你不需重启快速修改你的项目
   这个服务器一次只能可靠地处理一个请求，而且根本没有经过任何安全性的检验
   默认情况下runserver命令启动服务器的端口为8000，只监听本地连接。如果希望改变端口，增加一个命令行参数即可:
   python manage.py runserver 8080
   也可以改变服务器监听的IP地址，当你同其它开发者分享一个开发站点时很有用
   python manage.py runserver 192.168.0.100:8080
   上面的命令使得Django监听任何网络接口，这样的话就允许其它计算机连接该服务器
   试着访问 http://127.0.0.1:8000/，你将会看到“Welcome to Django”的页面



4. 动态Web页面
   1) 建立一个web页面
      a.建立一个名为“views.py”的文件放在你的项目(mysite目录)里面
      b.“views.py”文件的内容，如：

            # 这个例子只是输出服务器内部时间
            # 首先，我们从 django.http模块 import HttpResponse类
            from django.http import HttpResponse
            # Python标准库的 datetime模块 包含一些处理日期和时间的类和方法，并且包含一个返回当前时间的方法
            import datetime

            # 这是一个视图方法，它只是一个Python方法，接受Web请求并返回Web应答
            # 每个视图方法都使用HttpRequest对象作为自己的第一个参数 (视图方法的名字可随意命名)
            def current_datetime(request):
                now = datetime.datetime.now()
                html = "It is now %s." % now
                # 这个应答可以是HTML内容、重定向、404错误、XML文档、图像等等
                # 最后，视图返回一个包含生成的HTML的HttpResponse对象
                return HttpResponse(html)

      c.URL配置
        修改django-admin.py startproject自动生成的URL配置文件“urls.py”,位于项目的首目录,内容如：

            # 导入 django.conf.urls.defaults模块的所有对象，包括一个叫 patterns 的方法
            from django.conf.urls.defaults import *
            # 导入 项目(这里项目名是 mysite)的 views 模组,即前面“views.py”写的内容
            from mysite import views

            urlpatterns = patterns('',
                # 第一个参数是一个正则表达式, 匹配URL地址, 使用'^now/$'，则只有“/now/”匹配
                # 第二个参数是要调用的视图方法
                (r'^now/$', views.current_datetime),
            )

      d.浏览器访问地址 http://127.0.0.1:8000/now/
   2) URL配置和松耦合
      在Django Web程序中，URL定义和视图方法是松耦合的，开发人员可以替换其中一个而不会对另一个产生影响
      对比之下，其他的web开发平台耦合了URL和程序，例如在basic php中，应用的URL取决于代码在文件系统中的位置，
      在CherryPy框架中，URL和应用中的方法名称是相对应的。这些方式看来非常方便，但是长远来看会造成难以管理的问题。
      举例来说，如果我们想改变这个应用的URL，可以对URLconf做一个非常快捷的修改，不用担心隐藏在这个URL之后的函数实现。
      类似的，如果我们想修改视图函数,修改它的逻辑，用不着影响URL就可以做到。
      更进一步，如果我们想把这个方法暴露到多个URL上，也可以通过修改URLconf轻易完成，而无需影响view的代码。
   3) URL模式通配符
      Django的URL配置允许任意的正则表达式来提供强大的URL匹配能力
      在URL模式里把希望保存的数据用括号括起来，我们正是在使用括号从匹配的文本中获得想要的参数数据。
      如: (r'^now/plus(\d{1,2})hours/$', hours_ahead), 把“(\d{1,2})”当成参数读取出来，注意,获取的值始终都是字符串类型。

      视图上获取URL模式的参数，从第二个参数开始接收即可，如:

        # 文件“urls.py”的内容如下：
        from django.conf.urls.defaults import *
        # 导入 mysite.views 模组
        from mysite import views
        urlpatterns = patterns('',
            (r'^now/$', views.current_datetime),
            # 传参数的URL模式：“(\d{1,2})”
            (r'^now/plus(\d{1,2})hours/$', views.hours_ahead),
        )

        # 文件“views.py”的内容如下：
        from django.http import HttpResponse
        import datetime
        # 此函数由于现在不需要用，内容省略
        def current_datetime(request):
            return HttpResponse('')
        # 参数request是一个HttpRequest对象, 而 offset是一个string，它的值是通过URL模式里的那一对括号从请求的URL中得到的。
        # 注意从URL中得到的值始终是string而不是integer，即使这个string是由纯数字构成的。参数offset的名称是随意起的。
        def hours_ahead(request, offset):
            # 把offset转换成整形。
            offset = int(offset)
            dt = datetime.datetime.now() + datetime.timedelta(hours=offset)
            html = "In %s hour(s), it will be %s." % (offset, dt)
            return HttpResponse(html)

        # 访问的测试网址如：
        http://127.0.0.1:8000/now/plus20hours/


5. Django模板系统
   1) 模板系统基础
      Django模板是一个string文本，它用来分离一个文档的展现和数据
      模板定义了placeholder和表示多种逻辑的tags来规定文档如何展现
      通常模板用来输出HTML，但是Django模板也能生成其它基于文本的形式
   2) 变量和模板标签
      1，变量
         用“{{}}”包围起来，如：{{person_name}}，这表示把给定变量的值插入。
      2，块标签
         用“{%%}”包围起来，如：{%if a1%}
         块标签的含义很丰富，它告诉模板系统做一些事情。如：for标签,if标签等等
         模板系统也支持{%else%}等其它逻辑语句
      3，过滤器，过滤器是改变变量显示的方式
         如：“{{ship_date|date:"F j, Y"}}”把ship_date变量传递给过滤器，并给 date 过滤器传递了一个参数“F j, Y”，
         date 过滤器以给定参数的形式格式化日期，过滤器使用管道字符“|”
      4，注释
         用“{# #}”包围的是注释
         注意，模板渲染时注释不会输出，一个注释不能分成多行(多行时认为不是注释)。
         如：{# This is a comment #}
      5，Django模板支持多种内建的块标签，并且可以定义自己的标签。
      6, include 模板标签
         这个标签允许引入另一个模板的内容，标签的参数是要引入的模板的名字，
         名字可以是变量，也可以是单引号或双引号表示的 string, 例如:
            {% include 'nav.html' %}
            {% include 'includes/nav.html' %}
            {% include template_name %}  {# 变量 template_name 里包含有模板的路径和名称 #}
         注意，请求的模板名前面会加上 TEMPLATE_DIRS(settings.py 里面配置的模板路径)
         如果被引入的模板中包含任何的模板代码，如标签和变量等，它将用父模板的context计算它们
         如果给定的模板名不存在，Django将做下面两件事情中的一件：
         a.如果DEBUG设置为True，你将看到一个TemplateDoesNotExist异常的错误页面
         b.如果DEBUG设置为False，标签将什么也不显示
      7, block 模板标签(模板继承)
         用“{% block %}”和“{% endblock %}”包围起来。父模版定义而子版使用。如下：

         {# 父模版的内容 #}
         <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
         <html>
         <head>
            <title>{% block title %}{% endblock %}</title>
         </head>
         <body>
            <h1>My helpful timestamp site</h1>
            {% block content %}{% endblock %}
            {% block footer %} {# 如果有输入这个模板，则使用输入的，没有则使用这里定义的内容 #}
              <hr><p>Thanks for visiting my site.</p>
            {% endblock %}
         </body>
         </html>

         {# 子版的内容, 使用父模版，父模版的名称是“base.html” #}
         {% extends "base.html" %} {# 使用 extends 标签来引入父模版 #}
         {% block title %}The current time{% endblock %} {# 给父模版的 block title 赋值 #}
         {% block content %}
           <p>It is now {{ current_date }}.</p> {# 变量也可以像一般的使用 #}
         {% endblock %}
         {# 没有给母版的 block footer 赋值，则这块使用父模版默认的 #}

        它是这样工作的：
        1，当你载入模板时，模板引擎发现{% extends %}标签，注意到这是一个子模板；模板引擎马上载入父模板base.html
        2，模板引擎在base.html里发现了{% block %}标签，就用子模板的内容替换了这些块
           于是定义的{% block 块名称 %}和{% block content %}被使用
        注意，既然子模板没有定义footer块，那么模板系统直接使用父模板的值；父模板的内容可以作为后援方案。

        关于模板继承的小提示：
        a. 如果在模板里使用{% extends %}的话，这个标签必须在所有模板标签的最前面，否则模板继承不工作
        b. 通常基本模板里的{% block %}越多越好，子模板不必定义所有的父block，钩子越多越好
        c. 如果你在很多模板里复制代码，很可能你应该把这些代码移动到父模板里
        d. 如果你需要得到父模板的块内容，{{ block.super }}变量可以帮你完成工作
           当你需要给父块添加内容而不是取代它的时候这就很有用
        e. 不能在同一模板里定义多个同名的{% block %}，不管是父模板还是子模板都不能这样做，否则抛错。
        f. 你给{% extends %}传递的模板名同样会被 get_template()使用，所以会加上TEMPLATE_DIRS设置
        g. 大部分情况下，{% extends %}的参数是硬编码的 string,但是也可以是变量，这将增进动态效果。
        h. 子模板中{% block %}标签以外的任何内容都不会被渲染。

   3) 使用模板系统
      在Python代码中使用模板系统，请按照下面的步骤：
      1，用模板代码创建一个 Template 对象
         Django也提供指定模板文件路径的方式创建 Template 对象
      2，使用一些给定变量 Context 调用 Template 对象的 render() 方法
         这将返回一个完全渲染的模板，它是一个 string ，其中所有的变量和块标签都会根据 Context 得到值
   4) 例子,以修改前面的“views.py”文件的“current_datetime”函数为例，访问地址还是“/now/”：

        # 文件“views.py”的内容如下：
        # Template 类在 django.template 模块中,使用模板必须先导入它; 导入 Context 为了传递参数
        from django.template import Template, Context
        from django.http import HttpResponse
        import datetime

        # 调用模板的形式来显示
        def current_datetime(request):
            now = datetime.datetime.now()
            # 创建一个 Template 对象
            t = Template("<html><body><div style='color:red'>It is now {{ current_date }}.</div></body></html>")
            # 传递参数; Context 的参数是一个映射变量名和变量值的字典
            c = Context({"current_date": now})
            html = t.render(c)
            return HttpResponse(html)

        # 访问的测试网址如下:
        http://127.0.0.1:8000/now/

   5) TemplateSyntaxError异常
      如果模板代码有语法错误，调用Template()方法会触发TemplateSyntaxError异常,可能出于以下情况：
      1，不合法的块标签
      2，合法块标签接受不合法的参数
      3，不合法的过滤器
      4，合法过滤器接受不合法的参数
      5，不合法的模板语法
      6，块标签没关
   6) 渲染模板(给模板传参数)
      可以通过给一个 context 来给 Template 对象传递数据
      context是一个变量及赋予的值的集合，模板使用它来得到变量的值，或者对于块标签求值
      这个context由django.template模块的Context类表示
      它的初始化函数有一个可选的参数：一个映射变量名和变量值的字典
      通过context调用Template对象的render()方法来填充模板
      变量名必须以字母(A-Z或a-z)开始，可以包含数字，下划线和小数点，变量名大小写敏感
      修改上面“views.py”文件的“current_datetime”函数为例

        # 只写要显示的这一个函数，其它内容省略
        def current_datetime(request):
            raw_template = """<html><body>
            <p>Dear {{ person_name }},</p>
            <p>Thanks for ordering {{ product }} from {{ company }}. It's scheduled to
               ship on {{ ship_date|date:"F j, Y" }}.</p> {# 过滤器 #}

            {% if ordered_warranty %} {# if标签 #}
            <p>Your warranty information will be included in the packaging.</p>
            {% endif %} {# if结束标签 #}

            <p>Sincerely,<br />{{ company }}</p>
            </body></html>"""
            t = Template(raw_template)
            c = Context({'person_name': 'John Smith',   # 字符串的传参
                'product': 'Super Lawn Mower',
                'company': 'Outdoor Equipment',
                'ship_date': datetime.date(2009, 4, 2), # 过滤器赋值
                'ordered_warranty': True})              # Boolean型赋值,为if标签用
            html = t.render(c)
            return HttpResponse(html)

   7) 同一个模板渲染多次
      一旦创建了一个模板对象，可以渲染多个context
      使用同一个模板来渲染多个context的话，创建一次 Template 对象然后调用render()多次会更高效,如

        # 差做法，效率低下
        for name in ('John', 'Julie', 'Pat'):
            t = Template('Hello, {{ name }}') # 多次创建 Template 对象,然后逐个渲染
            print(t.render(Context({'name'： name})))

        # 好做法，效率高
        t = Template('Hello, {{ name }}') # 只创建一个 Template 对象,然后多次渲染
        for name in ('John', 'Julie', 'Pat'):
            print(t.render(Context({'name': name})))

      另外:
      Django的模板解析非常快，在后台，大部分的解析通过一个单独的对正则表达式的调用来做
      这与基于XML的模板引擎形成鲜明对比，XML解析器比Django的模板渲染系统慢很多
   8) Context变量查找
      模板系统能优雅的处理更复杂的数据结构，如列表，字典和自定义对象
      在Django模板系统中处理复杂数据结构的关键是使用“.”符号
      使用小数点来得到字典的key，属性，对象的索引和方法等。如：

        # 修改上面“views.py”文件的“current_datetime”函数为例, 只写要显示的这一个函数，其它内容省略
        def current_datetime(request):
            raw_template = """<html><body>
            <p>{{ person.name }} is {{ person.age }} years old.</p> {# 显示： Sally is 43 years old. #}
            <p>The month is {{ date.month }} and the year is {{ date.year }}.</p> {# date.year 显示1993, date.month 显示5 #}
            <p>Item 2 is {{ items.2 }}.</p> {# “.”也可以调用列表的索引 #}
            <p>{{ var }} -- {{var.upper }} -- {{ var.isdigit }}.</p> {# “.”访问对象的方法,这里访问字符串的方法 #}
            </body></html>"""
            t = Template(raw_template)
            c = Context({'person': {'name': 'Sally', 'age': '43'},   # 通过“.”访问字典的key
                'date': datetime.date(1993, 5, 2), # 通过“.”来访问对象的属性
                'items': ['apples', 'bananas', 'carrots'], # “.”也可以调用列表的索引
                'var': 'hello'})  # “.”访问对象的方法,这里访问字符串的方法
            html = t.render(c)
            return HttpResponse(html)

      注:
        负数的列表索引是不允许的，例如模板变量{{ items.-1 }}将触发TemplateSyntaxError
        调用方法时你不能加括号，你也不能给方法传递参数 ;只能调用没有参数的方法

      当模板系统遇到变量名里有小数点时会按以下顺序查找：
        1，字典查找，如 foo["bar"]
        2，属性查找，如 foo.bar
        3，方法调用，如 foo.bar()
        4，列表的索引查找，如 foo[bar]
        小数点可以多级纵深查询，例如{{ person.name.upper }}表示字典查询person['name']然后调用upper()方法
   9) 方法调用
      方法调用要比其他的查询稍微复杂一点，下面是需要记住的几点：
      1，在方法查询的时候，如果一个方法触发了异常，这个异常会传递从而导致渲染失败，但是如果异常有一个值为 True 的 silent_variable_failure 属性，这个变量会渲染成空字符串, 如：

        # 将会抛出异常
        def current_datetime(request):
            # 函数里面定义内部类
            class PersonClass4:
                def first_name(self):
                    raise AssertionError, "foo"
            t = Template("My name is {{ person.first_name }}.")
            p = PersonClass4()
            html = t.render(Context({"person": p}))
            return HttpResponse(html)

        # 将显示：“My name is .”
        def current_datetime(request):
            # 定义异常类
            class SilentAssetionError(AssertionError):
                silent_variable_failure = True
            # 所抛异常的 silent_variable_failure 属性的值为 True
            class PersonClass4:
                def first_name(self):
                    raise SilentAssetionError
            t = Template("My name is {{ person.first_name }}.")
            p = PersonClass4()
            html = t.render(Context({"person": p}))
            return HttpResponse(html)

      2，方法调用仅仅在它没有参数时起作用，否则系统将继续查找下一个类型(列表索引查询)
      3，显然一些方法有副作用，让系统访问它们是很愚蠢的，而且很可能会造成安全性问题。
         例如对象有一个delete()方法，模板系统不应该允许调用它，如："{{ object.delete }}"
         为了防止这种状况，可以在方法里设置一个方法属性“alters_data=True”,模板系统就不会执行这个方法,如：

            # 类里面的 delete 方法，其它部分省略
            def delete(self):
                # Delete the object
            # 定义这方法的属性
            delete.alters_data = True

   10) 不合法的变量的处理
       默认情况下如果变量不存在，模板系统会把它渲染成空 string,
       在现实情形下，一个web站点因为一个模板代码语法的错误而变得不可用是不可接受的。
       也可以通过设置Django配置更改Django的缺省行为。
       如：

        # 空的 Context(), 显示: Your name is .
        def current_datetime(request):
            t = Template('Your name is {{ name }}.')
            return HttpResponse(t.render(Context()))

        # 变量不存在时渲染成空字符串, 显示：Your name is , My Name is .
        def current_datetime(request):
            # 模板中的变量没有被赋值，则显示空字符串
            t = Template('Your name is {{ name }}, My Name is {{ my.name }}.')
            c = Context({'var': 'hello',  # Context 传的值模板不接收,则这个值不显示
                'Name': 'hello'}) # 名称是区分大小写的,所以这个值也传不过去
            return HttpResponse(t.render(c))

   11) Context对象
       大多数情况下初始化 Context 对象会传递一个字典给 Context(),
       一旦初始化了Context，就可以使用标准Python字典语法增减 Context 对象的 items,如

        # 空的 Context
        print(Context()) # 打印： [{}]

        c = Context({"foo": "bar"})
        print(c['foo']) # 打印: bar
        del c['foo'] # 删减 Context 的 items 也是允许的
        c['newvariable'] = 'hello' # 也可以随时增加 Context 的 items

        # Context对象是一个 stack(栈), 还可以push()和pop()
        print(c) # 打印： [{'newvariable': 'hello'}]
        c.push() # 插入一个字典到列表后面
        print(c) # 打印： [{'newvariable': 'hello'}, {}]
        c.pop()  # 删去列表的一个字典
        print(c) # 打印： [{'newvariable': 'hello'}]
        # 如果 pop() 得太多的话,它将触发 django.template.ContextPopException
        c.pop()  # 这将会抛出异常


6. 模板标签和过滤器基础
   模板系统使用内建的标签和过滤器
   Django模板系统并不是一个严格意义上的编程语言，所以它并不允许我们执行Python语句

   1)if/else
     if 标签计算一个变量值，如果是“ True ”，即它存在、不为空并且不是 False 的 boolean 值
     系统则会显示{% if %}和{% endif %}间的所有内容,
     必须确认使用{% endif %}来关闭{% if %}标签，否则Django触发TemplateSyntaxError
     如：

        {% if today_is_weekend %}
            <p>Welcome to the weekend!</p>
        {% else %}
            <p>Get back to work.</p>
        {% endif %}

    if 标签接受 and, or 或者 not 来检查多个变量值或者否定一个给定的变量，例如:

        {% if athlete_list and coach_list %}      {# and 用法 #}
            <p>Both athletes and coaches are available.</p>
        {% endif %}
        {% if not athlete_list %}                 {# not 用法 #}
            <p>There are no athletes.</p>
        {% endif %}
        {% if athlete_list or coach_list %}       {# or 用法 #}
            <p>There are some athletes or some coaches.</p>
        {% endif %}
        {% if not athlete_list or coach_list %}   {# not 和 or 一起用, not 的优先级更高 #}
            <p>There are no athletes or there are some coaches.</p>
        {% endif %}
        {% if athlete_list and not coach_list %}  {# not 和 and 一起用, not 的优先级更高 #}
            <p>There are some athletes and absolutely no coaches.</p>
        {% endif %}
        {% if a1 or a2 or a3 or a4 %}             {# 允许多次使用同一个逻辑符号 #}
            <p>There are some a.</p>
        {% endif %}

    注：
    django教程上说 if 标签不允许同一标签里同时出现 and 和 or, 否则逻辑容易产生歧义;但经测试这样做是可以的，只不过还没有办法证明他们一起使用时，是 and 还是 or 的优先级更高。
    再者, 不允许使用括号来改变 and, or, not 的优先顺序, 这是测试出来的结果。
    例如下面的标签是不合法的：
        {% if not (athlete_list or coach_list) %}  {# 这写法会抛出异常 #}
        {% if a1 and a2 or a3 %} {# or 和 and 一起用, 经测试可以这样做 #}

    如果想结合 and 和 or 来做高级逻辑，建议使用嵌套的 if 标签
    没有 elif / else if 标签，需使用嵌套的 if 标签来做：
        {% if athlete %}
            {% if coach or cheerleader %}  {# 这相当于 if athlete and (coach or cheerleader) #}
                We have athletes, and either coaches or cheerleaders!
            {% endif %}
        {% else %}
            {% if coach %}  {# 这相当于 else if #}
                <p>Here are the coaches: {{ coach }}.</p>
            {% endif %}
        {% endif %}

     还可以使用“==”、“>=”、“>”、“<=”、“<”等判断符号，如：
        {% if title|length <= 4 %}title1{% else %}title5{% endif %}

   2)for 标签
     for 标签允许按顺序遍历一个序列中的各个元素
     Python的 for 语句语法为 for X in Y，X是用来遍历Y的变量
     每次循环模板系统都会渲染{% for %}和{% endfor %}之间的所有内容；标签可以嵌套
     例如，显示给定athlete_list变量来显示athlete列表：
        <ul>
        {% for athlete in athlete_list %}
            <li>{{ athlete.name }}</li>
        {% endfor %}
        </ul>

     在标签里添加 reversed 来反序循环列表：
        {% for athlete in athlete_list reversed %}
            ...
        {% endfor %}

    系统不支持中断循环(即 break 和 continue)，如果需要中断，可以改变遍历的变量来使得变量只包含你想遍历的值

    forloop 模板变量
    for 标签内置了一个 forloop 模板变量，这个变量含有一些属性可以提供给你一些关于循环的信息
    1，forloop.counter     表示循环的次数，它从1开始计数，第一次循环设为1
    2，forloop.counter0    类似于 forloop.counter, 但它是从0开始计数，第一次循环设为0
    3，forloop.revcounter  表示循环中剩下的 items 数量，第一次循环时设为 items 总数，最后一次设为1
    4，forloop.revcounter0 类似于 forloop.revcounter, 但它是表示的数量少一个，即最后一次循环时设为0
    5，forloop.first       当第一次循环时值为 True, 在特别情况下很有用
    6，forloop.last        当最后一次循环时值为 True
    7，forloop.parentloop  在嵌套循环中表示父循环的 forloop
    例如:

        {% for item in todo_list %}
            {% if forloop.first %}<li class="first">{% else %}<li>{% endif %}
                <p>{{ forloop.counter }}: {{ item }}</p>
            </li>
        {% endfor %}

        {# forloop.parentloop 用法 #}
        {% for country in countries %}
            <table>
            {% for city in country.city_list %}
                <tr>
                    <td>Country[ {{ forloop.parentloop.counter }} ]</td>
                    <td>City[ {{ forloop.counter }} ]</td>
                    <td>{{ city }}</td>
                </tr>
            {% endfor %}
            </table>
        {% endfor %}

    富有魔力的forloop变量只能在循环中得到，当模板解析器到达{% endfor %}时 forloop 就消失了
    如果模板的 context 已经包含一个叫 forloop 的变量，Django会在 for 标签的块中覆盖你定义的 forloop 变量的值,
    在其他非循环的地方，你定义的 forloop 变量仍然可用
    建议模板变量不要使用 forloop, 如果需要这样用，可以在循环中使用 forloop.parentloop

   3)ifequal / ifnotequal
     在模板语言里比较两个值并且在他们一致的时候显示一些内容，Django提供了 ifequal 和 ifnotequal 标签。
     ifequal 标签比较两个值，如果相等，则显示{% ifequal %}和{% endifequal %}之间的所有内容
     ifnotequal 标签 与 ifequal 对应，当两个值不相等时显示。
     与 if 标签一样，ifequal 和 ifnotequal标签也支持 else 标签。
     参数可以是硬编码的 string(单引号和双引号均可),也可以是数字,但不能是 True 或者 False 。
     其它的参数类型，如字典、列表或 boolean 不能硬编码在 ifequal 和 ifnotequal标签里面。
     如果你需要测试某个变量是 True 或 False, 用 if 标签即可；用 ifequal标签与 1, 0 比较也可以。
     只能两个参数,不能多也不能少。

        {# 如果 a1 == a2 则显示 #}
        {% ifequal a1 a2 %}
            <h1>equal!</h1>
        {% else %}
            <h1>not equal!</h1>
        {% endifequal %}

        {# 如果 a1 != a2 则显示 #}
        {% ifnotequal a1 a2 %}
            <h1>not equal!</h1>
        {% endifnotequal %}

        {# 如果 a1 == 'sitenews' 则显示 #}
        {% ifequal a1 'sitenews' %}
            <h1>Site News</h1>
        {% endifequal %}

        {# 如果 a2 == 55.23 则显示 #}
        {% ifequal a2 55.23 %}
            <h1>Community</h1>
        {% endifequal %}

     可以使用 if 标签的“==”比较来代替此标签，如： {% if tt == 'template1.html' %}{{ tt }}{% endif %}

   4)过滤器
     本章前面提到，模板过滤器是变量显示前转换它们的值的方式，看起来像下面这样：
        {{ name|lower }}   # 这将显示通过 lower 过滤器过滤后{{ name }}变量的值，它将文本转换成小写。

     使用(|)管道来申请一个过滤器
     过滤器可以串成链，即一个过滤器的结果可以传向下一个
     下面是escape文本内容然后把换行转换成p标签的习惯用法：
        {{ my_text|escape|linebreaks }}

    有些过滤器需要参数，过滤器参数一直使用双引号, 需要参数的过滤器的样子：
        {{ bio|truncatewords:"30" }} # 这将显示bio变量的前30个字

    下面是一些最重要的过滤器：
    1, addslashed: 在任何后斜线，单引号，双引号前添加一个后斜线
       当你把一些文本输出到一个JavaScript字符串时这会十分有用
    2, date: 根据一个格式化string参数来格式化date或datetime对象，例如:
        {{ pub_date|date:"F j, Y" }}
    3, escape: 避免给定的string里出现“&”符，引号，尖括号
       当你处理用户提交的数据和确认合法的XML和XHTML数据时这将很有用
       escape 将作如下的一些转换：
        Converts & to &amp;
        Converts < to &lt;
        Converts > to &gt;
        Converts "(双引号) to &quot;
        Converts '(单引号) to &#39;
    4, length: 返回值的长度，你可以在一个list或string上做此操作
       或者在任何知道怎样决定自己的长度的Python对象上做此操作(即有一个 __len__()方法的对象)


7. Django模板系统的限制
   1，模板不能设置和改变变量的值(内置Django模板标签不允许这样做)
   2，模板不能调用原生Python代码
   此外，所有这些功能都可以通过自定义标签来做


8. 模板载入
   1)直接读取文件
     前面例子都直接在Python代码里面写模板的内容，我们还需要把模板与代码分离
     一种简陋的方式就是把模板保存在文件系统中,然后使用Python内建的文件读取功能得到模板的内容，如：

        # 还是修改前面“views.py”文件的“current_datetime”函数为例
        from django.template import Template, Context
        from django.http import HttpResponse

        def current_datetime(request):
            # 以文件形式读取模板
            fp = open(r'D:\test\mysite\mytemplate.html')
            t = Template(fp.read())
            fp.close()
            return HttpResponse(t.render(Context({'name': 'Jhon'})))

   2) 配置的模板载入
      Django提供了方便和强大的API来从硬盘载入模板，从而减少调用模板和模板本身的冗余
      首先你需要在settings文件里告诉Django你把模板放在什么位置。
      Django的settings文件是存放Django实例的配置的地方，它是一个简单的具有模块级变量的Python模块，其中每个设置都是一个变量
      当你运行“django-admin.py startproject mysite”时脚本会为你创建一个默认的settings文件“settings.py”
      由于settings文件仅仅是一个普通的Python模块，设置时可以运行一下以检测语法错误，这将避免settings文件出现Python语法错误

      1,TEMPLATE_DIRS设置: 它告诉Django的模板载入机制在哪里寻找模板
        默认情况下它是一个空的元组，选择一个你喜欢的存放模板的地方并添加到TEMPLATE_DIRS中去

        需要注意的一些事情：
        a. 你可以指定任何目录，只要那个目录下的目录和模板对于你的Web服务器运行时的用户是可读的
           如果你找不到一个放置模板的位置，我们推荐你在Django工程目录下创建一个目录
        b. 不要忘了模板目录最后的逗号，Python需要逗号来区分单元素元组和括号括起来的语句
           这是新手经常犯的错误，如果你想避免这个错误，可以用列表来替代元组，单元素列表不需要结尾的逗号,
           元组比列表略微高效，所以我们推荐使用元组。
        c. 使用绝对路径很简单，如果你想更灵活和松耦合，你可动态构建TEMPLATE_DIRS内容
           使用富有魔力的Python变量 __file__, 它会被自动设成当前代码所在的Python模块的文件名。
        d. 如果你使用Windows，加上硬盘号并使用Unix风格的前斜线而不是后斜线

        例如:
            # Linux/Unix 写法
            TEMPLATE_DIRS = (
                '/home/django/mysite/templates',
            )

            # Windows 写法(需使用Unix风格的前斜线而不是后斜线)
            TEMPLATE_DIRS = (
                'C:/www/django/templates',
            )

            # 列表写法
            TEMPLATE_DIRS = [
                '/home/django/mysite/templates'
            ]

            # 动态载入路径
            import os.path
            TEMPLATE_DIRS = (
                # os.path.join(os.path.basename(__file__), 'templates'),   # 书上的这写法会出问题 =_=!!
                os.path.join(os.path.dirname(os.path.realpath(__file__)), 'templates'), # 我自己改进的写法
            )


      2, 使用Django的模板载入

            # 还是修改前面“views.py”文件的“current_datetime”函数为例
            from django.template.loader import get_template
            from django.template import Context
            from django.http import HttpResponse
            import datetime

            def current_datetime(request):
                now = datetime.datetime.now()
                # 使用 django.template.loarder.get_template()方法载入模板
                # 读取配置指定目录下的文件,这里的配置是读取项目下的 templates目录的文件
                t = get_template('current_datetime.html')
                html = t.render(Context({'current_date': now}))
                return HttpResponse(html)

      3, render_to_response() 方法
         这是Django提供的一个捷径来使用一行代码完成载入模板，填充Context，渲染模板，返回HttpResponse对象的工作
         节省使用 get_template,Template,Context,HttpResponse 这些工作,代码如：

            # 还是修改前面“views.py”文件的“current_datetime”函数为例
            from django.shortcuts import render_to_response
            import datetime

            def current_datetime(request):
                now = datetime.datetime.now()
                # 第一个参数是使用的模板名，对应到模板目录的相对路径
                # 第二个参数是一个用来创建Context的字典；如果不提供第二个参数，它将使用一个空的字典
                return render_to_response('current_datetime.html', {'current_date': now})

      4,locals()小技巧
        locals()返回一个包含当前作用域里面的所有变量和它们的值的字典
        这让你传递值到模板时，保持代码整洁，避免冗余或者过度输入。
        最后要注意的是 locals()导致了一点点开销，因为Python不得不动态创建字典,如果手动指定context字典则可以避免这项开销。
        上面的代码可以重写：

            # 还是修改前面“views.py”文件的“current_datetime”函数为例,其余部分省略
            def current_datetime(request):
                current_date = datetime.datetime.now()
                # locals() 会将方法的所有变量序列化过去，所以变量名要保持一致
                return render_to_response('current_datetime.html', locals())
                return render_to_response('current_datetime.html', {'name1':value1, 'name2':value2}) # 效果相同的写法

      5,模板载入的子目录
        把模板存放模板目录的子目录下，即可通过相对地址访问到。
        因为 render_to_response()是对 get_template()的包装，所以可以在它身上作同样的事情。
        对子目录的深度并没有限制，Windows用户注意使用前斜线而不是后斜线，get_template()使用Unix风格文件名
        例如:
            t = get_template('dateapp/current_datetime.html')


9. 连接数据库:
    例(直接连数据库):
    from django.shortcuts import render_to_response
    import MySQLdb as dbDraver # 没安装相关的数据库驱动会报错

    def book_list(request):
        db = dbDraver.connect(user='me', db='mydb', passwd='secret', host='localhost')
        cursor = db.cursor()
        cursor.execute('SELECT name FROM books ORDER BY name')
        names = [row[0] for row in cursor.fetchall()]
        db.close()
        return render_to_response('book_list.html', {'names': names})


    数据库配置在Django配置文件里面，默认是settings.py, 配置内容:

    DATABASE_ENGINE = ''      # 使用哪个数据库引擎
    DATABASE_NAME = ''        # 数据库名字; 如果你使用SQLite，指出数据库文件的完整的文件系统路径，如'/home/django/mydata.db'
    DATABASE_USER = ''        # 连接数据库的用户名; 如果你使用SQLite，这项为空
    DATABASE_PASSWORD = ''    # 连接数据库的密码; 如果你使用SQLite或者你的密码为空，则这项为空
    DATABASE_HOST = ''        # 连接数据库的主机; 如果数据库和Django安装在同一台计算机上，则这项为空; 如果你使用SQLite，这项为空
    DATABASE_PORT = ''        # 连接数据库的端口，如果你使用SQLite，则这项为空

    1，DATABASE_ENGINE: 使用哪个数据库引擎，必须是下面的字符串集合：

        设置                             数据库                                                    需要的适配器
        postgresql           PostgreSQL psycopg version 1.x,                                      http://initd.org/projects/psycopg1
        postgresql_psycopg2  PostgreSQL psycopg version 2.x,                                      http://initd.org/projects/psycopg2
        mysql                MySQL MySQLdb,                                                       http://sourceforge.net/projects/mysql-python
        sqlite3              SQLite No adapter needed if using Python 2.5+ Otherwise, pysqlite,   http://initd.org/tracker/pysqlite
        ado_mssql            Microsoft SQL Server adodbapi version 2.0.1+,                        http://adodbapi.sourceforge.net/
        oracle               Oracle cx_Oracle,                                                    http://www.python.net/crew/atuining/cx_Oracle/

    2, DATABASE_HOST: 连接数据库的主机，MySQL在这里很特殊，如果这项的值以'/'开头并且你使用MySQL，MySQL会通过Unix socket连接特殊的socket
       例如DATABASE_HOST ＝ '/var/run/mysql/'; 如果你使用MySQL但这项的值不是以'/'开头，那么这项的值就假设为所连接的主机



10. URL配置技巧
    修改django-admin.py startproject自动生成的URL配置文件“urls.py”,位于项目的首目录

    方法1：导入模组,使用“模组名.视图名”来指向视图
        from django.conf.urls.defaults import *
        from mysite import views
        urlpatterns = patterns('',
            (r'^now/$', views.current_datetime),
            (r'^now/plus(\d{1,2})hours/$', views.hours_ahead),
        )

    方法2：使用一个包含模块名字和方法名字的字符串,而不是方法对象本身来指向视图
        from django.conf.urls.defaults import *
        urlpatterns = patterns('',
            (r'^now/$', 'mysite.views.current_datetime'),
            (r'^now/plus(\d{1,2})hours/$', 'mysite.views.hours_ahead'),
        )

    方法3：提取出冗余的视图前缀，写在第一个参数里面，之后的参数使用简便的字符串名称
        from django.conf.urls.defaults import *
        # 都以'mysite.views'开始，它们是冗余的; 注意下面的第一个参数
        urlpatterns = patterns('mysite.views',
            (r'^now/$', 'current_datetime'),
            (r'^now/plus(\d{1,2})hours/$', 'hours_ahead'),
        )

    方法4：多种视图前缀时，可将多个patterns()加到一起
        # 旧的(全写在一起，没法提取前缀)：
        from django.conf.urls.defaults import *
        urlpatterns = patterns('',
            (r'^/?$', 'mysite.views.archive_index'),
            (r'^(\d{4})/([a-z]{3})/$', 'mysite.views.archive_month'),
            (r'^tag/(\w+)/$', 'weblog.views.tag'),
        )

        # 新的(分开写多个patterns函数，每个都可以提取前缀)：
        from django.conf.urls.defaults import *
        urlpatterns = patterns('mysite.views',
            (r'^/?$', 'archive_index'),
            (r'^(\d{4})/([a-z]{3})/$','archive_month'),
        )
        # 这里记住是用“+=”来写
        urlpatterns += patterns('weblog.views',
            (r'^tag/(\w+)/$', 'tag'),
        )

    1) 命名组
       URL中可以使用命名的正则表达式组来捕获URL并且传递关键字参数给视图
       一个Python方法可以使用关键字参数或者位置参数来调用，它们是一样的
       在关键字参数调用中，你指定你想传递的参数名和值
       在位置参数调用中，你简单的传递参数而不指定哪个参数匹配哪个值，关联在参数顺序中隐含
       在Python正则表达式中，命名组的语法是“(?P<name>pattern)”，其中name是组的名字，pattern是要匹配的模式

       例：
        # 文件“urls.py”的内容如下：
        from django.conf.urls.defaults import *
        from mysite import views

        urlpatterns = patterns('',
            (r'^test(\d{4})[.]html$', views.year_archive), # 未命名组
            (r'^test(?P<year>\d{4})(?P<month>\d{2})[.]html$', views.month_archive), # 命名组
        )


        # 文件“views.py”的内容如下：
        from django.http import HttpResponse

        # 未命名组, 参数必须按顺序抓取
        def year_archive(request, year):
            html = "the year is %s." % (year)
            return HttpResponse(html)

        # 命名组, 参数可以按名称抓取,不必再在乎顺序
        def month_archive(request, month, year):
            html = "the year is %s, month is %s" % (year, month)
            return HttpResponse(html)

        # 测试访问地址：
        http://127.0.0.1:8000/test2011.html  # views.year_archive 的访问
        http://127.0.0.1:8000/test201108.html # views.month_archive 的访问地址


      匹配和组算法
        如果你同时命名组和未命名组使用两种方式来处理相同的URL模式，URL配置解析器的算法：
        1，如果有命名的参数，Django将使用它，并且忽略未命名的参数
        2，否则，Django视所有的未命名参数为位置参数传递
        3，两种参数都有的情况下，Django将传递一些额外的关键字参数作为关键字参数


    2) 向视图方法传递额外选项
       额外URL配置选项的特性，URL配置中每个模式可能包含了另外一项：一个关键字参数的字典，它将被传递到视图方法中
       注：1.额外URL配置选项字典可以传递任何类型的Python对象，例如可以传递一个模型对象给它。
           2.当命名组与额外URL配置选项字典有冲突时，额外URL配置参数要比捕获的命名组参数优先级高。

       例：
        # 文件“urls.py”的内容如下：
        from django.conf.urls.defaults import *
        from mysite import views

        urlpatterns = patterns('',
            (r'^foo/$', views.foobar_view, {'template_name': 'template1.html'}), # 第三个参数提供额外参数的字典
            (r'^bar/$', views.foobar_view, {'template_name': 'template2.html'}),
        )

        # 文件“views.py”的内容如下：
        from django.shortcuts import render_to_response
        import datetime

        def foobar_view(request, template_name):
            now = datetime.datetime.now()
            return render_to_response(template_name, {'current_date': now})

    3) 伪造捕获的URL配置值
       视图方法仅仅关心它可以得到的参数, 而并不关心这些参数是否来自于URL捕获本身或者额外参数
       因此可以通过额外URL配置选项伪造捕获的URL值来处理具有相同视图的额外的URL

       例：
        # 文件“urls.py”的内容如下：
        from django.conf.urls.defaults import *
        from mysite import views

        # 这里的两个配置，调用同一个视图，而且都正常地传递参数
        urlpatterns = patterns('',
            (r'^mydata/birthday/$', views.my_view, {'month': 'jan', 'day': '06'}),
            (r'^mydata/(?P<month>\w{3})/(?P<day>\d{1,2})/$', views.my_view),
        )

    4) 使用默认视图参数
       它告诉视图如果一个参数值是 None 则使用默认值(好像可以使用伪造捕获的URL配置值来代替这功能)

       例：
        # 文件“urls.py”的内容如下：
        from django.conf.urls.defaults import *
        from mysite import views

        urlpatterns = patterns('',
            (r'^blog/$', views.page),
            (r'^blog/page(?P<num>\d+)/$', views.page),
        )

        # 文件“views.py”的内容如下：
        def page(request, num="1"):
            # Output the appropriate page of blog entries, according to num.
            # ...

    5) 特殊情况下的视图
       如果URL匹配多种模式，它会优先匹配上面的模式(这是短路逻辑)

       例：
        # 虽然第一种情况下的模式也匹配第二种，但它会执行第一种对应的视图
        urlpatterns = patterns('',
            ('^auth/user/add/$', 'views.auth.user_add_stage'),
            ('^([^/]+)/([^/]+)/add/$', 'views.main.add_stage'),
        )

    6) URL配置匹配的内容
       当一个请求过来，Django试图把URL当作普通的Python字符串而不是Unicode字符串来和URL配置模式匹配
       这不包括GET或POST参数，或者域名，它也不包括第一个斜线，因为每个URL都以斜线开头
        例如，对“http://www.example.com/myapp/”的请求, Django将试图匹配“myapp/”
        对“http://www.example.com/myapp/?page=3”, Django将试图匹配“myapp/”


11. 引入其它URL配置
    URL匹配中使用 inclue() 函数
    指向 inclue() 的正则表达式不要包含$(结尾匹配符)，Django将截断匹配的URL并将剩下的部分转交给include的URL配置继续处理

    例如:
        # 文件“urls.py”的内容
        from django.conf.urls.defaults import *
        urlpatterns = patterns('mysite',
            (r'^weblog/', include('blog.urls')), # 视图前缀对 include 同样生效
            (r'^about/$', 'views.about'), # 可以混用include()和 非include()模式
        )

        # “mysite.blog.urls”的内容
        from django.conf.urls.defaults import *
        urlpatterns = patterns('',
            (r'^(\d{4})/$', 'mysite.blog.views.year_detail'),
            (r'^(\d{4})/(\d{2})/$', 'mysite.blog.views.month_detail'),
        )

        # 测试网址
        http://localhost:8000/weblob/2007/
        在第一个URL配置里，模式“r'^weblog/'”会匹配，因为它是一个include()，Django会截取所有匹配的文本，即这里是“'weblob/'”，
        然后剩下部分是“2007/”，它将匹配 mysite.blog.urls 的第一行


    include配置的父URL配置接受捕获的参数也可以传递到视图函数
    额外URL配置选项也可以与include()一起工作

    例如:
        # 文件“urls.py”的内容
        from django.conf.urls.defaults import *
        urlpatterns = patterns('mysite',
            (r'^weblog/', include('blog.urls'), {'name': 'Jhon'}),
        )


12. generic views
    1, 渲染模板
       django.views.generic.simple.direct_to_template
       渲染一个给定的模板，并把在URL里捕获的参数组成字典作为{{ params }} 变量传递给它。

       例：
        # 文件“urls.py”的内容
        from django.conf.urls.defaults import *
        urlpatterns += patterns('django.views.generic.simple',
            (r'^foo/(?P<pid>\d+)/$', 'direct_to_template', {'template': 'test.html'}),
        )

        # 模板文件“test.html”的内容, 可获取到变量
        <div>id: {{ params.pid }}</div>


    2, 重定向到另一URL
       django.views.generic.simple.redirect_to
       重定向到另一个URL，给定的URL可能包含字典样式的string格式，它将插入到URL
       如果给定的URL是 None, Django将返回一个 HTTP 410(不可用)信息

       例：
        # 文件“urls.py”的内容
        from django.conf.urls.defaults import *
        urlpatterns = patterns('django.views.generic.simple',
            (r'^test(\d{4})[.]html$', 'mysite.views.year_archive'), # 跳转到的网址
            (r'^foo/(?P<year>\d+)/$', 'redirect_to', {'url': r'/test%(year)s.html'}), # 页面跳转
            ('^bar/$', 'redirect_to', {'url': None}), # 请求将返回一个410 HTTP错误
        )

        # 测试网址
        输入网址：  http://127.0.0.1:8000/foo/2011/
        将会跳转到：http://127.0.0.1:8000/test2011.html

        # 获取参数
        URL 的“(?P<name>...)”的参数，需要通过“%(name)s”来获取
        页面跳转时，网址会改变。


13. 数据库连接
    1) 可在 Django 项目的 settings.py 里面写数据库配置信息，以便调用(不用独立出来写)

        # Django 1.0 时的写法是：
        DATABASE_ENGINE = 'oracle' # 数据库类型：'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        DATABASE_NAME = 'orcl'  # 数据库名, 或者是sqlite3数据库文件的路径
        DATABASE_USER = 'NEWSPBC' # 用户名, sqlite3不需用
        DATABASE_PASSWORD = 'dgxytspbc' # 密码, sqlite3不需用
        DATABASE_HOST = '172.16.2.20' # IP地址，为空则认为是localhost; sqlite3不需用
        DATABASE_PORT = '1521'  # 端口，为空则使用默认的; sqlite3不需用

        # Django 1.2.5 时的写法是：
        DATABASES = {
            'default': {
                'ENGINE': 'oracle',  # 数据库类型：'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
                'NAME': 'g315',      # 数据库名, 或者是sqlite3数据库文件的路径
                'USER': 'maomingtest', # 用户名, sqlite3不需用
                'PASSWORD': 'maomingtest', # 密码, sqlite3不需用
                'HOST': '192.168.1.240',  # IP地址，为空则认为是localhost; sqlite3不需用
                'PORT': '1521',  # 端口，为空则使用默认的; sqlite3不需用
            }
        }

    2)  常见的错误信息                                                    问题所在
        You haven’t set the DATABASE_ENGINE setting yet.            # DATABASE_ENGINE 不能为空
        Environment variable DJANGO_SETTINGS_MODULE is undefined.    # 需运行 python manage.py shell而不是python
        Error loading __ module: No module named __.                 # 还没有安装数据库相关的适配器(如psycopg或MySQLdb)
        __ isn’t an available database backend.                     # DATABASE_ENGINE 不是合法的数据库引擎，拼写错误
        database __ does not exist                                   # DATABASE_NAME 指向一个不存在的数据库
        role __ does not exist                                       # DATABASE_USER 指向一个不存在的user
        could not connect to server              # DATABASE_HOST 或者 DATABASE_PORT 设置不正确，也可能数据库没运行

    3) 建立app
        project和app的区别(区别就是配置和代码)：
        1，一个project是许多Django app的集合的实例，加上那些app的的配置
           一个project唯一的前提是它提供一个settings文件，里面定义了数据库连接信息，安装的app，TEMPLATE_DIRS等等
        2，一个app是Django的可移动功能集，通常包括模型和视图，存在于一个单独的Python包里面
           关键要注意的是它们是可移动并且可以在不同的project重用
           有一点需要重视app惯例，如果你使用Django的数据库层(模型)，你必须创建Django app(模型必须存在于app)
        3，在前面创建的mysite目录下面，运行下面的命令来创建一个新的app：
           python manage.py startapp app名称

    4) 建立模型
        一个模型通常域一个数据库表对应，而每个属性和数据库表的一列对应
        属性名对应列名，属性的类型(如CharField)对应数据库列类型
        Django自己可以生成SQL语句(如 create table 等等)
        如果表是多对多关系，但是数据表并没有多对多对应的列；Django会创建一个附加的多对多连接表来处理映射关系
        除非你自己定义一个主键，Django会自动为每个模型生成一个integer主键域id(模型中不需要定义主键，他会隐式创建)
        每个Django模型都必须有一个单列的主键

        # 在上一步用 startapp 命令创建的 models.py 中输入下面的内容：
        from django.db import models

        class Publisher(models.Model):
            name = models.CharField('出版社名称', max_length=30) # 字符串类型，定义长度30；第一个字符串参数是字段说明
            address = models.CharField(max_length=50)
            total = models.IntegerField('总量', default=0, blank=True) # 数值类型
            salutation = models.CharField(max_length=10, blank=True, null=True) # 允许为空值(默认是 not null)；默认为空值
            publication_date = models.DateField()  # 日期类型(date)
            website = models.URLField() # URL 类型(字符串保存，200位)
            file_path = models.FilePathField('新闻文件路径') # 文件路径,路径符号会被自动转换
            email = models.EmailField() # email 类型(字符串 保存，75位)
            headshot = models.ImageField(upload_to='/tmp') # 图片类型,定义上传路径（字符串保存，100位）
            # 图片类型需安装模块，地址： http://www.pythonware.com/products/pil/   可以导入“import ImageFile”才算成功

        class Author(models.Model):
            code = models.CharField('作者编号', max_length=20, primary_key=True) # 显式定义主键,字符串类型
            name = models.CharField(max_length=30)

        # 指定可选的值(下面的 confirm_status 字段使用)
        CONFIRM_STATUS = ( ('待审核','待审核'), ('已通过','已通过'), ('未通过','未通过'), )
        class Book(models.Model):
            no = models.AutoField('书编号', primary_key=True) # 显式定义主键,自增长类型(整数类型)
            title = models.CharField(max_length=100)
            publish_time = models.DateTimeField('发布时间', auto_now_add = True) # 时间类型(datetime)，会自动赋值为当前时间
            confirm_note = models.CharField('审核意见', max_length=100, blank=True, null=True) # 设定允许为空
            # 指定固定值，并设置预设值
            confirm_status = models.CharField('审核状态',max_length=10, choices=CONFIRM_STATUS, default='待审核')
            full_content_path = models.FilePathField('封面文件路径') # 文件路径类型(字符串保存，100位)
            full_content = models.TextField('全部内容') # text 类型
            authors = models.ManyToManyField(Author) # 对应一个或多个authors(many-to-many)；会创建关联表来维护
            publisher = models.ForeignKey(Publisher) # 对应一个单独的publisher(one-to-many)；会创建外键来维护
            # 以下是一一对应关系的写法，第一个参数是关联的对象， verbose_name 是说明
            # place = models.OneToOneField(Place, verbose_name="related place")


    5) 安装模型

       编辑首目录的 settings.py, 查找 INSTALLED_APPS 设置
        # 每个 app 都用完整的 Python PATH 来表示，即包的PATH，用小数点分隔来指向app包
        INSTALLED_APPS = (
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.sites',
            'mysite.books',                # 自定义的模型
        ) # 别忘了最后的逗号

        验证模型： python manage.py validate
        validate命令检查我们的模型语法和逻辑正确与否
        如果一切正常，我们会看到0 errors found的信息；否则，error输出会给你有用的信息来帮你找到错误的代码
        任何时候你认为你的模型代码有问题都可以运行python manage.py validate来捕捉模型错误

        生成CREATE TABLE语句：  python manage.py sqlall app名称
        运行完命令，你将会看到建表语句
        sqlall命令事实上并没有接触数据库或建表，它仅仅将输出打印到屏幕上

    6) 把模型同步到数据库
       python manage.py syncdb
       它检查数据库和你的INSTALLED_APPS中的所有app的所有模型，看看是否有些表已经存在，如果表不存在就创建表
       注意syncdb不会同步改动或删除了的模型，如果你改动或删除了一个模型，syncdb不会更新数据库

    7) 操作数据库
       # 执行命令
       python manage.py shell  # 先进入django的shell，以加载设置后再运行

       ####################### 执行python ######################
       from books.models import Publisher,Book # import模型类

       # 新增、保存
       p = Publisher(name='Apress', address='2560 Ninth St.', website='http://www.apress.com/') # 创建模型类对象,并赋值
       p.save() # 将一个对象保存到数据库，后台Django在这里执行了一条 INSERT SQL语句
       p = Publisher(name="O'Reilly", address='10', website='http://www.oreilly.com/')
       p.save()
       Joe = Publisher.objects.create(name="Joe", address='10 N') # 直接保存到数据库，并返回这个对象
       book = Book.objects.get(title="ddkk")
       book.publisher.add(Joe) # 添加关联类(调用它的 add 函数)

       # 更新
       publisher = Publisher.objects.get(id=1) # 这只获取到一个对象
       publisher.name = 'test_name'
       publisher.save() # 执行更新语句
       Publisher.objects.filter(name='Joe').update(city='haha..') # 执行条件更新(更新多行)；返回更新的行数
       Publisher.objects.select_related().filter(name='www').update(city='haha..') # select_related 函数会查询所有
       Publisher.objects.update(city='kk.') # 没有条件，则整表更新

       # 删除
       publisher = Publisher.objects.get(id=1)
       publisher.delete() # 执行删除语句,没返回值
       Publisher.objects.filter(name='Joe').delete()  # 执行条件删除语句(会删除多行)

       # 查询
       # 使用 模型类.objects 属性从数据库得到对象，使用 模型类.objects.all() 得到 模型类 的所有的对象列表
       publisher_list = Publisher.objects.all() # 后台Django在这里执行了一条 SELECT SQL语句；找出所有
       print(publisher_list) # 打印：[<Publisher: Publisher object>, <Publisher: Publisher object>]
       print(publisher_list[0].name) # 使用对象的某个值，打印：Apress
       # order_by 函数排序查询(负号表示倒序)； values 函数只查询指定字段(返回一个列表,列表里面各行数据是一个字典)
       p_list = Publisher.objects.all().order_by('-publication_date').values('name', 'address', 'email')
       p_list = Publisher.objects.order_by('name') # 直接排序，返回跟all函数一样的结果，只是有排序
       # 按条件查询, 查不到时会报错
       publisher_list = Publisher.objects.get(name="Apress")
       publisher_list = Publisher.objects.get(name="Apress", address='2560 N') # 多条件查询(各条件是 and 关系)
       # 过滤出等于或不等于此值的内容，找不到返回空列表，不报错
       Publisher.objects.filter(name='Joe').exclude(address='10 N').filter(email='tt') # filter 函数找出等于此值的；exclude 函数找出不等于此值的
       Publisher.objects.filter(name='Joe', email='tt') # filter 函数的多条件查询, and 关系
       # limit 查询(注：调用all语句前不会立即执行,故不用担心消耗过大)
       publisher_list = Publisher.objects.all()[:10] # 找出前10条记录
       publisher_list = Publisher.objects.all()[5:10] # 找出第5到第10条记录
       publisher_list = Publisher.objects.all()[5] # 找出第5条记录
       publisher_list = Publisher.objects.all()[:10:3] # 找出前10条记录中的每3条记录取1条(即是取第1,4,7,10条记录)
       publisher_list = Publisher.objects.all()[-5] # 报错，不支持此用法
       publisher = Publisher.objects.all()[0:1].get() # 只有一条记录时，可以用 get 函数来取
       # 查询总数
       count = Publisher.objects.all().count()
       # 比较条件(在字段名后面加上比较的后缀,两个下划线做连接)
       publisher_list = Publisher.objects.filter(name__lte='Joe') # 查找 name <= 'Joe' 的内容
       publisher = Publisher.objects.get(name__exact='Joe')  # 用 get 函数也可以查找，只是要求结果是一个的，不然报错；多了或者少了都报错
       publisher_list = Publisher.objects.filter(name__isnull=True)  # 查找 name 为空的内容
       publisher_list = Publisher.objects.filter(name__contains='joe') # like 查询(特殊符号会被自动转义，如“%”转成“\%”)
       publisher_list = Publisher.objects.exclude(id__in=[1,3,4]) # in 查询, 找出 id not in( 1, 3, 4 ) 的
       # __lt  <  (小于)      __lte <= (小于等于)
       # __gt  <  (大于)      __gte <= (大于等于)
       # __exact  (等于)      __iexact (忽略大小写的等于)
       # __contains (like)    __icontains (忽略大小写的 like )
       # __isnull = True      __isnull = False  (是否为空)
       # __in (in 列表)
       # __startswith (开始于,相当于 like 'value%' )   __istartswith (忽略大小写的 )
       # __endswith (结尾于,相当于 like '%value' )     __iendswith (忽略大小写的 )

       # 多表的条件查询
       book_list = Book.objects.filter(publisher__name="Joe") # 多表查询, 查询 book表的 publisher 关联表的 name 字段
       book_list = Book.objects.filter(publisher__name__isnull=False) # 多表查询的条件查询，条件拼接跟前面一样

       # 原生SQL查询,使用： Manager.raw(raw_query, params=None, translations=None)
       for p in Publisher.objects.raw('SELECT * FROM books_publisher'): print(p) # 直接使用原生SQL

       # F 模型(各字段之间的比较)
       from django.db.models import F
       publisher_list = Publisher.objects.filter(name__gte=F('address')) # 两字段比较： select ... where name >= address
       publisher_list = Publisher.objects.filter(name=F('address')*3)  # 可以加减乘除，只是不知道怎么用
       publisher_list = Publisher.objects.filter(name=F('address')+F('address')-F('id'))

       # Q 模型(多条件查询)
       from django.db.models import Q
       Publisher.objects.filter(Q(name__startswith='d')) # 语句如： select ... where name like 'd%'
       Publisher.objects.filter(Q(name='dd') | Q(name__in=['joe','www'])) # or 用法，语句如： select ... where name='dd' or name in ('joe','www')
       Publisher.objects.filter(Q(id__gt=8), Q(name='dd') | Q(name__in=['joe','www'])) # and 和 or 合用： where id>8 and name='dd' or name in ('joe','www')


    8) 添加模型的string显示
        上面的例子中，当我们打印publishers列表时我们得到的都是一些无用的信息，我们很难将Publisher对象区别开：
        [<Publisher: Publisher object>, <Publisher: Publisher object>]
        我们可以通过给Publisher对象添加一个 __str__() 方法来轻松解决这个问题
        __str__()唯一的条件是返回一个string，如果不返回 string 的话如返回一个 integer ,会触发一个TypeError异常
        __str__()方法告诉Python怎样显示对象的string显示：

        # 修改前面的 Author 类
        class Author(models.Model):
            name = models.CharField(max_length=30)
            salutation = models.CharField(max_length=10)

            def __str__(self):
                return self.name

       # 执行命令
       python manage.py shell

       # 执行python
       from books.models import Author # import模型类
       a = Author(name='Jhon', salutation='salutation1')
       a.save()
       a = Author(name='Kevin', salutation='salutation2')
       a.save()
       author_list = Author.objects.all()
       print(author_list) # 打印：[<Author: Jhon>, <Author: Kevin>]
       print(author_list[0].name) # 打印： Jhon

    注意__str__()是给模型添加行为的好习惯
    一个Django模型描述的不仅仅是一个对象数据库表结构，它也描述了对象知道怎样去做的功能


14. 分页
    可使用 django 内置的分页

    # 导入分页工具
    from django.core.paginator import Paginator

    objects = ['john', 'paul', 'george', 'ringo', 'vincent', 'jecheck', 'dennis', 'lynn', 'lili', 'andy'] # 模拟数据库查询出的数据

    # 参数: 第一个就是数据的集合，第二个表示每页放几笔数据。 allow_empty_first_page 查询时是否允许为空,(默认值 False,为空时报错)
    # 第一个参数可以是list，tuple，QuerySet 或者任意对象——只要它有 count() 或者 __len__() 函数。 Django会先尝试调用 count()。如果 不可行，再调用 len() 。
    p = Paginator(objects, 3, allow_empty_first_page=True)
    print(p.count)  # 共多少笔资料，打印: 10
    print(p.num_pages) # 共多少页,打印： 3
    print(p.page_range) # 分页条的列表,打印： [1,2,3,4]

    page1 = p.page(1) # 取第一页，里面的数字是第几页
    print(page1) # 对象，打印： <Page 1 of 4>
    print(page1.object_list) # 所取页面的集合,打印: ['john', 'paul', 'george']

    page2 = p.page(2) # 取第二页
    print(page2.has_next()) # 是否有下一页,结果是bool类型,打印: True
    print(page2.has_previous()) # 是否有上一页,结果是bool类型,打印: True
    print(page2.has_other_pages()) # 是否有其他页面,结果是bool类型,打印: True
    print(page2.next_page_number()) # 下一页的页码,打印: 3
    print(page2.previous_page_number()) # 上一页的页码,打印: 1
    print(page1.previous_page_number()) # 上一页的页码,第一页时,打印: 0

    print(page1.start_index()) # 这页面的开始行数(从1开始),打印: 1
    print(page2.start_index()) # 这页面的开始行数(从1开始),打印: 4
    print(page2.end_index()) # 这页面的结束行数,打印: 6

    p.page(0) # 报错:  EmptyPage: That page number is less than 1
    p.page(5) # 报错:  EmptyPage: That page contains no results


15.生成静态页面
    import codecs, os
    from django.template.loader import get_template
    from django.template import Context
    from django.views.static import serve

    # 项目配置信息(项目路径)，在 setting 文件里的写法是： PROJECT_DIR = os.path.dirname(__file__)
    from xyt.settings import PROJECT_DIR

    # 写出文件
    news_file = codecs.open('%s/test.html' % os.path.abspath(PROJECT_DIR), 'wb', 'utf-8')
    try:
        t = get_template('news/newsContent.html')
        html = t.render(Context(locals()))
        news_file.write(html)
    except IOError, ioe:
        raise RpcError(ioe.message)
    finally:
        news_file.close()

    # 返回静态文件
    return serve(request, document_root=PROJECT_DIR, path="test.html")


16.获取参数
    def index(request, other_ars=False):
        if request.method == 'POST': # 判断发送方式
            print 'POST...'
        code = request.POST.get('code', '') # 获取post过来的值
        iacs = request.GET.get('iacs') # 获取get的值
        return render_to_response('index.html', locals())


附录F：
1.内建标签参考

  block
    定义一个能被子模板覆盖的区块。如：
        <title>{% block title %}{% endblock %}</title>
        <body>
            <h1>My helpful timestamp site</h1>
            {% block content %}{% endblock %}
            {% block footer %} {# 如果有输入这个模板，则使用输入的，没有则使用这里定义的内容 #}
              <hr><p>Thanks for visiting my site.</p>
            {% endblock %}
        </body>


  comment 注释
    模板引擎会忽略掉 {% comment %} 和 {% endcomment %} 之间的所有内容。如：
        {# dsfsfsdfsdfsdfsd #}  # 单行注释
        {% comment %}  dsfsfsdfsdfsdfsd {% endcomment %}  # 多行注释


  cycle 轮流使用标签给出的字符串列表中的值。
    在一个循环内，轮流使用给定的字符串列表元素：
        {% for o in some_list %}
            <tr class="{% cycle row1,row2 %}">
                ...
            </tr>
        {% endfor %}

    在循环外，在你第一次调用时，给这些字符串值定义一个不重复的名字，以后每次只需使用这个名字就行了：
        <tr class="{% cycle row1,row2,row3 as rowcolors %}">...</tr>
        <tr class="{% cycle rowcolors %}">...</tr>
        <tr class="{% cycle rowcolors %}">...</tr>

    你可以使用任意数量的用逗号分隔的值。注意不要在值与值之间有空格，只是一个逗号。


  debug
    输出完整的调试信息，包括当前的上下文及导入的模块信息。如：
    {% debug %}  用查看源码来看，可以看到得更好点


  extends 扩展
    标记当前模板扩展一个父模板。
    这个标签有两种用法：
    {% extends "base.html" %}  (带引号) 直接使用要扩展的父模板的名字 "base.html"
    {% extends variable %} 用变量 variable 的值来指定父模板。如果变量是一个字符串，Django会把字符串的值当作父模板的文件名。如果变量是一个 Template 对象，Django会把这个对象当作父模板。


  filter
    通过可变过滤器过滤变量的内容。
    过滤器也可以相互传输，它们也可以有参数，就像变量的语法一样。如：
        {% filter escape|lower %}
            This text will be HTML-escaped, and will appear in all lowercase.
        {% endfilter %}


  firstof
    输出传入的第一个不是 False 的变量，如果被传递变量都为 False ，则什么也不输出。如：
        {% firstof var1 var2 var3 %}
    这等同于如下内容：
        {% if var1 %}
            {{ var1 }}
        {% else %}{% if var2 %}
            {{ var2 }}
        {% else %}{% if var3 %}
            {{ var3 }}
        {% endif %}{% endif %}{% endif %}


  for
    遍历列表中的每一元素。例如显示一个指定的运动员的序列 athlete_list ：
        <ul>
        {% for athlete in athlete_list %}
            <li>{{ athlete.name }}</li>
        {% endfor %}
        </ul>

    逆向遍历一个列表 {% for obj in list reversed %}

    {% for %}循环中的可用变量
    forloop.counter         当前循环次数（索引最小为1）。
    forloop.counter0        当前循环次数 (索引最小为0)。
    forloop.revcounter      剩余循环次数 (索引最小为1)。
    forloop.revcounter0     剩余循环次数 (索引最小为0)。
    forloop.first           第一次循环时为 True 。
    forloop.last            最后一次循环时为 True 。
    forloop.parentloop      用于嵌套循环，表示当前循环外层的循环。

    系统不支持中断循环(即 break 和 continue)，如果需要中断，可以改变遍历的变量来使得变量只包含你想遍历的值


  if
    测试一个变量，若变量为真(即其存在、非空，且不是一个为假的布尔值)，区块中的内容就会被输出：
        {% if athlete_list %}
            Number of athletes: {{ athlete_list|length }}
        {% else %}
            No athletes.
        {% endif %}

    if 标签有可选的 {% else %} 从句，若条件不成立则显示该从句。
    if 语句可使用 and 、 or 和 not 来测试变量或者对给定的变量取反：

        {% if athlete_list and coach_list %}      {# and 用法 #}
            <p>Both athletes and coaches are available.</p>
        {% endif %}
        {% if not athlete_list %}                 {# not 用法 #}
            <p>There are no athletes.</p>
        {% endif %}
        {% if athlete_list or coach_list %}       {# or 用法 #}
            <p>There are some athletes or some coaches.</p>
        {% endif %}
        {% if not athlete_list or coach_list %}   {# not 和 or 一起用, not 的优先级更高 #}
            <p>There are no athletes or there are some coaches.</p>
        {% endif %}
        {% if athlete_list and not coach_list %}  {# not 和 and 一起用, not 的优先级更高 #}
            <p>There are some athletes and absolutely no coaches.</p>
        {% endif %}
        {% if a1 or a2 or a3 or a4 %}             {# 允许多次使用同一个逻辑符号 #}
            <p>There are some a.</p>
        {% endif %}


    不允许 and 和 or 同时出现在一个 if 语句中，因为这样会有逻辑上的问题。例如这样是有语病的：
        {% if athlete_list and coach_list or cheerleader_list %}...{% endif %}
        {# 经测试，这样写是可以的，只不过建议不要这样写，因为逻辑上会混乱 #}

    还可以使用“==”、“>=”、“>”、“<=”、“<”等判断符号，如：
        {% if title|length <= 4 %}title1{% else %}title5{% endif %}


  ifchanged
    检查循环中一个值从最近一次重复其是否改变。
    ifchanged 语句块用于循环中，其作用有两个：

    它会把要渲染的内容与前一次作比较，发生变化时才显示它。例如，下面要显示一个日期列表，只有月份改变时才会显示它：
        <h1>Archive for {{ year }}</h1>
        {% for date in days %}
            {% ifchanged %}<h3>{{ date|date:"F" }}</h3>{% endifchanged %}
            <a href="{{ date|date:"M/d"|lower }}/">{{ date|date:"j" }}</a>
        {% endfor %}

    如果给的是一个变量，就会检查它是否发生改变。
        {% for date in days %}
            {% ifchanged date.date %} {{ date.date }} {% endifchanged %}
            {% ifchanged date.hour date.date %}
                {{ date.hour }}
            {% endifchanged %}
        {% endfor %}

    前面那个例子中日期每次发生变化时就会显示出来，但只有小时和日期都发生变化时才会显示小时。


  ifequal
    如果两个参数相等，就输出该区块的内容。如：
        {% ifequal user.id comment.user_id %}
            ...
        {% endifequal %}

    {% else %} 语句是可选的。
    参数也可以是硬编码的字符串(单引号和双引号均可)，所以下面这种写法是正确的：
        {% ifequal user.username "adrian" %}
            ...
        {% endifequal %}

    可以用来比较的参数只限于模板变量或者字符串、数值，但不能检查诸如 True or False 等Python对象是否相等。如果你需要测试某值的真假，可以用 if 标签。
    可以使用 if 标签的“==”比较来代替此标签，如： {% if tt == 'template' %}{{ tt }}{% endif %}

  ifnotequal
    和 ifequal 类似，不过它是用来测试两个参数是 不 相等的。


  include
    加载一个模板，并用当前上下文对它进行渲染，这是在一个模板中包含其他模板的一种方法。
    模板名可以是一个变量或者是一个硬编码（引号引起来的）的字符串，引号可以是单引号或者双引号。

    如包含 "foo/bar.html" 模板的内容：
        {% include "foo/bar.html" %}

    如包含名字为变量 template_name 指定的模板的内容：
        {% include template_name %}


  load
    读入一个自定义的模板库。


  now
    根据给定的格式字符串显示当前日期。
    这个标签来源于PHP中的 date() 函数( http://php.net/date )，并使用与其相同的格式语法，但是Django对其做了扩展。

    可用的日期格式字符串
       格式     描述
        a     'a.m.' 或者 'p.m.'(这与PHP中的输出略有不同，因为为了匹配美联社风格，它包含了句点。)。输出如: 'a.m.'
        A     'AM' 或者 'PM' 。输出如:  'AM'
        b     月份，文字式的，三个字母，小写。输出如: 'jan'
        d     一月的第几天，两位数字，带前导零。输出如: '01' 到 '31'
        D     一周的第几天，文字式的，三个字母。输出如: 'Fri'
        f     时间，12小时制的小时和分钟数，如果分钟数为零则不显示。输出如: '1' , '1:30'
        F     月份，文字式的，全名。输出如: 'January'
        g     小时，12小时制，没有前导零。 '1' 到 '12'
        G     小时，24小时制，没有前导零,'0' 到 '23'。输出如: '0', '1', '23'
        h     小时，12小时制。 '01' 到 '12'
        H     小时，24小时制。 '00' 到 '23'
        i     分钟。'00' 到 '59'
        j     一月的第几天，不带前导零。'1' 到 '31'
        l     一周的第几天，文字式的，全名。输出如: 'Friday'
        L     是否为闰年的布尔值。输出如: True 到 False
        m     月份，两位数字，带前导零。'01' 到 '12'
        M     月份，文字式的，三个字母。输出如: 'Jan'
        n     月份，没有前导零。'1' 到 '12'
        N     美联社风格的月份缩写。输出如: 'Jan.' , 'Feb.' , 'March' , 'May'
        O     与格林威治标准时间的时间差(以小时计)。输出如: '+0200'
        P     时间，12小时制的小时分钟数以及a.m./p.m.，分钟数如果为零则不显示，用字符串表示特殊时间点，如 'midnight' 和 'noon' 。
                输出如: '1 a.m.' , '1:30 p.m.' , 'midnight' , 'noon' , '12:30 p.m.'
        r     RFC 822 格式的日期。输出如: 'Thu, 21 Dec 2000 16:01:07 +0200'
        s     秒数，两位数字，带前导零。'00' 到 '59'
        S     英语序数后缀，用于表示一个月的第几天，两个字母。输出如: 'st' , 'nd' , 'rd' 到 'th'
        t     指定月份的天数。28 到 31
        T     本机的时区。输出如: 'EST' , 'MDT'
        w     一周的第几天，数字，带前导零。'0' (Sunday) 到 '6' (Saturday)
        W     ISO-8601 一年中的第几周，一周从星期一开始。输出如: 1 , 23
        y     年份，两位数字。输出如: '99'
        Y     年份，四位数字。输出如: '1999'
        z     一年的第几天。0 到 365
        Z     以秒计的时区偏移量，这个偏移量对于UTC西部时区总是负数，对于UTC东部时区总是正数。 -43200 到 43200

    例：
        It is {% now "jS F Y H:i" %}

    记住，如果你想用一个字符串的原始值的话，你可以用反斜线进行转义。
    下面这个例子中，f被用反斜线转义了，如果不转义的话f就是显示时间的格式字符串。o不用转义，因为它本来就不是一个格式字母。
        It is the {% now "jS o\f F" %}   显示成: “It is the 4th of September”。


  regroup
    把一列相似的对象根据某一个共有的属性重新分组。
    要解释清这个复杂的标签，最好来举个例子。比如， people 是包含 Person 对象的一个列表， 这个对象拥有 first_name 、 last_name 和 gender 属性，你想这样显示这个列表：
        * Male:
            * George Bush
            * Bill Clinton
        * Female:
            * Margaret Thatcher
            * Condoleezza Rice
        * Unknown:
            * Pat Smith

    下面这段模板代码就可以完成这个看起来很复杂的任务：
        {% regroup people by gender as grouped %}
        <ul>
        {% for group in grouped %}
            <li>{{ group.grouper }}
            <ul>
                {% for item in group.list %}
                <li>{{ item }}</li>
                {% endfor %}
            </ul>
            </li>
        {% endfor %}
        </ul>

    如你所见， {% regroup %} 构造了一个列表变量，列表中的每个对象都有 grouper 和 list 属性。 grouper 包含分组所依据的属性， list 包含一系列拥有共同的 grouper 属性的对象。这样 grouper 就会是 Male 、 Female 和 Unknown ， list 就是属于这几种性别的人们。

    记住，如果被分组的列表不是按照某一列排好序的话，你就不能用 {% regroup %} 在这一列上进行重新分组！就是说如果人的列表不是按照性别排好序的话，在用它之前就要先对它排序，即：
        {% regroup people|dictsort:"gender" by gender as grouped %}


  spaceless
    去除HTML标签之间的空白符号，包括制表符和换行符。例如:
        {% spaceless %}
            <p>
                <a href="foo/">Foo</a>
            </p>
        {% endspaceless %}
    返回结果如下：
        <p><a href="foo/">Foo</a></p>

    仅仅 标签 之间的空白符被删掉，标签和文本之间的空白符是不会被处理的。在下面这个例子中， Hello 两边的空白符是不会被截掉的：
        {% spaceless %}
            <strong>
                Hello
            </strong>
        {% endspaceless %}


  ssi
    把一个指定的文件的内容输出到页面上。
    像include标签一样， {% ssi %} 会包含另外一个文件的内容，这个文件必须以绝对路径指明：
        {% ssi /home/html/ljworld.com/includes/right_generic.html %}

    如果指定了可选的parsed参数的话，包含进来的文件的内容会被当作模板代码，并用当前的上下文来渲染：
        {% ssi /home/html/ljworld.com/includes/right_generic.html parsed %}

    注意，如果你要使用 {% ssi %} 的话，为了安全起见，你必须在Django配置文件中定义ALLOWED_INCLUDE_ROOTS。
    大多数情况下 {% include %} 比 {% ssi %} 更好用， {% ssi %} 的存在通常是为了向后兼容。


  templatetag
    输出组成模板标签的语法字符。
    模板系统没有转义的概念，所以要显示一个组成模板标签的字符的话，你必须使用 {% templatetag %} 标签。如：
        {% templatetag openblock %} 输出“{%”

    参数用来标明要显示的字符
        参数              输出
        openblock        {%
        closeblock       %}
        openvariable     {{
        closevariable    }}
        openbrace        {
        closebrace       }
        opencomment      {#
        closecomment     #}


  url
    根据所给视图函数和可选参数，返回一个绝对的URL（就是不带域名的URL）。由于没有在模板中对URL进行硬编码，所以这种输出链接的方法没有违反DRY原则。
        {% url path.to.some_view arg1,arg2,name1=value1 %}

    第一个变量是按 package.package.module.function 形式给出的指向一个view函数的路径。那些可选的、用逗号分隔的附加参数被用做URL中的位置和关键词变量。所有URLconf需要的参数都应该是存在的。

    例如，假设你有一个view，app_name.client，它的URLconf包含一个client ID参数。URLconf对应行可能看起来像这样：
        ('^client/(\d+)/$', 'app_name.client')
    如果这个应用的URLconf像下面一样被包含在项目的URLconf里：
        ('^clients/', include('project_name.app_name.urls'))
    那么，在模板中，你可以像这样创建一个指向那个view的link连接：
        {% url app_name.client client.id %}
    模板标签将输出字符串/clients/client/123/


  widthratio 宽度的比率
    为了画出长条图，这个标签计算一个给定值相对于最大值的比率，然后将这个比率给定一个常数。如：
        <img src="bar.gif" height="10" width="{% widthratio this_value max_value 100 %}" />
        如果 this_value 是 175，而 max_value 是 200, 这图片的宽度会是 88 pixels (因为 175/200 = 0.875; 0.875 * 100 = 87.5,四舍五入到 88).




附录F：
2.内建过滤器参考

  add
    参数与被处理数据相加的结果.
    例如: {{ value|add:"5" }}   # 可返回数值相加的结果；也可返回字符串相加的结果。

  addslashes
    给特殊字符添加斜线(转义). 举例,要将一个字符串传递给 JavaScript 时。
    例如:  {{ string|addslashes }}

  capfirst
    将字符串的首字母大写
    例如:  {{ string|capfirst }}

  center
    在一个给定的长度让字符串居中
    例如:  {{ string|center:"50" }}

  cut
    把给定字符串中包含的所有参数值删除掉。
    例如:  {{ string|cut:"spam" }}

  date
    把一个date类型按照给定的格式输出（与”now”标签用法一样）。
    例如:  {{ value|date:"F j, Y" }}

  default
    如果变量不存在，使用默认值；实际上是变量为任何逻辑非的时候都显示默认值，如'', 0, False 等都显示默认值
    例如:  {{ value|default:"(N/A)" }}

  default_if_none
    如果变量值为 None, 使用默认值；比 default 过滤器更严格，仅当变量为 None 时才显示默认值。
    例如:  {{ value|default_if_none:"(N/A)" }}

  dictsort
    接受一个字典列表,返回按给定参数的属性排序后的列表.
    例如:  {{ list|dictsort:"foo" }}

  dictsortreversed
    接受一个字典列表,返回按给定参数的属性逆序排序后的列表
    例子: {{ list|dictsortreversed:"foo" }}

  divisibleby
    如果值能够被给定的参数整除的话，返回“True”。
    例如:
        {% if value|divisibleby:"2" %}  # value 需要是一个可以 int(value) 为数值的变量,否则出错
            Even!
        {% else %}
            Odd!
        {% endif %}

  escape
    按照以下的规则，转义一个HTML字符串：
        "&" to "&amp;"
        < to "&lt;"
        > to "&gt;"
        '"' (double quote) to '&quot;'
        "'" (single quote) to '&#39;'
    例如:  {{ string|escape }}


  filesizeformat
    将值格式化为 ‘可读性好的’ 文件大小(比如 ‘13 KB’, ‘4.1 MB’, ‘102bytes’ 等等).
    例如: {{ value|filesizeformat }}


  first
    返回列表中的第一个元素.
    例如:  {{ list|first }}

  fix_ampersands
    将 & 符号替换为 &amp;
    例如:  {{ string|fix_ampersands }}


  floatformat
    默认时将一个浮点数四舍五入到小数点后1位 ——如果根本没有小数,小数部分不会显示；即默认参数是“-1”
      36.123 转成 36.1；   36.15 转成 36.2；    36 转成 36

    使用正整数参数时，会使用零来补足小数：
      {{ value|floatformat:"3" }}  输出的结果是: 36.1234 转成 36.123；   36 转成 36.000
    使用负整数做参数时，没有小数则不显示小数：
      {{ value|floatformat:"-3" }}  输出的结果是: 36.1234 转成 36.123；   36 转成 36
      {{ 6.00|floatformat:-3 }}   输出的结果是: 6

    例如:  {{ value|floatformat }}  {{ value|floatformat:"2" }}


  get_digit
    提供一个完整的数, 返回该数中被请求的数字,其中 1 是最右边的数, 2 是从右边数第二个数字等等.
    若输入值非法(若输入或参数不是整数, 或者参数小于1)则返回其原始值. 否则输出就总是整数. 必须有参数，否则报错。

    例如:
        {{ 6.01|get_digit:'1' }}   显示: 6
        {{ 601|get_digit:2 }}      显示: 0
        {{ 601.3|get_digit:1 }}    显示: 1
        {{ 601|get_digit:0 }}      显示: 601

  join
    用一个字符串将一个列表连接起来,类似 Python 的 str.join(list).
    例子:
        value = [1,2,3] 时,  {{ value|join:", " }}  显示为: 1, 2, 3
        {{ 'abc'|join:", " }}  显示为:  a, b, c

  length
    返回对象的长度
    例子:
        value = [1,2,3] 时,  {{ value|length }}  显示为: 3
        {{ 'abcd'|length }}  显示为:  4


  length_is
    若值的长度与参数相等,返回 True, 否则返回 False.
    例子:
        {% if list|length_is:"3" %}
            ...
        {% endif %}


  linebreaks
    把换行符转换成<p>和<br />标签。
    例子:
        {{ 'abc'|linebreaks }}  显示为: <p>abc</p>
        若 value = 'fg\nfsd'  则 {{ value|linebreaks }}  显示为:  <p>fg<br />fsd</p>


  linebreaksbr
    把每个换行转换为<br />标签
    例子: 若 value = 'fg\nfsd'  则 {{ value|linebreaks }}  显示为:  fg<br />fsd


  linenumbers
    带行号显示文本
        例子:  value = 'fg\nfsd'  则 {{ value|linenumbers }}  显示为:  1. fg 2. fsd


  ljust
    在给定宽度的域内将文本左对齐.
    例子: {{ string|ljust:"50" }}


  lower
    把一个给定的字符串转换成小写。
    例子: {{ string|lower }}


  make_list
    将值转化为一个列表.对一个整数,它是一个数字的列表.对一个字符串,这是一个字符的列表(实际上，数字也会被当成字符串处理)
    例子:
        {% for i in 56789.21|make_list %}
            {{ i }}<br/>
        {% endfor %}
        显示出: 5<br/>6<br/>7<br/>8<br/>9<br/>.<br/>2<br/>1<br/>


  phone2numeric
    将一个电话号码(可能包含字母)转化等价的数字值.比如: ‘800-COLLECT’ 将被转化为 ‘800-2655328’.
    输入不一定非是一个合法号码. 它可以转化任意字符串.(字母的转换没什么规律)
    例子:
        {{ string|phone2numeric }}


  pluralize
    如果值不是 1 的话返回 's' 用于 '1 vote' vs. '2 votes' 这种场合

    例子:
        The list has {{ list|length }} item{{ list|pluralize }}.
        如果 list 的 length 是0或者1，则 {{ list|pluralize }} 返回空， length 是2或以上，则返回's'

        The list has item{{ 1|pluralize }}.  可以直接用于数字，当数字比2小,则不返回任何内容
        The list has item{{ '2'|pluralize }}.  当数字大于等于2时,则返回's'
        The list has item{{ '2'|pluralize:"es" }}.  当数字大于等于2时,则返回指定的内容，如'es'
        The list has item{{ '1'|pluralize:"y,ies" }}.  当数字比2小时,则返回指定的内容的第一个，如'y'
        The list has item{{ '2'|pluralize:"y,ies" }}.  当数字大于等于2时,则返回指定的内容的第二个，如'ies'


  pprint
    pprint.pprint 和一个封装器 ——仅用于调试.
    例子:
        {{ object|pprint }}
        now = datetime.datetime.now()  {{ now|pprint }} 显示: datetime.datetime(2011, 5, 5, 17, 6, 25, 838000)


  random
    返回随机的从列表中返回一个元素
    例子:
        {{ list|random }}


  removetags
    从输出中删除单空格分隔的 [X]HTML标签 列表
    例子:
        {{ string|removetags:"br p div" }}


  rjust
    在给定宽度的域内将文本右对齐.
    例子:
        {{ string|rjust:"50" }}


  safe
    不转码输出，页面会自动进行html转码来输出，如果需要输出html内容则需要用
        {{ page.html|safe }} # 让内容原样输出到页面上，比如有“<div>”这样的内容，直接输出会是“&lt;div&gt;”


  slice
    返回一个列表的片段
    例子:
        {{ some_list|slice:":2" }}


  slugify
    转化为小写, 移去非单词字符(字母数字和下划线),将空白转化为连字符,去除前后空白.
    例子:
        {{ string|slugify }}


  stringformat
    根据给定参数(一个格式字符串)格式化一个变量, 这个格式字符串使用 Python 字符串格式化语法, 例外之处是 “%” 运算符被省略.
    例子:
        {{ number|stringformat:"02i" }}


  striptags
    过滤掉[X]HTML标签.
    例子: {{ string|striptags }}


  time
    按指定的样式（样式定义同now标签）来格式化一个时间对象。日期格式参考内建标签的 now
    例子: {{ value|time:"P" }}


  timesince
    格式化一个日期,这个日期是从给定日期到现在的天数和小时数(比如: “4 days, 6 hours”).

    接受一个可选的参数，该参数是一个包含比较日期的变量（该参数默认值是 now).
    举例来说， 如果 blog_date 是一个日期实例表示 2006-06-01 午夜， 而 comment_date 是一个日期实例表示 2006-06-01 早上8点，那么 {{ comment_date|timesince:blog_date }} 将返回 “8 hours”.

    例子:
        now1 = datetime.datetime(2005, 3, 11)
        now2 = datetime.datetime(2005, 2, 16)
        {{ now2|timesince }}         显示如: 6 years, 2 months
        {{ now2|timesince:now1 }}    显示: 3 weeks, 2 days
        {{ now1|timesince:now2 }}    显示: 0 minutes


  timeuntil
    类似 timesince, 只是它比较当前时间直到给定日期时间。举例来说，如果今天是 2006-06-01 而 conference_date 是 2006-06-29, 那么 {{ conference_date|timeuntil }} 将返回 “28 days”.
    接受一个可选的参数，该参数是一个包含比较日期的变量（该参数默认值是 now). 举例来说， 如果 from_date 是一个日期实例表示 2006-06-22， 那么 {{ conference_date|timeuntil:from_date }} 会返回 “7 days”.

    例子:
        now1 = datetime.datetime(2005, 3, 11)
        now2 = datetime.datetime(2005, 2, 16)
        {{ now1|timeuntil:now2 }}  显示: 3 weeks, 2 days
        {{ now2|timeuntil:now1 }}  显示: 0 minutes


  title
    按标题格式转化一个字符串
    例子:    {{ string|titlecase }}


  truncatewords
    将一个字符串截短为指定数目的单词.(是按单词数量来截取，不是字母数量；中文不算)
    例子:    {{ string|truncatewords:"15" }}


  truncatewords_html
    例子:    {{ string|truncatewords_html:"15" }}
    类似 truncatewords, 只是忽略 html 标签
    Similar to truncatewords , except that it is aware of HTML tags. Any tags that are opened in the string and not closed before the truncation point are closed immediately after the truncation.
    This is less efficient than truncatewords , so it should be used only when it is being passed HTML text.


  unordered_list
    递归的接受一个自嵌套的列表并返回一个HTML无序列表(此列表可不是pythob语义中的列表) — 只是没有开始和结束的<ul>标签

    例子:
        如果 list = ['States', [['Kansas', [['Lawrence', []], ['Topeka', []]]], ['Illinois', []]]]
        那么
        <ul>
            {{ list|unordered_list }}
        </ul>
        就会返回:
        <ul>
            <li>States
            <ul>
                    <li>Kansas
                    <ul>
                            <li>Lawrence</li>
                            <li>Topeka</li>
                    </ul>
                    </li>
                    <li>Illinois</li>
            </ul>
            </li>
        </ul>


  upper
    将一个字符串全部字母改为大写。
    例子：    {{ string|upper }}


  urlencode
    转义该值以用于 URL.(会把中文、冒号、问号等转成 URL 编码)
    例子：  <a href="{{ link|urlencode }}">linkage</a>


  urlize
    将URLs由纯文本变为可点击的链接。
    例子：  {{ string|urlize }}
        {{ "hahah http://localhost/ ddddddddddddddddd"|urlize }}
        显示成: hahah <a href="http://localhost/" rel="nofollow">http://localhost/</a> ddddddddddddddddd


  urlizetrunc
    将URLs变为可点击的链接，按给定字母限截短URLs。
    例子：  {{ string|urlizetrunc:"30" }}
        {{ "hahah http://localhost/ ddddddddddddddddd"|urlizetrunc:"15" }}
        显示成: hahah <a href="http://localhost/" rel="nofollow">http://local...</a> ddddddddddddddddd


  wordcount
    返回单词数。(是单词的数量，不是字母数量)
    例如：  {{ string|wordcount }}
        {{ "hahah http://localhost/ ddddddddddddddddd"|wordcount }}  显示: 3


  wordwrap
    在指定长度将文字换行。
    例如：  {{ string|wordwrap:"75" }}
        {{ "hahah http://localhost/ ddddddddddddddddd"|wordwrap:3 }}
        显示:
    hahah
    http://localhost/
    ddddddddddddddddd


  yesno
    提供一个字符串参数对应着 true, false 和 (可选的) None, 根据被处理的值返回相应的字符串:
    例如：    {{ boolean|yesno:"Yes,No,Perhaps" }}

    yesno过滤器示例
    值       参数            输出
    True   "yeah,no,maybe"   yeah
    False  "yeah,no,maybe"   no
    None   "yeah,no,maybe"   maybe
    None   "yeah,no" "no"    (如果不存在 None 的映射，将 None 变为 False)




使用PyAmf来实现Flex与Django的通信
http://developer.51cto.com/art/201008/217676.htm
http://gain-loss.org/?tag=pyamf
