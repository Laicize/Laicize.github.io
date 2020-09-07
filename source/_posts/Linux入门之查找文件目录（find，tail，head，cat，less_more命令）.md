---
layout: post
title: 'Linux入门之查找文件目录（find,tail,head,cat,more,less命令）'
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - '查找文件目录（find,tail,head,cat,more,less命令）'
abbrlink: 59853
---
本文讲述了Linux入门之查找文件目录（find,tail,head,cat,more,less命令）
<!--more-->
## 1、cat命令（适用于文件内容较少）
  1）cat   /etc/fstab    :查看该文件内容
  cat  -n  /etc/fstab    :对文件内容编行号

## 2、查看未知内容文件
  1）more/less   :分页显示文件内容（较大文件）
​    more：enter建；按行加载内容，空格：按屏加载（不能倒退），q退出
   less：enter建；按行加载内容，空格：按屏加载，方向键上下控制（可倒退），q退出

## 3、head命令

head  /etc/passwd   :显示文件前十行

head  -n  3   /etc/passwd    :显示文件前3行

## 4、tail命令与head用法相似，从文件末查看
（注：该4个命令只能查看txt文本文件， ，其实命令即是可执行文件

## 5、查看文件类型

file  /etc/passwd    :查看passwd文件类型

##　6、支持管道

head  -n  5   /etc/passwd   |   tail  -n  1    :查看文件第五行

ls  -lhs   /etc/   |   head  -n  5   :显示etc下最大的四个文件名（第一行是文件大小，不显示文件名）

ls  -lt   /etc/    |     head  -n  10  :显示etc下最近修改的10个文件

ifconfig   |   head  -n  2     :显示ifconfig内容的前2行

## 7、查找文件

find  路径  查找方式 

按文件名查找：
​                    #   find    /etc/   -name  "*.conf"     :查找etc目录下按名称查找以.conf结尾文件。
​                    #   find    /etc/   -name  "*.conf"   | wc  -l  ：满足条件的文件数目
按文件大小查找：
​                    #   find    /etc/   -size   +1M   :etc目录下大于1M的文件（-1M：小于1M的文件，无符号：1M：刚好1M的文件）
按时间查找文件：
​                    #    find  /   -mtime   +7     :查找所有7天前改过的文件（-7：7天内改过的，无无符号类型）（注：Ctrl +c  ：强制结束当前命令）
按文件类型查找：(d,b,l,c,-)
​                   #    find  /dev/   -type  b    :查找dev文件下的块文件。
​                   #   find   /  -mtime  -7   -a  -size   +100k     :（-a  :命令参数并列 ）查找7天内改动并且大于100k的文件
​                   #   mkdir   /bj
​                   #  touch   /bj/{1..100}.txt 
​                   #  touch   /bj/{1..100}.jpg
​                   #  find  /bj/   -name  "*.txt"  -exec  rm  -rf  {}  \;     :找到bj目录下的以。txt结尾的文件并产出（-exec：执行的意思  rm  -rf  {}  ：移除的命令其中{}代表前面命令找到的文件  \；  ：结束标志）
​                    #  touch  /bj/{1..100}.txt
​                    # find  /bj/  -name  "*.txt"   exec   cp  {}  /tmp  \;   :找到bj目录下的以。txt结尾的文件并复制到/tmp目录下

