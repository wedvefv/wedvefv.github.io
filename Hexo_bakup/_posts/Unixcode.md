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
                if (revents[i].events & EPOLLIN) {
                    n = read(sockfd, friptr,
                         &fr[MAXLINE] - friptr);
                    if (n < 0 && errno != EWOULDBLOCK) {
                        err_sys("read error on socket");
                    } else if (n == 0) {
                        fprintf(stderr,
                            "%s: EOF on socket\n",
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
                    }
                }
                if (revents[i].events & EPOLLOUT) {
                    n = toiptr - tooptr;
                    if (n > 0) {
                        nwritten =
                            write(sockfd, tooptr, n);
                        if (nwritten < 0
                            && errno != EWOULDBLOCK) {
                            err_sys
                                ("write error to socket");
                        } else {
                            fprintf(stderr,
                                "%s: wrote %d bytes to socket\n",
                                gf_time(),
                                nwritten);
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
            if (revents[i].data.fd == STDOUT_FILENO) {
                n = friptr - froptr;
                if (n > 0) {
                    nwritten =
                        write(STDOUT_FILENO, froptr, n);
                    if (nwritten < 0
                        && errno != EWOULDBLOCK) {
                        err_sys
                            ("write error to stdout");
                    } else {
                        fprintf(stderr,
                            "%s: wrote %d bytes to stdout\n",
                            gf_time(), nwritten);
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

16.2.2 str_cli函数的较简单版本
#define _POSIX_SOURCE
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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

int read_cnt;
char *read_ptr;
char read_buf[MAXLINE];
ssize_t my_read(int fd, char *ptr)
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

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void str_cli(FILE * fp, int sockfd)
{
    pid_t pid;
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

    Shutdown(sockfd, SHUT_WR);  /* EOF on stdin, send FIN */
    pause();
    return;
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
16.4 非阻塞connect：时间获取客户程序
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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

int Fcntl(int fd, int cmd, int arg)
{
    int n;

    if ((n = fcntl(fd, cmd, arg)) == -1)
        err_sys("fcntl error");
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

int connect_nonb(int sockfd, const SA * saptr, socklen_t salen, int nsec)
{
    int flags, n, error;
    socklen_t len;
    fd_set rset, wset;
    struct timeval tval;

    flags = Fcntl(sockfd, F_GETFL, 0);
    Fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);

    error = 0;
    if ((n = connect(sockfd, saptr, salen)) < 0)
        if (errno != EINPROGRESS)
            return (-1);

    /* Do whatever we want while the connect is taking place. */

    if (n == 0)
        goto done;  /* connect completed immediately */

    FD_ZERO(&rset);
    FD_SET(sockfd, &rset);
    wset = rset;
    tval.tv_sec = nsec;
    tval.tv_usec = 0;

    if ((n = Select(sockfd + 1, &rset, &wset, NULL,
            nsec ? &tval : NULL)) == 0) {
        close(sockfd);  /* timeout */
        errno = ETIMEDOUT;
        return (-1);
    }

    if (FD_ISSET(sockfd, &rset) || FD_ISSET(sockfd, &wset)) {
        len = sizeof(error);
        if (getsockopt(sockfd, SOL_SOCKET, SO_ERROR, &error, &len) < 0)
            return (-1);    /* Solaris pending error */
    } else
        err_quit("select error: sockfd not set");

 done:
    Fcntl(sockfd, F_SETFL, flags);  /* restore file status flags */

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

    if (connect_nonb(sockfd, (SA *) & servaddr, sizeof(servaddr), 5) < 0)
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
第17章 ioctl操作
17.6 get_ifi_info函数
#define _GNU_SOURCE
#include    <netinet/in.h>  /* sockaddr_in{} and other Internet defns */
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
#define IFI_ALIAS   1   /* ifi_addr is an alias */
#define IFI_NAME    16  /* same as IFNAMSIZ in <net/if.h> */
#define IFI_HADDR    8  /* allow for 64-bit EUI-64 in future */

struct ifi_info {
    char ifi_name[IFI_NAME];    /* interface name, null-terminated */
    short ifi_index;    /* interface index */
    short ifi_mtu;      /* interface MTU */
    u_char ifi_haddr[IFI_HADDR];    /* hardware address */
    u_short ifi_hlen;   /* # bytes in hardware address: 0, 6, 8 */
    short ifi_flags;    /* IFF_xxx constants from <net/if.h> */
    short ifi_myflags;  /* our own IFI_xxx flags */
    struct sockaddr *ifi_addr;  /* primary address */
    struct sockaddr *ifi_brdaddr;   /* broadcast address */
    struct sockaddr *ifi_dstaddr;   /* destination address */
    struct ifi_info *ifi_next;  /* next of these structures */
};

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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

int Ioctl(int fd, int request, void *arg)
{
    int n;

    if ((n = ioctl(fd, request, arg)) == -1)
        err_sys("ioctl error");
    return (n);     /* streamio of I_LIST returns value */
}

struct ifi_info *get_ifi_info(int family, int doaliases)
{
    struct ifi_info *ifi, *ifihead, **ifipnext;
    int sockfd, len, lastlen, flags, myflags, idx = 0, hlen = 0;
    char *ptr, *buf, lastname[IFNAMSIZ], *cptr, *haddr = 0, *sdlname;
    struct ifconf ifc;
    struct ifreq *ifr, ifrcopy;
    struct sockaddr_in *sinptr;
    struct sockaddr_in6 *sin6ptr;

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    lastlen = 0;
    len = 100 * sizeof(struct ifreq);   /* initial buffer size guess */
    for (;;) {
        buf = (char *)Malloc(len);
        ifc.ifc_len = len;
        ifc.ifc_buf = buf;
        if (ioctl(sockfd, SIOCGIFCONF, &ifc) < 0) {
            if (errno != EINVAL || lastlen != 0)
                err_sys("ioctl error");
        } else {
            if (ifc.ifc_len == lastlen)
                break;  /* success, len has not changed */
            lastlen = ifc.ifc_len;
        }
        len += 10 * sizeof(struct ifreq);   /* increment */
        free(buf);
    }
    ifihead = NULL;
    ifipnext = &ifihead;
    lastname[0] = 0;
    sdlname = NULL;
    /* end get_ifi_info1 */

    /* include get_ifi_info2 */
    for (ptr = buf; ptr < buf + ifc.ifc_len;) {
        ifr = (struct ifreq *)ptr;

#ifdef  HAVE_SOCKADDR_SA_LEN
        len = max(sizeof(struct sockaddr), ifr->ifr_addr.sa_len);
#else
        switch (ifr->ifr_addr.sa_family) {
#ifdef  IPV6
        case AF_INET6:
            len = sizeof(struct sockaddr_in6);
            break;
#endif
        case AF_INET:
        default:
            len = sizeof(struct sockaddr);
            break;
        }
#endif              /* HAVE_SOCKADDR_SA_LEN */
        ptr += sizeof(ifr->ifr_name) + len; /* for next one in buffer */

#ifdef  HAVE_SOCKADDR_DL_STRUCT
        /* assumes that AF_LINK precedes AF_INET or AF_INET6 */
        if (ifr->ifr_addr.sa_family == AF_LINK) {
            struct sockaddr_dl *sdl =
                (struct sockaddr_dl *)&ifr->ifr_addr;
            sdlname = ifr->ifr_name;
            idx = sdl->sdl_index;
            haddr = sdl->sdl_data + sdl->sdl_nlen;
            hlen = sdl->sdl_alen;
        }
#endif

        if (ifr->ifr_addr.sa_family != family)
            continue;   /* ignore if not desired address family */

        myflags = 0;
        if ((cptr = strchr(ifr->ifr_name, ':')) != NULL)
            *cptr = 0;  /* replace colon with null */
        if (strncmp(lastname, ifr->ifr_name, IFNAMSIZ) == 0) {
            if (doaliases == 0)
                continue;   /* already processed this interface */
            myflags = IFI_ALIAS;
        }
        memcpy(lastname, ifr->ifr_name, IFNAMSIZ);

        ifrcopy = *ifr;
        Ioctl(sockfd, SIOCGIFFLAGS, &ifrcopy);
        flags = ifrcopy.ifr_flags;
        if ((flags & IFF_UP) == 0)
            continue;   /* ignore if interface not up */
        /* end get_ifi_info2 */

        /* include get_ifi_info3 */
        ifi = (struct ifi_info *)Calloc(1, sizeof(struct ifi_info));
        *ifipnext = ifi;    /* prev points to this new one */
        ifipnext = &ifi->ifi_next;  /* pointer to next one goes here */

        ifi->ifi_flags = flags; /* IFF_xxx values */
        ifi->ifi_myflags = myflags; /* IFI_xxx values */
#if defined(SIOCGIFMTU) && defined(HAVE_STRUCT_IFREQ_IFR_MTU)
        Ioctl(sockfd, SIOCGIFMTU, &ifrcopy);
        ifi->ifi_mtu = ifrcopy.ifr_mtu;
#else
        ifi->ifi_mtu = 0;
#endif
        memcpy(ifi->ifi_name, ifr->ifr_name, IFI_NAME);
        ifi->ifi_name[IFI_NAME - 1] = '\0';
        /* If the sockaddr_dl is from a different interface, ignore it */
        if (sdlname == NULL || strcmp(sdlname, ifr->ifr_name) != 0)
            idx = hlen = 0;
        ifi->ifi_index = idx;
        ifi->ifi_hlen = hlen;
        if (ifi->ifi_hlen > IFI_HADDR)
            ifi->ifi_hlen = IFI_HADDR;
        if (hlen)
            memcpy(ifi->ifi_haddr, haddr, ifi->ifi_hlen);
        /* end get_ifi_info3 */
        /* include get_ifi_info4 */
        switch (ifr->ifr_addr.sa_family) {
        case AF_INET:
            sinptr = (struct sockaddr_in *)&ifr->ifr_addr;
            ifi->ifi_addr =
                (struct sockaddr *)Calloc(1,
                              sizeof(struct
                                 sockaddr_in));
            memcpy(ifi->ifi_addr, sinptr,
                   sizeof(struct sockaddr_in));

#ifdef  SIOCGIFBRDADDR
            if (flags & IFF_BROADCAST) {
                Ioctl(sockfd, SIOCGIFBRDADDR, &ifrcopy);
                sinptr = (struct sockaddr_in *)
                    &ifrcopy.ifr_broadaddr;
                ifi->ifi_brdaddr =
                    (struct sockaddr *)Calloc(1,
                                  sizeof(struct
                                     sockaddr_in));
                memcpy(ifi->ifi_brdaddr, sinptr,
                       sizeof(struct sockaddr_in));
            }
#endif

#ifdef  SIOCGIFDSTADDR
            if (flags & IFF_POINTOPOINT) {
                Ioctl(sockfd, SIOCGIFDSTADDR, &ifrcopy);
                sinptr =
                    (struct sockaddr_in *)&ifrcopy.ifr_dstaddr;
                ifi->ifi_dstaddr =
                    Calloc(1, sizeof(struct sockaddr_in));
                memcpy(ifi->ifi_dstaddr, sinptr,
                       sizeof(struct sockaddr_in));
            }
#endif
            break;

        case AF_INET6:
            sin6ptr = (struct sockaddr_in6 *)&ifr->ifr_addr;
            ifi->ifi_addr = Calloc(1, sizeof(struct sockaddr_in6));
            memcpy(ifi->ifi_addr, sin6ptr,
                   sizeof(struct sockaddr_in6));

#ifdef  SIOCGIFDSTADDR
            if (flags & IFF_POINTOPOINT) {
                Ioctl(sockfd, SIOCGIFDSTADDR, &ifrcopy);
                sin6ptr =
                    (struct sockaddr_in6 *)&ifrcopy.ifr_dstaddr;
                ifi->ifi_dstaddr =
                    Calloc(1, sizeof(struct sockaddr_in6));
                memcpy(ifi->ifi_dstaddr, sin6ptr,
                       sizeof(struct sockaddr_in6));
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

/* end get_ifi_info4 */

/* include free_ifi_info */
void free_ifi_info(struct ifi_info *ifihead)
{
    struct ifi_info *ifi, *ifinext;

    for (ifi = ifihead; ifi != NULL; ifi = ifinext) {
        if (ifi->ifi_addr != NULL)
            free(ifi->ifi_addr);
        if (ifi->ifi_brdaddr != NULL)
            free(ifi->ifi_brdaddr);
        if (ifi->ifi_dstaddr != NULL)
            free(ifi->ifi_dstaddr);
        ifinext = ifi->ifi_next;    /* can't fetch ifi_next after free() */
        free(ifi);  /* the ifi_info{} itself */
    }
}

/* end free_ifi_info */

struct ifi_info *Get_ifi_info(int family, int doaliases)
{
    struct ifi_info *ifi;

    if ((ifi = get_ifi_info(family, doaliases)) == NULL)
        err_quit("get_ifi_info error");
    return (ifi);
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
    struct ifi_info *ifi, *ifihead;
    struct sockaddr *sa;
    u_char *ptr;
    int i, family, doaliases;

    if (argc != 3)
        err_quit("usage: prifinfo <inet4|inet6> <doaliases>");

    if (strcmp(argv[1], "inet4") == 0)
        family = AF_INET;
#ifdef  IPv6
    else if (strcmp(argv[1], "inet6") == 0)
        family = AF_INET6;
#endif
    else
        err_quit("invalid <address-family>");
    doaliases = atoi(argv[2]);

    for (ifihead = ifi = Get_ifi_info(family, doaliases);
         ifi != NULL; ifi = ifi->ifi_next) {
        printf("%s: ", ifi->ifi_name);
        if (ifi->ifi_index != 0)
            printf("(%d) ", ifi->ifi_index);
        printf("<");    /* *INDENT-OFF* */
        if (ifi->ifi_flags & IFF_UP)
            printf("UP ");
        if (ifi->ifi_flags & IFF_BROADCAST)
            printf("BCAST ");
        if (ifi->ifi_flags & IFF_MULTICAST)
            printf("MCAST ");
        if (ifi->ifi_flags & IFF_LOOPBACK)
            printf("LOOP ");
        if (ifi->ifi_flags & IFF_POINTOPOINT)
            printf("P2P ");
        printf(">\n");
/* *INDENT-ON* */
        if ((i = ifi->ifi_hlen) > 0) {
            ptr = ifi->ifi_haddr;
            do {
                printf("%s%x",
                       (i == ifi->ifi_hlen) ? "  " : ":",
                       *ptr++);
            } while (--i > 0);
            printf("\n");
        }
        if (ifi->ifi_mtu != 0)
            printf("  MTU: %d\n", ifi->ifi_mtu);

        if ((sa = ifi->ifi_addr) != NULL)
            printf("  IP addr: %s\n",
                   Sock_ntop_host(sa, sizeof(*sa)));
        if ((sa = ifi->ifi_brdaddr) != NULL)
            printf("  broadcast addr: %s\n",
                   Sock_ntop_host(sa, sizeof(*sa)));
        if ((sa = ifi->ifi_dstaddr) != NULL)
            printf("  destination addr: %s\n",
                   Sock_ntop_host(sa, sizeof(*sa)));
    }
    free_ifi_info(ifihead);
    exit(0);
}
第20章 广播
20.4 使用广播的dg_cli函数
//运行前启动daytime服务,运行：./client 192.168.1.255,启动后,随便输入字符
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
#include    <sys/un.h>
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

void recvfrom_alarm(int signo)
{
    return;         /* just interrupt the recvfrom() */
}

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n;
    const int on = 1;
    char sendline[MAXLINE], recvline[MAXLINE + 1];
    socklen_t len;
    struct sockaddr *preply_addr;

    preply_addr = (struct sockaddr *)Malloc(servlen);

    Setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &on, sizeof(on));

    Signal(SIGALRM, recvfrom_alarm);

    while (Fgets(sendline, MAXLINE, fp) != NULL) {

        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        alarm(5);
        for (;;) {
            len = servlen;
            n = recvfrom(sockfd, recvline, MAXLINE, 0, preply_addr,
                     &len);
            if (n < 0) {
                if (errno == EINTR)
                    break;  /* waited long enough for replies */
                else
                    err_sys("recvfrom error");
            } else {
                recvline[n] = 0;    /* null terminate */
                printf("from %s: %s",
                       Sock_ntop_host(preply_addr, len),
                       recvline);
            }
        }
    }
    free(preply_addr);
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(13);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
22.5 竞争条件
22.5.2 用pselect阻塞和解阻塞信号
//运行前启动daytime服务,运行：./client 192.168.1.255,启动后,随便输入字符
#define _POSIX_SOURCE
#define _POSIX_C_SOURCE  200112L
#include    <sys/select.h>
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
#include    <sys/un.h>
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

void recvfrom_alarm(int signo)
{
    return;         /* just interrupt the recvfrom() */
}

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
    return (ptr);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void Sigemptyset(sigset_t * set)
{
    if (sigemptyset(set) == -1)
        err_sys("sigemptyset error");
}

void Sigaddset(sigset_t * set, int signo)
{
    if (sigaddset(set, signo) == -1)
        err_sys("sigaddset error");
}
void
Sigprocmask(int how, const sigset_t *set, sigset_t *oset)
{
    if (sigprocmask(how, set, oset) == -1)
        err_sys("sigprocmask error");
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n;
    const int on = 1;
    char sendline[MAXLINE], recvline[MAXLINE + 1];
    fd_set rset;
    sigset_t sigset_alrm, sigset_empty;
    socklen_t len;
    struct sockaddr *preply_addr;

    preply_addr = Malloc(servlen);

    Setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &on, sizeof(on));

    FD_ZERO(&rset);

    Sigemptyset(&sigset_empty);
    Sigemptyset(&sigset_alrm);
    Sigaddset(&sigset_alrm, SIGALRM);

    Signal(SIGALRM, recvfrom_alarm);

    while (Fgets(sendline, MAXLINE, fp) != NULL) {
        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        Sigprocmask(SIG_BLOCK, &sigset_alrm, NULL);
        alarm(5);
        for (;;) {
            FD_SET(sockfd, &rset);
            n = pselect(sockfd + 1, &rset, NULL, NULL, NULL,
                    &sigset_empty);
            if (n < 0) {
                if (errno == EINTR)
                    break;
                else
                    err_sys("pselect error");
            } else if (n != 1)
                err_sys("pselect error: returned %d", n);

            len = servlen;
            n = Recvfrom(sockfd, recvline, MAXLINE, 0, preply_addr,
                     &len);
            recvline[n] = 0;    /* null terminate */
            printf("from %s: %s",
                   Sock_ntop_host(preply_addr, len), recvline);
        }
    }
    free(preply_addr);
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(13);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}
22.5.4 使用信号处理函数到主控函数的IPC
//运行前启动daytime服务,运行：./client 192.168.1.255,启动后,随便输入字符
#define _POSIX_SOURCE
#include    <sys/select.h>
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
#include    <sys/un.h>
#define max(a,b)    ((a) > (b) ? (a) : (b))
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

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void Pipe(int *fds)
{
    if (pipe(fds) < 0)
        err_sys("pipe error");
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

static int pipefd[2];

static void recvfrom_alarm(int signo)
{
    Write(pipefd[1], "", 1);    /* write one null byte to pipe */
    return;
}

void dg_cli(FILE * fp, int sockfd, const SA * pservaddr, socklen_t servlen)
{
    int n, maxfdp1;
    const int on = 1;
    char sendline[MAXLINE], recvline[MAXLINE + 1];
    fd_set rset;
    socklen_t len;
    struct sockaddr *preply_addr;

    preply_addr = Malloc(servlen);

    Setsockopt(sockfd, SOL_SOCKET, SO_BROADCAST, &on, sizeof(on));

    Pipe(pipefd);
    maxfdp1 = max(sockfd, pipefd[0]) + 1;

    FD_ZERO(&rset);

    Signal(SIGALRM, recvfrom_alarm);

    while (Fgets(sendline, MAXLINE, fp) != NULL) {
        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr,
               servlen);

        alarm(5);
        for (;;) {
            FD_SET(sockfd, &rset);
            FD_SET(pipefd[0], &rset);
            if ((n = select(maxfdp1, &rset, NULL, NULL, NULL)) < 0) {
                if (errno == EINTR)
                    continue;
                else
                    err_sys("select error");
            }

            if (FD_ISSET(sockfd, &rset)) {
                len = servlen;
                n = Recvfrom(sockfd, recvline, MAXLINE, 0,
                         preply_addr, &len);
                recvline[n] = 0;    /* null terminate */
                printf("from %s: %s",
                       Sock_ntop_host(preply_addr, len),
                       recvline);
            }

            if (FD_ISSET(pipefd[0], &rset)) {
                Read(pipefd[0], &n, 1); /* timer expired */
                break;
            }
        }
    }
    free(preply_addr);
}

int main(int argc, char **argv)
{
    int sockfd;
    struct sockaddr_in servaddr;

    if (argc != 2)
        err_quit("usage: udpcli <IPaddress>");

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(13);
    Inet_pton(AF_INET, argv[1], &servaddr.sin_addr);

    sockfd = Socket(AF_INET, SOCK_DGRAM, 0);

    dg_cli(stdin, sockfd, (SA *) & servaddr, sizeof(servaddr));

    exit(0);
}

第28章 原始套接字
28.5 ping程序
#define _GNU_SOURCE
#include    <sys/time.h>
#include    <sys/un.h>
#include    <string.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <stdarg.h>
#include    <syslog.h>
#include    <errno.h>
#include    <netinet/in_systm.h>
#include    <netinet/ip.h>
#include    <netinet/ip_icmp.h>
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
pid_t pid;          /* our PID */
int sockfd;
int verbose;

struct proto {
    void (*fproc) (char *, ssize_t, struct msghdr *, struct timeval *);
    void (*fsend) (void);
    void (*finit) (void);
    struct sockaddr *sasend;    /* sockaddr{} for send, from getaddrinfo */
    struct sockaddr *sarecv;    /* sockaddr{} for receiving */
    socklen_t salen;    /* length of sockaddr{}s */
    int icmpproto;      /* IPPROTO_xxx value for ICMP */
} *pr;

#define MAXLINE     4096    /* max text line length */
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

void tv_sub(struct timeval *out, struct timeval *in)
{
    if ((out->tv_usec -= in->tv_usec) < 0) {    /* out -= in */
        --out->tv_sec;
        out->tv_usec += 1000000;
    }
    out->tv_sec -= in->tv_sec;
}

void proc_v4(char *ptr, ssize_t len, struct msghdr *msg, struct timeval *tvrecv)
{
    int hlen1, icmplen;
    double rtt;
    struct ip *ip;
    struct icmp *icmp;
    struct timeval *tvsend;

    ip = (struct ip *)ptr;  /* start of IP header */
    hlen1 = ip->ip_hl << 2; /* length of IP header */
    if (ip->ip_p != IPPROTO_ICMP)
        return;     /* not ICMP */

    icmp = (struct icmp *)(ptr + hlen1);    /* start of ICMP header */
    if ((icmplen = len - hlen1) < 8)
        return;     /* malformed packet */

    if (icmp->icmp_type == ICMP_ECHOREPLY) {
        if (icmp->icmp_id != pid)
            return; /* not a response to our ECHO_REQUEST */
        if (icmplen < 16)
            return; /* not enough data to use */

        tvsend = (struct timeval *)icmp->icmp_data;
        tv_sub(tvrecv, tvsend);
        rtt = tvrecv->tv_sec * 1000.0 + tvrecv->tv_usec / 1000.0;

        printf("%d bytes from %s: seq=%u, ttl=%d, rtt=%.3f ms\n",
               icmplen, Sock_ntop_host(pr->sarecv, pr->salen),
               icmp->icmp_seq, ip->ip_ttl, rtt);

    } else if (verbose) {
        printf("  %d bytes from %s: type = %d, code = %d\n",
               icmplen, Sock_ntop_host(pr->sarecv, pr->salen),
               icmp->icmp_type, icmp->icmp_code);
    }
}

void Gettimeofday(struct timeval *tv, void *foo)
{
    if (gettimeofday(tv, foo) == -1)
        err_sys("gettimeofday error");
    return;
}

uint16_t in_cksum(uint16_t * addr, int len)
{
    int nleft = len;
    uint32_t sum = 0;
    uint16_t *w = addr;
    uint16_t answer = 0;

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
Sendto(int fd, const void *ptr, size_t nbytes, int flags,
       const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void send_v4(void)
{
    int len;
    struct icmp *icmp;

    icmp = (struct icmp *)sendbuf;
    icmp->icmp_type = ICMP_ECHO;
    icmp->icmp_code = 0;
    icmp->icmp_id = pid;
    icmp->icmp_seq = nsent++;
    memset(icmp->icmp_data, 0xa5, datalen); /* fill with pattern */
    Gettimeofday((struct timeval *)icmp->icmp_data, NULL);

    len = 8 + datalen;  /* checksum ICMP header and data */
    icmp->icmp_cksum = 0;
    icmp->icmp_cksum = in_cksum((u_short *) icmp, len);

    Sendto(sockfd, sendbuf, len, 0, pr->sasend, pr->salen);
}

int datalen = 56;       /* data that goes with ICMP echo request */

typedef void Sigfunc(int);  /* for signal handlers */
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

struct addrinfo *Host_serv(const char *host, const char *serv, int family,
               int socktype)
{
    int n;
    struct addrinfo hints, *res;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_CANONNAME;  /* always return canonical name */
    hints.ai_family = family;   /* 0, AF_INET, AF_INET6, etc. */
    hints.ai_socktype = socktype;   /* 0, SOCK_STREAM, SOCK_DGRAM, etc. */

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("host_serv error for %s, %s: %s",
             (host == NULL) ? "(no hostname)" : host,
             (serv == NULL) ? "(no service name)" : serv,
             gai_strerror(n));

    return (res);       /* return pointer to first on linked list */
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

void sig_alrm(int signo)
{
    (*pr->fsend) ();

    alarm(1);
    return;
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

void readloop(void)
{
    int size;
    char recvbuf[BUFSIZE];
    char controlbuf[BUFSIZE];
    struct msghdr msg;
    struct iovec iov;
    ssize_t n;
    struct timeval tval;

    sockfd = Socket(pr->sasend->sa_family, SOCK_RAW, pr->icmpproto);
    setuid(getuid());   /* don't need special permissions any more */
    if (pr->finit)
        (*pr->finit) ();

    size = 60 * 1024;   /* OK if setsockopt fails */
    setsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &size, sizeof(size));

    sig_alrm(SIGALRM);  /* send first packet */

    iov.iov_base = recvbuf;
    iov.iov_len = sizeof(recvbuf);
    msg.msg_name = pr->sarecv;
    msg.msg_iov = &iov;
    msg.msg_iovlen = 1;
    msg.msg_control = controlbuf;
    for (;;) {
        msg.msg_namelen = pr->salen;
        msg.msg_controllen = sizeof(controlbuf);
        n = recvmsg(sockfd, &msg, 0);
        if (n < 0) {
            if (errno == EINTR)
                continue;
            else
                err_sys("recvmsg error");
        }

        Gettimeofday(&tval, NULL);
        (*pr->fproc) (recvbuf, n, &msg, &tval);
    }
}

void proc_v6(char *ptr, ssize_t len, struct msghdr *msg, struct timeval *tvrecv)
{
#ifdef  IPV6
    double rtt;
    struct icmp6_hdr *icmp6;
    struct timeval *tvsend;
    struct cmsghdr *cmsg;
    int hlim;

    icmp6 = (struct icmp6_hdr *)ptr;
    if (len < 8)
        return;     /* malformed packet */

    if (icmp6->icmp6_type == ICMP6_ECHO_REPLY) {
        if (icmp6->icmp6_id != pid)
            return; /* not a response to our ECHO_REQUEST */
        if (len < 16)
            return; /* not enough data to use */

        tvsend = (struct timeval *)(icmp6 + 1);
        tv_sub(tvrecv, tvsend);
        rtt = tvrecv->tv_sec * 1000.0 + tvrecv->tv_usec / 1000.0;

        hlim = -1;
        for (cmsg = CMSG_FIRSTHDR(msg); cmsg != NULL;
             cmsg = CMSG_NXTHDR(msg, cmsg)) {
            if (cmsg->cmsg_level == IPPROTO_IPV6
                && cmsg->cmsg_type == IPV6_HOPLIMIT) {
                hlim = *(u_int32_t *) CMSG_DATA(cmsg);
                break;
            }
        }
        printf("%d bytes from %s: seq=%u, hlim=",
               len, Sock_ntop_host(pr->sarecv, pr->salen),
               icmp6->icmp6_seq);
        if (hlim == -1)
            printf("???");  /* ancillary data missing */
        else
            printf("%d", hlim);
        printf(", rtt=%.3f ms\n", rtt);
    } else if (verbose) {
        printf("  %d bytes from %s: type = %d, code = %d\n",
               len, Sock_ntop_host(pr->sarecv, pr->salen),
               icmp6->icmp6_type, icmp6->icmp6_code);
    }
#endif              /* IPV6 */
}

void send_v6()
{
#ifdef  IPV6
    int len;
    struct icmp6_hdr *icmp6;

    icmp6 = (struct icmp6_hdr *)sendbuf;
    icmp6->icmp6_type = ICMP6_ECHO_REQUEST;
    icmp6->icmp6_code = 0;
    icmp6->icmp6_id = pid;
    icmp6->icmp6_seq = nsent++;
    memset((icmp6 + 1), 0xa5, datalen); /* fill with pattern */
    Gettimeofday((struct timeval *)(icmp6 + 1), NULL);

    len = 8 + datalen;  /* 8-byte ICMPv6 header */

    Sendto(sockfd, sendbuf, len, 0, pr->sasend, pr->salen);
    /* 4kernel calculates and stores checksum for us */
#endif              /* IPV6 */
}

void init_v6()
{
#ifdef IPV6
    int on = 1;

    if (verbose == 0) {
        /* install a filter that only passes ICMP6_ECHO_REPLY unless verbose */
        struct icmp6_filter myfilt;
        ICMP6_FILTER_SETBLOCKALL(&myfilt);
        ICMP6_FILTER_SETPASS(ICMP6_ECHO_REPLY, &myfilt);
        setsockopt(sockfd, IPPROTO_IPV6, ICMP6_FILTER, &myfilt,
               sizeof(myfilt));
        /* ignore error return; the filter is an optimization */
    }

    /* ignore error returned below; we just won't receive the hop limit */
#ifdef IPV6_RECVHOPLIMIT
    /* RFC 3542 */
    setsockopt(sockfd, IPPROTO_IPV6, IPV6_RECVHOPLIMIT, &on, sizeof(on));
#else
    /* RFC 2292 */
    setsockopt(sockfd, IPPROTO_IPV6, IPV6_HOPLIMIT, &on, sizeof(on));
#endif
#endif
}
struct proto proto_v4 = { proc_v4, send_v4, NULL, NULL, NULL, 0, IPPROTO_ICMP };

#ifdef  IPV6
struct proto proto_v6 =
    { proc_v6, send_v6, init_v6, NULL, NULL, 0, IPPROTO_ICMPV6 };
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
            err_quit("unrecognized option: %c", c);
        }
    }

    if (optind != argc - 1)
        err_quit("usage: ping [ -v ] <hostname>");
    host = argv[optind];

    pid = getpid() & 0xffff;    /* ICMP ID field is 16 bits */
    Signal(SIGALRM, sig_alrm);

    ai = Host_serv(host, NULL, 0, 0);

    h = Sock_ntop_host(ai->ai_addr, ai->ai_addrlen);
    printf("PING %s (%s): %d data bytes\n",
           ai->ai_canonname ? ai->ai_canonname : h, h, datalen);

    /* 4initialize according to protocol */
    if (ai->ai_family == AF_INET) {
        pr = &proto_v4;
#ifdef  IPV6
    } else if (ai->ai_family == AF_INET6) {
        pr = &proto_v6;
        if (IN6_IS_ADDR_V4MAPPED(&(((struct sockaddr_in6 *)
                        ai->ai_addr)->sin6_addr)))
            err_quit("cannot ping IPv4-mapped IPv6 address");
#endif
    } else
        err_quit("unknown address family %d", ai->ai_family);

    pr->sasend = ai->ai_addr;
    pr->sarecv = Calloc(1, ai->ai_addrlen);
    pr->salen = ai->ai_addrlen;

    readloop();

    exit(0);
}
28.6 traceroute程序
#define _GNU_SOURCE
#include    <sys/time.h>
#include    <sys/un.h>
#include    <string.h>
#include    <arpa/inet.h>
#include    <signal.h>
#include    <stdarg.h>
#include    <syslog.h>
#include    <errno.h>
#include    <netinet/in_systm.h>
#include    <netinet/ip.h>
#include    <netinet/ip_icmp.h>
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
    u_short rec_seq;    /* sequence number */
    u_short rec_ttl;    /* TTL packet left with */
    struct timeval rec_tv;  /* time packet left */
};

            /* globals */
char recvbuf[BUFSIZE];
char sendbuf[BUFSIZE];

int datalen;            /* # bytes of data following ICMP header */
char *host;
u_short sport, dport;
int nsent;          /* add 1 for each sendto() */
pid_t pid;          /* our PID */
int probe, nprobes;
int sendfd, recvfd;     /* send on UDP sock, read on raw ICMP sock */
int ttl, max_ttl;
int verbose;

            /* function prototypes */
struct proto {
    const char *(*icmpcode) (int);
    int (*recv) (int, struct timeval *);
    struct sockaddr *sasend;    /* sockaddr{} for send, from getaddrinfo */
    struct sockaddr *sarecv;    /* sockaddr{} for receiving */
    struct sockaddr *salast;    /* last sockaddr{} for receiving */
    struct sockaddr *sabind;    /* sockaddr{} for binding source port */
    socklen_t salen;    /* length of sockaddr{}s */
    int icmpproto;      /* IPPROTO_xxx value for ICMP */
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
pid_t pid;          /* our PID */
int sockfd;
int verbose;

#define MAXLINE     4096    /* max text line length */
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

void Gettimeofday(struct timeval *tv, void *foo)
{
    if (gettimeofday(tv, foo) == -1)
        err_sys("gettimeofday error");
    return;
}

uint16_t in_cksum(uint16_t * addr, int len)
{
    int nleft = len;
    uint32_t sum = 0;
    uint16_t *w = addr;
    uint16_t answer = 0;

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
Sendto(int fd, const void *ptr, size_t nbytes, int flags,
       const struct sockaddr *sa, socklen_t salen)
{
    if (sendto(fd, ptr, nbytes, flags, sa, salen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

int datalen = 56;       /* data that goes with ICMP echo request */

typedef void Sigfunc(int);  /* for signal handlers */
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

struct addrinfo *Host_serv(const char *host, const char *serv, int family,
               int socktype)
{
    int n;
    struct addrinfo hints, *res;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_CANONNAME;  /* always return canonical name */
    hints.ai_family = family;   /* 0, AF_INET, AF_INET6, etc. */
    hints.ai_socktype = socktype;   /* 0, SOCK_STREAM, SOCK_DGRAM, etc. */

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("host_serv error for %s, %s: %s",
             (host == NULL) ? "(no hostname)" : host,
             (serv == NULL) ? "(no service name)" : serv,
             gai_strerror(n));

    return (res);       /* return pointer to first on linked list */
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

int Socket(int family, int type, int protocol)
{
    int n;

    if ((n = socket(family, type, protocol)) < 0)
        err_sys("socket error");
    return (n);
}

const char *icmpcode_v4(int code)
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

void sig_alrm(int signo)
{
    gotalarm = 1;       /* set flag to note that alarm occurred */
    return;         /* and interrupt the recvfrom() */
}

int recv_v4(int seq, struct timeval *tv)
{
    int hlen1, ret;
    unsigned hlen2, icmplen;
    socklen_t len;
    ssize_t n;
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
                err_sys("recvfrom error");
        }

        ip = (struct ip *)recvbuf;  /* start of IP header */
        hlen1 = ip->ip_hl << 2; /* length of IP header */

        icmp = (struct icmp *)(recvbuf + hlen1);    /* start of ICMP header */
        if ((icmplen = n - hlen1) < 8)
            continue;   /* not enough to look at ICMP header */

        if (icmp->icmp_type == ICMP_TIMXCEED &&
            icmp->icmp_code == ICMP_TIMXCEED_INTRANS) {
            if (icmplen < 8 + sizeof(struct ip))
                continue;   /* not enough data to look at inner IP */

            hip = (struct ip *)(recvbuf + hlen1 + 8);
            hlen2 = hip->ip_hl << 2;
            if (icmplen < 8 + hlen2 + 4)
                continue;   /* not enough data to look at UDP ports */

            udp = (struct udphdr *)(recvbuf + hlen1 + 8 + hlen2);
            if (hip->ip_p == IPPROTO_UDP &&
                udp->source == htons(sport) &&
                udp->dest == htons(dport + seq)) {
                ret = -2;   /* we hit an intermediate router */
                break;
            }

        } else if (icmp->icmp_type == ICMP_UNREACH) {
            if (icmplen < 8 + sizeof(struct ip))
                continue;   /* not enough data to look at inner IP */

            hip = (struct ip *)(recvbuf + hlen1 + 8);
            hlen2 = hip->ip_hl << 2;
            if (icmplen < 8 + hlen2 + 4)
                continue;   /* not enough data to look at UDP ports */

            udp = (struct udphdr *)(recvbuf + hlen1 + 8 + hlen2);
            if (hip->ip_p == IPPROTO_UDP &&
                udp->source == htons(sport) &&
                udp->dest == htons(dport + seq)) {
                if (icmp->icmp_code == ICMP_UNREACH_PORT)
                    ret = -1;   /* have reached destination */
                else
                    ret = icmp->icmp_code;  /* 0, 1, 2, ... */
                break;
            }
        }
        if (verbose) {
            printf(" (from %s: type = %d, code = %d)\n",
                   Sock_ntop_host(pr->sarecv, pr->salen),
                   icmp->icmp_type, icmp->icmp_code);
        }
        /* Some other ICMP error, recvfrom() again */
    }
    alarm(0);       /* don't leave alarm running */
    Gettimeofday(tv, NULL); /* get time of packet arrival */
    return (ret);
}

struct proto proto_v4 = { icmpcode_v4, recv_v4, NULL, NULL, NULL, NULL, 0,
    IPPROTO_ICMP, IPPROTO_IP, IP_TTL
};

const char *icmpcode_v6(int code)
{
#ifdef  IPV6
    static char errbuf[100];
    switch (code) {
    case ICMP6_DST_UNREACH_NOROUTE:
        return ("no route to host");
    case ICMP6_DST_UNREACH_ADMIN:
        return ("administratively prohibited");
    case ICMP6_DST_UNREACH_ADDR:
        return ("address unreachable");
    case ICMP6_DST_UNREACH_NOPORT:
        return ("port unreachable");
    default:
        sprintf(errbuf, "[unknown code %d]", code);
        return errbuf;
    }
#endif
}

int recv_v6(int seq, struct timeval *tv)
{
#ifdef  IPV6
    int ret;
    unsigned hlen2, icmp6len;
    ssize_t n;
    socklen_t len;
    struct ip6_hdr *hip6;
    struct icmp6_hdr *icmp6;
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
                err_sys("recvfrom error");
        }

        icmp6 = (struct icmp6_hdr *)recvbuf;    /* ICMP header */
        if ((icmp6len = n) < 8)
            continue;   /* not enough to look at ICMP header */

        if (icmp6->icmp6_type == ICMP6_TIME_EXCEEDED &&
            icmp6->icmp6_code == ICMP6_TIME_EXCEED_TRANSIT) {
            if (icmp6len < 8 + sizeof(struct ip6_hdr) + 4)
                continue;   /* not enough data to look at inner header */

            hip6 = (struct ip6_hdr *)(recvbuf + 8);
            hlen2 = sizeof(struct ip6_hdr);
            udp = (struct udphdr *)(recvbuf + 8 + hlen2);
            if (hip6->ip6_nxt == IPPROTO_UDP &&
                udp->source == htons(sport) &&
                udp->dest == htons(dport + seq))
                ret = -2;   /* we hit an intermediate router */
            break;

        } else if (icmp6->icmp6_type == ICMP6_DST_UNREACH) {
            if (icmp6len < 8 + sizeof(struct ip6_hdr) + 4)
                continue;   /* not enough data to look at inner header */

            hip6 = (struct ip6_hdr *)(recvbuf + 8);
            hlen2 = sizeof(struct ip6_hdr);
            udp = (struct udphdr *)(recvbuf + 8 + hlen2);
            if (hip6->ip6_nxt == IPPROTO_UDP &&
                udp->source == htons(sport) &&
                udp->dest == htons(dport + seq)) {
                if (icmp6->icmp6_code ==
                    ICMP6_DST_UNREACH_NOPORT)
                    ret = -1;   /* have reached destination */
                else
                    ret = icmp6->icmp6_code;    /* 0, 1, 2, ... */
                break;
            }
        } else if (verbose) {
            printf(" (from %s: type = %d, code = %d)\n",
                   Sock_ntop_host(pr->sarecv, pr->salen),
                   icmp6->icmp6_type, icmp6->icmp6_code);
        }
        /* Some other ICMP error, recvfrom() again */
    }
    alarm(0);       /* don't leave alarm running */
    Gettimeofday(tv, NULL); /* get time of packet arrival */
    return (ret);
#endif
}

#ifdef  IPV6
struct proto proto_v6 = { icmpcode_v6, recv_v6, NULL, NULL, NULL, NULL, 0,
    IPPROTO_ICMPV6, IPPROTO_IPV6, IPV6_UNICAST_HOPS
};
#endif

int max_ttl = 30;
int nprobes = 3;
u_short dport = 32768 + 666;

void sock_set_port(struct sockaddr *sa, socklen_t salen, int port)
{
    switch (sa->sa_family) {
    case AF_INET:{
            struct sockaddr_in *sin = (struct sockaddr_in *)sa;

            sin->sin_port = port;
            return;
        }

#ifdef  IPV6
    case AF_INET6:{
            struct sockaddr_in6 *sin6 = (struct sockaddr_in6 *)sa;

            sin6->sin6_port = port;
            return;
        }
#endif
    }

    return;
}

void Bind(int fd, const struct sockaddr *sa, socklen_t salen)
{
    if (bind(fd, sa, salen) < 0)
        err_sys("bind error");
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
}

int sock_cmp_addr(const struct sockaddr *sa1, const struct sockaddr *sa2,
          socklen_t salen)
{
    if (sa1->sa_family != sa2->sa_family)
        return (-1);

    switch (sa1->sa_family) {
    case AF_INET:{
            return (memcmp(&((struct sockaddr_in *)sa1)->sin_addr,
                       &((struct sockaddr_in *)sa2)->sin_addr,
                       sizeof(struct in_addr)));
        }

#ifdef  IPV6
    case AF_INET6:{
            return (memcmp(&((struct sockaddr_in6 *)sa1)->sin6_addr,
                       &((struct sockaddr_in6 *)sa2)->sin6_addr,
                       sizeof(struct in6_addr)));
        }
#endif

#ifdef  AF_UNIX
    case AF_UNIX:{
            return (strcmp(((struct sockaddr_un *)sa1)->sun_path,
                       ((struct sockaddr_un *)sa2)->sun_path));
        }
#endif

#ifdef  HAVE_SOCKADDR_DL_STRUCT
    case AF_LINK:{
            return (-1);    /* no idea what to compare here ? */
        }
#endif
    }
    return (-1);
}

void tv_sub(struct timeval *out, struct timeval *in)
{
    if ((out->tv_usec -= in->tv_usec) < 0) {    /* out -= in */
        --out->tv_sec;
        out->tv_usec += 1000000;
    }
    out->tv_sec -= in->tv_sec;
}

void traceloop(void)
{
    int seq, code, done;
    double rtt;
    struct rec *rec;
    struct timeval tvrecv;

    recvfd = Socket(pr->sasend->sa_family, SOCK_RAW, pr->icmpproto);
    setuid(getuid());   /* don't need special permissions anymore */

#ifdef  IPV6
    if (pr->sasend->sa_family == AF_INET6 && verbose == 0) {
        struct icmp6_filter myfilt;
        ICMP6_FILTER_SETBLOCKALL(&myfilt);
        ICMP6_FILTER_SETPASS(ICMP6_TIME_EXCEEDED, &myfilt);
        ICMP6_FILTER_SETPASS(ICMP6_DST_UNREACH, &myfilt);
        setsockopt(recvfd, IPPROTO_IPV6, ICMP6_FILTER,
               &myfilt, sizeof(myfilt));
    }
#endif

    sendfd = Socket(pr->sasend->sa_family, SOCK_DGRAM, 0);

    pr->sabind->sa_family = pr->sasend->sa_family;
    sport = (getpid() & 0xffff) | 0x8000;   /* our source UDP port # */
    sock_set_port(pr->sabind, pr->salen, htons(sport));
    Bind(sendfd, pr->sabind, pr->salen);

    sig_alrm(SIGALRM);

    seq = 0;
    done = 0;
    for (ttl = 1; ttl <= max_ttl && done == 0; ttl++) {
        Setsockopt(sendfd, pr->ttllevel, pr->ttloptname, &ttl,
               sizeof(int));
        bzero(pr->salast, pr->salen);

        printf("%2d ", ttl);
        fflush(stdout);

        for (probe = 0; probe < nprobes; probe++) {
            rec = (struct rec *)sendbuf;
            rec->rec_seq = ++seq;
            rec->rec_ttl = ttl;
            Gettimeofday(&rec->rec_tv, NULL);

            sock_set_port(pr->sasend, pr->salen,
                      htons(dport + seq));
            Sendto(sendfd, sendbuf, datalen, 0, pr->sasend,
                   pr->salen);

            if ((code = (*pr->recv) (seq, &tvrecv)) == -3)
                printf(" *");   /* timeout, no reply */
            else {
                char str[NI_MAXHOST];

                if (sock_cmp_addr
                    (pr->sarecv, pr->salast, pr->salen) != 0) {
                    if (getnameinfo
                        (pr->sarecv, pr->salen, str,
                         sizeof(str), NULL, 0, 0) == 0)
                        printf(" %s (%s)", str,
                               Sock_ntop_host
                               (pr->sarecv, pr->salen));
                    else
                        printf(" %s",
                               Sock_ntop_host
                               (pr->sarecv, pr->salen));
                    memcpy(pr->salast, pr->sarecv,
                           pr->salen);
                }
                tv_sub(&tvrecv, &rec->rec_tv);
                rtt =
                    tvrecv.tv_sec * 1000.0 +
                    tvrecv.tv_usec / 1000.0;
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
            if ((max_ttl = atoi(optarg)) <= 1)
                err_quit("invalid -m value");
            break;

        case 'v':
            verbose++;
            break;

        case '?':
            err_quit("unrecognized option: %c", c);
        }
    }

    if (optind != argc - 1)
        err_quit("usage: traceroute [ -m <maxttl> -v ] <hostname>");
    host = argv[optind];

    pid = getpid();
    Signal(SIGALRM, sig_alrm);

    ai = Host_serv(host, NULL, 0, 0);

    h = Sock_ntop_host(ai->ai_addr, ai->ai_addrlen);
    printf("traceroute to %s (%s): %d hops max, %d data bytes\n",
           ai->ai_canonname ? ai->ai_canonname : h, h, max_ttl, datalen);

    /* initialize according to protocol */
    if (ai->ai_family == AF_INET) {
        pr = &proto_v4;
#ifdef  IPV6
    } else if (ai->ai_family == AF_INET6) {
        pr = &proto_v6;
        if (IN6_IS_ADDR_V4MAPPED
            (&(((struct sockaddr_in6 *)ai->ai_addr)->sin6_addr)))
            err_quit("cannot traceroute IPv4-mapped IPv6 address");
#endif
    } else
        err_quit("unknown address family %d", ai->ai_family);

    pr->sasend = ai->ai_addr;   /* contains destination address */
    pr->sarecv = Calloc(1, ai->ai_addrlen);
    pr->salast = Calloc(1, ai->ai_addrlen);
    pr->sabind = Calloc(1, ai->ai_addrlen);
    pr->salen = ai->ai_addrlen;

    traceloop();

    exit(0);
}
第30章 客户／服务器程序设计范式
30.3 TCP测试用客户程序
运行:./client 127.0.0.1 8888 1 5000 4000
#define _GNU_SOURCE
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
int daemon_proc;        /* set nonzero by daemon_init() */
#define MAXN    16384       /* max # bytes to request from server */
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

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}
ssize_t                     /* Read "n" bytes from a descriptor. */
readn(int fd, void *vptr, size_t n)
{
    size_t  nleft;
    ssize_t nread;
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
ssize_t
Readn(int fd, void *ptr, size_t nbytes)
{
    ssize_t     n;

    if ( (n = readn(fd, ptr, nbytes)) < 0)
        err_sys("readn error");
    return(n);
}

int main(int argc, char **argv)
{
    int i, j, fd, nchildren, nloops, nbytes;
    pid_t pid;
    ssize_t n;
    char request[MAXLINE], reply[MAXN];

    if (argc != 6)
        err_quit
            ("usage: client <hostname or IPaddr> <port> <#children> "
             "<#loops/child> <#bytes/request>");

    nchildren = atoi(argv[3]);
    nloops = atoi(argv[4]);
    nbytes = atoi(argv[5]);
    snprintf(request, sizeof(request), "%d\n", nbytes); /* newline at end */

    for (i = 0; i < nchildren; i++) {
        if ((pid = Fork()) == 0) {  /* child */
            for (j = 0; j < nloops; j++) {
                fd = Tcp_connect(argv[1], argv[2]);

                Write(fd, request, strlen(request));

                if ((n = Readn(fd, reply, nbytes)) != nbytes)
                    err_quit("server returned %d bytes", n);

                Close(fd);  /* TIME_WAIT on client, not server */
            }
            printf("child %d done\n", i);
            exit(0);
        }
        /* parent loops around to fork() again */
    }

    while (wait(NULL) > 0)  /* now parent waits for all children */
        ;
    if (errno != ECHILD)
        err_sys("wait error");

    exit(0);
}
30.4 TCP迭代服务器程序
运行,./server 8888
#define _GNU_SOURCE
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
int daemon_proc;        /* set nonzero by daemon_init() */

void sig_int(int signo)
{
    void pr_cpu_time(void);

    pr_cpu_time();
    exit(0);
}

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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

int main(int argc, char **argv)
{
    int listenfd, connfd;
    void sig_int(int), web_child(int);
    socklen_t clilen, addrlen;
    struct sockaddr *cliaddr;

    if (argc == 2)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 3)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv00 [ <host> ] <port#>");
    cliaddr = Malloc(addrlen);

    Signal(SIGINT, sig_int);

    for (;;) {
        clilen = addrlen;
        connfd = Accept(listenfd, cliaddr, &clilen);

        web_child(connfd);  /* process the request */

        Close(connfd);  /* parent closes connected socket */
    }
}
30.5 TCP并发服务器程序，每个客户一个子进程
#define _GNU_SOURCE
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
int daemon_proc;        /* set nonzero by daemon_init() */

void sig_int(int signo)
{
    void pr_cpu_time(void);

    pr_cpu_time();
    exit(0);
}

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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void sig_chld(int signo)
{
    pid_t pid;
    int stat;

    while ((pid = waitpid(-1, &stat, WNOHANG)) > 0) {
        printf("child %d terminated\n", pid);
    }
    return;
}

int main(int argc, char **argv)
{
    int listenfd, connfd;
    pid_t childpid;
    void sig_chld(int), sig_int(int), web_child(int);
    socklen_t clilen, addrlen;
    struct sockaddr *cliaddr;

    if (argc == 2)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 3)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv01 [ <host> ] <port#>");
    cliaddr = Malloc(addrlen);

    Signal(SIGCHLD, sig_chld);
    Signal(SIGINT, sig_int);

    for (;;) {
        clilen = addrlen;
        if ((connfd = accept(listenfd, cliaddr, &clilen)) < 0) {
            if (errno == EINTR)
                continue;   /* back to for() */
            else
                err_sys("accept error");
        }

        if ((childpid = Fork()) == 0) { /* child process */
            Close(listenfd);    /* close listening socket */
            web_child(connfd);  /* process request */
            exit(0);
        }
        Close(connfd);  /* parent closes connected socket */
    }
}
30.6 TCP预先派生子进程服务器程序，accept无上锁保护
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

static int nchildren;
static pid_t *pids;

void sig_int(int signo)
{
    int i;
    void pr_cpu_time(void);

    /* 4terminate all children */
    for (i = 0; i < nchildren; i++)
        kill(pids[i], SIGTERM);
    while (wait(NULL) > 0)  /* wait for all children */
        ;
    if (errno != ECHILD)
        err_sys("wait error");

    pr_cpu_time();
    exit(0);
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void child_main(int i, int listenfd, int addrlen)
{
    int connfd;
    void web_child(int);
    socklen_t clilen;
    struct sockaddr *cliaddr;

    cliaddr = Malloc(addrlen);

    printf("child %ld starting\n", (long)getpid());
    for (;;) {
        clilen = addrlen;
        connfd = Accept(listenfd, cliaddr, &clilen);

        web_child(connfd);  /* process the request */
        Close(connfd);
    }
}

pid_t child_make(int i, int listenfd, int addrlen)
{
    pid_t pid;

    if ((pid = Fork()) > 0)
        return (pid);   /* parent */

    child_main(i, listenfd, addrlen);   /* never returns */
    return 0;
}

int main(int argc, char **argv)
{
    int listenfd, i;
    socklen_t addrlen;
    void sig_int(int);

    if (argc == 3)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 4)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv02 [ <host> ] <port#> <#children>");
    nchildren = atoi(argv[argc - 1]);
    pids = Calloc(nchildren, sizeof(pid_t));

    for (i = 0; i < nchildren; i++)
        pids[i] = child_make(i, listenfd, addrlen); /* parent returns */

    Signal(SIGINT, sig_int);

    for (;;)
        pause();    /* everything done by children */
}
30.7 TCP预先派生子进程服务器程序，accept使用文件上锁保护
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

static int nchildren;
static pid_t *pids;

void sig_int(int signo)
{
    int i;
    void pr_cpu_time(void);

    /* terminate all children */
    for (i = 0; i < nchildren; i++)
        kill(pids[i], SIGTERM);
    while (wait(NULL) > 0)  /* wait for all children */
        ;
    if (errno != ECHILD)
        err_sys("wait error");

    pr_cpu_time();
    exit(0);
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

static struct flock lock_it, unlock_it;
static int lock_fd = -1;
                    /* fcntl() will fail if my_lock_init() not called */

int Open(const char *pathname, int oflag, mode_t mode)
{
    int fd;

    if ((fd = open(pathname, oflag, mode)) == -1)
        err_sys("open error for %s", pathname);
    return (fd);
}

#define FILE_MODE   (S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH)
int Mkstemp(char *template)
{
    int i;

    if ((i = mkstemp(template)) < 0)
        err_quit("mkstemp error");
    return i;
}

void Unlink(const char *pathname)
{
    if (unlink(pathname) == -1)
        err_sys("unlink error for %s", pathname);
}

void my_lock_init(char *pathname)
{
    char lock_file[1024];

    /* 4must copy caller's string, in case it's a constant */
    strncpy(lock_file, pathname, sizeof(lock_file));
    lock_fd = Mkstemp(lock_file);

    Unlink(lock_file);  /* but lock_fd remains open */

    lock_it.l_type = F_WRLCK;
    lock_it.l_whence = SEEK_SET;
    lock_it.l_start = 0;
    lock_it.l_len = 0;

    unlock_it.l_type = F_UNLCK;
    unlock_it.l_whence = SEEK_SET;
    unlock_it.l_start = 0;
    unlock_it.l_len = 0;
}

/* end my_lock_init */

/* include my_lock_wait */
void my_lock_wait()
{
    int rc;

    while ((rc = fcntl(lock_fd, F_SETLKW, &lock_it)) < 0) {
        if (errno == EINTR)
            continue;
        else
            err_sys("fcntl error for my_lock_wait");
    }
}

void my_lock_release()
{
    if (fcntl(lock_fd, F_SETLKW, &unlock_it) < 0)
        err_sys("fcntl error for my_lock_release");
}

void child_main(int i, int listenfd, int addrlen)
{
    int connfd;
    void web_child(int);
    socklen_t clilen;
    struct sockaddr *cliaddr;

    cliaddr = Malloc(addrlen);

    printf("child %ld starting\n", (long)getpid());
    for (;;) {
        clilen = addrlen;
        my_lock_wait();
        connfd = Accept(listenfd, cliaddr, &clilen);
        my_lock_release();

        web_child(connfd);  /* process the request */
        Close(connfd);
    }
}

pid_t child_make(int i, int listenfd, int addrlen)
{
    pid_t pid;

    if ((pid = Fork()) > 0)
        return (pid);   /* parent */

    child_main(i, listenfd, addrlen);   /* never returns */
    return 0;
}

/* end my_lock_wait */

static int nchildren;
static pid_t *pids;

int main(int argc, char **argv)
{
    int listenfd, i;
    socklen_t addrlen;
    void sig_int(int);
    pid_t child_make(int, int, int);

    if (argc == 3)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 4)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv03 [ <host> ] <port#> <#children>");
    nchildren = atoi(argv[argc - 1]);
    pids = Calloc(nchildren, sizeof(pid_t));

    my_lock_init("/tmp/lock.XXXXXX");   /* one lock file for all children */
    for (i = 0; i < nchildren; i++)
        pids[i] = child_make(i, listenfd, addrlen); /* parent returns */

    Signal(SIGINT, sig_int);

    for (;;)
        pause();    /* everything done by children */
}
30.8 TCP预先派生子进程服务器程序，accept使用线程上锁保护 
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

static int nchildren;
static pid_t *pids;

void sig_int(int signo)
{
    int i;
    void pr_cpu_time(void);

    /* terminate all children */
    for (i = 0; i < nchildren; i++)
        kill(pids[i], SIGTERM);
    while (wait(NULL) > 0)  /* wait for all children */
        ;
    if (errno != ECHILD)
        err_sys("wait error");

    pr_cpu_time();
    exit(0);
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

void *Mmap(void *addr, size_t len, int prot, int flags, int fd, off_t offset)
{
    void *ptr;

    if ((ptr = mmap(addr, len, prot, flags, fd, offset)) == ((void *)-1))
        err_sys("mmap error");
    return (ptr);
}

void Pthread_mutexattr_init(pthread_mutexattr_t * attr)
{
    int n;

    if ((n = pthread_mutexattr_init(attr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutexattr_init error");
}

static pthread_mutex_t *mptr;   /* actual mutex will be in shared memory */
void Pthread_mutexattr_setpshared(pthread_mutexattr_t * attr, int flag)
{
    int n;

    if ((n = pthread_mutexattr_setpshared(attr, flag)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutexattr_setpshared error");
}

void Pthread_mutex_init(pthread_mutex_t * mptr, pthread_mutexattr_t * attr)
{
    int n;

    if ((n = pthread_mutex_init(mptr, attr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_init error");
}

int Open(const char *pathname, int oflag, mode_t mode)
{
    int fd;

    if ((fd = open(pathname, oflag, mode)) == -1)
        err_sys("open error for %s", pathname);
    return (fd);
}

void my_lock_init(char *pathname)
{
    int fd;
    pthread_mutexattr_t mattr;

    fd = Open("/dev/zero", O_RDWR, 0);

    mptr = Mmap(0, sizeof(pthread_mutex_t), PROT_READ | PROT_WRITE,
            MAP_SHARED, fd, 0);
    Close(fd);

    Pthread_mutexattr_init(&mattr);
    Pthread_mutexattr_setpshared(&mattr, PTHREAD_PROCESS_SHARED);
    Pthread_mutex_init(mptr, &mattr);
}

void Pthread_mutex_lock(pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_mutex_lock(mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_lock error");
}

void my_lock_wait()
{
    Pthread_mutex_lock(mptr);
}

void Pthread_mutex_unlock(pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_mutex_unlock(mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_unlock error");
}

void my_lock_release()
{
    Pthread_mutex_unlock(mptr);
}

void child_main(int i, int listenfd, int addrlen)
{
    int connfd;
    void web_child(int);
    socklen_t clilen;
    struct sockaddr *cliaddr;

    cliaddr = Malloc(addrlen);

    printf("child %ld starting\n", (long)getpid());
    for (;;) {
        clilen = addrlen;
        my_lock_wait();
        connfd = Accept(listenfd, cliaddr, &clilen);
        my_lock_release();

        web_child(connfd);  /* process the request */
        Close(connfd);
    }
}

pid_t child_make(int i, int listenfd, int addrlen)
{
    pid_t pid;

    if ((pid = Fork()) > 0)
        return (pid);   /* parent */

    child_main(i, listenfd, addrlen);   /* never returns */
    return 0;
}

static int nchildren;
static pid_t *pids;
int main(int argc, char **argv)
{
    int listenfd, i;
    socklen_t addrlen;
    void sig_int(int);
    pid_t child_make(int, int, int);

    if (argc == 3)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 4)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv04 [ <host> ] <port#> <#children>");
    nchildren = atoi(argv[argc - 1]);
    pids = Calloc(nchildren, sizeof(pid_t));

    my_lock_init(NULL);
    for (i = 0; i < nchildren; i++)
        pids[i] = child_make(i, listenfd, addrlen); /* parent returns */

    Signal(SIGINT, sig_int);

    for (;;)
        pause();    /* everything done by children */
}
30.9 TCP预先派生子进程服务器程序，传递描述符 
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

static int nchildren;

void Socketpair(int family, int type, int protocol, int *fd)
{
    int n;

    if ((n = socketpair(family, type, protocol, fd)) < 0)
        err_sys("socketpair error");
}

pid_t Fork(void)
{
    pid_t pid;

    if ((pid = fork()) == -1)
        err_sys("fork error");
    return (pid);
}

typedef struct {
    pid_t child_pid;    /* process ID */
    int child_pipefd;   /* parent's stream pipe to/from child */
    int child_status;   /* 0 = ready */
    long child_count;   /* # connections handled */
} Child;

Child *cptr;            /* array of Child structures; calloc'ed */

void sig_int(int signo)
{
    int i;
    void pr_cpu_time(void);

    /* 4terminate all children */
    for (i = 0; i < nchildren; i++)
        kill(cptr[i].child_pid, SIGTERM);
    while (wait(NULL) > 0)  /* wait for all children */
        ;
    if (errno != ECHILD)
        err_sys("wait error");

    pr_cpu_time();

    for (i = 0; i < nchildren; i++)
        printf("child %d, %ld connections\n", i, cptr[i].child_count);

    exit(0);
}

void Dup2(int fd1, int fd2)
{
    if (dup2(fd1, fd2) == -1)
        err_sys("dup2 error");
}

pid_t child_make(int i, int listenfd, int addrlen)
{
    int sockfd[2];
    pid_t pid;
    void child_main(int, int, int);

    Socketpair(AF_LOCAL, SOCK_STREAM, 0, sockfd);

    if ((pid = Fork()) > 0) {
        Close(sockfd[1]);
        cptr[i].child_pid = pid;
        cptr[i].child_pipefd = sockfd[0];
        cptr[i].child_status = 0;
        return (pid);   /* parent */
    }

    Dup2(sockfd[1], STDERR_FILENO); /* child's stream pipe to parent */
    Close(sockfd[0]);
    Close(sockfd[1]);
    Close(listenfd);    /* child does not need this open */
    child_main(i, listenfd, addrlen);   /* never returns */
    return 0;
}

ssize_t read_fd(int fd, void *ptr, size_t nbytes, int *recvfd)
{
    struct msghdr msg;
    struct iovec iov[1];
    ssize_t n;

    union {
        struct cmsghdr cm;
        char control[CMSG_SPACE(sizeof(int))];
    } control_un;
    struct cmsghdr *cmptr;

    msg.msg_control = control_un.control;
    msg.msg_controllen = sizeof(control_un.control);

    msg.msg_name = NULL;
    msg.msg_namelen = 0;

    iov[0].iov_base = ptr;
    iov[0].iov_len = nbytes;
    msg.msg_iov = iov;
    msg.msg_iovlen = 1;

    if ((n = recvmsg(fd, &msg, 0)) <= 0)
        return (n);

    if ((cmptr = CMSG_FIRSTHDR(&msg)) != NULL &&
        cmptr->cmsg_len == CMSG_LEN(sizeof(int))) {
        if (cmptr->cmsg_level != SOL_SOCKET)
            err_quit("control level != SOL_SOCKET");
        if (cmptr->cmsg_type != SCM_RIGHTS)
            err_quit("control type != SCM_RIGHTS");
        *recvfd = *((int *)CMSG_DATA(cmptr));
    } else
        *recvfd = -1;   /* descriptor was not passed */

    return (n);
}

ssize_t Read_fd(int fd, void *ptr, size_t nbytes, int *recvfd)
{
    ssize_t n;

    if ((n = read_fd(fd, ptr, nbytes, recvfd)) < 0)
        err_sys("read_fd error");

    return (n);
}

void Write(int fd, void *ptr, int nbytes)
{
    if (write(fd, ptr, nbytes) != nbytes)
        err_sys("write error");
}

void child_main(int i, int listenfd, int addrlen)
{
    char c;
    int connfd;
    ssize_t n;
    void web_child(int);

    printf("child %ld starting\n", (long)getpid());
    for (;;) {
        if ((n = Read_fd(STDERR_FILENO, &c, 1, &connfd)) == 0)
            err_quit("read_fd returned 0");
        if (connfd < 0)
            err_quit("no descriptor from read_fd");

        web_child(connfd);  /* process request */
        Close(connfd);

        Write(STDERR_FILENO, "", 1);    /* tell parent we're ready again */
    }
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

int Select(int nfds, fd_set * readfds, fd_set * writefds, fd_set * exceptfds,
       struct timeval *timeout)
{
    int n;

    if ((n = select(nfds, readfds, writefds, exceptfds, timeout)) < 0)
        err_sys("select error");
    return (n);     /* can return 0 on timeout */
}

ssize_t write_fd(int fd, void *ptr, size_t nbytes, int sendfd)
{
    struct msghdr msg;
    struct iovec iov[1];

    union {
        struct cmsghdr cm;
        char control[CMSG_SPACE(sizeof(int))];
    } control_un;
    struct cmsghdr *cmptr;

    msg.msg_control = control_un.control;
    msg.msg_controllen = sizeof(control_un.control);

    cmptr = CMSG_FIRSTHDR(&msg);
    cmptr->cmsg_len = CMSG_LEN(sizeof(int));
    cmptr->cmsg_level = SOL_SOCKET;
    cmptr->cmsg_type = SCM_RIGHTS;
    *((int *)CMSG_DATA(cmptr)) = sendfd;

    msg.msg_name = NULL;
    msg.msg_namelen = 0;

    iov[0].iov_base = ptr;
    iov[0].iov_len = nbytes;
    msg.msg_iov = iov;
    msg.msg_iovlen = 1;

    return (sendmsg(fd, &msg, 0));
}

ssize_t Write_fd(int fd, void *ptr, size_t nbytes, int sendfd)
{
    ssize_t n;

    if ((n = write_fd(fd, ptr, nbytes, sendfd)) < 0)
        err_sys("write_fd error");

    return (n);
}

ssize_t Read(int fd, void *ptr, size_t nbytes)
{
    ssize_t n;

    if ((n = read(fd, ptr, nbytes)) == -1)
        err_sys("read error");
    return (n);
}

static int nchildren;

#define max(a,b)    ((a) > (b) ? (a) : (b))
int main(int argc, char **argv)
{
    int listenfd, i, navail, maxfd, nsel, connfd, rc;
    void sig_int(int);
    pid_t child_make(int, int, int);
    ssize_t n;
    fd_set rset, masterset;
    socklen_t addrlen, clilen;
    struct sockaddr *cliaddr;

    if (argc == 3)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 4)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv05 [ <host> ] <port#> <#children>");

    FD_ZERO(&masterset);
    FD_SET(listenfd, &masterset);
    maxfd = listenfd;
    cliaddr = Malloc(addrlen);

    nchildren = atoi(argv[argc - 1]);
    navail = nchildren;
    cptr = Calloc(nchildren, sizeof(Child));

    /* 4prefork all the children */
    for (i = 0; i < nchildren; i++) {
        child_make(i, listenfd, addrlen);   /* parent returns */
        FD_SET(cptr[i].child_pipefd, &masterset);
        maxfd = max(maxfd, cptr[i].child_pipefd);
    }

    Signal(SIGINT, sig_int);

    for (;;) {
        rset = masterset;
        if (navail <= 0)
            FD_CLR(listenfd, &rset);    /* turn off if no available children */
        nsel = Select(maxfd + 1, &rset, NULL, NULL, NULL);

        /* 4check for new connections */
        if (FD_ISSET(listenfd, &rset)) {
            clilen = addrlen;
            connfd = Accept(listenfd, cliaddr, &clilen);

            for (i = 0; i < nchildren; i++)
                if (cptr[i].child_status == 0)
                    break;  /* available */

            if (i == nchildren)
                err_quit("no available children");
            cptr[i].child_status = 1;   /* mark child as busy */
            cptr[i].child_count++;
            navail--;

            n = Write_fd(cptr[i].child_pipefd, "", 1, connfd);
            Close(connfd);
            if (--nsel == 0)
                continue;   /* all done with select() results */
        }

        /* 4find any newly-available children */
        for (i = 0; i < nchildren; i++) {
            if (FD_ISSET(cptr[i].child_pipefd, &rset)) {
                if ((n =
                     Read(cptr[i].child_pipefd, &rc, 1)) == 0)
                    err_quit
                        ("child %d terminated unexpectedly",
                         i);
                cptr[i].child_status = 0;
                navail++;
                if (--nsel == 0)
                    break;  /* all done with select() results */
            }
        }
    }
}
30.10 TCP并发服务器程序，每个客户一个线程
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

void Pthread_detach(pthread_t tid)
{
    int n;

    if ((n = pthread_detach(tid)) == 0)
        return;
    errno = n;
    err_sys("pthread_detach error");
}

void *doit(void *arg)
{
    Pthread_detach(pthread_self());
    web_child((int)arg);
    Close((int)arg);
    return (NULL);
}

void sig_int(int signo)
{
    pr_cpu_time();
    exit(0);
}

void Pthread_create(pthread_t * tid, const pthread_attr_t * attr,
            void *(*func) (void *), void *arg)
{
    int n;

    if ((n = pthread_create(tid, attr, func, arg)) == 0)
        return;
    errno = n;
    err_sys("pthread_create error");
}

int main(int argc, char **argv)
{
    int listenfd, connfd;
    void sig_int(int);
    void *doit(void *);
    pthread_t tid;
    socklen_t clilen, addrlen;
    struct sockaddr *cliaddr;

    if (argc == 2)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 3)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv06 [ <host> ] <port#>");
    cliaddr = Malloc(addrlen);

    Signal(SIGINT, sig_int);

    for (;;) {
        clilen = addrlen;
        connfd = Accept(listenfd, cliaddr, &clilen);

        Pthread_create(&tid, NULL, &doit, (void *)connfd);
    }
}
30.11 TCP预先创建线程服务器程序，每个线程各自accept
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

void Pthread_detach(pthread_t tid)
{
    int n;

    if ((n = pthread_detach(tid)) == 0)
        return;
    errno = n;
    err_sys("pthread_detach error");
}

void Pthread_create(pthread_t * tid, const pthread_attr_t * attr,
            void *(*func) (void *), void *arg)
{
    int n;

    if ((n = pthread_create(tid, attr, func, arg)) == 0)
        return;
    errno = n;
    err_sys("pthread_create error");
}

typedef struct {
    pthread_t thread_tid;   /* thread ID */
    long thread_count;  /* # connections handled */
} Thread;
Thread *tptr;           /* array of Thread structures; calloc'ed */

int listenfd, nthreads;
socklen_t addrlen;
pthread_mutex_t mlock;

void sig_int(int signo)
{
    int i;
    void pr_cpu_time(void);

    pr_cpu_time();

    for (i = 0; i < nthreads; i++)
        printf("thread %d, %ld connections\n", i, tptr[i].thread_count);

    exit(0);
}

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

void thread_make(int i)
{
    void *thread_main(void *);

    Pthread_create(&tptr[i].thread_tid, NULL, &thread_main, (void *)i);
    return;         /* main thread returns */
}

void Pthread_mutex_lock(pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_mutex_lock(mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_lock error");
}

void Pthread_mutex_unlock(pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_mutex_unlock(mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_unlock error");
}

void *thread_main(void *arg)
{
    int connfd;
    socklen_t clilen;
    struct sockaddr *cliaddr;

    cliaddr = Malloc(addrlen);

    printf("thread %d starting\n", (int)arg);
    for (;;) {
        clilen = addrlen;
        Pthread_mutex_lock(&mlock);
        connfd = Accept(listenfd, cliaddr, &clilen);
        Pthread_mutex_unlock(&mlock);
        tptr[(int)arg].thread_count++;

        web_child(connfd);  /* process request */
        Close(connfd);
    }
}

pthread_mutex_t mlock = PTHREAD_MUTEX_INITIALIZER;

int main(int argc, char **argv)
{
    int i;

    if (argc == 3)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 4)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv07 [ <host> ] <port#> <#threads>");
    nthreads = atoi(argv[argc - 1]);
    tptr = Calloc(nthreads, sizeof(Thread));

    for (i = 0; i < nthreads; i++)
        thread_make(i); /* only main thread returns */

    Signal(SIGINT, sig_int);

    for (;;)
        pause();    /* everything done by threads */
}
30.12 TCP预先创建线程服务器程序，主线程统一accept
#define _GNU_SOURCE
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

void pr_cpu_time(void)
{
    double user, sys;
    struct rusage myusage, childusage;

    if (getrusage(RUSAGE_SELF, &myusage) < 0)
        err_sys("getrusage error");
    if (getrusage(RUSAGE_CHILDREN, &childusage) < 0)
        err_sys("getrusage error");

    user = (double)myusage.ru_utime.tv_sec +
        myusage.ru_utime.tv_usec / 1000000.0;
    user += (double)childusage.ru_utime.tv_sec +
        childusage.ru_utime.tv_usec / 1000000.0;
    sys = (double)myusage.ru_stime.tv_sec +
        myusage.ru_stime.tv_usec / 1000000.0;
    sys += (double)childusage.ru_stime.tv_sec +
        childusage.ru_stime.tv_usec / 1000000.0;

    printf("\nuser time = %g, sys time = %g\n", user, sys);
}

void Setsockopt(int fd, int level, int optname, const void *optval,
        socklen_t optlen)
{
    if (setsockopt(fd, level, optname, optval, optlen) < 0)
        err_sys("setsockopt error");
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

void *Malloc(size_t size)
{
    void *ptr;

    if ((ptr = malloc(size)) == NULL)
        err_sys("malloc error");
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

    ptr = vptr;
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

ssize_t             /* Write "n" bytes to a descriptor. */
writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwritten;
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
        err_sys("writen error");
}

void web_child(int sockfd)
{
    int ntowrite;
    ssize_t nread;
    char line[MAXLINE], result[MAXN];

    for (;;) {
        if ((nread = Readline(sockfd, line, MAXLINE)) == 0)
            return; /* connection closed by other end */

        /* 4line from client specifies #bytes to write back */
        ntowrite = atol(line);
        if ((ntowrite <= 0) || (ntowrite > MAXN))
            err_quit("client request for %d bytes", ntowrite);

        Writen(sockfd, result, ntowrite);
    }
}

void Pthread_detach(pthread_t tid)
{
    int n;

    if ((n = pthread_detach(tid)) == 0)
        return;
    errno = n;
    err_sys("pthread_detach error");
}

void Pthread_create(pthread_t * tid, const pthread_attr_t * attr,
            void *(*func) (void *), void *arg)
{
    int n;

    if ((n = pthread_create(tid, attr, func, arg)) == 0)
        return;
    errno = n;
    err_sys("pthread_create error");
}

typedef struct {
    pthread_t thread_tid;   /* thread ID */
    long thread_count;  /* # connections handled */
} Thread;
Thread *tptr;           /* array of Thread structures; calloc'ed */

#define MAXNCLI 32
int clifd[MAXNCLI], iget, iput;
pthread_mutex_t clifd_mutex;
pthread_cond_t clifd_cond;

void *Calloc(size_t n, size_t size)
{
    void *ptr;

    if ((ptr = calloc(n, size)) == NULL)
        err_sys("calloc error");
    return (ptr);
}

void Pthread_mutex_lock(pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_mutex_lock(mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_lock error");
}

void Pthread_mutex_unlock(pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_mutex_unlock(mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_mutex_unlock error");
}

void Pthread_cond_wait(pthread_cond_t * cptr, pthread_mutex_t * mptr)
{
    int n;

    if ((n = pthread_cond_wait(cptr, mptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_cond_wait error");
}

void *thread_main(void *arg)
{
    int connfd;

    printf("thread %d starting\n", (int)arg);
    for (;;) {
        Pthread_mutex_lock(&clifd_mutex);
        while (iget == iput)
            Pthread_cond_wait(&clifd_cond, &clifd_mutex);
        connfd = clifd[iget];   /* connected socket to service */
        if (++iget == MAXNCLI)
            iget = 0;
        Pthread_mutex_unlock(&clifd_mutex);
        tptr[(int)arg].thread_count++;

        web_child(connfd);  /* process request */
        Close(connfd);
    }
}

void thread_make(int i)
{
    Pthread_create(&tptr[i].thread_tid, NULL, &thread_main, (void *)i);
    return;         /* main thread returns */
}

pthread_mutex_t mlock = PTHREAD_MUTEX_INITIALIZER;

static int nthreads;
pthread_mutex_t clifd_mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t clifd_cond = PTHREAD_COND_INITIALIZER;

void sig_int(int signo)
{
    int i;

    pr_cpu_time();

    for (i = 0; i < nthreads; i++)
        printf("thread %d, %ld connections\n", i, tptr[i].thread_count);

    exit(0);
}

void Pthread_cond_signal(pthread_cond_t * cptr)
{
    int n;

    if ((n = pthread_cond_signal(cptr)) == 0)
        return;
    errno = n;
    err_sys("pthread_cond_signal error");
}

int main(int argc, char **argv)
{
    int i, listenfd, connfd;
    socklen_t addrlen, clilen;
    struct sockaddr *cliaddr;

    if (argc == 3)
        listenfd = Tcp_listen(NULL, argv[1], &addrlen);
    else if (argc == 4)
        listenfd = Tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: serv08 [ <host> ] <port#> <#threads>");
    cliaddr = Malloc(addrlen);

    nthreads = atoi(argv[argc - 1]);
    tptr = Calloc(nthreads, sizeof(Thread));
    iget = iput = 0;

    /* 4create all the threads */
    for (i = 0; i < nthreads; i++)
        thread_make(i); /* only main thread returns */

    Signal(SIGINT, sig_int);

    for (;;) {
        clilen = addrlen;
        connfd = Accept(listenfd, cliaddr, &clilen);

        Pthread_mutex_lock(&clifd_mutex);
        clifd[iput] = connfd;
        if (++iput == MAXNCLI)
            iput = 0;
        if (iput == iget)
            err_quit("iput = iget = %d", iput);
        Pthread_cond_signal(&clifd_cond);
        Pthread_mutex_unlock(&clifd_mutex);
    }
}

```