---
layout: post
author: 菠菜
title: Mysql入门之简介
cetegories: Mysql入门
tags: '-Mysql入门 －简介'
abbrlink: 22376
---
本文讲述Mysql入门中简介。
<!--more-->
####  1. 数据库概述
1. 定义：数据库是存储数据的仓库，本质是一个文件系统，数据按照特定的格式将数据存储起来，用户通过SQL语句对数据库中数据进行增加、删除、修改和查询等操作。
2. 数据库管理系统（DataBase Management System，简称DBMS）：一种操作盒管理数据库的大型软件，用于建立、使用和维护数据库，对数据库进行统一管理和控制，以保证数据库的安全性和完整性。用户通过数据库管理系统访问并管理数据库中表内的数据。
3. 表（table）：数据库中最重要的对象，用于存储数据，由行（记录）和列（字段）组成。
4. 常见的数据库
   1.  MySQL：开源免费的数据库，小型数据库。MySQL已经被Oracle收购，从MySQL6.x开始不再免费；MySQL：开源免费的数据库，小型数据库。MySQL已经被Oracle收购，从MySQL6.x开始不再免费；
    2. Oracle：收费的大型数据库，Oracle公司的产品；
    3. DB2：IBM公司的收费数据库产品，常应用在银行系统中；
   4.  SQLServer：MicroSoft 公司收费的中型数据库，C#、.net等语言常使用；
   5. SyBase：Sybase公司的高性能数据库，提供一个非常专业数据建模的工具PowerDesigner，已经淡出历史舞台；
     5. SQLite : 嵌入式的小型数据库，应用在手机端。
  5. Mysql数据库的管理工具
      1. SQLyog：一个快速而简洁的图形化管理MYSQL数据库的工具，由业界著名的Webyog公司出品；
       2. Navicat：一套快速、可靠并价格相宜的数据库管理工具，专为简化数据库的管理及降低系统管理成本而设；支持多达 7 种语言，被公认为全球最受欢迎的数据库管理工具；Navicat针对不同数据库管理系统又有对应的分支： Navicat Premium、Navicat for MySQL、Navicat for Oracle、Navicat for SQLite、Navicat for SQLServer、 Navicat for PostgreSQL等等，其中Navicat Premium 最为强大，支持连接MySQL、Oracle、PostgreSQL、SQLite 及 SQL Server等数据库。
 ####   2.SQL语句
 1. 按功能分类：
    1. 数据定义语言（DDL Data Definition Language） ：创建、修改或删除数据库中表、视图、索引等对象的操作，常用命令为create、alter和drop；
    2. 数据查询语言（DQL Data Query Language） ：按照指定的组合、条件表达式或排序检索已存在的数据库中数据，不改变数据库中数据，常用命令为select；
    3. 数据操纵语言（DML Data Manipulation Language） ：向表中添加、删除、修改数据操作，常用命令有insert、update和delete；
    4. 数据控制语言（DCL Data Control Language） ：用来授予或收回访问数据库的某种特权、控制数据操纵事务的发生时间及效果、对数据库进行监视等操作，常用命令有GRANT、REVOKE、COMMIT、ROLLBACK；
 >注：
>1. SQL语句可以单行书写，也可以多行书写，以分号结尾；
>2. SQL语句通常使用空格和缩进增强语句的可读性；
>3. SQL语句不区分大小写，建议关键字大写，例如：SELECT * FROM user；
>3. SQL语句使用/**/或#进行注释；
####  3. 数据库操作
1. 创建数据库：create database 数据库名 [ character set 字符集 ] ;
2. 查看MySQL数据库管理系统中所有数据库:show databases;查看某个数据库的定义信息:show create database 数据库名，例子：show create database keeper;
3. drop database 数据库名称;
例子：drop database keeper。
4. 修改数据库编码：alter database 数据库名 character set 编码;
       例如：alter database test character set utf8;
5. 切换数据库：use 数据库名;
例如：use venus;
6. 查看正在使用的数据库:select database();


     


