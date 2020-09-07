---
layout: post
title: Ｊava入门之数组
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 数组
abbrlink: 44348
---

本文讲述了Java中的数组的知识点

<!--more-->

## ﻿一：基本概念
数组：数组是相同数据类型的数据按顺序组成的一种引用数据类型。
数组是一种引用类型数据，其空间是在内存中的堆中，通过地址传递，在栈中对其操作。
## 二：声明及实例化
实例化：声明数组仅仅给出了元素的数据类型和数组名字，要使用数组就必须为它分配内存空间，即实例化数组。当实例化一个数组时就申请了一段连续的内存空间存储数组中的元素。

```java
//声明一维数组和二维数组
double [] scores;//不分配空间
String [][] acconts;
```

```java
//实例化（分配空间）
		//1 指定长度
		double [] scores=new double[2];//分配空间并初始化为0；
		String [] acconts=new String [3][2];
		//赋值
		double [] scores = new double [2];
		scores[0]=2;
		scores[1]=1;
		
		//2 初始化
		double [] scores= {3.4,2.6};//只能在初始化的时候用这种方法
		double [] scores = new double[] {3.4,4.3};//可以先声明，再初始化
		eg：/*
		 * double [] scores;
		 * 	scores=new double[] {3.4,4.3};	
		 */
```
注：数组存在隐形数据转换，即输入数据精度小于数组规定类型精度时，在存储时类型会自动转换为数组声明时规定的类型。
## 三：数组的遍历
1.数组中的数据通过数组名和数组下标来操作数据，下标从0开始
第一种遍历方式：加强循环

```java
//加强循环
		double [] scores= {3.4,2.6};//一维数组的加强循环
		for(double score:scores) {
			System.out.println(score);
		}


		//二维数组的加强循环
		String [][]acconts = new String[][] {{"王二","12345"},{"李四","45678"}};

		for(String [] accont:acconts) {
			for(String str:accont){
				System.out.print(str+"\t");//默认格式不换行
		}
			System.out.println();//默认输出格式为换行
		}
```
第二种遍历方式：普通循环

```java
//一维数组的普通循环遍历
double [] scores = new double [3];		
scores[0]=2;
scores[1]=1;
scores[2]=6;
for(int i=0;i<3;i++) {
		System.out.println(scores[i]);
		}
//二维数组的普通循环遍历
String [][]acconts = new String[][] {{"王二","12345"},{"李四","45678"}};
for (int i = 0; i < acconts.length; i++) {
			String [] accont = acconts[i];
			for (int j = 0; j < accont.length; j++) {
				System.out.print(accont[j]+"\t");
			}
			System.out.println();
	}

for (int i = 0; i < acconts.length; i++) {
		for (int j = 0; j < acconts[i].length; j++) {
			System.out.print(acconts[i][j]+"\t");
		}
		System.out.println();
		}
```
## 四：值传递与引用传递
值传递：值传递是指在调用函数时将实际参数 复制 一份传递到函数中，这样在函数中如果对 参数 进行修改，将不会影响到实际参数。
引用传递：引用传递是指在调用函数时将实际参数的地址 直接 传递到函数中，那么在函数中对 参数 所进行的修改，将影响到实际参数。