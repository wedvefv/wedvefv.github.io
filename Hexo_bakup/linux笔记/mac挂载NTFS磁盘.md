+++
title="mac挂载NTFS磁盘"
categories=["linux"] 
tags=["linux"] 
keywords=["mac","ntfs"]
date="2019-07-13 10:15:00+0800"
+++

### 查看移动硬盘的信息
diskutil list

```sh
/dev/disk0 (internal):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                         121.3 GB   disk0
   1:                        EFI EFI                     314.6 MB   disk0s1
   2:                 Apple_APFS Container disk1         121.0 GB   disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +121.0 GB   disk1
                                 Physical Store disk0s2
   1:                APFS Volume Macintosh HD            97.9 GB    disk1s1
   2:                APFS Volume Preboot                 44.2 MB    disk1s2
   3:                APFS Volume Recovery                509.7 MB   disk1s3
   4:                APFS Volume VM                      1.1 GB     disk1s4

/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *500.1 GB   disk2
   1:               Windows_NTFS C_224                   224.4 GB   disk2s5
   2:               Windows_NTFS D_138                   138.5 GB   disk2s6
   3:               Windows_NTFS E_137                   137.2 GB   disk2s7
   
```

* 磁盘 /dev/disk2 就是移动硬盘
* 比如C盘 C_224(我自己起的盘符名字) ，识别码是 disk2s5
* 查看disk2s5的UUID
* diskutil info /dev/disk2s5 |grep UUID

* 查看disk2s6的UUID
* diskutil info /dev/disk2s6 |grep UUID

* 查看disk2s7的UUID
* diskutil info /dev/disk2s7 |grep UUID


###  修改挂在磁盘配置文件
*  最新版的macos好像没有这个文件了，不过没关系，直接新建。
* vim /etc/fstab

```sh
UUID=EC5F1224-7440-43D9-A1F6-9F2D593B5527 none ntfs rw,auto,nobrowse
UUID=48FC5B76-7BF2-4BDA-8790-7B53A880E700 none ntfs rw,auto,nobrowse
UUID=8E745E6C-F4ED-48B6-882C-5F4DA5D3AC92 none ntfs rw,auto,nobrowse

```

* auto: 系统自动挂载，fstab默认就是这个选项
* ntfs: 磁盘格式
* rw: 按可读可写权限挂载
* user: 任何用户都可以挂载
* nobrowse 表示在finder不显示磁盘，不然会不成功

### 重启电脑

### 建立快捷方式，显示磁盘

```sh
sudo ln -s /Volumes/C_224 ~/Desktop/C_224
sudo ln -s /Volumes/D_138 ~/Desktop/D_138
sudo ln -s /Volumes/E_137 ~/Desktop/E_137
```

