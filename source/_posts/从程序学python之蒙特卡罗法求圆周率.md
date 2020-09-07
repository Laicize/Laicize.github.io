---
layout: post
title: 从程序学Python之蒙特卡罗法求圆周率
author: 菠菜
catalog: true
cetegories: Ｐython入门
tags:
  - Python入门
  - 蒙特卡罗求圆周率
abbrlink: 35121
---

本文通过Python程序实现用蒙特卡罗法求圆周率

<!--more-->

```python
#CalPiV2.py
 from random import random 
 from time import perf_counter 
 DARTS = 1000*1000
 start = perf_counter()
 hits = 0.0
 for i in range(1, DARTS+1):
​	  x, y = random()， random()
​	  dist = pow(x ** 2 + y ** 2, 0.5) 
​	  if dist <= 1.0:
​		   hits = hits + 1
pi = 4 * (hits/DARTS)
print("圆周率值是: {}".format(pi))
print("运行时间是: {:.5f}s".format(perf_counter()-start))

```
蒙特卡洛计算圆周率原理：在边长为1的正方形内画单位圆内随机投点，最后用圆内点数比正方形点数得两者面积比，进一步求解圆周率。
1.第一，二句语法：
用import引用random（产生随机数的库）用import引用time时间库
2.第三句语法：
定义DARTS当做投点总数
3.第四句语法：
调用time函数获取当前时间赋于start
4.第五句语法：
记录圆内投点次数
5.第六局语法：
for的便历循环，循环投点
6.第七句语法：
获取两个随机点数赋于x，y
7.第八句语法：
计算随机点是否落在圆内
8.第九句语法：
根据面积公式计算圆周率
9.十，十一句语法：
输出圆周率和时间

拓展：随机库的相关知识；
- 基本随机数函数： seed(), random() 
- - 扩展随机数函数： randint(), getrandbits(), uniform(), randrange(), choice(), shuffle()
1.seed(a=None)
初始化给定的随机数种子，默认为当前系统时间 >>>random.seed(10) #产生种子10对应的序列
2.random()
生成一个[0.0, 1.0)之间的随机小数 >>>random.random() 0.5714025946899135
3.randint(a, b)
生成一个[a, b]之间的整数 >>>random.randint(10, 100) 64
4.randrange(m, n[, k])
生成一个[m, n)之间以k为步长的随机整数 >>>random.randrange(10, 100, 10) 80
5.getrandbits(k)
生成一个k比特长的随机整数 >>>random.getrandbits(16) 37885
6.uniform(a, b)
生成一个[a, b]之间的随机小数 >>>random.uniform(10, 100) 13.096321648808136
7.choice(seq)
从序列seq中随机选择一个元素 >>>random.choice([1,2,3,4,5,6,7,8,9]) 8
8.shuffle(seq)
将序列seq中元素随机排列，返回打乱后的序列 >>>s=[1,2,3,4,5,6,7,8,9];random.shuffle(s);print(s) [3, 5, 8, 9, 6, 1, 2, 7, 4]

```