# windows时间的处理：
## 系统时间：
 UTC时间（格林威治时间）,世界标准时间，北京时间是UTC+8
## 本地时间：
 UTC时间+时区偏差，就是计算机右下角显示的时间
## 文件时间：类型有三种
 1.创建时间
 
 2.访问时间
 
 3.修改时间
 
文件时间是：
 
 64位的值记录了自1601年1月1日0点以来的以100纳秒（ns）为单位的格林威治时间间隔，我们鼠标右键查看文件属性，看到的是这个间隔加上时区差的，并且显示格式的SYSTEM结构体形式(年月日的形式)，不是FILETIME结构体形式（两个DWORD成员）。所以看起来跟本地时间差别不大。
#  基本概念
先来看看这两个结构体的定义：

### FILETIME结构体:
```cpp
typedef struct _FILETIME {
    DWORDdwLowDateTime;
    DWORDdwHighDateTime;
} FILETIME, *PFILETIME, *LPFILETIME;
```
它在MSDN上的说明——Contains a 64-bit value representing the number of 100-nanosecond intervals since January 1, 1601 (UTC时间).

### SYSTEMTIME结构体：
```cpp
typedef struct _SYSTEMTIME {

    WORDwYear;

    WORDwMonth;

    WORDwDayOfWeek;

    WORDwDay;

    WORDwHour;

    WORDwMinute;

    WORDwSecond;

    WORDwMilliseconds;

} SYSTEMTIME, *PSYSTEMTIME, *LPSYSTEMTIME;
```

### 代码示例

 ```cpp
 #include "stdafx.h"
#include <windows.h>  
#include <stdio.h>  
//#include <conio.h>  

class CLocaltimeAndFiletime  
{  
public:  
    static void GetCurrentLocalTime(char *pstrDate, char *pstrTime);  
    static void FileTimeToLocalTime(FILETIME &ft, char *pstrDate, char *pstrTime);  
};  

//取得：本地时间 = UTC+8（北京的）  //UTC是系统时间
void CLocaltimeAndFiletime::GetCurrentLocalTime(char *pstrDate, char *pstrTime)  
{  
    SYSTEMTIME st;  
    GetLocalTime(&st);  //取得本地时间
	//getsystemtime(&st) //依据所在时区，和本地时间，推算出UTC时间=本地-8小时
    if (pstrDate != NULL)  
        sprintf(pstrDate, "%d-%d-%d", st.wYear, st.wMonth, st.wDay);  
    if (pstrTime != NULL)  
        sprintf(pstrTime, "%02d:%02d:%02d", st.wHour, st.wMinute, st.wSecond);  
}  

//把一个64e位的文件时间（三种类型，创建/访问/修改），转换成SYSTEEMTIME结构类型
void CLocaltimeAndFiletime::FileTimeToLocalTime(FILETIME &ft, char *pstrDate, char *pstrTime)  
{  
    FILETIME localft;  //文件时间是1601年--目前的UTC时间的差（64位整数），转换成UTC+本地时区的64位值，
    FileTimeToLocalFileTime(&ft, &localft);  
    SYSTEMTIME st;  
    FileTimeToSystemTime(&localft, &st);  //转换成年月日形式
	
    if (pstrDate != NULL)  
        sprintf(pstrDate, "%d-%d-%d", st.wYear, st.wMonth, st.wDay);  
    if (pstrTime != NULL)  
        sprintf(pstrTime, "%02d:%02d:%02d", st.wHour, st.wMinute, st.wSecond);  
}  


int main(int argc, char *argv[])  
{  
    printf("windows(FILETIME和SYSTEMTIME) \n");          
    
    const int MAX_LEN = 30;  
    char strDate[MAX_LEN], strTime[MAX_LEN];  
    CLocaltimeAndFiletime::GetCurrentLocalTime(strDate, strTime);  
    printf("current: %s %s\n", strDate, strTime);  
	
    const char* pstrFileName = "C:\\1.html";  
    printf("文件名：%s\n", pstrFileName);  
    //打开一个文件取得句柄，利用这个句柄取得文件的时间属性（创建，访问，修改）
    HANDLE handleFile = CreateFile(pstrFileName, GENERIC_READ,   
        FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);  
    FILETIME ftCreationTime, ftLastAccessTime, ftLastWriteTime;  
    //取得时间属性
    GetFileTime(handleFile, &ftCreationTime, &ftLastAccessTime, &ftLastWriteTime);  
    //转换创建时间
    CLocaltimeAndFiletime::FileTimeToLocalTime(ftCreationTime, strDate, strTime);  
    printf("create: %s %s\n", strDate, strTime);  
    //转换最后一次访问时间
    CLocaltimeAndFiletime::FileTimeToLocalTime(ftLastAccessTime, strDate, strTime);  
    printf("access: %s %s\n", strDate, strTime);
    //转换修改时间
    CLocaltimeAndFiletime::FileTimeToLocalTime(ftLastWriteTime, strDate, strTime);  
    printf("modify: %s %s\n", strDate, strTime);  
    //getch();  
    return 0;  
}  
 ```
