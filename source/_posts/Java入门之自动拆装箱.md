---
layout: post
title: Ｊava入门之自动拆装箱
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 自动拆装箱
abbrlink: 25353
---
本文讲述了Java中的自动拆装箱
<!--more-->
###  基本定义
1. 作用：自动拆箱和装箱是从JDK5.0才开始有的，它方便了基本数据类型和其对应的包装类型之间的转换。
2. 定义：将一个基本数据类型的值赋给其所对应的包装类型称之为自动装箱；将一个基本数据类型包装类类型的值赋给其所对应的基本数据类型称之为自动拆箱。

```java
public class Test {

	public static void main(String[] args) {
		Integer i =100; //自动装箱
		System.out.println(i);//输出100
		int j = i; //自动拆箱
		System.out.println(j);//输出100
	}
}

```
3.使用：自动拆箱和装箱的过程由编译器自动完成：通过包装类的valueOf方法将基本数据类型包装成引用类型；通过包装类对象xxxValue方法将引用类型变为对应的基本类型。

```java
public class Test {

	public static void main(String[] args) {
		Integer i =Integer.valueOf(100);
		System.out.println(i);//输出100
		int j = i.intValue();
		System.out.println(j);//输出100
	}
}
```
###  数据的缓存
1. Java对部分经常使用的数据采用缓存技术，即第一次使用该数据则创建该数据对象并对其进行缓存，当再次使用等值对象时直接从缓存中获取，从而提高了程序执行性能。
2. == ：java中的==有两种作用：如果是基本数据类型则用于判断其值是否相等；如果为引用类型则用于判断两者的地址是否相同。
3. **包装类数据缓存**Java中只是对部分基本数据类型对应包装类的部分数据进行了缓存：
   1. byte、short、int和long所对应包装类的数据缓存范围为 -128~127（包括-128和127）；
   2. float和double所对应的包装类没有数据缓存范围；
   3. char所对应包装类的数据缓存范围为 0~127（包括0和127）；
   4. boolean所对应包装类的数据缓存为true和false；
4. 包装类中的equals（）方法：基本数据类型包装类中的equals方法用于比对相同包装类中的值是否相等，如果两者比较的包装类类型不同则返回false；

```java
public class Test {

	public static void main(String[] args) {
		Integer aInteger =128;
		Integer bInteger =128;
		System.out.println(aInteger==bInteger);//输出false![aInteger与bInteger的值超出了int对应包装类的缓存范围，所以aInteger==bInteger返回false
		System.out.println(aInteger.equals(bInteger));//输出true，两者值都是128并且都是Integer类型，所以aInteger.equals(bInteger)返回true
		Short cShort = 128;
		System.out.println(aInteger.equals(cShort));//输出false，aInteger和cShort的值都是128，但是由于两者数据类型不同，所以aInteger.equals(cShort)返回false
	}
}
```
5. 包装类中parseXXX方法：基本数据类型包装类中的parseXXX(String s)方法用于将字符串类型数据转换为相应的基本数据类型。

```java
public class Test {

	public static void main(String[] args) {
		int i = Integer.parseInt("-128"); 
		System.out.println(i);
		
		long l = Long.parseLong("127"); 
		System.out.println(l);
		
		float f = Float.parseFloat("9.99");
		System.out.println(f);
		
		boolean b = Boolean.parseBoolean("true");
		System.out.println(b);
	}
}

```
>char类型包装类Character没有相应的parseXXX方法。

