---
layout: post
title: c++的函数模板
category: C++
date: 2016-06-29 12:38:59
comments: true
---

# 使用函数模板

```cpp
#include <iostream>
#include <string>
using	namespace std;
template <class T>
{

	if(a<b)
		b = a;
	return b<c?b:c;
}

int main()
{

	cout<<使用模板函数求不同类型的数据最小值：<<endl;
	int i1 = 2, i2 = 6 ,i3 = 4;
	double d1 = 3.4, d2 = 7.2, d3 = 3.39;
	string str1("one") , str2("second"),str3("three");

	cout <<"int 类型"<<i1<<","<<i2<<","<<i3<<"最小值:"<<endl;
	cout <<"double类型"<<d1<<","<<d2<<","<<d3<<"最小值"<<endl;
	cout <<"str类型"<<str1<<","<<str2<<","<<str3<<"最小值"<<endl;
	return 0;
}

```
