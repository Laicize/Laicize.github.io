---
layout: post
title: Ｊava入门之对象和类
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 对象和类
abbrlink: 13846
---

本文讲述了Java中的对象和类的知识点

<!--more-->

## 一、类 ##

类：Java语言把一组对象中相同属性和方法抽象到一个Java源文件就形成了类。
定义一个类的步骤：1、定义类名；
2、定义类的属性；
3、定义类的方法。

```
public class Student {
//定义属性
	String name;
	String id;
	String studentId;
//访问控制符（public，private）控制方法在其他类中的使用范围。创建方法
	public Object doHomework() {
		System.out.println("会做作业");
		return new Student();
		}
}

```
## 二、对象 ##
1、对象：一种具有属性和方法的数据。
2对象的创建：声通过new关键字创建对象。创建对象又称实例化对象。
​      Student  student = new Student();
 3、对象的调用： 使用”.”运算符访问对象的属性和方法。
​      student.属性 = 值；
​      student.方法名();
4、对象与类的关系：

 - 类是创建对象的模板，确定对象将会拥有的属性和方法。
 - 类是对象的抽象化；对象是类的具体化。
 - 类是一种数据类型，是对象的数据类型（不同于int等基本类型：类具有方法）

5、面向对象的思想：
就是让对象成为类与类之间的“通信”的桥梁，通过对象使类之间形成有机的整体。面向对象编程语言以对象为中心，以消息为驱动，即程序=对象+消息（指方法的调用：Java使用向方法传递参数的方式实现向方法发送信息；并通过返回值从方法中获取信息）。
6、对象的初始化：

 - 给对象的实例变量（非“常量”）分配内存空间，默认初始化成员变量；
 - 成员变量声明时的初始化；
 - 初始化块初始化（又称为构造代码块或非静态代码块）；
 - 构造方法初始化

```java
Student student = new Student（）；//分配空间，并将堆中地址返回给栈中变量student
studnet.name="jake";//给对象变量（即类中属性name）赋值
studnet.doHomework();//调用类中定义的方法
```

7、空间内存角度理解类，对象，对象变量：类提供对象的模板，在调用new关键字创建对象时即是在堆中按类的定义开辟空间，并将地址返回给对象变量。




