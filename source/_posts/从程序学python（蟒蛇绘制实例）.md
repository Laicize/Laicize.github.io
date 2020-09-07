---
title: 从程序学Python之蟒蛇绘制
author: 菠菜
catalog: true
cetegories: Ｐython入门
tags:
  - Python入门
  - 蟒蛇绘制
abbrlink: 4921
---

本文通过Python程序实现蟒蛇绘制

<!--more-->

```python
#PythonDraw.py 
import turtle
 turtle.setup(650, 350, 200, 200)
 turtle.penup()
 turtle.fd(-250)
 turtle.pendown()
 turtle.pensize(25)
 turtle.pencolor("purple")
 turtle.seth(-40) 
 for i in range(4):    
​     turtle.circle(40, 80)     
​     turtle.circle(40, 80/2) 
​     turtle.fd(40) 
​     turtle.circle(16, 180) 
​     turtle.fd(40 * 2/3) 
 turtle.done()

```
turtle库的说明：
turtle又名海龟库是Python中绘图的第三方库
**第一句语法如下**
import关键词的运用：先导入import <库名> 然后再引用 <库名>.<函数名>(<函数参数>)
inport起导入库函数作用，其三种形式如下：
1.import +库文件名（其后引用库内函数必须带（库名.函数名）形式，eg：turtle.penup()   )
2.from+库名import*（其后可省略库名.直接用函数名引用库函数）
3.inport+库名as 任意字母（用as后字母代替库名，起简化作用）
**第二句语法如下**
turtle.setup（）建立画框其参数表示画框相对显示屏左上角的位置，单位是像素。
**第三句语法如下**
turtle.penup() 别名 turtle.pu() 抬起画笔，海龟在飞行（即此时不进行绘画）
**第四句语法如下**
- turtle.forward(d) 别名 turtle.fd(d) 向前行进，海龟走直线
- d: 行进距离，可以为负数。平移多少像素参数为正，向前平移，参数为负值，向后平移
**第五句语法如下**
turtle.pendown() 别名 turtle.pd() 落下画笔，海龟在爬行（绘画状态）
**第六句语法**
turtle.pensize(width) 别名 turtle.width(width) 画笔宽度，海龟的腰围（画笔设置一次即一直有效，直到下次重置）
**第七句语法**
turtle.pencolor(color) color为颜色字符串或r,g,b值 画笔颜色，海龟在涂装
pencolor(color)的color参与可以有三种形式
- 颜色字符串turtle.pencolor("purple")
-  RGB的小数值：turtle.pencolor(0.63, 0.13, 0.94) 
-  RGB的元组值：turtle.pencolor((0.63,0.13,0.94))
**第八句语法**
- turtle.setheading(angle) 别名 turtle.seth(angle) 改变行进方向，海龟走角度
- angle: 行进方向的绝对角度（以画布中心为原点建立的坐标）
补充：- turtle.left(angle) 海龟向左转
-  - turtle.right(angle) 海龟向右转 - 
- angle: 在海龟当前行进方向上旋转的角度
**第九句语法**
按照一定次数循环执行一组语句
for <变量> in range(<次数>): <被循环执行的语句>
- <变量>表示每次循环的计数，0到<次数>-1
eg：>>> for i in range(5):
 print(i)
0 1 2 3 4
 for i in range(5):
 print("Hello:",i)
Hello: 0 Hello: 1 Hello: 2 Hello: 3 Hello: 4
range()函数 产生循环计数序列
- range(N) 产生 0 到 N-1的整数序列，共N个
- range(M,N) 产生M 到 N-1的整数序列，共N-M个
eg：range(5) 
0, 1, 2, 3, 4
range(2, 5)
 2, 3, 4
**第十句语法**
运动控制函数 控制海龟行进：走直线 & 走曲线
- turtle.circle(r, extent=None) 根据半径r绘制extent角度的弧形
- r: 默认圆心在海龟左侧r距离的位置 -
-  extent: 绘制角度，默认是360度整圆
**第十五句语法**
turtle.done（）为绘图结束函数
**语法综述**：
turtle程序语法元素分析
- 库引用: import、from…import、import…as… -
-  penup()、pendown()、pensize()、pencolor()
循环语句：for和in、range()函数


***补充知识点***
1.turtle的原（wan）理（fa） turtle(海龟)是一种真实的存在
- 有一只海龟，其实在窗体正中心，在画布上游走 - 走过的轨迹形成了绘制的图形 - 海龟由程序控制，可以变换颜色、改变宽度等
2.RGB色彩模式 由三种颜色构成的万物色
- RGB指红蓝绿三个通道的颜色组合 - 覆盖视力所能感知的所有颜色 - RGB每色取值范围0-255整数或0-1小数英文名称- 
3.- turtle库的海龟绘图法 - turtle.setup()调整绘图窗体在电脑屏幕中的布局 - 画布上以中心为原点的空间坐标系: 绝对坐标&海龟坐标 - 画布上以空间x轴为0度的角度坐标系: 绝对角度&海龟角度 - RGB色彩体系，整数值&小数值，色彩模式切换

```

```