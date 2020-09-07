---
layout: post
title: Ｊava入门之集合Ｓet集合
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - Ｓet集合
  - 重写了equals()和ｈashcode()方法
abbrlink: 46194
---
本文讲述了Java中的Set集合
<!--more-->
####  概述
1. Set接口继承Collection
####  Set接口常用实现类
1.  **HashSet**  
  1. 实现了 Set 接口
  2. “它不保证 set 的迭代顺序；特别是它不保证该顺序恒久不变”(存入该实现类对象中的元素是无序的，即在遍历该集合元素时，遍历出的元素顺序未必和向集合中添加元素的顺序一致；这次遍历出来的顺序未必和上一次遍历出来的元素顺序一致)
  3. 允许使用 null 元素
2. **LinkedHashSet**
  1. HashSet的子类
  2. 由于该实现类对象维护着一个运行于所有元素的双重链接列表，由于该链接列表定义了迭代顺序，所以在遍历该实现类集合时按照元素的插入顺序进行遍历
3. **TreeSet**
  1. 既实现Set接口，同时也实现了SortedSet接口，具有排序功能
  2. 存入TreeSet中的对象元素需要实现Comparable接口.
####  Set接口常用方法
1. add(Object obj)：向Set集合中添加元素，添加成功返回true，否则返回false。
2. size() ：返回Set集合中的元素个数。
3. remove(Object  obj) ： 删除Set集合中的元素，删除成功返回true，否则返回false。
4. isEmpty() ：如果Set不包含元素，则返回 true ，否则返回false。
5. clear() ： 移除此Set中的所有元素。
6. iterator() ：返回在此Set中的元素上进行迭代的迭代器。
7. contains(Object o)：如果Set包含指定的元素，则返回 true，否则返回false。
 >  **Set集合没有提供get方法，所以对Set集合的遍历只能通过加强for循环和迭代器进行遍历**
####  Hashset的重写equals（）和hashcode（）方法
1. 重写对象：使用HashSet存储**自定义类对象**时，可以在自定义类中重写equals和hashCode方法避免“真实”对象被多次存入，主要原因是集合内不允许有重复的数据元素，在集合校验元素的有效性时（数据元素不可重复），需要调用equals和hashCode验证。
2. 原理：检查待存对象hashCode值是否与集合中已有元素对象hashCode值相同，如果hashCode不同则表示不重复， 如果hashCode相同再调用equals方法进一步检查，equals返回真表示重复，否则表示不重复。

```java
import java.util.HashMap;

import java.util.HashSet;

class Student{
	int id;
	public Student(Integer id) {
		this.id = id;
	}
	public int hashCode() {
		return id;
	}
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Student) {
			Student student = (Student) obj;
			return this.id == student.id;
		}
		else {
			return false;
		}
	}
	
}

public class Test {
	public static void main(String[] args) {
		HashSet<Student> hashset = new HashSet<>();
		Student xiaowang = new Student(110);
		Student xiaoli = new Student(110);
		hashset.add(xiaowang);
		hashset.add(xiaoli);
		System.out.println(hashset.size());
	}
}
//运行结果为1.原因解释;xiaowang和xiaoli的id一样，而重写后的hashcode为id，故相同，接着比较equals，也是比较id，故xiaowang和xiaoli相同，set长度为一。

//不重写hashcode和equals（）
import java.util.HashMap;

import java.util.HashSet;

class Student{
	int id;
	public Student(Integer id) {
		this.id = id;
	}
}

public class Test {
	public static void main(String[] args) {
		HashSet<Student> hashset = new HashSet<>();
		Student xiaowang = new Student(110);
		Student xiaoli = new Student(110);
		hashset.add(xiaowang);
		hashset.add(xiaoli);
		System.out.println(hashset.size());
	}
}
//运行结果为2.原因解释：xiaowang和xiaoli的为不同的对象，其hashcode不同。所以为不同的对象。
```
####  TreeSet 集合
1. TreeSet是一个有序集合，其元素按照升序排列，默认是按照自然顺序排列，也就是说TreeSet中的对象元素需要实现Comparable接口。
2. TreeSet虽然是有序的，但是并没有具体的索引，当插入一个新的数据元素的时候，TreeSet中原有的数据元素可能需要重新排序，所以TreeSet插入和删除数据元素的效率较低。

```java
import java.util.TreeSet;

class Student implements Comparable<Student>{//实现Comparable接口
	int age;

	public Student(int age) {
		this.age = age;
	}

	@Override//该方法可以控制treeset中的排序方法
	public int compareTo(Student o) {
		//return this.age - o.age;//默认的升序排列
		return o.age - this.age;//降序排序
	}
	
}
public class Test {
	public static void main(String[] args) {
		TreeSet< Student> treeSet = new TreeSet<>();//其内对象，必须实现comparable接口，treemap与之类似
		treeSet.add(new Student(110));
		treeSet.add(new Student(60));
		for (Student student : treeSet) {
			System.out.println(student.age);
		}
	}
}
```

