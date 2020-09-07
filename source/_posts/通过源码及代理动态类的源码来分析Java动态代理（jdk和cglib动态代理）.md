---
title: 通过源码及代理动态类的源码来分析Java动态代理（jdk和cglib动态代理）
date: '2019-07-15 12:00:33 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: Java
summary: 通过源码及代理动态类的源码来分析Java动态代理（jdk和cglib动态代理）
tags:
  - jdk和cglib动态代理
  - 源码分析
abbrlink: 35819
---
# Java动态代理的定义
1. 释义：简单的说Java的动态代理即为：代理对象 = 增强代码 + 目标对象（原对象）（类似实现了Python中装饰器的作用）
2. 代理的意义：通过代理实现一系列相似操作，解决代码的臃肿问题（类似于现实生活中的中间商，为每一个买家收集好数据）
3. 动态的释义：即该类是在代码执行过程中动态生成的class文件。
4. 动态代理的优点：
     1. 静态代理在程序执行前需手动创建代理类，如果需要很多代理类，每一个都手动创建不仅浪费时间，而且可能产生大量重复性代码，此时我们就可以采用动态代理。
	 1. 动态代理通过InvocationHandler接口invoke方法或MethodInterceptor接口intercept方法为被代理对象中的方法增加额外功能，这种方式比静态代理中通过代理类逐一为被代理对象中的方法增加额外功能，更加的灵活。
# jdk动态代理
## 建立示例工程如下

1.  ICalculatorService接口文件源码
```java
package com.jd.calculator;
public interface ICalculatorService {
	int add(int a,int b);
}
```
2. CalculatorService 类的源码
```java
package com.jd.calculator;
public class CalculatorService implements ICalculatorService {
	@Override
	public int add(int a, int b) {
		int result = a+b;
		return result;
	}
}
```
3. 测试类的源码
```java
package com.jd.test;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import com.jd.calculator.CalculatorService;
import com.jd.calculator.ICalculatorService;
public class Test {
	//动态（程序运行时实现和目标类相同接口的java类）代理（）
	CalculatorService calculatorService;
	public Test(CalculatorService calculatorService) {
		this.calculatorService = calculatorService;
	}
	InvocationHandler h = new InvocationHandler() {
		@Override
		public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
			System.out.println(proxy.getClass().getName());
			System.out.println(method.getDeclaringClass().getName());
			String name = method.getName();//method为m3为ICalculatorService接口中的add方法
			System.out.println(this.getClass().getName()+"：The "+name+" method begins.");
			System.out.println(this.getClass().getName()+"：Parameters of the "+name+" method： ["+args[0]+","+args[1]+"]");
			Object result = method.invoke(calculatorService, args);//调用calculatorService目标类中的add方法
			System.out.println(this.getClass().getName()+"：Result of the "+name+" method："+result);
			System.out.println(this.getClass().getName()+"：The "+name+" method ends.");
			return result;
		}
	};
	public Object get() {//Proxy是jvm自身实现的类，newProxyInstance是该类的一个静态方法，用来产生代理对象。
		return Proxy.newProxyInstance(Test.class.getClassLoader(), new Class[] {ICalculatorService.class}, h);//产生一个动态class类，
	}
	public static void main(String[] args) {
		System.getProperties().put("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");//会生成动态代理类的class文件，通过反编译软件获取动态类的源码
		Test test = new Test(new CalculatorService());
		ICalculatorService proxy = (ICalculatorService) test.get();//获取代理对象
		System.out.println(proxy.getClass().getName());
		int result = proxy.add(1, 1);
		System.out.println("-->"+result);
	}
}
```
与分析有关的各种源码文件（以下的分析执行流程的依据，可在分析之后再来看）
4. 动态代理类$Proxy的源码
```java
package com.sun.proxy;
import com.jd.calculator.ICalculatorService;
import java.lang.reflect.*;
public final class $Proxy0 extends Proxy
    implements ICalculatorService
{
    public $Proxy0(InvocationHandler invocationhandler)
    {
        super(invocationhandler);
    }
    public final boolean equals(Object obj)
    {
        try
        {
            return ((Boolean)super.h.invoke(this, m1, new Object[] {
                obj
            })).booleanValue();
        }
        catch(Error _ex) { }
        catch(Throwable throwable)
        {
            throw new UndeclaredThrowableException(throwable);
        }
    }
    public final String toString()
    {
        try
        {
            return (String)super.h.invoke(this, m2, null);
        }
        catch(Error _ex) { }
        catch(Throwable throwable)
        {
            throw new UndeclaredThrowableException(throwable);
        }
    }
    public final int add(int i, int j)
    {
        try
        {
            return ((Integer)super.h.invoke(this, m3, new Object[] {
                Integer.valueOf(i), Integer.valueOf(j)
            })).intValue();
        }
        catch(Error _ex) { }
        catch(Throwable throwable)
        {
            throw new UndeclaredThrowableException(throwable);
        }
    }
    public final int hashCode()
    {
        try
        {
            return ((Integer)super.h.invoke(this, m0, null)).intValue();
        }
        catch(Error _ex) { }
        catch(Throwable throwable)
        {
            throw new UndeclaredThrowableException(throwable);
        }
    }
    private static Method m1;
    private static Method m2;
    private static Method m3;
    private static Method m0;
    static 
    {
        try
        {
            m1 = Class.forName("java.lang.Object").getMethod("equals", new Class[] {
                Class.forName("java.lang.Object")
            });
            m2 = Class.forName("java.lang.Object").getMethod("toString", new Class[0]);
            m3 = Class.forName("com.jd.calculator.ICalculatorService").getMethod("add", new Class[] {
                Integer.TYPE, Integer.TYPE
            });
            m0 = Class.forName("java.lang.Object").getMethod("hashCode", new Class[0]);
        }
        catch(NoSuchMethodException nosuchmethodexception)
        {
            throw new NoSuchMethodError(nosuchmethodexception.getMessage());
        }
        catch(ClassNotFoundException classnotfoundexception)
        {
            throw new NoClassDefFoundError(classnotfoundexception.getMessage());
        }
    }
}
```
5. 代理类Proxy的部分源码

