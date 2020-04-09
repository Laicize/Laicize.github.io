---
title: ubuntu18.04打包备份
author: 菠菜
img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
top: false
cover: false
coverImg: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
toc: true
mathjax: true
tags:
  - ubuntu18.04
  - 备份
summary: 在ubuntu18.04下通过tar打包备份系统
categories: ubuntu18.04
abbrlink: 65245
date: 2020-03-29 19:26:38
---

## 备份系统

### 清除无用软件

```shell
# 清理旧版本的软件缓存
sudo apt-get autoclean
# 清理所有软件缓存
sudo apt-get clean
# 删除系统不再使用的孤立软件
sudo apt-get autoremove
```

### 备份系统

```shell
#备份前先切换到root用户，避免权限问题
$ sudo su
再切换到/（根目录）
# cd /
#备份系统
tar -cvpzf /media/Disk/myDisk/ubuntu_boot_backup@`date +%Y-%m-%d`.tar.gz /boot
tar -cvpzf /media/Disk/myDisk/ubuntu_backup@`date +%Y-%m+%d`.tar.gz --exclude=/proc --exclude=/tmp --exclude=/home --exclude=/lost+found --exclude=/media --exclude=/mnt --exclude=/run -P /
```

### 还原系统

```shell
$ sudo su
再切换到/（根目录）
# cd /
还原
tar -xvpzf /media/Disk/myDisk/ubuntu_backup@2016-6-6.tar.gz -C /
```

> 备份boot/home/root都一样
>
> 也可以使用TimeShift软件,[参见另一篇博文](http://www.wenke.ink/posts/18774.html)

