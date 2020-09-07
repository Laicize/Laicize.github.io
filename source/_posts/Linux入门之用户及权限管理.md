---
layout: post
title: Linux入门之用户及权限管理
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - 用户权限
abbrlink: 62534
---
本文讲述linux用户及权限管理
<!--more-->

## 1）多用户多任务操作系统
用户类型
​        管理用户  root
​        普通用户
​                系统用户/程序用户：为了启动某写程序。
uid：1-1000系统用，1000往后用户用，可以在创建用户时制定
用户相关文件：
​      /etc/passwd    :用户信息(每一行即使一个用户信息：登录名，密码占位符，用户组id，用户名，用户bash所在目录。bash沟通用户和内核的应用程序）
​      /etc/shadow   ：用户密码：密码是加密的。
用户：
​    基本组 ：计算机默认将新建用户划分于默认组
​     附加组      ：人为分组，更好团队合作

### 1）创建用户

useradd user1    :用户名尽量用英语（无密码用户不允许登录）（/var/spool/mail/   ：邮件文件）

su - user1  :切换用户（有-时会切换操作环境，无-切换用户，操作环境不变）

useradd -u 2000 user2   :指定uid

grouped caiwu

useradd -g user1 -G caiwu user3  :-g 设定基本组，-G 设定附加组

useradd -s /sbin/nologin -M apache  :（-s ：shell名 -M ：不创建宿主目录）用于创建系统用户

useradd -r mysql  :创建系统用户

useradd -d /tmp/hadoop hadhoop  :-d ：指定用户根目录

​        #userdel -r user1  :删除用户（-r:删除家目录）

id -u user2 ：显示用户uid（-g 用户基本组id，-G ：用户附加组id）

id -u -n user3：显示用户名（-g -n ：显示用户基本组名。-G -n ：用户附加组名）

### 2）查看用户id

id user1  ：会显示用户及组别id

### 3）设置用户密码

passwd  ：更改 当前用户密码

passwd user1 ：为user1修改密码（root用户)

passwd -S user1 :查看用户密码状态

passwd -l user1:锁定密码

passwd -u user1：解锁用户密码

passwd -e user1 :强制密码过期

### 4）修改用户信息

usermod [option] 用户名称

​                -u ：UID
​                -g ：组名称
​                -G ：附加组名称
​                -s ：shell名称

groupadd shichang

usermod -G shichang user1：替换附加组

usermod -aG caiwu user1 ：追加附加组

用户组管理

### 1）创建用户组

groupadd jinji  ：新建用户组

groupdel jinji ：删除用户组

gpasswd -d user1 caiwu ：从财务组中剔除user1.

