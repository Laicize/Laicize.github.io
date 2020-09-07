---
layout: post
title: Mysql入门之字段类型
author: 菠菜
catalog: true
cetegories: mysql入门
tags:
  - mysql入门
  - mysql入门之字段类型
abbrlink: 41290
---
本文讲述了mysql中的字段类型
<!--more-->
#### 1. 整数类型
1. tinyInt：很小的整数。
2. smallint：小的整数。
3. mediumint：中等大小的整数。
4. int(integer)：普通大小的整数。
####  2. 小数类型
1. float(m,d)：单精度浮点数,m表示数字长度，d表示小数位数，例如float(5,2)最大值999.99。
2. double(m,d)：双精度浮点数。
3. decimal(m,d)：压缩严格的定点数。
####  3.日期类型
1. year：YYYY  1901~2155
2. time：HH:MM:SS  -838:59:59~838:59:59
3. date：YYYY-MM-DD 1000-01-01~9999-12-3
4.  datetime：YYYY-MM-DD HH:MM:SS 1000-01-01 00:00:00~ 9999-12-31 23:59:59
5. timestamp：YYYY-MM-DD HH:MM:SS  1970~01~01 00:00:01 UTC~2038-01-19 03:14:07UTC.
>注：timestamp：TIMESTAMP列用于INSERT或UPDATE操作时记录日期和时间。如果你不分配一个值，表中的第一个TIMESTAMP列自动设置为最近操作的日期和时间。也可以通过分配一个NULL值，将TIMESTAMP列设置为当前的日期和时间。并且timestamp有时间范围的限制，目前1970年之前月2037年之后的时间都不能使用timestamp.
####  4. 文本二进制类型（不常用）
1. **CHAR(M)**：M为0~255之间的整数，**空间长度不可变，多用来存储长度一定的数据（身份证号码，电话号码等）**
2. **VARCHAR(M)**：M为0~65535之间的整数，**空间长度可变，存储长度可变的信息（地址等长度不确定）**
3. TINYBLOB：允许长度0~255字节
4. BLOB：允许长度0~65535字节
5. MEDIUMBLOB：允许长度0~167772150字节
6. LONGBLOB：允许长度0~4294967295字节
7. TINYTEXT：允许长度0~255字节
8. TEXT：允许长度0~65535字节
9. MEDIUMTEXT：允许长度0~167772150字节
10. LONGTEXT：允许长度0~4294967295字节
11. VARBINARY(M)：允许长度0~M个字节的变长字节字符串
12. BINARY(M)：允许长度0~M个字节的定长字节字符串。
 





