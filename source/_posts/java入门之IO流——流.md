---
layout: post
title: Ｊava入门之ｉo流中的流
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - io流中的流　
abbrlink: 19818
---
本文讲述了Java中的io流中的流。
<!--more-->
### 1. IO流
1. 释义：I是指Input（输入）,O是指Output（输出）。
2. 来源：在Java中，文件的输入和输出是通过流（Stream）来实现的，流的概念源于Unix中管道（pipe）的概念。在Unix系统中，管道是一条不间断的字节流，用来实现程序或进程间的通信，或读写外围设备、外部文件等。
3. 特点：一个流，必有源端和目的端，它们可以是计算机内存的某些区域，也可以是磁盘文件，甚至可以是Internet上的某个URL。对于流而言，我们不用关心数据是如何传输的，只需要向源端输入数据，向目的端获取数据即可。
4. 分来流按照处理数据的单位，可以分为字节流和字符流；按照流向分为输入流和输出流（注意：输入流和输出流都是站在程序的角度参照的）。
##### 1.   字节流
1. 输入类：InputStream抽象类是所有输入字节流类的直接或间接父类，FileInputStream是其重要子类：
2. FileInputStream常用构造方法：
   1. FileInputStream(File file) ：通过File对象创建FileInputStream对象。
   2. FileInputStream(String name) ：通过文件（非“目录”）路径创建FileInputStream对象。
3. FileInputStream常用方法：
   1. int read()：从输入流中读取单个字节的数据；如果已到达文件末尾，则返回 -1。
    2. int read(byte[] b)：从输入流中将最多b.length个字节的数据读入一个byte数组中，以整数形式返回存入数组中的实际字节个数；如果已到达文件末尾，则返回 -1。
    3. void close()：关闭此文件输入流并释放与此流有关的所有系统资源。
4. 输出类： OutputStream抽象类是所有输出字节流类的直接或间接父类，FileOutputStream是其重要子类：
5. FileOutputStream常用构造方法：
   1. FileOutputStream(File file) ：通过File对象创建FileOutputStream对象。
   2. FileOutputStream(String name) ：通过文件（非“目录”）路径创建FileOutputStream对象。
   3. FileOutputStream(File file, boolean append)：通过File对象创建FileOutputStream对象；第二个参数如果为true ，则字节将被写入文件的末尾而不是开头。
6. FileOutputStream常用方法：
   1. void write(int b)：将指定的单个字节数据写入此文件输出流。
   2.  void write(byte[] b, int off, int len)：将byte数组中从off开始的len个字节写入此文件输出流。
    3. void flush()：刷新字节输出流并强制写出缓冲内所有字节数据。
    4. void close()：关闭此文件输出流并释放与此流有关的所有系统资源。
  > 注： FileOutputStream(File file) 、 FileOutputStream(String name) 或FileOutputStream(File file, false)创建FileOutputStream对象时会创建一个新的空文件；如果使用FileOutputStream(File file, true)创建FileOutputStream对象，则只在第一次执行时创建一个新的空文件。


```java
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
public class Test {
	public static void main(String[] args) {
		try {
			FileOutputStream fos = new FileOutputStream("D:\\image.jpg",true);//创建FileOutputStream对象的同时创建一个空文件；但因为第二个参数为true，所以再次执行该行代码不会创建新文件。
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
```

```java
//输入输出字节流，单个字节
import java.io.*;
public class Test {
	public static void main(String[] args) {
		FileInputStream inputStream = null;
		FileOutputStream outputStream = null;
		try {
			inputStream = new FileInputStream("C:\\存在.flac");
			outputStream = new FileOutputStream("D:\\存在.flac", true);//File类构造输出流，其中第二个参数设置为true（即将字节写入文件末尾处，而不是写入文件开始处）
			int byteData;
			while ((byteData = inputStream.read()/*逐个读取输入流中的数据*/) != -1) {
				outputStream.write(byteData);//向输出流中逐个存入字节
			}
			outputStream.flush();//刷新字节输出流并强制写出缓冲内所有字节数据。
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();//关闭并释放资源
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (outputStream != null) {
				try {
					outputStream.close();//关闭并释放资源
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
```

