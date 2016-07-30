ALL:
	git checkout localsource
	git add *
	git commit -m `date "+%d_%B_%Y"` 
	git push -f origin localsource
	echo add remote OK!

