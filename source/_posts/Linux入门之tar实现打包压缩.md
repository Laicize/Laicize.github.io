---
layout: post
title: Linux入门之tar实现打包压缩
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - tar
  - 打包压缩
abbrlink: 2120
---
本文介绍了tar工具实现打包压缩
<!--more-->
## 一：三个压缩命令（只压缩文件）
# 1）gzip   ：

mkdir  /fire

vim  /file/1.txt

Jafjf
Agsa

cp  /fire/1.txt   /fire/2.txt

cp  /fire/1.txt   /fire/3.txt

gzip  /fire/1.txt     :即实现压缩（特点原文件不复存在，只有压缩文件，后缀名为.gz）

gzip   -d  /fire/1.txt.gz    :实现解压缩

### 2）bzip2  ：

bzip2  /fire/2.txt     :即实现压缩（特点原文件不复存在，只有压缩文件，后缀名为.bz2）

bzip2   -d  /fire/2.txt.bz2    :实现解压缩

### 3）xz  ：

xz  /fire/3.txt     :即实现压缩（特点原文件不复存在，只有压缩文件，后缀名为.xz）

xz   -d  /fire/3.txt.xz    :实现解压缩

## 二：tar ：创建打包文件（整理零散文件，备份）

tar  cf  打包文件名  原文件

tar   cf  /tmp/file01.tar    /fire/    :打包/fire目录下文件至/tmp目录下，包为file01.tar。（c;创建文件 f：文件）

tar   xf   /fire/file01.tar      ；解包至当前路径下

tar   xf   /fire/file01.tar  -C   /tmp/     ；解包至tmp路径下

tar   tvf   /fire/file01.tar      ；不解包却显示包内文件名

### 1）调用gzip

tar  czf   /tmp/file01.tar.gz   /etc/    :将/etc下文件压缩打包放在/tmp目录下

tar   xzf   /tmp/file01.tar.gz   -C  /etc/    :解压包并放在/etc目录下（不指定路径，则解包于当前目录下）

### 2）调用bzip2

tar  cjf   /tmp/file02.tar.bz2   /etc/    :将/etc下文件压缩打包放在/tmp目录下

tar   xjf   /tmp/file02.tar.bg2   -C  /etc/    :解压包并放在/etc目录下（不指定路径，则解包于当前目录下）

### 3）调用xz

tar  cJf   /tmp/file02.tar.xz   /etc/    :将/etc下文件压缩打包放在/tmp目录下

tar   xJf   /tmp/file02.tar.xz   -C  /etc/    :解压包并放在/etc目录下（不指定路径，则解包于当前目录下）（压缩率依次增高）

把日期当文件名

tar  czf   /tmp/$(date +%F).tar.gz   /etc/   : 把日期设为包名









