---
layout: post
title: Javascript入门之基础知识（一）
author: 菠菜
catalog: true
cetegories: Javascript
tags:
  - Javascript
abbrlink: 26879
---

本文讲述了Javascript中的基本知识点

<!--more-->
一 变量
1 通常用var 代表变量类型，eg：var names=“王大兵”
2 变量分为字符串，整型，浮点数等
3 数组：（1） eg var names=【“王”，“大”，“兵”】注：数组采用中括号
​			（2） eg：var names=new Array（）；
​							names【0】=“王”；names【1】=“大”；names【2】=“兵”；
4 特殊情况：var gao=null;
console.log(gao);注：undefine声明变量，但没有赋值，不声明，是not define，也可以声明并赋值null。
5 对象：大括号表范围，属性名：属性值  ，调用：对象名.属性名

```java
eg：var computer={
			brand:"dell",
			neicun:"8GB",
			cpu:"inter",
			daxiao:15.3
		}
	console.log(computer.neicun);
	console.log(computer["daxiao"]);
	console.log(computer.brand);
	console.log(computer.daxiao);	
```

二：运算符
1 算术运算和逻辑运算
“==”与“===”的区别：
“==”只强调内容相等，不考虑数据类型
“===”数值和数据类型皆相等

```java
eg：var a=1;
var b="1";
console.log(a==b);
console.log(a===b);	
```

2 “&&”和“||”运算的短路现象
eg：//短路现象&&出现一个false既不在运算，||出现一个ture既不在运算

```java
var a=10;
var b=20;
console.log((a=0)==0||(b=30)==0);
console.log(b);	
```

三选择结构

```java
	eg：（1）if(0<time&&time<=5)
				console.log("早晨");
		else if(5<time&&time<=11)注：表达式不能有0<time<7这种形式。
			console.log("上午");
		else if(12<time&&time<=17)
			console.log("下午");
		else if(17<time&&time<=23)
			console.log("晚上");
	else
		console.log("数据错误");
	（2）var b=2;
	switch(b)
	{
		case 0:
		console.log("傻逼");break;
		case 1:
		console.log("闪避");break;
		case 2:
		console.log("不爽");break;
		dafult:
		console.log("数据错误")
	}
```
注：if条件判断的条件可为一个范围而switch只能为一个确切的数。
四：循环语句

```java
var family=new Array();
family[0]="奶奶";
family[1]="爸爸";
family[2]="妈妈";
family[3]="弟弟";
family[4]="我";
for(var index in family)注：一种遍历方式
	console.log(family[index]);
for(i=0;i<=family.length;i++)注：另一种遍历方式
	console.log(family[i]);
while(i<3)
{
	console.log(names[i]);
	i++;
}
```
五：函数

```java
function bian(a)注：函数形参无数据类型
{
	for(var index in a)
	console.log(a[index]);
}
bian(family);
```
注：return可以结束整个函数（方法），而break只跳出所在循环。


