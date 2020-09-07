---
layout: post
title: Ｊava入门之集合的工具类
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 集合工具类
abbrlink: 20429
---
本文讲述了Java中的集合工具类
<!--more-->
####  Collections类
**常用方法**
1. max(Collection <? extends T> coll)：根据元素的自然顺序，返回给定集合元素中的最大元素
2. min(Cssollection <? extends T> coll)：根据元素的自然顺序，返回给定集合元素中的最小元素
3. sort(List<T> list) ：根据元素的自然顺序对指定列表按升序进行排序。列表中的所有元素都必须实现 Comparable 接口。
4. sort(List<T> list, Comparator<? super T> c)  ： 根据指定比较器产生的顺序对指定列表进行排序
5. reverse(List<?> list)：反转指定列表中元素的顺序
6. swap(List<?> list, int i, int j)：在指定列表的指定位置处交换元素，如果指定位置相同，则调用此方法不会更改列表。
7. binarySearch(List<? extends Comparable<? super T>> list, T key) ：返list集合元素按照自然顺序升序排序后，使用二分搜索法搜索list集合，返回指定对象的索引，如果没找到返回-1。
8. max(Collection <? extends T> coll)：根据元素的自然顺序，返回给定集合元素中的最大元素
9. min(Collection <? extends T> coll)：根据元素的自然顺序，返回给定集合元素中的最小元素
>在使用max和min方法时要求存入集合中的对象对应的类必须实现Comparable接口，否则程序在编译阶段就会报错。

```java
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;

public class Test {
	public static void main(String[] args) {
		HashSet<Integer> set = new HashSet<>();
		set.add(12);
		set.add(120);
		set.add(34);
		int result = Collections.max(set);
		System.out.println(result);
		result = Collections.min(set);
		System.out.println(result);
		
		List<Integer> list = new ArrayList<>(); 
		list.add(234);
		list.add(456);
		list.add(567);
		list.add(12);
		Collections.sort(list);//注意colltion集合必须实现comparable接口（即实现自然顺序），直接收list,基本数据类型都实现了comparable接口。
		for (Integer integer : list) {
			System.out.println(integer);
		}
		//可以通过重写compare方法来进行升降序的改变。
		Comparator<Integer> comparator = new Comparator<Integer>() {
			@Override
			public int compare(Integer o1, Integer o2) {
				return o1 -o2;
			}
		};
		//Lambert表达式
		Comparator<Integer> comparator = (Integer o1, Integer o2) -> {
				return o1 -o2;//升序
		};
		Collections.sort(list, comparator);
		for (Integer integer : list) {
			System.out.println(integer);
		}
		
		Collections.sort(list,(o2,o1) -> {
			return o2 -o1;//降序
	   });
		for (Integer integer : list) {
			System.out.println(integer);
		}
	
		int i = Collections.binarySearch(list, 12);
		System.out.println(i);
		System.out.println(list.get(i));

		Integer [] arr = {12,54,3,234,56,2,11};
		Arrays.sort(arr);//默认升序
		for (Integer integer : arr) {
			System.out.println(integer);
		}
	}
}
```
####  Comparable接口和Comparator接口的区别比较
###### 1.Comparable接口
1. String和各种包装类已经实现了Comparable接口
2. TreeSet集合内默认是按照自然顺序排序的
3. 在集合内元素之间的比较，由该类的compareTo(Object o)方法来完成，因为这种比较是在类内部实现，所以将Comparable称为内部比较器
###### 2. Comparator
1. 外部比较器
2. 配合Collections工具类的sort(List list, Comparator c)方法使用。
3. 当集合中的对象不支持自比较或者自比较的功能不能满足需求时使用
4. 和内部比较器相比，其可重用性好
####  Arrays类
#####  常用方法
1. asList(T... a)：将数组转换为List集合
2. static void sort(int[] a)：对指定的 int 型数组按数字升序进行排序。 
3. static <T> void sort(T[] a, Comparator<? super T> c)：根据指定比较器产生的顺序对指定对象数组进行排序。 
4. static boolean equals(Object[] a1, Object[] a2)：判断构成两个数组的元素是否完全相同，相同返回true，否则返回false。
5. static int binarySearch(Object[] a, Object key) ：二分搜索法来搜索指定数组，以获得指定对象。 
6. static int binarySearch(Object[] a, int fromIndex, int toIndex, Object key) ：二分搜索法来搜索指定数组的范围，以获得指定对象。 

```java
import java.util.Arrays;

public class Test {
	public static void main(String[] args) {
		Integer [] arr = {12,54,3,234,56,2,11};
		Arrays.sort(arr);//默认升序
		for (Integer integer : arr) {
			System.out.println(integer);
		}
		
		Arrays.sort(arr, (a,b)->{
			return b-a;//降序
		});
		
		for (Integer integer : arr) {
			System.out.println(integer);
		}
		
		Arrays.asList(arr);//数组转化为列表
		
		Integer [] array = {54,12,3,11,2,56,234};
		Arrays.sort(arr, (a,b)->{
			return b-a;
		});
		Arrays.sort(array, (a,b)->{
			return b-a;
		});
		boolean result = Arrays.equals(arr, array);
		System.out.println(result);//使用该方法前，需对数组进行相同方式的排序
	}
}
```

