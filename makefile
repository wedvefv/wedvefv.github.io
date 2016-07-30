file=`date "+%d_%B_%Y"`
ALL:
	git checkout localsource
	git add *
	git commit -m  ${file}
	git push -f origin localsource
	echo add remote OK!

