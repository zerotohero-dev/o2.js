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
# lastModified: 2012-01-28 17:02:12.875005
#
php update_build_number.php
ant -f o2.xml
rm -rf /var/www/o2.js
rsync -rv --exclude=.git ../ /var/www/o2.js/
