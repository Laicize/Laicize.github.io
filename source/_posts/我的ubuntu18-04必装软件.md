---
title: 我的ubuntu18.04必装软件
author: 菠菜
img: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
top: false
cover: false
coverImg: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
toc: true
mathjax: true
tags:
  - 装机
  - 软件
summary: 介绍我ubuntu下感觉好用的软件
categories: ubuntu18.04
abbrlink: 18774
date: 2020-03-29 17:24:05
---

## 先换国内源

可以在软件和更新中选择源.

## 输入法

```shell
sudo apt-get install fcitx-bin      #安装fcitx-bin
sudo apt-get update --fix-missing   #修复fcitx-bin安装失败的情况
sudo apt-get install fcitx-bin      #重新安装fcitx-bin
sudo apt-get install fcitx-table    #安装fcitx-table
im-config
```

## 常用下载工具

```shell
# 安装git
sudo apt-get install git
# 安装vim/curl/wget
sudo apt install -y vim curl wget
#安装并配置aria2
sudo apt-get install aria2
sudo mkdir /etc/aria2  #新建文件夹
sudo touch /etc/aria2/aria2.session   #新建session文件
sudo chmod 777 /etc/aria2/aria2.session   #设置aria2.session可写
sudo vi /etc/aria2/aria2.conf    #创建并编辑配置文件
sudo aria2c --conf-path=/etc/aria2/aria2.conf#开启
#安装you-get
sudo apt-get install python3-pip
sudo pip3 install --upgrade pip
 pip3 install you-get
```

#### /etc/aria2/aria2.conf 的内容

```shell
##此部分主要分为几部分##
#1、文件保存
#2、下载链接
#3、进度保存
#4、RPC相关
#5、BT\PT下载相关

##===================================##
## 文件保存相关 ##
##===================================##

# 文件保存目录
dir=/home/wang/Downloads/aria2/

# 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M
disk-cache=16M
# 断点续传
continue=true
#日志保存
log=aria2.log

# 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc
# 预分配所需时间: none < falloc ? trunc < prealloc
# falloc和trunc则需要文件系统和内核支持
# NTFS建议使用falloc, EXT3/4建议trunc, MAC 下需要注释此项
file-allocation=trunc


##===================================##
## 下载连接相关 ##
##===================================##

# 最大同时下载任务数, 运行时可修改, 默认:5
max-concurrent-downloads=100
# 同一服务器连接数, 添加时可指定, 默认:1
# 官方的aria2最高设置为16, 如果需要设置任意数值请重新编译aria2
max-connection-per-server=16

# 整体下载速度限制, 运行时可修改, 默认:0（不限制）
max-overall-download-limit=0
# 单个任务下载速度限制, 默认:0（不限制）
max-download-limit=0
# 整体上传速度限制, 运行时可修改, 默认:0（不限制）
max-overall-upload-limit=0
# 单个任务上传速度限制, 默认:0（不限制）
max-upload-limit=0

# 禁用IPv6, 默认:false
disable-ipv6=false

# 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M
# 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
min-split-size=10M

# 单个任务最大线程数, 添加时可指定, 默认:5
# 建议同max-connection-per-server设置为相同值
split=16

##===================================##
## 进度保存相关 ##
##===================================##

# 从会话文件中读取下载任务
input-file=/etc/aria2/aria2.session
# 在Aria2退出时保存错误的、未完成的下载任务到会话文件
save-session=/etc/aria2/aria2.session
# 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
save-session-interval=60


##===================================##
## RPC相关设置 ##
##此部分必须启用，否则无法使用WebUI
##===================================##

# 启用RPC, 默认:false
enable-rpc=true
# 允许所有来源, 默认:false
rpc-allow-origin-all=true
# 允许外部访问, 默认:false
rpc-listen-all=true
# RPC端口, 仅当默认端口被占用时修改

#rpc-listen-port=6800
# 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项
#rpc-secret=000789456

# 设置的RPC访问用户名, 此选项新版已废弃, 建议改用 --rpc-secret 选项
#rpc-user=wang
# 设置的RPC访问密码, 此选项新版已废弃, 建议改用 --rpc-secret 选项
#rpc-passwd=<PASSWD>

# 启动SSL
# rpc-secure=true
# 证书文件, 如果启用SSL则需要配置证书文件, 例如用https连接aria2
# rpc-certificate=
# rpc-private-key=

##===================================##
## BT/PT下载相关 ##
##===================================##

# 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
follow-torrent=true
# BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999
listen-port=51413
# 单个种子最大连接数, 默认:55
#bt-max-peers=55
# 打开DHT功能, PT需要禁用, 默认:true
enable-dht=true
# 打开IPv6 DHT功能, PT需要禁用
enable-dht6=true
# DHT网络监听端口, 默认:6881-6999
dht-listen-port=6881-6999

# 本地节点查找, PT需要禁用, 默认:false
bt-enable-lpd=true
# 种子交换, PT需要禁用, 默认:true
enable-peer-exchange=true
# 每个种子限速, 对少种的PT很有用, 默认:50K
bt-request-peer-speed-limit=50K

# 客户端伪装, PT需要
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77

# 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0
seed-ratio=0
# 强制保存会话, 即使任务已经完成, 默认:false
# 较新的版本开启后会在任务完成后依然保留.aria2文件
force-save=true
# BT校验相关, 默认:true
#bt-hash-check-seed=true
# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true
# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
bt-save-metadata=true
# 单个种子最大连接数, 默认:55 0表示不限制
bt-max-peers=0
# 最小做种时间, 单位:分
# seed-time = 60
# 分离做种任务
bt-detach-seed-only=true
#BT Tracker List ;下载地址：https://github.com/ngosang/trackerslist
bt-tracker=udp://tracker.coppersurfer.tk:6969/announce,udp://tracker.internetwarriors.net:1337/announce,udp://tracker.opentrackr.org:1337/announce
```

