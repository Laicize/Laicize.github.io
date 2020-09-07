---
layout: post
title: Ｊava入门之异常的处理
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 异常的处理
abbrlink: 40801
---
本文讲述了Java中的异常的处理
<!--more-->
## 1.异常的定义

1.定义：Java语言将程序运行过程中所发生的不正常严重错误称为异常，对异常的处理称为异常处理。

2.特点：它会中断正在运行的程序，正因为如此异常处理是程序设计中一个非常重要的方面，也是程序设计的一大难点。
## 2.异常的分类
分类：异常分为error（错误类，该类通常不需程序员解决）和Exception（异常，这是程序员编程的错误，需要程序员自己解决）。
**Exception的分类**：分为RuntimeException（运行时错误）和非RuntimeException（检查时错误）
四种分类的介绍：
error类：指合理的应用程序在执行过程中发生的严重问题。当程序发生这种严重错误时，通常的做法是通知用户并中止程序的执行。
RutimeException类：RuntimeException：运行时异常，即程序运行时抛出的异常。这种异常在写代码时不进行处理，Java源文件也能编译通过。 RuntimeException异常类及其下面的子类均为运行时异常。
非RuntimeException（CheckedException）：检查时异常，又称为非运行时异常，这样的异常必须在编程时进行处理，否则就会编译不通过。Exception异常类及其子类（除去RuntimeException异常类及其子类）都是检查时异常。
**常见异常**：![在这里插入图片描述](https://img-blog.csdn.net/20180929162817119?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
## 3.异常的处理
1）Java中对异常的处理有如下两种方式：
1.通过try、catch和finally关键字捕获异常；
2.通过throw或throws关键字抛出异常。
## 4.捕获异常
1.try ，catch，finally的语法：
```java
try｛
      //可能抛出异常的语句块
}catch(SomeException1 e){ // SomeException1特指某些异常 
     //当捕获到SomeException1类型的异常时执行的语句块
} catch( SomeException2 e){
     //当捕获到SomeException2类型的异常时执行的语句块
}finally｛
     //无论是否发生异常都会执行的代码
}
```
2.语法结构：try…catch…finally异常处理结构中，try语句块是必须的,  catch和finally语句块至少出现一个。
>注意：如果try语句块包含的是检查时异常，则在没有通过throws抛出该异常类的情况下，try必须和catch一起使用，当该行代码去掉或注销掉时，catch相应的异常语句块必须去掉

如下：
```java
public class Test {
	
	public static void main(String[] args){
		try {
			Class.forName("java.lang.Object");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
}
```
3. 多重catch的特点：
try语句块中的代码可能会引发多种类型的异常，当引发异常时，会按顺序查看每个 catch 语句，***并执行第一个与异常类型匹配的catch语句，其后 catch 语句被忽略***。
```java
public class TestException {

	public static void main(String[] args) {
		try {
			String[] nameArray = { "小王", "小李", "小高" };
			for (int i = 0; i < 4; i++) {
				System.out.println(nameArray[i]);
			}
		} catch (ArrayIndexOutOfBoundsException e) {// 捕获下标越界异常
			System.out.println("发生数组下标越界异常，成功捕获！");
		} catch (RuntimeException e) {// 捕获运行时异常
			System.out.println("发生运行时异常，成功捕获！");
		} catch (Exception e) {// 捕获所有异常
			System.out.println("发生异常，成功捕获！");
		}
		System.out.println("显示完毕！");
	}
}
```
4. finally关键字：
Java异常在try/catch块后加入finally块，可以确保无论是否发生异常 finally块中的代码总能被执行。
```java
public class TestException {

	public static void main(String[] args) {
		try {
			String[] nameArray = { "小王", "小李", "小高" };
			for (int i = 0; i < 4; i++) {
				System.out.println(nameArray[i]);
			}
		} catch (ArrayIndexOutOfBoundsException e) {
			System.out.println("数据下标越界，请修改程序！");
			System.out.println("调用异常对象的getMessage()方法：");
			System.out.println(e.getMessage());
			System.out.println("调用异常对象的printStackTrace()方法：");
			e.printStackTrace();
			return;// finally语句块仍然执行
			// System.exit(1);//直接退出JVM，finally语句块不再执行
		} finally {
			System.out.println("显示完毕！");
		}
		System.out.println("显示完毕！");
	}
}

```
5. final ,finally,finalize三个关键字的区别：
6. final—修饰符（关键字），修饰的类不能被继承，修饰的方法不能被重写，修饰的变量为常量。 
7. finally—在异常处理时提供 finally 块来执行任何清除操作。 
8. finalize—方法名，finalize() 方法在垃圾收集器将对象从内存中清除之前做必要的清理工作，如下代码：
```java
class Student {
 
	@Override
	protected void finalize() throws Throwable {
		super.finalize();
		System.out.println("对象从内存中清除之前执行");
	}
}
 
public class Test {
 
	public static void main(String[] args) {
		new Student();
		System.gc();//执行该代码，垃圾收集器将回收未使用的内存空间。
	}
}

```
## 5. 抛出异常
1）throw关键字：throw用于抛出***具体异常类的对象*** ，一般用于方法体中。
2）作用：当所写的代码因不满足某些条件致使程序无法运行时可以借助throw抛出一个异常对象提醒程序员。
3）注意：throw关键字一般用在方法体中，也可以用在代码块中，但如果**代码块**中抛出的异常对象是由**检查时异常**创建的，则必须使用try-catch进行处理。
```java
public class Test {

	int a = 9;
	int b = 0;
	{
		if (b == 0) {
			try {
				throw new Exception("操作失败：分母不能为0");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println(a / b);
	}

	public static void main(String[] args) {
		new Test();
	}
}

```
4)throw抛出的对象
1. 抛给自己（用try，catch捕获异常）
```java
public class Test {

	int a = 9;
	int b = 0;
	{
		if (b == 0) {
			throw new UnsupportedOperationException("操作失败：分母不能为0");
		}
		System.out.println(a / b);
	}

	public static void main(String[] args) {
		new Test();
	}
}
```
2. 抛给方法的调用者（即该方法调用时会出现异常）
```java
import javax.print.PrintException;

public class PrintUtil {

	public  static void printAge(int age) throws PrintException {//此处由于该方法使用throw抛出的是由检查时异常创建的对象并且throw后没有自行处理，所以这里必须要使用throws抛出创建该异常的异常类；此处也可以throws 
		if (age >= 150 || age <= 0) {
			throw new PrintException("打印失败，请输入0~150之间的数");
		} else {
			System.out.println("年龄为：" + age);
		}
	}
}
```
>注意：***使用throw抛出异常对象如果没有try-catch捕获该异常对象，则该抛出异常对象语句执行后其所在方法结束执行。***
```java
public class Test {

	public static void main(String[] args) {
		div(1, 0);
		System.out.println("代码2");
	}

	static void div(int a, int b){
		if(b==0){
			throw new UnsupportedOperationException("第二个参数不能为0");
		}
		System.out.println("代码1");
	}
	}

5. throws的用法：throws用于声明方法可能抛出的异常，其后为异常类，可以有多个，异常类之间用英文逗号间隔。
6. 作用：
1） 当**方法体中的throw关键字抛出由检查时异常创建的对象**时，如果该异常对象在抛出的同时已经通过try-catch进行了处理，则可以不使用throws，否则必须使用throws抛出创建该对象的异常类或其父类。
2） 所调用的方法抛出了检查时异常时，如果该方法在调用的同时已经通过try-catch进行了处理，则可以不使用throws继续上抛该异常，否则必须使用throws才能上抛该异常，此时上抛的异常类可以是调用方法时方法抛出的异常类也可以是其父类。
>注：如果**方法中的异常已经通过try-catch进行了捕获**则无需再使用throws上抛该异常了，否则即使上抛也无效，只会做无用功。
## 6.自定义异常类
做法：创建继承Exception 或其子类的自定义类；自定义异常类调用父类构造函数(通常是含有一个String类型参数的构造函数，使得错误信息能在异常类对象printStackTrace方法和getMessage方法中使用。)

```java
//这是自定义的异常
public class AgeException extends Exception{
	public AgeException (String message) {
		super(message);
	}
}
//测试自定义异常
public class Test{

	public static void main(String[] args) {
		//throw new AgeException("");//throw只能用于方法，否则用try处理
		try {
			throw new AgeException("");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```








