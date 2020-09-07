---
layout: post
title: 通过程序学python入门（温度转换实例）
author: 菠菜
catalog: true
cetegories: Ｐython入门
tags:
  - Python入门
  - 温度转换实例
abbrlink: 60020
---

通过Python实现华氏温度和摄氏温度的转换

<!--more-->  

```java
 TempStr = input("请输入带有符号的温度值: ") 
 if TempStr[-1] in ['F', 'f']:

​     C = (eval(TempStr[0:-1]) - 32)/1.8
​       print("转换后的温度是{:.2f}C".format(C)) 
 elif TempStr[-1] in ['C', 'c']:
​      F = 1.8*eval(TempStr[0:-1]) + 32 
​      print("转化后的温度是{:.2f}F".format(F))    
 else:
​      print("输入格式错误")

```

 1. 第一句中的语法如下
	       #或“‘（三引号）为python中的注释内容，不进行编译
2.第二句中的语法如下	       
		变量的定义：python中无需变量声明，其通过input函数获得变量值，而变量名相当于指向该变量值的内存地址的指针
		input（）为基本输入函数，其引号内为提示语
3.第三句中的语法如下
	if的条件判断：
	形式如下
	if表达式：
	 （空格缩进） 代码块
		                如果表达式的结果为布尔真或非零，则执行代码块，否则不执行
		                另外，在python中，通过缩进（同一程序缩进必须相同）来确定语句的所属关系（而不是c语言中的{}）
		                python中有33个保留字（if，else，in，finally，import，as等）其所带语句后必有冒号
		                in表示所属关系的的判断 ：“对象  in【】”即为in前方内容是否属于其后【】
		                的内容
		                python中用【】表示一种数据结构即列表，其能储存任意多个不同类型的对象，多个元素之间用“，”分割。
		                索引：
		                正向递增排序：索引内容从0开始排序
		                反向递减排序：从最后元素开始从-1依次递减
		                seq[index]调动seq的第index个元素
		                TempStr[-1] 即表示TempStr的最后一个元素
		                切片
		                seq【m:n】即表示seq中的从m到n-1个元素
		                4.第四句中的语法如下
		                eval为保留字作用是将字符串的引号去掉，使其变为数据
		                5.第五句中的语法如下
		                printf（）为基本输出函数.format（）的参数为要输出的变量名
		                综述语法点：引号内（单引号或双引号)量会被当做字符串处理
		                
		                
		                
		                

		


```