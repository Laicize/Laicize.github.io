---
layout: post
title: Ｊava入门之基本数据类型及基本运算符及进制转换
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 基本数据类型及基本运算符及进制转换
abbrlink: 38050
---
本文讲述了Java中的基本数据类型及基本运算符及进制转换的知识点
<!--more-->
1.数据类型：告诉计算机系统应该分配多大内存以及将会存什么类型的数据。其分为基本数据类型和引用数据类型。
2.基本数据类型及其所占空间大小

 - Byte型数据：一个字节，8位。

 - int型数据：整型数据，4个字节，32位。

 - short型数据：短整型数据，2个字节，16位。

 - float型数据：单精度浮点数，4个字节，32位。

 - double型数据：双精度浮点数，8个字节，64位。

 - long型数据：长整型数据，8个字节，64位。


 - Boolean型数据：true和false
 - char型数据：字符型数据，两个字节，16位

 3.各种基本数据类型的注意点

 - 各种数据类型都有取值范围，莫要出现溢出现象。
 - float和double型数据，有一部分空间表示小数位，一部分表示指数位。
 - 一个汉字占用两个字节
 - 整型数据有四种表示方法分别为二进制（0b），十进制，八进制（0），十六进制（0x）。
 - char型数据的表示方法：1.用单撇号引起的字母或汉字2.用‘\u+unicode码’3.直接用unicode码数字代表相应字符。
 - Boolean型数据：true对应二进制的1，false对应二进制的0；
 - 小数默认是双精度浮点数，单精度实数需在数字后+f。
 - 精度低的数据类型会自动转化为精度高的数据类型，而精度高的数据类型转化为精度低的，则会报错，必须强制类型转化（形式：（数据类型）），数据精度会损失。
 4.常量
 数据类型前有final关键字修饰（注：常量不可二次赋值）。
 5.十进制整数转二进制用除二取余法，实数用乘二取整法。（从下往上取余数）
 6.负数的二进制表示：符号位不变，其它位按位取反，然后加一（源码——》反码——》补码），正数不变。（注：进行位运算时，必须转换为二进制形式（补码形式））。
 相关例子


```java
public class Test{
	public static void main(String [] args){
		int age = 0x0f0e;
		int AGE = 0765;
		System.out.println(age);
		System.out.println(AGE);
		int names = 0b0101010101010;
		double price = 9.9;
		double pi = 3.14e3;
		float price2 = 9.9f;
		boolean pan = true;
		System.out.println(pan);
		System.out.println(price2);
		System.out.println(price);
		System.out.println(pi);
		System.out.println(names);
		char name = '王';
		char litter0 = 'a';
		char litter1 = 97;
		char litter2 = '\u00fe';
		System.out.println(name);
		System.out.println(litter0);
		System.out.println(litter1);
		System.out.println(litter2);
		System.out.println('\r'+'，'+litter1);
		System.out.println("Hellow Word!");
		byte a =123;
		double b=a;//自动转换
		System.out.println(b);

		double c=999.9;
		int d = (int)c;
		System.out.println(c);//强制转换

		int e = 129;
		byte f = (byte)e;
		System.out.println(f);//溢出
		
	}
}
```
