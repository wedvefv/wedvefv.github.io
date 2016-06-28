---
layout: post
title: windows_c++虚函数实现运行时的多态
category: C++
date: 2016-06-28 21:35:00
---
# 虚函数实现多态


1.定义一个父类CFigure：含有一个虚函数，计算面积

分别重写三个子类，重新定义父类中的虚函数。

2. main函数，定一个父类指针，用来指向子类的实例地址，
通过父类指针->虚函数，一个父类指针根据指向的具体实例
从而调用子类中重新定义的虚函数

## 代码如下：
···cpp
#include<iostream>
using namespace std;
class CFigure												//基类-图形类
{
	protected:
		double x,y;												//成员变量
	public:
		void SetDim(double i,double j=0.0)						//设置图形参数
		{
			x=i;
			y=j;
		}
		virtual void GetShowArea()								//虚函数计算显示面积
		{
			cout<<"无法计算面积\n";
		}
};
class CTriangle:public CFigure									//三角形类
{
	public:
		void GetShowArea()												//覆盖虚函数
		{
			cout<<"三角形：底边长："<<x<<" 高："<<y<<" 面积："<<x*0.5*y<<endl;
		}
};
class CRect:public CFigure											//矩形类
{
	public:
		void GetShowArea()												//覆盖虚函数
		{
			cout<<"矩形：长： "<<x<<" 宽： "<<y<<" 面积："<<x*y<<endl;
		}
};
class CCircle:public CFigure											//圆形类
{
	public:
		void GetShowArea()												//覆盖虚函数
		{
			cout<<"圆形：半径："<<x<<" 面积："<<3.14159*x*x<<endl;
		}
};

int main()
{
	cout<<"使用虚函数实现运行时多态"<<endl;
	CFigure *figure;
	CTriangle triangle;													//三角形类对象
	CRect rect;													//矩形类对象
	CCircle circle;													//圆形类对象
	figure=&triangle;
	figure->SetDim(8.0,5.0);											//设置三角形的参数
	figure->GetShowArea();												//计算显示三角形的面积
	figure=&rect;
	figure->SetDim(10.0,5.0);											//设置矩形的参数
	figure->GetShowArea();												//计算显示矩形的面积
	figure=&circle;
	figure->SetDim(10.0);											//设置圆形的参数
	figure->GetShowArea();												//计算显示圆形的面积
	return 0;
}

···

