---
layout: post
title: Ｊava入门之反射
author: 菠菜
catalog: true
cetegories: Ｊava入门
tags:
  - Java入门
  - 反射
abbrlink: 206
---
本文讲述了Java中的反射
<!--more-->
###  1. 反射的基础知识
1. 定义：Java反射（Reflection）是一种新的**操作类中成员变量、构造方法和普通方法的机制**，为了实现对成员变量、构造方法和普通方法的操作，我们需要借助Java自身提供的**java.lang包下的Class类和java.lang.reflect包下的反射API**。
2. class类：Class类是Java 反射机制的入口，封装了一个类或接口的运行时信息，通过调用Class类的方法可以获取这些信息。
3. class类的特点：
   1. 该类在java.lang包中；
   2. 该类被final所修饰，即该类不可以被子类继承；
   3. 该类实现了Serializable接口；
   4. 该类的**构造方法被private所修饰，即不能通过new关键字创建该类的对象**；
 ###  2. 反射的运用
#####  1，获取实例化对象
  获取class类实例化对象的方法：
    1. 通过Class类静态forName(“类包名.类名”)获取Class类实例，建议使用这种形式。
    2. 通过使用类名.class获取Class类实例。
    3. 如果是**基本数据类型**，则可以通过包装类.TYPE获取Class类实例，当然，也可以通过基本数据类型.class获取Class类实例。
    4. 如果已创建了**引用类型的对象**，则可以通过调用对象中的 getClass( )方法获取Class类实例。
    5. 通过**元素类型[].class可以获取数组**所对应的Class类实例。
    6. 通过调用某个类的Class实例的getSuperClass()方法可以获取该类超类的Class实例。
 

```java
package csdntest;
import java.lang.reflect.InvocationTargetException;
class Student {
	private int age;
	public Student () {
		System.out.println("jskajfakjf");
	}
	public Student (int age,String name) {
		System.out.println(23);
	}
	private Student (String names) {
		System.out.println("jasjf");
	}
	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
}
public class Test {
	public static void main(String[] args) throws ClassNotFoundException,         NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Student student = new Student();
		student.setAge(12);
		Class clazz = Student.class;//反射是一种处理类中，已知类名
		System.out.println(clazz.getName());
		Class class1 = new Student().getClass();//已知对象名
		System.out.println(class1.getName());
		Class class2 = Class.forName("csdntest.Student");//已知类名
		System.out.println(class2.getName());
		//数组的类名
		Class class3 = String [].class;
		System.out.println(class3.getName());
		//基本数据类型的类名，
		//需用基本数据类型的包装类。
		Class class4 = Integer.TYPE;
		System.out.println(class4.getName());
		Class class5 = Integer.class;
		System.out.println(class5.getName());
		Class class6 = student.getClass().getSuperclass();
		System.out.println(class6.getName());
}
}
```
#####  2.获取构造方法
借助Class类某些可以获取对应类中声明的构造方法实例对象，方法如下：
1. Constructor[] getConstrutors()：返回该Class对象表示类包含的**所有public构造方法*不含继承**所对应Constructor对象数组。
2. Constructor getConstrutor(Class<?>... parameterTypes)：返回与该Class对象表示类中参数列表相匹配的public构造函数（**不含继承**）对应的Constructor对象。
3. Constructor<?>[] getDeclaredConstructors()：返回一个该Class对象表示类中声明的所有构造方法（不区分访问权限）对应的Constructor对象数组。
4. Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)：返回与该Class对象表示类中定义的形参类型相匹配的构造方法（不区分访问权限）的Constructor对象。
#####  3.获取构造方法信息
1. Class<T> getDeclaringClass()：返回声明Constructor对象对应构造方法的类的Class对象。 
2. int getModifiers()：以整数形式返回Constructor对象表示的构造函数的修饰符。
3. String getName() ：以字符串形式返回Constructor对象所表示得构造方法的名称。
4. Class<?>[] getParameterTypes()：返回由Constructor对象所表示的构造方法的形参类型对应**Class对象组成的数组** 。如果构造方法没有参数，则数组长度为0。

