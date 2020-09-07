---
layout: post
title: 从程序学Python之文本进度条
author: 菠菜
catalog: true
cetegories: Ｐython入门
tags:
  - Python入门
  - 文本进度条
abbrlink: 20973
---

通过Python实现文本进度条

<!--more-->

```python
#TextProBarV1.py
import time 
scale = 50 
print("执行开始".center(scale//2, "-"))
start = time.perf_counter()
for i in range(scale+1): 
​	a = '*' * i 
​    b = '.' * (scale - i)
​	c = (i/scale)*100 
​	dur = time.perf_counter() - start 
​	print("\r{:^3.0f}%[{}->{}]{:.2f}s".format(c,a,b,dur),end='')
​	time.sleep(0.1)
print("\n"+"执行结束".center(scale//2,'-'))

```
  第一句语法：
     import time 引入时间库
 第二句语法：
    定义一个scale变量并赋值为50，控制进度条的进行快慢。
  第三句语法：
  <字符串>.center(scale//2,"-"):将字符串居中，并将“-”填充在字符串的两侧空白处，scale为控制字符串所占的字节数。
  第五句语法：
  time.perf_counter（）函数可以获取系统的当前时间并赋值给start（该时间没有意义，时间差才有意义）
  第六句语法：
  for i in range（）遍历循环，控制进度条进度
   第七句语法：
   该句表示将*重复复制i遍，并赋值于a；
   第八句语法：
   将.重复复制（scale-i）遍，并赋值于b
   第九句语法：
   计算进度条显示的百分比
   第十句语法：
   再次获得当前系统时间，并作差，将差值赋予dur。
   第十一句语法：
   输出进度条，并进行单条动态刷新，/r为将光标移植本行句首，实现动态刷新。
   第十二句语法：
   将进行程度打印出来
   第十三句语法：
   time（n）：系统休息函数，每次循环系统cpu休息一定时间。当做下载用时
   第四十句语法：
   输出执行结束
 程序拓展：
time库包括三类函数
- 时间获取：time() ctime() gmtime() -
-  时间格式化：strftime() strptime()
 - 程序计时：sleep(), perf_counter()
1.time()  ：
获取当前时间戳，即计算机内部时间值，浮点数 
time.time() 1516939876.6022282
2.time.ctime()：
获取当前时间并以易读方式表示，返回字符串 
eg：time.ctime()
     'Fri Jan 26 12:11:16 2018'
 3.gmtime()：
获取当前时间，表示为计算机可处理的时间格式 
 eg：time.gmtime() 
time.struct_time(tm_year=2018, tm_mon=1, tm_mday=26, tm_hour=4, tm_min=11, tm_sec=16, tm_wday=4, tm_yday=26, tm_isdst=0)
4.strftime(tpl, ts)：
tpl是格式化模板字符串，用来定义输出效果 ts是计算机内部时间类型变量 
eg：
t = time.gmtime() 
time.strftime("%Y-%m-%d %H:%M:%S",t) '2018-01-26 12:55:20'
5.  strptime(str, tpl)：
str是字符串形式的时间值 tpl是格式化模板字符串，用来定义输入效果 
eg：timeStr = '2018-01-26 12:55:20' 
time.strptime(timeStr, "%Y-%m-%d %H:%M:%S") time.struct_time(tm_year=2018, tm_mon=1, tm_mday=26, tm_hour=4, tm_min=11, tm_sec=16, tm_wday=4, tm_yday=26, tm_isdst=0) 
6.sleep(s)：
s拟休眠的时间，单位是秒，可以是浮点数 
eg：def wait(): time.sleep(3.3)
wait() #程序将等待3.3秒后再退出
  

```