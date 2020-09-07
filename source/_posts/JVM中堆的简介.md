---
title: JVM中堆的简介
date: '2019-07-15 10:00:17 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: JVM
summary: JVM中堆的简介
tags:
  - JVM中的堆
  - JVM
abbrlink: 17343
---
## 一：基本概念
Java 中的堆是 JVM 管理的最大的一块内存空间，主要用于存放Java类的实例对象，其被划分为两个不同的区域：新生代 ( Young )和老年代 ( Old )，其中新生代 ( Young )又被划分为：Eden、From Survivor和To Survivor三个区域，如下图所示：
jdk7及以前版本
![](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715180836.png)
jdk8及以后版本
![](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715181003.png)
## 二：堆的各个区域
1. 堆大小 = 新生代( Young )  + 老年代( Old )，其可以通过参数 –Xms、-Xmx 来指定：–Xms用于设置初始分配大小，默认为物理内存的1/16；-Xmx用于设置最大分配内存，默认为物理内存的1/4。默认情况下，新生代 ( Young ) 与老年代 ( Old ) 的比例的值为 1:2 ( 该值可以通过参数 –XX:NewRatio 来指定 )，即：新生代 ( Young ) = 1/3 的堆空间大小，老年代 ( Old ) = 2/3 的堆空间大小，如下代码：
代码实例：
```java
public class Test {

	//-Xms1024m -Xmx1024m -XX:+PrintGCDetails
	public static void main(String[] args) {
    Systerm.out.println("hello jvm")；
  }
}
```
jdk8中的运行结果：
```java
hello jvm
Heap
 PSYoungGen      total 305664K, used 10486K [0x00000000eab00000, 0x0000000100000000, 0x0000000100000000)
  eden space 262144K, 4% used [0x00000000eab00000,0x00000000eb53d888,0x00000000fab00000)
  from space 43520K, 0% used [0x00000000fd580000,0x00000000fd580000,0x0000000100000000)
  to   space 43520K, 0% used [0x00000000fab00000,0x00000000fab00000,0x00000000fd580000)
 ParOldGen       total 699392K, used 0K [0x00000000c0000000, 0x00000000eab00000, 0x00000000eab00000)
  object space 699392K, 0% used [0x00000000c0000000,0x00000000c0000000,0x00000000eab00000)
 Metaspace       used 2481K, capacity 4486K, committed 4864K, reserved 1056768K
  class space    used 265K, capacity 386K, committed 512K, reserved 1048576K
```

2. 新生代 ( Young ) 被细分为 Eden 和 两个 Survivor 区域，为了便于区分，两个 Survivor 区域分别被命名为 from 和 to。默认情况下，Eden : from : to = 8 : 1 : 1 ( 可以通过参数 –XX:SurvivorRatio 来设定 )，即： Eden = 8/10 的新生代空间大小，from = to = 1/10 的新生代空间大小。JVM 每次只使用 Eden 和其中的一块 Survivor 区域来为对象服务，所以无论什么时候，总是有一块 Survivor 区域是空闲着的，因此，新生代实际可用的内存空间为 9/10 ( 即90% )的新生代空间。
3. 工作原理：
     1. Eden区为Java对象分配堆内存，当 Eden 区没有足够空间分配时，JVM发起一次Minor GC，将Eden区仍然存活的对象放入Survivor from区，并清空 Eden 区；
     2. Eden区被清空后，继续为新的Java对象分配堆内存；
     3. 当Eden区再次没有足够空间分配时，JVM对Eden区和Survivor from区同时发起一次 Minor GC，把存活对象放入Survivor to区，同时清空Eden 区和Survivor from区；
     4. Eden区继续为新的Java对象分配堆内存，并重复上述过程：Eden区没有足够空间分配时，把Eden区和某个Survivor区的存活对象放到另一个Survivor区；
     5. JVM给每个对象设置了一个对象年龄（Age）计数器，每熬过一场Minor GC，对象年龄增加1岁，当它的年龄增加到阈值（默认为15，可以通过-XX：MaxTenuringThreshold 参数自定义该阀值），将被“晋升”到老年代，当 Old 区也被填满时，JVM发起一次 Major GC，对 Old 区进行垃圾回收。