```java
package csdntest;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
class Student {
	private int age;
	public Student () {
		System.out.println("jskajfakjf");
	}
	public Student (int age,String name) {
		System.out.println(23);
	}
	private Student (String names) {
		System.out.println("jasjf");
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
}
public class Test {
public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
	Class<Student> clazz = Student.class;//反射是一种处理类中，已知类名
	//获取构造方法
	Constructor [] constructors = clazz.getConstructors();//获取所有构造方法名，返回数组
	for (Constructor<?> constructor : constructors) {
		System.out.println(constructor.getName());
	}
	Constructor [] constructorsd = clazz.getDeclaredConstructors();
	for (Constructor constructor2 : constructorsd) {
		System.out.println(constructor2.getName());	
	}
	Constructor constructor1=clazz.getConstructor();
	Constructor constructor2=clazz.getDeclaredConstructor(String.class);//获取一个构造方法名，忽略访问权限
	Constructor constructor = clazz.getConstructor(Integer.TYPE,String.class);
	int result = clazz.getModifiers();//返回整型变量，再次转换为字符串。
	String str = Modifier.toString(result);
	System.out.println(str);//获得修饰符
	System.out.println(constructor.getDeclaringClass().getName());//类名
	System.out.println(constructor.getName());//方法名
	Class []parameters =constructor.getParameterTypes();//获取参数列表
	for (Class class1 : parameters) {
		System.out.println(class1.getName());
	}
	Object obj = constructor.newInstance(12,"jfalsfjf");//返回类的对象
	System.out.println(obj);	
	}	
}
```
>注：getConstructors()和getConstructor(Class<?>... parameterTypes)方法均无法获取非public类中默认无参构造方法对应的Constructor对象。

```java
import java.lang.reflect.Constructor;
class Student {
}
public class Test {
	public static void main(String[] args) throws Exception {
		Class<Student> clazz = Student.class;
		Constructor<?>[] constructorArray = clazz.getConstructors();
		System.out.println(constructorArray.length);//输出0
		Constructor<Student> constructor = clazz.getConstructor();//该行代码出现“java.lang.NoSuchMethodException: Student.<init>()”异常
		System.out.println(constructor.getName());
	}
}
```
>注：getDeclaredConstructors()和getDeclaredConstructor(Class<?>... parameterTypes)方法可以获取非public类中默认无参构造方法对应的Constructor对象。

```java
import java.lang.reflect.Constructor;
class Student {
}
public class Test {
	public static void main(String[] args) throws Exception {
		Class<Student> clazz = Student.class;
		Constructor<?>[] constructorArray = clazz.getDeclaredConstructors();
		System.out.println(constructorArray.length);//输出1
		Constructor<Student> constructor = clazz.getDeclaredConstructor();
		System.out.println(constructor.getName());//输出Student
	}
}
```
#####  4.通过Constructor类的某些方法创建对象
1. void setAccessible(boolean flag)：调用构造函数时是否忽略访问权限的影响，true表示忽略，false表示不忽略。
2. T newInstance(Object... initargs)：使用此Constructor对象表示的构造方法来创建声明该构造方法类的新对象。initargs为传入该构造方法中的参数，如果该构造方法没有参数，则可设定为null或一个长度为0的数组。

```java
package csdntest;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
class Student {
	private int age;
	public Student () {
		System.out.println("jskajfakjf");
	}
	public Student (int age,String name) {
		System.out.println(23);
	}
	private Student (String names) {
		System.out.println("jasjf");
	}
	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
}
public class Test {
	public static void main(String[] args) throws NoSuchMethodException, SecurityException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		//调用构造方法的步骤。1 获取类名。2.获取构造方法3.调用。
		Class clazz = Student.class;
		clazz.newInstance();//通过该方法只能调用clazz对应的无参方法。若无则出错，该方法返回对象。实质是调用clazz对象对应类的无参gouzaofangfa
		Constructor constructor = clazz.getDeclaredConstructor(String.class);
		constructor.setAccessible(true);//把私有的方法变成可以访问的。
		Object obj = constructor.newInstance("wang");//该方法返回类的对象
	}
}//输出jskajfakjf
//jasjf
```
#####  5.借助Class类某些获取对应类中声明的成员变量实例对象及获取及设置成员变量的值。

##### 获取实例化对象
1. Field[] getFields()：返回一个该Class对象表示类或接口中所有public属性（**含继承的**）对应的Field对象数组。
2. Field getField(String fieldName)：返回该Class对象表示类或接口中与指定属性名（***含继承的***）相同的public 属性对应的Field对象。
3. Field[] getDeclaredFields()：返回一个该Class对象表示类或接口内定义的所有属性（**不含继承的**）对应的Field对象数组，。
4. Field getDeclaredField(String fieldName) ：返回一个与该Class对象表示类或接口内定义的属性名（**不含继承的**）相匹配的属性相对应的Field对象。
######  设置成员变量设置成员变量
  1. void setAccessible(boolean flag)：设置或获取属性值时是否忽略访问权限的影响，true表示忽略，false表示不忽略。
   2. Object get(Object obj)：返回Field表示字段的Object类型的值。obj为该属性所在类创建的对象，如果该属性是静态的，则可设置为null。
    3. void set(Object obj, Object value)：为Field对象表示属性设置新值。obj为该属性所在类创建的对象，如果该属性为静态的则课设置为null;value为该属性新值。

