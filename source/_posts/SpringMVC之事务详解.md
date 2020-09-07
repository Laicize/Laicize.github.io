---
title: SpringMVC之事务详解
date: '2019-07-14 14:38:41 //时间'
author: 菠菜
top: false  //文章是否置顶
cover: false //文章是否在封面轮播
mathjax: true
categories: SpringMVC
summary: 史上最全的SpringMVC的事务详解
tags:
  - 事务的传播
  - 事务的注解
  - 事务的隔离机制
abbrlink: 46560
---
## 一. Spring实现事务管理的两种方式：
### 1. 编程式事务管理：
将事务管理代码嵌入到业务方法中来控制事务的提交和回滚，在编程式管理事务中，必须在每个事务操作中包含额外的事务管理代码。
### 2. 声明式事务管理（推荐）：
大多数情况下比编程式事务管理更好用，它将事务管理代码从业务方法中分离出来，以声明的方式来实现事务管理，Spring声明式事务管理建立在AOP基础之上，是一个典型的横切关注点，通过环绕增强来实现，其原理是对方法前后进行拦截，然后在目标方法开始之前创建或加入一个事务，在执行完毕之后根据执行情况提交或回滚事务，其模型如下：
```java
public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
	try {
		//开启事务
		return joinPoint.proceed();
		//提交事务
	} catch (Throwable e) {
		//回滚事务
		throw e;
	}finally {
		//释放资源
	}
}
```
## 二：实现声明式事务配置的步骤
1. 添加spring-aspects-4.3.10.RELEASE.jar包。
2. 在Spring配置文件中添加如下配置：
```java
<!--对jd包下的类进行扫描-->
<context:component-scan base-package="com.jd"></context:component-scan>
<aop:aspectj-autoproxy proxy-target-class="true" />
<!--数据库连接池及其相关设置-->
<bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="jdbcUrl" value="jdbc:mysql://127.0.0.1:3306/test?characterEncoding=utf8"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
    <!-- 连接只读数据库时配置为true， 保证安全 -->
    <property name="readOnly" value="false" /> 
    <!-- 等待连接池分配连接的最大时长（毫秒），超过这个时长还没可用的连接则发生SQLException， 缺省:30秒 -->
    <property name="connectionTimeout" value="30000" /> 
    <!-- 一个连接idle状态的最大时长（毫秒），超时则被释放（retired），缺省:10分钟 -->
    <property name="idleTimeout" value="600000" /> 
    <!-- 一个连接的生命时长（毫秒），超时而且没被使用则被释放（retired），缺省:30分钟，建议设置比数据库超时时长少30秒，参考MySQL wait_timeout参数（show variables like '%timeout%';） -->
    <property name="maxLifetime" value="1800000" /> 
    <!-- 连接池中允许的最大连接数。缺省值：10；推荐的公式：((core_count * 2) + effective_spindle_count) -->
    <property name="maximumPoolSize" value="15" />
</bean>
<bean class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"></property>
</bean>
<!-- 配置事务管理器 -->
<bean id="transactionManager"
    class="org.springframework.jdbc.datasource.DataSourceTransactionManager"
    p:dataSource-ref="dataSource">
</bean>
<!-- 启用事务注解 -->
<tx:annotation-driven transaction-manager="transactionManager" />
```
> 注：（1）：该配置只为application.xml文件中部分相关配置。（2）：一个类含有@Transactional注解修饰的方法，则Spring框架自动为该类创建代理对象，默认使用JDK创建代理对象，可以通过添加<aop:aspectj-autoproxy proxy-target-class="true"/>使用CGLib创建代理对象，此时需要添加aspectjweaver-x.x.x.jar包。