```java
private static final Class<?>[] constructorParams =
        { InvocationHandler.class };

    public static Object newProxyInstance(ClassLoader loader,
                                          Class<?>[] interfaces,
                                          InvocationHandler h)
        throws IllegalArgumentException
    {
        Objects.requireNonNull(h);

        final Class<?>[] intfs = interfaces.clone();
        final SecurityManager sm = System.getSecurityManager();
        if (sm != null) {
            checkProxyAccess(Reflection.getCallerClass(), loader, intfs);
        }

        /*
         * Look up or generate the designated proxy class.
         */
        Class<?> cl = getProxyClass0(loader, intfs);

        /*
         * Invoke its constructor with the designated invocation handler.
         */
        try {
            if (sm != null) {
                checkNewProxyPermission(Reflection.getCallerClass(), cl);
            }

            final Constructor<?> cons = cl.getConstructor(constructorParams);
            final InvocationHandler ih = h;
            if (!Modifier.isPublic(cl.getModifiers())) {
                AccessController.doPrivileged(new PrivilegedAction<Void>() {
                    public Void run() {
                        cons.setAccessible(true);
                        return null;
                    }
                });
            }
            return cons.newInstance(new Object[]{h});
        } catch (IllegalAccessException|InstantiationException e) {
            throw new InternalError(e.toString(), e);
        } catch (InvocationTargetException e) {
            Throwable t = e.getCause();
            if (t instanceof RuntimeException) {
                throw (RuntimeException) t;
            } else {
                throw new InternalError(t.toString(), t);
            }
        } catch (NoSuchMethodException e) {
            throw new InternalError(e.toString(), e);
        }
    }
```
## 通过源码分析执行过程
```java
System.getProperties().put("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
```
> 注：会生成动态代理类的class文件，通过反编译生成代理类的源码

```java
Test test = new Test(new CalculatorService());
```

> 注：创建test对象

```java
ICalculatorService proxy = (ICalculatorService) test.get();
```
>注：进入get（）方法

```java
return Proxy.newProxyInstance(Test.class.getClassLoader(), new Class[] {ICalculatorService.class}, h);
```
> 注：Proxy是jvm自身实现的类，newProxyInstance是该类的一个静态方法，用来产生代理对象。
> 简单的说就是test类内自己定义的InvocationHandler匿名实现类来实例化Proxy类
> 第一个参数是类加载器（用来产生Proxy类）第二个是目标类实现的接口，第三个参数即为InvocationHandler匿名实现类，用来实例化Proxy类，具体实现过程请参考下面的源码解释

