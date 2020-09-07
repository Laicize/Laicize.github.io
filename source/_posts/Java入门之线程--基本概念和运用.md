---
layout: post
title: Ｊava入门之线程的基本概念和运用
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 线程的基本概念和运用
abbrlink: 24946
---
本文讲述了Java中的基本概念和运用
<!--more-->
###  线程与进程的基本概念
1.  进程：进程（process）指一个程序的一次执行过程。
2. 线程：线程（thread）又称为轻量级进程，线程是一个程序中实现单一功能的一个指令序列，是一个程序的单个执行流，存在于进程中，是一个进程的一部分。
3. 线程与进程的异同：
     1. 一个进程可以包含多个线程，而一个线程必须在一个进程之内运行；同一进程中的多个线程之间采用**抢占式**独立运行。
     2. 线程有**独立的执行堆栈、程序计数器和局部变量**；但是没有独立的存储空间，而是和所属进程中的其它线程共享存储空间。
     3. 操作系统将进程作为分配资源的**基本单位**，而把线程作为独立运行和独立调度的基本单位，由于线程比进程更小，基本上不拥有系统资源，故对它的调度所付出的开销就会小得多，能更高效的提高系统多个程序间并发执行的速度。
 >注： 1. 抢占式的释义：CPU在同一时间只能执行一个线程，所以多个线程会争夺CPU的运行机会。（并不会根据程序中线程编写的先后秩序执行）。
 >2. 程序计数器的释义：由于Java虚拟机的多线程是通过线程轮流切换并分配处理器执行时间的方式来实现的，在任何一个确定的时刻，一个处理器（对于多核处理器来说是一个内核）只会执行一条线程中的指令。因此，为了线程切换后能恢复到正确的执行位置，每条线程都需要有一个独立的程序计数器以记住当前线程所执行的字节码的行号，各条线程之间的计数器互不影响，独立存储，将这类内存区域称为为“线程私有”内存。
 ###  如何创建想线程
 第一种方法：
继承java.lang.Thread类,重写run方法。如下例：

```java
public class CounterThread extends Thread {
	public CounterThread() {
		super("计数器线程");//设置线程名称
	}
	public void run() {
		try {
			for (int i=1; i<=10; i++) {//输出10次，每次间隔0.5秒
				System.out.println(this.getName()+"运行第"+i+"次");
				Thread.sleep(1000);//使当前正在执行的线程休眠
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
public class Test {
	public static void main(String[] args) {
		CounterThread counterThread = new CounterThread();
		counterThread.start();
	}
}
```
第二种方式：
实现java.lang.Runnable接口，实现run抽象方法。如下例子：

```java
import java.text.SimpleDateFormat;
import java.util.Date;
public class TimeThread implements Runnable{
	String threadName = "时间线程";
	@Override
	public void run() {
		while(true){
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currentTime = sdf.format(new Date());
			System.out.println(threadName+",当前时间："+currentTime);
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
public class Test {
	public static void main(String[] args) {
		TimeThread thread = new TimeThread();
		Thread timeThread = new Thread(thread);
		timeThread.start();
	}
}
```
###  线程的生命周期
Java中，线程有5种不同状态，分别是：新建（New）、就绪（Runable）、运行（Running）、阻塞（Blocked）和死亡（Dead）。它们之间的转换图如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190319092335455.png)
过程;
1. 新建到就绪：调用start（）方法（并不意味着程序几经在运行）
2. 就绪与运行：线程失去cpu执行权。
3. 运行到死亡：
     1. run方法执行完成
     2. Error,程序本身无法恢复的严重错误
     3. Exception,程序出现异常
 4. 运行到阻塞：
         1. sleep（） 
         2. IO阻塞（比如让线程拷贝大的文件）
         3. 等待同步锁 
        4. wait()
        5. suspend()
  5. 阻塞到运行：
        1. sleep时间到
        2. IO方法结束（比如文件拷贝完成）
        3. 获得同步锁 
       4. notify()
        5. resume()


释义：
1. 新建状态（New）：新创建了一个线程对象。
2. 就绪状态（Runnable）：线程对象创建后，其他线程调用了该对象的start()方法。该状态的线程位于可运行线程池中，变得可运行，等待获取CPU的使用权。
3. 运行状态（Running）：就绪状态的线程获取了CPU使用权，执行程序代码。
4. 阻塞状态（Blocked）：阻塞状态是线程因为某种原因放弃CPU使用权，暂时停止运行。直到线程进入就绪状态，才有机会转到运行状态。阻塞的情况分三种：
5. 等待阻塞：运行的线程执行wait()方法，JVM会把该线程放入等待池中。(wait会释放持有的锁)
6. 同步阻塞：运行的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则JVM会把该线程放入锁池中。
7. 其他阻塞：运行的线程执行sleep()或join()方法，或者发出了I/O请求时，JVM会把该线程置为阻塞状态。当sleep()状态超时、join()等待线程终止或者超时、或者I/O处理完毕时，线程重新转入就绪状态。（注意,sleep是不会释放持有的锁）；
8. 死亡状态（Dead）：线程执行完了或者因异常退出了run()方法，该线程结束生命周期。




