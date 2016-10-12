ALL:
	git checkout localsource
	git add .
	git commit -m  "update"
	git push -f origin localsource
	echo add remote OK!

