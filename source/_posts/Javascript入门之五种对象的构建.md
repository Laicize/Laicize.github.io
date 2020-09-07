---
layout: post
title: Javascript入门之五种对象的构建
author: 菠菜
catalog: true
cetegories: Javascript
tags:
  - Javascript
  - 对象的构建
abbrlink: 42093
---
本文讲述了Javascript中的五种对象的创建的知识点

<!--more-->

一：直接构造法

```java
var student=new Object（）;
studnet.name="张三"；
student.dohomework=function(){
	console.log(this.name+"正在写作业");
};
//调用
student.dohomework();
```
注：this可以代指对象
二 ：对象初始化器方法

```java
var student={
	name:"张胜男",
	play:function（）{
	console.log(this.name+"正在玩耍")；
	}
}
//调用
studnet.play();
```
注：1属性，方法之间用','隔开，最后一个属性或方法不需要','
2属性名：属性值
三：prototype原型方式

```java
function Student(){
}
Student.prototype.name=“尼采”;
Student.prototype.sleep=function(){
	console.log(this.name+"正在睡觉")；
}
//调用
var student=new Student()；
student.sleep();
```
注：优点：对象方法与构造函数分开，清晰明了。缺点：属性值不能改动。
四：构造函数法

```java
function Student(name){
	this.name=name；
	this.eat=function(){
		console.log(this.name+"正在吃饭");
	}
}
//调用
var studnet=new Studnet("王二")；//在创建对象时进行参数传递
studnet.eat();
```
优点：易于改变属性值。缺点：对象方法与构造函数混在一起。
五：混合法

```java
function Studnet(name){
	this.name=name;
}
Studnet.prototype.cry(){
	console.log(this.name+"正在哭")；
}；
//调用
var studnet=new Student()
student.cry()；
```
