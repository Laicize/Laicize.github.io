---
title: 初识Mybatis之工程搭建
date: '2019-07-15 12:00:33 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: SSM
tags:
  - Mybatis
  - 简单工程搭建
abbrlink: 41542
summary:
---
# 什么是Mybatis？
简介：MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs(Plain Old Java Objects,普通的 Java对象)映射成数据库中的记录。[贴个官网][http://www.mybatis.org/mybatis-3/]
> 简而言之：MyBatis是对jdbc的进一步封装，让我们能以oop的编程思维对待数据库。

好处： 为了和数据库进行交互，通常的做法是将SQL语句写在Java代码中，SQL语句和Java代码耦合在一起不利于后期维护修改，而MyBatis能够帮助我们将SQL语句和Java代码分离，方便了后期因需求变动而对SQL语句进行修改。（联系properties文件的作用）

# 利用Mybatis建立初步的简单工程（通过xml文件配置）
1. 下载MyBatis相应jar包：https://github.com/mybatis/mybatis-3/releases
2. 创建Java工程，导入MyBatis jar包（mybatis-3.4.4.jar）和数据库驱动包
3. 建立工程的源码如下：
**mybatis-config的配置文件如下**
```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	 <environments default="dev">
		<environment id="dev">
			<transactionManager type="JDBC"></transactionManager>
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver"></property>
				<property name="url" value="jdbc:mysql://127.0.0.1:3306/test"></property>
				<property name="username" value="root"></property>
				<property name="password" value="root"></property>
			</dataSource>
		</environment>
		<environment id="test">
			<transactionManager type="JDBC"></transactionManager>
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver"></property>
				<property name="url" value="jdbc:mysql://127.0.0.1:3306:keeper"></property>
				<property name="username" value="root"></property>
				<property name="password" value="root"></property>
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="area.xml"></mapper>
	</mappers>
</configuration>
```
> 该配置文件主要配置数据库的连接
> 可以配置多个数据库的链接，通过environments中default属性值和environment标签中的属性值的相匹配来确定连接哪一个数据库。
> 通过mappers标签引入sql语句及其相关配置
> DOCTYPE 语句的作用是加载相关文件，使你的ide能够智能提示相关标签，属性。

**area.xml的源码如下**
```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zzu.area.IAreaDao">
	<select id="select" resultType="java.lang.String">
		select name from area where code =#{code}
	</select>
</mapper>
```
> 注：DOCTYPE语句的作用同上
> namespace属性用来匹配该sql语句作用的接口
> select标签表示查看的sql语句，id属性指明该sql语句作用的方法。resultType属性指明该方法的返回值类型

**IAreaDao的源码如下：**
```java
package com.zzu.area;

public interface IAreaDao {
	public String select(String code);
}
```
**Test类的源码如下：**
```java
package com.zzu.test;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.zzu.area.IAreaDao;

public class Test {
	public static void main(String[] args) throws IOException {
		/**
		 *1.先获取配置资源 
		 *2.获取sqlsessionfactory对象 
		 *3. 获取sqlSession对象 
		 *4. 获取dao层的代理类 
		 *5. 调用方法
		 */
		
		 InputStream inputStream =
		 Resources.getResourceAsStream("mybatis-config.xml"); SqlSessionFactory
		 sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);//获取SqlSession对象，代表与数据库的一次会话，用完需要关闭。注意：由于SqlSession为非线程安全的，所以该变量应定义为局部变量，不要定义成全局变量
		 SqlSession sqlSession = sqlSessionFactory.openSession(); IAreaDao areaDao =
		 sqlSession.getMapper(IAreaDao.class); String name = areaDao.select("370982");
		 System.out.println(name); sqlSession.close();
	}
}

```
> 代码理解见注释
