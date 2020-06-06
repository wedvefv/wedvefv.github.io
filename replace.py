#encoding=utf8

import os,re
from sys import argv
x = argv[1]

if x:
    fnew = open(x+".old", 'w')
    with open(x,'rw') as f:
        s = f.read()
        p = re.compile(r'date="(.*?)"', re.I)
        m = p.search(s)
        print m.group(1)
        s1 = re.sub(m.group(1), m.group(1)+'+0800', s)
        #print s1
        f.close()
        fnew.write(s1)

    fnew.close()