newProxyInstance实现源码如下(有关分析参见注释）
```java
public static Object newProxyInstance(ClassLoader loader,
                                          Class<?>[] interfaces,
                                          InvocationHandler h)
        throws IllegalArgumentException
    {
        Objects.requireNonNull(h);
        Class<?> cl = getProxyClass0(loader, intfs);//获取动态代理类$Proxy
            final Constructor<?> cons = cl.getConstructor(constructorParams);//获取动态代理类$Proxy的构造方法
            final InvocationHandler ih = h;
            if (!Modifier.isPublic(cl.getModifiers())) {
                AccessController.doPrivileged(new PrivilegedAction<Void>() {
                    public Void run() {
                        cons.setAccessible(true);
                        return null;
                    }
                });
            }
            return cons.newInstance(new Object[]{h});//利用test类内自己定义的InvocationHandler匿名实现类来实例化$Proxy类
        } catch (Exception e) {
            throw new InternalError(e.toString(), e);
        }
    }
```
> 注：该部分代码为了更清晰的分析，省去了部分代码，全码请参考第一部分给出的代码
> cons.newInstance(new Object[]{h})语句即调用动态代理类$Proxy的构造方法其源码如下
> ```java
> public $Proxy0(InvocationHandler invocationhandler)
>   {
>        super(invocationhandler);//j将参数invocationhandler（自己定义的InvocationHandler匿名实现类）传递给父类Proxy，调用其构造方法获取实例对象
>    }
> ```
> 父类Proxy的构造方法实现如下：
> ```java
> protected Proxy(InvocationHandler h) {
>       Objects.requireNonNull(h);
>        this.h = h;
>    }
> 
> ```

```java
int result = proxy.add(1, 1);
```
> 注：调用$proxy的add方法，进入add方法,add方法的相关源码如下(执行机理参考代码注释)：

```java
public final class $Proxy0 extends Proxy
    public final int add(int i, int j)
    {
        try
        {
        /*
        *由super(invocationhandler);知道super.h即为我们自己定义的invocationhandler内部类.
        *this也为该内部类
        *由m3 = Class.forName("com.jd.calculator.ICalculatorService").getMethod知m3为ICalculatorService的add方法
        * 第三个参数为传入参数
        */
            return ((Integer)super.h.invoke(this, m3, new Object[] {
                Integer.valueOf(i), Integer.valueOf(j)
            })).intValue();
        }
        catch(Error _ex) { }
        catch(Throwable throwable)
        {
            throw new UndeclaredThrowableException(throwable);
        }
    }
    private static Method m3;
    static 
    {
        try
        {
            m3 = Class.forName("com.jd.calculator.ICalculatorService").getMethod("add", new Class[] {
                Integer.TYPE, Integer.TYPE
            });
        }
        catch(Exception classnotfoundexception)
        {
            throw new NoClassDefFoundError(classnotfoundexception.getMessage());
        }
    }
}
```
>注：由super.h.invoke(this, m3, new Object[] {Integer.valueOf(i), Integer.valueOf(j)}))进入test类中的匿名内部类InvocationHandler中的invoke方法，实现对add方法的修饰

```java
Object result = method.invoke(calculatorService, args);
```
> 注：method为m3为ICalculatorService接口中的add方法，通过反射调用calculatorService目标类中的add方法。

## 工程的执行结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190715135703454.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dhbmdfZGFfYmluZw==,size_16,color_FFFFFF,t_70)
# cglib动态代理
##  CGLib动态代理
释义：程序执行时通过ASM（开源的Java字节码编辑库，操作字节码）jar包动态地为被代理类生成一个代理子类，通过该代理子类创建代理对象，由于存在继承关系，所以父类不能使用final修饰。
## 工程代码如下：
在原工程上修改测试代码如下（解释见代码注释）：
```java
package com.jd.test;

import java.lang.reflect.Method;

import com.jd.calculator.CalculatorService;
import com.jd.calculator.ICalculatorService;

import net.sf.cglib.proxy.Callback;
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;
public class Test {
	static Callback callback = new MethodInterceptor() {
		/*
		*1. 匿名内部类用来实现对目标方法的包装
		*2. 第一个参数是cglib动态代理类的示例对象
		*3.第二个参数为public int com.jd.calculator.CalculatorService.add(int,int),即是目标方法
		*4.第三个参数是方法实参
		*5.第四个参数为动态代理方法
		*/
		@Override
		public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
			String name = method.getName();
			System.out.println(obj.getClass().getName()+"：The "+name+" method begins.");
			System.out.println(obj.getClass().getName()+"：Parameters of the "+name+" method： ["+args[0]+","+args[1]+"]");
			Object result = proxy.invokeSuper(obj, args);//动态代理方法调用动态代理类中的方法
			System.out.println(obj.getClass().getName()+"：Result of the "+name+" method："+result);
			System.out.println(obj.getClass().getName()+"：The "+name+" method ends.");
			return result;
		}
	};
	public static Object get() {
		Enhancer enhancer = new Enhancer();//获取asm包中的加强对象
		enhancer.setSuperclass(CalculatorService.class);//将目标类传给加强类
		enhancer.setCallback(callback);//实现加强类对目标类的包装
		return enhancer.create();//获取cglib动态代理类
	}	
	public static void main(String[] args) {
		ICalculatorService proxy = (ICalculatorService)get();
		int result = proxy.add(1, 1);
		System.out.println(result);
	}
}
```
>注：用cglib时需要引入asm-7.0.jar和cglib-3.2.10.jar的包
>执行过程与原理与jdk的动态代理类似。
执行结果如下图

![执行结果](https://img-blog.csdnimg.cn/20190715164209813.png)
#  jdk与cglib动态代理的区别
1.  JDK动态代理基于接口实现，所以实现JDK动态代理，必须先定义接口；CGLib动态代理基于类实现；
2. JDK动态代理机制是委托机制，委托hanlder调用原始实现类方法；CGLib则使用继承机制，被代理类和代理类是继承关系，所以代理类是可以赋值给被代理类的，如果被代理类有接口，那么代理类也可以赋值给接口。
