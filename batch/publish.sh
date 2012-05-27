#
# o2.js publish script.
# Rebuilds documentation and publishes o2.js documentation
# and examples to /var/www.
#
# +------------------------------------------+
# | This program is distributed under        |
# | the terms of the MIT license.            |
# | Please see the LICENSE file for details. |
# +------------------------------------------+
#
# lastModified: 2012-05-27 11:24:12.738049
#
php update_build_number.php
ant -f o2.xml

#rm -rf /var/www/html/o2.js
rm -rf /Applications/MAMP/htdocs/o2.js

#TOOD: put this in a commonly-editabl configuration file.
#rsync -rv --exclude=.git ../ /var/www/o2.js/
rsync -r --exclude=.git ../ /Applications/MAMP/htdocs/o2.js/

# ALl done:
echo 'All Done!'