```java
package csdntest;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
class Student extends Person{
public String str;
private int age;
public void doHomework( int age) {
	System.out.println("正在写作业");
}
public void doHomework(String name) throws Exception{
	System.out.println(name+"正在写作业");
}
}
class Person{
public String name;
}
public class Test{
public static void main(String[] args) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException {
	//获取属性
	Class clazz = Student.class;
	Field [] fields = clazz.getFields();//获取类的所有public级别的所有成员变量（包含继承来的public级别的成员变量）
	System.out.println(fields.length);
	fields = clazz.getDeclaredFields();//只获得该Class对象表示类或接口内定义的所有属性（不含继承的）对应的Field对象数组
	System.out.println(fields.length);
	Field fieid = clazz.getDeclaredField("age");
	System.out.println(fieid.getName());
	fieid = clazz.getField("name");
	System.out.println(fieid.getName());//获取public级别的成员变量
	//查看属性
	//1.获取所在类名
	clazz = fieid.getDeclaringClass();
	System.out.println(clazz);
	//获取修饰符
	int rel = fieid.getModifiers();
	String  mol = Modifier.toString(rel);
	System.out.println(mol);
	//获取属性名
	clazz = fieid.getType();
	System.out.println(clazz.getName());
	//设置属性值
	Class clazz2 = Student.class;
	Field field = clazz2.getDeclaredField("str");
	Student student = new Student();
	field.set(student, "wang");//指定对象然后在赋值
	System.out.println(field.get(student));//指明调用那个对象的属性值
	field.setAccessible(true);//操作私有的属性
	field.set(student, "san");//指定对象然后在赋值
	System.out.println(field.get(student));//指明调用那个对象的属性值
   }	
}

/*运行结果：
2
2
age
name
class csdntest.Person
public
java.lang.String
wang
san
*/
```
#####  6.获取及操作普通方法
######  1.获取普通方法
1. Method[] getMethods()：返回一个该Class对象表示类或接口中所有public方法（**含继承的**）对应的Method对象数组。
2. Method getMethod(String methodName, Class<?>... parameterTypes)：返回与该Class对象表示类或接口中方法名和方法形参类型相匹配的public方法（**含继承的**）的Method对象。
3. Method[] getDeclaredMethods()：返回一个该Class对象表示类或接口内声明定义的所有访问权限的方法（**不含继承的**）对应的Method对象数组。
4. Method getDeclaredMethod(String methodName,Class<?>... parameterTypes) ：返回与该Class对象表示类或接口中方法名和方法形参类型相匹配方法（**不含继承的**）对应的Method对象。
```java
package csdntest;
import java.lang.reflect.Method;
class Person{
	public String name;
}	
class Student extends Person{
public String str;
private int age;
public void doHomework( int age) {
	System.out.println("正在写作业");
}
public void doHomework(String name) throws Exception{
	System.out.println(name+"正在写作业");
}
}
public class Test{
public static void main(String[] args) throws NoSuchMethodException, SecurityException {
	//获取方法名
	Class<? extends Student> clazz = new Student().getClass();
	Method [] methods = clazz.getMethods();
	for (Method method : methods) {
		System.out.println(method.getName());
	}
	Method method = clazz.getMethod("doHomework",String.class);
	System.out.println(method.getName());
	method = clazz.getMethod("doHomework",String.class);
	System.out.println(method.getName());	
	}
}
```
######  2.获取普通方法的信息
1. Class<?> getDeclaringClass()：返回声明Method对象表示方法的类或接口的 Class 对象。 
2. int getModifiers()：以整数形式返回此Method对象所表示方法的修饰符。应该使用Modifier类中的toString方法对所返回的整数进行解码（示例见备注）。
3. Class<?> getReturnType()：返回Method对象所表示的方法的返回值类型所对应的Class对象。
4. String getName()：返回方法名。
5. Class<?>[] getParameterTypes()：返回由Method对象代表方法的形参类型对应Class对象组成的数组。如果方法没有参数，则数组长度为 0。
6. Class<?>[] getExceptionTypes()：返回由Method对象表示方法抛出异常类型对应Class对象组成的数组。如果此方法没有在其 throws子句中声明异常，则返回长度为 0 的数组。

