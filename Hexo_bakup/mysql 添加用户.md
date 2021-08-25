+++
title="docker安装mysql"
categories=["mysql"]
tags=["mysql"] 
date="2021-08-19 12:00:00+0800"
toc=true
+++

## # docker 安装mysql5.6

```SHELL
docker pull mysql:latest

docker images

docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

docker run -itd -p 3306:3306 --name mysql5  -e MYSQL_ROOT_PASSWORD=123456 -d mysql5.5.41 // 5.5版本

- 映射本地目录
docker run -p 3306:3306 --name mysql5.5  -v /opt/docker/mysql/conf:/etc/mysql -v /opt/docker/mysql/logs:/var/log/mysql -v /opt/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.5

docker ps 查看进程

docker ps  -a 查看全部容器

docker exec -it 621b7a3e9 /bin/bash 进入容器

docker cp /etc/mysql5.cnf mysql5:/etc/mysql/my.cnf   // 复制本地文件到容器内

docker start 0507f9672f83

docker restart 0507f9672f83 

docker stop 0507f9672f83

docker rm 0507f9672f83

docker images //查看下载的镜像

docker image  rm  81ef0945fb33(镜像id)


```







# mysql配置

```SHELL
// mysql添加索引时，如果提示 the table xxx is full

tmp_table_size = 256M

max_heap_table_size = 256M

// 开启binlog

log-bin=/var/lib/mysql/data/mysql-bin
binlog_format="ROW"
server-id=1
```





# mysql5.6 权限控制

## 用户管理

查看用户权限 

```sql
show grants for 'test'@'localhost';
```



添加用户1

```sql
GRANT ALL PRIVILEGES ON *.* TO 'test'@'192.168.1.0\/255.255.255.0'; //默认会创建用户，如果用户不存在
添加用户 只允许 192.168.2.0段的客户端ip链接。
flush  privileges; // 这一句会让他生效
GRANT ALL PRIVILEGES ON *.* TO 'test'@'%';
```

添加用户2

```sql
CREATE USER 'finley'@'%' IDENTIFIED BY '123456'; // 创建用户
GRANT ALL ON *.* TO 'finley'@'%' WITH GRANT OPTION; // 设置权限; %是任何机器都可以通过ip链接这个mysql
-- GRANT SELECT ON db2.invoice TO 'jeffrey'@'localhost';
flush  privileges;// 设置权限生效。
```



修改密码, 4种方法

```sql
use mysql;
update mysql.user set password=PASSWORD('123456') where User='test';
SET PASSWORD FOR 'jeffrey'@'localhost' = PASSWORD('password');
SET PASSWORD = PASSWORD('password');// 可以直接修改当前用户的密码
GRANT USAGE ON *.* TO 'jeffrey'@'localhost' IDENTIFIED BY 'password'; 
```



查看当前用户

```sql
SELECT CURRENT_USER();
```



## 权限赋值

数据库权限

```sql
GRANT ALL ON mydb.* TO 'someuser'@'somehost';
GRANT SELECT, INSERT ON mydb.* TO 'someuser'@'somehost';
```

表权限

```sql
GRANT ALL ON mydb.mytbl TO 'someuser'@'somehost';
GRANT SELECT, INSERT ON mydb.mytbl TO 'someuser'@'somehost';
```

列权限

```sql
GRANT SELECT (col1), INSERT (col1, col2) ON mydb.mytbl TO 'someuser'@'somehost';
```

create routine 权限(有此权限，可以创建函数和存储过程， 数据库级别)

```sql
GRANT CREATE ROUTINE ON mydb.* TO 'someuser'@'somehost';
GRANT EXECUTE ON PROCEDURE mydb.myproc TO 'someuser'@'somehost';
```

## 设置用户的资源limit

```sql
mysql> CREATE USER 'francis'@'localhost' IDENTIFIED BY 'frank';
mysql> GRANT ALL ON customer.* TO 'francis'@'localhost'
 -> WITH MAX_QUERIES_PER_HOUR 20
 -> MAX_UPDATES_PER_HOUR 10
 -> MAX_CONNECTIONS_PER_HOUR 5
 -> MAX_USER_CONNECTIONS 2;
```



## 重命名user

```sql
RENAME USER ''@'localhost' TO 'user1'@'localhost';
RENAME USER 'user2'@'%.example.com' TO 'user2'@'remote.example.com';
```



## 撤销操作

```sql
REVOKE INSERT ON *.* FROM 'jeffrey'@'localhost'; // 撤销select 权限

REVOKE ALL
 ON *.*
FROM 'finley'@'%.example.com';
 
REVOKE INSERT,UPDATE,DELETE
 	ON customer.addresses
FROM 'custom'@'%.example.com';
```



