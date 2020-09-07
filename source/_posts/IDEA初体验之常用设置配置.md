---
title: IDEA初体验之常用设置配置
date: '2019-07-26 01:29:17 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: IDEA工具
tags:
  - IDEA初体验
  - IDEA的基本配置
abbrlink: 6492
summary:
---

## IDEA的高效率的配置

### 1. 代码提示不区分大小写
代码提示是一个很重要的功能, 如果没有此功能一些较长的方法名, 类等, 很难记住. IDEA 代码提示功能很棒, 但是默认是区分大小写的, 我们记不清一些东西是大写还是小写, 这就比较尴尬了. 所以我们要把这个区分去掉, 设置如下:
将match case的取消掉即可
![配置](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726095337.png)

### 2. 开启自动import包的功能

Java 就是这种包组合在一个的一个东西, 我们在写代码时常常需要引入一些类, 一些第三方的包. 在 eclipse 时我们使用快捷键引入, IDEA 也可以使用 Alt + Enter 进行导入包.

如果我们在写代码时IDE自动帮我们引入相关的包, 是不是很酷的一件事情. IDEA 提供了这个功能, 不过默认是关闭的. 打开自动导入包设置如下:
![配置](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726095657.png)

### 3. 改动过的文件显示*号

如果想让修改时，在文件右边显示*号标志，Settings -> Editor –> General ->Editor Tabs

选中“Mark modifyied tabs with asterisk”
![图片](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726095929.png)

### 4. 设置字体

在2017版，IDEA已经可以直接修改字体了，不必像之前的版本需要先另存。
![设置字体](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726100137.png)

### 5. 让IntelliJ IDEA启动时不打开工程文件
Settings -> Appearance&Behavior -> System Settings标签项里去掉Reopen last project on startup即可
![设置工程](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726100254.png) 

### 6.快捷键提示插件

Key Promoter X 是一个提示插件，当你在IDEA里面使用鼠标的时候，如果这个鼠标操作是能够用快捷键替代的，那么Key Promoter X会弹出一个提示框，告知你这个鼠标操作可以用什么快捷键替代。对于想完全使用快捷键在IDEA的，这个插件就很有用。

安装这个插件很简单，只需要打开Settings,然后找到Plugins那一栏目,然后输入key promoter,如果找不到，就直接到仓库里找即可。如下图：

![图片](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726100421.png)
> 注：安装完插件后重启IDEA即可。如果无法安装这个插件的话，那么你可以到如下网站下载下来，然后使用Install plugins from disk的方式安装。 https://plugins.jetbrains.com/plugin/9792-key-promoter-x

### 7. IDEA设置编辑器背景图片

先贴一个我的编辑环境
![编辑环境](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726100809.png)

设置过程如下：
使用快捷键Ctrl+Shift+A（或者快捷键Shirt+Ctrl+A），输入set关键字就可以看到Set Background Image选项。双击进入设置页面，选择好图片，设置号透明度即可。
![过程如下](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190726101221.png)
