---
layout: post
title: dell游匣笔记本安装win１０和ubuntu双系统详解（英伟达显卡）
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - 英伟达显卡
  - Ｄｅｌｌ游匣
  - win１０和ubuntu双系统
abbrlink: 21821
---
本文讲述了dell游匣笔记本安装win10和ubuntu双系统详解（英伟达显卡）
<!--more-->
一：修改BIOS设置，使双系统可以更加方便的切换
1 开机+f12，进入BIOS
2 进入BIOS setup，选择system configuration,![这里写图片描述](https://img-blog.csdn.net/20180805100643993?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)选择SATA，进一步选择AHCI
3，保存，选择secure ，进入secure boot enable，![这里写图片描述](https://img-blog.csdn.net/20180805100618273?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)选择dis，运用，退出
二：安装win10系统
1进入磁盘管理划分出装Ubuntu系统的磁盘。
三：装Ubuntu系统
1 插入Ubuntu启动盘，从SMI USB DISK 进入（在win10命令提示设定下，此时会有UEFI:WDCJ10JPVX-75....)![这里写图片描述](https://img-blog.csdn.net/20180805100248353?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
2选择第二个选项install Ubuntu进入![这里写图片描述](https://img-blog.csdn.net/20180805100544952?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
3按照提示装好Ubuntu（注：英伟达显卡与Ubuntu系统不兼容，会出现巨卡的现象，下一步解决）
4卡的话，关机，拔掉u盘，开机，在第一个选项（*Ubuntu）处按e，这里写图片描述进入
5在splash后面的空格再加上nouveau.modeset=0,按f10，进入Ubuntu![这里写图片描述](https://img-blog.csdn.net/20180805100323487?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
6打开Ubuntu软件，找到驱动更新，下载英伟达驱动。
四 结束

