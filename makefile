ALL:
	git checkout localsource
	cp -rf ~/git/blog/content/* ~/git/wedvefv.github.io/Hexo_bakup/
	git add .
	git commit -m  "update"
	git push -f origin localsource
	echo add remote OK!
