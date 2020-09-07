---
layout: post
title: Ｊava入门之instenceof的语法
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - instenceof语法
abbrlink: 21256
---

本文讲述了Java中的instenceof的语法的知识点

<!--more-->

## instenceof的语法

1）定义：instanceof运算符用于判断该运算符前面引用类型变量指向的对象是否是后面类，或者其子类、接口实现类创建的对象。如果是则返回true，否则返回false。
2）用法：引用类型变量 instanceof （类、抽象类或接口）。

```java

public class Test {
	public static void main(String[] args) {
		//instanceof的作用
		//1.判断前面对象是否由后面的类构造
	 String string="wangwenzhong";
		System.out.println(string instanceof String);
		
		
		//2.判断前面的对象是否由后面的类的子类构成
		System.out.println(string instanceof Object);
		//3.判断前面的对象是否由后面的接口的实现类构成
		System.out.println(string instanceof Set);
		
	}
	
```

3）作用：instanceof运算符用于强制类型转换之前检查对象的真实类型以避免类型转换异常，从而提高代码健壮性。
如下:![在这里插入图片描述](https://img-blog.csdn.net/20180923161938968?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
