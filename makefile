FILE = 'date +%y_%m_%d_'
ALL:
	echo ${FILE}
	git checkout localsource
	git add *
	git commit -m  ${FILE}
	git push -f origin localsource
	git OK!

