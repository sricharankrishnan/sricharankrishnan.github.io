# run with python3.7

import os

f = open('./allapps.lst','r')
for l in f.readlines():
	app = l.strip()
	print ("\n\nGrunting: ",app)
	print ("<==============================>")
	os.system('grunt --target=%s --force -v' % app)