```java
//借助字符数组提高效率
import java.io.*;
public class Test {
	public static void main(String[] args) {
		FileInputStream inputStream = null;
		FileOutputStream outputStream = null;
		try {
			inputStream = new FileInputStream("C:\\存在.flac");
			outputStream = new FileOutputStream("D:\\存在.flac", true);
			byte[] bufferArray = new byte[1024];
			int validBufferLength = 0;
			while ((validBufferLength = inputStream.read(bufferArray)/*设置局部变量缓冲数组bufferArray，read方法会将字节保存到该数组中并返回实际写入bufferArray数组的元素个数，这样减少了循环次数，提高了复制效率。*/) != -1) {
				outputStream.write(bufferArray, 0, validBufferLength);
			}
			outputStream.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
```
#####  2. 缓冲流
1. 定义：缓冲流是一种装饰器类，目的是让原字节流、字符流新增缓冲的功能以提高读取或写入。
2. 缓冲字节输入流：
BufferedInputStream(InputStream in)：
3. 缓冲字节输出流：
BufferedOutputStream(OutputStream out)：

```java
import java.io.*;
public class Test {
	public static void main(String[] args) {
		BufferedReader bufferedReader = null;
		BufferedWriter bufferedWriter = null;
		try {
			FileReader fileReader = new FileReader("C:\\笔记.txt");
			bufferedReader = new BufferedReader(fileReader);
			FileWriter fileWriter = new FileWriter("D:\\笔记.txt",true);
			bufferedWriter = new BufferedWriter(fileWriter);
			String oneLineData;
			while ((oneLineData = bufferedReader.readLine()) != null) {
				bufferedWriter.write(oneLineData);
				bufferedWriter.newLine();
			}
			bufferedWriter.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (bufferedWriter != null) {
				try {
					bufferedWriter.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}

```
#####  3. 转换流
1. 定义：由于文件自身编码方式和程序运行时使用的默认编码方式不一致，致使程序读取或输出字符文件时可能会出现乱码，这时可以使用字节流操作文件，然后再将字节流转换成字符流，这一转换过程可以借助转换流实现。
2. InputStreamReader（字节输入流->字符输入流）：
InputStreamReader(InputStream in) ： 
InputStreamReader(InputStream in, String charsetName)：
3. OutputStreamWriter（字节输出流->字符输出流）：
OutputStreamWriter(OutputStream out) ：
OutputStreamWriter(OutputStream out, String charsetName) 

```java
import java.io.*;
public class StreamToReaderTest {
	public static void main(String[] args) {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(System.in));
			System.out.print("请输入你今天最想说的话：");
			String words = reader.readLine();
			System.err.println(words);
		} catch (IOException e) {
			System.out.println(e.getMessage());
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}

```

```java 
import java.io.*;
public class Test {
	public static void main(String[] args) {
		BufferedReader bufferedReader = null;
		BufferedWriter bufferedWriter = null;
		try {
			FileInputStream fileInputStream = new FileInputStream("C:\\笔记.txt");
			InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream,"GBK");
			bufferedReader = new BufferedReader(inputStreamReader);
			FileOutputStream fileOutputStream = new FileOutputStream("D:\\笔记.txt");
			OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream,"GBK");
			bufferedWriter = new BufferedWriter(outputStreamWriter);
			String oneLineData;
			while ((oneLineData = bufferedReader.readLine()) != null) {
				bufferedWriter.write(oneLineData);
				bufferedWriter.newLine();
			}
			bufferedWriter.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			if (bufferedWriter != null) {
				try {
					bufferedWriter.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}

```
#####  4. 数据流
通过DataInputStream和DataOutputStream数据流可以直接操作基本数据类型和字符串。

```java
import java.io.*;

public class Test {

	public static void main(String[] args) throws IOException {
		// 写入数据
		DataOutputStream outputStream = null;
		try {
			double[] priceArray = { 5.2, 7.3, 1.5, 6.7, 8.0 };
			outputStream = new DataOutputStream(new FileOutputStream("D:\\price.data"));
			for (int i = 0; i < priceArray.length; i++) {
				outputStream.writeDouble(priceArray[i]);
			}
			outputStream.flush();
		} finally {
			if (outputStream != null) {
				outputStream.close();
			}
		}

		// 读取
		DataInputStream inputStream = null;
		try {// 从文件中读数据
			inputStream = new DataInputStream(new FileInputStream("D:\\price.data"));
			while (true) {
				double price = inputStream.readDouble();
				System.out.println("单价为：" + price);
			}
		} catch (EOFException e) {
			System.out.println("数据读取完毕......");
		} finally {
			if (inputStream != null) {
				inputStream.close();
			}
		}
	}
}

```









