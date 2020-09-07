---
layout: post
title: Ｊava入门之io流中的file类
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - io流中的file类
abbrlink: 45366
---
本文讲述了Java中的io流中的file类。
<!--more-->
###  1. File类的构造方法
构造方法如下表：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190228195140421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)

```java
//代码1：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32");
		String path = file.getAbsolutePath();
		System.out.println(path);
		
		file = new File(new File("C:\\Windows", "System32");
		path = file.getAbsolutePath();
		System.out.println(path);
		
		file = new File("C:\\Windows", "System32");
		path = file.getAbsolutePath();
		System.out.println(path);
	}
}

//代码2：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32\\cmd.exe");
		String path = file.getAbsolutePath();
		System.out.println(path);
		file = new File(new File("C:\\Windows\\System32"), "cmd.exe");
		path = file.getAbsolutePath();
		System.out.println(path);
		file = new File("C:\\Windows\\System32", "cmd.exe");
		path = file.getAbsolutePath();
		System.out.println(path);
	}
}
```
###  2. File类的常用方法
1. String getName()：返回此对象表示的**文件或目录**最后一级**文件夹**名称。

```java
//代码1：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32\\cmd.exe");
		String name = file.getName();//返回文件名cmd.exe
		System.out.println(name);
	}
}
//代码2：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32");
		String name = file.getName();//返回目录最后一级文件夹名称System32
		System.out.println(name);
	}
}
```

2. String getParent()：返回此File对象的**父目录路径名**；如果此路径名没有指定父目录，则返回 null。

```java
//代码1：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\Web\\Wallpaper");
		System.out.println(file.getParent());//输出C:\Windows\Web
	}
}
//代码2：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\Web\\Wallpaper");
		file = file.getParentFile();
		System.out.println(file.getName());//输出Web
	}
}
```

3. String getPath() ：返回File对象所表示的**字符串路径**。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\Web\\Wallpaper");
		file = file.getParentFile();
		System.out.println(file.getPath());//输出C:\Windows\Web
	}
}
```

4. boolean mkdir()：创建此File类对象指定的目录，不包含父目录。创建成功回true，否则返回。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Program_Files\\Java");
		if (file.mkdir()) {
			System.out.println("创建成功");
		}else {
			System.out.println("创建失败");
		}
	}
}
```

6. boolean mkdirs()：创建此File对象指定的目录，包括所有必需但不存在的父目录，创建成功返回true；否则返回false。

```java 
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Program_Files\\Java");
		if (file.mkdirs()) {
			System.out.println("创建成功");
		}else {
			System.out.println("创建失败");
		}
	}
}
```

> 注意，此操作失败时也可能已经成功地创建了一部分必需的父目录。注意，此操作失败时也可能已经成功地创建了一部分必需的父目录。
7. boolean createNewFile()：如果指定的文件不存在并成功地创建，则返回 true；如果指定的文件已经存在，则返回 false；如果所创建文件所在目录不存在则创建失败并出现IOException异常。
```java
import java.io.File;
import java.io.IOException;
public class Test{
	File file = new File("D\\Program_File\\HEllow.java");
	try{
		if(file.createNewFile()){
			System.out.println("Java源文件创建成功");
			}else{
			System.out.println("Java源文件创建失败")
			}catch(IOException e){
				e.printStackTrace();
			}
		}
}

```
>注：mkdir()和mkdirs()只能创建目录，不能创建文件；而createNewFile()只能创建文件，不能创建目录；
8. boolean exists()：判断文件或目录是否存在
```java
//代码1：
import java.io.File;
public class Test {
public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32\\cmd.exe");
		if (file.exists()) {//判断cmd.exe文件是否存在
			System.out.println("文件存在");
		}
	}
}
//代码2：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32");
		if (file.exists()) {//判断目录是否存在
			System.out.println("目录存在");
		}
	}
}

```
8. boolean delete()：删除File类对象表示的**目录或文件**。如果该对象表示一个目录，则该**目录必须为空**才能删除；文件或目录删除成功返回true，否则false。

```java
//代码1：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("D:\\images");
		if (file.delete()) {// 由于D:\images目录非空，所以删除失败
			System.out.println("目录删除成功");
		} else {
			System.out.println("目录删除失败");
		}
	}
}
//代码2：
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("D:\\images\\image.jpg");
		if (file.delete()) {//删除图片文件
			System.out.println("图片删除成功");
		} else {
			System.out.println("图片删除失败");
		}
	}
}
```

10. boolean isDirectory()：判断此File对象代表的路径表示是不是目录，只有File对象代表路径存在且是一个目录时才返回true，否则返回false。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Program Files");
		System.out.println(file.isDirectory());//返回true
	}
}
```

12. boolean isFile()：判断此File对象代表的路径是否是一个标准文件，只有File对代表路径存在且是一个标准文件时才返回true，否则返回false。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:\\Windows\\System32\\cmd.exe");
		System.out.println(file.isFile());//返回true
	}
}
```

14. String[] list()：返回由File对象对应目录所包含文件名或文件夹名组成的字符串数组。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		String[] names = new File("C:\\Program Files").list();
		for (String name : names) {
			System.out.println(name);
		}
	}
}
```

16.  File[] listFiles()：返回由当前File对象对应目录所包含文件路径或文件夹路径组成的File类型的数组。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File[] files = new File("C:\\Program Files").listFiles();
		for (File file : files) {
			String fileName = file.getName();
			System.out.println(fileName);
		}
	}
}
```
 12. boolean renameTo(File dest)：重新命名此File对象表示的文件，重命名成功返回true，否则返回false。
 

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File oldFile = new File("D:\\images\\image.jpg");
		File newFile = new File("D:\\images\\Windows.jpg");
		boolean result = oldFile.renameTo(newFile);//将D盘images文件夹中图片更名为Windows.jpg
		if (result) {
			System.out.println("重命名成功");
		} else {
			System.out.println("重命名失败");
		}
	}
}
```
###  3. Fille类的属性
1. static separator：指定文件或目录路径时使用斜线或反斜线来写，但是考虑到跨平台，斜线反斜线最好使用File类的separator属性来表示。

```java
import java.io.File;
public class Test {
	public static void main(String[] args) {
		File file = new File("C:"+File.separator+"Windows"+File.separator+"System32");
		System.out.println(file.getPath());//输出C:\Windows\System32
	}
}
```






