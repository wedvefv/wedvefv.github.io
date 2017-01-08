---
layout: post
date: 2017-1-8 13:57:30
category: linux
---
#UNIX网络编程(卷1):套接字联网API(第3版)
```c
第1章 简介
1.2 一个简单的时间获取客户程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int main(int argc, char **argv)
{
    int sockfd, n;
    char recvline[MAXLINE + 1];
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: a.out <IPaddress>");

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
        err_sys("socket error");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(13);  /* daytime server */
    if (inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0)
        err_quit("inet_pton error for %s", argv[1]);

    if (connect(sockfd, (SA *) & servaddr, sizeof(servaddr)) < 0)
        err_sys("connect error");

    while ((n = read(sockfd, recvline, MAXLINE)) > 0) {
        recvline[n] = 0;    /* null terminate */
        if (fputs(recvline, stdout) == EOF)
            err_sys("fputs error");
    }
    if (n < 0)
        err_sys("read error");

    exit(0);
}
1.5 一个简单的时间获取服务器程序
//注意，这个程序要root用户才可以运行，因为端口号是13,少于1024
#include    <strings.h>
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

int main()
{
    int listenfd, connfd;
    struct sockaddr_in servaddr;
    char buff[MAXLINE];
    time_t ticks;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(13);  /* daytime server */

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
第3章 套接字编程简介
3.4 字节排序函数
#include <stdio.h>
#include <stdlib.h>
#define CPU_VENDOR_OS "i686-pc-linux-gnu"
int main(int argc, char **argv)
{
    union {
        short  s;
        char   c[sizeof(short)];
    } un;

    un.s = 0x0102;
    printf("%s: ", CPU_VENDOR_OS);
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
第5章 TCP客户/服务器程序示例
5.2 TCP回射服务器程序
#include    <strings.h>
#include    <sys/types.h>   /* basic system data types */
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s",buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void str_echo(int sockfd)
{
    ssize_t n;
    char buf[MAXLINE];

 again:
    while ((n = read(sockfd, buf, MAXLINE)) > 0)
        Writen(sockfd, buf, n);

    if (n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        err_sys("str_echo: read error");
}

int main()
{
    int listenfd, connfd;
    pid_t childpid;
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);

    for (;;) {
        clilen = sizeof(cliaddr);
        connfd = Accept(listenfd, (SA *) & cliaddr, &clilen);

        if ((childpid = Fork()) == 0) { /* child process */
            Close(listenfd);    /* close listening socket */
            str_echo(connfd);   /* process the request */
            exit(0);
        }
        Close(connfd);  /* parent closes connected socket */
    }
}
5.4 TCP回射客户程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define SERV_PORT        9877   /* TCP and UDP */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s",buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

static int read_cnt;
static char *read_ptr;
static char read_buf[MAXLINE];
static ssize_t my_read(int fd, char *ptr)
{

    if (read_cnt <= 0) {
 again:
        if ((read_cnt = read(fd, read_buf, sizeof(read_buf))) < 0) {
            if (errno == EINTR)
                goto again;
            return (-1);
        } else if (read_cnt == 0)
            return (0);
        read_ptr = read_buf;
    }

    read_cnt--;
    *ptr = *read_ptr++;
    return (1);
}

ssize_t readline(int fd, void *vptr, int maxlen)
{
    ssize_t n, rc;
    char c, *ptr;

    ptr = (char *)vptr;
    for (n = 1; n < maxlen; n++) {
        if ((rc = my_read(fd, &c)) == 1) {
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

ssize_t Readline(int fd, void *ptr, size_t maxlen)
{
    ssize_t n;

    if ((n = readline(fd, ptr, maxlen)) < 0)
        err_sys("readline error");
    return (n);
}

void str_cli(FILE * fp, int sockfd)
{
    char sendline[MAXLINE], recvline[MAXLINE];

    while (Fgets(sendline, MAXLINE, fp) != NULL) {

        Writen(sockfd, sendline, strlen(sendline));

        if (Readline(sockfd, recvline, MAXLINE) == 0)
            err_quit("str_cli: server terminated prematurely");

        Fputs(recvline, stdout);
    }
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: tcpcli <IPaddress>");

    sockfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));

    str_cli(stdin, sockfd); /* do it all */

    exit(0);
}
5.10 wait和waitpid函数
//带上信号处理函数的server
#define _POSIX_SOURCE
#include    <strings.h>
#include    <signal.h>
#include    <sys/types.h>   /* basic system data types */
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
#include    <sys/wait.h>
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
typedef void Sigfunc(int);  /* for signal handlers */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void str_echo(int sockfd)
{
    ssize_t n;
    char buf[MAXLINE];

 again:
    while ((n = read(sockfd, buf, MAXLINE)) > 0)
        Writen(sockfd, buf, n);

    if (n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        err_sys("str_echo: read error");
}

void sig_chld(int signo)
{
    pid_t pid;
    int stat;

    while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
        printf("child %d terminated\n", pid);
    return;
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}

Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

int main()
{
    int listenfd, connfd;
    pid_t childpid;
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);

    Signal(SIGCHLD, sig_chld);  /* must call waitpid() */

    for (;;) {
        clilen = sizeof(cliaddr);
        if ((connfd = accept(listenfd, (SA *) & cliaddr, &clilen)) < 0) {
            if (errno == EINTR)
                continue;   /* back to for() */
            else
                err_sys("accept error");
        }

        if ((childpid = Fork()) == 0) { /* child process */
            Close(listenfd);    /* close listening socket */
            str_echo(connfd);   /* process the request */
            exit(0);
        }
        Close(connfd);  /* parent closes connected socket */
    }
}
第6章 I/O复用：select和poll函数
6.4 str_cli函数（修订版）
//使用select
#define _POSIX_SOURCE
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define SERV_PORT        9877   /* TCP and UDP */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

static int read_cnt;
static char *read_ptr;
static char read_buf[MAXLINE];
static ssize_t my_read(int fd, char *ptr)
{

    if (read_cnt <= 0) {
 again:
        if ((read_cnt = read(fd, read_buf, sizeof(read_buf))) < 0) {
            if (errno == EINTR)
                goto again;
            return (-1);
        } else if (read_cnt == 0)
            return (0);
        read_ptr = read_buf;
    }

    read_cnt--;
    *ptr = *read_ptr++;
    return (1);
}

ssize_t readline(int fd, void *vptr, int maxlen)
{
    ssize_t n, rc;
    char c, *ptr;

    ptr = (char *)vptr;
    for (n = 1; n < maxlen; n++) {
        if ((rc = my_read(fd, &c)) == 1) {
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

ssize_t Readline(int fd, void *ptr, size_t maxlen)
{
    ssize_t n;

    if ((n = readline(fd, ptr, maxlen)) < 0)
        err_sys("readline error");
    return (n);
}

int Select(int nfds, fd_set * readfds, fd_set * writefds, fd_set * exceptfds,
       struct timeval *timeout)
{
    int n;
    do {
        n = select(nfds, readfds, writefds, exceptfds, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("select error");
    } while (n < 0);

    return (n);     /* can return 0 on timeout */
}

void str_cli(FILE * fp, int sockfd)
{
    int maxfdp1;
    fd_set rset;
    char sendline[MAXLINE], recvline[MAXLINE];

    FD_ZERO(&rset);
    for (;;) {
        FD_SET(fileno(fp), &rset);
        FD_SET(sockfd, &rset);
        maxfdp1 = max(fileno(fp), sockfd) + 1;
        Select(maxfdp1, &rset, NULL, NULL, NULL);

        if (FD_ISSET(sockfd, &rset)) {  /* socket is readable */
            if (Readline(sockfd, recvline, MAXLINE) == 0)
                err_quit
                    ("str_cli: server terminated prematurely");
            Fputs(recvline, stdout);
        }

        if (FD_ISSET(fileno(fp), &rset)) {  /* input is readable */
            if (Fgets(sendline, MAXLINE, fp) == NULL)
                return; /* all done */
            Writen(sockfd, sendline, strlen(sendline));
        }
    }
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: tcpcli <IPaddress>");

    sockfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));

    str_cli(stdin, sockfd); /* do it all */

    exit(0);
}
6.7 str_cli函数（再修订版）
//使用shutdown
#include    <strings.h>
#include    <sys/select.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

int Select(int nfds, fd_set * readfds, fd_set * writefds, fd_set * exceptfds,
       struct timeval *timeout)
{
    int n;
    do {
        n = select(nfds, readfds, writefds, exceptfds, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("select error");
    } while (n < 0);

    return (n);     /* can return 0 on timeout */
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Shutdown(int fd, int how)
{
    if (shutdown(fd, how) < 0)
        err_sys("shutdown error");
}

void str_cli(int fd, int sockfd)
{
    int maxfdp1, stdineof;
    fd_set rset;
    char buf[MAXLINE];
    int n;

    stdineof = 0;
    FD_ZERO(&rset);
    for (;;) {
        if (stdineof == 0)
            FD_SET(fd, &rset);
        FD_SET(sockfd, &rset);
        maxfdp1 = max(fd, sockfd) + 1;
        Select(maxfdp1, &rset, NULL, NULL, NULL);

        if (FD_ISSET(sockfd, &rset)) {  /* socket is readable */
            if ((n = Read(sockfd, buf, MAXLINE)) == 0) {
                if (stdineof == 1)
                    return; /* normal termination */
                else
                    err_quit
                        ("str_cli: server terminated prematurely");
            }

            Write(STDOUT_FILENO, buf, n);
        }

        if (FD_ISSET(fd, &rset)) {  /* input is readable */
            if ((n = Read(fd, buf, MAXLINE)) == 0) {
                stdineof = 1;
                Shutdown(sockfd, SHUT_WR);  /* send FIN */
                FD_CLR(fd, &rset);
                continue;
            }

            Writen(sockfd, buf, n);
        }
    }
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: tcpcli <IPaddress>");

    sockfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));

    str_cli(STDIN_FILENO, sockfd);  /* do it all */

    exit(0);
}
6.8 TCP回射服务器程序（修订版）
//使用select
#include    <sys/types.h>   /* basic system data types */
#include    <strings.h>
#include    <sys/select.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void str_echo(int sockfd)
{
    ssize_t n;
    char buf[MAXLINE];

 again:
    while ((n = read(sockfd, buf, MAXLINE)) > 0)
        Writen(sockfd, buf, n);

    if (n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        err_sys("str_echo: read error");
}

int Select(int nfds, fd_set * readfds, fd_set * writefds, fd_set * exceptfds,
       struct timeval *timeout)
{
    int n;
    do {
        n = select(nfds, readfds, writefds, exceptfds, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("select error");
    } while (n < 0);

    return (n);     /* can return 0 on timeout */
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

int main()
{
    int i, maxi, maxfd, listenfd, connfd, sockfd;
    int nready, client[FD_SETSIZE];
    ssize_t n;
    fd_set rset, allset;
    char buf[MAXLINE];
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);

    maxfd = listenfd;   /* initialize */
    maxi = -1;      /* index into client[] array */
    for (i = 0; i < FD_SETSIZE; i++)
        client[i] = -1; /* -1 indicates available entry */
    FD_ZERO(&allset);
    FD_SET(listenfd, &allset);
    /* end fig01 */

    /* include fig02 */
    for (;;) {
        rset = allset;  /* structure assignment */
        nready = Select(maxfd + 1, &rset, NULL, NULL, NULL);

        if (FD_ISSET(listenfd, &rset)) {    /* new client connection */
            clilen = sizeof(cliaddr);
            connfd = Accept(listenfd, (SA *) & cliaddr, &clilen);
#ifdef  NOTDEF
            printf("new client: %s, port %d\n",
                   Inet_ntop(AF_INET, &cliaddr.sin_addr, 4, NULL),
                   ntohs(cliaddr.sin_port));
#endif

            for (i = 0; i < FD_SETSIZE; i++)
                if (client[i] < 0) {
                    client[i] = connfd; /* save descriptor */
                    break;
                }
            if (i == FD_SETSIZE)
                err_quit("too many clients");

            FD_SET(connfd, &allset);    /* add new descriptor to set */
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
            if (FD_ISSET(sockfd, &rset)) {
                if ((n = Read(sockfd, buf, MAXLINE)) == 0) {
                    /*4connection closed by client */
                    Close(sockfd);
                    FD_CLR(sockfd, &allset);
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
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
#include    <poll.h>    /* for convenience */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define OPEN_MAX 1024
#define INFTIM          (-1)    /* infinite poll timeout */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void str_echo(int sockfd)
{
    ssize_t n;
    char buf[MAXLINE];

 again:
    while ((n = read(sockfd, buf, MAXLINE)) > 0)
        Writen(sockfd, buf, n);

    if (n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        err_sys("str_echo: read error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

int Poll(struct pollfd *fdarray, unsigned long nfds, int timeout)
{
    int n;
    do {
        n = poll(fdarray, nfds, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("poll error");
    } while (n < 0);

    return (n);
}

int main()
{
    int i, maxi, listenfd, connfd, sockfd;
    int nready;
    ssize_t n;
    char buf[MAXLINE];
    socklen_t clilen;
    struct pollfd client[OPEN_MAX];
    struct sockaddr_in cliaddr, servaddr;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);

    client[0].fd = listenfd;
    client[0].events = POLLIN;
    for (i = 1; i < OPEN_MAX; i++)
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
                   Sock_ntop((SA *) & cliaddr, clilen));
#endif

            for (i = 1; i < OPEN_MAX; i++)
                if (client[i].fd < 0) {
                    client[i].fd = connfd;  /* save descriptor */
                    break;
                }
            if (i == OPEN_MAX)
                err_quit("too many clients");

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
                        err_sys("read error");
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
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <stdio.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdlib.h>
#include    <sys/epoll.h>
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define MAX_EVENTS 500
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void str_echo(int sockfd)
{
    ssize_t n;
    char buf[MAXLINE];

 again:
    while ((n = read(sockfd, buf, MAXLINE)) > 0)
        Writen(sockfd, buf, n);

    if (n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        err_sys("str_echo: read error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)
{
    if (epoll_ctl(epfd, op, fd, event) < 0)
        err_sys("epoll_ctl error");
}

int Epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout)
{
    int n;
    do {
        n = epoll_wait(epfd, events, maxevents, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("epoll_wait error");
    } while (n < 0);

    return (n);
}

int main()
{
    char buf[MAXLINE];
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;

    int listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);
    // create epoll   
    int epfd = epoll_create(MAX_EVENTS);
    struct epoll_event ev;
    ev.data.fd = listenfd;
    ev.events = EPOLLIN;
    Epoll_ctl(epfd, EPOLL_CTL_ADD, listenfd, &ev);
    struct epoll_event revents[MAX_EVENTS]; //returned events

    for (;;) {
        int nready = Epoll_wait(epfd, revents, MAX_EVENTS, -1);
        for (int i = 0; i < nready; i++) {
            int sockfd = revents[i].data.fd;
            if (sockfd == listenfd) {   /* new client connection */
                clilen = sizeof(cliaddr);
                int connfd =
                    Accept(listenfd, (SA *) & cliaddr, &clilen);
                ev.data.fd = connfd;
                ev.events = EPOLLIN;
                Epoll_ctl(epfd, EPOLL_CTL_ADD, connfd, &ev);
            } else {
                if (revents[i].events & (EPOLLIN | EPOLLERR)) {
                    int n = read(sockfd, buf, MAXLINE);
                    if (n > 0) {
                        Writen(sockfd, buf, n);
                    } else if (n == 0) {
                        /*4connection closed by client */
                        struct epoll_event ev;
                        ev.data.fd = sockfd;
                        Epoll_ctl(epfd,
                              EPOLL_CTL_DEL, sockfd,
                              &ev);
                        Close(sockfd);
                    } else if (n < 0) {
                        if (errno == ECONNRESET) {
                            /*4connection reset by client */
                            struct epoll_event ev;
                            ev.data.fd = sockfd;
                            Epoll_ctl(epfd,
                                  EPOLL_CTL_DEL,
                                  sockfd, &ev);
                            Close(sockfd);
                        } else {
                            err_sys("read error");
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
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <syslog.h>  /* for syslog() */
#include    <errno.h>
#include    <string.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
#define MAX_EVENTS 500
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Shutdown(int fd, int how)
{
    if (shutdown(fd, how) < 0)
        err_sys("shutdown error");
}

void Epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)
{
    if (epoll_ctl(epfd, op, fd, event) < 0)
        err_sys("epoll_ctl error");
}

int Epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout)
{
    int n;
    do {
        n = epoll_wait(epfd, events, maxevents, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("epoll_wait error");
    } while (n < 0);

    return (n);
}

void str_cli(int fd, int sockfd)
{
    // create epoll   
    int epfd = epoll_create(MAX_EVENTS);
    struct epoll_event ev;
    ev.data.fd = fd;
    ev.events = EPOLLIN;
    Epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);
    ev.data.fd = sockfd;
    ev.events = EPOLLIN;
    Epoll_ctl(epfd, EPOLL_CTL_ADD, sockfd, &ev);
    struct epoll_event revents[MAX_EVENTS]; //returned events
    char buf[MAXLINE];
    int stdineof = 0;
    int n;
    for (;;) {
        int nready = Epoll_wait(epfd, revents, MAX_EVENTS, -1);
        for (int i = 0; i < nready; i++) {
            if (revents[i].data.fd == sockfd) { /* socket is readable */
                if ((n = Read(sockfd, buf, MAXLINE)) == 0) {
                    if (stdineof == 1) {
                        struct epoll_event ev;
                        ev.data.fd = sockfd;
                        Epoll_ctl(epfd,
                              EPOLL_CTL_DEL, sockfd,
                              &ev);
                        return; /* normal termination */
                    } else
                        err_quit
                            ("str_cli: server terminated prematurely");
                }

                Write(STDOUT_FILENO, buf, n);
            }

            if (revents[i].data.fd == fd) { /* input is readable */
                if ((n = Read(fd, buf, MAXLINE)) == 0) {
                    stdineof = 1;
                    Shutdown(sockfd, SHUT_WR);  /* send FIN */
                    struct epoll_event ev;
                    ev.data.fd = fd;
                    Epoll_ctl(epfd, EPOLL_CTL_DEL, fd, &ev);
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
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: tcpcli <IPaddress>");

    sockfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));

    str_cli(STDIN_FILENO, sockfd);  /* do it all */

    exit(0);
}
第7章 套接字选项
7.3 检查选项是否受支持并获取默认值
#define __need_timeval
#include    <stdio.h>
#include    <time.h>
#include    <netinet/tcp.h> /* for TCP_xxx defines */
#include    <sys/socket.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <errno.h>
#include    <syslog.h>  /* for syslog() */
#include    <stdarg.h>  /* ANSI C header file */
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
int daemon_proc;        /* set nonzero by daemon_init() */
union val {
    int i_val;
    long l_val;
    struct linger linger_val;
    struct timeval timeval_val;
} val;

static char strres[128];
char *sock_str_flag(union val *ptr, int len)
{
        /* *INDENT-OFF* */
        if (len != sizeof(int))
                    snprintf(strres, sizeof(strres), "size (%d) not sizeof(int)", len);
            else
                        snprintf(strres, sizeof(strres), "%s", (ptr->i_val == 0) ? "off" : "on");
                return (strres);
                    /* *INDENT-ON* */
}

char *sock_str_int(union val *ptr, int len)
{
    if (len != sizeof(int))
        snprintf(strres, sizeof(strres), "size (%d) not sizeof(int)",
             len);
    else
        snprintf(strres, sizeof(strres), "%d", ptr->i_val);
    return (strres);
}

char *sock_str_linger(union val *ptr, int len)
{
    struct linger *lptr = &ptr->linger_val;

    if (len != sizeof(struct linger))
        snprintf(strres, sizeof(strres),
             "size (%d) not sizeof(struct linger)", len);
    else
        snprintf(strres, sizeof(strres), "l_onoff = %d, l_linger = %d",
             lptr->l_onoff, lptr->l_linger);
    return (strres);
}

char *sock_str_timeval(union val *ptr, int len)
{
    struct timeval *tvptr = &ptr->timeval_val;

    if (len != sizeof(struct timeval))
        snprintf(strres, sizeof(strres),
             "size (%d) not sizeof(struct timeval)", len);
    else
        snprintf(strres, sizeof(strres), "%ld sec, %ld usec",
             tvptr->tv_sec, tvptr->tv_usec);
    return (strres);
}

struct sock_opts {
    const char *opt_str;
    int opt_level;
    int opt_name;
    char *(*opt_val_str) (union val *, int);
} sock_opts[] = {
    {
    "SO_BROADCAST", SOL_SOCKET, SO_BROADCAST, sock_str_flag}, {
    "SO_DEBUG", SOL_SOCKET, SO_DEBUG, sock_str_flag}, {
    "SO_DONTROUTE", SOL_SOCKET, SO_DONTROUTE, sock_str_flag}, {
    "SO_ERROR", SOL_SOCKET, SO_ERROR, sock_str_int}, {
    "SO_KEEPALIVE", SOL_SOCKET, SO_KEEPALIVE, sock_str_flag}, {
    "SO_LINGER", SOL_SOCKET, SO_LINGER, sock_str_linger}, {
    "SO_OOBINLINE", SOL_SOCKET, SO_OOBINLINE, sock_str_flag}, {
    "SO_RCVBUF", SOL_SOCKET, SO_RCVBUF, sock_str_int}, {
    "SO_SNDBUF", SOL_SOCKET, SO_SNDBUF, sock_str_int}, {
    "SO_RCVLOWAT", SOL_SOCKET, SO_RCVLOWAT, sock_str_int}, {
    "SO_SNDLOWAT", SOL_SOCKET, SO_SNDLOWAT, sock_str_int}, {
    "SO_RCVTIMEO", SOL_SOCKET, SO_RCVTIMEO, sock_str_timeval}, {
    "SO_SNDTIMEO", SOL_SOCKET, SO_SNDTIMEO, sock_str_timeval}, {
    "SO_REUSEADDR", SOL_SOCKET, SO_REUSEADDR, sock_str_flag},
#ifdef  SO_REUSEPORT
    {
    "SO_REUSEPORT", SOL_SOCKET, SO_REUSEPORT, sock_str_flag},
#else
    {
    "SO_REUSEPORT", 0, 0, NULL},
#endif
    {
    "SO_TYPE", SOL_SOCKET, SO_TYPE, sock_str_int},
        /*              { "SO_USELOOPBACK", SOL_SOCKET, SO_USELOOPBACK, sock_str_flag }, */
    {
    "IP_TOS", IPPROTO_IP, IP_TOS, sock_str_int}, {
    "IP_TTL", IPPROTO_IP, IP_TTL, sock_str_int},
#ifdef IPV6
#ifdef  IPV6_DONTFRAG
    {
    "IPV6_DONTFRAG", IPPROTO_IPV6, IPV6_DONTFRAG, sock_str_flag},
#else
    {
    "IPV6_DONTFRAG", 0, 0, NULL},
#endif
#ifdef  IPV6_UNICAST_HOPS
    {
    "IPV6_UNICAST_HOPS", IPPROTO_IPV6, IPV6_UNICAST_HOPS,
            sock_str_int},
#else
    {
    "IPV6_UNICAST_HOPS", 0, 0, NULL},
#endif
#ifdef  IPV6_V6ONLY
    {
    "IPV6_V6ONLY", IPPROTO_IPV6, IPV6_V6ONLY, sock_str_flag},
#else
    {
    "IPV6_V6ONLY", 0, 0, NULL},
#endif
#endif
    {
    "TCP_MAXSEG", IPPROTO_TCP, TCP_MAXSEG, sock_str_int}, {
    "TCP_NODELAY", IPPROTO_TCP, TCP_NODELAY, sock_str_flag},
#ifdef  SCTP_AUTOCLOSE
    {
    "SCTP_AUTOCLOSE", IPPROTO_SCTP, SCTP_AUTOCLOSE, sock_str_int},
#else
    {
    "SCTP_AUTOCLOSE", 0, 0, NULL},
#endif
#ifdef  SCTP_MAXBURST
    {
    "SCTP_MAXBURST", IPPROTO_SCTP, SCTP_MAXBURST, sock_str_int},
#else
    {
    "SCTP_MAXBURST", 0, 0, NULL},
#endif
#ifdef  SCTP_MAXSEG
    {
    "SCTP_MAXSEG", IPPROTO_SCTP, SCTP_MAXSEG, sock_str_int},
#else
    {
    "SCTP_MAXSEG", 0, 0, NULL},
#endif
#ifdef  SCTP_NODELAY
    {
    "SCTP_NODELAY", IPPROTO_SCTP, SCTP_NODELAY, sock_str_flag},
#else
    {
    "SCTP_NODELAY", 0, 0, NULL},
#endif
    {
    NULL, 0, 0, NULL}
};

/* *INDENT-ON* */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_ret(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_INFO, fmt, ap);
    va_end(ap);
    return;
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

int main()
{
    int fd;
    socklen_t len;
    struct sock_opts *ptr;

    for (ptr = sock_opts; ptr->opt_str != NULL; ptr++) {
        printf("%s: ", ptr->opt_str);
        if (ptr->opt_val_str == NULL)
            printf("(undefined)\n");
        else {
            switch (ptr->opt_level) {
            case SOL_SOCKET:
            case IPPROTO_IP:
            case IPPROTO_TCP:
                fd = Socket(AF_INET, SOCK_STREAM, 0);
                break;
#ifdef  IPV6
            case IPPROTO_IPV6:
                fd = Socket(AF_INET6, SOCK_STREAM, 0);
                break;
#endif
#ifdef  IPPROTO_SCTP
            case IPPROTO_SCTP:
                fd = Socket(AF_INET, SOCK_SEQPACKET,
                        IPPROTO_SCTP);
                break;
#endif
            default:
                err_quit("Can't create fd for level %d\n",
                     ptr->opt_level);
            }

            len = sizeof(val);
            if (getsockopt
                (fd, ptr->opt_level, ptr->opt_name, &val,
                 &len) == -1) {
                err_ret("getsockopt error");
            } else {
                printf("default = %s\n",
                       (*ptr->opt_val_str) (&val, len));
            }
            close(fd);
        }
    }
    exit(0);
}
第8章 基本UDP套接字编程
8.3 UDP回射服务器程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <strings.h>
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr *sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void dg_echo(int sockfd, SA * pcliaddr, socklen_t clilen)
{
    int n;
    socklen_t len;
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
    struct sockaddr_in servaddr, cliaddr;

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(sockfd, (SA *) & servaddr, sizeof(servaddr));

    dg_echo(sockfd, (SA *) & cliaddr, sizeof(cliaddr));
}
8.5 UDP回射客户程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
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
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
8.8 验证接收到的响应
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/un.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n;
    char sendline[MAXLINE], recvline[MAXLINE + 1];
    socklen_t len;
    struct sockaddr *preply_addr;

    preply_addr = (struct sockaddr *)Malloc(servlen);

    while (Fgets(sendline, MAXLINE, fp) != NULL) {

        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        len = servlen;
        n = Recvfrom(sockfd, recvline, MAXLINE, 0, preply_addr, &len);
        if (len != servlen || memcmp(pservaddr, preply_addr, len) != 0) {
            printf("reply from %s (ignored)\n",
                   Sock_ntop(preply_addr, len));
            continue;
        }

        recvline[n] = 0;    /* null terminate */
        Fputs(recvline, stdout);
    }
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
8.12 dg_cli函数（修订版）
//调用connect版本
//运行结果跟书上不符：向一个不可达的主机发起连接，没有返回连接拒绝的错误，read永远阻塞
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
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
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
8.13 UDP缺乏流量控制
8.13.1 写固定数目的数据报的客户端
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <strings.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <unistd.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

#define NDG     2000    /* datagrams to send */
#define DGLEN   1400        /* length of each datagram */
void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
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
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
8.13.2 对接收数目进行计数的服务器端
#define _POSIX_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <signal.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr *sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

static int count;
void recvfrom_int(int signo)
{
    printf("\nreceived %d datagrams\n", count);
    exit(0);
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}

Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

void dg_echo(int sockfd, SA * pcliaddr, socklen_t clilen)
{
    socklen_t len;
    char mesg[MAXLINE];

    Signal(SIGINT, recvfrom_int);

    for (;;) {
        len = clilen;
        Recvfrom(sockfd, mesg, MAXLINE, 0, pcliaddr, &len);

        count++;
    }
}

int main()
{
    int sockfd;
    struct sockaddr_in servaddr, cliaddr;

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(sockfd, (SA *) & servaddr, sizeof(servaddr));

    dg_echo(sockfd, (SA *) & cliaddr, sizeof(cliaddr));
}
8.13.3 增大套接字接收队列大小
#define _POSIX_SOURCE
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <string.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <errno.h>
#include    <stdarg.h>  /* ANSI C header file */
#include    <signal.h>
#include    <strings.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr *sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

static int count;
void recvfrom_int(int signo)
{
    printf("\nreceived %d datagrams\n", count);
    exit(0);
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}

Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

void dg_echo(int sockfd, SA * pcliaddr, socklen_t clilen)
{
    int n;
    socklen_t len;
    char mesg[MAXLINE];

    Signal(SIGINT, recvfrom_int);

    n = 220 * 1024;
    Setsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &n, sizeof(n));

    for (;;) {
        len = clilen;
        Recvfrom(sockfd, mesg, MAXLINE, 0, pcliaddr, &len);

        count++;
    }
}

int main()
{
    int sockfd;
    struct sockaddr_in servaddr, cliaddr;

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(sockfd, (SA *) & servaddr, sizeof(servaddr));

    dg_echo(sockfd, (SA *) & cliaddr, sizeof(cliaddr));
}
8.14 UDP中的外出接口的确定
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

void Getsockname(int fd, struct sockaddr *sa, socklen_t * salenptr)
{
    if (getsockname(fd, sa, salenptr) < 0)
        err_sys("getsockname error");
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

int main(int argc, char **argv)
{
    int sockfd;
    socklen_t len;
    struct sockaddr_in cliaddr, servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));

    len = sizeof(cliaddr);
    Getsockname(sockfd, (SA *) & cliaddr, &len);
    printf("local address %s\n", Sock_ntop((SA *) & cliaddr, len));

    exit(0);
}
8.15 使用select函数的TCP和UDP回射服务器程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define SERV_PORT        9877   /* TCP and UDP */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define max(a,b)    ((a) > (b) ? (a) : (b))
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr *sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}


Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void str_echo(int sockfd)
{
    ssize_t n;
    char buf[MAXLINE];

 again:
    while ((n = read(sockfd, buf, MAXLINE)) > 0)
        Writen(sockfd, buf, n);

    if (n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        err_sys("str_echo: read error");
}

void sig_chld(int signo)
{
    pid_t pid;
    int stat;

    while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
        printf("child %d terminated\n", pid);
    return;
}

int main()
{
    int listenfd, connfd, udpfd, nready, maxfdp1;
    char mesg[MAXLINE];
    pid_t childpid;
    fd_set rset;
    ssize_t n;
    socklen_t len;
    const int on = 1;
    struct sockaddr_in cliaddr, servaddr;

    /* 4create listening TCP socket */
    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));
    Bind(listenfd, (SA *) & servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);

    /* 4create UDP socket */
    udpfd = Socket(AF_INET, SOCK_DGRAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(udpfd, (SA *) & servaddr, sizeof(servaddr));
    /* end udpservselect01 */

    /* include udpservselect02 */
    Signal(SIGCHLD, sig_chld);  /* must call waitpid() */

    FD_ZERO(&rset);
    maxfdp1 = max(listenfd, udpfd) + 1;
    for (;;) {
        FD_SET(listenfd, &rset);
        FD_SET(udpfd, &rset);
        if ((nready = select(maxfdp1, &rset, NULL, NULL, NULL)) < 0) {
            if (errno == EINTR)
                continue;   /* back to for() */
            else
                err_sys("select error");
        }

        if (FD_ISSET(listenfd, &rset)) {
            len = sizeof(cliaddr);
            connfd = Accept(listenfd, (SA *) & cliaddr, &len);

            if ((childpid = Fork()) == 0) { /* child process */
                Close(listenfd);    /* close listening socket */
                str_echo(connfd);   /* process the request */
                exit(0);
            }
            Close(connfd);  /* parent closes connected socket */
        }

        if (FD_ISSET(udpfd, &rset)) {
            len = sizeof(cliaddr);
            n = Recvfrom(udpfd, mesg, MAXLINE, 0, (SA *) & cliaddr,
                     &len);

            Sendto(udpfd, mesg, n, 0, (SA *) & cliaddr, len);
        }
    }
}
第10章 SCTP客户/服务器程序例子
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
#define SERV_PORT        9877           /* TCP and UDP */
#define SA  struct sockaddr
#define LISTENQ     1024    /* 2nd argument to listen() */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout); /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr); /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}
void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}
void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}
int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}
void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}
void Setsockopt(int fd, int level, int optname, const void *optval, socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}
void Listen(int fd, int backlog)
{
    char    *ptr;

    /*4can override 2nd argument with environment variable */
    if ( (ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}
int Sctp_recvmsg(int s, void *msg, size_t len,
        struct sockaddr *from, socklen_t *fromlen,
        struct sctp_sndrcvinfo *sinfo,
        int *msg_flags)
{
    int ret;
    ret = sctp_recvmsg(s,msg,len,from,fromlen,sinfo,msg_flags);
    if(ret < 0){
        err_sys("sctp_recvmsg error");
    }
    return(ret);
}
int Sctp_sendmsg (int s, void *data, size_t len, struct sockaddr *to,
        socklen_t tolen, uint32_t ppid, uint32_t flags,
        uint16_t stream_no, uint32_t timetolive, uint32_t context)
{
    int ret;
    ret = sctp_sendmsg(s,data,len,to,tolen,ppid,flags,stream_no,
            timetolive,context);
    if(ret < 0){
        err_sys("sctp_sendmsg error");
    }
    return(ret);
}
sctp_assoc_t sctp_address_to_associd(int sock_fd, struct sockaddr *sa, socklen_t salen)
{
    struct sctp_paddrparams sp;
    int siz;

    siz = sizeof(struct sctp_paddrparams);
    bzero(&sp,siz);
    memcpy(&sp.spp_address,sa,salen);
    sctp_opt_info(sock_fd,0,SCTP_PEER_ADDR_PARAMS, &sp, (socklen_t*)&siz);
    return(sp.spp_assoc_id);
}
void Getsockopt(int fd, int level, int optname, void *optval, socklen_t *optlenptr)
{
    if (getsockopt(fd, level, optname, optval, optlenptr) < 0)
        err_sys("getsockopt error");
}
int sctp_get_no_strms(int sock_fd,struct sockaddr *to, socklen_t tolen)
{
    int retsz;
    struct sctp_status status;
    retsz = sizeof(status);
    bzero(&status,sizeof(status));

    status.sstat_assoc_id = sctp_address_to_associd(sock_fd,to,tolen);
    Getsockopt(sock_fd,IPPROTO_SCTP, SCTP_STATUS,
            &status, (socklen_t*)&retsz);
    return(status.sstat_outstrms);
}
int main(int argc, char **argv)
{
    int sock_fd,msg_flags;
    char readbuf[BUFFSIZE];
    struct sockaddr_in servaddr, cliaddr;
    struct sctp_sndrcvinfo sri;
    struct sctp_event_subscribe evnts;
    int stream_increment=1;
    socklen_t len;
    size_t rd_sz;

    if (argc == 2)
        stream_increment = atoi(argv[1]);
    sock_fd = Socket(AF_INET, SOCK_SEQPACKET, IPPROTO_SCTP);
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);

    Bind(sock_fd, (SA *) &servaddr, sizeof(servaddr));

    bzero(&evnts, sizeof(evnts));
    evnts.sctp_data_io_event = 1;
    Setsockopt(sock_fd, IPPROTO_SCTP, SCTP_EVENTS,&evnts, sizeof(evnts));

    Listen(sock_fd, LISTENQ);
    for ( ; ; ) {
        len = sizeof(struct sockaddr_in);
        rd_sz = Sctp_recvmsg(sock_fd, readbuf, sizeof(readbuf),
                (SA *)&cliaddr, &len,
                &sri,&msg_flags);
        if(stream_increment) {
            sri.sinfo_stream++;
            if(sri.sinfo_stream >=10/* sctp_get_no_strms(sock_fd,(SA *)&cliaddr, len)*/)//书上这句代码在linux上运行出错
                sri.sinfo_stream = 0;
        }
        Sctp_sendmsg(sock_fd, readbuf, rd_sz,
                (SA *)&cliaddr, len,
                sri.sinfo_ppid,
                sri.sinfo_flags,
                sri.sinfo_stream,
                0, 0);
    }
}
10.3 SCTP一到多式流分回射客户程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include <stdarg.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <netinet/sctp.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877           /* TCP and UDP */
#define SA  struct sockaddr
#define SERV_MAX_SCTP_STRM  10  /* normal maximum streams */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout); /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr); /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}
void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}
void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}
int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}
void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr); /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}
char * Fgets(char *ptr, int n, FILE *stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}
void Setsockopt(int fd, int level, int optname, const void *optval, socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}
    int
Sctp_sendmsg (int s, void *data, size_t len, struct sockaddr *to,
        socklen_t tolen, uint32_t ppid, uint32_t flags,
        uint16_t stream_no, uint32_t timetolive, uint32_t context)
{
    int ret;
    ret = sctp_sendmsg(s,data,len,to,tolen,ppid,flags,stream_no,
            timetolive,context);
    if(ret < 0){
        err_sys("sctp_sendmsg error");
    }
    return(ret);
}
int Sctp_recvmsg(int s, void *msg, size_t len,
        struct sockaddr *from, socklen_t *fromlen,
        struct sctp_sndrcvinfo *sinfo,
        int *msg_flags)
{
    int ret;
    ret = sctp_recvmsg(s,msg,len,from,fromlen,sinfo,msg_flags);
    if(ret < 0){
        err_sys("sctp_recvmsg error");
    }
    return(ret);
}
void sctpstr_cli(FILE *fp, int sock_fd, struct sockaddr *to, socklen_t tolen)
{
    struct sockaddr_in peeraddr;
    struct sctp_sndrcvinfo sri;
    char sendline[MAXLINE], recvline[MAXLINE];
    socklen_t len;
    int out_sz,rd_sz;
    int msg_flags;

    bzero(&sri,sizeof(sri));
    while (fgets(sendline, MAXLINE, fp) != NULL) {
        if(sendline[0] != '[') {
            printf("Error, line must be of the form '[streamnum]text'\n");
            continue;
        }
        sri.sinfo_stream = strtol(&sendline[1],NULL,0);
        out_sz = strlen(sendline);
        Sctp_sendmsg(sock_fd, sendline, out_sz,
                to, tolen,
                0, 0,
                sri.sinfo_stream,
                0, 0);

        len = sizeof(peeraddr);
        rd_sz = Sctp_recvmsg(sock_fd, recvline, sizeof(recvline),
                (SA *)&peeraddr, &len,
                &sri,&msg_flags);
        printf("From str:%d seq:%d (assoc:0x%x):",
                sri.sinfo_stream,sri.sinfo_ssn,
                (u_int)sri.sinfo_assoc_id);
        printf("%.*s",rd_sz,recvline);
    }
}
#define SCTP_MAXLINE    800
void sctpstr_cli_echoall(FILE *fp, int sock_fd, struct sockaddr *to, socklen_t tolen)
{
    struct sockaddr_in peeraddr;
    struct sctp_sndrcvinfo sri;
    char sendline[SCTP_MAXLINE], recvline[SCTP_MAXLINE];
    socklen_t len;
    int rd_sz,i,strsz;
    int msg_flags;

    bzero(sendline,sizeof(sendline));
    bzero(&sri,sizeof(sri));
    while (fgets(sendline, SCTP_MAXLINE - 9, fp) != NULL) {
        strsz = strlen(sendline);
        if(sendline[strsz-1] == '\n') {
            sendline[strsz-1] = '\0';
            strsz--;
        }
        for(i=0;i<SERV_MAX_SCTP_STRM;i++) {
            snprintf(sendline + strsz, sizeof(sendline) - strsz,
                    ".msg.%d", i);
            Sctp_sendmsg(sock_fd, sendline, sizeof(sendline),
                    to, tolen,
                    0, 0,
                    i,
                    0, 0);
        }
        for(i=0;i<SERV_MAX_SCTP_STRM;i++) {
            len = sizeof(peeraddr);
            rd_sz = Sctp_recvmsg(sock_fd, recvline, sizeof(recvline),
                    (SA *)&peeraddr, &len,
                    &sri,&msg_flags);
            printf("From str:%d seq:%d (assoc:0x%x):",
                    sri.sinfo_stream,sri.sinfo_ssn,
                    (u_int)sri.sinfo_assoc_id);
            printf("%.*s\n",rd_sz,recvline);
        }
    }
}
void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}
int main(int argc, char **argv)
{
    int sock_fd;
    struct sockaddr_in servaddr;
    struct sctp_event_subscribe evnts;
    int echo_to_all=0;

    if(argc < 2)
        err_quit("Missing host argument - use '%s host [echo]'\n",
                argv[0]);
    if(argc > 2) {
        printf("Echoing messages to all streams\n");
        echo_to_all = 1;
    }
    sock_fd = Socket(AF_INET, SOCK_SEQPACKET, IPPROTO_SCTP);
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    bzero(&evnts, sizeof(evnts));
    evnts.sctp_data_io_event = 1;
    Setsockopt(sock_fd,IPPROTO_SCTP, SCTP_EVENTS,
            &evnts, sizeof(evnts));
    if(echo_to_all == 0)
        sctpstr_cli(stdin,sock_fd,(SA *)&servaddr,sizeof(servaddr));
    else
        sctpstr_cli_echoall(stdin,sock_fd,(SA *)&servaddr,sizeof(servaddr));
    Close(sock_fd);
    return(0);
}
第11章 名字与地址转换
11.3 gethostbyname函数
#define _BSD_SOURCE
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#include    <netdb.h>
#define MAXLINE     4096    /* max text line length */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void err_msg(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    return;
}

const char *Inet_ntop(int family, const void *addrptr, char *strptr, size_t len)
{
    const char *ptr;

    if (strptr == NULL) /* check for old code */
        err_quit("NULL 3rd argument to inet_ntop");
    if ((ptr = inet_ntop(family, addrptr, strptr, len)) == NULL)
        err_sys("inet_ntop error"); /* sets errno */
    return (ptr);
}

void err_ret(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    return;
}

int main(int argc, char **argv)
{
    char *ptr, **pptr;
    char str[INET_ADDRSTRLEN];
    struct hostent *hptr;

    while (--argc > 0) {
        ptr = *++argv;
        if ((hptr = gethostbyname(ptr)) == NULL) {
            err_msg("gethostbyname error for host: %s: %s",
                ptr, hstrerror(h_errno));
            continue;
        }
        printf("official hostname: %s\n", hptr->h_name);

        for (pptr = hptr->h_aliases; *pptr != NULL; pptr++)
            printf("\talias: %s\n", *pptr);

        switch (hptr->h_addrtype) {
        case AF_INET:
            pptr = hptr->h_addr_list;
            for (; *pptr != NULL; pptr++)
                printf("\taddress: %s\n",
                       Inet_ntop(hptr->h_addrtype, *pptr, str,
                         sizeof(str)));
            break;

        default:
            err_ret("unknown address type");
            break;
        }
    }
    exit(0);
}
11.5 getservbyname和getservbyport函数
//时间获取客户端，使用gethostbyname 和 getservbyname. 
#define _BSD_SOURCE
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

void err_ret(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    return;
}

int main(int argc, char **argv)
{
    int sockfd, n;
    char recvline[MAXLINE + 1];
    struct sockaddr_in servaddr;
    struct in_addr **pptr;
    struct in_addr *inetaddrp[2];
    struct in_addr inetaddr;
    struct hostent *hp;
    struct servent *sp;

    if (argc != 3)
        err_quit("usage: daytimetcpcli1 <hostname> <service>");

    if ((hp = gethostbyname(argv[1])) == NULL) {
        if (inet_aton(argv[1], &inetaddr) == 0) {
            err_quit("hostname error for %s: %s", argv[1],
                 hstrerror(h_errno));
        } else {
            inetaddrp[0] = &inetaddr;
            inetaddrp[1] = NULL;
            pptr = inetaddrp;
        }
    } else {
        pptr = (struct in_addr **)hp->h_addr_list;
    }

    if ((sp = getservbyname(argv[2], "tcp")) == NULL)
        err_quit("getservbyname error for %s", argv[2]);

    for (; *pptr != NULL; pptr++) {
        sockfd = Socket(AF_INET, SOCK_STREAM, 0);

        bzero(&servaddr, sizeof(servaddr));
        servaddr.sin_family = AF_INET;
        servaddr.sin_port = sp->s_port;
        memcpy(&servaddr.sin_addr, *pptr, sizeof(struct in_addr));
        printf("trying %s\n",
               Sock_ntop((SA *) & servaddr, sizeof(servaddr)));

        if (connect(sockfd, (SA *) & servaddr, sizeof(servaddr)) == 0)
            break;  /* success */
        err_ret("connect error");
        close(sockfd);
    }
    if (*pptr == NULL)
        err_quit("unable to connect");

    while ((n = Read(sockfd, recvline, MAXLINE)) > 0) {
        recvline[n] = 0;    /* null terminate */
        Fputs(recvline, stdout);
    }
    exit(0);
}
11.12 tcp_connect函数
#define _POSIX_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

int tcp_connect(const char *host, const char *serv)
{
    int sockfd, n;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("tcp_connect error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        sockfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (sockfd < 0)
            continue;   /* ignore this one */

        if (connect(sockfd, res->ai_addr, res->ai_addrlen) == 0)
            break;  /* success */

        Close(sockfd);  /* ignore this one */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno set from final connect() */
        err_sys("tcp_connect error for %s, %s", host, serv);

    freeaddrinfo(ressave);

    return (sockfd);
}

int Tcp_connect(const char *host, const char *serv)
{
    return (tcp_connect(host, serv));
}

void Getpeername(int fd, struct sockaddr *sa, socklen_t * salenptr)
{
    if (getpeername(fd, sa, salenptr) < 0)
        err_sys("getpeername error");
}

char *sock_ntop_host(const struct sockaddr *sa, socklen_t salen)
{
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            return (str);
        }

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str,
                 sizeof(str)) == NULL)
                return (NULL);
            return (str);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s",
                     sdl->sdl_nlen, &sdl->sdl_data[0]);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop_host: unknown AF_xxx: %d, len %d",
             sa->sa_family, salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop_host(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop_host(sa, salen)) == NULL)
        err_sys("sock_ntop_host error");    /* inet_ntop() sets errno */
    return (ptr);
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

int main(int argc, char **argv)
{
    int sockfd, n;
    char recvline[MAXLINE + 1];
    socklen_t len;
    struct sockaddr_storage ss;

    if (argc != 3)
        err_quit
            ("usage: daytimetcpcli <hostname/IPaddress> <service/port#>");

    sockfd = Tcp_connect(argv[1], argv[2]);

    len = sizeof(ss);
    Getpeername(sockfd, (SA *) & ss, &len);
    printf("connected to %s\n", Sock_ntop_host((SA *) & ss, len));

    while ((n = Read(sockfd, recvline, MAXLINE)) > 0) {
        recvline[n] = 0;    /* null terminate */
        Fputs(recvline, stdout);
    }
    exit(0);
}
11.13 tcp_listen函数
11.13.1 时间获取服务器程序
#define _POSIX_SOURCE
#include    <strings.h>
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <netdb.h>
#include    <arpa/inet.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

int tcp_listen(const char *host, const char *serv, socklen_t * addrlenp)
{
    int listenfd, n;
    const int on = 1;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("tcp_listen error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        listenfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (listenfd < 0)
            continue;   /* error, try next one */

        Setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));
        if (bind(listenfd, res->ai_addr, res->ai_addrlen) == 0)
            break;  /* success */

        Close(listenfd);    /* bind error, close and try next one */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno from final socket() or bind() */
        err_sys("tcp_listen error for %s, %s", host, serv);

    Listen(listenfd, LISTENQ);

    if (addrlenp)
        *addrlenp = res->ai_addrlen;    /* return size of protocol address */

    freeaddrinfo(ressave);

    return (listenfd);
}

int Tcp_listen(const char *host, const char *serv, socklen_t * addrlenp)
{
    return (tcp_listen(host, serv, addrlenp));
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

int main(int argc, char **argv)
{
    int listenfd, connfd;
    socklen_t len;
    char buff[MAXLINE];
    time_t ticks;
    struct sockaddr_storage cliaddr;

    if (argc != 2)
        err_quit("usage: daytimetcpsrv1 <service or port#>");

    listenfd = Tcp_listen(NULL, argv[1], NULL);

    for (;;) {
        len = sizeof(cliaddr);
        connfd = Accept(listenfd, (SA *) & cliaddr, &len);
        printf("connection from %s\n",
               Sock_ntop((SA *) & cliaddr, len));

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        Write(connfd, buff, strlen(buff));

        Close(connfd);
    }
}
11.13.2 可指定协议的时间获取服务器程序
#define _POSIX_SOURCE
#include    <strings.h>
#include    <time.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <netdb.h>
#include    <arpa/inet.h>
#include    <sys/un.h>
#define MAXLINE     4096    /* max text line length */
#define LISTENQ     1024    /* 2nd argument to listen() */
#define SA  struct sockaddr
#define IPV6
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

int tcp_listen(const char *host, const char *serv, socklen_t * addrlenp)
{
    int listenfd, n;
    const int on = 1;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("tcp_listen error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        listenfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (listenfd < 0)
            continue;   /* error, try next one */

        Setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));
        if (bind(listenfd, res->ai_addr, res->ai_addrlen) == 0)
            break;  /* success */

        Close(listenfd);    /* bind error, close and try next one */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno from final socket() or bind() */
        err_sys("tcp_listen error for %s, %s", host, serv);

    Listen(listenfd, LISTENQ);

    if (addrlenp)
        *addrlenp = res->ai_addrlen;    /* return size of protocol address */

    freeaddrinfo(ressave);

    return (listenfd);
}

int Tcp_listen(const char *host, const char *serv, socklen_t * addrlenp)
{
    return (tcp_listen(host, serv, addrlenp));
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

int main(int argc, char **argv)
{
    int listenfd, connfd;
    socklen_t len, addrlen;
    char buff[MAXLINE];
    time_t ticks;
    struct sockaddr_storage cliaddr;

    if (argc == 2)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 3)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: daytimetcpsrv2 [ <host> ] <service or port>");

    for (;;) {
        len = sizeof(cliaddr);
        connfd = Accept(listenfd, (SA *) & cliaddr, &len);
        printf("connection from %s\n",
               Sock_ntop((SA *) & cliaddr, len));

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        Write(connfd, buff, strlen(buff));

        Close(connfd);
    }
}
11.14 udp_client函数
11.14.1 协议无关的时间获取客户端程序
//udp时间获取客户端程序
#define _POSIX_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

int udp_client(const char *host, const char *serv, SA ** saptr,
           socklen_t * lenp)
{
    int sockfd, n;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_DGRAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("udp_client error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        sockfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (sockfd >= 0)
            break;  /* success */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno set from final socket() */
        err_sys("udp_client error for %s, %s", host, serv);

    *saptr = (SA *) Malloc(res->ai_addrlen);
    memcpy(*saptr, res->ai_addr, res->ai_addrlen);
    *lenp = res->ai_addrlen;

    freeaddrinfo(ressave);

    return (sockfd);
}

int Udp_client(const char *host, const char *serv, SA ** saptr,
           socklen_t * lenptr)
{
    return (udp_client(host, serv, saptr, lenptr));
}

char *sock_ntop_host(const struct sockaddr *sa, socklen_t salen)
{
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            return (str);
        }

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str,
                 sizeof(str)) == NULL)
                return (NULL);
            return (str);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s",
                     sdl->sdl_nlen, &sdl->sdl_data[0]);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop_host: unknown AF_xxx: %d, len %d",
             sa->sa_family, salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop_host(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop_host(sa, salen)) == NULL)
        err_sys("sock_ntop_host error");    /* inet_ntop() sets errno */
    return (ptr);
}

int main(int argc, char **argv)
{
    int sockfd, n;
    char recvline[MAXLINE + 1];
    socklen_t salen;
    struct sockaddr *sa;

    if (argc != 3)
        err_quit
            ("usage: daytimeudpcli1 <hostname/IPaddress> <service/port#>");

    sockfd = Udp_client(argv[1], argv[2], &sa, &salen);

    printf("sending to %s\n", Sock_ntop_host(sa, salen));

    Sendto(sockfd, "", 1, 0, sa, salen);    /* send 1-byte datagram */

    n = Recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
    recvline[n] = '\0'; /* null terminate */
    Fputs(recvline, stdout);

    exit(0);
}
11.15 udp_connect函数
//udp时间获取客户端程序
#define _POSIX_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

int udp_connect(const char *host, const char *serv)
{
    int sockfd, n;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_DGRAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("udp_connect error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        sockfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (sockfd < 0)
            continue;   /* ignore this one */

        if (connect(sockfd, res->ai_addr, res->ai_addrlen) == 0)
            break;  /* success */

        Close(sockfd);  /* ignore this one */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno set from final connect() */
        err_sys("udp_connect error for %s, %s", host, serv);

    freeaddrinfo(ressave);

    return (sockfd);
}

int Udp_connect(const char *host, const char *serv)
{
    int n;

    if ((n = udp_connect(host, serv)) < 0) {
        err_quit("udp_connect error for %s, %s: %s",
             host, serv, gai_strerror(-n));
    }
    return (n);
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

int main(int argc, char **argv)
{
    int sockfd, n;
    char recvline[MAXLINE + 1];

    if (argc != 3)
        err_quit
            ("usage: daytimeudpcli2 <hostname/IPaddress> <service/port#>");

    sockfd = Udp_connect(argv[1], argv[2]);

    Write(sockfd, (void *)"", 1);   /* send 1-byte datagram */

    n = Read(sockfd, recvline, MAXLINE);
    recvline[n] = '\0'; /* null terminate */
    Fputs(recvline, stdout);

    exit(0);
}
11.16 udp_server函数
11.16.1 协议无关的时间获取服务器程序
#define _POSIX_SOURCE
#include    <strings.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr *sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

int udp_server(const char *host, const char *serv, socklen_t * addrlenp)
{
    int sockfd, n;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_DGRAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("udp_server error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        sockfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (sockfd < 0)
            continue;   /* error - try next one */

        if (bind(sockfd, res->ai_addr, res->ai_addrlen) == 0)
            break;  /* success */

        Close(sockfd);  /* bind error - close and try next one */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno from final socket() or bind() */
        err_sys("udp_server error for %s, %s", host, serv);

    if (addrlenp)
        *addrlenp = res->ai_addrlen;    /* return size of protocol address */

    freeaddrinfo(ressave);

    return (sockfd);
}

/* end udp_server */

int Udp_server(const char *host, const char *serv, socklen_t * addrlenp)
{
    return (udp_server(host, serv, addrlenp));
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

int main(int argc, char **argv)
{
    int sockfd;
    ssize_t n;
    char buff[MAXLINE];
    time_t ticks;
    socklen_t len;
    struct sockaddr_storage cliaddr;

    if (argc == 2)
        sockfd = Udp_server(NULL, argv[1], NULL);
    else if (argc == 3)
        sockfd = Udp_server(argv[1], argv[2], NULL);
    else
        err_quit("usage: daytimeudpsrv [ <host> ] <service or port>");

    for (;;) {
        len = sizeof(cliaddr);
        n = Recvfrom(sockfd, buff, MAXLINE, 0, (SA *) & cliaddr, &len);
        printf("datagram from %s\n", Sock_ntop((SA *) & cliaddr, len));

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        Sendto(sockfd, buff, strlen(buff), 0, (SA *) & cliaddr, len);
    }
}
第13章 守护进程和inetd超级服务器
13.4 daemon_init函数
13.4.1 作为守护进程运行的协议无关时间获取服务器程序
//运行: ./server localhost daytime
//查看日志: tail /var/log/syslog
#define _POSIX_SOURCE
#include    <time.h>
#include    <strings.h>
#include    <sys/socket.h>  /* basic socket definitions */
#include    <errno.h>
#include    <string.h>
#include    <unistd.h>
#include    <stdio.h>
#include    <stdlib.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
int daemon_proc;        /* set nonzero by daemon_init() */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_msg(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_INFO, fmt, ap);
    va_end(ap);
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

void Listen(int fd, int backlog)
{
    char *ptr;

    /*4can override 2nd argument with environment variable */
    if ((ptr = getenv("LISTENQ")) != NULL)
        backlog = atoi(ptr);

    if (listen(fd, backlog) < 0)
        err_sys("listen error");
}

int Accept(int fd, struct sockaddr *sa, socklen_t * salenptr)
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
            err_sys("accept error");
    }
    return (n);
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

int tcp_listen(const char *host, const char *serv, socklen_t * addrlenp)
{
    int listenfd, n;
    const int on = 1;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("tcp_listen error for %s, %s: %s",
             host, serv, gai_strerror(n));
    ressave = res;

    do {
        listenfd =
            socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if (listenfd < 0)
            continue;   /* error, try next one */

        Setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));
        if (bind(listenfd, res->ai_addr, res->ai_addrlen) == 0)
            break;  /* success */

        Close(listenfd);    /* bind error, close and try next one */
    } while ((res = res->ai_next) != NULL);

    if (res == NULL)    /* errno from final socket() or bind() */
        err_sys("tcp_listen error for %s, %s", host, serv);

    Listen(listenfd, LISTENQ);

    if (addrlenp)
        *addrlenp = res->ai_addrlen;    /* return size of protocol address */

    freeaddrinfo(ressave);

    return (listenfd);
}

int Tcp_listen(const char *host, const char *serv, socklen_t * addrlenp)
{
    return (tcp_listen(host, serv, addrlenp));
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}


Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

int daemon_init(const char *pname, int facility)
{
    int i;
    pid_t pid;

    if ((pid = Fork()) < 0)
        return (-1);
    else if (pid)
        _exit(0);   /* parent terminates */

    /* child 1 continues... */

    if (setsid() < 0)   /* become session leader */
        return (-1);

    Signal(SIGHUP, SIG_IGN);
    if ((pid = Fork()) < 0)
        return (-1);
    else if (pid)
        _exit(0);   /* child 1 terminates */

    /* child 2 continues... */

    daemon_proc = 1;    /* for err_XXX() functions */

    chdir("/");     /* change working directory */

    /* close off file descriptors */
    for (i = 0; i < MAXFD; i++)
        close(i);

    /* redirect stdin, stdout, and stderr to /dev/null */
    open("/dev/null", O_RDONLY);
    open("/dev/null", O_RDWR);
    open("/dev/null", O_RDWR);

    openlog(pname, LOG_PID, facility);

    return (0);     /* success */
}

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

int main(int argc, char **argv)
{
    int listenfd, connfd;
    socklen_t addrlen, len;
    struct sockaddr *cliaddr;
    char buff[MAXLINE];
    time_t ticks;

    if (argc < 2 || argc > 3)
        err_quit("usage: daytimetcpsrv2 [ <host> ] <service or port>");

    daemon_init(argv[0], 0);

    if (argc == 2)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);

    cliaddr = (struct sockaddr *)Malloc(addrlen);

    for (;;) {
        len = addrlen;
        connfd = Accept(listenfd, cliaddr, &len);
        err_msg("connection from %s", Sock_ntop(cliaddr, len));

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        Write(connfd, buff, strlen(buff));

        Close(connfd);
    }
}
13.6 daemon_inetd函数
要运行这个例子程序，
1.先要添加服务:
做法,在/etc/services最后加上: mydaytime     9999/tcp
2.安装xinetd: 
sudo apt-get install xinetd
3.编辑配置:在/etc/xinetd.d/目录下新建一个mydaytime文件,内容如下:
service mydaytime
{
    socket_type = stream
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
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>  /* ANSI C header file */
#include    <arpa/inet.h>
#include    <sys/un.h>
#include    <syslog.h>
#define MAXLINE     4096    /* max text line length */
#define IPV6
int daemon_proc;        /* set nonzero by daemon_init() */
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_msg(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_INFO, fmt, ap);
    va_end(ap);
    return;
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void Close(int fd)
{
    if (close(fd) == -1)
        err_sys("close error");
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

char *sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char portstr[8];
    static char str[128];   /* Unix domain is largest */

    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            if (inet_ntop(AF_INET, &sin->sin_addr, str, sizeof(str))
                == NULL)
                return (NULL);
            if (ntohs(sin->sin_port) != 0) {
                snprintf(portstr, sizeof(portstr), ":%d",
                     ntohs(sin->sin_port));
                strcat(str, portstr);
            }
            return (str);
        }
        /* end sock_ntop */

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            str[0] = '[';
            if (inet_ntop
                (AF_INET6, &sin6->sin6_addr, str + 1,
                 sizeof(str) - 1) == NULL)
                return (NULL);
            if (ntohs(sin6->sin6_port) != 0) {
                snprintf(portstr, sizeof(portstr), "]:%d",
                     ntohs(sin6->sin6_port));
                strcat(str, portstr);
                return (str);
            }
            return (str + 1);
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            struct sockaddr_un *unp = (struct sockaddr_un *)sa;

            /* OK to have no pathname bound to the socket: happens on
               every connect() unless client calls bind() first. */
            if (unp->sun_path[0] == 0)
                strcpy(str, "(no pathname bound)");
            else
                snprintf(str, sizeof(str), "%s", unp->sun_path);
            return (str);
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            struct sockaddr_dl *sdl = (struct sockaddr_dl *)sa;

            if (sdl->sdl_nlen > 0)
                snprintf(str, sizeof(str), "%*s (index %d)",
                     sdl->sdl_nlen, &sdl->sdl_data[0],
                     sdl->sdl_index);
            else
                snprintf(str, sizeof(str), "AF_LINK, index=%d",
                     sdl->sdl_index);
            return (str);
        }
#endif
    default:
        snprintf(str, sizeof(str),
             "sock_ntop: unknown AF_xxx: %d, len %d", sa->sa_family,
             salen);
        return (str);
    }
    return (NULL);
}

char *Sock_ntop(const struct sockaddr *sa, socklen_t salen)
{
    char *ptr;

    if ((ptr = sock_ntop(sa, salen)) == NULL)
        err_sys("sock_ntop error"); /* inet_ntop() sets errno */
    return (ptr);
}

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

void daemon_inetd(const char *pname, int facility)
{
    daemon_proc = 1;    /* for our err_XXX() functions */
    openlog(pname, LOG_PID, facility);
}

void Getpeername(int fd, struct sockaddr *sa, socklen_t * salenptr)
{
    if (getpeername(fd, sa, salenptr) < 0)
        err_sys("getpeername error");
}

int main(int argc, char **argv)
{
    socklen_t len;
    struct sockaddr *cliaddr;
    char buff[MAXLINE];
    time_t ticks;

    daemon_inetd(argv[0], 0);

    cliaddr = (struct sockaddr *)Malloc(sizeof(struct sockaddr_storage));
    len = sizeof(struct sockaddr_storage);
    Getpeername(0, cliaddr, &len);
    err_msg("connection from %s", Sock_ntop(cliaddr, len));

    ticks = time(NULL);
    snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
    Write(0, buff, strlen(buff));

    Close(0);       /* close TCP connection */
    exit(0);
}
第14章 高级I/O函数
14.2 套接字超时
14.2.1 使用SIGALRM 为连接设置超时 
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}


Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

void err_msg(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    return;
}

void connect_alarm(int signo)
{
    printf("time out\n");
    return;         /* just interrupt the connect() */
}

int connect_timeo(int sockfd, const SA * saptr, socklen_t salen, int nsec)
{
    Sigfunc *sigfunc;
    int n;

    sigfunc = Signal(SIGALRM, connect_alarm);
    if (alarm(nsec) != 0)
        err_msg("connect_timeo: alarm was already set");

    if ((n = connect(sockfd, saptr, salen)) < 0) {
        close(sockfd);
        if (errno == EINTR)
            errno = ETIMEDOUT;
    }
    alarm(0);       /* turn off the alarm */
    Signal(SIGALRM, sigfunc);   /* restore previous signal handler */

    return (n);
}

void Connect_timeo(int fd, const SA * sa, socklen_t salen, int sec)
{
    if (connect_timeo(fd, sa, salen, sec) < 0)
        err_sys("connect_timeo error");
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: a.out <IPaddress>");

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
        err_sys("socket error");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(13);  /* daytime server */
    if (inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0)
        err_quit("inet_pton error for %s", argv[1]);

    Connect_timeo(sockfd, (SA *) & servaddr, sizeof(servaddr), 5);

    exit(0);
}
14.2.2 使用SIGALRM 为recvfrom设置超时 
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

Sigfunc *signal(int signo, Sigfunc * func)
{
    struct sigaction act, oact;

    act.sa_handler = func;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;
    if (signo == SIGALRM) {
#ifdef  SA_INTERRUPT
        act.sa_flags |= SA_INTERRUPT;   /* SunOS 4.x */
#endif
    } else {
#ifdef  SA_RESTART
        act.sa_flags |= SA_RESTART; /* SVR4, 44BSD */
#endif
    }
    if (sigaction(signo, &act, &oact) < 0)
        return (SIG_ERR);
    return (oact.sa_handler);
}


Sigfunc *Signal(int signo, Sigfunc * func)
{               /* for our signal() function */
    Sigfunc *sigfunc;

    if ((sigfunc = signal(signo, func)) == SIG_ERR)
        err_sys("signal error");
    return (sigfunc);
}

void sig_alrm(int signo)
{
    printf("time out\n");
    return;         /* just interrupt the recvfrom() */
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n;
    char sendline[MAXLINE], recvline[MAXLINE + 1];

    Signal(SIGALRM, sig_alrm);

    while (Fgets(sendline, MAXLINE, fp) != NULL) {

        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        alarm(5);
        if ((n =
             recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL)) < 0) {
            if (errno == EINTR)
                fprintf(stderr, "socket timeout\n");
            else
                err_sys("recvfrom error");
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
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
14.2.3 使用select 为recvfrom设置超时
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <strings.h>
#include    <sys/select.h>
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
typedef void Sigfunc(int);  /* for signal handlers */
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

int readable_timeo(int fd, int sec)
{
    fd_set rset;
    struct timeval tv;

    FD_ZERO(&rset);
    FD_SET(fd, &rset);

    tv.tv_sec = sec;
    tv.tv_usec = 0;

    return (select(fd + 1, &rset, NULL, NULL, &tv));
    /* 4> 0 if descriptor is readable */
}

int Readable_timeo(int fd, int sec)
{
    int n;

    if ((n = readable_timeo(fd, sec)) < 0)
        err_sys("readable_timeo error");
    return (n);
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n;
    char sendline[MAXLINE], recvline[MAXLINE + 1];

    while (Fgets(sendline, MAXLINE, fp) != NULL) {

        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        if (Readable_timeo(sockfd, 5) == 0) {
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
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
14.2.4 使用 SO_RCVTIMEO 为recvfrom 设置超时
#define __need_timeval
#include    <strings.h>
#include    <time.h>
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
#include    <stdarg.h>
#include    <stdlib.h>
#include    <stdio.h>
#include    <string.h>
#include    <errno.h>
#include    <arpa/inet.h>
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
#define SA  struct sockaddr
void err_doit(int errnoflag, const char *fmt, va_list ap)
{
    int errno_save;
    char buf[MAXLINE];

    errno_save = errno; /* value caller might want printed */
    vsprintf(buf, fmt, ap);
    if (errnoflag)
        sprintf(buf + strlen(buf), ": %s", strerror(errno_save));
    strcat(buf, "\n");
    fflush(stdout);     /* in case stdout and stderr are the same */
    fputs(buf, stderr);
    fflush(stderr);     /* SunOS 4.1.* doesn't grok NULL argument */
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

char *Fgets(char *ptr, int n, FILE * stream)
{
    char *rptr;

    if ((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream))
        err_sys("fgets error");

    return (rptr);
}

ssize_t Recvfrom(int fd, void *ptr, size_t nbytes, int flags,
         struct sockaddr * sa, socklen_t * salenptr)
{
    ssize_t n;

    if ((n = recvfrom(fd, ptr, nbytes, flags, sa, salenptr)) < 0)
        err_sys("recvfrom error");
    return (n);
}

void Sendto(int fd, const void *ptr, size_t nbytes, int flags,
        const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Fputs(const char *ptr, FILE * stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n;
    char sendline[MAXLINE], recvline[MAXLINE + 1];
    struct timeval tv;

    tv.tv_sec = 5;
    tv.tv_usec = 0;
    Setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));

    while (Fgets(sendline, MAXLINE, fp) != NULL) {

        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        n = recvfrom(sockfd, recvline, MAXLINE, 0, NULL, NULL);
        if (n < 0) {
            if (errno == EWOULDBLOCK) {
                fprintf(stderr, "socket timeout\n");
                continue;
            } else
                err_sys("recvfrom error");
        }

        recvline[n] = 0;    /* null terminate */
        Fputs(recvline, stdout);
    }
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
第16章 非阻塞式I/O
16.2 非阻塞读和写：str_cli函数（修订版）
//使用select
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define SERV_PORT        9877   /* TCP and UDP */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

int Select(int nfds, fd_set * readfds, fd_set * writefds, fd_set * exceptfds,
       struct timeval *timeout)
{
    int n;
    do {
        n = select(nfds, readfds, writefds, exceptfds, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("select error");
    } while (n < 0);

    return (n);     /* can return 0 on timeout */
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Shutdown(int fd, int how)
{
    if (shutdown(fd, how) < 0)
        err_sys("shutdown error");
}

int Fcntl(int fd, int cmd, int arg)
{
    int n;

    if ((n = fcntl(fd, cmd, arg)) == -1)
        err_sys("fcntl error");
    return (n);
}

char *gf_time(void)
{
    struct timeval tv;
    time_t t;
    static char str[30];
    char *ptr;

    if (gettimeofday(&tv, NULL) < 0)
        err_sys("gettimeofday error");

    t = tv.tv_sec;      /* POSIX says tv.tv_sec is time_t; some BSDs don't agree. */
    ptr = ctime(&t);
    strcpy(str, &ptr[11]);
    /* Fri Sep 13 00:00:00 1986\n\0 */
    /* 0123456789012345678901234 5  */
    snprintf(str + 8, sizeof(str) - 8, ".%06ld", tv.tv_usec);

    return (str);
}

void str_cli(int sockfd)
{
    int maxfdp1, val, stdineof;
    ssize_t n, nwritten;
    fd_set rset, wset;
    char to[MAXLINE], fr[MAXLINE];
    char *toiptr, *tooptr, *friptr, *froptr;

    val = Fcntl(sockfd, F_GETFL, 0);
    Fcntl(sockfd, F_SETFL, val | O_NONBLOCK);

    val = Fcntl(STDIN_FILENO, F_GETFL, 0);
    Fcntl(STDIN_FILENO, F_SETFL, val | O_NONBLOCK);

    val = Fcntl(STDOUT_FILENO, F_GETFL, 0);
    Fcntl(STDOUT_FILENO, F_SETFL, val | O_NONBLOCK);

    toiptr = tooptr = to;   /* initialize buffer pointers */
    friptr = froptr = fr;
    stdineof = 0;

    maxfdp1 = max(max(STDIN_FILENO, STDOUT_FILENO), sockfd) + 1;
    for (;;) {
        FD_ZERO(&rset);
        FD_ZERO(&wset);
        if (stdineof == 0 && toiptr < &to[MAXLINE])
            FD_SET(STDIN_FILENO, &rset);    /* read from stdin */
        if (friptr < &fr[MAXLINE])
            FD_SET(sockfd, &rset);  /* read from socket */
        if (tooptr != toiptr)
            FD_SET(sockfd, &wset);  /* data to write to socket */
        if (froptr != friptr)
            FD_SET(STDOUT_FILENO, &wset);   /* data to write to stdout */

        Select(maxfdp1, &rset, &wset, NULL, NULL);
        /* end nonb1 */
        /* include nonb2 */
        if (FD_ISSET(STDIN_FILENO, &rset)) {
            if ((n =
                 read(STDIN_FILENO, toiptr,
                  &to[MAXLINE] - toiptr)) < 0) {
                if (errno != EWOULDBLOCK)
                    err_sys("read error on stdin");

            } else if (n == 0) {
                fprintf(stderr, "%s: EOF on stdin\n",
                    gf_time());
                stdineof = 1;   /* all done with stdin */
                if (tooptr == toiptr)
                    Shutdown(sockfd, SHUT_WR);  /* send FIN */

            } else {
                fprintf(stderr,
                    "%s: read %d bytes from stdin\n",
                    gf_time(), n);
                toiptr += n;    /* # just read */
                FD_SET(sockfd, &wset);  /* try and write to socket below */
            }
        }

        if (FD_ISSET(sockfd, &rset)) {
            if ((n =
                 read(sockfd, friptr, &fr[MAXLINE] - friptr)) < 0) {
                if (errno != EWOULDBLOCK)
                    err_sys("read error on socket");

            } else if (n == 0) {
                fprintf(stderr, "%s: EOF on socket\n",
                    gf_time());
                if (stdineof)
                    return; /* normal termination */
                else
                    err_quit
                        ("str_cli: server terminated prematurely");

            } else {
                fprintf(stderr,
                    "%s: read %d bytes from socket\n",
                    gf_time(), n);
                friptr += n;    /* # just read */
                FD_SET(STDOUT_FILENO, &wset);   /* try and write below */
            }
        }
        /* end nonb2 */
        /* include nonb3 */
        if (FD_ISSET(STDOUT_FILENO, &wset)
            && ((n = friptr - froptr) > 0)) {
            if ((nwritten = write(STDOUT_FILENO, froptr, n)) < 0) {
                if (errno != EWOULDBLOCK)
                    err_sys("write error to stdout");

            } else {
                fprintf(stderr,
                    "%s: wrote %d bytes to stdout\n",
                    gf_time(), nwritten);
                froptr += nwritten; /* # just written */
                if (froptr == friptr)
                    froptr = friptr = fr;   /* back to beginning of buffer */
            }
        }

        if (FD_ISSET(sockfd, &wset) && ((n = toiptr - tooptr) > 0)) {
            if ((nwritten = write(sockfd, tooptr, n)) < 0) {
                if (errno != EWOULDBLOCK)
                    err_sys("write error to socket");

            } else {
                fprintf(stderr,
                    "%s: wrote %d bytes to socket\n",
                    gf_time(), nwritten);
                tooptr += nwritten; /* # just written */
                if (tooptr == toiptr) {
                    toiptr = tooptr = to;   /* back to beginning of buffer */
                    if (stdineof)
                        Shutdown(sockfd, SHUT_WR);  /* send FIN */
                }
            }
        }
    }
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: tcpcli <IPaddress>");

    sockfd = Socket(AF_INET, SOCK_STREAM, 0);

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    Connect(sockfd, (SA *) & servaddr, sizeof(servaddr));

    str_cli(sockfd);    /* do it all */

    exit(0);
}
16.2.1 非阻塞读和写：str_cli函数,使用epoll
//使用epoll
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define MAX_EVENTS 10
#define MAXLINE     4096    /* max text line length */
#define SERV_PORT        9877   /* TCP and UDP */
int daemon_proc;        /* set nonzero by daemon_init() */
#define SA  struct sockaddr
#define max(a,b)    ((a) > (b) ? (a) : (b))
void err_doit(int errnoflag, int level, const char *fmt, va_list ap)
{
    int errno_save, n;
    char buf[MAXLINE + 1];

    errno_save = errno; /* value caller might want printed */
#ifdef  HAVE_VSNPRINTF
    vsnprintf(buf, MAXLINE, fmt, ap);   /* safe */
#else
    vsprintf(buf, fmt, ap); /* not safe */
#endif
    n = strlen(buf);
    if (errnoflag)
        snprintf(buf + n, MAXLINE - n, ": %s", strerror(errno_save));
    strcat(buf, "\n");

    if (daemon_proc) {
        syslog(level, "%s", buf);
    } else {
        fflush(stdout); /* in case stdout and stderr are the same */
        fputs(buf, stderr);
        fflush(stderr);
    }
    return;
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(0, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

void err_sys(const char *fmt, ...)
{
    va_list ap;

    va_start(ap, fmt);
    err_doit(1, LOG_ERR, fmt, ap);
    va_end(ap);
    exit(1);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    int n;

    if ((n = inet_pton(family, strptr, addrptr)) < 0)
        err_sys("inet_pton error for %s", strptr);  /* errno set */
    else if (n == 0)
        err_quit("inet_pton error for %s", strptr); /* errno not set */

    /* nothing to return */
}

void Connect(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (connect(fd, sa, salen) < 0)
        err_sys("connect error");
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void Shutdown(int fd, int how)
{
    if (shutdown(fd, how) < 0)
        err_sys("shutdown error");
}

int Fcntl(int fd, int cmd, int arg)
{
    int n;

    if ((n = fcntl(fd, cmd, arg)) == -1)
        err_sys("fcntl error");
    return (n);
}

char *gf_time(void)
{
    struct timeval tv;
    time_t t;
    static char str[30];
    char *ptr;

    if (gettimeofday(&tv, NULL) < 0)
        err_sys("gettimeofday error");

    t = tv.tv_sec;      /* POSIX says tv.tv_sec is time_t; some BSDs don't agree. */
    ptr = ctime(&t);
    strcpy(str, &ptr[11]);
    /* Fri Sep 13 00:00:00 1986\n\0 */
    /* 0123456789012345678901234 5  */
    snprintf(str + 8, sizeof(str) - 8, ".%06ld", tv.tv_usec);

    return (str);
}

void set_nonblock(int fd)
{
    int val = Fcntl(fd, F_GETFL, 0);
    Fcntl(fd, F_SETFL, val | O_NONBLOCK);
}

void Epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)
{
    if (epoll_ctl(epfd, op, fd, event) < 0)
        err_sys("epoll_ctl error");
}

int Epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout)
{
    int n;
    do {
        n = epoll_wait(epfd, events, maxevents, timeout);
        if (n < 0 && errno != EINTR)
            err_sys("epoll_wait error");
    } while (n < 0);

    return (n);
}

void add_event(int epfd, int fd, unsigned int event)
{
    struct epoll_event ev;
    ev.data.fd = fd;
    ev.events = event;
    Epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);
}

void str_cli(int sockfd)
{
    int stdineof;
    ssize_t n, nwritten;
    char to[MAXLINE], fr[MAXLINE];
    char *toiptr, *tooptr, *friptr, *froptr;
    toiptr = tooptr = to;   /* initialize buffer pointers */
    friptr = froptr = fr;

    set_nonblock(sockfd);
    set_nonblock(STDIN_FILENO);
    set_nonblock(STDOUT_FILENO);

    int epfd = epoll_create(MAX_EVENTS);

    add_event(epfd, STDIN_FILENO, EPOLLIN);
    add_event(epfd, STDOUT_FILENO, EPOLLOUT);
    add_event(epfd, sockfd, EPOLLIN | EPOLLOUT);

    struct epoll_event revents[MAX_EVENTS]; //returned events
    stdineof = 0;
    for (;;) {
        int nready = Epoll_wait(epfd, revents, MAX_EVENTS, -1);
        for (int i = 0; i < nready; i++) {
            if (revents[i].data.fd == STDIN_FILENO) {
                n = read(STDIN_FILENO, toiptr,
                     &to[MAXLINE] - toiptr);
                if (n < 0 && errno != EWOULDBLOCK) {
                    err_sys("read error on stdin");
                } else if (n == 0) {
                    fprintf(stderr,
                        "%s: EOF on stdin\n",
                        gf_time());
                    stdineof = 1;   /* all done with stdin */
                    if (tooptr == toiptr)
                        Shutdown(sockfd, SHUT_WR);  /* send FIN */
                } else {
                    fprintf(stderr,
                        "%s: read %d bytes from stdin\n",
                        gf_time(), n);
                    toiptr += n;    /* # just read */
                }
            }
            if (revents[i].data.fd == sockfd) {
                if (revents[i].events 
