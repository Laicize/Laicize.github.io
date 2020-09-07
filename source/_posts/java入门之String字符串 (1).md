---
layout: post
title: Ｊava入门之String字符串
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - String字符串
abbrlink: 29490
---

本文讲述了Java中的String字符串的知识点

<!--more-->

## String字符串 ##

1、String类型变量：String是引用数据类型。（注：java中没有字符串变量，但是有String类，且该类型是不可变字符串）
附加：string中的参数传递
```java
public class StringTest {	
		public static void main(String[] args) {
			String name = "Tim";
			test(name);
			System.out.println(name);// String是引用类型，但为什么不是Lucy
		}
	
		public static void test(String str) {
			str = "Lucy";//有后面的堆中空间确定向，即将堆中Lucy的地址指向str
		}
```

2、String类型对象的两种实例化方式：
 - 直接赋值，其语法格式如下：
 ![这里写图片描述](https://img-blog.csdn.net/20180829100347211?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
 - 构造方法实现其实例化，其语法格式如下：
![这里写图片描述](https://img-blog.csdn.net/20180829100436256?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
或者：String str = new String（“张三”）；
3、两种实例化方式的区别：
直接赋值法：会在常量池中开辟空间存放变量值，在将变量赋予另一个string对象变量时，jvm会先检查常量池中是否有该变量值，若有则不再开辟空间存放变量，而让新变量指向已有变量值。实现常量池中常量共享。
构造方法实例化：每new一次（构造一个变量），则会在堆中开辟出一个新空间，该变量指向堆中的空间，而堆中变量值指向常量池中的string的常量。（也会实现常量池中字符串共享）
4、String类的常用方法：
1、str.length（）：返回str这个String变量的字符串长度。
2、startsWith(String value) 判断字符串是否以value字符串开头，如果是返回true，否则返回false。
3、endsWith(String value) 判断字符串是否以value字符串结尾，如果是返回true，否则返回false。
4、equals(String targetString) 用于判断两个字符串是否相同，完全相同返回true，否则返回false。（注：equals与==在字符串变量方面的区别，==会比较比较双方的地址，若相同则返回true，否则false，而equals方法则比较字符串内容是否相等）
5、toCharArray() 将字符串转换为char类型的数组。
6、String的切片和索引方法：
![这里写图片描述](https://img-blog.csdn.net/20180829103401592?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



```