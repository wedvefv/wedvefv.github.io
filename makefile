ALL:
	git checkout localsource
	cp -rf ../blog/source/_posts/* ./Hexo_bakup/_posts/ 
	git add -A
	git commit -m  "update"
	git push -f origin localsource
	echo add remote OK!

