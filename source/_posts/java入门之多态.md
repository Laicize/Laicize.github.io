---
layout: post
title: Ｊava入门之多态
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 多态
abbrlink: 45515
---
本文讲述了Java中的多态的知识点
<!--more-->

## 多态 ##

1、多态：父类类型（比如Mammal）的变量（比如mammal1）指向子类创建的对象，使用该变量调用父类中一个被子类重写的方法（比如move方法），则父类中的方法呈现出不同的行为特征，这就是多态。
2、原理：Java引用变量有两种类型，分别是**编译时类型和运行时类型**：编译时类型由声明该变量时使用的类型决定；运行时类型由实际赋给该变量的对象。如果编译时类型和运行时类型不一致，就可能出现所谓多态。
3、上转型对象：子类实例化的对象赋值给父类声明变量，则该对象称为上转型对象，这个过程称为对象上转型，对应于数据类型转换中的自动类型转换。
4、上转型对象特点：

 - 上转型对象不能操作子类新增的成员变量；不能调用子类新增的方法。
 - 上转对象调用父类方法，如果该方法已被子类重写，则表现子类重写后的行为特征，否则表现父类的行为特征。
 - 使用上转型对象调用成员变量，**无论该成员变量是否已经被子类覆盖，使用的都是父类中的成员变量。**
5、下转型对象：可以将上转型对象再强制转换为创建该对象的子类类型的对象，即将上转型对象还原为子类对象，对应于数据类型转换中的强制类型转换。
6、作用：还原后的对象又具备了子类所有属性和功能，即可以操作子类中继承或新增的成员变量，可以调用子类中继承或新增的方法。
7、注意点：不可以将父类创建的对象通过强制类型转换赋值给子类声明的变量。

```java
//父类
class Mammal {
	
	String bian="4567";
	public void move() {
		System.out.println("哺乳动物可以移动。。。。");
	}
}
//子类
public class Bat extends Mammal{
	String bian="2345";
	public void fei() {
		System.out.println("非");
	}
	
	public void move() {
		System.out.println("蝙蝠用翅膀移动。。。。");
	}
	
	public static void main(String[] args) {
		Bat bat = new Bat();
		Mammal mammal = bat;//引用数据类型的自动转换 父类变量=子类对象，上转型对象，其不能使用子类新增属性和方法
		mammal.move();//多态，未调用前和调用时方法不同，（可有地址进行解释）（只能在重写时出现多态，引用数据类型分为编译时类型（等号左侧）和运行时类型（等号右侧）
		mammal.bain;
		mammal.fei();
		
		System.out.println(mammal.bian);//属性无多态，方法有多态，只能调用父类属性
		System.out.println(new Bat().bian);
		
		Bat bat0=(Bat)mammal;//下转型变量（只适用于上转型变量，为了调用新增加的属性和方法）
		System.out.println(bat0.bian);
	}
}
```
