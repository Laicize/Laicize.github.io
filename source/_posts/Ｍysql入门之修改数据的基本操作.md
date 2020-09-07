---
layout: post
title: Mysql入门之修改数据的基本操作
author: 菠菜
cetegroies: Mysql入门
tags: '-Mysql修改数据'
abbrlink: 49703
---
本文主要讲述了Mysql中的修改数据的的操作
<!--more-->
## Mysql中的概念
数据库表中数据进行的添加、删除和修改操作均属于数据库操纵语言（DML），这类类型的SQL语句需要执行commit数据控制语言（DCL）才能使之起作用，执行rollback数据控制语言（DCL）才能撤销DML语言操作，MySQL数据库执行DML后默认自动执行commit操作；
> 注：可以通过set autocommmit=0;取消ＭｙＳＱＬ的自动提交，在语句后添加commit进行手动提交。
```mysql
create table student(
	id char(36) primary key,
	name varchar(8) not null,
	mobile char(11),
	address varchar(150)
)

set autocommit = 0;
insert into student(id,name,mobile,address) 
values ('9b4435ec-372c-456a-b287-e3c5aa23dff4','Tom','12345678901','北京海淀');
commit;
```
##  1. 添加数据
第一种方法：