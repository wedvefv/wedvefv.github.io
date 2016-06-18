wedvefv:
	hexo generate
	hexo deploy
	cd ./.deploy_git/
	git checkout localsource
	cp ../source/* ./ -rf
	cp ../makefile ./ -rf
	git add .
	git commit -m " bakup"
	git push -f origin localsource
	echo "hi boy is ok"
	echo "hi boy is ok"
	echo "hi boy is ok"
	echo "hi boy is ok"
