---
layout: post
title: Ｊava入门之冒泡排序和插入排序
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 冒泡排序和插入排序
abbrlink: 35371
---
本文讲述了Java中冒泡排序和插入排序的知识点

<!--more-->

冒泡排序法：

```java
int [] a = {21,99,3,1024,16};
for(int j = 0;j<a.length-1;j++) {//冒泡排序，外循环最多n—1次，内循环n-i-1次
		for(int i=0;i<a.length-j-1;i++) {
			if(a[i]>a[i+1]) {
				temp=a[i];					
				a[i]=a[i+1];
				a[i+1]=temp;
				}
			}
		}
for(int i=0;i<5;i++) {
	System.out.println(a[i]);
	}
    	
```
插入排序法：每循环一次都将一个待排序的元素所对应的数据按其顺序大小插入到前面已经排序的序列的合适位置，直到全部插入排序完为止，其难点在于如何在前面已经排好序的序列中找到合适的插入位置。

```java
int [] a= {23,34,75,865,34,2,5,78,34};
for(int i =1;i<a.length;i++){//将第一个元素视为已排好序，从第二个元素开始插入
	int date = a[i];//先将待插入元素保存下来。
	
	//找位置
	int j=0;
	for(;j<i;j++) {//从0号元素到待插入元素位置找合适位置
		if(a[j]>=a[i]) {
			break;
			}
		}
		
	//移动元素
	for(int k=i;k>j;k--) {//从待插入元素位置到合适位置进行移动元素
		a[k]=a[k-1];
		}
		
	//复原元素
	a[j]=date;
	}
	for (int m:a) {
		System.out.println(m);
	}
		
```
