---
layout: post
title: Ｊava入门之List接口
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - List接口
abbrlink: 25991
---
本文讲述了Java中的List集合
<!--more-->
### 一、概述
 1. List接口继承Collection接口；
 2. 该接口属于数据接口中的线性结构，用户可以根据元素的整数索引来访问元素；
### 二、list接口实现类
 3. ArrayList（数组线性表）
    1. List 接口的实现类。其内部基于一个大小可变数组来存储 
    2. 允许存储 null 元素
 4. LinkedList（双向链表）
    1. List 接口的链接列表实现类
     2. 允许存储 null 元素
 5. Vector（向量）
    1. 功能和ArrayList一样
    2. 线程安全
 6. Stack（栈）
     1. 表示后进先出（LIFO）的对象堆栈
###  三、List接口常用方法
##### 1. ArrayList常用方法
 1. add(Object element) 向列表的尾部添加指定的元素 
   2. size()  返回列表中的元素个数 get(int  index) 返回列表中指定位置的元素，**index从0开始 ** 
   3. add(int index, Object element)   在列表的指定位置插入指定元素
  4.  set(int i, Object element)  将索引i位置元素替换为元素element并返回被替换的元素。
  5.  clear()  从列表中移除所有元素   
  6.  isEmpty()：判断列表是否包含元素，不包含元素则返回 true，否则返回false iterator() 
   7. iterator()：返回按适当顺序在列表的元素上进行迭代的迭代器。 
   8. contains(Object o)  如果列表包含指定的元素，则返回 true。
   9. remove(int  index)  移除列表中指定位置的元素，并**返回被删元素 **
   10. remove(Object o)：移除集合中第一次出现的指定元素，移除成功返回true，否则返回false。
######  三种方法进行集合的遍历（iterator（）迭代方法的使用）

```java
public static void main(String[] args) {
	   ArrayList arrayList = new ArrayList<>();//ArrayList 为线性数组。
	    arrayList.add("Tim");//增加元素
	    arrayList.add("Jack");
	    arrayList.add(1, "Lily");//在指定位置设置元素，原有元素往后平移一个位置
        System.out.println(arrayList.get(1));
	    arrayList.set(1, "Rose");
	    boolean result = arrayList.isEmpty();
	    System.out.println(result);//判断是否为空
	    int longth = arrayList.size();//获取长度
	   
	    //三种遍历list的方法
	    //第一种方法
	    for(int i=0;i<arrayList.size();i++) {
	    	System.out.println(arrayList.get(i));
	    }
	    
	    //第二种方法
	    for (Object object : arrayList) {
			System.out.println(object);
		}
	    
	    //第三种方法
	    Iterator iterator = arrayList.iterator();
	    while(iterator.hasNext()) {
	    	System.out.println(iterator.next());
	    }
```
######  重写equals（）方法实现contains（）方法，remove方法

```java
//重写equals（）方法
class Student{
	public int age;
	public Student (int age) {
		this.age=age;
	}
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Student) {
			Student student = (Student) obj;
			return this.age == student.age;
		}
		else {
			return false;
		}
	}
}
	
	//实现对象的比较
	public static void main(String[] args) {
		List<Object> arrayList = new ArrayList<Object>();
		arrayList.add(new Student(12));
  		boolean result = arrayList.contains(new Student(12));
  		System.out.println(result);
		boolean rel = arrayList.remove(new Student(12));
		System.out.println(rel);	
	}
//输出结果为两个true，原因解释如下：集合的contents（）方法和remove（）方法会根据传入的对象调用不同的equels（）方法进行比较，存在object的equals（）和字符串的equals（）方法

//不重写equals（）方法
class Student{
	public int age;
	public Student (int age) {
		this.age=age;
	}
}

public static void main(String[] args) {
		List<Object> arrayList = new ArrayList<Object>();
		arrayList.add(new Student(12));
  		boolean result = arrayList.contains(new Student(12));
  		System.out.println(result);
		boolean rel = arrayList.remove(new Student(12));
		System.out.println(rel);	
	}
	//运行结果输出两个false。原因解释;不存在上转型对象，调用object（）的equals（）方法。比较对象的地址。
```
#####  LinkedList的方法
LinkedList除了实现List提供的抽象方法外，还增加了一些方法：

 1. void  addFirst(Object o) 将指定数据元素插入此集合的开头,原来元素（如果有）后移；
  2.  void addLast(Object o) 将指定数据元素插入此集合的结尾 
  3. Object getFirst() 返回此集合的第一个数据元素Object getFirst() 返回此集合的第一个数据元素
  4. Object getLast() 返回此集合的最后一个数据元素 
  5. Object removeFirst()移除并返回集合表的第一个数据元素。
  6.  Object removeLast() 移除并返回集合表的最后一个数据元素。
  7.  Object removeLast() 移除并返回集合表的最后一个数据元素 。
#####  ArrayList线性表与数组的区别。
1. 两者本质的区别在与长度是否可变：数组是定长有序的线性集合；线性表是任意长度的线性集合；
2. 两者添加元素的方式不同：数组使用下标：array [index]；数组线性表使用add方法：list.add(value) 
3. 两者获取元素的方式不同：数组使用下标：array [index]；数组线性表使用get方法：list.get(index) 
4. 获取长度的方式不同：数组使用length属性；数组线性表使用size()方法 ]
#####  ArrayList和LinkedList区别
1. ArrayList是基于动态数组存储的数组线性表数据结构，使用连续的内存单元存储数据元素，对元素的遍历速度较快，LinkedList在遍历集合元素方面比较慢，因为在遍历过程中需要找寻下个元素的地址；
2. LinkedList是使用指针关联的双向链表数据结构，前一个元素都记录了后一个元素的地址，后一个元素也记录了前一个元素的地址，当添加或删除数据元素时，LinkedList比较快，因为ArrayList需要移动其被添加（或删除）元素后面（最后一个除外）的全部元素.
#####  Vector与ArrayList区别
Vector是线程安全（synchronized）的，而ArrayList是非线程安全的，所以调用方法名相同的方法时，Vector对象要比ArrayList对象稍慢一些。


