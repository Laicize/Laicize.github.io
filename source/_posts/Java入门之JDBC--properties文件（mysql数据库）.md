---
layout: post
title: Ｊava入门之JDBC中的properties文件（Ｍysql数据库）
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - JDBC中的properties文件
abbrlink: 63991
---
本文讲述了Java中的JDBC中的properties文件。
<!--more-->
### 	properties配置文件
为了后期便于配置管理软件，常将诸如数据库连接配置（url、用户名和密码）、上传文件保存路径等配置信息写在properties文件中。
用法：在src根目录创建properties类型文件。
例如：

```java
//jdbc文档内容如下：
jdbc.username=root
jdbc.password=root
jdbc.driverClass=com.mysql.jdbc.Driver
jdbc.url=jdbc\:mysql\://127.0.0.1\:3306/test?characterEncoding\=utf-8
//Properties文档的运用
import java.io.*;
import java.sql.*;
import java.util.Properties;//引入该文件

public class Test {
	
	static Properties properties = new Properties();//创建Properties类对象
	
	static {
		ClassLoader classLoader = Test.class.getClassLoader();
		//从类加载路径（Java Project对应bin路径；Java Web对应WEB-INF目录classes路径）取得文件的输入流，注意：不能以/开头
		InputStream inputStream = classLoader.getResourceAsStream("conf.properties");
		try {
			properties.load(inputStream);//加载properties类型文件
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		***//通过调用getProperty方法获取properties类型文件中key所对应的数据***
		String url = properties.getProperty("jdbc.url");
		String userName = properties.getProperty("jdbc.username");
		String password = properties.getProperty("jdbc.password");
		String driverClass = properties.getProperty("jdbc.driverClass");
		
		try {
			Class.forName(driverClass);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		try {
			DriverManager.getConnection(url, userName, password);
			System.out.println("数据库连接成功");
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("数据库连接失败");
		}
	}
}

```

