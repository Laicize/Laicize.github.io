---
layout: post
title: Ｊava入门之方法和重载
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 方法和重载
abbrlink: 44760
---

本文讲述了Java中的方法和重载的知识点

<!--more-->

## 一、方法 ##

1、方法：方法用于定义类的某种行为（或功能），其语法结构如下：
访问控制符 [修饰符] 返回值类型 方法名( [参数] )  {

           方法体

}

```java
public void sayHello(){
	System.out.println("Hello");
}

protected final void show(int x){
		System.out.println(x);
}
	
private static int add(int x, int y){
	return x+y;
}
```

2、访问控制符：方法中的访问控制符用于限制方法在其他类中的使用范围。访问控制符分为四种：public、protected、友好的和private。
3、static修饰符：static修饰符用于限制方法的调用方式：
​    

 -   static修饰的方法可以直接使用类名调用也可以使用类创建的对象调用；
 - 非static修饰的方法只能使用类创建的对象调用。

4、返回值要求

 - 方法返回基本数据类型的数据，则返回值类型必须是返回数据所属的数据类型或者精度更高的数据类型（针对于数值类型的数据）。
 - 方法返回引用数据类型的数据，则返回值类型必须是返回数据所属的数据类型或者其父类。
 - 方法如果有返回值，则必须借助return关键字将数据返回；
 - 如果方法没有返回值，需要用void表示。

5、方法名要求：遵循标识符命名规则；首字母必须小写，如果由多个单词组成，从第二个单词开始首字母必须大写；方法名一般由一个动词或者动名词构成。

6、参数要求：

 - 方法可以有多个参数，各个参数之间用逗号(,)间隔。
 - 方法的参数在整个方法内有效。
 - 方法参数前面的数据类型用于限制调用方法时所传具体数据的数据类型；

```java
	public static double add() {
		int a=2;
		int b=3;
		return a+b;
	}
	
	//方法名首字母小写，第二个单词起首字母大写，（动词，动名词担任）
	public static void arr(int []scores) {
		System.out.println(scores[2]);
		for (int i : scores) {
			System.out.println(i);
		}
	}
```

7、动态参数

 - 动态参数实质为数组；
 - 动态参数必须位于参数列表的最后；
 - 一个方法只能有一个动态参数；


```
//动态参数可以当做数组来使用，有下标，数组也可以实现不定参数，但需要定义数组，而动态参数不需要。动态参数实质为数组
	public static void arr(int []scores) {
		System.out.println(scores[2]);
		for (int i : scores) {
			System.out.println(i);
		}
	}
//一个方法只能有一个动态参数，且放在最后。
public static void arr(int a,int ...scores) {
		System.out.println(a);
		System.out.println(scores[0]);
		for (int i : scores) {
			System.out.println(i);
		}
	}
```

 8、构造方法：一个类中有多个同名方法（构造方法或普通方法），在调用这些方法时，到底调用哪个方法取决于调用方法时传入的参数的数据类型和个数。
 9、构造方法的特征：

 - 构造方法负责初始化类中的实例变量。
 - 构造方法是一种特殊的方法，这种方法必须满足以下语法规则：构造方法必须与类名相同；不包含返回值类型描述部分。
 - 构造方法不能有static和final关键字修饰。


```java
//构造方法，名字与类名相同，无返回值类型，无静态修饰符，无参构造方法
	public Dui() {
		
	}
//有参构造方法，易于构造对象
public Dui(String name, int age, String position) {
		this(age);//用this（）调用同类中的构造方法。
		this.name = name;
		this.age = age;
		this.position = position;
	}
```

10、构造方法的使用：使用new关键字调用构造方法，即构造方法在创建对象（也称对象实例化）时被调用。

11、显示、隐式构造方法：

 - 创建类时，如果没有显式定义构造方法，则该类会存在一个默认的无参构造方法；
 - 可以在类中声明一个或多个有参构造方法，但每个构造方法在参数个数或参数数据类型上要有所差别。
 - 如果类中存在显式构造方法，则默认的无参构造方法将不复存在，除非显式定义无参构造方法。


```java
public Dui(String name, int age, String position) {
		this(age);//用this（）调用同类中的构造方法。
		this.name = name;
		this.age = age;
		this.position = position;
	}

public static void main(String[] args) {
		//出错Dui teacher = new Dui();//类中默认的有一个无参数构造方法，当存在有参构造方法时，无参构造方法取消
		teacher.name="chengyuanyuan";
		Dui teacher0 = new Dui ("王大兵",34,"teacher");
		Dui teacher1 = new Dui ("xiaojaing",56,"student");
		System.out.println(teacher0.name);
		System.out.println(teacher1.name);
		
```


 ## 二、重载 ##
 1、重载：同一个类中有多个方法名相同但参数列表不同的方法，这种现象称为方法重载（overload）。其中参数列表不同包括以下情形：


 - 参数的个数不同 
 - 参数的对应类型不同
 注：1、参数列表不同并不包含参数名不同，也就是说如果方法名相同，方法中参数个数和类型相同，只是参数名不同，这样也不能称之为方法重载。
    ​           2、方法中其它构成部分不参与比较：访问控制符、修饰符、返回值类型
    
 2、重载方法的调用：
 一个类中有多个同名方法（构造方法或普通方法），在调用这些方法时，到底调用哪个方法取决于调用方法时传入的参数的数据类型和个数。
 3、this关键字：
 - 类中可以有多个构造方法，构造方法之间可以通过this实现调用，但必须将调用构造函数代码写在有效代码的第一行。（普通方法不能使用this调用类中构造方法）
 - this代表对当前对象的一个引用。

 

```java
//重载,方法中其它构成部分不参与比较：访问控制符、修饰符、返回值类型,参数列表不同并不包含参数名不同，也就是说如果方法名相同，方法中参数个数和类型相同，只是参数名不同，这样也不能称之为方法重载。
	//参数列表不同并不包含参数名不同，也就是说如果方法名相同，方法中参数个数和类型相同，只是参数名不同，这样也不能称之为方法重载。

	public static void add(int a,int b) {
		System.out.println(a+b);
	}
	
	public static void add(double a,int b) {//重载2：参数个数相等，但数据类型不同
		System.out.println(a+b);
	}
	
	public static void add(int a,int b,int c) {//重载1：参数数据类型相同个数不同（1,2可以都不相同）
		System.out.println(a+b+c);
	}
	
	public static void add(int a,int b,int c,int d) {
		System.out.println(a+b+c+d);
	}
```

