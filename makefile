wedvefv:
	hexo generate
	hexo deploy
	cd ./.deploy_git/
	git checkout localsource
	cp ../source/* ./ -rf
	cp ../makefile ./ -rf
	git add .
	git commit -m "bakup文章和hexo的makefile脚本,以备本地hexo重新生成博客使用"
	git push -f origin localsource
	echo "hi boy is ok"
	echo "hi boy is ok"
	echo "hi boy is ok"
	echo "hi boy is ok"