## 终端

```shell
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 推荐主题ys
vim ~/.zshrc 
#找到主题修改主题为ys即可
ZSH_THEME-"YS"
#修改zsh路径
export ZSH=''/home/wang/.oh-my-zsh'
# 常用别名
alias c='clear'
alias ls='ls --color=auto'
alias ll='ls -la'
alias grep='grep --color=auto'
alias mkdir='mkdir -pv'
alias rm='sudo rm -r'
alias chmod='sudo chmod'
```

> 注意:别名的=两侧不能有空格,否则报错.

### Java/Tomcat/Maven的环境配置

```shell
#.zshrc中的配置
#set java env
export JAVA_HOME=/usr/lib/jvm/java1.8   
export JRE_HOME=${JAVA_HOME}/jre   
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib    
export PATH=${JAVA_HOME}/bin:$PATH
source   ~/.zshrc
# ~/.bashrc的配置
sudo  vim  ~/.bashrc
#set java env
export JAVA_HOME=/usr/lib/jvm/java1.8   
export JRE_HOME=${JAVA_HOME}/jre   
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib    
export PATH=${JAVA_HOME}/bin:$PATH
#tomcat的配置
sudo chmod 755 -R apache-tomcat-8.5.31
sudo vi startup.sh
#set java environment
export JAVA_HOME=/usr/local/jdk1.8
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:%{JAVA_HOME}/lib:%{JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
#在.zshrc中添加
#tomcat
export TOMCAT_HOME=/usr/local/apache-tomcat-8.5.31
#maven的配置
sudo vi /etc/profile 
export M2_HOME=/usr/local/apache-maven-3.5.3
export PATH=${M2_HOME}/bin:$PATH
source /etc/profile
mvn -v
```

## 电源管理

```shell
sudo add-apt-repository ppa:slimbook/slimbook
sudo apt update
sudo apt install slimbookbattery
```

## 垃圾清理

```shell
sudo add-apt-repository ppa:oguzhaninan/stacer
sudo apt-get update
sudo apt-get install stacer
```

> stacer还可以查看内存,软件包,cpu,软件源等信息.

## 启动器

```shell
sudo sh -c "echo 'deb http://download.opensuse.org/repositories/home:/manuelschneid3r/xUbuntu_18.04/ /' > /etc/apt/sources.list.d/home:manuelschneid3r.list"
wget -nv https://download.opensuse.org/repositories/home:manuelschneid3r/xUbuntu_18.04/Release.key -O Release.key
sudo apt-key add - < Release.key
sudo apt-get update
sudo apt-get install albert
```

> Albert类似MacOS的聚焦

## 其他软件

1. 浏览器

   1. google
   2. 火狐

2. 音乐

   1. 网易云音乐

3. 交际

   1. QQ(官网或者github找wine版本)
   2. 微信(github的wine版本)

4. 备份

   1. TimeShift

5. 翻译

   1. github的有道词典
   2. 谷歌插件

6. 文本编辑

   1. vim
   2. Typora
   3. vscode

7. IDE

   1. [JetBrains](https://blog.jetbrains.com/cn/),学习邮箱注册,正版免费
   2. ecplise
   3. AndroidStudio

8. 办公

   1. wps for linux
   2. xmind

9. 其他下载器

   1. Motrix
   2. 百度网盘

10. 图床工具

    1. picgo

11. 终端

    1. 下拉式终端:guake

12. 数据库工具

    1. navicat

13. 截图工具

    1. shutter
    2. deepin截图工具(应用商店可以下载)

14. 图片处理

    1. gimp

    

    