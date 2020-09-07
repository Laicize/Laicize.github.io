---
layout: post
title: Ｊava入门之接口
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 接口
abbrlink: 47531
---

本文讲述了Java中的接口的知识点

<!--more-->

﻿## 1.接口的基本知识

1.接口的定义：Java接口是抽象方法的集合。
2.接口的基本语法：
访问权限控制符 interface 接口名 [extends  接口列表] {
​    常量;
​    抽象方法；
​    内部类；
}

    public interface IIMammal {
    double PI =3.14;
     void eat();
     }


## 2.接口的特点

1.接口内只能包含抽象类，静态常量（public static final），内部类。
2.接口内的抽象方法必须为public访问权限。
3.接口没有构造方法，不能创建自己的对象，但是可以引用实现类的对象。
##3.接口的继承及特点
1.继承：通过extends关键字可以使自定义的接口实现继承。
2.特点：接口只能继承父接口，不能继承抽象类和普通类。
3.使用：接口弥补了Java单一继承的缺点(Java中的类只能继承一个父类)，即接口可以继承多个父接口，它们之间用英文逗号隔开。

      public interface IMammal extends List,Set{//接口可以继承多个接口
          double PI =3.14;//接口中的属性必为public static final型属性（在不同包的static方法中调用，不能二次赋值）
          public abstract void eat();//jdk7以前接口只存在抽象方法，jdk8可以存在静态方法，
          void move();//接口中的方法可以省略public abstract，但是只为public型
    }

## 4.接口的实现

1）类通过implements关键字实现接口，Java中的类只能是单继承，但却可以实现多个接口以弥补Java类单继承的不足。
2）语法：访问控制符  修饰符  class  类名  implements  接口1  [,接口2, ……] {
​		变量;
​		方法;
​	}
>注：在类中实现接口时，实现类中方法的名字、返回值类型、参数的个数及参数数据类型必须与接口中的对应的抽象方法完全一致。（重写）

## 5.接口实现的特点

1.如果一个类实现了一个接口，但没有实现接口中的所有抽象方法，那么这个类必须是abstract类。
2.如果多个接口中定义了相同的抽象方法，则在实现类中只实现其中一个即可。

## 6.接口回调

接口回调描述的是一种现象：接口声明的变量指向其实现类实例化的对象，那么该接口变量就可以调用接口中的抽象方法。

## 7.接口实现类的特点

1）接口实现类可以直接使用接口中的常量。
2）接口实现类所实现的多个接口中有常量名相同的常量，则在实现类中不能直接使用，必须使用类名来确定到底调用哪个接口中的常量。  

```java
     public interface IIMammal {//父类接口
        double PI =3.14;
        void eat();
        }


	 public interface IMammal{//抽象父类
	    double PI = 4.35;
	    public default void eat() {
		
	    }
	//2.接口中可以有static静态方法
	    public static void move() {//java8及以上版本的特性
		
	    }
	public  class  Whale implements IMammal,IIMammal {
	    public void move() {
	
		    System.out.println("鲸鱼用鳍游泳。。。");
	    }
	    public void eat() {
		//接口回调是接口中的多态
		
	    }
	    public void mian() {
		
		    IMammal mammal=new Whale();
		    mammal.eat();//接口回调
		    //实现类可以直接调用接口中的全局常量
		    System.out.println(IMammal.PI);//当多个接口的实现类，多个接口中有变量名相同的变量，在实现类中调用接口常量时，需指明哪一个接口中的变量。
		
	    }
	}
```
## 8.java8后接口的语法变化

1）Java8以前版本中规定，接口中所定义的方法只能是抽象方法，从Java8开始，接口中可以添加一个或多个由default关键字修饰的非抽象方法，该方法又称为扩展方法，该默认方法将由接口实现类创建的对象来调用。
2）同样，从Java8开始，接口中可以添加一个或多个由static关键字修饰的非抽象方法，该方法将由接口或其实现类直接调用。

