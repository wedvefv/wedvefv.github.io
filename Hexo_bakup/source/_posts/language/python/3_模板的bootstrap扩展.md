---
layout: post
title: flask 第3章(bootstrap扩展模板)
category: flask
date: 2019-01-28 22:22:00

---

# 模板的bootstrap扩展

* 安装扩展包
* pip install flask-bootstrap

* 如法炮制，从flask.ext中导入Bootstrap 包含app对象生成新的对象实例，即可使用bootstrap的特性。

如果使用bootstrap那么需要先用bootstrap包含app，在用manager包含app。


* 自定一个base.html(继承自bootstrap的base.html)

```py

{% extends "bootstrap/base.html" %}

{% block title %}  {% endblock %}


{% block navbar %}
    <div class="navbar navbar-inverse" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle"
                    data-toogle="collapse" data-target=".narvar-collapse">
                    <span class="sr-only"> Toggle navigation    </span>
                    <span class="icon-bar"> </span>
                    <span class="icon-bar"> </span>
                    <span class="icon-bar"> </span>
                    <span class="icon-bar"> </span>
                </button>
                <a class="navbar-brand" href="/">Home/a>
            </div>

            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li> <a hre="/"> Home </a></li>
                </ul>
            </div>
        </div>

    </div>
{% endblock %}



<% block comment %>
    <div class="container">
        {% block page_comment %}     {% endblock %}
    </div>
<% endblock %>

```
## 自定义基类模板

```py
# 404.html

{% extends "base.html" %}
{% block title %} flask-pagenot found   {% endblock %}

{% block page_comment %}
<div class="page-header">
    <h1> Not Found. </h1>
</div>

{%endblock%}
               

```
## 整个代码文件

```py
from flask import Flask, render_template
from flask_script import Manager
from flask_bootstrap import Bootstrap

app = Flask(__name__)

bootstrap = Bootstrap(app)
manager = Manager(app)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/user/<name>')
def user(name):
    return render_template("user.html",name=name)

@app.errorhandler(404)
def page_not_found(e):
    return  render_template("404.html"), 404 

if __name__ == '__main__':
    manager.run()

```

* 运行命令 ： python hello.py  runserver --host 0.0.0.0 --d


## 链接
a标签常用的href 可以使用url_for 函数生成
url_for("index") --> /

url_for("index",_external=True) --> 绝对路径


url_for("index", page=2 ) 返回？/page=2

静态文件生成链接
url_for('static', filename='css/styles.css', _external=True)
返回 http://localhost:5000/statics/css/style.css


## flask-moment组件本地化时间和日期

* pip install flask-moment

```py

{% extends "base.html" %}

{% block page_content %}
<h1> hello world!</h1>
<p> local date and time is {{ moment(current_time).format('LLL')}}. </p>
<p> that was {{ moment(current_time).fromNow(refresh=True) }}. </p>

{% endblock %}

```






