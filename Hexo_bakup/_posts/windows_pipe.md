---
layout: post
title: windows 管道通信
date: 2017-1-8 14:11:00
category: windows 

---

#windows 管道通信

思路如下：
server端：
1 建立一个可读可写的管道
2 将cmd /c+命令建立的执行进程的输出（stdOutput）和错误(stdError)
与管道写端关联。就是把cmd执行命令的结果写进管道。
3 recv client端发来的命令比如： "dir"
4 组合成字符串"c:/windows/system32/cmd.exe /cdir"
5 利用字符串建立进程，就是执行的意思
6 sleep(1000) 停止一秒，让进程完全执行完输出结果
否则可能进程没执行完毕，就向下执行了，导致管道中
只有部分cmd命令执行的结果。
7 while循环ReadFile读取管道中的数据
8 send发送数据给client端，显示

client端： 
这个很简单，建立一个阻塞的socket ，循环发送你想法的
命令，到server端执行就可以了。

server端代码：
```c
//server.cpp  
#include "stdafx.h"
#include <stdio.h>
#include <winsock2.h>
#pragma comment(lib, "ws2_32.lib")

int main(int argc, char* argv[])
{

    SOCKET sClient;
    BYTE minorVer = 2; 
    BYTE majorVer = 2;
    WSADATA wsaData;
    WORD sockVersion = MAKEWORD(minorVer, majorVer);
    if(WSAStartup(sockVersion, &wsaData) != 0)
        return 0;
    SOCKET sListen = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if(sListen == INVALID_SOCKET)
    {
        printf("socket error \n");
        return 0;
    }
    sockaddr_in sin;
    sin.sin_family = AF_INET;
    sin.sin_port = htons(4500);
    sin.sin_addr.S_un.S_addr = INADDR_ANY;  
    if(bind(sListen, (LPSOCKADDR)&sin, sizeof(sin)) == SOCKET_ERROR)
    {
        printf("bind error \n");
        return 0;
    }
    if(listen(sListen, 5) == SOCKET_ERROR)
    {
        printf("listen error \n");
        return 0;
    }

    sClient  =accept(sListen,NULL,NULL);

//  send(sClient,wMessage,strlen(wMessage),0);
    char rBuffer[4096] = {0};
    char totalbuffer[4096] ={0};
    char cmdline[256]={0};

    while(true)
    {

        memset(cmdline,0,256);
        SECURITY_ATTRIBUTES sa;
        HANDLE hRead,hWrite;
        sa.nLength = sizeof(SECURITY_ATTRIBUTES);
        sa.lpSecurityDescriptor = NULL;
        sa.bInheritHandle = TRUE;
        if (!CreatePipe(&hRead,&hWrite,&sa,0)) 
        {
            printf("CreatePipe Error");
            return 0;
        }   
        STARTUPINFO si;
        PROCESS_INFORMATION pi; 
        si.cb = sizeof(STARTUPINFO);
        GetStartupInfo(&si); 

        si.hStdError = hWrite;
        si.hStdOutput = hWrite;
        si.wShowWindow = SW_HIDE;
        si.dwFlags = STARTF_USESHOWWINDOW | STARTF_USESTDHANDLES;
        
        GetSystemDirectory(cmdline,sizeof(cmdline));
        strcat(cmdline,"\\cmd.exe /c");
        char cmdbuff[256];
        ZeroMemory(cmdbuff,sizeof(cmdbuff));    
    
        recv(sClient,cmdbuff,256,NULL);
        strncat(cmdline,cmdbuff,strlen(cmdbuff));
        if (!CreateProcess(NULL,cmdline,NULL,NULL,TRUE,NULL,NULL,NULL,&si,&pi))     
        {
            printf("CreateProcess Error");
            continue;
        }
            ZeroMemory(cmdbuff,sizeof(cmdbuff));
    
        CloseHandle(hWrite);
        DWORD dwRead;
        Sleep(1000);
     while(ReadFile(hRead,rBuffer,4096,&dwRead,NULL))
        {  
            char a[4] ={0};
            sprintf(a,"%d",dwRead); //把数字转换成字符串放入数组
            lstrcpy(totalbuffer,a); // 把总字节数写入数据最前面
            lstrcat(totalbuffer,"#");//在加一个#符表示数字部分结束
            lstrcat(totalbuffer,rBuffer);//缀数据部分
            printf("%d",dwRead);
            send(sClient,totalbuffer,dwRead+5,0); //发送
            printf("%s",totalbuffer);   
            memset(rBuffer,0,4096);  // 这是个死循环，一直读取管道中数据，所有要清零缓存
            memset(totalbuffer,0,4096);
        
        }       
    
    
    }

    return 0;
}

```


client端代码：
```c
#include <stdio.h>
#include "stdafx.h"
#include <Winsock2.h>


#pragma comment(lib,"ws2_32.lib")
int main(int argc, char* argv[])
{
    
    BYTE minorVer = 2; 
    BYTE majorVer = 2;
    char recvBuf[4096]={0};
    char buffer[4096]={0};
    char temp[10]={0};
    int len = 0;
    int total = 0;
    int t =0;
    WSADATA wsaData;
    WORD sockVersion = MAKEWORD(minorVer, majorVer);
    if(WSAStartup(sockVersion, &wsaData) != 0)
        return 0;
    //创建套接字
    SOCKET sockClient = socket( AF_INET,SOCK_STREAM, 0 );
    SOCKADDR_IN addrSrv;
    addrSrv.sin_addr.S_un.S_addr = inet_addr("172.28.125.137"); //存server端ip ，
    addrSrv.sin_family = AF_INET;
    addrSrv.sin_port = htons(4500);
    char x[15]={0}; //存放命令比如： cd ， dir ，ls ，pwd 
    //向服务器发出连接请求
    connect( sockClient, (SOCKADDR*)&addrSrv, sizeof(SOCKADDR)); // 连接
    while(1){
        ZeroMemory(recvBuf,sizeof(recvBuf));   // 清零缓存
        if(0!=scanf("%s",x)){   // 等待输入命令
          send(sockClient,x,lstrlen(x), 0 );
                total=recv( sockClient, buffer, 4096, 0 ); //接收一次，可能收不完哦
                lstrcat(recvBuf,buffer); // 存到总buffer里面
                memcpy(temp,buffer,strstr(buffer,"#")-buffer);// 从buffer里面取出来数字部分，就是#前的字符串
                t = atoi(temp); // 转成数字
                printf("%d",t);
                while(total<t){ //如果第一次收到的小于这个数字，继续接收，存到临时buffer
                    ZeroMemory(buffer,sizeof(buffer));
                    len=recv( sockClient, buffer, 4096, 0 );
                    total=len+total; // 取到的长度加上第一次的长度
                    lstrcat(recvBuf,buffer);// 这次取得放到总的recvBuf里面
                }
            //  printf("%d\n",atoi(recvBuf));
          printf("%s\n",recvBuf);
          printf("%d\n",strlen(recvBuf));
          total =0; // 以下清零是为了下次while循环准备，
          len = 0;
          t =0;
          ZeroMemory(temp,sizeof(temp));
          ZeroMemory(buffer,sizeof(buffer));
         ZeroMemory(recvBuf,sizeof(recvBuf));
        }   //接受数据

 }

    closesocket(sockClient);
    WSACleanup();
    return 0;
}

```

注意：ReadFile是异步或同步模式 ，ReadFileEx只有异步模式
