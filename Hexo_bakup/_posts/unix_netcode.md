---
layout: post
title: unix网络编程代码
category: linux
date: 2017-1-7 15:30:30
---
# UNIX网络编程

```c
//一个简单的时间获取客户程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <stdlib.h>
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void  err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int main(int argc, char **argv)
{
int sockfd, n;
char recvline[MAXLINE + 1];
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: a.out <IPaddress>");
if ((sockfd = socket(AF\_INET, SOCK\_STREAM, 0)) < 0)
err\_sys("socket error");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(13);  /* daytime server */
if (inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr) <= 0)
err\_quit("inet\_pton error for %s", argv[1]);
if (connect(sockfd, (SA *) & servaddr, sizeof(servaddr)) < 0)
err\_sys("connect error");
while ((n = read(sockfd, recvline, MAXLINE)) > 0) {
recvline[n] = 0;    /* null terminate */
if (fputs(recvline, stdout) == EOF)
err\_sys("fputs error");
}
if (n < 0)
err\_sys("read error");
exit(0);
}

//1.5 一个简单的时间获取服务器程序
//注意，这个程序要root用户才可以运行，因为端口号是13,少于1024
#include    <strings.h>
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
int main()
{
int listenfd, connfd;
struct sockaddr\_in servaddr;
char buff[MAXLINE];
time\_t ticks;
listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(13);  /* daytime server */
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
for (;;) {
connfd = Accept(listenfd, (SA *) NULL, NULL);
ticks = time(NULL);
snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
Write(connfd, buff, strlen(buff));
Close(connfd);
}
}
//第3章 套接字编程简介
//3.4 字节排序函数
#include <stdio.h>
#include <stdlib.h>
#define CPU\_VENDOR\_OS "i686-pc-linux-gnu"
int main(int argc, char **argv)
{
union {
short  s;
char   c[sizeof(short)];
} un;
un.s = 0x0102;
printf("%s: ", CPU\_VENDOR\_OS);
if (sizeof(short) == 2) {
if (un.c[0] == 1 && un.c[1] == 2)
printf("big-endian\n");
else if (un.c[0] == 2 && un.c[1] == 1)
printf("little-endian\n");
else
printf("unknown\n");
} else
printf("sizeof(short) = %d\n", sizeof(short));
exit(0);
}
////第5章 TCP客户/服务器程序示例
//5.2 TCP回射服务器程序
#include    <strings.h>
#include    <sys/types.h>   /* basic system data types */
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s",buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void str\_echo(int sockfd)
{
ssize\_t n;
char buf[MAXLINE];
again:
while ((n = read(sockfd, buf, MAXLINE)) > 0)
Writen(sockfd, buf, n);
if (n < 0 && errno == EINTR)
goto again;
else if (n < 0)
err\_sys("str\_echo: read error");
}
int main()
{
int listenfd, connfd;
pid\_t childpid;
socklen\_t clilen;
struct sockaddr\_in cliaddr, servaddr;
listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
for (;;) {
clilen = sizeof(cliaddr);
connfd = Accept(listenfd, (SA *) & cliaddr, &clilen);
if ((childpid = Fork()) == 0) { /* child process */
Close(listenfd);    /* close listening socket */
str\_echo(connfd);   /* process the request */
exit(0);
}
Close(connfd);  /* parent closes connected socket */
}
}
5.4 TCP回射客户程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s",buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = (char *)vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
void str\_cli(FILE * fp, int sockfd)
{
char sendline[MAXLINE], recvline[MAXLINE];
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Writen(sockfd, sendline, strlen(sendline));
if (Readline(sockfd, recvline, MAXLINE) == 0)
err\_quit("str\_cli: server terminated prematurely");
Fputs(recvline, stdout);
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(stdin, sockfd); /* do it all */
exit(0);
}
5.10 wait和waitpid函数
//带上信号处理函数的server
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <signal.h>
#include    <sys/types.h>   /* basic system data types */
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
#include    <sys/wait.h>
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void str\_echo(int sockfd)
{
ssize\_t n;
char buf[MAXLINE];
again:
while ((n = read(sockfd, buf, MAXLINE)) > 0)
Writen(sockfd, buf, n);
if (n < 0 && errno == EINTR)
goto again;
else if (n < 0)
err\_sys("str\_echo: read error");
}
void sig\_chld(int signo)
{
pid\_t pid;
int stat;
while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
printf("child %d terminated\n", pid);
return;
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int main()
{
int listenfd, connfd;
pid\_t childpid;
socklen\_t clilen;
struct sockaddr\_in cliaddr, servaddr;
listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
Signal(SIGCHLD, sig\_chld);  /* must call waitpid() */
for (;;) {
clilen = sizeof(cliaddr);
if ((connfd = accept(listenfd, (SA *) & cliaddr, &clilen)) < 0) {
if (errno == EINTR)
continue;   /* back to for() */
else
err\_sys("accept error");
}
if ((childpid = Fork()) == 0) { /* child process */
Close(listenfd);    /* close listening socket */
str\_echo(connfd);   /* process the request */
exit(0);
}
Close(connfd);  /* parent closes connected socket */
}
}
//第6章 I/O复用：select和poll函数
6.4 str\_cli函数（修订版）
//使用select
#define \_POSIX\_SOURCE
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/select.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = (char *)vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
int Select(int nfds, fd\_set * readfds, fd\_set * writefds, fd\_set * exceptfds,
struct timeval *timeout)
{
int n;
do {
n = select(nfds, readfds, writefds, exceptfds, timeout);
if (n < 0 && errno != EINTR)
err\_sys("select error");
} while (n < 0);
return (n);     /* can return 0 on timeout */
}
void str\_cli(FILE * fp, int sockfd)
{
int maxfdp1;
fd\_set rset;
char sendline[MAXLINE], recvline[MAXLINE];
FD\_ZERO(&rset);
for (;;) {
FD\_SET(fileno(fp), &rset);
FD\_SET(sockfd, &rset);
maxfdp1 = max(fileno(fp), sockfd) + 1;
Select(maxfdp1, &rset, NULL, NULL, NULL);
if (FD\_ISSET(sockfd, &rset)) {  /* socket is readable */
if (Readline(sockfd, recvline, MAXLINE) == 0)
err\_quit
("str\_cli: server terminated prematurely");
Fputs(recvline, stdout);
}
if (FD\_ISSET(fileno(fp), &rset)) {  /* input is readable */
if (Fgets(sendline, MAXLINE, fp) == NULL)
return; /* all done */
Writen(sockfd, sendline, strlen(sendline));
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(stdin, sockfd); /* do it all */
exit(0);
}
6.7 str\_cli函数（再修订版）
//使用shutdown
#include    <strings.h>
#include    <sys/select.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
int Select(int nfds, fd\_set * readfds, fd\_set * writefds, fd\_set * exceptfds,
struct timeval *timeout)
{
int n;
do {
n = select(nfds, readfds, writefds, exceptfds, timeout);
if (n < 0 && errno != EINTR)
err\_sys("select error");
} while (n < 0);
return (n);     /* can return 0 on timeout */
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Shutdown(int fd, int how)
{
if (shutdown(fd, how) < 0)
err\_sys("shutdown error");
}
void str\_cli(int fd, int sockfd)
{
int maxfdp1, stdineof;
fd\_set rset;
char buf[MAXLINE];
int n;
stdineof = 0;
FD\_ZERO(&rset);
for (;;) {
if (stdineof == 0)
FD\_SET(fd, &rset);
FD\_SET(sockfd, &rset);
maxfdp1 = max(fd, sockfd) + 1;
Select(maxfdp1, &rset, NULL, NULL, NULL);
if (FD\_ISSET(sockfd, &rset)) {  /* socket is readable */
if ((n = Read(sockfd, buf, MAXLINE)) == 0) {
if (stdineof == 1)
return; /* normal termination */
else
err\_quit
("str\_cli: server terminated prematurely");
}
Write(STDOUT\_FILENO, buf, n);
}
if (FD\_ISSET(fd, &rset)) {  /* input is readable */
if ((n = Read(fd, buf, MAXLINE)) == 0) {
stdineof = 1;
Shutdown(sockfd, SHUT\_WR);  /* send FIN */
FD\_CLR(fd, &rset);
continue;
}
Writen(sockfd, buf, n);
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(STDIN\_FILENO, sockfd);  /* do it all */
exit(0);
}
6.8 TCP回射服务器程序（修订版）
//使用select
#include    <sys/types.h>   /* basic system data types */
#include    <strings.h>
#include    <sys/select.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void str\_echo(int sockfd)
{
ssize\_t n;
char buf[MAXLINE];
again:
while ((n = read(sockfd, buf, MAXLINE)) > 0)
Writen(sockfd, buf, n);
if (n < 0 && errno == EINTR)
goto again;
else if (n < 0)
err\_sys("str\_echo: read error");
}
int Select(int nfds, fd\_set * readfds, fd\_set * writefds, fd\_set * exceptfds,
struct timeval *timeout)
{
int n;
do {
n = select(nfds, readfds, writefds, exceptfds, timeout);
if (n < 0 && errno != EINTR)
err\_sys("select error");
} while (n < 0);
return (n);     /* can return 0 on timeout */
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
int main()
{
int i, maxi, maxfd, listenfd, connfd, sockfd;
int nready, client[FD\_SETSIZE];
ssize\_t n;
fd\_set rset, allset;
char buf[MAXLINE];
socklen\_t clilen;
struct sockaddr\_in cliaddr, servaddr;
listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
maxfd = listenfd;   /* initialize */
maxi = -1;      /* index into client[] array */
for (i = 0; i < FD\_SETSIZE; i++)
client[i] = -1; /* -1 indicates available entry */
FD\_ZERO(&allset);
FD\_SET(listenfd, &allset);
/* end fig01 */
/* include fig02 */
for (;;) {
rset = allset;  /* structure assignment */
nready = Select(maxfd + 1, &rset, NULL, NULL, NULL);
if (FD\_ISSET(listenfd, &rset)) {    /* new client connection */
clilen = sizeof(cliaddr);
connfd = Accept(listenfd, (SA *) & cliaddr, &clilen);
#ifdef  NOTDEF
printf("new client: %s, port %d\n",
Inet\_ntop(AF\_INET, &cliaddr.sin\_addr, 4, NULL),
ntohs(cliaddr.sin\_port));
#endif
for (i = 0; i < FD\_SETSIZE; i++)
if (client[i] < 0) {
client[i] = connfd; /* save descriptor */
break;
}
if (i == FD\_SETSIZE)
err\_quit("too many clients");
FD\_SET(connfd, &allset);    /* add new descriptor to set */
if (connfd > maxfd)
maxfd = connfd; /* for select */
if (i > maxi)
maxi = i;   /* max index in client[] array */
if (--nready <= 0)
continue;   /* no more readable descriptors */
}
for (i = 0; i <= maxi; i++) {   /* check all clients for data */
if ((sockfd = client[i]) < 0)
continue;
if (FD\_ISSET(sockfd, &rset)) {
if ((n = Read(sockfd, buf, MAXLINE)) == 0) {
/*4connection closed by client */
Close(sockfd);
FD\_CLR(sockfd, &allset);
client[i] = -1;
} else
Writen(sockfd, buf, n);
if (--nready <= 0)
break;  /* no more readable descriptors */
}
}
}
}
6.11 TCP回射服务器程序（再修订版）
//使用poll
#include    <strings.h>
#include    <sys/types.h>   /* basic system data types */
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
#include    <poll.h>    /* for convenience */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define OPEN\_MAX 1024
#define INFTIM          (-1)    /* infinite poll timeout */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void str\_echo(int sockfd)
{
ssize\_t n;
char buf[MAXLINE];
again:
while ((n = read(sockfd, buf, MAXLINE)) > 0)
Writen(sockfd, buf, n);
if (n < 0 && errno == EINTR)
goto again;
else if (n < 0)
err\_sys("str\_echo: read error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
int Poll(struct pollfd *fdarray, unsigned long nfds, int timeout)
{
int n;
do {
n = poll(fdarray, nfds, timeout);
if (n < 0 && errno != EINTR)
err\_sys("poll error");
} while (n < 0);
return (n);
}
int main()
{
int i, maxi, listenfd, connfd, sockfd;
int nready;
ssize\_t n;
char buf[MAXLINE];
socklen\_t clilen;
struct pollfd client[OPEN\_MAX];
struct sockaddr\_in cliaddr, servaddr;
listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
client[0].fd = listenfd;
client[0].events = POLLIN;
for (i = 1; i < OPEN\_MAX; i++)
client[i].fd = -1;  /* -1 indicates available entry */
maxi = 0;       /* max index into client[] array */
/* end fig01 */
/* include fig02 */
for (;;) {
nready = Poll(client, maxi + 1, INFTIM);
if (client[0].revents & POLLIN) {   /* new client connection */
clilen = sizeof(cliaddr);
connfd = Accept(listenfd, (SA *) & cliaddr, &clilen);
#ifdef  NOTDEF
printf("new client: %s\n",
Sock\_ntop((SA *) & cliaddr, clilen));
#endif
for (i = 1; i < OPEN\_MAX; i++)
if (client[i].fd < 0) {
client[i].fd = connfd;  /* save descriptor */
break;
}
if (i == OPEN\_MAX)
err\_quit("too many clients");
client[i].events = POLLIN;
if (i > maxi)
maxi = i;   /* max index in client[] array */
if (--nready <= 0)
continue;   /* no more readable descriptors */
}
for (i = 1; i <= maxi; i++) {   /* check all clients for data */
if ((sockfd = client[i].fd) < 0)
continue;
if (client[i].revents & (POLLIN | POLLERR)) {
if ((n = read(sockfd, buf, MAXLINE)) < 0) {
if (errno == ECONNRESET) {
/*4connection reset by client */
#ifdef  NOTDEF
printf
("client[%d] aborted connection\n",
i);
#endif
Close(sockfd);
client[i].fd = -1;
} else
err\_sys("read error");
} else if (n == 0) {
/*4connection closed by client */
#ifdef  NOTDEF
printf("client[%d] closed connection\n",
i);
#endif
Close(sockfd);
client[i].fd = -1;
} else
Writen(sockfd, buf, n);
if (--nready <= 0)
break;  /* no more readable descriptors */
}
}
}
}
6.12 TCP回射服务器程序（再修订版）
//使用epoll,根据6.11的程序修改而来
#include    <strings.h>
#include    <sys/select.h>
#include    <sys/types.h>   /* basic system data types */
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
#include    <sys/epoll.h>
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAX\_EVENTS 500
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void str\_echo(int sockfd)
{
ssize\_t n;
char buf[MAXLINE];
again:
while ((n = read(sockfd, buf, MAXLINE)) > 0)
Writen(sockfd, buf, n);
if (n < 0 && errno == EINTR)
goto again;
else if (n < 0)
err\_sys("str\_echo: read error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Epoll\_ctl(int epfd, int op, int fd, struct epoll\_event *event)
{
if (epoll\_ctl(epfd, op, fd, event) < 0)
err\_sys("epoll\_ctl error");
}
int Epoll\_wait(int epfd, struct epoll\_event *events, int maxevents, int timeout)
{
int n;
do {
n = epoll\_wait(epfd, events, maxevents, timeout);
if (n < 0 && errno != EINTR)
err\_sys("epoll\_wait error");
} while (n < 0);
return (n);
}
int main()
{
char buf[MAXLINE];
socklen\_t clilen;
struct sockaddr\_in cliaddr, servaddr;
int listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
// create epoll
int epfd = epoll\_create(MAX\_EVENTS);
struct epoll\_event ev;
ev.data.fd = listenfd;
ev.events = EPOLLIN;
Epoll\_ctl(epfd, EPOLL\_CTL\_ADD, listenfd, &ev);
struct epoll\_event revents[MAX\_EVENTS]; //returned events
for (;;) {
int nready = Epoll\_wait(epfd, revents, MAX\_EVENTS, -1);
for (int i = 0; i < nready; i++) {
int sockfd = revents[i].data.fd;
if (sockfd == listenfd) {   /* new client connection */
clilen = sizeof(cliaddr);
int connfd =
Accept(listenfd, (SA *) & cliaddr, &clilen);
ev.data.fd = connfd;
ev.events = EPOLLIN;
Epoll\_ctl(epfd, EPOLL\_CTL\_ADD, connfd, &ev);
} else {
if (revents[i].events & (EPOLLIN | EPOLLERR)) {
int n = read(sockfd, buf, MAXLINE);
if (n > 0) {
Writen(sockfd, buf, n);
} else if (n == 0) {
/*4connection closed by client */
struct epoll\_event ev;
ev.data.fd = sockfd;
Epoll\_ctl(epfd,
EPOLL\_CTL\_DEL, sockfd,
&ev);
Close(sockfd);
} else if (n < 0) {
if (errno == ECONNRESET) {
/*4connection reset by client */
struct epoll\_event ev;
ev.data.fd = sockfd;
Epoll\_ctl(epfd,
EPOLL\_CTL\_DEL,
sockfd, &ev);
Close(sockfd);
} else {
err\_sys("read error");
}
}
}
}
}
}
}
6.13 TCP回射客户程序
//使用epoll,根据6.7修改而来
#include    <strings.h>
#include    <sys/epoll.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
#define MAX\_EVENTS 500
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Shutdown(int fd, int how)
{
if (shutdown(fd, how) < 0)
err\_sys("shutdown error");
}
void Epoll\_ctl(int epfd, int op, int fd, struct epoll\_event *event)
{
if (epoll\_ctl(epfd, op, fd, event) < 0)
err\_sys("epoll\_ctl error");
}
int Epoll\_wait(int epfd, struct epoll\_event *events, int maxevents, int timeout)
{
int n;
do {
n = epoll\_wait(epfd, events, maxevents, timeout);
if (n < 0 && errno != EINTR)
err\_sys("epoll\_wait error");
} while (n < 0);
return (n);
}
void str\_cli(int fd, int sockfd)
{
// create epoll
int epfd = epoll\_create(MAX\_EVENTS);
struct epoll\_event ev;
ev.data.fd = fd;
ev.events = EPOLLIN;
Epoll\_ctl(epfd, EPOLL\_CTL\_ADD, fd, &ev);
ev.data.fd = sockfd;
ev.events = EPOLLIN;
Epoll\_ctl(epfd, EPOLL\_CTL\_ADD, sockfd, &ev);
struct epoll\_event revents[MAX\_EVENTS]; //returned events
char buf[MAXLINE];
int stdineof = 0;
int n;
for (;;) {
int nready = Epoll\_wait(epfd, revents, MAX\_EVENTS, -1);
for (int i = 0; i < nready; i++) {
if (revents[i].data.fd == sockfd) { /* socket is readable */
if ((n = Read(sockfd, buf, MAXLINE)) == 0) {
if (stdineof == 1) {
struct epoll\_event ev;
ev.data.fd = sockfd;
Epoll\_ctl(epfd,
EPOLL\_CTL\_DEL, sockfd,
&ev);
return; /* normal termination */
} else
err\_quit
("str\_cli: server terminated prematurely");
}
Write(STDOUT\_FILENO, buf, n);
}
if (revents[i].data.fd == fd) { /* input is readable */
if ((n = Read(fd, buf, MAXLINE)) == 0) {
stdineof = 1;
Shutdown(sockfd, SHUT\_WR);  /* send FIN */
struct epoll\_event ev;
ev.data.fd = fd;
Epoll\_ctl(epfd, EPOLL\_CTL\_DEL, fd, &ev);
continue;
}
Writen(sockfd, buf, n);
}
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(STDIN\_FILENO, sockfd);  /* do it all */
exit(0);
}
//第7章 套接字选项
7.3 检查选项是否受支持并获取默认值
#define \_\_need\_timeval
#include    <stdio.h>
#include    <time.h>
#include    <netinet/tcp.h> /* for TCP\_xxx defines */
#include    <sys/socket.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <errno.h>
#include    <syslog.h>  /* for syslog() */
#include    <stdarg.h>  /* ANSI C header file */
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
int daemon\_proc;        /* set nonzero by daemon\_init() */
union val {
int i\_val;
long l\_val;
struct linger linger\_val;
struct timeval timeval\_val;
} val;
static char strres[128];
char *sock\_str\_flag(union val *ptr, int len)
{
/* *INDENT-OFF* */
if (len != sizeof(int))
snprintf(strres, sizeof(strres), "size (%d) not sizeof(int)", len);
else
snprintf(strres, sizeof(strres), "%s", (ptr->i\_val == 0) ? "off" : "on");
return (strres);
/* *INDENT-ON* */
}
char *sock\_str\_int(union val *ptr, int len)
{
if (len != sizeof(int))
snprintf(strres, sizeof(strres), "size (%d) not sizeof(int)",
len);
else
snprintf(strres, sizeof(strres), "%d", ptr->i\_val);
return (strres);
}
char *sock\_str\_linger(union val *ptr, int len)
{
struct linger *lptr = &ptr->linger\_val;
if (len != sizeof(struct linger))
snprintf(strres, sizeof(strres),
"size (%d) not sizeof(struct linger)", len);
else
snprintf(strres, sizeof(strres), "l\_onoff = %d, l\_linger = %d",
lptr->l\_onoff, lptr->l\_linger);
return (strres);
}
char *sock\_str\_timeval(union val *ptr, int len)
{
struct timeval *tvptr = &ptr->timeval\_val;
if (len != sizeof(struct timeval))
snprintf(strres, sizeof(strres),
"size (%d) not sizeof(struct timeval)", len);
else
snprintf(strres, sizeof(strres), "%ld sec, %ld usec",
tvptr->tv\_sec, tvptr->tv\_usec);
return (strres);
}
struct sock\_opts {
const char *opt\_str;
int opt\_level;
int opt\_name;
char *(*opt\_val\_str) (union val *, int);
} sock\_opts[] = {
{
"SO\_BROADCAST", SOL\_SOCKET, SO\_BROADCAST, sock\_str\_flag}, {
"SO\_DEBUG", SOL\_SOCKET, SO\_DEBUG, sock\_str\_flag}, {
"SO\_DONTROUTE", SOL\_SOCKET, SO\_DONTROUTE, sock\_str\_flag}, {
"SO\_ERROR", SOL\_SOCKET, SO\_ERROR, sock\_str\_int}, {
"SO\_KEEPALIVE", SOL\_SOCKET, SO\_KEEPALIVE, sock\_str\_flag}, {
"SO\_LINGER", SOL\_SOCKET, SO\_LINGER, sock\_str\_linger}, {
"SO\_OOBINLINE", SOL\_SOCKET, SO\_OOBINLINE, sock\_str\_flag}, {
"SO\_RCVBUF", SOL\_SOCKET, SO\_RCVBUF, sock\_str\_int}, {
"SO\_SNDBUF", SOL\_SOCKET, SO\_SNDBUF, sock\_str\_int}, {
"SO\_RCVLOWAT", SOL\_SOCKET, SO\_RCVLOWAT, sock\_str\_int}, {
"SO\_SNDLOWAT", SOL\_SOCKET, SO\_SNDLOWAT, sock\_str\_int}, {
"SO\_RCVTIMEO", SOL\_SOCKET, SO\_RCVTIMEO, sock\_str\_timeval}, {
"SO\_SNDTIMEO", SOL\_SOCKET, SO\_SNDTIMEO, sock\_str\_timeval}, {
"SO\_REUSEADDR", SOL\_SOCKET, SO\_REUSEADDR, sock\_str\_flag},
#ifdef  SO\_REUSEPORT
{
"SO\_REUSEPORT", SOL\_SOCKET, SO\_REUSEPORT, sock\_str\_flag},
#else
{
"SO\_REUSEPORT", 0, 0, NULL},
#endif
{
"SO\_TYPE", SOL\_SOCKET, SO\_TYPE, sock\_str\_int},
/*              { "SO\_USELOOPBACK", SOL\_SOCKET, SO\_USELOOPBACK, sock\_str\_flag }, */
{
"IP\_TOS", IPPROTO\_IP, IP\_TOS, sock\_str\_int}, {
"IP\_TTL", IPPROTO\_IP, IP\_TTL, sock\_str\_int},
#ifdef IPV6
#ifdef  IPV6\_DONTFRAG
{
"IPV6\_DONTFRAG", IPPROTO\_IPV6, IPV6\_DONTFRAG, sock\_str\_flag},
#else
{
"IPV6\_DONTFRAG", 0, 0, NULL},
#endif
#ifdef  IPV6\_UNICAST\_HOPS
{
"IPV6\_UNICAST\_HOPS", IPPROTO\_IPV6, IPV6\_UNICAST\_HOPS,
sock\_str\_int},
#else
{
"IPV6\_UNICAST\_HOPS", 0, 0, NULL},
#endif
#ifdef  IPV6\_V6ONLY
{
"IPV6\_V6ONLY", IPPROTO\_IPV6, IPV6\_V6ONLY, sock\_str\_flag},
#else
{
"IPV6\_V6ONLY", 0, 0, NULL},
#endif
#endif
{
"TCP\_MAXSEG", IPPROTO\_TCP, TCP\_MAXSEG, sock\_str\_int}, {
"TCP\_NODELAY", IPPROTO\_TCP, TCP\_NODELAY, sock\_str\_flag},
#ifdef  SCTP\_AUTOCLOSE
{
"SCTP\_AUTOCLOSE", IPPROTO\_SCTP, SCTP\_AUTOCLOSE, sock\_str\_int},
#else
{
"SCTP\_AUTOCLOSE", 0, 0, NULL},
#endif
#ifdef  SCTP\_MAXBURST
{
"SCTP\_MAXBURST", IPPROTO\_SCTP, SCTP\_MAXBURST, sock\_str\_int},
#else
{
"SCTP\_MAXBURST", 0, 0, NULL},
#endif
#ifdef  SCTP\_MAXSEG
{
"SCTP\_MAXSEG", IPPROTO\_SCTP, SCTP\_MAXSEG, sock\_str\_int},
#else
{
"SCTP\_MAXSEG", 0, 0, NULL},
#endif
#ifdef  SCTP\_NODELAY
{
"SCTP\_NODELAY", IPPROTO\_SCTP, SCTP\_NODELAY, sock\_str\_flag},
#else
{
"SCTP\_NODELAY", 0, 0, NULL},
#endif
{
NULL, 0, 0, NULL}
};
/* *INDENT-ON* */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_ret(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_INFO, fmt, ap);
va\_end(ap);
return;
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
int main()
{
int fd;
socklen\_t len;
struct sock\_opts *ptr;
for (ptr = sock\_opts; ptr->opt\_str != NULL; ptr++) {
printf("%s: ", ptr->opt\_str);
if (ptr->opt\_val\_str == NULL)
printf("(undefined)\n");
else {
switch (ptr->opt\_level) {
case SOL\_SOCKET:
case IPPROTO\_IP:
case IPPROTO\_TCP:
fd = Socket(AF\_INET, SOCK\_STREAM, 0);
break;
#ifdef  IPV6
case IPPROTO\_IPV6:
fd = Socket(AF\_INET6, SOCK\_STREAM, 0);
break;
#endif
#ifdef  IPPROTO\_SCTP
case IPPROTO\_SCTP:
fd = Socket(AF\_INET, SOCK\_SEQPACKET,
IPPROTO\_SCTP);
break;
#endif
default:
err\_quit("Can't create fd for level %d\n",
ptr->opt\_level);
}
len = sizeof(val);
if (getsockopt
(fd, ptr->opt\_level, ptr->opt\_name, &val,
&len) == -1) {
err\_ret("getsockopt error");
} else {
printf("default = %s\n",
(*ptr->opt\_val\_str) (&val, len));
}
close(fd);
}
}
exit(0);
}
//第8章 基本UDP套接字编程
8.3 UDP回射服务器程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr *sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void dg\_echo(int sockfd, SA * pcliaddr, socklen\_t clilen)
{
int n;
socklen\_t len;
char mesg[MAXLINE];
for (;;) {
len = clilen;
n = Recvfrom(sockfd, mesg, MAXLINE, 0, pcliaddr, &len);
Sendto(sockfd, mesg, n, 0, pcliaddr, len);
}
}
int main()
{
int sockfd;
struct sockaddr\_in servaddr, cliaddr;
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(sockfd, (SA *) & servaddr, sizeof(servaddr));
dg\_echo(sockfd, (SA *) & cliaddr, sizeof(cliaddr));
}
8.5 UDP回射客户程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
char sendline[MAXLINE], recvline[MAXLINE + 1];
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
n = Recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
8.8 验证接收到的响应
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/un.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
char sendline[MAXLINE], recvline[MAXLINE + 1];
socklen\_t len;
struct sockaddr *preply\_addr;
preply\_addr = (struct sockaddr *)Malloc(servlen);
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
len = servlen;
n = Recvfrom(sockfd, recvline, MAXLINE, 0, preply\_addr, &len);
if (len != servlen || memcmp(pservaddr, preply\_addr, len) != 0) {
printf("reply from %s (ignored)\n",
Sock\_ntop(preply\_addr, len));
continue;
}
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
8.12 dg\_cli函数（修订版）
//调用connect版本
//运行结果跟书上不符：向一个不可达的主机发起连接，没有返回连接拒绝的错误，read永远阻塞
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
char sendline[MAXLINE], recvline[MAXLINE + 1];
Connect(sockfd, (SA *) pservaddr, servlen);
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Write(sockfd, sendline, strlen(sendline));
n = Read(sockfd, recvline, MAXLINE);
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
8.13 UDP缺乏流量控制
8.13.1 写固定数目的数据报的客户端
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
#define NDG     2000    /* datagrams to send */
#define DGLEN   1400        /* length of each datagram */
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int i;
char sendline[DGLEN];
for (i = 0; i < NDG; i++) {
Sendto(sockfd, sendline, DGLEN, 0, pservaddr, servlen);
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
8.13.2 对接收数目进行计数的服务器端
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <signal.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr *sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
static int count;
void recvfrom\_int(int signo)
{
printf("\nreceived %d datagrams\n", count);
exit(0);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
void dg\_echo(int sockfd, SA * pcliaddr, socklen\_t clilen)
{
socklen\_t len;
char mesg[MAXLINE];
Signal(SIGINT, recvfrom\_int);
for (;;) {
len = clilen;
Recvfrom(sockfd, mesg, MAXLINE, 0, pcliaddr, &len);
count++;
}
}
int main()
{
int sockfd;
struct sockaddr\_in servaddr, cliaddr;
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(sockfd, (SA *) & servaddr, sizeof(servaddr));
dg\_echo(sockfd, (SA *) & cliaddr, sizeof(cliaddr));
}
8.13.3 增大套接字接收队列大小
#define \_POSIX\_SOURCE
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <signal.h>
#include    <strings.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr *sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
static int count;
void recvfrom\_int(int signo)
{
printf("\nreceived %d datagrams\n", count);
exit(0);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void dg\_echo(int sockfd, SA * pcliaddr, socklen\_t clilen)
{
int n;
socklen\_t len;
char mesg[MAXLINE];
Signal(SIGINT, recvfrom\_int);
n = 220 * 1024;
Setsockopt(sockfd, SOL\_SOCKET, SO\_RCVBUF, &n, sizeof(n));
for (;;) {
len = clilen;
Recvfrom(sockfd, mesg, MAXLINE, 0, pcliaddr, &len);
count++;
}
}
int main()
{
int sockfd;
struct sockaddr\_in servaddr, cliaddr;
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(sockfd, (SA *) & servaddr, sizeof(servaddr));
dg\_echo(sockfd, (SA *) & cliaddr, sizeof(cliaddr));
}
8.14 UDP中的外出接口的确定
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
void Getsockname(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
if (getsockname(fd, sa, salenptr) < 0)
err\_sys("getsockname error");
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
int main(int argc, char **argv)
{
int sockfd;
socklen\_t len;
struct sockaddr\_in cliaddr, servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
len = sizeof(cliaddr);
Getsockname(sockfd, (SA *) & cliaddr, &len);
printf("local address %s\n", Sock\_ntop((SA *) & cliaddr, len));
exit(0);
}
8.15 使用select函数的TCP和UDP回射服务器程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/select.h>
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <signal.h>
#include    <unistd.h>
#include    <sys/wait.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define max(a,b)    ((a) > (b) ? (a) : (b))
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr *sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void str\_echo(int sockfd)
{
ssize\_t n;
char buf[MAXLINE];
again:
while ((n = read(sockfd, buf, MAXLINE)) > 0)
Writen(sockfd, buf, n);
if (n < 0 && errno == EINTR)
goto again;
else if (n < 0)
err\_sys("str\_echo: read error");
}
void sig\_chld(int signo)
{
pid\_t pid;
int stat;
while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
printf("child %d terminated\n", pid);
return;
}
int main()
{
int listenfd, connfd, udpfd, nready, maxfdp1;
char mesg[MAXLINE];
pid\_t childpid;
fd\_set rset;
ssize\_t n;
socklen\_t len;
const int on = 1;
struct sockaddr\_in cliaddr, servaddr;
/* 4create listening TCP socket */
listenfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));
Listen(listenfd, LISTENQ);
/* 4create UDP socket */
udpfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(udpfd, (SA *) & servaddr, sizeof(servaddr));
/* end udpservselect01 */
/* include udpservselect02 */
Signal(SIGCHLD, sig\_chld);  /* must call waitpid() */
FD\_ZERO(&rset);
maxfdp1 = max(listenfd, udpfd) + 1;
for (;;) {
FD\_SET(listenfd, &rset);
FD\_SET(udpfd, &rset);
if ((nready = select(maxfdp1, &rset, NULL, NULL, NULL)) < 0) {
if (errno == EINTR)
continue;   /* back to for() */
else
err\_sys("select error");
}
if (FD\_ISSET(listenfd, &rset)) {
len = sizeof(cliaddr);
connfd = Accept(listenfd, (SA *) & cliaddr, &len);
if ((childpid = Fork()) == 0) { /* child process */
Close(listenfd);    /* close listening socket */
str\_echo(connfd);   /* process the request */
exit(0);
}
Close(connfd);  /* parent closes connected socket */
}
if (FD\_ISSET(udpfd, &rset)) {
len = sizeof(cliaddr);
n = Recvfrom(udpfd, mesg, MAXLINE, 0, (SA *) & cliaddr,
&len);
Sendto(udpfd, mesg, n, 0, (SA *) & cliaddr, len);
}
}
}
//第10章 SCTP客户/服务器程序例子
10.2 SCTP一到多式流分回射服务器程序
//ubuntu下编译要安装库: sudo apt-get install libsctp-dev，编译时链接libsctp.a.
//下面是例子:g++ -o server server.cpp /usr/lib/libsctp.a
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <netinet/in.h>
#include <errno.h>
#include <stdarg.h>
#include <sys/socket.h>
#include <netinet/sctp.h>
#define BUFFSIZE    8192    /* buffer size for reads and writes */
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877           /* TCP and UDP */
#define SA  struct sockaddr
#define LISTENQ     1024    /* 2nd argument to listen() */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr); /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Setsockopt(int fd, int level, int optname, const void *optval, socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Listen(int fd, int backlog)
{
char    *ptr;
/*4can override 2nd argument with environment variable */
if ( (ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Sctp\_recvmsg(int s, void *msg, size\_t len,
struct sockaddr *from, socklen\_t *fromlen,
struct sctp\_sndrcvinfo *sinfo,
int *msg\_flags)
{
int ret;
ret = sctp\_recvmsg(s,msg,len,from,fromlen,sinfo,msg\_flags);
if(ret < 0){
err\_sys("sctp\_recvmsg error");
}
return(ret);
}
int Sctp\_sendmsg (int s, void *data, size\_t len, struct sockaddr *to,
socklen\_t tolen, uint32\_t ppid, uint32\_t flags,
uint16\_t stream\_no, uint32\_t timetolive, uint32\_t context)
{
int ret;
ret = sctp\_sendmsg(s,data,len,to,tolen,ppid,flags,stream\_no,
timetolive,context);
if(ret < 0){
err\_sys("sctp\_sendmsg error");
}
return(ret);
}
sctp\_assoc\_t sctp\_address\_to\_associd(int sock\_fd, struct sockaddr *sa, socklen\_t salen)
{
struct sctp\_paddrparams sp;
int siz;
siz = sizeof(struct sctp\_paddrparams);
bzero(&sp,siz);
memcpy(&sp.spp\_address,sa,salen);
sctp\_opt\_info(sock\_fd,0,SCTP\_PEER\_ADDR\_PARAMS, &sp, (socklen\_t*)&siz);
return(sp.spp\_assoc\_id);
}
void Getsockopt(int fd, int level, int optname, void *optval, socklen\_t *optlenptr)
{
if (getsockopt(fd, level, optname, optval, optlenptr) < 0)
err\_sys("getsockopt error");
}
int sctp\_get\_no\_strms(int sock\_fd,struct sockaddr *to, socklen\_t tolen)
{
int retsz;
struct sctp\_status status;
retsz = sizeof(status);
bzero(&status,sizeof(status));
status.sstat\_assoc\_id = sctp\_address\_to\_associd(sock\_fd,to,tolen);
Getsockopt(sock\_fd,IPPROTO\_SCTP, SCTP\_STATUS,
&status, (socklen\_t*)&retsz);
return(status.sstat\_outstrms);
}
int main(int argc, char **argv)
{
int sock\_fd,msg\_flags;
char readbuf[BUFFSIZE];
struct sockaddr\_in servaddr, cliaddr;
struct sctp\_sndrcvinfo sri;
struct sctp\_event\_subscribe evnts;
int stream\_increment=1;
socklen\_t len;
size\_t rd\_sz;
if (argc == 2)
stream\_increment = atoi(argv[1]);
sock\_fd = Socket(AF\_INET, SOCK\_SEQPACKET, IPPROTO\_SCTP);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Bind(sock\_fd, (SA *) &servaddr, sizeof(servaddr));
bzero(&evnts, sizeof(evnts));
evnts.sctp\_data\_io\_event = 1;
Setsockopt(sock\_fd, IPPROTO\_SCTP, SCTP\_EVENTS,&evnts, sizeof(evnts));
Listen(sock\_fd, LISTENQ);
for ( ; ; ) {
len = sizeof(struct sockaddr\_in);
rd\_sz = Sctp\_recvmsg(sock\_fd, readbuf, sizeof(readbuf),
(SA *)&cliaddr, &len,
&sri,&msg\_flags);
if(stream\_increment) {
sri.sinfo\_stream++;
if(sri.sinfo\_stream >=10/* sctp\_get\_no\_strms(sock\_fd,(SA *)&cliaddr, len)*/)//书上这句代码在linux上运行出错
sri.sinfo\_stream = 0;
}
Sctp\_sendmsg(sock\_fd, readbuf, rd\_sz,
(SA *)&cliaddr, len,
sri.sinfo\_ppid,
sri.sinfo\_flags,
sri.sinfo\_stream,
0, 0);
}
}
10.3 SCTP一到多式流分回射客户程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include <stdarg.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <netinet/sctp.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877           /* TCP and UDP */
#define SA  struct sockaddr
#define SERV\_MAX\_SCTP\_STRM  10  /* normal maximum streams */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr); /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr); /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char * Fgets(char *ptr, int n, FILE *stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
void Setsockopt(int fd, int level, int optname, const void *optval, socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
int
Sctp\_sendmsg (int s, void *data, size\_t len, struct sockaddr *to,
socklen\_t tolen, uint32\_t ppid, uint32\_t flags,
uint16\_t stream\_no, uint32\_t timetolive, uint32\_t context)
{
int ret;
ret = sctp\_sendmsg(s,data,len,to,tolen,ppid,flags,stream\_no,
timetolive,context);
if(ret < 0){
err\_sys("sctp\_sendmsg error");
}
return(ret);
}
int Sctp\_recvmsg(int s, void *msg, size\_t len,
struct sockaddr *from, socklen\_t *fromlen,
struct sctp\_sndrcvinfo *sinfo,
int *msg\_flags)
{
int ret;
ret = sctp\_recvmsg(s,msg,len,from,fromlen,sinfo,msg\_flags);
if(ret < 0){
err\_sys("sctp\_recvmsg error");
}
return(ret);
}
void sctpstr\_cli(FILE *fp, int sock\_fd, struct sockaddr *to, socklen\_t tolen)
{
struct sockaddr\_in peeraddr;
struct sctp\_sndrcvinfo sri;
char sendline[MAXLINE], recvline[MAXLINE];
socklen\_t len;
int out\_sz,rd\_sz;
int msg\_flags;
bzero(&sri,sizeof(sri));
while (fgets(sendline, MAXLINE, fp) != NULL) {
if(sendline[0] != '[') {
printf("Error, line must be of the form '[streamnum]text'\n");
continue;
}
sri.sinfo\_stream = strtol(&sendline[1],NULL,0);
out\_sz = strlen(sendline);
Sctp\_sendmsg(sock\_fd, sendline, out\_sz,
to, tolen,
0, 0,
sri.sinfo\_stream,
0, 0);
len = sizeof(peeraddr);
rd\_sz = Sctp\_recvmsg(sock\_fd, recvline, sizeof(recvline),
(SA *)&peeraddr, &len,
&sri,&msg\_flags);
printf("From str:%d seq:%d (assoc:0x%x):",
sri.sinfo\_stream,sri.sinfo\_ssn,
(u\_int)sri.sinfo\_assoc\_id);
printf("%.*s",rd\_sz,recvline);
}
}
#define SCTP\_MAXLINE    800
void sctpstr\_cli\_echoall(FILE *fp, int sock\_fd, struct sockaddr *to, socklen\_t tolen)
{
struct sockaddr\_in peeraddr;
struct sctp\_sndrcvinfo sri;
char sendline[SCTP\_MAXLINE], recvline[SCTP\_MAXLINE];
socklen\_t len;
int rd\_sz,i,strsz;
int msg\_flags;
bzero(sendline,sizeof(sendline));
bzero(&sri,sizeof(sri));
while (fgets(sendline, SCTP\_MAXLINE - 9, fp) != NULL) {
strsz = strlen(sendline);
if(sendline[strsz-1] == '\n') {
sendline[strsz-1] = '\0';
strsz--;
}
for(i=0;i<SERV\_MAX\_SCTP\_STRM;i++) {
snprintf(sendline + strsz, sizeof(sendline) - strsz,
".msg.%d", i);
Sctp\_sendmsg(sock\_fd, sendline, sizeof(sendline),
to, tolen,
0, 0,
i,
0, 0);
}
for(i=0;i<SERV\_MAX\_SCTP\_STRM;i++) {
len = sizeof(peeraddr);
rd\_sz = Sctp\_recvmsg(sock\_fd, recvline, sizeof(recvline),
(SA *)&peeraddr, &len,
&sri,&msg\_flags);
printf("From str:%d seq:%d (assoc:0x%x):",
sri.sinfo\_stream,sri.sinfo\_ssn,
(u\_int)sri.sinfo\_assoc\_id);
printf("%.*s\n",rd\_sz,recvline);
}
}
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
int main(int argc, char **argv)
{
int sock\_fd;
struct sockaddr\_in servaddr;
struct sctp\_event\_subscribe evnts;
int echo\_to\_all=0;
if(argc < 2)
err\_quit("Missing host argument - use '%s host [echo]'\n",
argv[0]);
if(argc > 2) {
printf("Echoing messages to all streams\n");
echo\_to\_all = 1;
}
sock\_fd = Socket(AF\_INET, SOCK\_SEQPACKET, IPPROTO\_SCTP);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_addr.s\_addr = htonl(INADDR\_ANY);
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
bzero(&evnts, sizeof(evnts));
evnts.sctp\_data\_io\_event = 1;
Setsockopt(sock\_fd,IPPROTO\_SCTP, SCTP\_EVENTS,
&evnts, sizeof(evnts));
if(echo\_to\_all == 0)
sctpstr\_cli(stdin,sock\_fd,(SA *)&servaddr,sizeof(servaddr));
else
sctpstr\_cli\_echoall(stdin,sock\_fd,(SA *)&servaddr,sizeof(servaddr));
Close(sock\_fd);
return(0);
}
//第11章 名字与地址转换
11.3 gethostbyname函数
#define \_BSD\_SOURCE
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <netdb.h>
#define MAXLINE     4096    /* max text line length */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void err\_msg(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
return;
}
const char *Inet\_ntop(int family, const void *addrptr, char *strptr, size\_t len)
{
const char *ptr;
if (strptr == NULL) /* check for old code */
err\_quit("NULL 3rd argument to inet\_ntop");
if ((ptr = inet\_ntop(family, addrptr, strptr, len)) == NULL)
err\_sys("inet\_ntop error"); /* sets errno */
return (ptr);
}
void err\_ret(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
return;
}
int main(int argc, char **argv)
{
char *ptr, **pptr;
char str[INET\_ADDRSTRLEN];
struct hostent *hptr;
while (--argc > 0) {
ptr = *++argv;
if ((hptr = gethostbyname(ptr)) == NULL) {
err\_msg("gethostbyname error for host: %s: %s",
ptr, hstrerror(h\_errno));
continue;
}
printf("official hostname: %s\n", hptr->h\_name);
for (pptr = hptr->h\_aliases; *pptr != NULL; pptr++)
printf("\talias: %s\n", *pptr);
switch (hptr->h\_addrtype) {
case AF\_INET:
pptr = hptr->h\_addr\_list;
for (; *pptr != NULL; pptr++)
printf("\taddress: %s\n",
Inet\_ntop(hptr->h\_addrtype, *pptr, str,
sizeof(str)));
break;
default:
err\_ret("unknown address type");
break;
}
}
exit(0);
}
11.5 getservbyname和getservbyport函数
//时间获取客户端，使用gethostbyname 和 getservbyname.
#define \_BSD\_SOURCE
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <stdlib.h>
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#include    <netdb.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
void err\_ret(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
return;
}
int main(int argc, char **argv)
{
int sockfd, n;
char recvline[MAXLINE + 1];
struct sockaddr\_in servaddr;
struct in\_addr **pptr;
struct in\_addr *inetaddrp[2];
struct in\_addr inetaddr;
struct hostent *hp;
struct servent *sp;
if (argc != 3)
err\_quit("usage: daytimetcpcli1 <hostname> <service>");
if ((hp = gethostbyname(argv[1])) == NULL) {
if (inet\_aton(argv[1], &inetaddr) == 0) {
err\_quit("hostname error for %s: %s", argv[1],
hstrerror(h\_errno));
} else {
inetaddrp[0] = &inetaddr;
inetaddrp[1] = NULL;
pptr = inetaddrp;
}
} else {
pptr = (struct in\_addr **)hp->h\_addr\_list;
}
if ((sp = getservbyname(argv[2], "tcp")) == NULL)
err\_quit("getservbyname error for %s", argv[2]);
for (; *pptr != NULL; pptr++) {
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = sp->s\_port;
memcpy(&servaddr.sin\_addr, *pptr, sizeof(struct in\_addr));
printf("trying %s\n",
Sock\_ntop((SA *) & servaddr, sizeof(servaddr)));
if (connect(sockfd, (SA *) & servaddr, sizeof(servaddr)) == 0)
break;  /* success */
err\_ret("connect error");
close(sockfd);
}
if (*pptr == NULL)
err\_quit("unable to connect");
while ((n = Read(sockfd, recvline, MAXLINE)) > 0) {
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
exit(0);
}
11.12 tcp\_connect函数
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <stdlib.h>
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#include    <netdb.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
int tcp\_connect(const char *host, const char *serv)
{
int sockfd, n;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_connect error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
sockfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (sockfd < 0)
continue;   /* ignore this one */
if (connect(sockfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(sockfd);  /* ignore this one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno set from final connect() */
err\_sys("tcp\_connect error for %s, %s", host, serv);
freeaddrinfo(ressave);
return (sockfd);
}
int Tcp\_connect(const char *host, const char *serv)
{
return (tcp\_connect(host, serv));
}
void Getpeername(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
if (getpeername(fd, sa, salenptr) < 0)
err\_sys("getpeername error");
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
int main(int argc, char **argv)
{
int sockfd, n;
char recvline[MAXLINE + 1];
socklen\_t len;
struct sockaddr\_storage ss;
if (argc != 3)
err\_quit
("usage: daytimetcpcli <hostname/IPaddress> <service/port#>");
sockfd = Tcp\_connect(argv[1], argv[2]);
len = sizeof(ss);
Getpeername(sockfd, (SA *) & ss, &len);
printf("connected to %s\n", Sock\_ntop\_host((SA *) & ss, len));
while ((n = Read(sockfd, recvline, MAXLINE)) > 0) {
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
exit(0);
}
11.13 tcp\_listen函数
11.13.1 时间获取服务器程序
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <netdb.h>
#include    <arpa/inet.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
int main(int argc, char **argv)
{
int listenfd, connfd;
socklen\_t len;
char buff[MAXLINE];
time\_t ticks;
struct sockaddr\_storage cliaddr;
if (argc != 2)
err\_quit("usage: daytimetcpsrv1 <service or port#>");
listenfd = Tcp\_listen(NULL, argv[1], NULL);
for (;;) {
len = sizeof(cliaddr);
connfd = Accept(listenfd, (SA *) & cliaddr, &len);
printf("connection from %s\n",
Sock\_ntop((SA *) & cliaddr, len));
ticks = time(NULL);
snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
Write(connfd, buff, strlen(buff));
Close(connfd);
}
}
11.13.2 可指定协议的时间获取服务器程序
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <netdb.h>
#include    <arpa/inet.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
#define IPV6
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
int main(int argc, char **argv)
{
int listenfd, connfd;
socklen\_t len, addrlen;
char buff[MAXLINE];
time\_t ticks;
struct sockaddr\_storage cliaddr;
if (argc == 2)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 3)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: daytimetcpsrv2 [ <host> ] <service or port>");
for (;;) {
len = sizeof(cliaddr);
connfd = Accept(listenfd, (SA *) & cliaddr, &len);
printf("connection from %s\n",
Sock\_ntop((SA *) & cliaddr, len));
ticks = time(NULL);
snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
Write(connfd, buff, strlen(buff));
Close(connfd);
}
}
11.14 udp\_client函数
11.14.1 协议无关的时间获取客户端程序
//udp时间获取客户端程序
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <netdb.h>
#include    <sys/un.h>
#define IPV6
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
int udp\_client(const char *host, const char *serv, SA ** saptr,
socklen\_t * lenp)
{
int sockfd, n;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_DGRAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("udp\_client error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
sockfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (sockfd >= 0)
break;  /* success */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno set from final socket() */
err\_sys("udp\_client error for %s, %s", host, serv);
*saptr = (SA *) Malloc(res->ai\_addrlen);
memcpy(*saptr, res->ai\_addr, res->ai\_addrlen);
*lenp = res->ai\_addrlen;
freeaddrinfo(ressave);
return (sockfd);
}
int Udp\_client(const char *host, const char *serv, SA ** saptr,
socklen\_t * lenptr)
{
return (udp\_client(host, serv, saptr, lenptr));
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
int main(int argc, char **argv)
{
int sockfd, n;
char recvline[MAXLINE + 1];
socklen\_t salen;
struct sockaddr *sa;
if (argc != 3)
err\_quit
("usage: daytimeudpcli1 <hostname/IPaddress> <service/port#>");
sockfd = Udp\_client(argv[1], argv[2], &sa, &salen);
printf("sending to %s\n", Sock\_ntop\_host(sa, salen));
Sendto(sockfd, "", 1, 0, sa, salen);    /* send 1-byte datagram */
n = Recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
recvline[n] = '\0'; /* null terminate */
Fputs(recvline, stdout);
exit(0);
}
11.15 udp\_connect函数
//udp时间获取客户端程序
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <netdb.h>
#include    <sys/un.h>
#include    <unistd.h>
#define IPV6
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
int udp\_connect(const char *host, const char *serv)
{
int sockfd, n;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_DGRAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("udp\_connect error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
sockfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (sockfd < 0)
continue;   /* ignore this one */
if (connect(sockfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(sockfd);  /* ignore this one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno set from final connect() */
err\_sys("udp\_connect error for %s, %s", host, serv);
freeaddrinfo(ressave);
return (sockfd);
}
int Udp\_connect(const char *host, const char *serv)
{
int n;
if ((n = udp\_connect(host, serv)) < 0) {
err\_quit("udp\_connect error for %s, %s: %s",
host, serv, gai\_strerror(-n));
}
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
int main(int argc, char **argv)
{
int sockfd, n;
char recvline[MAXLINE + 1];
if (argc != 3)
err\_quit
("usage: daytimeudpcli2 <hostname/IPaddress> <service/port#>");
sockfd = Udp\_connect(argv[1], argv[2]);
Write(sockfd, (void *)"", 1);   /* send 1-byte datagram */
n = Read(sockfd, recvline, MAXLINE);
recvline[n] = '\0'; /* null terminate */
Fputs(recvline, stdout);
exit(0);
}
11.16 udp\_server函数
11.16.1 协议无关的时间获取服务器程序
#define \_POSIX\_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <time.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <netdb.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#include    <sys/un.h>
#define IPV6
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr *sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
int udp\_server(const char *host, const char *serv, socklen\_t * addrlenp)
{
int sockfd, n;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_DGRAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("udp\_server error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
sockfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (sockfd < 0)
continue;   /* error - try next one */
if (bind(sockfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(sockfd);  /* bind error - close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("udp\_server error for %s, %s", host, serv);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (sockfd);
}
/* end udp\_server */
int Udp\_server(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (udp\_server(host, serv, addrlenp));
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
int main(int argc, char **argv)
{
int sockfd;
ssize\_t n;
char buff[MAXLINE];
time\_t ticks;
socklen\_t len;
struct sockaddr\_storage cliaddr;
if (argc == 2)
sockfd = Udp\_server(NULL, argv[1], NULL);
else if (argc == 3)
sockfd = Udp\_server(argv[1], argv[2], NULL);
else
err\_quit("usage: daytimeudpsrv [ <host> ] <service or port>");
for (;;) {
len = sizeof(cliaddr);
n = Recvfrom(sockfd, buff, MAXLINE, 0, (SA *) & cliaddr, &len);
printf("datagram from %s\n", Sock\_ntop((SA *) & cliaddr, len));
ticks = time(NULL);
snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
Sendto(sockfd, buff, strlen(buff), 0, (SA *) & cliaddr, len);
}
}
//第13章 守护进程和inetd超级服务器
13.4 daemon\_init函数
13.4.1 作为守护进程运行的协议无关时间获取服务器程序
//运行: ./server localhost daytime
//查看日志: tail /var/log/syslog
#define \_POSIX\_SOURCE
#include    <time.h>
#include    <strings.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <netdb.h>
#include    <arpa/inet.h>
#include    <sys/un.h>
#include    <syslog.h>
#include    <signal.h>
#include    <fcntl.h>   /* for nonblocking */
typedef void Sigfunc(int);  /* for signal handlers */
#define MAXFD   64
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
#define IPV6
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_msg(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_INFO, fmt, ap);
va\_end(ap);
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
int daemon\_init(const char *pname, int facility)
{
int i;
pid\_t pid;
if ((pid = Fork()) < 0)
return (-1);
else if (pid)
\_exit(0);   /* parent terminates */
/* child 1 continues... */
if (setsid() < 0)   /* become session leader */
return (-1);
Signal(SIGHUP, SIG\_IGN);
if ((pid = Fork()) < 0)
return (-1);
else if (pid)
\_exit(0);   /* child 1 terminates */
/* child 2 continues... */
daemon\_proc = 1;    /* for err\_XXX() functions */
chdir("/");     /* change working directory */
/* close off file descriptors */
for (i = 0; i < MAXFD; i++)
close(i);
/* redirect stdin, stdout, and stderr to /dev/null */
open("/dev/null", O\_RDONLY);
open("/dev/null", O\_RDWR);
open("/dev/null", O\_RDWR);
openlog(pname, LOG\_PID, facility);
return (0);     /* success */
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
int main(int argc, char **argv)
{
int listenfd, connfd;
socklen\_t addrlen, len;
struct sockaddr *cliaddr;
char buff[MAXLINE];
time\_t ticks;
if (argc < 2 || argc > 3)
err\_quit("usage: daytimetcpsrv2 [ <host> ] <service or port>");
daemon\_init(argv[0], 0);
if (argc == 2)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
cliaddr = (struct sockaddr *)Malloc(addrlen);
for (;;) {
len = addrlen;
connfd = Accept(listenfd, cliaddr, &len);
err\_msg("connection from %s", Sock\_ntop(cliaddr, len));
ticks = time(NULL);
snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
Write(connfd, buff, strlen(buff));
Close(connfd);
}
}
13.6 daemon\_inetd函数
要运行这个例子程序，
1.先要添加服务:
做法,在/etc/services最后加上: mydaytime     9999/tcp
2.安装xinetd:
sudo apt-get install xinetd
3.编辑配置:在/etc/xinetd.d/目录下新建一个mydaytime文件,内容如下:
service mydaytime
{
socket\_type = stream
protocol    = tcp
wait        = no
user    =root
server  =/home/xpmo/unp/server
}
其中server是例子程序的路径
4.重启xinetd
sudo killall -HUP xinetd
例子代码:
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <arpa/inet.h>
#include    <sys/un.h>
#include    <syslog.h>
#define MAXLINE     4096    /* max text line length */
#define IPV6
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_msg(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_INFO, fmt, ap);
va\_end(ap);
return;
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
char *sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char portstr[8];
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
if (ntohs(sin->sin\_port) != 0) {
snprintf(portstr, sizeof(portstr), ":%d",
ntohs(sin->sin\_port));
strcat(str, portstr);
}
return (str);
}
/* end sock\_ntop */
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
str[0] = '[';
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str + 1,
sizeof(str) - 1) == NULL)
return (NULL);
if (ntohs(sin6->sin6\_port) != 0) {
snprintf(portstr, sizeof(portstr), "]:%d",
ntohs(sin6->sin6\_port));
strcat(str, portstr);
return (str);
}
return (str + 1);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s (index %d)",
sdl->sdl\_nlen, &sdl->sdl\_data[0],
sdl->sdl\_index);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop: unknown AF\_xxx: %d, len %d", sa->sa\_family,
salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop(sa, salen)) == NULL)
err\_sys("sock\_ntop error"); /* inet\_ntop() sets errno */
return (ptr);
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
void daemon\_inetd(const char *pname, int facility)
{
daemon\_proc = 1;    /* for our err\_XXX() functions */
openlog(pname, LOG\_PID, facility);
}
void Getpeername(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
if (getpeername(fd, sa, salenptr) < 0)
err\_sys("getpeername error");
}
int main(int argc, char **argv)
{
socklen\_t len;
struct sockaddr *cliaddr;
char buff[MAXLINE];
time\_t ticks;
daemon\_inetd(argv[0], 0);
cliaddr = (struct sockaddr *)Malloc(sizeof(struct sockaddr\_storage));
len = sizeof(struct sockaddr\_storage);
Getpeername(0, cliaddr, &len);
err\_msg("connection from %s", Sock\_ntop(cliaddr, len));
ticks = time(NULL);
snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
Write(0, buff, strlen(buff));
Close(0);       /* close TCP connection */
exit(0);
}
//第14章 高级I/O函数
14.2 套接字超时
14.2.1 使用SIGALRM 为连接设置超时
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <stdlib.h>
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#include    <signal.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
void err\_msg(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
return;
}
void connect\_alarm(int signo)
{
printf("time out\n");
return;         /* just interrupt the connect() */
}
int connect\_timeo(int sockfd, const SA * saptr, socklen\_t salen, int nsec)
{
Sigfunc *sigfunc;
int n;
sigfunc = Signal(SIGALRM, connect\_alarm);
if (alarm(nsec) != 0)
err\_msg("connect\_timeo: alarm was already set");
if ((n = connect(sockfd, saptr, salen)) < 0) {
close(sockfd);
if (errno == EINTR)
errno = ETIMEDOUT;
}
alarm(0);       /* turn off the alarm */
Signal(SIGALRM, sigfunc);   /* restore previous signal handler */
return (n);
}
void Connect\_timeo(int fd, const SA * sa, socklen\_t salen, int sec)
{
if (connect\_timeo(fd, sa, salen, sec) < 0)
err\_sys("connect\_timeo error");
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: a.out <IPaddress>");
if ((sockfd = socket(AF\_INET, SOCK\_STREAM, 0)) < 0)
err\_sys("socket error");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(13);  /* daytime server */
if (inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr) <= 0)
err\_quit("inet\_pton error for %s", argv[1]);
Connect\_timeo(sockfd, (SA *) & servaddr, sizeof(servaddr), 5);
exit(0);
}
14.2.2 使用SIGALRM 为recvfrom设置超时
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
void sig\_alrm(int signo)
{
printf("time out\n");
return;         /* just interrupt the recvfrom() */
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
char sendline[MAXLINE], recvline[MAXLINE + 1];
Signal(SIGALRM, sig\_alrm);
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
alarm(5);
if ((n =
recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL)) < 0) {
if (errno == EINTR)
fprintf(stderr, "socket timeout\n");
else
err\_sys("recvfrom error");
} else {
alarm(0);
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
14.2.3 使用select 为recvfrom设置超时
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/select.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
int readable\_timeo(int fd, int sec)
{
fd\_set rset;
struct timeval tv;
FD\_ZERO(&rset);
FD\_SET(fd, &rset);
tv.tv\_sec = sec;
tv.tv\_usec = 0;
return (select(fd + 1, &rset, NULL, NULL, &tv));
/* 4> 0 if descriptor is readable */
}
int Readable\_timeo(int fd, int sec)
{
int n;
if ((n = readable\_timeo(fd, sec)) < 0)
err\_sys("readable\_timeo error");
return (n);
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
char sendline[MAXLINE], recvline[MAXLINE + 1];
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
if (Readable\_timeo(sockfd, 5) == 0) {
fprintf(stderr, "socket timeout\n");
} else {
n = Recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
14.2.4 使用 SO\_RCVTIMEO 为recvfrom 设置超时
#define \_\_need\_timeval
#include    <strings.h>
#include    <time.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
char sendline[MAXLINE], recvline[MAXLINE + 1];
struct timeval tv;
tv.tv\_sec = 5;
tv.tv\_usec = 0;
Setsockopt(sockfd, SOL\_SOCKET, SO\_RCVTIMEO, &tv, sizeof(tv));
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
n = recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
if (n < 0) {
if (errno == EWOULDBLOCK) {
fprintf(stderr, "socket timeout\n");
continue;
} else
err\_sys("recvfrom error");
}
recvline[n] = 0;    /* null terminate */
Fputs(recvline, stdout);
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
//第16章 非阻塞式I/O
16.2 非阻塞读和写：str\_cli函数（修订版）
//使用select
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#include    <fcntl.h>
#include    <time.h>
#include    <sys/time.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
int Select(int nfds, fd\_set * readfds, fd\_set * writefds, fd\_set * exceptfds,
struct timeval *timeout)
{
int n;
do {
n = select(nfds, readfds, writefds, exceptfds, timeout);
if (n < 0 && errno != EINTR)
err\_sys("select error");
} while (n < 0);
return (n);     /* can return 0 on timeout */
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Shutdown(int fd, int how)
{
if (shutdown(fd, how) < 0)
err\_sys("shutdown error");
}
int Fcntl(int fd, int cmd, int arg)
{
int n;
if ((n = fcntl(fd, cmd, arg)) == -1)
err\_sys("fcntl error");
return (n);
}
char *gf\_time(void)
{
struct timeval tv;
time\_t t;
static char str[30];
char *ptr;
if (gettimeofday(&tv, NULL) < 0)
err\_sys("gettimeofday error");
t = tv.tv\_sec;      /* POSIX says tv.tv\_sec is time\_t; some BSDs don't agree. */
ptr = ctime(&t);
strcpy(str, &ptr[11]);
/* Fri Sep 13 00:00:00 1986\n\0 */
/* 0123456789012345678901234 5  */
snprintf(str + 8, sizeof(str) - 8, ".%06ld", tv.tv\_usec);
return (str);
}
void str\_cli(int sockfd)
{
int maxfdp1, val, stdineof;
ssize\_t n, nwritten;
fd\_set rset, wset;
char to[MAXLINE], fr[MAXLINE];
char *toiptr, *tooptr, *friptr, *froptr;
val = Fcntl(sockfd, F\_GETFL, 0);
Fcntl(sockfd, F\_SETFL, val | O\_NONBLOCK);
val = Fcntl(STDIN\_FILENO, F\_GETFL, 0);
Fcntl(STDIN\_FILENO, F\_SETFL, val | O\_NONBLOCK);
val = Fcntl(STDOUT\_FILENO, F\_GETFL, 0);
Fcntl(STDOUT\_FILENO, F\_SETFL, val | O\_NONBLOCK);
toiptr = tooptr = to;   /* initialize buffer pointers */
friptr = froptr = fr;
stdineof = 0;
maxfdp1 = max(max(STDIN\_FILENO, STDOUT\_FILENO), sockfd) + 1;
for (;;) {
FD\_ZERO(&rset);
FD\_ZERO(&wset);
if (stdineof == 0 && toiptr < &to[MAXLINE])
FD\_SET(STDIN\_FILENO, &rset);    /* read from stdin */
if (friptr < &fr[MAXLINE])
FD\_SET(sockfd, &rset);  /* read from socket */
if (tooptr != toiptr)
FD\_SET(sockfd, &wset);  /* data to write to socket */
if (froptr != friptr)
FD\_SET(STDOUT\_FILENO, &wset);   /* data to write to stdout */
Select(maxfdp1, &rset, &wset, NULL, NULL);
/* end nonb1 */
/* include nonb2 */
if (FD\_ISSET(STDIN\_FILENO, &rset)) {
if ((n =
read(STDIN\_FILENO, toiptr,
&to[MAXLINE] - toiptr)) < 0) {
if (errno != EWOULDBLOCK)
err\_sys("read error on stdin");
} else if (n == 0) {
fprintf(stderr, "%s: EOF on stdin\n",
gf\_time());
stdineof = 1;   /* all done with stdin */
if (tooptr == toiptr)
Shutdown(sockfd, SHUT\_WR);  /* send FIN */
} else {
fprintf(stderr,
"%s: read %d bytes from stdin\n",
gf\_time(), n);
toiptr += n;    /* # just read */
FD\_SET(sockfd, &wset);  /* try and write to socket below */
}
}
if (FD\_ISSET(sockfd, &rset)) {
if ((n =
read(sockfd, friptr, &fr[MAXLINE] - friptr)) < 0) {
if (errno != EWOULDBLOCK)
err\_sys("read error on socket");
} else if (n == 0) {
fprintf(stderr, "%s: EOF on socket\n",
gf\_time());
if (stdineof)
return; /* normal termination */
else
err\_quit
("str\_cli: server terminated prematurely");
} else {
fprintf(stderr,
"%s: read %d bytes from socket\n",
gf\_time(), n);
friptr += n;    /* # just read */
FD\_SET(STDOUT\_FILENO, &wset);   /* try and write below */
}
}
/* end nonb2 */
/* include nonb3 */
if (FD\_ISSET(STDOUT\_FILENO, &wset)
&& ((n = friptr - froptr) > 0)) {
if ((nwritten = write(STDOUT\_FILENO, froptr, n)) < 0) {
if (errno != EWOULDBLOCK)
err\_sys("write error to stdout");
} else {
fprintf(stderr,
"%s: wrote %d bytes to stdout\n",
gf\_time(), nwritten);
froptr += nwritten; /* # just written */
if (froptr == friptr)
froptr = friptr = fr;   /* back to beginning of buffer */
}
}
if (FD\_ISSET(sockfd, &wset) && ((n = toiptr - tooptr) > 0)) {
if ((nwritten = write(sockfd, tooptr, n)) < 0) {
if (errno != EWOULDBLOCK)
err\_sys("write error to socket");
} else {
fprintf(stderr,
"%s: wrote %d bytes to socket\n",
gf\_time(), nwritten);
tooptr += nwritten; /* # just written */
if (tooptr == toiptr) {
toiptr = tooptr = to;   /* back to beginning of buffer */
if (stdineof)
Shutdown(sockfd, SHUT\_WR);  /* send FIN */
}
}
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(sockfd);    /* do it all */
exit(0);
}
16.2.1 非阻塞读和写：str\_cli函数,使用epoll
//使用epoll
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <sys/epoll.h>
#include    <strings.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#include    <fcntl.h>
#include    <time.h>
#include    <sys/time.h>
#define MAX\_EVENTS 10
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Shutdown(int fd, int how)
{
if (shutdown(fd, how) < 0)
err\_sys("shutdown error");
}
int Fcntl(int fd, int cmd, int arg)
{
int n;
if ((n = fcntl(fd, cmd, arg)) == -1)
err\_sys("fcntl error");
return (n);
}
char *gf\_time(void)
{
struct timeval tv;
time\_t t;
static char str[30];
char *ptr;
if (gettimeofday(&tv, NULL) < 0)
err\_sys("gettimeofday error");
t = tv.tv\_sec;      /* POSIX says tv.tv\_sec is time\_t; some BSDs don't agree. */
ptr = ctime(&t);
strcpy(str, &ptr[11]);
/* Fri Sep 13 00:00:00 1986\n\0 */
/* 0123456789012345678901234 5  */
snprintf(str + 8, sizeof(str) - 8, ".%06ld", tv.tv\_usec);
return (str);
}
void set\_nonblock(int fd)
{
int val = Fcntl(fd, F\_GETFL, 0);
Fcntl(fd, F\_SETFL, val | O\_NONBLOCK);
}
void Epoll\_ctl(int epfd, int op, int fd, struct epoll\_event *event)
{
if (epoll\_ctl(epfd, op, fd, event) < 0)
err\_sys("epoll\_ctl error");
}
int Epoll\_wait(int epfd, struct epoll\_event *events, int maxevents, int timeout)
{
int n;
do {
n = epoll\_wait(epfd, events, maxevents, timeout);
if (n < 0 && errno != EINTR)
err\_sys("epoll\_wait error");
} while (n < 0);
return (n);
}
void add\_event(int epfd, int fd, unsigned int event)
{
struct epoll\_event ev;
ev.data.fd = fd;
ev.events = event;
Epoll\_ctl(epfd, EPOLL\_CTL\_ADD, fd, &ev);
}
void str\_cli(int sockfd)
{
int stdineof;
ssize\_t n, nwritten;
char to[MAXLINE], fr[MAXLINE];
char *toiptr, *tooptr, *friptr, *froptr;
toiptr = tooptr = to;   /* initialize buffer pointers */
friptr = froptr = fr;
set\_nonblock(sockfd);
set\_nonblock(STDIN\_FILENO);
set\_nonblock(STDOUT\_FILENO);
int epfd = epoll\_create(MAX\_EVENTS);
add\_event(epfd, STDIN\_FILENO, EPOLLIN);
add\_event(epfd, STDOUT\_FILENO, EPOLLOUT);
add\_event(epfd, sockfd, EPOLLIN | EPOLLOUT);
struct epoll\_event revents[MAX\_EVENTS]; //returned events
stdineof = 0;
for (;;) {
int nready = Epoll\_wait(epfd, revents, MAX\_EVENTS, -1);
for (int i = 0; i < nready; i++) {
if (revents[i].data.fd == STDIN\_FILENO) {
n = read(STDIN\_FILENO, toiptr,
&to[MAXLINE] - toiptr);
if (n < 0 && errno != EWOULDBLOCK) {
err\_sys("read error on stdin");
} else if (n == 0) {
fprintf(stderr,
"%s: EOF on stdin\n",
gf\_time());
stdineof = 1;   /* all done with stdin */
if (tooptr == toiptr)
Shutdown(sockfd, SHUT\_WR);  /* send FIN */
} else {
fprintf(stderr,
"%s: read %d bytes from stdin\n",
gf\_time(), n);
toiptr += n;    /* # just read */
}
}
if (revents[i].data.fd == sockfd) {
if (revents[i].events & EPOLLIN) {
n = read(sockfd, friptr,
&fr[MAXLINE] - friptr);
if (n < 0 && errno != EWOULDBLOCK) {
err\_sys("read error on socket");
} else if (n == 0) {
fprintf(stderr,
"%s: EOF on socket\n",
gf\_time());
if (stdineof)
return; /* normal termination */
else
err\_quit
("str\_cli: server terminated prematurely");
} else {
fprintf(stderr,
"%s: read %d bytes from socket\n",
gf\_time(), n);
friptr += n;    /* # just read */
}
}
if (revents[i].events & EPOLLOUT) {
n = toiptr - tooptr;
if (n > 0) {
nwritten =
write(sockfd, tooptr, n);
if (nwritten < 0
&& errno != EWOULDBLOCK) {
err\_sys
("write error to socket");
} else {
fprintf(stderr,
"%s: wrote %d bytes to socket\n",
gf\_time(),
nwritten);
tooptr += nwritten; /* # just written */
if (tooptr == toiptr) {
toiptr = tooptr = to;   /* back to beginning of buffer */
if (stdineof)
Shutdown(sockfd, SHUT\_WR);  /* send FIN */
}
}
}
}
}
if (revents[i].data.fd == STDOUT\_FILENO) {
n = friptr - froptr;
if (n > 0) {
nwritten =
write(STDOUT\_FILENO, froptr, n);
if (nwritten < 0
&& errno != EWOULDBLOCK) {
err\_sys
("write error to stdout");
} else {
fprintf(stderr,
"%s: wrote %d bytes to stdout\n",
gf\_time(), nwritten);
froptr += nwritten; /* # just written */
if (froptr == friptr)
froptr = friptr = fr;   /* back to beginning of buffer */
}
}
}
}
}
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(sockfd);    /* do it all */
exit(0);
}
16.2.2 str\_cli函数的较简单版本
#define \_POSIX\_SOURCE
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <signal.h>
#include    <strings.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#include    <signal.h>
#define MAXLINE     4096    /* max text line length */
#define SERV\_PORT        9877   /* TCP and UDP */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
void Connect(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (connect(fd, sa, salen) < 0)
err\_sys("connect error");
}
ssize\_t writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = (const char *)vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void Shutdown(int fd, int how)
{
if (shutdown(fd, how) < 0)
err\_sys("shutdown error");
}
int read\_cnt;
char *read\_ptr;
char read\_buf[MAXLINE];
ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = (char *)vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void str\_cli(FILE * fp, int sockfd)
{
pid\_t pid;
char sendline[MAXLINE], recvline[MAXLINE];
if ((pid = Fork()) == 0) {  /* child: server -> stdout */
while (Readline(sockfd, recvline, MAXLINE) > 0)
Fputs(recvline, stdout);
kill(getppid(), SIGTERM);   /* in case parent still running */
exit(0);
}
/* parent: stdin -> server */
while (Fgets(sendline, MAXLINE, fp) != NULL)
Writen(sockfd, sendline, strlen(sendline));
Shutdown(sockfd, SHUT\_WR);  /* EOF on stdin, send FIN */
pause();
return;
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: tcpcli <IPaddress>");
sockfd = Socket(AF\_INET, SOCK\_STREAM, 0);
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(SERV\_PORT);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
str\_cli(stdin, sockfd); /* do it all */
exit(0);
}
16.4 非阻塞connect：时间获取客户程序
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/select.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <stdlib.h>
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <fcntl.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Fcntl(int fd, int cmd, int arg)
{
int n;
if ((n = fcntl(fd, cmd, arg)) == -1)
err\_sys("fcntl error");
return (n);
}
int Select(int nfds, fd\_set * readfds, fd\_set * writefds, fd\_set * exceptfds,
struct timeval *timeout)
{
int n;
do {
n = select(nfds, readfds, writefds, exceptfds, timeout);
if (n < 0 && errno != EINTR)
err\_sys("select error");
} while (n < 0);
return (n);     /* can return 0 on timeout */
}
int connect\_nonb(int sockfd, const SA * saptr, socklen\_t salen, int nsec)
{
int flags, n, error;
socklen\_t len;
fd\_set rset, wset;
struct timeval tval;
flags = Fcntl(sockfd, F\_GETFL, 0);
Fcntl(sockfd, F\_SETFL, flags | O\_NONBLOCK);
error = 0;
if ((n = connect(sockfd, saptr, salen)) < 0)
if (errno != EINPROGRESS)
return (-1);
/* Do whatever we want while the connect is taking place. */
if (n == 0)
goto done;  /* connect completed immediately */
FD\_ZERO(&rset);
FD\_SET(sockfd, &rset);
wset = rset;
tval.tv\_sec = nsec;
tval.tv\_usec = 0;
if ((n = Select(sockfd + 1, &rset, &wset, NULL,
nsec ? &tval : NULL)) == 0) {
close(sockfd);  /* timeout */
errno = ETIMEDOUT;
return (-1);
}
if (FD\_ISSET(sockfd, &rset) || FD\_ISSET(sockfd, &wset)) {
len = sizeof(error);
if (getsockopt(sockfd, SOL\_SOCKET, SO\_ERROR, &error, &len) < 0)
return (-1);    /* Solaris pending error */
} else
err\_quit("select error: sockfd not set");
done:
Fcntl(sockfd, F\_SETFL, flags);  /* restore file status flags */
if (error) {
close(sockfd);  /* just in case */
errno = error;
return (-1);
}
return (0);
}
int main(int argc, char **argv)
{
int sockfd, n;
char recvline[MAXLINE + 1];
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: a.out <IPaddress>");
if ((sockfd = socket(AF\_INET, SOCK\_STREAM, 0)) < 0)
err\_sys("socket error");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(13);  /* daytime server */
if (inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr) <= 0)
err\_quit("inet\_pton error for %s", argv[1]);
if (connect\_nonb(sockfd, (SA *) & servaddr, sizeof(servaddr), 5) < 0)
err\_sys("connect error");
while ((n = read(sockfd, recvline, MAXLINE)) > 0) {
recvline[n] = 0;    /* null terminate */
if (fputs(recvline, stdout) == EOF)
err\_sys("fputs error");
}
if (n < 0)
err\_sys("read error");
exit(0);
}
//第17章 ioctl操作
17.6 get\_ifi\_info函数
#define \_GNU\_SOURCE
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <stdlib.h>
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <arpa/inet.h>
#include    <sys/ioctl.h>
#include    <sys/un.h>
#include    <net/if.h>
#include    <sys/types.h>
#define MAXLINE     4096    /* max text line length */
#define IFI\_ALIAS   1   /* ifi\_addr is an alias */
#define IFI\_NAME    16  /* same as IFNAMSIZ in <net/if.h> */
#define IFI\_HADDR    8  /* allow for 64-bit EUI-64 in future */
struct ifi\_info {
char ifi\_name[IFI\_NAME];    /* interface name, null-terminated */
short ifi\_index;    /* interface index */
short ifi\_mtu;      /* interface MTU */
u\_char ifi\_haddr[IFI\_HADDR];    /* hardware address */
u\_short ifi\_hlen;   /* # bytes in hardware address: 0, 6, 8 */
short ifi\_flags;    /* IFF\_xxx constants from <net/if.h> */
short ifi\_myflags;  /* our own IFI\_xxx flags */
struct sockaddr *ifi\_addr;  /* primary address */
struct sockaddr *ifi\_brdaddr;   /* broadcast address */
struct sockaddr *ifi\_dstaddr;   /* destination address */
struct ifi\_info *ifi\_next;  /* next of these structures */
};
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
int Ioctl(int fd, int request, void *arg)
{
int n;
if ((n = ioctl(fd, request, arg)) == -1)
err\_sys("ioctl error");
return (n);     /* streamio of I\_LIST returns value */
}
struct ifi\_info *get\_ifi\_info(int family, int doaliases)
{
struct ifi\_info *ifi, *ifihead, **ifipnext;
int sockfd, len, lastlen, flags, myflags, idx = 0, hlen = 0;
char *ptr, *buf, lastname[IFNAMSIZ], *cptr, *haddr = 0, *sdlname;
struct ifconf ifc;
struct ifreq *ifr, ifrcopy;
struct sockaddr\_in *sinptr;
struct sockaddr\_in6 *sin6ptr;
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
lastlen = 0;
len = 100 * sizeof(struct ifreq);   /* initial buffer size guess */
for (;;) {
buf = (char *)Malloc(len);
ifc.ifc\_len = len;
ifc.ifc\_buf = buf;
if (ioctl(sockfd, SIOCGIFCONF, &ifc) < 0) {
if (errno != EINVAL || lastlen != 0)
err\_sys("ioctl error");
} else {
if (ifc.ifc\_len == lastlen)
break;  /* success, len has not changed */
lastlen = ifc.ifc\_len;
}
len += 10 * sizeof(struct ifreq);   /* increment */
free(buf);
}
ifihead = NULL;
ifipnext = &ifihead;
lastname[0] = 0;
sdlname = NULL;
/* end get\_ifi\_info1 */
/* include get\_ifi\_info2 */
for (ptr = buf; ptr < buf + ifc.ifc\_len;) {
ifr = (struct ifreq *)ptr;
#ifdef  HAVE\_SOCKADDR\_SA\_LEN
len = max(sizeof(struct sockaddr), ifr->ifr\_addr.sa\_len);
#else
switch (ifr->ifr\_addr.sa\_family) {
#ifdef  IPV6
case AF\_INET6:
len = sizeof(struct sockaddr\_in6);
break;
#endif
case AF\_INET:
default:
len = sizeof(struct sockaddr);
break;
}
#endif              /* HAVE\_SOCKADDR\_SA\_LEN */
ptr += sizeof(ifr->ifr\_name) + len; /* for next one in buffer */
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
/* assumes that AF\_LINK precedes AF\_INET or AF\_INET6 */
if (ifr->ifr\_addr.sa\_family == AF\_LINK) {
struct sockaddr\_dl *sdl =
(struct sockaddr\_dl *)&ifr->ifr\_addr;
sdlname = ifr->ifr\_name;
idx = sdl->sdl\_index;
haddr = sdl->sdl\_data + sdl->sdl\_nlen;
hlen = sdl->sdl\_alen;
}
#endif
if (ifr->ifr\_addr.sa\_family != family)
continue;   /* ignore if not desired address family */
myflags = 0;
if ((cptr = strchr(ifr->ifr\_name, ':')) != NULL)
*cptr = 0;  /* replace colon with null */
if (strncmp(lastname, ifr->ifr\_name, IFNAMSIZ) == 0) {
if (doaliases == 0)
continue;   /* already processed this interface */
myflags = IFI\_ALIAS;
}
memcpy(lastname, ifr->ifr\_name, IFNAMSIZ);
ifrcopy = *ifr;
Ioctl(sockfd, SIOCGIFFLAGS, &ifrcopy);
flags = ifrcopy.ifr\_flags;
if ((flags & IFF\_UP) == 0)
continue;   /* ignore if interface not up */
/* end get\_ifi\_info2 */
/* include get\_ifi\_info3 */
ifi = (struct ifi\_info *)Calloc(1, sizeof(struct ifi\_info));
*ifipnext = ifi;    /* prev points to this new one */
ifipnext = &ifi->ifi\_next;  /* pointer to next one goes here */
ifi->ifi\_flags = flags; /* IFF\_xxx values */
ifi->ifi\_myflags = myflags; /* IFI\_xxx values */
#if defined(SIOCGIFMTU) && defined(HAVE\_STRUCT\_IFREQ\_IFR\_MTU)
Ioctl(sockfd, SIOCGIFMTU, &ifrcopy);
ifi->ifi\_mtu = ifrcopy.ifr\_mtu;
#else
ifi->ifi\_mtu = 0;
#endif
memcpy(ifi->ifi\_name, ifr->ifr\_name, IFI\_NAME);
ifi->ifi\_name[IFI\_NAME - 1] = '\0';
/* If the sockaddr\_dl is from a different interface, ignore it */
if (sdlname == NULL || strcmp(sdlname, ifr->ifr\_name) != 0)
idx = hlen = 0;
ifi->ifi\_index = idx;
ifi->ifi\_hlen = hlen;
if (ifi->ifi\_hlen > IFI\_HADDR)
ifi->ifi\_hlen = IFI\_HADDR;
if (hlen)
memcpy(ifi->ifi\_haddr, haddr, ifi->ifi\_hlen);
/* end get\_ifi\_info3 */
/* include get\_ifi\_info4 */
switch (ifr->ifr\_addr.sa\_family) {
case AF\_INET:
sinptr = (struct sockaddr\_in *)&ifr->ifr\_addr;
ifi->ifi\_addr =
(struct sockaddr *)Calloc(1,
sizeof(struct
sockaddr\_in));
memcpy(ifi->ifi\_addr, sinptr,
sizeof(struct sockaddr\_in));
#ifdef  SIOCGIFBRDADDR
if (flags & IFF\_BROADCAST) {
Ioctl(sockfd, SIOCGIFBRDADDR, &ifrcopy);
sinptr = (struct sockaddr\_in *)
&ifrcopy.ifr\_broadaddr;
ifi->ifi\_brdaddr =
(struct sockaddr *)Calloc(1,
sizeof(struct
sockaddr\_in));
memcpy(ifi->ifi\_brdaddr, sinptr,
sizeof(struct sockaddr\_in));
}
#endif
#ifdef  SIOCGIFDSTADDR
if (flags & IFF\_POINTOPOINT) {
Ioctl(sockfd, SIOCGIFDSTADDR, &ifrcopy);
sinptr =
(struct sockaddr\_in *)&ifrcopy.ifr\_dstaddr;
ifi->ifi\_dstaddr =
Calloc(1, sizeof(struct sockaddr\_in));
memcpy(ifi->ifi\_dstaddr, sinptr,
sizeof(struct sockaddr\_in));
}
#endif
break;
case AF\_INET6:
sin6ptr = (struct sockaddr\_in6 *)&ifr->ifr\_addr;
ifi->ifi\_addr = Calloc(1, sizeof(struct sockaddr\_in6));
memcpy(ifi->ifi\_addr, sin6ptr,
sizeof(struct sockaddr\_in6));
#ifdef  SIOCGIFDSTADDR
if (flags & IFF\_POINTOPOINT) {
Ioctl(sockfd, SIOCGIFDSTADDR, &ifrcopy);
sin6ptr =
(struct sockaddr\_in6 *)&ifrcopy.ifr\_dstaddr;
ifi->ifi\_dstaddr =
Calloc(1, sizeof(struct sockaddr\_in6));
memcpy(ifi->ifi\_dstaddr, sin6ptr,
sizeof(struct sockaddr\_in6));
}
#endif
break;
default:
break;
}
}
free(buf);
return (ifihead);   /* pointer to first structure in linked list */
}
/* end get\_ifi\_info4 */
/* include free\_ifi\_info */
void free\_ifi\_info(struct ifi\_info *ifihead)
{
struct ifi\_info *ifi, *ifinext;
for (ifi = ifihead; ifi != NULL; ifi = ifinext) {
if (ifi->ifi\_addr != NULL)
free(ifi->ifi\_addr);
if (ifi->ifi\_brdaddr != NULL)
free(ifi->ifi\_brdaddr);
if (ifi->ifi\_dstaddr != NULL)
free(ifi->ifi\_dstaddr);
ifinext = ifi->ifi\_next;    /* can't fetch ifi\_next after free() */
free(ifi);  /* the ifi\_info{} itself */
}
}
/* end free\_ifi\_info */
struct ifi\_info *Get\_ifi\_info(int family, int doaliases)
{
struct ifi\_info *ifi;
if ((ifi = get\_ifi\_info(family, doaliases)) == NULL)
err\_quit("get\_ifi\_info error");
return (ifi);
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
int main(int argc, char **argv)
{
struct ifi\_info *ifi, *ifihead;
struct sockaddr *sa;
u\_char *ptr;
int i, family, doaliases;
if (argc != 3)
err\_quit("usage: prifinfo <inet4|inet6> <doaliases>");
if (strcmp(argv[1], "inet4") == 0)
family = AF\_INET;
#ifdef  IPv6
else if (strcmp(argv[1], "inet6") == 0)
family = AF\_INET6;
#endif
else
err\_quit("invalid <address-family>");
doaliases = atoi(argv[2]);
for (ifihead = ifi = Get\_ifi\_info(family, doaliases);
ifi != NULL; ifi = ifi->ifi\_next) {
printf("%s: ", ifi->ifi\_name);
if (ifi->ifi\_index != 0)
printf("(%d) ", ifi->ifi\_index);
printf("<");    /* *INDENT-OFF* */
if (ifi->ifi\_flags & IFF\_UP)
printf("UP ");
if (ifi->ifi\_flags & IFF\_BROADCAST)
printf("BCAST ");
if (ifi->ifi\_flags & IFF\_MULTICAST)
printf("MCAST ");
if (ifi->ifi\_flags & IFF\_LOOPBACK)
printf("LOOP ");
if (ifi->ifi\_flags & IFF\_POINTOPOINT)
printf("P2P ");
printf(">\n");
/* *INDENT-ON* */
if ((i = ifi->ifi\_hlen) > 0) {
ptr = ifi->ifi\_haddr;
do {
printf("%s%x",
(i == ifi->ifi\_hlen) ? "  " : ":",
*ptr++);
} while (--i > 0);
printf("\n");
}
if (ifi->ifi\_mtu != 0)
printf("  MTU: %d\n", ifi->ifi\_mtu);
if ((sa = ifi->ifi\_addr) != NULL)
printf("  IP addr: %s\n",
Sock\_ntop\_host(sa, sizeof(*sa)));
if ((sa = ifi->ifi\_brdaddr) != NULL)
printf("  broadcast addr: %s\n",
Sock\_ntop\_host(sa, sizeof(*sa)));
if ((sa = ifi->ifi\_dstaddr) != NULL)
printf("  destination addr: %s\n",
Sock\_ntop\_host(sa, sizeof(*sa)));
}
free\_ifi\_info(ifihead);
exit(0);
}
//第20章 广播
20.4 使用广播的dg\_cli函数
//运行前启动daytime服务,运行：./client 192.168.1.255,启动后,随便输入字符
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <unistd.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void recvfrom\_alarm(int signo)
{
return;         /* just interrupt the recvfrom() */
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
const int on = 1;
char sendline[MAXLINE], recvline[MAXLINE + 1];
socklen\_t len;
struct sockaddr *preply\_addr;
preply\_addr = (struct sockaddr *)Malloc(servlen);
Setsockopt(sockfd, SOL\_SOCKET, SO\_BROADCAST, &on, sizeof(on));
Signal(SIGALRM, recvfrom\_alarm);
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
alarm(5);
for (;;) {
len = servlen;
n = recvfrom(sockfd, recvline, MAXLINE, 0, preply\_addr,
&len);
if (n < 0) {
if (errno == EINTR)
break;  /* waited long enough for replies */
else
err\_sys("recvfrom error");
} else {
recvline[n] = 0;    /* null terminate */
printf("from %s: %s",
Sock\_ntop\_host(preply\_addr, len),
recvline);
}
}
}
free(preply\_addr);
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(13);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
22.5 竞争条件
22.5.2 用pselect阻塞和解阻塞信号
//运行前启动daytime服务,运行：./client 192.168.1.255,启动后,随便输入字符
#define \_POSIX\_SOURCE
#define \_POSIX\_C\_SOURCE  200112L
#include    <sys/select.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <unistd.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void recvfrom\_alarm(int signo)
{
return;         /* just interrupt the recvfrom() */
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
void Sigemptyset(sigset\_t * set)
{
if (sigemptyset(set) == -1)
err\_sys("sigemptyset error");
}
void Sigaddset(sigset\_t * set, int signo)
{
if (sigaddset(set, signo) == -1)
err\_sys("sigaddset error");
}
void
Sigprocmask(int how, const sigset\_t *set, sigset\_t *oset)
{
if (sigprocmask(how, set, oset) == -1)
err\_sys("sigprocmask error");
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n;
const int on = 1;
char sendline[MAXLINE], recvline[MAXLINE + 1];
fd\_set rset;
sigset\_t sigset\_alrm, sigset\_empty;
socklen\_t len;
struct sockaddr *preply\_addr;
preply\_addr = Malloc(servlen);
Setsockopt(sockfd, SOL\_SOCKET, SO\_BROADCAST, &on, sizeof(on));
FD\_ZERO(&rset);
Sigemptyset(&sigset\_empty);
Sigemptyset(&sigset\_alrm);
Sigaddset(&sigset\_alrm, SIGALRM);
Signal(SIGALRM, recvfrom\_alarm);
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
Sigprocmask(SIG\_BLOCK, &sigset\_alrm, NULL);
alarm(5);
for (;;) {
FD\_SET(sockfd, &rset);
n = pselect(sockfd + 1, &rset, NULL, NULL, NULL,
&sigset\_empty);
if (n < 0) {
if (errno == EINTR)
break;
else
err\_sys("pselect error");
} else if (n != 1)
err\_sys("pselect error: returned %d", n);
len = servlen;
n = Recvfrom(sockfd, recvline, MAXLINE, 0, preply\_addr,
&len);
recvline[n] = 0;    /* null terminate */
printf("from %s: %s",
Sock\_ntop\_host(preply\_addr, len), recvline);
}
}
free(preply\_addr);
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(13);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
22.5.4 使用信号处理函数到主控函数的IPC
//运行前启动daytime服务,运行：./client 192.168.1.255,启动后,随便输入字符
#define \_POSIX\_SOURCE
#include    <sys/select.h>
#include    <netinet/in.h>  /* sockaddr\_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <unistd.h>
#include    <sys/un.h>
#define max(a,b)    ((a) > (b) ? (a) : (b))
#define MAXLINE     4096    /* max text line length */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err\_doit(int errnoflag, const char *fmt, va\_list ap)
{
int errno\_save;
char buf[MAXLINE];
errno\_save = errno; /* value caller might want printed */
vsprintf(buf, fmt, ap);
if (errnoflag)
sprintf(buf + strlen(buf), ": %s", strerror(errno\_save));
strcat(buf, "\n");
fflush(stdout);     /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, fmt, ap);
va\_end(ap);
exit(1);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void Inet\_pton(int family, const char *strptr, void *addrptr)
{
int n;
if ((n = inet\_pton(family, strptr, addrptr)) < 0)
err\_sys("inet\_pton error for %s", strptr);  /* errno set */
else if (n == 0)
err\_quit("inet\_pton error for %s", strptr); /* errno not set */
/* nothing to return */
}
char *Fgets(char *ptr, int n, FILE * stream)
{
char *rptr;
if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
err\_sys("fgets error");
return (rptr);
}
ssize\_t Recvfrom(int fd, void *ptr, size\_t nbytes, int flags,
struct sockaddr * sa, socklen\_t * salenptr)
{
ssize\_t n;
if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
err\_sys("recvfrom error");
return (n);
}
void Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void Fputs(const char *ptr, FILE * stream)
{
if (fputs(ptr, stream) == EOF)
err\_sys("fputs error");
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
void Pipe(int *fds)
{
if (pipe(fds) < 0)
err\_sys("pipe error");
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
static int pipefd[2];
static void recvfrom\_alarm(int signo)
{
Write(pipefd[1], "", 1);    /* write one null byte to pipe */
return;
}
void dg\_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen\_t servlen)
{
int n, maxfdp1;
const int on = 1;
char sendline[MAXLINE], recvline[MAXLINE + 1];
fd\_set rset;
socklen\_t len;
struct sockaddr *preply\_addr;
preply\_addr = Malloc(servlen);
Setsockopt(sockfd, SOL\_SOCKET, SO\_BROADCAST, &on, sizeof(on));
Pipe(pipefd);
maxfdp1 = max(sockfd, pipefd[0]) + 1;
FD\_ZERO(&rset);
Signal(SIGALRM, recvfrom\_alarm);
while (Fgets(sendline, MAXLINE, fp) != NULL) {
Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
servlen);
alarm(5);
for (;;) {
FD\_SET(sockfd, &rset);
FD\_SET(pipefd[0], &rset);
if ((n = select(maxfdp1, &rset, NULL, NULL, NULL)) < 0) {
if (errno == EINTR)
continue;
else
err\_sys("select error");
}
if (FD\_ISSET(sockfd, &rset)) {
len = servlen;
n = Recvfrom(sockfd, recvline, MAXLINE, 0,
preply\_addr, &len);
recvline[n] = 0;    /* null terminate */
printf("from %s: %s",
Sock\_ntop\_host(preply\_addr, len),
recvline);
}
if (FD\_ISSET(pipefd[0], &rset)) {
Read(pipefd[0], &n, 1); /* timer expired */
break;
}
}
}
free(preply\_addr);
}
int main(int argc, char **argv)
{
int sockfd;
struct sockaddr\_in servaddr;
if (argc != 2)
err\_quit("usage: udpcli <IPaddress>");
bzero(&servaddr, sizeof(servaddr));
servaddr.sin\_family = AF\_INET;
servaddr.sin\_port = htons(13);
Inet\_pton(AF\_INET, argv[1], &servaddr.sin\_addr);
sockfd = Socket(AF\_INET, SOCK\_DGRAM, 0);
dg\_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));
exit(0);
}
//第28章 原始套接字
28.5 ping程序
#define \_GNU\_SOURCE
#include    <sys/time.h>
#include    <sys/un.h>
#include    <string.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <stdarg.h>
#include    <syslog.h>
#include    <errno.h>
#include    <netinet/in\_systm.h>
#include    <netinet/ip.h>
#include    <netinet/ip\_icmp.h>
#include    <sys/types.h>
#include    <time.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <unistd.h>
#include    <sys/socket.h>
#include    <netdb.h>
#include    <netinet/ip6.h>
#include    <netinet/icmp6.h>
#define BUFSIZE     1500
//#define IPV6
/* globals */
char sendbuf[BUFSIZE];
int datalen;            /* # bytes of data following ICMP header */
char *host;
int nsent;          /* add 1 for each sendto() */
pid\_t pid;          /* our PID */
int sockfd;
int verbose;
struct proto {
void (*fproc) (char *, ssize\_t, struct msghdr *, struct timeval *);
void (*fsend) (void);
void (*finit) (void);
struct sockaddr *sasend;    /* sockaddr{} for send, from getaddrinfo */
struct sockaddr *sarecv;    /* sockaddr{} for receiving */
socklen\_t salen;    /* length of sockaddr{}s */
int icmpproto;      /* IPPROTO\_xxx value for ICMP */
} *pr;
#define MAXLINE     4096    /* max text line length */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
void tv\_sub(struct timeval *out, struct timeval *in)
{
if ((out->tv\_usec -= in->tv\_usec) < 0) {    /* out -= in */
--out->tv\_sec;
out->tv\_usec += 1000000;
}
out->tv\_sec -= in->tv\_sec;
}
void proc\_v4(char *ptr, ssize\_t len, struct msghdr *msg, struct timeval *tvrecv)
{
int hlen1, icmplen;
double rtt;
struct ip *ip;
struct icmp *icmp;
struct timeval *tvsend;
ip = (struct ip *)ptr;  /* start of IP header */
hlen1 = ip->ip\_hl << 2; /* length of IP header */
if (ip->ip\_p != IPPROTO\_ICMP)
return;     /* not ICMP */
icmp = (struct icmp *)(ptr + hlen1);    /* start of ICMP header */
if ((icmplen = len - hlen1) < 8)
return;     /* malformed packet */
if (icmp->icmp\_type == ICMP\_ECHOREPLY) {
if (icmp->icmp\_id != pid)
return; /* not a response to our ECHO\_REQUEST */
if (icmplen < 16)
return; /* not enough data to use */
tvsend = (struct timeval *)icmp->icmp\_data;
tv\_sub(tvrecv, tvsend);
rtt = tvrecv->tv\_sec * 1000.0 + tvrecv->tv\_usec / 1000.0;
printf("%d bytes from %s: seq=%u, ttl=%d, rtt=%.3f ms\n",
icmplen, Sock\_ntop\_host(pr->sarecv, pr->salen),
icmp->icmp\_seq, ip->ip\_ttl, rtt);
} else if (verbose) {
printf("  %d bytes from %s: type = %d, code = %d\n",
icmplen, Sock\_ntop\_host(pr->sarecv, pr->salen),
icmp->icmp\_type, icmp->icmp\_code);
}
}
void Gettimeofday(struct timeval *tv, void *foo)
{
if (gettimeofday(tv, foo) == -1)
err\_sys("gettimeofday error");
return;
}
uint16\_t in\_cksum(uint16\_t * addr, int len)
{
int nleft = len;
uint32\_t sum = 0;
uint16\_t *w = addr;
uint16\_t answer = 0;
/*
* Our algorithm is simple, using a 32 bit accumulator (sum), we add
* sequential 16 bit words to it, and at the end, fold back all the
* carry bits from the top 16 bits into the lower 16 bits.
*/
while (nleft > 1) {
sum += *w++;
nleft -= 2;
}
/* 4mop up an odd byte, if necessary */
if (nleft == 1) {
*(unsigned char *)(&answer) = *(unsigned char *)w;
sum += answer;
}
/* 4add back carry outs from top 16 bits to low 16 bits */
sum = (sum >> 16) + (sum & 0xffff); /* add hi 16 to low 16 */
sum += (sum >> 16); /* add carry */
answer = ~sum;      /* truncate to 16 bits */
return (answer);
}
void
Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
void send\_v4(void)
{
int len;
struct icmp *icmp;
icmp = (struct icmp *)sendbuf;
icmp->icmp\_type = ICMP\_ECHO;
icmp->icmp\_code = 0;
icmp->icmp\_id = pid;
icmp->icmp\_seq = nsent++;
memset(icmp->icmp\_data, 0xa5, datalen); /* fill with pattern */
Gettimeofday((struct timeval *)icmp->icmp\_data, NULL);
len = 8 + datalen;  /* checksum ICMP header and data */
icmp->icmp\_cksum = 0;
icmp->icmp\_cksum = in\_cksum((u\_short *) icmp, len);
Sendto(sockfd, sendbuf, len, 0, pr->sasend, pr->salen);
}
int datalen = 56;       /* data that goes with ICMP echo request */
typedef void Sigfunc(int);  /* for signal handlers */
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
struct addrinfo *Host\_serv(const char *host, const char *serv, int family,
int socktype)
{
int n;
struct addrinfo hints, *res;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_CANONNAME;  /* always return canonical name */
hints.ai\_family = family;   /* 0, AF\_INET, AF\_INET6, etc. */
hints.ai\_socktype = socktype;   /* 0, SOCK\_STREAM, SOCK\_DGRAM, etc. */
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("host\_serv error for %s, %s: %s",
(host == NULL) ? "(no hostname)" : host,
(serv == NULL) ? "(no service name)" : serv,
gai\_strerror(n));
return (res);       /* return pointer to first on linked list */
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
void sig\_alrm(int signo)
{
(*pr->fsend) ();
alarm(1);
return;
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
void readloop(void)
{
int size;
char recvbuf[BUFSIZE];
char controlbuf[BUFSIZE];
struct msghdr msg;
struct iovec iov;
ssize\_t n;
struct timeval tval;
sockfd = Socket(pr->sasend->sa\_family, SOCK\_RAW, pr->icmpproto);
setuid(getuid());   /* don't need special permissions any more */
if (pr->finit)
(*pr->finit) ();
size = 60 * 1024;   /* OK if setsockopt fails */
setsockopt(sockfd, SOL\_SOCKET, SO\_RCVBUF, &size, sizeof(size));
sig\_alrm(SIGALRM);  /* send first packet */
iov.iov\_base = recvbuf;
iov.iov\_len = sizeof(recvbuf);
msg.msg\_name = pr->sarecv;
msg.msg\_iov = &iov;
msg.msg\_iovlen = 1;
msg.msg\_control = controlbuf;
for (;;) {
msg.msg\_namelen = pr->salen;
msg.msg\_controllen = sizeof(controlbuf);
n = recvmsg(sockfd, &msg, 0);
if (n < 0) {
if (errno == EINTR)
continue;
else
err\_sys("recvmsg error");
}
Gettimeofday(&tval, NULL);
(*pr->fproc) (recvbuf, n, &msg, &tval);
}
}
void proc\_v6(char *ptr, ssize\_t len, struct msghdr *msg, struct timeval *tvrecv)
{
#ifdef  IPV6
double rtt;
struct icmp6\_hdr *icmp6;
struct timeval *tvsend;
struct cmsghdr *cmsg;
int hlim;
icmp6 = (struct icmp6\_hdr *)ptr;
if (len < 8)
return;     /* malformed packet */
if (icmp6->icmp6\_type == ICMP6\_ECHO\_REPLY) {
if (icmp6->icmp6\_id != pid)
return; /* not a response to our ECHO\_REQUEST */
if (len < 16)
return; /* not enough data to use */
tvsend = (struct timeval *)(icmp6 + 1);
tv\_sub(tvrecv, tvsend);
rtt = tvrecv->tv\_sec * 1000.0 + tvrecv->tv\_usec / 1000.0;
hlim = -1;
for (cmsg = CMSG\_FIRSTHDR(msg); cmsg != NULL;
cmsg = CMSG\_NXTHDR(msg, cmsg)) {
if (cmsg->cmsg\_level == IPPROTO\_IPV6
&& cmsg->cmsg\_type == IPV6\_HOPLIMIT) {
hlim = *(u\_int32\_t *) CMSG\_DATA(cmsg);
break;
}
}
printf("%d bytes from %s: seq=%u, hlim=",
len, Sock\_ntop\_host(pr->sarecv, pr->salen),
icmp6->icmp6\_seq);
if (hlim == -1)
printf("???");  /* ancillary data missing */
else
printf("%d", hlim);
printf(", rtt=%.3f ms\n", rtt);
} else if (verbose) {
printf("  %d bytes from %s: type = %d, code = %d\n",
len, Sock\_ntop\_host(pr->sarecv, pr->salen),
icmp6->icmp6\_type, icmp6->icmp6\_code);
}
#endif              /* IPV6 */
}
void send\_v6()
{
#ifdef  IPV6
int len;
struct icmp6\_hdr *icmp6;
icmp6 = (struct icmp6\_hdr *)sendbuf;
icmp6->icmp6\_type = ICMP6\_ECHO\_REQUEST;
icmp6->icmp6\_code = 0;
icmp6->icmp6\_id = pid;
icmp6->icmp6\_seq = nsent++;
memset((icmp6 + 1), 0xa5, datalen); /* fill with pattern */
Gettimeofday((struct timeval *)(icmp6 + 1), NULL);
len = 8 + datalen;  /* 8-byte ICMPv6 header */
Sendto(sockfd, sendbuf, len, 0, pr->sasend, pr->salen);
/* 4kernel calculates and stores checksum for us */
#endif              /* IPV6 */
}
void init\_v6()
{
#ifdef IPV6
int on = 1;
if (verbose == 0) {
/* install a filter that only passes ICMP6\_ECHO\_REPLY unless verbose */
struct icmp6\_filter myfilt;
ICMP6\_FILTER\_SETBLOCKALL(&myfilt);
ICMP6\_FILTER\_SETPASS(ICMP6\_ECHO\_REPLY, &myfilt);
setsockopt(sockfd, IPPROTO\_IPV6, ICMP6\_FILTER, &myfilt,
sizeof(myfilt));
/* ignore error return; the filter is an optimization */
}
/* ignore error returned below; we just won't receive the hop limit */
#ifdef IPV6\_RECVHOPLIMIT
/* RFC 3542 */
setsockopt(sockfd, IPPROTO\_IPV6, IPV6\_RECVHOPLIMIT, &on, sizeof(on));
#else
/* RFC 2292 */
setsockopt(sockfd, IPPROTO\_IPV6, IPV6\_HOPLIMIT, &on, sizeof(on));
#endif
#endif
}
struct proto proto\_v4 = { proc\_v4, send\_v4, NULL, NULL, NULL, 0, IPPROTO\_ICMP };
#ifdef  IPV6
struct proto proto\_v6 =
{ proc\_v6, send\_v6, init\_v6, NULL, NULL, 0, IPPROTO\_ICMPV6 };
#endif
int main(int argc, char **argv)
{
int c;
struct addrinfo *ai;
char *h;
opterr = 0;     /* don't want getopt() writing to stderr */
while ((c = getopt(argc, argv, "v")) != -1) {
switch (c) {
case 'v':
verbose++;
break;
case '?':
err\_quit("unrecognized option: %c", c);
}
}
if (optind != argc - 1)
err\_quit("usage: ping [ -v ] <hostname>");
host = argv[optind];
pid = getpid() & 0xffff;    /* ICMP ID field is 16 bits */
Signal(SIGALRM, sig\_alrm);
ai = Host\_serv(host, NULL, 0, 0);
h = Sock\_ntop\_host(ai->ai\_addr, ai->ai\_addrlen);
printf("PING %s (%s): %d data bytes\n",
ai->ai\_canonname ? ai->ai\_canonname : h, h, datalen);
/* 4initialize according to protocol */
if (ai->ai\_family == AF\_INET) {
pr = &proto\_v4;
#ifdef  IPV6
} else if (ai->ai\_family == AF\_INET6) {
pr = &proto\_v6;
if (IN6\_IS\_ADDR\_V4MAPPED(&(((struct sockaddr\_in6 *)
ai->ai\_addr)->sin6\_addr)))
err\_quit("cannot ping IPv4-mapped IPv6 address");
#endif
} else
err\_quit("unknown address family %d", ai->ai\_family);
pr->sasend = ai->ai\_addr;
pr->sarecv = Calloc(1, ai->ai\_addrlen);
pr->salen = ai->ai\_addrlen;
readloop();
exit(0);
}
28.6 traceroute程序
#define \_GNU\_SOURCE
#include    <sys/time.h>
#include    <sys/un.h>
#include    <string.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <stdarg.h>
#include    <syslog.h>
#include    <errno.h>
#include    <netinet/in\_systm.h>
#include    <netinet/ip.h>
#include    <netinet/ip\_icmp.h>
#include    <sys/types.h>
#include    <time.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <unistd.h>
#include    <sys/socket.h>
#include    <netdb.h>
#include    <netinet/ip6.h>
#include    <netinet/icmp6.h>
#include    <netinet/udp.h>
#define BUFSIZE     1500
#define BUFSIZE     1500
struct rec {            /* format of outgoing UDP data */
u\_short rec\_seq;    /* sequence number */
u\_short rec\_ttl;    /* TTL packet left with */
struct timeval rec\_tv;  /* time packet left */
};
/* globals */
char recvbuf[BUFSIZE];
char sendbuf[BUFSIZE];
int datalen;            /* # bytes of data following ICMP header */
char *host;
u\_short sport, dport;
int nsent;          /* add 1 for each sendto() */
pid\_t pid;          /* our PID */
int probe, nprobes;
int sendfd, recvfd;     /* send on UDP sock, read on raw ICMP sock */
int ttl, max\_ttl;
int verbose;
/* function prototypes */
struct proto {
const char *(*icmpcode) (int);
int (*recv) (int, struct timeval *);
struct sockaddr *sasend;    /* sockaddr{} for send, from getaddrinfo */
struct sockaddr *sarecv;    /* sockaddr{} for receiving */
struct sockaddr *salast;    /* last sockaddr{} for receiving */
struct sockaddr *sabind;    /* sockaddr{} for binding source port */
socklen\_t salen;    /* length of sockaddr{}s */
int icmpproto;      /* IPPROTO\_xxx value for ICMP */
int ttllevel;       /* setsockopt() level to set TTL */
int ttloptname;     /* setsockopt() name to set TTL */
} *pr;
#include    <netinet/ip6.h>
#include    <netinet/icmp6.h>
//#define IPV6
/* globals */
char sendbuf[BUFSIZE];
int datalen;            /* # bytes of data following ICMP header */
char *host;
int nsent;          /* add 1 for each sendto() */
pid\_t pid;          /* our PID */
int sockfd;
int verbose;
#define MAXLINE     4096    /* max text line length */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
char *sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
static char str[128];   /* Unix domain is largest */
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
if (inet\_ntop(AF\_INET, &sin->sin\_addr, str, sizeof(str))
== NULL)
return (NULL);
return (str);
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
if (inet\_ntop
(AF\_INET6, &sin6->sin6\_addr, str,
sizeof(str)) == NULL)
return (NULL);
return (str);
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
struct sockaddr\_un *unp = (struct sockaddr\_un *)sa;
/* OK to have no pathname bound to the socket: happens on
every connect() unless client calls bind() first. */
if (unp->sun\_path[0] == 0)
strcpy(str, "(no pathname bound)");
else
snprintf(str, sizeof(str), "%s", unp->sun\_path);
return (str);
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
struct sockaddr\_dl *sdl = (struct sockaddr\_dl *)sa;
if (sdl->sdl\_nlen > 0)
snprintf(str, sizeof(str), "%*s",
sdl->sdl\_nlen, &sdl->sdl\_data[0]);
else
snprintf(str, sizeof(str), "AF\_LINK, index=%d",
sdl->sdl\_index);
return (str);
}
#endif
default:
snprintf(str, sizeof(str),
"sock\_ntop\_host: unknown AF\_xxx: %d, len %d",
sa->sa\_family, salen);
return (str);
}
return (NULL);
}
char *Sock\_ntop\_host(const struct sockaddr *sa, socklen\_t salen)
{
char *ptr;
if ((ptr = sock\_ntop\_host(sa, salen)) == NULL)
err\_sys("sock\_ntop\_host error");    /* inet\_ntop() sets errno */
return (ptr);
}
void Gettimeofday(struct timeval *tv, void *foo)
{
if (gettimeofday(tv, foo) == -1)
err\_sys("gettimeofday error");
return;
}
uint16\_t in\_cksum(uint16\_t * addr, int len)
{
int nleft = len;
uint32\_t sum = 0;
uint16\_t *w = addr;
uint16\_t answer = 0;
/*
* Our algorithm is simple, using a 32 bit accumulator (sum), we add
* sequential 16 bit words to it, and at the end, fold back all the
* carry bits from the top 16 bits into the lower 16 bits.
*/
while (nleft > 1) {
sum += *w++;
nleft -= 2;
}
/* 4mop up an odd byte, if necessary */
if (nleft == 1) {
*(unsigned char *)(&answer) = *(unsigned char *)w;
sum += answer;
}
/* 4add back carry outs from top 16 bits to low 16 bits */
sum = (sum >> 16) + (sum & 0xffff); /* add hi 16 to low 16 */
sum += (sum >> 16); /* add carry */
answer = ~sum;      /* truncate to 16 bits */
return (answer);
}
void
Sendto(int fd, const void *ptr, size\_t nbytes, int flags,
const struct sockaddr *sa, socklen\_t salen)
{
if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize\_t) nbytes)
err\_sys("sendto error");
}
int datalen = 56;       /* data that goes with ICMP echo request */
typedef void Sigfunc(int);  /* for signal handlers */
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
struct addrinfo *Host\_serv(const char *host, const char *serv, int family,
int socktype)
{
int n;
struct addrinfo hints, *res;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_CANONNAME;  /* always return canonical name */
hints.ai\_family = family;   /* 0, AF\_INET, AF\_INET6, etc. */
hints.ai\_socktype = socktype;   /* 0, SOCK\_STREAM, SOCK\_DGRAM, etc. */
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("host\_serv error for %s, %s: %s",
(host == NULL) ? "(no hostname)" : host,
(serv == NULL) ? "(no service name)" : serv,
gai\_strerror(n));
return (res);       /* return pointer to first on linked list */
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
int Socket(int family, int type, int protocol)
{
int n;
if ((n = socket(family, type, protocol)) < 0)
err\_sys("socket error");
return (n);
}
const char *icmpcode\_v4(int code)
{
static char errbuf[100];
switch (code) {
case 0:
return ("network unreachable");
case 1:
return ("host unreachable");
case 2:
return ("protocol unreachable");
case 3:
return ("port unreachable");
case 4:
return ("fragmentation required but DF bit set");
case 5:
return ("source route failed");
case 6:
return ("destination network unknown");
case 7:
return ("destination host unknown");
case 8:
return ("source host isolated (obsolete)");
case 9:
return ("destination network administratively prohibited");
case 10:
return ("destination host administratively prohibited");
case 11:
return ("network unreachable for TOS");
case 12:
return ("host unreachable for TOS");
case 13:
return
("communication administratively prohibited by filtering");
case 14:
return ("host recedence violation");
case 15:
return ("precedence cutoff in effect");
default:
sprintf(errbuf, "[unknown code %d]", code);
return errbuf;
}
}
int gotalarm;
void sig\_alrm(int signo)
{
gotalarm = 1;       /* set flag to note that alarm occurred */
return;         /* and interrupt the recvfrom() */
}
int recv\_v4(int seq, struct timeval *tv)
{
int hlen1, ret;
unsigned hlen2, icmplen;
socklen\_t len;
ssize\_t n;
struct ip *ip, *hip;
struct icmp *icmp;
struct udphdr *udp;
gotalarm = 0;
alarm(3);
for (;;) {
if (gotalarm)
return (-3);    /* alarm expired */
len = pr->salen;
n = recvfrom(recvfd, recvbuf, sizeof(recvbuf), 0, pr->sarecv,
&len);
if (n < 0) {
if (errno == EINTR)
continue;
else
err\_sys("recvfrom error");
}
ip = (struct ip *)recvbuf;  /* start of IP header */
hlen1 = ip->ip\_hl << 2; /* length of IP header */
icmp = (struct icmp *)(recvbuf + hlen1);    /* start of ICMP header */
if ((icmplen = n - hlen1) < 8)
continue;   /* not enough to look at ICMP header */
if (icmp->icmp\_type == ICMP\_TIMXCEED &&
icmp->icmp\_code == ICMP\_TIMXCEED\_INTRANS) {
if (icmplen < 8 + sizeof(struct ip))
continue;   /* not enough data to look at inner IP */
hip = (struct ip *)(recvbuf + hlen1 + 8);
hlen2 = hip->ip\_hl << 2;
if (icmplen < 8 + hlen2 + 4)
continue;   /* not enough data to look at UDP ports */
udp = (struct udphdr *)(recvbuf + hlen1 + 8 + hlen2);
if (hip->ip\_p == IPPROTO\_UDP &&
udp->source == htons(sport) &&
udp->dest == htons(dport + seq)) {
ret = -2;   /* we hit an intermediate router */
break;
}
} else if (icmp->icmp\_type == ICMP\_UNREACH) {
if (icmplen < 8 + sizeof(struct ip))
continue;   /* not enough data to look at inner IP */
hip = (struct ip *)(recvbuf + hlen1 + 8);
hlen2 = hip->ip\_hl << 2;
if (icmplen < 8 + hlen2 + 4)
continue;   /* not enough data to look at UDP ports */
udp = (struct udphdr *)(recvbuf + hlen1 + 8 + hlen2);
if (hip->ip\_p == IPPROTO\_UDP &&
udp->source == htons(sport) &&
udp->dest == htons(dport + seq)) {
if (icmp->icmp\_code == ICMP\_UNREACH\_PORT)
ret = -1;   /* have reached destination */
else
ret = icmp->icmp\_code;  /* 0, 1, 2, ... */
break;
}
}
if (verbose) {
printf(" (from %s: type = %d, code = %d)\n",
Sock\_ntop\_host(pr->sarecv, pr->salen),
icmp->icmp\_type, icmp->icmp\_code);
}
/* Some other ICMP error, recvfrom() again */
}
alarm(0);       /* don't leave alarm running */
Gettimeofday(tv, NULL); /* get time of packet arrival */
return (ret);
}
struct proto proto\_v4 = { icmpcode\_v4, recv\_v4, NULL, NULL, NULL, NULL, 0,
IPPROTO\_ICMP, IPPROTO\_IP, IP\_TTL
};
const char *icmpcode\_v6(int code)
{
#ifdef  IPV6
static char errbuf[100];
switch (code) {
case ICMP6\_DST\_UNREACH\_NOROUTE:
return ("no route to host");
case ICMP6\_DST\_UNREACH\_ADMIN:
return ("administratively prohibited");
case ICMP6\_DST\_UNREACH\_ADDR:
return ("address unreachable");
case ICMP6\_DST\_UNREACH\_NOPORT:
return ("port unreachable");
default:
sprintf(errbuf, "[unknown code %d]", code);
return errbuf;
}
#endif
}
int recv\_v6(int seq, struct timeval *tv)
{
#ifdef  IPV6
int ret;
unsigned hlen2, icmp6len;
ssize\_t n;
socklen\_t len;
struct ip6\_hdr *hip6;
struct icmp6\_hdr *icmp6;
struct udphdr *udp;
gotalarm = 0;
alarm(3);
for (;;) {
if (gotalarm)
return (-3);    /* alarm expired */
len = pr->salen;
n = recvfrom(recvfd, recvbuf, sizeof(recvbuf), 0, pr->sarecv,
&len);
if (n < 0) {
if (errno == EINTR)
continue;
else
err\_sys("recvfrom error");
}
icmp6 = (struct icmp6\_hdr *)recvbuf;    /* ICMP header */
if ((icmp6len = n) < 8)
continue;   /* not enough to look at ICMP header */
if (icmp6->icmp6\_type == ICMP6\_TIME\_EXCEEDED &&
icmp6->icmp6\_code == ICMP6\_TIME\_EXCEED\_TRANSIT) {
if (icmp6len < 8 + sizeof(struct ip6\_hdr) + 4)
continue;   /* not enough data to look at inner header */
hip6 = (struct ip6\_hdr *)(recvbuf + 8);
hlen2 = sizeof(struct ip6\_hdr);
udp = (struct udphdr *)(recvbuf + 8 + hlen2);
if (hip6->ip6\_nxt == IPPROTO\_UDP &&
udp->source == htons(sport) &&
udp->dest == htons(dport + seq))
ret = -2;   /* we hit an intermediate router */
break;
} else if (icmp6->icmp6\_type == ICMP6\_DST\_UNREACH) {
if (icmp6len < 8 + sizeof(struct ip6\_hdr) + 4)
continue;   /* not enough data to look at inner header */
hip6 = (struct ip6\_hdr *)(recvbuf + 8);
hlen2 = sizeof(struct ip6\_hdr);
udp = (struct udphdr *)(recvbuf + 8 + hlen2);
if (hip6->ip6\_nxt == IPPROTO\_UDP &&
udp->source == htons(sport) &&
udp->dest == htons(dport + seq)) {
if (icmp6->icmp6\_code ==
ICMP6\_DST\_UNREACH\_NOPORT)
ret = -1;   /* have reached destination */
else
ret = icmp6->icmp6\_code;    /* 0, 1, 2, ... */
break;
}
} else if (verbose) {
printf(" (from %s: type = %d, code = %d)\n",
Sock\_ntop\_host(pr->sarecv, pr->salen),
icmp6->icmp6\_type, icmp6->icmp6\_code);
}
/* Some other ICMP error, recvfrom() again */
}
alarm(0);       /* don't leave alarm running */
Gettimeofday(tv, NULL); /* get time of packet arrival */
return (ret);
#endif
}
#ifdef  IPV6
struct proto proto\_v6 = { icmpcode\_v6, recv\_v6, NULL, NULL, NULL, NULL, 0,
IPPROTO\_ICMPV6, IPPROTO\_IPV6, IPV6\_UNICAST\_HOPS
};
#endif
int max\_ttl = 30;
int nprobes = 3;
u\_short dport = 32768 + 666;
void sock\_set\_port(struct sockaddr *sa, socklen\_t salen, int port)
{
switch (sa->sa\_family) {
case AF\_INET:{
struct sockaddr\_in *sin = (struct sockaddr\_in *)sa;
sin->sin\_port = port;
return;
}
#ifdef  IPV6
case AF\_INET6:{
struct sockaddr\_in6 *sin6 = (struct sockaddr\_in6 *)sa;
sin6->sin6\_port = port;
return;
}
#endif
}
return;
}
void Bind(int fd, const struct sockaddr *sa, socklen\_t salen)
{
if (bind(fd, sa, salen) < 0)
err\_sys("bind error");
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
int sock\_cmp\_addr(const struct sockaddr *sa1, const struct sockaddr *sa2,
socklen\_t salen)
{
if (sa1->sa\_family != sa2->sa\_family)
return (-1);
switch (sa1->sa\_family) {
case AF\_INET:{
return (memcmp(&((struct sockaddr\_in *)sa1)->sin\_addr,
&((struct sockaddr\_in *)sa2)->sin\_addr,
sizeof(struct in\_addr)));
}
#ifdef  IPV6
case AF\_INET6:{
return (memcmp(&((struct sockaddr\_in6 *)sa1)->sin6\_addr,
&((struct sockaddr\_in6 *)sa2)->sin6\_addr,
sizeof(struct in6\_addr)));
}
#endif
#ifdef  AF\_UNIX
case AF\_UNIX:{
return (strcmp(((struct sockaddr\_un *)sa1)->sun\_path,
((struct sockaddr\_un *)sa2)->sun\_path));
}
#endif
#ifdef  HAVE\_SOCKADDR\_DL\_STRUCT
case AF\_LINK:{
return (-1);    /* no idea what to compare here ? */
}
#endif
}
return (-1);
}
void tv\_sub(struct timeval *out, struct timeval *in)
{
if ((out->tv\_usec -= in->tv\_usec) < 0) {    /* out -= in */
--out->tv\_sec;
out->tv\_usec += 1000000;
}
out->tv\_sec -= in->tv\_sec;
}
void traceloop(void)
{
int seq, code, done;
double rtt;
struct rec *rec;
struct timeval tvrecv;
recvfd = Socket(pr->sasend->sa\_family, SOCK\_RAW, pr->icmpproto);
setuid(getuid());   /* don't need special permissions anymore */
#ifdef  IPV6
if (pr->sasend->sa\_family == AF\_INET6 && verbose == 0) {
struct icmp6\_filter myfilt;
ICMP6\_FILTER\_SETBLOCKALL(&myfilt);
ICMP6\_FILTER\_SETPASS(ICMP6\_TIME\_EXCEEDED, &myfilt);
ICMP6\_FILTER\_SETPASS(ICMP6\_DST\_UNREACH, &myfilt);
setsockopt(recvfd, IPPROTO\_IPV6, ICMP6\_FILTER,
&myfilt, sizeof(myfilt));
}
#endif
sendfd = Socket(pr->sasend->sa\_family, SOCK\_DGRAM, 0);
pr->sabind->sa\_family = pr->sasend->sa\_family;
sport = (getpid() & 0xffff) | 0x8000;   /* our source UDP port # */
sock\_set\_port(pr->sabind, pr->salen, htons(sport));
Bind(sendfd, pr->sabind, pr->salen);
sig\_alrm(SIGALRM);
seq = 0;
done = 0;
for (ttl = 1; ttl <= max\_ttl && done == 0; ttl++) {
Setsockopt(sendfd, pr->ttllevel, pr->ttloptname, &ttl,
sizeof(int));
bzero(pr->salast, pr->salen);
printf("%2d ", ttl);
fflush(stdout);
for (probe = 0; probe < nprobes; probe++) {
rec = (struct rec *)sendbuf;
rec->rec\_seq = ++seq;
rec->rec\_ttl = ttl;
Gettimeofday(&rec->rec\_tv, NULL);
sock\_set\_port(pr->sasend, pr->salen,
htons(dport + seq));
Sendto(sendfd, sendbuf, datalen, 0, pr->sasend,
pr->salen);
if ((code = (*pr->recv) (seq, &tvrecv)) == -3)
printf(" *");   /* timeout, no reply */
else {
char str[NI\_MAXHOST];
if (sock\_cmp\_addr
(pr->sarecv, pr->salast, pr->salen) != 0) {
if (getnameinfo
(pr->sarecv, pr->salen, str,
sizeof(str), NULL, 0, 0) == 0)
printf(" %s (%s)", str,
Sock\_ntop\_host
(pr->sarecv, pr->salen));
else
printf(" %s",
Sock\_ntop\_host
(pr->sarecv, pr->salen));
memcpy(pr->salast, pr->sarecv,
pr->salen);
}
tv\_sub(&tvrecv, &rec->rec\_tv);
rtt =
tvrecv.tv\_sec * 1000.0 +
tvrecv.tv\_usec / 1000.0;
printf("  %.3f ms", rtt);
if (code == -1) /* port unreachable; at destination */
done++;
else if (code >= 0)
printf(" (ICMP %s)",
(*pr->icmpcode) (code));
}
fflush(stdout);
}
printf("\n");
}
}
int main(int argc, char **argv)
{
int c;
struct addrinfo *ai;
char *h;
opterr = 0;     /* don't want getopt() writing to stderr */
while ((c = getopt(argc, argv, "m:v")) != -1) {
switch (c) {
case 'm':
if ((max\_ttl = atoi(optarg)) <= 1)
err\_quit("invalid -m value");
break;
case 'v':
verbose++;
break;
case '?':
err\_quit("unrecognized option: %c", c);
}
}
if (optind != argc - 1)
err\_quit("usage: traceroute [ -m <maxttl> -v ] <hostname>");
host = argv[optind];
pid = getpid();
Signal(SIGALRM, sig\_alrm);
ai = Host\_serv(host, NULL, 0, 0);
h = Sock\_ntop\_host(ai->ai\_addr, ai->ai\_addrlen);
printf("traceroute to %s (%s): %d hops max, %d data bytes\n",
ai->ai\_canonname ? ai->ai\_canonname : h, h, max\_ttl, datalen);
/* initialize according to protocol */
if (ai->ai\_family == AF\_INET) {
pr = &proto\_v4;
#ifdef  IPV6
} else if (ai->ai\_family == AF\_INET6) {
pr = &proto\_v6;
if (IN6\_IS\_ADDR\_V4MAPPED
(&(((struct sockaddr\_in6 *)ai->ai\_addr)->sin6\_addr)))
err\_quit("cannot traceroute IPv4-mapped IPv6 address");
#endif
} else
err\_quit("unknown address family %d", ai->ai\_family);
pr->sasend = ai->ai\_addr;   /* contains destination address */
pr->sarecv = Calloc(1, ai->ai\_addrlen);
pr->salast = Calloc(1, ai->ai\_addrlen);
pr->sabind = Calloc(1, ai->ai\_addrlen);
pr->salen = ai->ai\_addrlen;
traceloop();
exit(0);
}
//第30章 客户／服务器程序设计范式
30.3 TCP测试用客户程序
运行:./client 127.0.0.1 8888 1 5000 4000
#define \_GNU\_SOURCE
#include    <sys/wait.h>
#include    <stdio.h>
#include    <sys/socket.h>
#include    <netdb.h>
#include    <stdlib.h>
#include    <syslog.h>
#include    <string.h>
#include    <strings.h>
#include    <errno.h>
#include    <stdarg.h>
#include    <sys/types.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
int daemon\_proc;        /* set nonzero by daemon\_init() */
#define MAXN    16384       /* max # bytes to request from server */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
int tcp\_connect(const char *host, const char *serv)
{
int sockfd, n;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_connect error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
sockfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (sockfd < 0)
continue;   /* ignore this one */
if (connect(sockfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(sockfd);  /* ignore this one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno set from final connect() */
err\_sys("tcp\_connect error for %s, %s", host, serv);
freeaddrinfo(ressave);
return (sockfd);
}
int Tcp\_connect(const char *host, const char *serv)
{
return (tcp\_connect(host, serv));
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
ssize\_t                     /* Read "n" bytes from a descriptor. */
readn(int fd, void *vptr, size\_t n)
{
size\_t  nleft;
ssize\_t nread;
char    *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ( (nread = read(fd, ptr, nleft)) < 0) {
if (errno == EINTR)
nread = 0;      /* and call read() again */
else
return(-1);
} else if (nread == 0)
break;              /* EOF */
nleft -= nread;
ptr   += nread;
}
return(n - nleft);      /* return >= 0 */
}
ssize\_t
Readn(int fd, void *ptr, size\_t nbytes)
{
ssize\_t     n;
if ( (n = readn(fd, ptr, nbytes)) < 0)
err\_sys("readn error");
return(n);
}
int main(int argc, char **argv)
{
int i, j, fd, nchildren, nloops, nbytes;
pid\_t pid;
ssize\_t n;
char request[MAXLINE], reply[MAXN];
if (argc != 6)
err\_quit
("usage: client <hostname or IPaddr> <port> <#children> "
"<#loops/child> <#bytes/request>");
nchildren = atoi(argv[3]);
nloops = atoi(argv[4]);
nbytes = atoi(argv[5]);
snprintf(request, sizeof(request), "%d\n", nbytes); /* newline at end */
for (i = 0; i < nchildren; i++) {
if ((pid = Fork()) == 0) {  /* child */
for (j = 0; j < nloops; j++) {
fd = Tcp\_connect(argv[1], argv[2]);
Write(fd, request, strlen(request));
if ((n = Readn(fd, reply, nbytes)) != nbytes)
err\_quit("server returned %d bytes", n);
Close(fd);  /* TIME\_WAIT on client, not server */
}
printf("child %d done\n", i);
exit(0);
}
/* parent loops around to fork() again */
}
while (wait(NULL) > 0)  /* now parent waits for all children */
;
if (errno != ECHILD)
err\_sys("wait error");
exit(0);
}
30.4 TCP迭代服务器程序
运行,./server 8888
#define \_GNU\_SOURCE
#include    <signal.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void sig\_int(int signo)
{
void pr\_cpu\_time(void);
pr\_cpu\_time();
exit(0);
}
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
int main(int argc, char **argv)
{
int listenfd, connfd;
void sig\_int(int), web\_child(int);
socklen\_t clilen, addrlen;
struct sockaddr *cliaddr;
if (argc == 2)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 3)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv00 [ <host> ] <port#>");
cliaddr = Malloc(addrlen);
Signal(SIGINT, sig\_int);
for (;;) {
clilen = addrlen;
connfd = Accept(listenfd, cliaddr, &clilen);
web\_child(connfd);  /* process the request */
Close(connfd);  /* parent closes connected socket */
}
}
30.5 TCP并发服务器程序，每个客户一个子进程
#define \_GNU\_SOURCE
#include    <sys/wait.h>
#include    <signal.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void sig\_int(int signo)
{
void pr\_cpu\_time(void);
pr\_cpu\_time();
exit(0);
}
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void sig\_chld(int signo)
{
pid\_t pid;
int stat;
while ((pid = waitpid(-1, &stat, WNOHANG)) > 0) {
printf("child %d terminated\n", pid);
}
return;
}
int main(int argc, char **argv)
{
int listenfd, connfd;
pid\_t childpid;
void sig\_chld(int), sig\_int(int), web\_child(int);
socklen\_t clilen, addrlen;
struct sockaddr *cliaddr;
if (argc == 2)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 3)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv01 [ <host> ] <port#>");
cliaddr = Malloc(addrlen);
Signal(SIGCHLD, sig\_chld);
Signal(SIGINT, sig\_int);
for (;;) {
clilen = addrlen;
if ((connfd = accept(listenfd, cliaddr, &clilen)) < 0) {
if (errno == EINTR)
continue;   /* back to for() */
else
err\_sys("accept error");
}
if ((childpid = Fork()) == 0) { /* child process */
Close(listenfd);    /* close listening socket */
web\_child(connfd);  /* process request */
exit(0);
}
Close(connfd);  /* parent closes connected socket */
}
}
30.6 TCP预先派生子进程服务器程序，accept无上锁保护
#define \_GNU\_SOURCE
#include    <sys/wait.h>
#include    <signal.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
static int nchildren;
static pid\_t *pids;
void sig\_int(int signo)
{
int i;
void pr\_cpu\_time(void);
/* 4terminate all children */
for (i = 0; i < nchildren; i++)
kill(pids[i], SIGTERM);
while (wait(NULL) > 0)  /* wait for all children */
;
if (errno != ECHILD)
err\_sys("wait error");
pr\_cpu\_time();
exit(0);
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void child\_main(int i, int listenfd, int addrlen)
{
int connfd;
void web\_child(int);
socklen\_t clilen;
struct sockaddr *cliaddr;
cliaddr = Malloc(addrlen);
printf("child %ld starting\n", (long)getpid());
for (;;) {
clilen = addrlen;
connfd = Accept(listenfd, cliaddr, &clilen);
web\_child(connfd);  /* process the request */
Close(connfd);
}
}
pid\_t child\_make(int i, int listenfd, int addrlen)
{
pid\_t pid;
if ((pid = Fork()) > 0)
return (pid);   /* parent */
child\_main(i, listenfd, addrlen);   /* never returns */
return 0;
}
int main(int argc, char **argv)
{
int listenfd, i;
socklen\_t addrlen;
void sig\_int(int);
if (argc == 3)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 4)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv02 [ <host> ] <port#> <#children>");
nchildren = atoi(argv[argc - 1]);
pids = Calloc(nchildren, sizeof(pid\_t));
for (i = 0; i < nchildren; i++)
pids[i] = child\_make(i, listenfd, addrlen); /* parent returns */
Signal(SIGINT, sig\_int);
for (;;)
pause();    /* everything done by children */
}
30.7 TCP预先派生子进程服务器程序，accept使用文件上锁保护
#define \_GNU\_SOURCE
#include    <fcntl.h>
#include    <sys/wait.h>
#include    <signal.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
static int nchildren;
static pid\_t *pids;
void sig\_int(int signo)
{
int i;
void pr\_cpu\_time(void);
/* terminate all children */
for (i = 0; i < nchildren; i++)
kill(pids[i], SIGTERM);
while (wait(NULL) > 0)  /* wait for all children */
;
if (errno != ECHILD)
err\_sys("wait error");
pr\_cpu\_time();
exit(0);
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
static struct flock lock\_it, unlock\_it;
static int lock\_fd = -1;
/* fcntl() will fail if my\_lock\_init() not called */
int Open(const char *pathname, int oflag, mode\_t mode)
{
int fd;
if ((fd = open(pathname, oflag, mode)) == -1)
err\_sys("open error for %s", pathname);
return (fd);
}
#define FILE\_MODE   (S\_IRUSR | S\_IWUSR | S\_IRGRP | S\_IROTH)
int Mkstemp(char *template)
{
int i;
if ((i = mkstemp(template)) < 0)
err\_quit("mkstemp error");
return i;
}
void Unlink(const char *pathname)
{
if (unlink(pathname) == -1)
err\_sys("unlink error for %s", pathname);
}
void my\_lock\_init(char *pathname)
{
char lock\_file[1024];
/* 4must copy caller's string, in case it's a constant */
strncpy(lock\_file, pathname, sizeof(lock\_file));
lock\_fd = Mkstemp(lock\_file);
Unlink(lock\_file);  /* but lock\_fd remains open */
lock\_it.l\_type = F\_WRLCK;
lock\_it.l\_whence = SEEK\_SET;
lock\_it.l\_start = 0;
lock\_it.l\_len = 0;
unlock\_it.l\_type = F\_UNLCK;
unlock\_it.l\_whence = SEEK\_SET;
unlock\_it.l\_start = 0;
unlock\_it.l\_len = 0;
}
/* end my\_lock\_init */
/* include my\_lock\_wait */
void my\_lock\_wait()
{
int rc;
while ((rc = fcntl(lock\_fd, F\_SETLKW, &lock\_it)) < 0) {
if (errno == EINTR)
continue;
else
err\_sys("fcntl error for my\_lock\_wait");
}
}
void my\_lock\_release()
{
if (fcntl(lock\_fd, F\_SETLKW, &unlock\_it) < 0)
err\_sys("fcntl error for my\_lock\_release");
}
void child\_main(int i, int listenfd, int addrlen)
{
int connfd;
void web\_child(int);
socklen\_t clilen;
struct sockaddr *cliaddr;
cliaddr = Malloc(addrlen);
printf("child %ld starting\n", (long)getpid());
for (;;) {
clilen = addrlen;
my\_lock\_wait();
connfd = Accept(listenfd, cliaddr, &clilen);
my\_lock\_release();
web\_child(connfd);  /* process the request */
Close(connfd);
}
}
pid\_t child\_make(int i, int listenfd, int addrlen)
{
pid\_t pid;
if ((pid = Fork()) > 0)
return (pid);   /* parent */
child\_main(i, listenfd, addrlen);   /* never returns */
return 0;
}
/* end my\_lock\_wait */
static int nchildren;
static pid\_t *pids;
int main(int argc, char **argv)
{
int listenfd, i;
socklen\_t addrlen;
void sig\_int(int);
pid\_t child\_make(int, int, int);
if (argc == 3)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 4)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv03 [ <host> ] <port#> <#children>");
nchildren = atoi(argv[argc - 1]);
pids = Calloc(nchildren, sizeof(pid\_t));
my\_lock\_init("/tmp/lock.XXXXXX");   /* one lock file for all children */
for (i = 0; i < nchildren; i++)
pids[i] = child\_make(i, listenfd, addrlen); /* parent returns */
Signal(SIGINT, sig\_int);
for (;;)
pause();    /* everything done by children */
}
30.8 TCP预先派生子进程服务器程序，accept使用线程上锁保护
#define \_GNU\_SOURCE
#include    <pthread.h>
#include    <sys/mman.h>
#include    <fcntl.h>
#include    <sys/wait.h>
#include    <signal.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
static int nchildren;
static pid\_t *pids;
void sig\_int(int signo)
{
int i;
void pr\_cpu\_time(void);
/* terminate all children */
for (i = 0; i < nchildren; i++)
kill(pids[i], SIGTERM);
while (wait(NULL) > 0)  /* wait for all children */
;
if (errno != ECHILD)
err\_sys("wait error");
pr\_cpu\_time();
exit(0);
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
void *Mmap(void *addr, size\_t len, int prot, int flags, int fd, off\_t offset)
{
void *ptr;
if ((ptr = mmap(addr, len, prot, flags, fd, offset)) == ((void *)-1))
err\_sys("mmap error");
return (ptr);
}
void Pthread\_mutexattr\_init(pthread\_mutexattr\_t * attr)
{
int n;
if ((n = pthread\_mutexattr\_init(attr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutexattr\_init error");
}
static pthread\_mutex\_t *mptr;   /* actual mutex will be in shared memory */
void Pthread\_mutexattr\_setpshared(pthread\_mutexattr\_t * attr, int flag)
{
int n;
if ((n = pthread\_mutexattr\_setpshared(attr, flag)) == 0)
return;
errno = n;
err\_sys("pthread\_mutexattr\_setpshared error");
}
void Pthread\_mutex\_init(pthread\_mutex\_t * mptr, pthread\_mutexattr\_t * attr)
{
int n;
if ((n = pthread\_mutex\_init(mptr, attr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_init error");
}
int Open(const char *pathname, int oflag, mode\_t mode)
{
int fd;
if ((fd = open(pathname, oflag, mode)) == -1)
err\_sys("open error for %s", pathname);
return (fd);
}
void my\_lock\_init(char *pathname)
{
int fd;
pthread\_mutexattr\_t mattr;
fd = Open("/dev/zero", O\_RDWR, 0);
mptr = Mmap(0, sizeof(pthread\_mutex\_t), PROT\_READ | PROT\_WRITE,
MAP\_SHARED, fd, 0);
Close(fd);
Pthread\_mutexattr\_init(&mattr);
Pthread\_mutexattr\_setpshared(&mattr, PTHREAD\_PROCESS\_SHARED);
Pthread\_mutex\_init(mptr, &mattr);
}
void Pthread\_mutex\_lock(pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_mutex\_lock(mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_lock error");
}
void my\_lock\_wait()
{
Pthread\_mutex\_lock(mptr);
}
void Pthread\_mutex\_unlock(pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_mutex\_unlock(mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_unlock error");
}
void my\_lock\_release()
{
Pthread\_mutex\_unlock(mptr);
}
void child\_main(int i, int listenfd, int addrlen)
{
int connfd;
void web\_child(int);
socklen\_t clilen;
struct sockaddr *cliaddr;
cliaddr = Malloc(addrlen);
printf("child %ld starting\n", (long)getpid());
for (;;) {
clilen = addrlen;
my\_lock\_wait();
connfd = Accept(listenfd, cliaddr, &clilen);
my\_lock\_release();
web\_child(connfd);  /* process the request */
Close(connfd);
}
}
pid\_t child\_make(int i, int listenfd, int addrlen)
{
pid\_t pid;
if ((pid = Fork()) > 0)
return (pid);   /* parent */
child\_main(i, listenfd, addrlen);   /* never returns */
return 0;
}
static int nchildren;
static pid\_t *pids;
int main(int argc, char **argv)
{
int listenfd, i;
socklen\_t addrlen;
void sig\_int(int);
pid\_t child\_make(int, int, int);
if (argc == 3)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 4)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv04 [ <host> ] <port#> <#children>");
nchildren = atoi(argv[argc - 1]);
pids = Calloc(nchildren, sizeof(pid\_t));
my\_lock\_init(NULL);
for (i = 0; i < nchildren; i++)
pids[i] = child\_make(i, listenfd, addrlen); /* parent returns */
Signal(SIGINT, sig\_int);
for (;;)
pause();    /* everything done by children */
}
30.9 TCP预先派生子进程服务器程序，传递描述符
#define \_GNU\_SOURCE
#include    <sys/socket.h>
#include    <pthread.h>
#include    <sys/mman.h>
#include    <fcntl.h>
#include    <sys/wait.h>
#include    <signal.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
static int nchildren;
void Socketpair(int family, int type, int protocol, int *fd)
{
int n;
if ((n = socketpair(family, type, protocol, fd)) < 0)
err\_sys("socketpair error");
}
pid\_t Fork(void)
{
pid\_t pid;
if ((pid = fork()) == -1)
err\_sys("fork error");
return (pid);
}
typedef struct {
pid\_t child\_pid;    /* process ID */
int child\_pipefd;   /* parent's stream pipe to/from child */
int child\_status;   /* 0 = ready */
long child\_count;   /* # connections handled */
} Child;
Child *cptr;            /* array of Child structures; calloc'ed */
void sig\_int(int signo)
{
int i;
void pr\_cpu\_time(void);
/* 4terminate all children */
for (i = 0; i < nchildren; i++)
kill(cptr[i].child\_pid, SIGTERM);
while (wait(NULL) > 0)  /* wait for all children */
;
if (errno != ECHILD)
err\_sys("wait error");
pr\_cpu\_time();
for (i = 0; i < nchildren; i++)
printf("child %d, %ld connections\n", i, cptr[i].child\_count);
exit(0);
}
void Dup2(int fd1, int fd2)
{
if (dup2(fd1, fd2) == -1)
err\_sys("dup2 error");
}
pid\_t child\_make(int i, int listenfd, int addrlen)
{
int sockfd[2];
pid\_t pid;
void child\_main(int, int, int);
Socketpair(AF\_LOCAL, SOCK\_STREAM, 0, sockfd);
if ((pid = Fork()) > 0) {
Close(sockfd[1]);
cptr[i].child\_pid = pid;
cptr[i].child\_pipefd = sockfd[0];
cptr[i].child\_status = 0;
return (pid);   /* parent */
}
Dup2(sockfd[1], STDERR\_FILENO); /* child's stream pipe to parent */
Close(sockfd[0]);
Close(sockfd[1]);
Close(listenfd);    /* child does not need this open */
child\_main(i, listenfd, addrlen);   /* never returns */
return 0;
}
ssize\_t read\_fd(int fd, void *ptr, size\_t nbytes, int *recvfd)
{
struct msghdr msg;
struct iovec iov[1];
ssize\_t n;
union {
struct cmsghdr cm;
char control[CMSG\_SPACE(sizeof(int))];
} control\_un;
struct cmsghdr *cmptr;
msg.msg\_control = control\_un.control;
msg.msg\_controllen = sizeof(control\_un.control);
msg.msg\_name = NULL;
msg.msg\_namelen = 0;
iov[0].iov\_base = ptr;
iov[0].iov\_len = nbytes;
msg.msg\_iov = iov;
msg.msg\_iovlen = 1;
if ((n = recvmsg(fd, &msg, 0)) <= 0)
return (n);
if ((cmptr = CMSG\_FIRSTHDR(&msg)) != NULL &&
cmptr->cmsg\_len == CMSG\_LEN(sizeof(int))) {
if (cmptr->cmsg\_level != SOL\_SOCKET)
err\_quit("control level != SOL\_SOCKET");
if (cmptr->cmsg\_type != SCM\_RIGHTS)
err\_quit("control type != SCM\_RIGHTS");
*recvfd = *((int *)CMSG\_DATA(cmptr));
} else
*recvfd = -1;   /* descriptor was not passed */
return (n);
}
ssize\_t Read\_fd(int fd, void *ptr, size\_t nbytes, int *recvfd)
{
ssize\_t n;
if ((n = read\_fd(fd, ptr, nbytes, recvfd)) < 0)
err\_sys("read\_fd error");
return (n);
}
void Write(int fd, void *ptr, int nbytes)
{
if (write(fd, ptr, nbytes) != nbytes)
err\_sys("write error");
}
void child\_main(int i, int listenfd, int addrlen)
{
char c;
int connfd;
ssize\_t n;
void web\_child(int);
printf("child %ld starting\n", (long)getpid());
for (;;) {
if ((n = Read\_fd(STDERR\_FILENO, &c, 1, &connfd)) == 0)
err\_quit("read\_fd returned 0");
if (connfd < 0)
err\_quit("no descriptor from read\_fd");
web\_child(connfd);  /* process request */
Close(connfd);
Write(STDERR\_FILENO, "", 1);    /* tell parent we're ready again */
}
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
int Select(int nfds, fd\_set * readfds, fd\_set * writefds, fd\_set * exceptfds,
struct timeval *timeout)
{
int n;
if ((n = select(nfds, readfds, writefds, exceptfds, timeout)) < 0)
err\_sys("select error");
return (n);     /* can return 0 on timeout */
}
ssize\_t write\_fd(int fd, void *ptr, size\_t nbytes, int sendfd)
{
struct msghdr msg;
struct iovec iov[1];
union {
struct cmsghdr cm;
char control[CMSG\_SPACE(sizeof(int))];
} control\_un;
struct cmsghdr *cmptr;
msg.msg\_control = control\_un.control;
msg.msg\_controllen = sizeof(control\_un.control);
cmptr = CMSG\_FIRSTHDR(&msg);
cmptr->cmsg\_len = CMSG\_LEN(sizeof(int));
cmptr->cmsg\_level = SOL\_SOCKET;
cmptr->cmsg\_type = SCM\_RIGHTS;
*((int *)CMSG\_DATA(cmptr)) = sendfd;
msg.msg\_name = NULL;
msg.msg\_namelen = 0;
iov[0].iov\_base = ptr;
iov[0].iov\_len = nbytes;
msg.msg\_iov = iov;
msg.msg\_iovlen = 1;
return (sendmsg(fd, &msg, 0));
}
ssize\_t Write\_fd(int fd, void *ptr, size\_t nbytes, int sendfd)
{
ssize\_t n;
if ((n = write\_fd(fd, ptr, nbytes, sendfd)) < 0)
err\_sys("write\_fd error");
return (n);
}
ssize\_t Read(int fd, void *ptr, size\_t nbytes)
{
ssize\_t n;
if ((n = read(fd, ptr, nbytes)) == -1)
err\_sys("read error");
return (n);
}
static int nchildren;
#define max(a,b)    ((a) > (b) ? (a) : (b))
int main(int argc, char **argv)
{
int listenfd, i, navail, maxfd, nsel, connfd, rc;
void sig\_int(int);
pid\_t child\_make(int, int, int);
ssize\_t n;
fd\_set rset, masterset;
socklen\_t addrlen, clilen;
struct sockaddr *cliaddr;
if (argc == 3)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 4)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv05 [ <host> ] <port#> <#children>");
FD\_ZERO(&masterset);
FD\_SET(listenfd, &masterset);
maxfd = listenfd;
cliaddr = Malloc(addrlen);
nchildren = atoi(argv[argc - 1]);
navail = nchildren;
cptr = Calloc(nchildren, sizeof(Child));
/* 4prefork all the children */
for (i = 0; i < nchildren; i++) {
child\_make(i, listenfd, addrlen);   /* parent returns */
FD\_SET(cptr[i].child\_pipefd, &masterset);
maxfd = max(maxfd, cptr[i].child\_pipefd);
}
Signal(SIGINT, sig\_int);
for (;;) {
rset = masterset;
if (navail <= 0)
FD\_CLR(listenfd, &rset);    /* turn off if no available children */
nsel = Select(maxfd + 1, &rset, NULL, NULL, NULL);
/* 4check for new connections */
if (FD\_ISSET(listenfd, &rset)) {
clilen = addrlen;
connfd = Accept(listenfd, cliaddr, &clilen);
for (i = 0; i < nchildren; i++)
if (cptr[i].child\_status == 0)
break;  /* available */
if (i == nchildren)
err\_quit("no available children");
cptr[i].child\_status = 1;   /* mark child as busy */
cptr[i].child\_count++;
navail--;
n = Write\_fd(cptr[i].child\_pipefd, "", 1, connfd);
Close(connfd);
if (--nsel == 0)
continue;   /* all done with select() results */
}
/* 4find any newly-available children */
for (i = 0; i < nchildren; i++) {
if (FD\_ISSET(cptr[i].child\_pipefd, &rset)) {
if ((n =
Read(cptr[i].child\_pipefd, &rc, 1)) == 0)
err\_quit
("child %d terminated unexpectedly",
i);
cptr[i].child\_status = 0;
navail++;
if (--nsel == 0)
break;  /* all done with select() results */
}
}
}
}
30.10 TCP并发服务器程序，每个客户一个线程
#define \_GNU\_SOURCE
#include    <signal.h>
#include    <pthread.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
void Pthread\_detach(pthread\_t tid)
{
int n;
if ((n = pthread\_detach(tid)) == 0)
return;
errno = n;
err\_sys("pthread\_detach error");
}
void *doit(void *arg)
{
Pthread\_detach(pthread\_self());
web\_child((int)arg);
Close((int)arg);
return (NULL);
}
void sig\_int(int signo)
{
pr\_cpu\_time();
exit(0);
}
void Pthread\_create(pthread\_t * tid, const pthread\_attr\_t * attr,
void *(*func) (void *), void *arg)
{
int n;
if ((n = pthread\_create(tid, attr, func, arg)) == 0)
return;
errno = n;
err\_sys("pthread\_create error");
}
int main(int argc, char **argv)
{
int listenfd, connfd;
void sig\_int(int);
void *doit(void *);
pthread\_t tid;
socklen\_t clilen, addrlen;
struct sockaddr *cliaddr;
if (argc == 2)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 3)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv06 [ <host> ] <port#>");
cliaddr = Malloc(addrlen);
Signal(SIGINT, sig\_int);
for (;;) {
clilen = addrlen;
connfd = Accept(listenfd, cliaddr, &clilen);
Pthread\_create(&tid, NULL, &doit, (void *)connfd);
}
}
30.11 TCP预先创建线程服务器程序，每个线程各自accept
#define \_GNU\_SOURCE
#include    <signal.h>
#include    <pthread.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
void Pthread\_detach(pthread\_t tid)
{
int n;
if ((n = pthread\_detach(tid)) == 0)
return;
errno = n;
err\_sys("pthread\_detach error");
}
void Pthread\_create(pthread\_t * tid, const pthread\_attr\_t * attr,
void *(*func) (void *), void *arg)
{
int n;
if ((n = pthread\_create(tid, attr, func, arg)) == 0)
return;
errno = n;
err\_sys("pthread\_create error");
}
typedef struct {
pthread\_t thread\_tid;   /* thread ID */
long thread\_count;  /* # connections handled */
} Thread;
Thread *tptr;           /* array of Thread structures; calloc'ed */
int listenfd, nthreads;
socklen\_t addrlen;
pthread\_mutex\_t mlock;
void sig\_int(int signo)
{
int i;
void pr\_cpu\_time(void);
pr\_cpu\_time();
for (i = 0; i < nthreads; i++)
printf("thread %d, %ld connections\n", i, tptr[i].thread\_count);
exit(0);
}
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
void thread\_make(int i)
{
void *thread\_main(void *);
Pthread\_create(&tptr[i].thread\_tid, NULL, &thread\_main, (void *)i);
return;         /* main thread returns */
}
void Pthread\_mutex\_lock(pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_mutex\_lock(mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_lock error");
}
void Pthread\_mutex\_unlock(pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_mutex\_unlock(mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_unlock error");
}
void *thread\_main(void *arg)
{
int connfd;
socklen\_t clilen;
struct sockaddr *cliaddr;
cliaddr = Malloc(addrlen);
printf("thread %d starting\n", (int)arg);
for (;;) {
clilen = addrlen;
Pthread\_mutex\_lock(&mlock);
connfd = Accept(listenfd, cliaddr, &clilen);
Pthread\_mutex\_unlock(&mlock);
tptr[(int)arg].thread\_count++;
web\_child(connfd);  /* process request */
Close(connfd);
}
}
pthread\_mutex\_t mlock = PTHREAD\_MUTEX\_INITIALIZER;
int main(int argc, char **argv)
{
int i;
if (argc == 3)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 4)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv07 [ <host> ] <port#> <#threads>");
nthreads = atoi(argv[argc - 1]);
tptr = Calloc(nthreads, sizeof(Thread));
for (i = 0; i < nthreads; i++)
thread\_make(i); /* only main thread returns */
Signal(SIGINT, sig\_int);
for (;;)
pause();    /* everything done by threads */
}
30.12 TCP预先创建线程服务器程序，主线程统一accept
#define \_GNU\_SOURCE
#include    <signal.h>
#include    <pthread.h>
#include    <unistd.h>
#include    <string.h>
#include    <stdio.h>
#include    <errno.h>
#include    <strings.h>
#include    <stdlib.h>
#include    <sys/socket.h>
#include    <sys/types.h>
#include    <netdb.h>
#include    <syslog.h>
#include    <stdarg.h>
#include    <sys/resource.h>
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAXLINE     4096    /* max text line length */
#define MAXN    16384       /* max # bytes to request from server */
typedef void Sigfunc(int);  /* for signal handlers */
int daemon\_proc;        /* set nonzero by daemon\_init() */
void err\_doit(int errnoflag, int level, const char *fmt, va\_list ap)
{
int errno\_save, n;
char buf[MAXLINE + 1];
errno\_save = errno; /* value caller might want printed */
#ifdef  HAVE\_VSNPRINTF
vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
vsprintf(buf, fmt, ap); /* not safe */
#endif
n = strlen(buf);
if (errnoflag)
snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno\_save));
strcat(buf, "\n");
if (daemon\_proc) {
syslog(level, "%s", buf);
} else {
fflush(stdout); /* in case stdout and stderr are the same */
fputs(buf, stderr);
fflush(stderr);
}
return;
}
void err\_quit(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(0, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void err\_sys(const char *fmt, ...)
{
va\_list ap;
va\_start(ap, fmt);
err\_doit(1, LOG\_ERR, fmt, ap);
va\_end(ap);
exit(1);
}
void pr\_cpu\_time(void)
{
double user, sys;
struct rusage myusage, childusage;
if (getrusage(RUSAGE\_SELF, &myusage) < 0)
err\_sys("getrusage error");
if (getrusage(RUSAGE\_CHILDREN, &childusage) < 0)
err\_sys("getrusage error");
user = (double)myusage.ru\_utime.tv\_sec +
myusage.ru\_utime.tv\_usec / 1000000.0;
user += (double)childusage.ru\_utime.tv\_sec +
childusage.ru\_utime.tv\_usec / 1000000.0;
sys = (double)myusage.ru\_stime.tv\_sec +
myusage.ru\_stime.tv\_usec / 1000000.0;
sys += (double)childusage.ru\_stime.tv\_sec +
childusage.ru\_stime.tv\_usec / 1000000.0;
printf("\nuser time = %g, sys time = %g\n", user, sys);
}
void Setsockopt(int fd, int level, int optname, const void *optval,
socklen\_t optlen)
{
if (setsockopt(fd, level, optname, optval, optlen) < 0)
err\_sys("setsockopt error");
}
void Close(int fd)
{
if (close(fd) == -1)
err\_sys("close error");
}
void Listen(int fd, int backlog)
{
char *ptr;
/*4can override 2nd argument with environment variable */
if ((ptr = getenv("LISTENQ")) != NULL)
backlog = atoi(ptr);
if (listen(fd, backlog) < 0)
err\_sys("listen error");
}
int tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
int listenfd, n;
const int on = 1;
struct addrinfo hints, *res, *ressave;
bzero(&hints, sizeof(struct addrinfo));
hints.ai\_flags = AI\_PASSIVE;
hints.ai\_family = AF\_UNSPEC;
hints.ai\_socktype = SOCK\_STREAM;
if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
err\_quit("tcp\_listen error for %s, %s: %s",
host, serv, gai\_strerror(n));
ressave = res;
do {
listenfd =
socket(res->ai\_family, res->ai\_socktype, res->ai\_protocol);
if (listenfd < 0)
continue;   /* error, try next one */
Setsockopt(listenfd, SOL\_SOCKET, SO\_REUSEADDR, &on, sizeof(on));
if (bind(listenfd, res->ai\_addr, res->ai\_addrlen) == 0)
break;  /* success */
Close(listenfd);    /* bind error, close and try next one */
} while ((res = res->ai\_next) != NULL);
if (res == NULL)    /* errno from final socket() or bind() */
err\_sys("tcp\_listen error for %s, %s", host, serv);
Listen(listenfd, LISTENQ);
if (addrlenp)
*addrlenp = res->ai\_addrlen;    /* return size of protocol address */
freeaddrinfo(ressave);
return (listenfd);
}
int Tcp\_listen(const char *host, const char *serv, socklen\_t * addrlenp)
{
return (tcp\_listen(host, serv, addrlenp));
}
void *Malloc(size\_t size)
{
void *ptr;
if ((ptr = malloc(size)) == NULL)
err\_sys("malloc error");
return (ptr);
}
Sigfunc *signal(int signo, Sigfunc * func)
{
struct sigaction act, oact;
act.sa\_handler = func;
sigemptyset(&act.sa\_mask);
act.sa\_flags = 0;
if (signo == SIGALRM) {
#ifdef  SA\_INTERRUPT
act.sa\_flags |= SA\_INTERRUPT;   /* SunOS 4.x */
#endif
} else {
#ifdef  SA\_RESTART
act.sa\_flags |= SA\_RESTART; /* SVR4, 44BSD */
#endif
}
if (sigaction(signo, &act, &oact) < 0)
return (SIG\_ERR);
return (oact.sa\_handler);
}
Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
Sigfunc *sigfunc;
if ((sigfunc = signal(signo, func)) == SIG\_ERR)
err\_sys("signal error");
return (sigfunc);
}
int Accept(int fd, struct sockaddr *sa, socklen\_t * salenptr)
{
int n;
again:
if ((n = accept(fd, sa, salenptr)) < 0) {
#ifdef  EPROTO
if (errno == EPROTO || errno == ECONNABORTED)
#else
if (errno == ECONNABORTED)
#endif
goto again;
else
err\_sys("accept error");
}
return (n);
}
static int read\_cnt;
static char *read\_ptr;
static char read\_buf[MAXLINE];
static ssize\_t my\_read(int fd, char *ptr)
{
if (read\_cnt <= 0) {
again:
if ((read\_cnt = read(fd, read\_buf, sizeof(read\_buf))) < 0) {
if (errno == EINTR)
goto again;
return (-1);
} else if (read\_cnt == 0)
return (0);
read\_ptr = read\_buf;
}
read\_cnt--;
*ptr = *read\_ptr++;
return (1);
}
ssize\_t readline(int fd, void *vptr, int maxlen)
{
ssize\_t n, rc;
char c, *ptr;
ptr = vptr;
for (n = 1; n < maxlen; n++) {
if ((rc = my\_read(fd, &c)) == 1) {
*ptr++ = c;
if (c == '\n')
break;  /* newline is stored, like fgets() */
} else if (rc == 0) {
*ptr = 0;
return (n - 1); /* EOF, n - 1 bytes were read */
} else
return (-1);    /* error, errno set by read() */
}
*ptr = 0;       /* null terminate like fgets() */
return (n);
}
ssize\_t Readline(int fd, void *ptr, size\_t maxlen)
{
ssize\_t n;
if ((n = readline(fd, ptr, maxlen)) < 0)
err\_sys("readline error");
return (n);
}
ssize\_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size\_t n)
{
size\_t nleft;
ssize\_t nwritten;
const char *ptr;
ptr = vptr;
nleft = n;
while (nleft > 0) {
if ((nwritten = write(fd, ptr, nleft)) <= 0) {
if (nwritten < 0 && errno == EINTR)
nwritten = 0;   /* and call write() again */
else
return (-1);    /* error */
}
nleft -= nwritten;
ptr += nwritten;
}
return (n);
}
void Writen(int fd, void *ptr, int nbytes)
{
if (writen(fd, ptr, nbytes) != nbytes)
err\_sys("writen error");
}
void web\_child(int sockfd)
{
int ntowrite;
ssize\_t nread;
char line[MAXLINE], result[MAXN];
for (;;) {
if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
return; /* connection closed by other end */
/* 4line from client specifies #bytes to write back */
ntowrite = atol(line);
if ((ntowrite <= 0) || (ntowrite > MAXN))
err\_quit("client request for %d bytes", ntowrite);
Writen(sockfd, result, ntowrite);
}
}
void Pthread\_detach(pthread\_t tid)
{
int n;
if ((n = pthread\_detach(tid)) == 0)
return;
errno = n;
err\_sys("pthread\_detach error");
}
void Pthread\_create(pthread\_t * tid, const pthread\_attr\_t * attr,
void *(*func) (void *), void *arg)
{
int n;
if ((n = pthread\_create(tid, attr, func, arg)) == 0)
return;
errno = n;
err\_sys("pthread\_create error");
}
typedef struct {
pthread\_t thread\_tid;   /* thread ID */
long thread\_count;  /* # connections handled */
} Thread;
Thread *tptr;           /* array of Thread structures; calloc'ed */
#define MAXNCLI 32
int clifd[MAXNCLI], iget, iput;
pthread\_mutex\_t clifd\_mutex;
pthread\_cond\_t clifd\_cond;
void *Calloc(size\_t n, size\_t size)
{
void *ptr;
if ((ptr = calloc(n, size)) == NULL)
err\_sys("calloc error");
return (ptr);
}
void Pthread\_mutex\_lock(pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_mutex\_lock(mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_lock error");
}
void Pthread\_mutex\_unlock(pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_mutex\_unlock(mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_mutex\_unlock error");
}
void Pthread\_cond\_wait(pthread\_cond\_t * cptr, pthread\_mutex\_t * mptr)
{
int n;
if ((n = pthread\_cond\_wait(cptr, mptr)) == 0)
return;
errno = n;
err\_sys("pthread\_cond\_wait error");
}
void *thread\_main(void *arg)
{
int connfd;
printf("thread %d starting\n", (int)arg);
for (;;) {
Pthread\_mutex\_lock(&clifd\_mutex);
while (iget == iput)
Pthread\_cond\_wait(&clifd\_cond, &clifd\_mutex);
connfd = clifd[iget];   /* connected socket to service */
if (++iget == MAXNCLI)
iget = 0;
Pthread\_mutex\_unlock(&clifd\_mutex);
tptr[(int)arg].thread\_count++;
web\_child(connfd);  /* process request */
Close(connfd);
}
}
void thread\_make(int i)
{
Pthread\_create(&tptr[i].thread\_tid, NULL, &thread\_main, (void *)i);
return;         /* main thread returns */
}
pthread\_mutex\_t mlock = PTHREAD\_MUTEX\_INITIALIZER;
static int nthreads;
pthread\_mutex\_t clifd\_mutex = PTHREAD\_MUTEX\_INITIALIZER;
pthread\_cond\_t clifd\_cond = PTHREAD\_COND\_INITIALIZER;
void sig\_int(int signo)
{
int i;
pr\_cpu\_time();
for (i = 0; i < nthreads; i++)
printf("thread %d, %ld connections\n", i, tptr[i].thread\_count);
exit(0);
}
void Pthread\_cond\_signal(pthread\_cond\_t * cptr)
{
int n;
if ((n = pthread\_cond\_signal(cptr)) == 0)
return;
errno = n;
err\_sys("pthread\_cond\_signal error");
}
int main(int argc, char **argv)
{
int i, listenfd, connfd;
socklen\_t addrlen, clilen;
struct sockaddr *cliaddr;
if (argc == 3)
listenfd = Tcp\_listen(NULL, argv[1], &addrlen);
else if (argc == 4)
listenfd = Tcp\_listen(argv[1], argv[2], &addrlen);
else
err\_quit("usage: serv08 [ <host> ] <port#> <#threads>");
cliaddr = Malloc(addrlen);
nthreads = atoi(argv[argc - 1]);
tptr = Calloc(nthreads, sizeof(Thread));
iget = iput = 0;
/* 4create all the threads */
for (i = 0; i < nthreads; i++)
thread\_make(i); /* only main thread returns */
Signal(SIGINT, sig\_int);
for (;;) {
clilen = addrlen;
connfd = Accept(listenfd, cliaddr, &clilen);
Pthread\_mutex\_lock(&clifd\_mutex);
clifd[iput] = connfd;
if (++iput == MAXNCLI)
iput = 0;
if (iput == iget)
err\_quit("iput = iget = %d", iput);
Pthread\_cond\_signal(&clifd\_cond);
Pthread\_mutex\_unlock(&clifd\_mutex);
}
}
```
