---
layout: post
title: Ｊava入门之ＪDBC中的批处理（Ｍysql）
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - JDBC中的批处理
abbrlink: 62023
---
本文讲述了Java中的JDBC中的批处理。
<!--more-->
###  1.JDBC的基础知识
1. 定义：JDBC全称为Java Database Connectivity，是一种借助Java语言实现数据库连接的技术。
2. JDBC的步骤：
    **方法一：**
    1. 加载驱动程序
     2. 获取数据库连接
    2. 创建statement实例
```java
package rejdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Test {
	public static void main(String[] args) {
		// 加载驱动
		try {
			Class.forName("com.mysql.jdbc.Driver");// 将mysql数据库的jdbc的jar包，放进lib，并且build path复制其驱动位置
		} catch (ClassNotFoundException e3) {
			e3.printStackTrace();
		}
		Connection connection = null;
		Statement statement = null;
		try {
			connection = DriverManager.getConnection("jdbc:mysql//127.0.0.1:3306/test/", "root", "root");// 与数据库创立连接，3306为mysql的端口，root为用户名和密码
			statement = connection.createStatement();// 创建窗口
			int result = statement.executeUpdate("insert into student values ('1','1')");// 返回int类型，可以据其判断是否执行成功
			if (result > 0) {
				System.out.println("YES");
			} else {
				System.out.println("NO");
			}
		} catch (SQLException e2) {
			e2.printStackTrace();
		} finally {// 关闭相应的窗口和连接，释放资源
			if (statement != null) {// 判断是否为空，防止创建窗口出现错误所导致的空指针异常。
				try {
					statement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (connection != null) {// 判断是否为空，防止建立连接出现错误所导致的空指针异常。
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}

```
    > 注：代码中的Statement和Connnection等类都是在相应数据库的jdbc的jar包中封装好的。
**方法二**
    1. 加载驱动程序
    2. 获取数据库连接
    3. 创建PreparedStatement实例 
```java
    String sql = "select * from user_info where user_name like ?";
    PrepareStatement preparement = null;
	preparedStatement = connection.prepareStatement(sql);//connection连接创建的窗口不同
	preparedStatement.setObject(1, "张%");//为问号占位符赋值
```
> 注：PrepareStatement 类继承自Statement类，但是PrepareStatement类是编译预处理的，其运行效率大于StarementL类，并且其可以防止注入。

**方法三**
    1. 加载驱动程序
    2. 获取数据库连接
    3. 创建CallableStatement实例
  

```java
    String sql = "{call get_age(?,?)}";
    callableStatement = connection.prepareCall(sql);
    CallableStatement callableStatement = null; 
	callableStatement.setObject(1, "1984-01-10");//为问号占位符赋值
```
**JDBC的操作**
一： Statement的查询操作

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
	String userName = "root";
	String password = "root";
	String url="jdbc:mysql://127.0.0.1:3306/test";
	connection = DriverManager.getConnection(url, userName, password);
	statement = connection.createStatement();
	resultSet = statement.executeQuery("select * from user_info");//查询的结果存放在resultset中，借助的是excuteQuery方法。
	while(resultSet.next()) {//从resultset中获取数据
		String nameName=resultSet.getString("user_name");
		String mobile = resultSet.getString("mobile");
		System.out.println(nameName+","+mobile);
	}
} catch (SQLException e) {
	e.printStackTrace();
} finally {
	try {
		if(resultSet!=null) {
			resultSet.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}		
	try {
		if(statement!=null) {
			statement.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if(connection!=null) {
			connection.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}

```
二：Statement的修改操作

```java
try {
	Class.forName("com.mysql.jdbc.Driver");
} catch (ClassNotFoundException e) {
	e.printStackTrace();
}
Connection connection = null;
Statement statement = null;
try {
	String userName = "root";
	String password = "root";
	String url="jdbc:mysql://127.0.0.1:3306/test";
	connection = DriverManager.getConnection(url, userName, password);
	statement = connection.createStatement();
	int result = statement.executeUpdate("delete from user_info where name like '%三%'");//修改操作借助excuteUpdate方法，返回int的数据类型，大于0，即操作成功
	if (result>0) {
		System.out.println("删除成功");
	} else {
		System.out.println("删除失败");
	}
} catch (SQLException e) {
	e.printStackTrace();
} finally {		
	try {
		if(statement!=null) {
			statement.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if(connection!=null) {
			connection.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}
```
三：PrepareStatement的查询操作

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
	String url="jdbc:mysql://127.0.0.1:3306/test";
	connection = DriverManager.getConnection(url, "root", "root");
	String sql = "select * from user_info where user_name like ?";
	preparedStatement = connection.prepareStatement(sql);
	preparedStatement.setObject(1, "张%");//为问号占位符赋值
	resultSet = preparedStatement.executeQuery();//与Statement的方法一样，也是返回resultset数据类型
	while(resultSet.next()) {
		String nameName=resultSet.getString("user_name");
		String mobile = resultSet.getString("mobile");
		System.out.println(nameName+","+mobile);
	}
} catch (SQLException e) {
	e.printStackTrace();
} finally {
	try {
		if(resultSet!=null) {
			resultSet.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}		
	try {
		if(preparedStatement!=null) {
			preparedStatement.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if(connection!=null) {
			connection.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}

```
四： ParepareStatement的修改操作

```java
try {
	Class.forName("com.mysql.jdbc.Driver");
} catch (ClassNotFoundException e) {
	e.printStackTrace();
}
Connection connection = null;
PreparedStatement preparedStatement = null;
try {
	String url="jdbc:mysql://127.0.0.1:3306/test";
	connection = DriverManager.getConnection(url, "root", "root");
	String sql = "delete from user_info where user_name like ?";
	preparedStatement = connection.prepareStatement(sql);
	preparedStatement.setObject(1, "张%");//为问号占位符赋值
	int result = preparedStatement.executeUpdate();//与Statement类似
	if (result>0) {
		System.out.println("删除成功");
	} else {
		System.out.println("删除失败");
	}

} catch (SQLException e) {
	e.printStackTrace();
} finally {		
	try {
		if(preparedStatement!=null) {
			preparedStatement.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
	try {
		if(connection!=null) {
			connection.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}
```

      
    