3. 在Service层public方法上添加事务注解——@Transactional
> 注： 不能在protected、默认或者private的方法上使用@Transactional注解，否则无效。
## 三: @Transactional注解属性
### 1. rollbackFor和rollbackForClassName
1. 释义：指定对哪些异常回滚事务。默认情况下，如果在事务中抛出了运行时异常（继承自RuntimeException异常类），则回滚事务；如果没有抛出任何异常，或者抛出了检查时异常，则依然提交事务。这种处理方式是大多数开发者希望的处理方式，也是 EJB 中的默认处理方式；但可以根据需要人为控制事务在抛出某些运行时异常时仍然提交事务，或者在抛出某些检查时异常时回滚事务.
运行时异常的回滚实例：
![运行时异常的回滚实例](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190714232651.png)
> 注：书籍表中有50本书籍，每本书10元，一个人钱包有1元，欲买50本，则该行代码抛出MoneyException异常，但由于该异常为运行时异常，所以回滚数据。
检查时异常通过rollbackFor和rollbackForClassName确定回滚异常的回滚实例
！[](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715080733.png)
> 注：书籍表中有50本书籍，每本书10元，一个人钱包有1元，欲买50本，则该行代码抛出MoneyException异常，但由于该异常为检查时异常，所以若无@Transactional(rollbackFor=MoneyException.class)则不进行回滚
> 通过@Transactional(rollbackFor=MoneyException.class)确定出现MoneyException的检查时异常时依然回滚。
> 上例代码不能try-catch处理检查时异常（已捕获异常，异常不在上传），否则即便@Transactional注解中添加了rollbackFor=MoneyException.class，事务也不会回滚，如下代码：
![](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715081415.png)
> 注：籍表中有50本书籍，每本书10元，一个人钱包有1元，欲买50本，则该行代码抛出MoneyException异常，尽管该异常为检查时异常，且@Transactional注解中添加了rollbackFor=MoneyExcepti
### 2.noRollbackFor和noRollbackForClassName
1. 释义：指定对哪些异常不回滚事务。
> 注：原理同上
### 3. readOnly
1. 释义;事务只读，指对事务性资源进行只读操作。所谓事务性资源就是指那些被事务管理的资源，比如数据源、 JMS 资源，以及自定义的事务性资源等等。如果确定只对事务性资源进行只读操作，那么可以将事务标志为只读的，以提高事务处理的性能。在 TransactionDefinition 中以 boolean 类型来表示该事务是否只读。由于只读的优化措施是在一个事务启动时由后端数据库实施的， 因此，只有对于那些具有可能启动一个新事务的传播行为（PROPAGATION_REQUIRES_NEW、PROPAGATION_REQUIRED、 ROPAGATION_NESTED）的方法来说，将事务声明为只读才有意义。
实例如下：
！[](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715082126.png)


