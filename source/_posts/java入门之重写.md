---
layout: post
title: Ｊava入门之重写
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 重写
abbrlink: 42232
---

本文讲述了Java中的重写的知识点

<!--more-->

## 重写 ##

 1、重写：子类可以继承父类方法，但有时从父类继承的方法在子类中必须进行修改以适应新类的需要，这种对父类方法进行改写或改造的现象称为方法重写或方法覆盖。父类方法在子类中重写使继承更加灵活。
2、调用：
1.子类重写了父类的方法，则使用子类创建的对象调用该方法时，调用的是重写后的方法，即子类中的方法。
2.如果要在子类非static修饰的代码块或方法中调用父类被重写的方法可以通过super关键字实现。
3、判别：@Override注解可以判断当前方法是否重写了父类的某个方法，如果在方法上加上该注解没有出错，则说明重写了父类方法，否则没有重写父类方法。
4子类重写父类方法需满足以下条件：

 - 方法名和参数列表：子类重写的方法和父类被重写的方法在方法名和参数列表方面相同；
 - 返回值类型：
 1.如果父类被重写的方法没有返回值类型或者返回值类型为基本数据类型，则要求子类重写的方法的返回值类型和父类被重写方法的返回值类型相同；


```java
//父类
class Father {
	String ID;
	String name ="xiaowang";
	int age;
	public Object eat() {
		System.out.println("使用筷子吃法");
		return "good";
	}
}
public class Sun extends Father {

	//重写，更好的体现子类的行为特征，父类有final修饰则无法重写.
	
	@Override//判断方法是否是重写的。
	//重写要求：方法名，和参数要一致，返回值为void和基本数据类型相同时，要一致，返回值为应用类型，则子类重写方法的返回值可以是父类方法返回值的子类。
		public void eat() {
		System.out.println("使用刀叉吃饭");
	}
	public static void main(String[] args) {
		Sun san = new Sun();
		san.eat();
		
	}
	
```

2.如果父类被重写的方法返回值类型为引用数据类型，**则要求子类重写的方法的返回值类型和父类被重写方法的返回值类型相同或是其子类。**

```java
//父类
class Father {
​	String ID;
​	String name ="xiaowang";
​	int age;
​	public Object eat() {
​		System.out.println("使用筷子吃法");
​		return "good";
​	}
}
//子类
public class Sun extends Father {
​	public String eat() {//String 是objict的子类，也可以相同。（参数类型和数目必须相同）
​		System.out.println("使用刀叉吃饭");//父类的静态的方法可以被继承，但不能被重写。子类的访问权限必须大于父类，子类重写的方法不能加static
​		return "well";
​	}
​	
​	
	{
		super.eat();//使用super调用父类的重写方法，super不可用于static中
	}
	public static void main(String[] args) {
		Sun san = new Sun();
		san.eat();
		
	}

}
```

 - 子类重写的方法不能缩小父类被重写方法的访问权限，子类重写方法的访问权限必须大于等于父类被重写方法的访问权限。
 - 父类中静态方法可以被子类继承，但却不能被子类重写。
 - 重写父类非静态方法时，重写后的方法不能添加static修饰。
 - 父类中被final关键字修饰的方法可以被子类继承，但却不能被子类重写。
 
 5、final关键字：
 - final修饰的类不能被继承。
 - final修饰的方法不能被重写。
 - final修饰的变量是常量，不允许二次赋值。
 
 6、super关键字：
 - super关键字可以调用父类的成员变量（ super.属性）和方法（super.父类方法([参数列表])）。
 - 子类构造方法中可以使用super关键字调用父类的构造方法：super([参数列表]);
 - super 不能用于静态方法或静态代码块中。


