---
layout: post
title: Linux入门之正则表达式
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - grep
  - 正则表达式
abbrlink: 28130
---
本文主要讲述正则表达式

<!--more-->


## １．grep命令

grep    【option】 “pattern” 文件

grep    “root”/etc/passwd      :在passwd查找有root的内容

-i  ：忽略大小写

grep    -i“^r” /tmp/1.txt    :显示以r或R开头的文件内容

-o   ：不再显示整行内容，只显示满足条件的字符内容

grep    -o“r..t“  /etc/passwd   :只显示满足条件的字符串

-v  ：反向过滤（不显示满足条件的内容）

grep   -v   “^#” /etc/fstab      :不显示以#开头的内容

-e     ：使grep支持多种条件删选（一个条件一个-e）

grep    -e    “^#”  -e   "^$"    /etc/fstab    :显示空行和以#开头的内容

grep    -v    -e    “^#”  -e   "^$"    /etc/fstab    :不 显示空行和以#开头的内容

-E    ：支持拓展正则表达式（可以去除转义\符号）

grep  -E“ab{2，5}”  /etc/2.txt     :查找a后面的b出现两次到五次的内容

|   ：或者的含义（在-E的情况下）

grep   -E   “vmx|svm”  /proc/cpuinfo    :查看文件内是否有vmx或svm（判断是否支持虚拟机）

-A n    ：除了显示符合条件行外，还会显示后n行

ifconfig   eth0   |   grep   -A  2 “netmask” ：显示符合条件的行及其后两行。

-B  n   ：除了显示符合条件行外，还会显示前n行

ifconfig   eth0   |   grep   -B  2 “netmask” ：显示符合条件的行及前两行



## 二、正则表达式（正则表达式的元字符）：用一些特殊字符组成字符串代替一类字符
1）匹配单个字符的元字符
.     ：代表任意单字符

grep  “r..t” /etc/passwd     :查找有r  t（中间是任意两个字符）的内容

[ ]  ：指定字符范围    [abc]  :a,b,c中的一个

grep  “r[a,A]t”/tmp/1.txt     :

	- :  表示连续的字符范围 
[a-z]  :26个小写字母中的任一个
[A-Z0-9]  :大写字母或数字中的一个
^  :  用在[]中是取反的意思
[^a-zA-Z0-9]   :表示特殊字符
[：punct：]   :包括标点符号,使用时需再加一个[].

grep  “r[[:punct:]]t”/etc/passwd     :  查找r  t中间是标点的内容

[:space:]   :空格字符（tab也是），,使用时需再加一个[].

grep   “r[[:space:]]t”/etc/passwd     :查找r  t中间是一个空格（或者tab键）的内容

2）匹配字符出现的位置
^  :(用在【】之外）：以什么开头

grep  “^[rbh]”/etc/passwd    :以rbh中任意一个字符开头的文件内容

grep   “^[^rbh]” /etc/passwd     :不以rbh中任意字符开头的内容。

$  :以什么结尾

grep   “bash$” /etc/passwd   :查找以bash结尾的文件内容

grep   “bash$” /etc/passwd   |  wc -l   ：查找以bash结尾的文件内容并显示其有多少行

^ $  : 空行（没有任意字符空格也算是字符）

grep  “^$”  /etc/passwd  |  wc  -l    :显示空行数目

ls  -l  /etc/   |  grep    “^d”   :etc下的目录（d表示目录）

3）匹配字符出现的次数
​	*:   匹配其前一个字符的任意次数

vim  /etc/2.txt

a
ab
abb
abbb
abbbb
abbbbb
abbbbbb

grep  "ab*"  /etc/2.txt  :找到a后面有任意个b（可以为0个）的内容

？  ：前一个字符最多出现一次（可有可无）（需加上\转义使用）

grep  “ab\?” /etc/2.txt   :找到有a，或ab的内容

+   ：前一个字符有一次或多次（需加上\转义使用）
grep  “ab\+” /etc/2.txt   :找到a后面最少有一个b的内容

{n}  ：精确出现n次（注：都需与\转义使用）

grep  “ab\{2\}”  /etc/2.txt     :查找a后面的b出现两次的内容

{n，m} ：精确出现n到m次（注：都需与\转义使用）

grep  “ab\{2，5\}”  /etc/2.txt     :查找a后面的b出现两次到五次的内容

{，m}    ：最多出现m次（注：都需与\转义使用）

grep  “ab\{，2\}”  /etc/2.txt     :查找a后面的b最多出现两次的内容

{n，}     :最少出现n次，多的不限（注：都需与\转义使用）

grep  “ab\{2，\}”  /etc/2.txt     :查找a后面的b最少出现两次的内容

### 4：分组（把多个字符当做一个使用）
（）：小括号内的字符会被当做一个字符处理

grep  “(ab)\{2,\}” /usr/share/dict/words     :查找文件中ab至少出现2次的内容

