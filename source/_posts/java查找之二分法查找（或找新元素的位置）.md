---
layout: post
title: java查找之二分法查找（或找新元素的位置）
author: 菠菜
catalog: true
cetegories: Java入门
tags:
  - Java入门
  - 二分法查找（或找新元素的位置）
abbrlink: 46950
---
本文讲述了Java中冒泡排序和插入排序的知识点

<!--more-->

二分法查找：搜索数据与有序数组（比如升序）中间元素比较以确定在中间元素左边还是右边，如果在右边，则调整最小搜索索引值，然后进入下次循环；如果在左边，则调整最大搜索索引值，然后进入下次循环；如果相等则当前位置就是查找数据所在位置，停止循环。

```java
import java.util.Arrays;
//二分法排序(先对已有数据排序）,可以查找元素位置或获取元素应该在该数列插入的位置
		int [] numbers = {23,14,56,78,56,467,76,54,32,45};
		Arrays.sort(numbers);
		for(int m:numbers) {
			System.out.println(m);
		}
		int date=72;
		int low=0;
		int high=numbers.length-1;
		while(high-low>=2) {
			int muddle =(low+high)/2;
			if(numbers[muddle]>=date) {
				high=muddle;
			}
			else{
				low=muddle;
			}
		}
		System.out.println(high);
```
