---
title: JVM内存监管工具之jmap使用详解
date: '2019-07-26 03:07:48 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: JVM
tags:
  - JVM的性能调优
  - jmap的使用详解
abbrlink: 31366
summary:
---
#  jmap
1. 作用：监控内存的java对象。
2. 语法：jmap [option] <pid>
3. 说明： option：命令选项，常用选项如下：
	-heap 打印Java堆概要信息，包括使用的GC算法、堆配置参数和各代中堆内存使用情况；
    -histo[:live] 打印Java堆中对象直方图，通过该图可以获取每个class的对象数目，占用内存大小和类全名信息，带上:live，则只统计活着的对象
    
4. 举例如下：
jmap -histo 5352
> 注：1.  该命令令是在cmd窗口中执行的（Linux下是在终端中执行）
>2.  可以通过jps命令获取java相关进程id（进程id是操作系统管理进程的唯一标识）
>3. 相关jps的命令参数可以通过jps -help命令获取说明
 
结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190721172936427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
class name列出现了[C、[B、[L等很奇怪的内容，这些属于非自定义类，具体为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190721173007526.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
 -permstat： 打印永久代统计信息
 -finalizerinfo：打印等待回收的对象信息，如下命令：jmap -finalizerinfo 5352
结果如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190721173552158.png)		
> 说明：Number of objects pending for finalization: 0 说明当前F-QUEUE队列中并没有等待Fializer线程执行finalizer方法的对象。

-dump:<dump-options> 以hprof二进制格式将Java堆信息输出到文件内，该文件可以用MAT、VisualVM或jhat等工具查看；
	dump-options选项:
        1.  live 只输出活着的对象;不指定，则输出堆中所有对象
        2.  format=b 指定输出格式为二进制
       3.   file=<file> 指定文件名及文件存储位置，例如：jmap -dump:live,format=b,file=D:\heap.bin <pid>
  -F 与-dump:<dump-options> <pid>或-histo<pid>一起使用，当<pid>没有响应时，强制执行；注意：不支持live子选项
