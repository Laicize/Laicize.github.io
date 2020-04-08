---
abbrlink: 46530
---
@[toc]
#  AOP的简单介绍
AOP（Aspect Oriented Programming 面向切面编程）是一种通过运行期动态代理实现代码复用的机制，是对传统OOP(Object Oriented Programming，面向对象编程 )的补充。目前，Aspectj是Java社区里最完整最流行的AOP框架，在Spring 2.0以上版本中可以通过Aspectj注解或基于XML配置AOP。
#  建立AOP实例工程
##  工程结构如下图所示
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019071614023511.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
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
		int result = a*b;
		if(result == 0) {
			throw new ArithmeticException("两数之积不能为零");
		}
		return result;
	}
	@Override
	public int div(int a, int b) {
		int result = a/b;
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
	@Pointcut("execution(int mul(int ,int))")//进一步实现代码重用（注解属性的重用）空方法上加入pointcut注解即可
	public void pointCut () {		
	}
	@Before("pointCut ()")
	public void before(JoinPoint jp) {
		Object object = jp.getTarget();
		Object [] args = jp.getArgs();
		String methodName = jp.getSignature().getName();
		System.out.println(object.getClass().getName()+"：The "+methodName+" method begins.");
		System.out.println(object.getClass().getName()+"：Parameters of the "+methodName+" method： ["+args[0]+","+args[1]+"]");		
	}
	@After("pointCut ()")
	public void after(JoinPoint jp) {
		Object object = jp.getTarget();
		String methodName = jp.getSignature().getName();
		System.out.println(object.getClass().getName()+"：The "+methodName+" method ends.");
	}
	@AfterReturning(value = "execution(int mul(int ,int))", returning = "result")
	public void returnAfter(JoinPoint jp , Object result) {
		Object object = jp.getTarget();
		String methodName = jp.getSignature().getName();
		System.out.println(object.getClass().getName()+"：Result of the "+methodName+" method："+result);
	}
	@AfterThrowing(value="execution(int mul(int ,int))", throwing= "e")
	public void afterThrowing (JoinPoint jp, NullPointerException e) {
		Object object = jp.getTarget();
		String methodName = jp.getSignature().getName();
		System.out.println(object.getClass().getName()+"：Result of the "+methodName+" method："+e.getMessage());
	}
}
```
> 注;环绕增强的代码如下：

```java
	@Around("pointCut()")
	public Object process (ProceedingJoinPoint pjp) {
		Object result=null;
		Object[] args = pjp.getArgs();
		Object object = pjp.getTarget();
		String methodName = pjp.getSignature().getName();
		try {
			try {
				System.out.println(object.getClass().getName() + "：The " + methodName + " method begins.");
				System.out.println(object.getClass().getName() + "：Parameters of the " + methodName + " method： ["
						+ args[0] + "," + args[1] + "]");
				result = pjp.proceed();//执行目标方法
			} finally {
				System.out.println(object.getClass().getName()+"：The "+methodName+" method ends.");
			}
		} catch (Throwable e) {
			System.out.println(object.getClass().getName()+"：Result of the "+methodName+" method："+e.getMessage());
		}
		
		return result;
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
5. @AfterReturning(value = "execution(int mul(int ,int))", returning = "result")：返回增强（又称返回通知）：在目标方法正常结束后执行，可以获取目标方法的执行结果。
>  注：返回增强的方法的参数名必须与注解属性returning的值相同

6. @AfterThrowing(value="execution(int mul(int ,int))", throwing= "e")：//异常增强（又称异常通知）：目标方法抛出异常之后执行，可以访问到异常对象，且可以指定在出现哪种异常时才执行增强代码。
>  注：1. 当目标方法抛出的异常与增强方法中的异常不满足继承关系时（增强方法中的异常必须为目标方法中的异常的父类），则异常增强不会触发。
>  2. 上例中如果传入实参为0，和1，触发异常，但不会进行异常增强（ArithmeticException和NullPointerException不为继承关系） 
> 3.  @Before、@After、@AfterRunning和@AfterThrowing修饰的方法可以通过声明JoinPoint 类型参数变量获取目标方法的信息（方法名、参数列表等信息）；@Around修饰的方法必须声明ProceedingJoinPoint类型的参数，该变量可以决定是否执行目标方法；
> 4. @Before,@After,@AfterReturning,@AfterThrowing执行顺序执行过程
>  
>  ···java
>  try {
>  	try {
>  		doBefore();// @Before注解所修饰的方法
>  		method.invoke();// 执行目标对象内的方法
>  	} finally {
>  		doAfter();// @After注解所修饰的方法
>  	}
>  	doAfterReturning();// @AfterReturning注解所修饰的方法
>      } catch (Exception e) {
>      	doAfterThrowing();// @AfterThrowing注解所修饰的方法
>    }

7. @Pointcut("execution(int mul(int ,int))")：进一步实现代码重用（注解属性的重用）空方法上加入pointcut注解即可，即在方法的注解属性中配置pointCut ()即可实现execution(int mul(int ,int)的功能。
8. @Around("execution(public int com.jd.calculator.CalculatorService.*(..))"):环绕增强：目标方法执行前后都可以织入增强处理.
>  注：1. @Around修饰的方法必须声明ProceedingJoinPoint类型的参数，该变量可以决定是否执行目标方法；
>  2. @Before、@After、@AfterRunning和@AfterThrowing修饰的方法没有返回值；而@Around修饰的方法必须有返回值，返回值为目标方法的返回值；


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
##  通过xml文件配置AOP
**xml文件源码及配置释义如下：**
```javva
   <context:component-scan base-package="com.jd"></context:component-scan>
   <!--创建PalculatorAspect和CalculatorAspec的对象-->
	<bean class="com.jd.calculator.imp.PalculatorAspect" id = "PalculatorAspect"></bean>
	<bean class="com.jd.calculator.imp.CalculatorAspect" id = "CalculatorAspect"></bean>
	<!--配置AOP,proxy-target-class="false“设置动态代理的方式”-->
	<aop:config proxy-target-class="false">
		<!--aspect ref="PalculatorAspect"设置Aspect注解类， order="2"设置优先级->
		<aop:aspect ref="PalculatorAspect" order="2">
			<!--pointcut="execution(int mul(int ,int))设置注解属性-->
			<aop:before method="before" pointcut="execution(int mul(int ,int))"/>
		</aop:aspect>
		<aop:aspect ref="CalculatorAspect" order="1">
			<aop:before method="before" pointcut="execution(int mul(int ,int))"/>
		</aop:aspect>
	</aop:config>
```
> PalculatorAspec和CalculatorAspec都对目标方法进行了前置加强

##  AOP中相关概念释义
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190717122638133.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
##  切入点通配符详解

Spring AOP支持如下三种通配符：
1. *：匹配任何数量字符，用于参数列表表示参数可以是任意数据类型，但是必须有参数，例子：
java.*.Date——>匹配java包的下一级子包中的任何Date类型；如匹配java.util.Date、java.sql.Date，但不匹配java.util.sql.Date；
java.lang.*e——>匹配任何java.lang包下的以e结尾的类型，如匹配java.util.Hashtable、java.util.Date等等；

2. ..：方法中表示任意数量参数，在包中表示当前包及其子包，例子：
java..*——>匹配java包及其任何子包下的任何类型，如匹配java.lang.String、java.lang.annotation.Annotation等等；

3. +：匹配指定类型的子类型（不是子类）；仅能作为后缀放在类型模式后边，例子：
java.lang.Number+——>匹配java.lang包下任何Number的子类型，如匹配java.lang.Integer、java.math.BigInteger等等；
java.util.List+——>匹配java.util.List接口实现类，如匹配java.util.ArrayList，但不匹配java.util.HashMap

> 注：execution切入点表达式的语法： 
语法：
execution([修饰符] 返回值类型 [包名.类名/接口名.]方法名([参数])[异常])，
说明：
a、该表达式用于指定匹配的方法；
b、修饰符包括访问权限和static、final以及synchronized；
c、红色中括号框起的部分可以省略。


