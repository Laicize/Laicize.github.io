---
title: 详解AOP的实现及执行流程
date: '2019-07-16 09:22:23 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: Spring
tags:
  - AOP的实现
  - AOP的执行流程
abbrlink: 50530
---
#  AOP的简单介绍
AOP（Aspect Oriented Programming 面向切面编程）是一种通过运行期动态代理实现代码复用的机制，是对传统OOP(Object Oriented Programming，面向对象编程 )的补充。目前，Aspectj是Java社区里最完整最流行的AOP框架，在Spring 2.0以上版本中可以通过Aspectj注解或基于XML配置AOP。
#  建立AOP实例工程
##  工程结构如下图所示
![工程结构](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190716172425.png)

**ICalculatorService的源码如下：**
```java
package com.jd.calculator;

public interface ICalculatorService {
	int mul(int a, int b);		
    int div(int a, int b) ;
}
```
**CalculatorService的源码如下：**
```java
package com.jd.calculator.imp;

import org.springframework.stereotype.Service;

import com.jd.calculator.ICalculatorService;
@Service
public class CalculatorService implements ICalculatorService{
	@Override
	public int mul(int a, int b) {
		System.out.println(this.getClass().getName()+"：The mul method begins.");
		System.out.println(this.getClass().getName()+"：Parameters of the mul method： ["+a+","+b+"]");
		int result = a*b;
		System.out.println(this.getClass().getName()+"：Result of the mul method："+result);
		System.out.println(this.getClass().getName()+"：The mul method ends.");
		return result;
	}

	@Override
	public int div(int a, int b) {
		System.out.println(this.getClass().getName()+"：The div method begins.");
		System.out.println(this.getClass().getName()+"：Parameters of the div method： ["+a+","+b+"]");
		int result = a/b;
		System.out.println(this.getClass().getName()+"：Result of the div method："+result);
		System.out.println(this.getClass().getName()+"：The div method ends.");
		return result;
	}

}
```
**CalculatorAspect的源码如下：**
```java
package com.jd.calculator.imp;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
@Aspect
@Component
public class CalculatorAspect {
	@Before("execution(int mul(int ,int))")
	public void before(JoinPoint jp) {
		Object object = jp.getTarget();
		Object [] args = jp.getArgs();
		String methodName = jp.getSignature().getName();
		System.out.println(object.getClass().getName()+"：The "+methodName+" method begins.");
		System.out.println(object.getClass().getName()+"：Parameters of the "+methodName+" method： ["+args[0]+","+args[1]+"]");		
	}
	public void after(JoinPoint jp) {
		Object object = jp.getTarget();
		String methodName = jp.getSignature().getName();
		System.out.println(object.getClass().getName()+"：The "+methodName+" method ends.");
	}
}
```
**Test源码如下：**
```java
package com.jd.test;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.jd.calculator.ICalculatorService;

public class Test {
	public static void main(String[] args) {
		@SuppressWarnings("resource")
		//获取管理Bean的IOC容器
		ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("application.xml");
		//获取容器中相关的类,符合条件，设置动态代理类
		ICalculatorService calculatorService = applicationContext.getBean(ICalculatorService.class);
		int result = calculatorService.mul(1, 2);
		System.out.println("---->" + result);
		applicationContext.close();//关闭容器
	}
}
```
**application.xml的源码如下：**
```java
<beans>
	<context:component-scan base-package="com.jd"></context:component-scan>
	<aop:aspectj-autoproxy proxy-target-class="false"></aop:aspectj-autoproxy>
</beans>
```
##  代码注解释义
1. @Aspect：将该类声明为切面类
2. @Component与@Service：将该类对象放入IOC容器
3. @Before("execution(public int com.jd.calculator.CalculatorService.*(..))")：前置增强（又称前置通知）即在目标方法执行之前执。
4. @After("execution(public int com.jd.calculator.CalculatorService.*(..))")：后置增强（又称后置通知）：在目标方法执行后执行，无论目标方法运行期间是否出现异常。注意：后置增强无法获取目标方法执行结果，可以在返回增强中获取。
##  application.xml配置文件释义
```java
<context:component-scan base-package="com.jd"></context:component-scan>
```
> 注：扫描com.jd包下的所有类，根据注解创建对象，放在IOC容器中。

```java
<aop:aspectj-autoproxy proxy-target-class="false"></aop:aspectj-autoproxy>
```
>  配置自动代理，proxy-target-class="false"：默认为false:即设置代理为jdk动态代理，若改为true，则  设置代理为cglib动态代理
>Spring的jar包已经包括了cglib的asm和cglib的jar包，所以不需要引入这两个包即可使用cglib动态代理。
##  AOP 的执行流程
```java
<aop:aspectj-autoproxy proxy-target-class="false"></aop:aspectj-autoproxy>
```
在执行以上配置时：找到Aspect注解的类（CalculatorAspect）-->找到类中注解的方法获取注解属性值（@Before("execution(int mul(int ,int))")）-->扫描所有类及类中方法-->找到符合注解属性的方法-->为该方法的类设置动态代理
> 注：1. 可有通过IOC容器获取该动态代理。applicationContext.getBean(ICalculatorService.class);
>2. 获取动态代理类时传入ICalculatorService.class，而不是CalculatorService.class是因为AOP默认采用jdk的动态代理（采用的是继承机制），而目标类CalculatorService.class与jdk动态代理 类不满足继承关系。
>3. 若配置文件中配置proxy-target-class="true"，则获取动态代理类时传入ICalculatorService.class
或CalculatorService.class都可以，原因是该配置修改AOP的动态代理为cglib动态代理（采用继承机制），动态代理类与这两个类都存在继承关系。
