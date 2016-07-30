ALL:
	git checkout localsource
	git add *
	git commit -m  "${date}"
	git push -f origin localsource
	echo add remote OK!

