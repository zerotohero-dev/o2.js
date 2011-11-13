php update_build_number.php
rm -rf /var/www/o2.js
cp -rvf ../ /var/www/o2.js/
ant -f o2.xml