```java
package csdntest;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;


class Person{
	public String name;
}
	
class Student extends Person{
public String str;
private int age;

public void doHomework( int age) {
	System.out.println("正在写作业");
}
public void doHomework(String name) throws Exception{
	System.out.println(name+"正在写作业");
}

}

public class Test{
	public static void main(String[] args) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		//获取class对象
		Class clazz = Student.class;
		//获取方法对象
		Method method = clazz.getMethod("doHomework", String.class);
		//获取异常类型
		Class [] claza = method.getExceptionTypes();
		for (Class class1 : claza) {
			System.out.println(class1.getName());
		}
		//获取参数列表，有参数构成的class对象数组
		Class [] classes = method.getParameterTypes();
		for (Class class1 : classes) {
			System.out.println(class1.getName());
		}
		//获取参数列表
		int mod = method.getModifiers();
		String str = Modifier.toString(mod);
		System.out.println(str);
		//调用方法
		method.invoke(new Student(), "小王");//只有对象才可以调用类中方法（必须指明对象）
		//调用私有方法
		//Method method1 = clazz.getMethod("doHomework",)
		
		
	}
}
```

######  3.调用普通方法
1. void setAccessible(boolean flag)：调用方法时是否忽略访问权限的影响，true表示忽略，false表示不忽略。
2. Object invoke(Object obj, Object... args)：调用Method对象指代的方法并返回Object类型结果。obj表示该方法所在类实例，如果方法时静态的则obj可以指定为null; args表示传入该方法的参数，如果方法没有参数，则args数组长度可以为 0 或 null 。

```java
package csdntest;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
class Person{
	public String name;
}	
class Student extends Person{
public String str;
private int age;
public Student (String names) {
	System.out.println("jasjf");
}
public void doHomework( int age) {
	System.out.println("正在写作业");
}
public void doHomework(String name) throws Exception{
	System.out.println(name+"正在写作业");
}

}
public class Test{
	public static void main(String[] args) throws NoSuchFieldException, SecurityException, IllegalArgumentException, IllegalAccessException, NoSuchMethodException, InstantiationException, InvocationTargetException {
		//反射创建对象
		Class clazz = Student.class;
		Constructor constructor = clazz.getConstructor(String.class);
		Object obj = constructor.newInstance("小林");//用构造方法创建对象,并且是个上转型对象
		//私有属性复制
		Field field = clazz.getDeclaredField("age");
		field.setAccessible(true);
		field.set(obj, 21);
		//调用私有方法
		Method method = clazz.getDeclaredMethod("doHomework", String.class);
		method.setAccessible(true);
		method.invoke(obj, "中国.河南");
	}
}
//运行结果如下：jasjf
中国.河南正在写作业
```

#####  7. 动态数组
1. 说明：Java在创建数组的时候，需要指定数组长度，且数组长度不可变。而java.lang.reflect包下提供了一个Array类，通过这些方法可以创建动态数组，对数组元素进行赋值、取值操作。
2. Array类提供的主要方法（均为静态方法）如下：
3. static Object newInstance(Class componentType, int length)：创建一个具有指定的元素类型和长度的新数组。
4. static Object newInstance(Class componentType, int... dimensions)：创建一个具有指定的元素类型和维度的多维数组。
5. static void setXxx(Object array, int index, xxx val)：将指定数组对象中索引元素的值设置为指定的xxx类型的val值。
6. static xxx getXxx(Object array, int index)：获取数组对象中指定索引元素的xxx类型的值。

```java
import java.lang.reflect.Array;
public class Test {
	public static void main(String args[]) {
		try {
			// 创建可存3个数据的字符串数组
			Object arrayObject = Array.newInstance(String.class, 3);
			Array.set(arrayObject, 0, "张三");// 给数组第一个元素赋值
			Array.set(arrayObject, 1, "李四");// 给数组第二个元素赋值
			Array.set(arrayObject, 2, "王五");// 给数组第三个元素赋值
			int length = Array.getLength(arrayObject);// 返回arrayObject数组对象的长度
			for(int i=0;i<length;i++){
				Object name = Array.get(arrayObject, i);// 获取指定索引位置的元素值
				System.out.println(name);
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

```