> 注：@Transactional注解中添加了readOnly=true，但@Transactional注解修饰的方法涉及数据的修改，因此抛出如下异常：
Caused by: java.sql.SQLException: Connection is read-only. Queries leading to data modification are not allowed
### 4.timeout
1. 释义：设置一个事务所允许执行的最长时长（单位：秒），如果超过该时长且事务还没有完成，则自动回滚事务且出现org.springframework.transaction.TransactionTimedOutException异常，如下代码：
！[](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715170513.png)
> 注：Thread.sleep(4000)会使得当前事务4秒之后结束，该时长超出了所允许的最长时长，因此事务自动回滚，书籍表库存递减操作无效，程序出现org.springframework.transaction.TransactionTimedOutException异常！
> 1、事务的开始往往会发生数据库的表锁或者被数据库优化为行锁，如果允许时间过长，那么这些数据会一直被锁定，最终影响系统的并发性，因此可以给这些事务设置超时时间以规避该问题。
> 2、由于超时是在一个事务启动的时候开始的，因此，只有对于那些具有可能启动一个新事务的传播行为（PROPAGATION_REQUIRES_NEW、PROPAGATION_REQUIRED、ROPAGATION_NESTED）的方法来说，声明事务超时才有意义。
## 四：事务的传播机制
### propagation：
指定事务传播行为，一个事务方法被另一个事务方法调用时，必须指定事务应该如何传播，例如：方法可能继承在现有事务中运行，也可能开启一个新事物，并在自己的事务中运行。Spring定义了如下7种事务传播行为：
#### REQUIRED：
默认值，如果有事务在运行，当前的方法就在这个事务内运行，否则，就启动一个新的事务，并在自己的事务内运行
#### REQUIRES_NEW：
当前方法必须启动新事务，并在它自己的事务内运行，如果有事务在运行，则把当前事务挂起，直到新的事务提交或者回滚才恢复执行。
#### SUPPORTS：
如果有事务在运行，当前的方法就在这个事务内运行，否则以非事务的方式运行；
#### NOT_SUPPORTED：
当前的方法不应该运行在事务中，如果有运行的事务，则将它挂起；
#### NEVER：
当前方法不应该运行在事务中，否则将抛出异常；
#### MANDATORY（mandatory [ˈmændətɔːri] adj.强制的）：
当前方法必须运行在事务内部，否则将抛出异常；
#### NESTED（nest [nest] v.嵌套）：
如果有事务在运行，当前的方法在这个事务的嵌套事务内运行，否则就启动一个新的事务，并在它自己的事务内运行，此时等价于REQUIRED。注意：对于NESTED内层事务而言，内层事务独立于外层事务，可以独立递交或者回滚,如果内层事务抛出的是运行异常，外层事务进行回滚，内层事务也会进行回滚。
部分示例代码如下：
```java
public class Test {
	
	public static void main(String[] args) {
		ClassPathXmlApplicationContext application = new ClassPathXmlApplicationContext("application.xml");		
		//购物车购买
		ICarService carService = application.getBean(CarService.class);
		String userId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
		Map<String,Integer> commodities = new HashMap<String,Integer>();
		commodities.put("a2f39533-659f-42ca-af91-c688a83f6e49",1);
		commodities.put("4c37672a-653c-4cc8-9ab5-ee0c614c7425",10);
		carService.batch(userId, commodities);
		application.close();
	}
}
```
```java
public class CarService implements ICarService {

	@Autowired
	private ICouponService couponService;

	//购物车购买
	@Override
	@Transactional
	public boolean batch(String userId,Map<String,Integer> commodities) {
		Set<Entry<String, Integer>> set = commodities.entrySet();
		for (Entry<String, Integer> commodity : set) {
			String bookId = commodity.getKey();
			int count = commodity.getValue();
			System.out.println(bookId+","+count);
			couponService.insert(userId,bookId, count);
		}
		return true;
	}
}
```
```java
public class CouponService implements ICouponService {

	@Autowired
	private IBookDao bookDao;
	@Autowired
	private IMoneyDao moneyDao;
	@Autowired
	private ICouponDao couponDao;
	
	//立即购买
	@Override
	@Transactional
	public boolean insert(String userId,String bookId, int count){
		
		if(bookDao.enough(bookId, count)) {//书籍足够
			//书籍表库存递减
			bookDao.update(bookId, count);
		}
		double price = bookDao.getPrice(bookId);
		double total = price*count;
		if(moneyDao.enough(userId, total)) {//余额足够
			//订单表添加数据
			Coupon coupon = new Coupon();
			coupon.setId(UUID.randomUUID().toString());
			coupon.setUserId(userId);
			coupon.setBookId(bookId);
			coupon.setTotal(total);
			couponDao.insert(coupon);
			//钱包表递减
			moneyDao.update(userId, total);
		}
		return true;
	}
```
> 注：其实这两个事务可以当做一个，即insert方法上的事务注解可以省略。
> 但是当insert方法上的事务注解添加REQUIRES_NEW属性时，insert方法每次执行即创建一个新的事务
## 五：事务的隔离机制
###isolation：指定事务隔离级别，Spring定义了如下5种事务隔离级别：
#### DEFAULT：
默认值，表示使用底层数据库的默认隔离级别。对大部分数据库而言，通常为READ_COMMITTED。
#### READ_UNCOMMITTED：
表示一个事务可以读取另一个事务修改但还没有提交的数据。该级别可能出现脏读、不可重复读或幻读，因此很少使用该隔离级别。
#### READ_COMMITTED：
表示一个事务只能读取另一个事务已经提交的数据。该级别可以防止脏读，但可能出现不可重复读或幻读，这也是大多数情况下的推荐值。
#### REPEATABLE_READ：
表示一个事务在整个过程中可以多次重复执行某个查询，且每次返回的记录都相同，除非数据被当前事务自生修改。即使在多次查询之间有新增的数据满足该查询，这些新增的记录也会被忽略。该级别可以防止脏读和不可重复读，但可能出现幻读。
#### SERIALIZABLE：
表示所有的事务依次逐个执行，事务之间互不干扰，该级别可以防止脏读、不可重复读和幻读，但是这将严重影响程序的性能，因此通常情况下也不会用到该级别。
> 注：事务的隔离级别要得到底层数据库引擎的支持, 而不是应用程序或者框架的支持：Oracle 支持READ_COMMITED和SERIALIZABLE两种事务隔离级别，默认为READ_COMMITED；MySQL 支持READ_UNCOMMITTED、READ_COMMITTED、REPEATABLE_READ和SERIALIZABLE四种事务隔离级别，默认为:REPEATABLE_READ。
### 并发导致数据出现的问题
#### 1.脏读(Drity Read)
1. 释义：已知有两个事务A和B, A读取了已经被B更新但还没有被提交的数据，之后，B回滚事务，A读取的数据就是脏数据。
> 注：即事务b读取了事务a在内存中修改的数据（未提交写入数据库的磁盘）
> 即READ_UNCOMMITTED（读未提交隔离机制）即可发生的问题
> 场景：公司发工资了，领导把5000元打到Tom的账号上，但是该事务并未提交，而Tom正好去查看账户，发现工资已经到账，账户多了5000元，非常高兴，可是不幸的是，领导发现发给Tom的工资金额不对，是2000元，于是迅速回滚了事务，修改金额后，将事务提交，Tom再次查看账户时发现账户只多了2000元。
#### 2. 不可重复读(Non-repeatable read)
1. 释义：已知有两个事务A和B，A 多次读取同一数据，B 在A多次读取的过程中对数据作了修改并提交，导致A多次读取同一数据时，结果不一致。
> 注：即事务b在前后读取一个数据的期间，事务a对该数据进行了修改。
> READ_COMMITED隔离机制即可发生该问题
> 场景：Tom拿着工资卡去消费，酒足饭饱后在收银台买单，服务员告诉他本次消费1000元，Tom将银行卡给服务员，服务员将银行卡插入POS机，POS机读到卡里余额为3000元，就在Tom磨磨蹭蹭输入密码时，他老婆以迅雷不及掩耳盗铃之势把Tom工资卡的3000元转到自己账户并提交了事务，当Tom输完密码并点击“确认”按钮后，POS机检查到Tom的工资卡已经没有钱，扣款失败。
#### 3.幻读(Phantom Read)
1. 释义：已知有两个事务A和B，A从一个表中读取了数据，然后B在该表中插入了一些新数据，导致A再次读取同一个表, 就会多出几行，简单地说，一个事务中
> 注：事务b前后读取的数据库期间，事务a对该数据库进行了增加操作
> 场景：om的老婆工作在银行部门，她时常通过银行内部系统查看Tom的工资卡消费记录。2019年5月的某一天，她查询到Tom当月工资卡的总消费额（select sum(amount) from record where card_id='6226090219290000' and date_format(create_time,'%Y-%m')='2019-05'）为80元，Tom的老婆非常吃惊，心想“老公真是太节俭了，嫁给他真好！”，而Tom此时正好在外面胡吃海塞后在收银台买单，消费1000元，即新增了一条1000元的消费记录并提交了事务，沉浸在幸福中的老婆查询了Tom当月工资卡消费明细（select amount from record where card_id='6226090219290000' and date_format(create_time,'%Y-%m')='2019-05'）一探究竟，可查出的结果竟然发现有一笔1000元的消费。
#### 4.总结
不可重复读的和幻读很容易混淆，不可重复读侧重于修改，幻读侧重于新增或删除。解决不可重复读的问题只需锁住满足条件的行，解决幻读需要锁表。
### 用数据库的事务隔离机制对数据问题进行解决
1. Read uncommitted（读未提交）：可能出现脏读、不可重复读和幻读。
2. Read committed（读提交）：可以避免脏读，但可能出现不可重复读和幻读。大多数数据库默认级别就是Read committed，比如Sql Server数据库和Oracle数据库。注意：该隔离级别在写数据时只会锁住相应的行。
3. Repeatable read（重复读）：可以避免脏读和不可重复读，但可能出现幻读。注意：事务隔离级别为可重复读时，如果检索条件有索引（包括主键索引）的时候，默认加锁方式是next-key 锁；如果检索条件没有索引，更新数据时会锁住整张表。一个间隙被事务加了锁，其他事务是不能在这个间隙插入记录的，这样可以防止幻读。
4. Serializable（序列化）：可以避免脏读、不可重复读和幻读，但是并发性极低，一般很少使用。注意：该隔离级别在读写数据时会锁住整张表。
总结：
！[](![](https://raw.githubusercontent.com/Laicize/wenke_images/master/img/20190715175413.png))
> 注：√表示可能出现，×表示不会出现
> 隔离级别越高，越能保证数据的完整性和一致性，但是对并发性能的影响也越大。
### MySQL事务隔离级别
1. 查看隔离机制：MySQL数据库支持Read uncommitted、Read committed、Repeatable read和Serializable四种事务隔离级别，默认为Repeatable read，可以通过如下语句查看MySQL数据库事务隔离级别：
```mysql
select @@global.tx_isolation,@@tx_isolation;
```
2. 修改数据库的隔离机制
MySQL数据库事务隔离级别的修改分为全局修改和当前session修改，具体修改方法如下：
1、全局修改
①、在my.ini配置文件最后加上如下配置：
#可选参数有：READ-UNCOMMITTED, READ-COMMITTED, REPEATABLE-READ, SERIALIZABLE.
[mysqld]
②、重启MySQL服务
2、当前session修改，登录MySQL数据库后执行如下命令：
set session transaction isolation level read 

