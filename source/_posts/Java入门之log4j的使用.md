---
layout: post
title: Ｊava入门之log4j的使用
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - log4j的使用
abbrlink: 12057
---
本文讲述了Java中的log4j的使用
<!--more-->
>注本博客在编写时，参考了不动声色的蜗牛的博客，现一并将其链接贴在下面[博客地址](https://blog.csdn.net/gaohuanjie/article/details/44077551)
###  log4j的简介
Log4j是Apache的一个开源项目，通过使用Log4j，可以控制日志信息格式及其输送目的地（控制台、文件、数据库等），方便后期查找系统运行期间出现的问题，进而便于维护系统。
##  配置log4j
第一步：导入log4j-1.2.15.jar依赖包；
工程示例图如下：![在这里插入图片描述](https://img-blog.csdnimg.cn/20181027100216765.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_27,color_FFFFFF,t_70)
第二步：在src根目录下创建名为log4j.properties的文件，文件内容如下：

```java
# DEBUG设置输出日志级别，由于为DEBUG，所以ERROR、WARN和INFO 级别日志信息也会显示出来
log4j.rootLogger=DEBUG,Console,RollingFile

#将日志信息输出到控制台
log4j.appender.Console=org.apache.log4j.ConsoleAppender
log4j.appender.Console.layout=org.apache.log4j.PatternLayout
log4j.appender.Console.layout.ConversionPattern= [%-5p]-[%d{yyyy-MM-dd HH:mm:ss}] -%l -%m%n
#将日志信息输出到操作系统D盘根目录下的log.log文件中
log4j.appender.RollingFile=org.apache.log4j.DailyRollingFileAppender
log4j.appender.RollingFile.File=D://log.log
log4j.appender.RollingFile.layout=org.apache.log4j.PatternLayout
log4j.appender.RollingFile.layout.ConversionPattern=%d [%t] %-5p %-40.40c %X{traceId}-%m%n

```

下面对其语法进行一一的说明：
        一、log4j.rootLogger = [level] ,appenderName1 ,appenderName2, ..., appenderNameN
        1、level：用于指定log日志的输出级别，Log4j的日志输出级别一共有五级，从小到大分别是DEBUG、INFO、WARN、ERROR和FATAL。在配置文件中可以不指定log日志的输出级别，但需要说明的是这种情况下系统会将日志信息级别等于或高于DEBUG级别的信息输出到指定的日志目的地——一句话，Log4j的默认日志优先级为DEBUG级别。
> 注意：日志信息的日志级别只有等于或高于所配置的日志级别时，该日志信息才会输出到指定的日志输出目的地，例如上述配置文件配置的日志级别为DEBUG，那么这时日志级别为DEBUG或INFO或WARN或ERROR或FATAL的日志信息都会输出到指定的日志输出目的地，但是如果将配置文件中的日志级别设置为INFO，那么这时日志级别为INFO或WARN或ERROR或FATAL的日志信息才能输出到指定的日志输出目的地，DEBUG级别的日志信息不会输出到日志的目的地。

2、appenderName:日志信息输出目的地名。目的地的名称可以任意起，但最好能见名知意；另外可以在等号右侧同时指定多个目的地名，例如上面的例子指定了两个log日志目的地——Console（将日志输出到MyEclipse控制台）和DailyRollingFile（将日志输出到操作系统D盘根目录下的index.html文件）。
 二、log4j.appender.appenderName = appender类的完全限定名即是日志的的输出目的地的实现类，如下：
 1.  org.apache.log4j.ConsoleAppender（将日志信息输出到控制台） 
 2. org.apache.log4j.FileAppender（将日志信息输出到文件）
 3. org.apache.log4j.DailyRollingFileAppender（将日志信息输出到文件，该文件每天产生一个）
 4. org.apache.log4j.RollingFileAppender（将日志信息输出到文件，该文件在超过指定大小的时候会产生一个新的文件） 
 5. org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）。
 6. org.apache.log4j.net.SMTPAppender（将日志信息以邮件的方式发送到指定的邮箱）
第三步：创建Test类代码如下：

```java
import org.apache.log4j.Logger;
 
public class Test {
 
	private static final Logger logger = Logger.getLogger(Test.class);
 
	public static void main(String[] args) {
		try {
			Class.forName("ErrorClassName");
		} catch (ClassNotFoundException e) {
			logger.debug(e.getMessage(),e);//详细日报信息
			logger.info(e.getMessage(),e);//详细日报信息
			logger.warn(e.getMessage());//简单日报信息
			logger.error(e.getMessage());//简单日报信息
		}
          }
}

```
### 拓展：
间隙性产生日志文件：
上例配置文件是将所有的日志信息都收集到了一个文件中，那么随着时间的推移，该文件会越来越大，内容也会越来越多，这不利于后期对日志文件进行分析，为了解决该问题可以这样配置log4j.properties文件：

```
# DEBUG设置输出日志级别，由于为DEBUG，所以ERROR、WARN和INFO 级别日志信息也会显示出来
log4j.rootLogger=DEBUG,RollingFile
#每天产生一个日志文件(RollingFile)  
log4j.appender.RollingFile=org.apache.log4j.DailyRollingFileAppender
#当天的日志文件全路径
log4j.appender.RollingFile.File=d:/logs/sirius.log
#服务器启动日志是追加，false：服务器启动后会生成日志文件把老的覆盖掉
log4j.appender.RollingFile.Append=true
#日志文件格式  
log4j.appender.RollingFile.layout=org.apache.log4j.PatternLayout  
log4j.appender.RollingFile.layout.ConversionPattern=%d [%t] %-5p %-40.40c %X{traceId}-%m%n
log4j.appender.RollingFile.Threshold=DEBUG
#设置每天生成一个文件名后添加的名称,备份名称：sirius.log.年月日时分.log
log4j.appender.RollingFile.DatePattern='.'yyyy-MM-dd-HH-mm'.log'

```
##  自定义properties的文件
Log4j默认使用src根目录中名为log4j.properties的文件，实际开发中有可能需要使用特定目录中的特定名字的properties文件，如下工程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181027100918610.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_27,color_FFFFFF,t_70)

其中，config包内log.properties文件保存了Log4j相关配置信息，那么此时如何使用该文件呢，如下代码：

```java
import java.net.URL;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class Test {

	static {
		// 获取src目录config包中log.properties文件对应的URL对象
		URL url = Test.class.getResource("/config/log.properties");
		PropertyConfigurator.configure(url);
	}

	static Logger logger = Logger.getLogger(Test.class);

	public static void main(String[] args) {
		try {
			System.out.println(1 / 0);
		} catch (Exception e) {
			logger.debug(e.getMessage(), e);
		}
	}
}

```
开发中不止一个Java类需要将某些日志信息写入指定位置，此时每个类中都会重复性地写入如下代码：

```java
static {
	// 获取src目录config包中log.properties文件对应的URL对象
	URL url = Test.class.getResource("/config/log.properties");
	PropertyConfigurator.configure(url);
}

```
所以：为了尽可能重用代码，可以将该部分代码写入到一个Java类中（如BaseLog4j.java），需要输出日志的类只需继承该类即可。
### SLF4j+Log4j
SLF4j，即简单日志门面(Simple Logging Facade for Java)，它和Log4j一起使用提高了日志信息操作效率，阿里巴巴Java开发手册日志规约章节特别提到这一点：
>强制】应用中不可直接使用日志系统（Log4j、Logback）中的 API，而应依赖使用日志框架SLF4J 中的 API，使用门面模式的日志框架，有利于维护和各个类的日志处理方式统一。

如何使用： SLF4j和单独使用Log4j大同小易，其区别有如下两点：
工程中除导入log4j-1.2.15.jar依赖包外还需导入slf4j-api-1.6.4.jar和slf4j-log4j12-1.6.4.jar两个jar包；
获取Logger对象的方法不同：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
public class Test {
 
	private static Logger logger = LoggerFactory.getLogger(Test.class);
	
	public static void main(String[] args) {
		try {
			System.out.println(1/0);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}
	}
}

```

