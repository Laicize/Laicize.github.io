---
layout: post
title: Ubuntu18.04平台下用github搭建个人博客（含域名绑定和更换主题）
author: 菠菜
catalog: true
cetegories: github和ｈexo搭建个人博客
tags:
  - 个人博客
  - ｎｅｘｔ主题
abbrlink: 14996
---
本文讲述了Ubuntu18.04平台下用github搭建个人博客（含域名绑定和更换主题）
<!--more-->

## 1.hexo简介

Hexo 是一个博客框架，用来生成静态网页。

## 2.安装git

    $ sudo apt-get install git-core



## 3.安装Node.js
1）安装nvm（用来安装Node.js）
安装依赖包
```shell
$ sudo apt-get update
$ sudo apt-get install build-essential libssl-dev
```
第一种方式，根据curl

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash

第二种方式，根据wget

    $ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash

>注：使用nvm --help查看是否安装成功
2）重启终端执行以下命令

    $ nvm install stable
## 4.安装Hexo

    $ npm install -g hexo-cli

1）建站

     $ hexo init <folder>
     $ cd <folder>
     $ npm install
>注：folder是你建的文件夹名，可任意取名，默认是hexo

2）生成静态页面

    hexo g
3）启动服务器

    hexo s
>注：hexo命令是在你建立的博客文件目录下执行，这时候就可以用浏览器打开网址： http://localhost:4000/ 来进行预览了。

## 5.注册GitHub账号

新建一个repositories，**格外注意：repositories名字必须为用户名.github.io**

## 6.配置ssh

1）执行下面命令生成SSH

    ssh-keygen


>注：三次回车之后，可以生成id_rsa.pub文件，这里面就是SSH key的内容，然后使用vim编辑器打开这个文件

    vim ~/.ssh/id_rsa.pub
>注之后把里面的内容都拷贝下来，打开github，点击右上角自己的头像，点击settings，再点击SSH，之后添加new ssh key，最后把复制的信息都粘贴进去，title随便写，最后输入以下命令判断SSH是否配置好：

    ssh -T git@github.com




如果出现

    Hi! You've successfully authenticated, but GitHubdoes not provide shell access.



就表示你已经配置好了SSH 

![在这里插入图片描述](https://img-blog.csdn.net/20180923161548948?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
## 7. 配置 Git 个人信息
设置Git的user name和email：(如果是第一次的话)

    git config --global user.name "github用户名"
    git config --global user.email "你注册的邮箱地址"



生成密钥

    ssh-keygen -t rsa -C "你注册的邮箱地址"



 配置Deployment
在_config.yml文件中，找到Deployment，然后按照如下修改：

    deploy:
    type: git
    repo: git@github.com:用户名/用户名.github.io.git
    branch: master


最后执行以下命令：

    hexo clean
    hexo g
    hexo d



"用户名".github.io就可以访问你的博客了。
## 8.换成next主题

    $ cd your-hexo-site
$ git clone https://github.com/iissnan/hexo-theme-next themes/next

启用主题，与所有 Hexo 主题启用的模式一样。 当 克隆/下载 完成后，打开 站点配置文件， 找到 theme 字段，并将其值更改为 next。

启用 NexT 主题
theme: next
到此，NexT 主题安装完成。下一步我们将验证主题是否正确启用。在切换主题之后、验证之前， 我们最好使用 hexo clean 来清除 Hexo 的缓存。
更详细的请参看（nexT的官方文档）[http://theme-next.iissnan.com/getting-started.html]

## 9.绑定域名
1）获取github的IP

    $ ping www.用户名.github.io

2）购买域名（以阿里云为例）
进入控制台，点击域名后的解析，添加解析，
如图![在这里插入图片描述](https://img-blog.csdn.net/20180923161813128?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
3）GitHub解析
在Github的xxx.github.io项目,进入【Settings】标签页,在【Custom domain】功能中,将刚刚申请的域名写进去。
![在这里插入图片描述](https://img-blog.csdn.net/20180923161831171?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


结语：至此个人简单博客就搭建完成了。
>注：我搭建博客遇到的坑
1）域名必须实名认证才可以生效
2）第一次使用域名必须使用https（GitHub强制要求的），即是输入域名前写上https：//
3）配置主题时一定要找官方文档，我根据博客设计高档主题时总会出点错误。

