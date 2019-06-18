ALL:
	git checkout localsource
	cp -rf ~/git/blog/source/_posts/* ./Hexo_bakup/source/_posts 
	git add .
	git commit -m  "update"
	git push -f origin localsource
	echo add remote OK!
