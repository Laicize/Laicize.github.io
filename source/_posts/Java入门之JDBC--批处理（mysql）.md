---
layout: post
title: Ｊava入门之JDBC中的批处理
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - JDBC中的s批处理
abbrlink: 40244
---
本文讲述了Java中的JDBC中的批处理。
<!--more-->
###  Mysql中的事件（批处理）
```Mysql
create table account(
  id char(36) primary key,
  card_id varchar(20) unique,
  name varchar(8) not null,
  money float(10,2) default 0
)
set autocommit(false);//取消自动提交
insert into account 
values('6ab71673-9502-44ba-8db0-7f625f17a67d','1234567890','张三',1000);
insert into account (id,card_id,name) 
values('9883a53d-9127-4a9a-bdcb-96cf87afe831','0987654321','张三');
commmit;//手动提交
```
> 注：在数据相关的情况下，我们存在多条指令需要同时成功或同时失败的需求，所以存在事件的概念（批处理）。mysql默认是自动提交的，而oracle数据库默认不是自动提交。
###  JDBC中的批处理操作
```java
package rejdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Jdbc {
	public static void main(String[] args) {
		Connection connection = null;
		Statement statement = null;
		// 获取驱动
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e3) {
			e3.printStackTrace();
		}

		// 获取连接
		try {
			connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test", "root", "root");
			// 事务批处理数据
			connection.setAutoCommit(false);
			statement = connection.createStatement();
			statement.addBatch("update account set money = money-100 where card_id='1234567890'; ");//借助addBatch存储数据
			statement.addBatch("update account set money = money + 100 where card_id ='0987654321';");
			statement.executeBatch();
			connection.commit();
			System.out.println("YES");
		} catch (SQLException e2) {
			if (connection != null) {
				try {
					connection.rollback();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			e2.printStackTrace();
			System.out.println("NO");
		} finally {
			if (statement != null) {
				try {
					statement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

			if (connection != null) {
				try {
					statement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}

	}
}
```
> 注：借助Connection类的setAutoCommit(false)方法取消自动提交，借助connection.commit()手动提交数据。借助connection.rollback();回滚数据，即将没有提交的数据进行第二次操作。

