ALL:
	git checkout localsource
	git add -A
	git commit -m  "update"
	git push -f origin localsource
	echo add remote OK!

