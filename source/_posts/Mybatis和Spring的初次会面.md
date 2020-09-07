---
title: Mybatis和Spring的初次会面
date: '2019-07-15 12:00:33 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: SSM
tags:
  - Mybatis与Spring
  - 简单工程搭建
abbrlink: 4955
summary:
---
# Mybatis和Spring的初步整合
1. 下载MyBatis与Spring整合jar包：[点击](https://github.com/mybatis/spring)
2. 创建一个Java工程，导入相应jar包并为该工程创建Spring配置文件：
![图片](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190723220140.png)
3. 各文件源码如下：
4. **application的部分配置文件如下**
```java
	<bean class="com.zaxxer.hikari.HikariDataSource" id ="dataSource" destroy-method="close">
		<property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
		<property name="jdbcUrl" value="jdbc:mysql://127.0.0.1:3306/test"></property>
		<property name="username" value="root"></property>
		<property name="password" value="root"></property>
	</bean>
	<bean class="org.mybatis.spring.SqlSessionFactoryBean">
		<property name="dataSource" value="#{dataSource }"></property>
		<property name="configLocation" value="classpath:mybatis-config.xml"></property>
		<property name="mapperLocations" value="classpath:sql/*.xml"></property>
	</bean>
	<mybatis-spring:scan base-package="com.zzu"/>
```
> 注：这是spring配置文件中bean的配置信息
> 第一个<bean>标签配置了数据库的连接池
> 第二个<bean>标签配置了Mybatis与Spring的结合，主要讲Mybatis中的数据库连接指定为spring配置的数据库的连接。以及加载，mybatis的配置文件及各种sql的配置文件
> classpath:sql/*.xml：表明为当前目录下的sql包下的所有以xml结尾的配置文件
> <mybatis-spring:scan base-package="com.zzu"/>：扫描com.zzu包下的所有接口，并为其创建动态代理，放在Spring的IOC容器中。

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
**mybatis-config的配置文件如下**
```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
</configuration>
```
> 注：即使该mybatis-config的配置文件并没有任何配置<configuration>标签依然不能省去，否则会报错
**IAreaDao的源码如下：**
```java
package com.zzu.area;

public interface IAreaDao {
	public String select(String code);
}
```
**test类的源码如下：**
```java
package com.zzu.test;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.zzu.area.IAreaDao;

public class Test {
	public static void main(String[] args) throws IOException {
		ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("application.xml");
		IAreaDao areaDao = applicationContext.getBean(IAreaDao.class);
		System.out.println(areaDao.getClass().getName());
		applicationContext.close();
	}
}
```
> 注：创建IOC容器
> 获取容器中的类（该类是jdk动态代理类）