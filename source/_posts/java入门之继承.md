---
layout: post
title: Ｊava入门之继承
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 继承
abbrlink: 48597
---

本文讲述了Java中的继承的知识点

<!--more-->

## 继承 ##

1、继承：继承是面向对象编程的三大特征之一，是一种基于已有类来创建新类的机制。由继承而得到的类称为子类（或派生类）,被继承的类称为父类（或超类）。（注：Object类是所有类的直接父类或间接父类。）
2、构成：Java中每个类只允许有一个父类。语法如下：class <子类> extends <父类>
3、作用：根据访问权限修饰符的不同，子类可以继承父类中某些成员变量和方法，提高了代码的重用性，子类也可以添加新的成员变量和方法 。
4、注意点：如果类被final修饰，则该类不能被继承。（注：Java中已有的类（诸如Void、String、Class、Scanner、System、8种基本数据类型对应包装类等类）已经被final修饰，所以这些类不能被继承）
5、调用父类无参构造方法的条件：

 - 父类拥有无参构造方法（无论隐式的还是显式的）
 - 子类中的构造方法又没有明确指定调用父类的哪个构造方法。
 - 子类中没有调用该子类其它构造方法的构造方法使用super()隐式调用父类的无参构造方法（注，即在构造方法中用this（）调用另一个构造函数）

 6、父类无无参函数时的情况
 如果父类没有无参构造方法（无论隐式的还是显式的），则要求子类构造方法必须直接或间接指定调用父类哪个构造方法并且放在有效代码第一行。（注：一句话：子类必须调用父类的构造方法。）


```java
//子类
class Father {
	public Father() {
		System.out.println("father");
	}
	
	public Father(String iD, String name, int age) {
		super();
		ID = iD;
		this.name = name;
		this.age = age;
	}
public class Sun extends Father {
	public Sun() {
			//super()如果父类拥有无参构造方法（无论隐式的还是显式的）且子类中的构造方法又没有明确指定调用父类的哪个构造方法，则子类中没有调用该子类其它构造方法的构造方法使用super()隐式调用父类的无参构造方法
			System.out.println("Sun");
		}
	
		public Sun(String iD,String name, int age) {
			super(iD, name, age);//必须调用父类的构造方法，如果父类没有无参构造方法（无论隐式的还是显式的），则要求子类构造方法必须直接或间接指定调用父类哪个构造方法并且放在有效代码第一行
		}
		
		public Sun(String studentId) {
			this("22345","xiaowang",76);
			this.studentId=studentId;
		}
		
		
		public static void main(String[] args) {
			Sun student = new Sun ("345677");//当子类没有确定调用父类那个构造方法时，默认用无参构造方法
			
			
			System.out.println(student.ID);
			System.out.println(student.name);
			
			
		}
		
		
		public static void main(String[] args) {
			new Sun();
		}
	}
```

 7、继承成员变量的关系：
1. 当子类成员变量和父类成员变量同名时，对子类对象来讲，父类的成员变量不能被子类继承（即子类的成员变量覆盖了父类的成员变量），此时称子类的成员变量隐藏了父类的成员变量。
 2.如果要在**子类非static修饰的代码块或方法**中使用被隐藏的父类成员变量可以通过super关键字实现。

```java
//父类
 class Father {
	String ID;
	String name ="xiaowang";
	}
//子类
public class Sun extends Father {//继承实现代码复用，根据访问权限修饰符决定继承那些权限和方法，有fanal修饰的类不能被继承
	String studentId;//Class,System,Scanner,String,Void,8种基本数据类型都被final修饰，object是所有类的直接或间接父类
	
	String name= "xiaoli";
	
	{
		System.out.println(name);//变量重名，使用本类定义的变量
		System.out.println(super.name);//用super调用父类的变量，且不能用于static中
	}
}
```

