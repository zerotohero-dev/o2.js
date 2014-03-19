#!/bin/sh

#
# o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
#
# This program is distributed under the terms of the MIT license.
# Please see the LICENSE.md file for details.
#

# Install dependant npm modules.

cd src/o2/ajax;
npm install;

cd ../../o2/timer;
npm install;

cd ../../o2/object;
npm install;

cd ../../o2/then
npm install;
