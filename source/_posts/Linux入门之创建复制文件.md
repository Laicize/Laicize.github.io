---
layout: post
title: Linux入门之创建复制文件
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - 创建复制文件
abbrlink: 54331
---
本文介绍如何在linux中创建复制文件
<!--more-->

#### 1、# du -sh   /etc/passwd  ：准确显示文件大小  
#### 2、 #  du  -ah    /etc/   :目录下每一个文件的大小
#### 3、  创建文件 ：#  touch  /tmp/1.txt    :创建1.txt文件
#### 4、  花括号展开   ：#  touch   /tmp/{1..100}.mp3    :创建1到100个文件

touch  /tmp/{a,b,c,}.jpg      :创建多个后缀相同的文件

mkdir  -p    /temp/2017-{1..10}.txt

#### 5、显示时间：  #  date + 回车

date  +%T   ：时间

date   + %F  ：日期

date   + %H  ：小时

date   +%M  ：分钟

date   +%m  ：月份

date   +%F-%T  ：完整时间

#### 6、命令引用：
​           1）  #   touch  /tmp/$(date +%F-%T).tet  :创建以时间为文件名的文件（$（）引用命令）
​            2）  #  touch  /tmp/`date +%F-%T`.tet  :创建以时间为文件名的文件（反引号引用命令）

#### 7、复制文件 目录：

mkdir  /{linux,window}

touch  /linux/{1,2,3}.txt

cp  /linux/1.txt  /window/

cp  /linux/2.txt  /window/1.jpg   :复制并重命名为1.jpg （只能复制文件）

cp  -r  /linux  /widow/    :-r  复制目录

​        -fn：强制覆盖（文件相同，强制覆盖，不再询问，小心使用）

#### 8、 移动文件目录

mv  源文件   目标文件  ：可以移动文件，目录

mv   /linux/1.txt   /linux/11.txt    :同目录移动，相当于重命名

#### 9、删除文件目录

rm  【option】  文件名称

rm   /linux/11.txt   

rm -r  /linux/    :删除目录（-f：会强制删除，不再询问）

​     （可以将文件移动到特定文件当做删除，用rm时会完全删除，无法找回）

#### 10、 #   wc  -l  /etc/passwd    :统计文件行数