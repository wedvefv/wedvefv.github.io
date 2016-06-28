---
layout: post
title: c++运算符重载
category: C++
date: 2016-06-28 14:35:58
comments: true
---

## 运算符重载，实现的是编译时多态。

## 虚函数重载，实现的是运行时多态。

## 实例展示复数的加法，重载了+号运算符

定义一个类：
```cpp
class CComplex{
	double m_real,m_imag;
	public:
	CComplex(double r=0, double i=0):m_real(r),m_imag(i){
	}
	double GetReal(){
		return m_real;
	}
	double GetImag(){
		return m_imag;
	}
	CComplex operator +(CComplex&); //对象引用&
	CComplex operator +(double);
}
```
1.定义实部和虚部，都是浮点型的。
2.构造函数，参数用来初始化对象的两个成员,m_real 和m_imag
3.两个成员函数。
4.两个函数名都是operator +的成员函数，参数不一样

## 下面实现这两个operator +函数：
```cpp
CComplex CComplex::operator +(CComplex &c) //实现复数和复数相加
{
	CComplex temp;
	temp.m_fReal = m_fReal+c.m_fReal;
	temp.m_fImag = m_fImag+c.m_fImag;
	return temp;
}
CComplex CComplex::operator +(double) //实现复数和实数相加
{
	CComplex temp;
	temp.m_fReal = m_fReal+d;
	temp.m_fImag = m_fImag;
	return temp;
}
```

## main函数实现尝试一下吧：
```cpp
int main(){

	CComplex c1(2.3,5.5),c2(3.6,6.8),c3;//复数类对象
	cout << "使用重载的+运算符实现复数与复数的相加" << endl;
	cout << "C1 = " << c1.GetReal() << "+j" << c1.GetImag() << endl;
	cout << "C2 = " << c2.GetReal() << "+j" << c2.GetImag() << endl;
	c3 = c1+c2;
	cout << "C3 = C1 + C2 =" << c3.GetReal() << "+j" << c3.GetImag() << endl;
	cout << "使用重载的+运算符实现复数与实数的相加" << endl;
	c3 = c3+6.5;
	cout << "C3 + 6.5 = " << c3.GetReal() << "+j" << c3.GetImag() << endl;

	return 0;
}
```

##其实重载运算符就是把operator当作函数名，重新定义一下。
