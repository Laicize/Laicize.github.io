---
title: 确定Java程序中哪个线程最耗CPU资源的方法
date: '2019-07-26 03:04:13 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: JVM
tags:
  - JVM性能调优
  - 线程消耗CPU的资源
abbrlink: 61837
summary:
---
#  Window操作系统
**执行如下程序**
```java
public class Test {

	public static void main(String[] args) {
		new Thread(new Task()).start();
	}
	
	static class Task implements Runnable {
		
		@Override
		public void run() {
			while (true) {
			}
		}
	}
}
```
> 注：通过cmd命令窗口执行jps获取当前进程的pid
> 安装并启动进程管理：下载地址：http://technet.microsoft.com/en-us/sysinternals/bb896653.aspx——>解压运行，如下图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190721180733767.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
> 注：在上图寻找进程id为上一步通过jsp命令获取的进程的pid的进程（上图红框框起处）——>鼠标浮在该进程信息上——>鼠标右键——>选择“Properties...”，出现下图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190721180910219.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
> 注：选择 Threads 选项卡——>找到最耗CPU资源的线程——>将该线程tid转为十六进制，如5184对应十六进制为1440
执行jstack 4844命令输出4844进程内各线程信息——>在该结果中寻找nid为1440的线程（4844为你上一步获取的pid），如下结果
```java
2019-07-11 20:44:02
Full thread dump Java HotSpot(TM) Client VM (25.131-b11 mixed mode, sharing):
"DestroyJavaVM" #9 prio=5 os_prio=0 tid=0x00eac400 nid=0x1724 waiting on condition [0x00000000]
   java.lang.Thread.State: RUNNABLE
"Thread-0" #8 prio=5 os_prio=0 tid=0x159a6c00 nid=0x1440 runnable [0x1538f000]
   java.lang.Thread.State: RUNNABLE
	at Test$Task.run(Test.java:12)
	at java.lang.Thread.run(Thread.java:748)
"Service Thread" #7 daemon prio=9 os_prio=0 tid=0x00dd6400 nid=0x6b8 runnable [0x00000000]
   java.lang.Thread.State: RUNNABLE
"C1 CompilerThread0" #6 daemon prio=9 os_prio=2 tid=0x00dcf800 nid=0x2238 waiting on condition [0x00000000]
   java.lang.Thread.State: RUNNABLE
"Attach Listener" #5 daemon prio=5 os_prio=2 tid=0x00dce800 nid=0x21a8 waiting on condition [0x00000000]
   java.lang.Thread.State: RUNNABLE
"Signal Dispatcher" #4 daemon prio=9 os_prio=2 tid=0x00dcc800 nid=0xd68 runnable [0x00000000]
   java.lang.Thread.State: RUNNABLE
"Finalizer" #3 daemon prio=8 os_prio=1 tid=0x00db3c00 nid=0x1570 in Object.wait() [0x0112f000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	- waiting on <0x04608978> (a java.lang.ref.ReferenceQueue$Lock)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)
	- locked <0x04608978> (a java.lang.ref.ReferenceQueue$Lock)
	at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)
	at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)
"Reference Handler" #2 daemon prio=10 os_prio=2 tid=0x00d56800 nid=0x1be0 in Object.wait() [0x0109f000]
   java.lang.Thread.State: WAITING (on object monitor)
	at java.lang.Object.wait(Native Method)
	- waiting on <0x04606a90> (a java.lang.ref.Reference$Lock)
	at java.lang.Object.wait(Object.java:502)
	at java.lang.ref.Reference.tryHandlePending(Reference.java:191)
	- locked <0x04606a90> (a java.lang.ref.Reference$Lock)
	at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:153)
"VM Thread" os_prio=2 tid=0x00d52c00 nid=0x15f0 runnable 
"VM Periodic Task Thread" os_prio=2 tid=0x159a0800 nid=0x2538 waiting on condition 
JNI global references: 6
```
> 注：根据线程提示信息，确定Java程序哪个类哪个位置导致了该线程最耗CPU资源——>找到类后打开代码，分析程序，思考解决方案！

#  Linux操作系统
1. 通过jps命令找出Java程序进程ID：
2. 通过top -Hp pid命令找出该进程内CPU时间最长线程id，将该线程id转换为十六进制；
3. 通过jstack pid命令输出pid进程内各线程信息，在众多线程中，nid的值为第二步得到的十六进制的线程即是需要格外“关照”的线程；
