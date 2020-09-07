---
layout: post
title: Ｊava入门之抽象类
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 抽象类
abbrlink: 63030
---

本文讲述了Java中的抽象类的知识点

<!--more-->

## 1.抽象类的基本定义

1.抽象类：abstract修饰的类称为做抽象类；
2.抽象方法abstract修饰的方法叫做抽象方法，抽象方法只有声明部分，而没有具体的方法体。
3.abstract关键字：abstract可以修饰类和方法。

## 2.抽象类的特点

1）一个abstract类只关心它的子类是否具有某种功能，并不关心其自身功能的具体行为，功能的具体行为由子类负责实现。
2）抽象类不能直接被实例化，即不能用new关键字创建该抽象类的对象。
3）抽象类中可以没有abstract方法（为了强迫使用者必须通过继承来使用这个类）；但是一旦类中包含了abstract方法,则这个“类”一定是abstract类，即有抽象方法的类一定是抽象类。
4）抽象类的子类必须实现抽象类中的所有抽象方法，否则子类也必须是抽象类。
5）抽象类中的抽象方法是多态的一种表现形式。

# 3.抽象类与普通类的区别

1）抽象类前面由abstract修饰，而普通类没有。
2）抽象类不能创建对象，普通类可以创建对象。
3）抽象类中可以有抽象方法，普通类中一定没有抽象方法；

# 4.常用关键字的使用注意点

1）final不能修饰抽象类
原因：如果抽象类前面可以添加final就意味着该类无法被继承，也就意味着该抽象类中的抽象方法永远无法得到实现，也就意味着抽象类中的抽象方法是无用的。

2）抽象类中的抽象方法不能被private修饰
原因：被private修饰的方法其作用范围为本类，如果抽象类中的抽象方法被private修饰就意味着该方法永远无法被实现。

3）抽象类中的抽象方法不能被static修饰
原因：抽象类中的抽象方法如果可以被static修饰就意味着可以使用抽象类的类名来使用该方法，但是该抽象方法没有方法体，不具有使用的价值，所以Java中规定抽象类中不能包含被static修饰的静态抽象方法。
例子如
```java
//抽象父类
public abstract class Mammal {
	
	String bian="4567";//抽象类存在构造方法，但是不能用new关键字创建对象。
	public abstract void move();//没有方法体，则为抽象方法，一个类中如果有抽象方法，则该类为抽象类，但是抽象类中可以没有抽象方法。
	public void eat() {//抽象类不能有final修饰（不能被继承），抽象方法不能有private（不能被子类访问）和static（只能有抽象类名调用）修饰
		System.out.println("chifan");
	};
}
//继承抽象父类
public class Bat extends Mammal{
	String bian="2345";
	public void eat() {
		System.out.println("蝙蝠吃蚊子。。。");
	}
	
	public void move() {
		System.out.println("蝙蝠用翅膀移动。。。。");
	}//抽象父类的抽象方法必须被全部重写，否则该子类也必为抽象类
	
	public static void main(String[] args) {
	    Bat bat = new Bat();
		Mammal mammal = bat;//引用数据类型的自动转换 父类变量=子类对象，上转型对象，其不能使用子类新增属性和方法
		mammal.move();//多态，未调用前和调用时方法不同，（可有地址进行解释）（只能在重写时出现多态，引用数据类型分为编译时类型（等号左侧）和运行时类型（等号右侧） 
		System.out.println(mammal.bian);//属性无多态，方法有多态
		System.out.println(new Bat().bian);
	}
}

```







