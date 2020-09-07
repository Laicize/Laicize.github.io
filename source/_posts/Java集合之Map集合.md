---
layout: post
title: Ｊava入门之集合中的Map集合
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - Map集合
abbrlink: 9425
---
本文讲述了Java中的Map集合
<!--more-->
#### 概述
1. Map集合基于 键（key）/值（value）映射。每个键最多只能映射一个值。键可以是任何引用数据类型的值，不可重复；值可以是任何引用数据类型的值，可以重复；键值对存放无序。
#### Map常用实现类：
1. HashMap：允许使用 null 值和 null 键;此类不保证映射的顺序;在多线程操作下不安全
2. LinkedHashMap：基于哈希表和链接列表的实现类;具有可预知的迭代顺序（双重链接表的有序性）
3. Properties：Hashtable的一个子类;属性列表中每个键及其对应值都是一个字符串;在多线程操作下安全。
####  Map接口常用方法
1. put(K key, V value) 将键（key）/值（value）映射存放到Map集合中
2. get(Object key) 返回指定键所映射的值，没有该key对应的值则返回 null
3. size()  返回Map集合中数据数量
4. clear() 清空Map集合
5. isEmpty () 判断Map集合中是否有数据，如果没有则返回true，否则返回false
6. remove(Object key) 删除Map集合中键为key的数据并返回其所对应value值。
7.  values()  返回Map集合中所有value组成的以Collection数据类型格式数据。
8. containsKey(Object key)  判断集合中是否包含指定键，包含返回 true，否则返回false
9. containsValue(Object value)  判断集合中是否包含指定值，包含返回 true，否则返回false
10. keySet()  返回Map集合中所有key组成的Set集合
11. entrySet()  将Map集合每个key-value转换为一个Entry对象并返回由所有的Entry对象组成的Set集合

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class Test {
	public static void main(String[] args) {
		Map<String, Integer> map = new HashMap<>();
		map.put("Tom", 100);//存放数值
		map.put("Lily", 120);//map集合中一个键只对应一个值，多个值时会出现冲掉的情况
		map.put("Jack", 320);
		Set<String> set = map.keySet();
		for (String key : set) {
			System.out.println(map.get(key));
		}
		
		Set<Entry<String, Integer>> entry = map.entrySet();//将键值对转换为entry对象，并放在set集合里
		for (Entry<String, Integer> entry2 : entry) {
			System.out.println(entry2.getValue());
			entry2.getKey();
		}
		
		Iterator<Entry<String, Integer>> iterator = entry.iterator();
		while(iterator.hasNext()) {
			Entry entry3 = iterator.next();
			entry3.getValue();
			entry3.getKey();
			 
		}
	}
}
```

