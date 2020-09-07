---
layout: post
title: Ｊava入门之分支语句
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 分支语句
abbrlink: 34465
---

本文讲述了Java中的分支语句的知识点

<!--more-->

```java
public  class Try{
​	static{
​		System.out.println("天亮还珠");
​		//return 不能用于static 静态代码段，return后不能直接跟代码，case后可以用{}包括相关语句。
}
​	public static void print (){
​			System.out.println("print");
​		}


	public static void main (String[] args){
		print();
		int i=4;
		if(i==3)//if后面的判断语句必须是逻辑表达式。if 多分支语句条件满足一个既不会往下进行，而多个if单分支语句，则会足以判断
			System.out.println("代码段一");
			
		else 
			System.out.println("代码段二");
		int a=3;
		switch (a)//必为常量或常量表达式，不为long，float，double，boolean型数据
		{
			case 1:System.out.println(1);break;//也可用return结束当前方法（嵌套seitch，break直结输当前switch）
			case 2:System.out.println(2);break;
			case 3:System.out.println(3);break;
			case 4:System.out.println(4);break;
			default:System.out.println("输入数据错误");
		}
		return;
		//System.out.println("天黑投注");
		int c =3；
		if（c>0）{
			break;
			}		


	//contine和break语句可以用于if语句，但是该if语句必须属于switch语句或循环语句中，而return语句可以无条件用于if语句。
	}
}


```

```