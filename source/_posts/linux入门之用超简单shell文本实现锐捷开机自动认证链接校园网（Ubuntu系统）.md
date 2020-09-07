---
layout: post
title: Linux入门之超简单ｓｈｅｌｌ文本实现锐捷开机自动认证链接校园网（ubuntu系统）
author: 菠菜
catalog: true
cetegories: Linux入门
tags:
  - Linux入门
  - shell脚本
  - 开机自动链接校园网本文
abbrlink: 25329
---

本文实现了ubuntu18.04中锐捷开机自动认证校园网

<!--more-->

1.实现锐捷开机自动认证校园网的前提是你已安装好锐捷，并且能够连上校园网。（如果没有连上校园网，请看我的另一篇博客安装锐捷实现校园网链接：https://blog.csdn.net/wang_da_bing/article/details/81604042）。
2.vim /home/auto.sh(用vim新建一个shell脚本，路径可以自己写）

```
#这是shell脚本内容
#！/bin/bash
#这里可以编写shell脚本的一些说明信息
sudo /home/li/rjsupplicant/rjsipplicant.sh -a 1 -d 0 -U user-accont(账户) -p user-password(用户密码)
```
最后保存文件退出。
3.找到Ubuntu自带的启动项管理软件，将你写的shell脚本添加至开机启动程序。至此就实现了开机自启动。
附录：可以用别名简化命令，实现更加便捷的认证如下：

```
alisa ruijie = 'sudo /home/li/rjsupplicant/rjsipplicant.sh -a 1 -d 0 -U user-accont(账户) -p user-password'#这时你就可以通过输入ruijie实现认证，但是当你重启终端时，该命令就失效了，所以我们要把它写入配置文件。
su root #切换至root用户
vim /etc/sudoers
将root ALL ALL=(ALL)ALL下添加上user-name  ALL=（ALL）ALL#这是 让你执行sudo命令时不再输入密码
最后将alisa ruijie = 'sudo /home/li/rjsupplicant/rjsipplicant.sh -a 1 -d 0 -U user-accont(账户) -p user-password'写入~/.bashrc(只对当前用户有效，写入/etc/.bashrc则所有用户都可以用该别名）
```
