---
layout: post
title: c++格式化I/O
category: C++
date: 2016-06-29 12:55:59
comments: true
---

# 使用函数模板

```cpp
#include <iostream>
#include <iomanip>
using namepsace std;
int main()
{
	char bookname[100],double price ,int counts;
	cout<<"请输入书名："<<endl;
	cin>>bookname;
	cout<<"请输入单价："<<endl;
	cin>>price;
	cout<<"请输入销售数量："<<endl;

	cout<<"使用标志和成员函数进行格式化输出："<<endl;
	cout<<"《"<<bookname<< "》：";

	cout.width(5);
	cout.fill('*');
	cout<<price <<"单价";
	cout.self(ios::scientific);
	cout.precision(3);
	cout<<price*counts<<"销售额";
	cout.self(ios::showpos|ios::left);
	cout<<counts<<"销售数量："<<endl;
	return 0;
}

```
