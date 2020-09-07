---
layout: post
title: Linux入门之创建复制文件
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - 创建复制文件
abbrlink: 54332
---

## ﻿1、目录创建：

<!--more-->

#### 1）切换目录：cd  /home/wang（绝对路径）
​                      cd  /home/
​                      cd  /wang/(相对路径）
​                     cd  ..（返回上一级目录）

#### 2）创建目录：# mkdir  /tmp/bj   (在tmp下创建bj文件夹）

mkdir  sh（当前目录下创建sh文件）

​			mkdir -p /uplooking/linux(递归创建目录，即uplooking目录也一起创建）
## 2、文件管理
#### 1）查看文件

ls 【option】目录

                     # ls 查看当前目录下的文件
                      #ls /tmp/ 查看tmp下文件
选项：
-l  ：文件详细信息
​                  # ls -l （文件名 ，最后一次修改日期，大小，用户名，用户组名，类型+权限   ）
 -：文件  d：目录  l：软连接文件（快捷方式)  c
:字符设备文件（键盘）  b：块设备文件（硬盘，u盘）   
-h ：文件大小变化单位(可读）
​       # ls   -lh /etc/passwd
   -a :显示所有文件(以.开头的文件）
-t ：按降序将文件按修改时间排序（最近改动的在后面）
-s  ：把文件按大小排序
