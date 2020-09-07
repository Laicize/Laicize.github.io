---
layout: post
title: 郑州大学安装锐捷实现校园网连接
author: 菠菜
catalog: true
cetegories: linux
tags:
  - linux入门
  - ｌinux通过锐捷连接校园网
abbrlink: 25043
---

ubuntu通过锐捷连接校园网

<!--more-->  

第一步：关闭为wifi，打开网络设置（右上角找到网络标志右击），设置好静态ip和网关，dns
第二部：下载锐捷的linux版，（郑大的可以道网络管理中心下载），提取到当前文件夹（可以命令行解压或右击解压或提取）
第三步：![这里写图片描述](https://img-blog.csdn.net/20180812101225742?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)右击在终端打开。
第四步（非常关键）：执行chmod  +x  rjsupplicant.sh （为该文件增加执行权限）
第五步：![这里写图片描述](https://img-blog.csdn.net/20180812102216935?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)注：-u 后面是用户名 -d 后面加密码
