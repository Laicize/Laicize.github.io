---
layout: post
title: Ｊava入门之函数式接口
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 函数式接口
abbrlink: 26945
---

本文讲述了Java中的函数式接口的知识点

<!--more-->

## 1.函数式接口定义

1.定义：如果**接口**内只定义一个**抽象方法**，则该接口称为函数式接口。
2.判别：可以使用@FunctionalInterface 注解来验证一个接口是不是函数式接口，Java8中java.lang.Runnable、java.util.Comparator<T>都是函数式接口。
3.特点：函数式接口中可以定义多个常量、多个默认方法和多个静态方法，但只能定义一个抽象方法及多个java.lang.Object中的public方法。

# 2.抽象类和和接口的区别

|    空 |抽象类   |  接口|
|--|---:|--|
| 关键字 | abstract   |  interface |
|成员变量|可包含任意合法变量|只能包含公开静态常量|
|构造方法|有|无|
|方法|可包含任意合法方法（注意不能为private）|jdk7以下只包含公开抽象方法，jdk8及以上可以包含默认和静态的非抽象方法|
|如何实现抽象方法|通过自定义类继承抽象类的方法实现抽象类的抽象方法|通过自定义类implements接口中的抽象方法，可以有多个接口|
|是否存在多继承|无|有|

```java
    @FunctionalInterface
     public interface IMammal{
    	public default void eat() {
    	}
    	
    	//2.接口中可以有static静态方法
    	public static void move() {
    		
    	}
    	//3、当接口中只有一个抽象类方法时可以用函数式接口（）（也可以包括已在object类中定义的函数式接口方程。）
    	
    	void  eat(int age);
    	int hashCode();
    	int Runnable();
    	int Comparator();//函数式接口
}


