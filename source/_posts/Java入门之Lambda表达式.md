---
layout: post
title: Ｊava入门之Lambda表达式
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - Lambda表达式
abbrlink: 26316
---

本文讲述了Java中的Lambda表达式的知识点

<!--more-->
### 1.基本知识
1. 语法：Java支持Lambda 表达式始于Java 8，它的出现简化了***函数式接口匿名内部类***的语法，其表达式语法如下：([参数1], [参数2], [参数3],.... [参数n])->{代码块}

```java
interface IUtil{
	abstract void iterae(String [] dates);
}
interface IAdd{
	static void add(int a,int b) {
		
		
	}
}

public class Lammba {

	static IUtil util = new IUtil(){
		public void iterae(String [] dates) {
			for (String date : dates) {
				System.out.println(date);
		}
		} 
 };
	
	static IUtil util = (dates)/*数据类型可以去掉*/->System.out.println(dates);//函数体只有一句输出可以去除大括号。
	static IAdd add = (a,b)->a+b;
			

	static IUtil util = (dates)/*数据类型可以去掉*/->{//把匿名类转换成函数，函数名是一个内部类变量
		for (String date : dates) {
			System.out.println(date);
		}
	};
 
 public static void main(String[] args) {
	 String [] names = {"小远","小王","小明"};
	 util.iterae(names);
	 System.out.println(IAdd.add(4, 6));
	 
	 
}
 
}


```

