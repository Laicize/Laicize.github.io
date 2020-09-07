---
layout: post
title: Ｊava入门之代码块和全局变量
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 代码块和全局变量
abbrlink: 6716
---

本文讲述了Java中的代码块和全局变量的知识点

<!--more-->

## 一、代码块 ##

1、代码块：Java中代码块分为静态代码块和非静态代码块。
2、特点：静态代码块只在类加载时执行一次；静态代码块每次创建对象时都会执行。

```java
	{
		System.out.println(age);
	}
	static {
		System.out.println(name);
	}
```

```java
3、static修饰符：可修饰变量，代码块，方法。
public class Dui {
	static int age=1;//成员变量被static修饰，则其被所有对象共享。
	
	//非静态数码块
	{
		int age = 1;//无初始值，且不能加访问控制符和static。
		System.out.println(age);
	}
	//静态的比非静态的早执行
	static int a=2;//加载时赋初值
	
	static {//加载时执行
		System.out.println(a);
	}
	
	public static void print(int age) {//类加载时分配地址
		System.out.println(age);
	}
	
	public static void main (String[] args) {//类加载时分配地址
		System.out.println(a);
		new Dui();//静态的可以通过对象创建，使用非静态的变量。
		new Dui().prints(14);//静态的可以通过对象创建，执行非静态的方法，不能直接调用（静态的先执行）
		print(24);//静态的可以直接调用静态方法。
	}
	
	//非静态
	int b =12;//创建对象时赋初值
	{
		System.out.println(b);//创建对象时执行
	}
	
	public void prints(int age) {//创建对象时分配地址
		System.out.println(age);
		print(12);//非静态的可以直接调用静态方法
		System.out.println(a);//非静态的可以直接使用静态变量
	}
```
## 二：全局变量/局部变量 ##
 1、全局变量：直接在类中声明的变量叫成员变量(又称全局变量)。注：如果未对成员变量设置初始值，则系统会根据成员变量的类型自动分配初始值：int分配初始值0、boolean分配初始值false，而自定义类型则分配初始值null。
2、作用范围：成员变量定义后，其作用域是其所在的整个类。注：成员变量的定义没有先后顺序，但是最好将成员变量的定义集中在类的顶部。
3、局部变量：方法中的参数、方法中定义的变量和代码块中定义的变量统称为局部变量。注：局部变量在使用以前必须显式初始化或赋值，局部变量没有默认值。
注：声明局部变量时，数据类型前除final外不允许有其他关键字，即其定义格式为： [final] 数据类型 变量名 = 初始值；
4、作用范围：局部变量的作用域范围从定义的位置开始到其所在语句块结束。

```java
//局部变量,只作用于所在代码块（即一个大括号），局部变量没有初始值，从定义到所属代码块结束。
	{
		int age = 1;//无初始值，且不能加访问控制符和static。
		System.out.println(age);
	}
	
```

5注意点：
1、如果局部变量的名字与全局变量的名字相同，则在局部变量的作用范围内全局变量被隐藏，即这个全局变量在同名局部变量所在方法内暂时失效。
2、如果在局部变量的作用域范围内访问该成员变量，则必须使用关键字this来引用成员变量。

```java
	public static void print() {
		System.out.println(age);//当局部变量和全局变量重名时，（不强调数据类型），从局部变量定义到期结束作用范围，全局变量起作用，除非加上this.
		int age=9;
		System.out.println(age);
		if(age==1) {
			String names ="wangming";
			System.out.println(names);
		}
		
	}
```



 


