---
layout: post
title: Ｊava入门之JDBC中的ｓｑｌ注入
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - JDBC中的sql注入
abbrlink: 4239
---
本文讲述了Java中的JDBC中的sql注入。
<!--more-->
#### sql注入
1. 注入的解释：通过将恶意SQL语句插入到特定SQL语句内，使特定SQL语句发生变化，最终达到欺骗数据库服务器使之执行恶意的SQL命令的一种方法。
例如如下代码：
```java
try {
	Class.forName("com.mysql.jdbc.Driver");
} catch (ClassNotFoundException e) {
	e.printStackTrace();
}
Connection connection = null;
Statement statement = null;
ResultSet resultSet = null;
try {
	String url = "jdbc:mysql://127.0.0.1:3306/test";
	connection = DriverManager.getConnection(url, "root", "root");
	statement = connection.createStatement();
	String userName = "王_五";
	String password = "' or '1'='1";//通过or+一个成立的条件，改变原约束条件，进行恶意注入
	String sql = "select * from user_info where user_name='" + userName + "' and password='" + password + "'";
	resultSet = statement.executeQuery(sql);
	if (resultSet.next()) {
		System.out.println("登录成功");
	} else {
		System.out.println("登录失败");
	}
} catch (SQLException e) {
	e.printStackTrace();
} finally {
	try {
		if (resultSet != null) {
			resultSet.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if (statement != null) {
			statement.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if (connection != null) {
			connection.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}
```
2. 解决sql注入问题
借助ParpareStatement类

```java
try {
	Class.forName("com.mysql.jdbc.Driver");
} catch (ClassNotFoundException e) {
	e.printStackTrace();
}
Connection connection = null;
PreparedStatement preparedStatement = null;
ResultSet resultSet = null;
try {
	String url = "jdbc:mysql://127.0.0.1:3306/test";
	connection = DriverManager.getConnection(url, "root", "root");
	String sql = "select * from user_info where user_name=? and password=?";//通过sql语句的？传递参数，防止修改原语句。
	preparedStatement = connection.prepareStatement(sql);
	String userName="王_五";
	String password="' or '1'='1";
	preparedStatement.setObject(1, userName);//为问号占位符赋值
	preparedStatement.setObject(2, password);//为问号占位符赋值
	resultSet = preparedStatement.executeQuery();
	if (resultSet.next()) {
		System.out.println("登录成功");
	} else {
		System.out.println("登录失败");
	}
} catch (SQLException e) {
	e.printStackTrace();
} finally {
	try {
		if (resultSet != null) {
			resultSet.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if (preparedStatement != null) {
			preparedStatement.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if (connection != null) {
			connection.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}

```

