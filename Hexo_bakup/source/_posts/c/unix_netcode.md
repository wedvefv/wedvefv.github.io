---
layout: post
title: unix获取时间的小程序
category: c 
date: 2017-1-7 15:30:30

---

```cpp
//一个简单的时间获取客户程序
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
void  err_doit(int errnoflag, const char *fmt, va_list ap)
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
```

