
 根本解决：由于没有远程桌面授权服务器可以提供许可证，远程会话被中断。 (2015-11-19 21:52:48)
	转载
	▼
	标签： server2012 远程桌面 授权服务器 许可证 远程会话被中断		
	Windows server 2012服务器远程桌面登录时出现错误提示：“由于没有远程桌面授权服务器可以提供许可证，远程会话被中断。请跟服务器管理员联系。”此时可以使用“mstsc /admin /v:目标ip”来强制登录服务器，但只能是管理员身份。
	根本解决：由于没有远程桌面授权服务器可以提供许可证，远程会话被中断。
	按照网上说的某种方法，删除注册表以下项：HKEY_LOCAL_MACHINE\Software\Microsoft\MSLicensing。
	并不能解决问题，之后出现了新的错误提示，如第二个图：“远程会话已断开连接，因为访问被拒绝导致许可证存储的创建失败。请使用提升的权限运行远程桌面客户端。”
	根本解决：由于没有远程桌面授权服务器可以提供许可证，远程会话被中断。
	微软官方的解释是（来源此链接http://blog.163.com/smile_big/blog/static/35710579201311982024/）：

	微软官方的解释：

	原因：

	因为 Windows 应用商店的应用程序不具有足够的权限来访问的MSLicensing注册表项或子项存储区，则会出现此问题。因此，当应用程序连接到远程服务器时，远程桌面 ActiveX 接口在进程内 COM 对象无法访问注册表，并停止连接过程。

	解决方案：

	警告：如果使用注册表编辑器或其他方法错误地修改了注册表，可能会出现的严重问题。这些问题可能要求您重新安装操作系统。Microsoft 不能保证这些问题能够得到解决。修改注册表的风险由您自己承担。
	百度基本找不到可行方案，google得到最终的解决办法：
	The solution was to delete the REG_BINARY in
	HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\RCM\GracePeriod
	Only leaving the default.
	And reboot.
	来源于http://anilgprabhu.blogspot.com/2014/05/reset-trial-terminal-license-on-windows.html

	根本原因在于，server 2012 或server 2008等默认的最大远程登录链接为2个，超过这个数目需要使用license server进行授权，这个授权据说是收费的，但官方给予了120天的Grace period来配置license server。如果超过120天后仍然没有可用的license server，就会出现第一种错误。而这个Grace period信息记录在上文的注册表中，因此只要删除注册表中的项（需要修改此注册表项权限所有者为Administrators，给Administrators增加修改权限），重启服务器就可以了。还有人提到可以修改系统时间为将来，然后删除注册表，再把系统时间改回来，这样可以获得更长的Grace period。此方法适用于server2012，应该也适用于2008，但2003没有测试过。
	参考微软官方文档的解释便一目了然：
	https://technet.microsoft.com/en-us/library/cc725933.aspx
	当然，除了修改注册表的投机取巧的办法，也可以部署license server（server 2008）或部署license server及remote desktop gateway（server2012），2012相比2008有比较大的变动，配置起来也更麻烦，感兴趣的可以参考如下链接：
	http://www.wackytechtips.com/installing-and-configuring-remote-desktop-services-rds-on-windows-server-2012/3/

