#!/usr/bin/python   
#coding:utf-8  
import sys  
def delete(filepath):  
        f=open(filepath,'a+')  
        fnew=open(filepath+'_new.txt','wb')            #将结果存入新的文本中  
        for line in f.readlines():                                  #对每一行先删除空格，\n等无用的字符，再检查此行是否长度为0  
            data=line.strip()  
            if len(data)!=0:  
                fnew.write(data)  
                fnew.write('\n')  
        f.close()  
        fnew.close()  
      
      
if __name__=='__main__':  
        if len(sys.argv)==1:  
            print u"必须输入文件路径，最好不要使用中文路径"  
        else:  
            delete(sys.argv[1])  
