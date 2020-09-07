---
layout: post
author: 菠菜
title: Mysql入门之表的操作
cetegories: Mysql入门
tags: '-Mysql入门 －表的操作'
abbrlink: 63865
---
本文讲述Mysql入门中的表的相关操作
<!--more-->
## 操作表
#### １．　创建表
语法：
```mysql
create table teacher(
	id char(36) primary key auto_increment comment '主键',
	user_name varchar(12) not null comment '用户名’ ,
	password char(32) unique comment '密码',
	sex int(1) default 0 comment '性别’,
    unique(user_name)
        )
```
> 注：表中字段之间用逗号分开，但是最后一个字段无逗号

释义：
1. permary key:主键约束。该约束强制字段或字段组合必须具有唯一性且每个字段不能为空。可以为字段级别约束，也可以为表级别约束。
2. comment:注释。
3. default 0:默认为０．
4. auto_incremenrt：设置表字段自增长，默认从1开始.
5. not null：指定字段不能为空，只能定义为**字段级约束**；
6. 指定字段的值（或字段组合的值）对于表中所有的行必须是唯一的。对于无非空约束的字段，唯一键约束允许输入空值，而且可以含有多列为null。可以为字段级别约束，也可以为表级别约束，表级约束时可以定义复合唯一键。（复合唯一键，是与的关系，条件全部一致方为重合键）
> 注：ＭｙＳＱＬ数据库通过约束防止无效数据的注入，约束分为字段级约束和表级约束。（字段级约束：只为单个字段添加约束。表级约束：为一个或多个字段添加约束）
#### 2. 外键 
oreign key：指定一个字段或字段组合作为一个外键（即外来的主键或唯一键），该外键和另一个表的主键或唯一键（MySQL不支持，Oracle支持）建立起一个关系，只能定义为表级约束.
> 注：建立两个表之间的联系，可以防止数据冗余，并且外键无法在原表中被删除，无法向含有外键的表无法添加外检中不存在ｉd的信息（两个表格相互约束）
```mysql
＃　创建用户信息表
create table user_info(
  id char(36) primary key,
  user_name varchar(30) not null,
  password varchar(30) not null
)
insert into user_info (id,user_name,password) values ('51b28fe1-4ebf-41ac-a17b-d5e276861fd0','fuliuqingfeng','123456');
＃　创建地址表
create table address(
  id char(36) primary key,
  user_info_id char(36),
  real_name varchar(8) not null,
  mobile char(11) not null,
  address varchar(150) not null,
  constraint address_user_info_id_fk foreign key(user_info_id) references user_info(id)
)
insert into address (id,user_info_id,real_name,mobile,address) 
values ('bfb9472a-7911-4e6f-a479-3b719454ebab','51b28fe1-4ebf-41ac-a17b-d5e276861fd0','高焕杰','12345678901','河南');
insert into address (id,user_info_id,real_name,mobile,address) 
values ('5227c6b9-45a2-44aa-8ac0-1f63a38d3b65','51b28fe1-4ebf-41ac-a17b-d5e276861fd0','高焕杰','12345678901','北京');
insert into address (id,user_info_id,real_name,mobile,address) 
values ('30b8584b-aa6a-4516-a623-03f487058586','51b28fe1-4ebf-41ac-a17b-d5e276861fd0','高焕杰','12345678901','山西');
```
> 注：这种方案为user_info_id添加了外键，指向user_info表的主键，该约束起到了保护数据完整性的作用：如果删除的用户信息id已经在address表中使用，则该条数据无法删除；无法向address表中添加用户id不存在的地址信息。
## 2. 修改表字段
1. 添加字段：
```mysql
alter table table_name 
add column_name data_type [default default_value] [column_constaint] [after 字段名] [comment 'comment_content’];
# 例子
alter table user_info
      int(1) default 0 after password add sex ;#向user_info表添加新字段sex，该字段在password之后。
```
2. 修改字段
```mysql
alter table table_name
       modify column_name data_type [default default_value] ;
例子：
       ALTER TABLE user_info 
       MODIFY user_name varchar(15);
```
>　注：字段的修改包括修改数据类型（只有对应列为空指才可以修改）、大小和默认值(默认值的修改只会影响后来插入表的数据，对之前的数据不会产生影响)；而不能修改字段约束、字段先后顺序和注释。
3. 删除字段
```mysql
 alter table table_name
       drop column_name
例子：
       alter table user_info
       drop sex;
```
>　注：
一次只能删除一个字段；
一个表至少要保留一个字段；
如果所删列(如user_info表中id列)是另一个表的外键（address表user_info_id）则该列（user_info表中id列）无法删除。
4. 重命名表
rename table 旧名字 to 新名字
5. 截断表
truncate table 表名
> 注：截断表后，表中数据也一并被删除，drop不仅用于删除表，表中数据也一并被删除。
6. 删除表
drop table 表名