t=$(shell date +"%Y-%M-%d_%H-%M-%S")
ALL:
	hexo generate
	# 发布blog
	cp -rf public/* ../wedvefv.github.io/

	# 提交blog代码到github 
	cd /Users/kunming/git/wedvefv.github.io/ && git add -A && git commit -m "hello" && git push

	# 备份hexo目录到虚拟机git服务器
	cd /Users/kunming/git/blog
	hexo clean	
	git add -A 
	git commit -m 'page add'
	#echo $(t)
	git tag -a '$(t)' -m "new blog"
	git push origin master
s:
	hexo server
n:
	hexo new ${post}
clean:
	hexo clean
	
