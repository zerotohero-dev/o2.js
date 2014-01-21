#!/bin/sh

#
# o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
#
# This program is distributed under the terms of the MIT license.
# Please see the LICENSE.md file for details.
#

cd examples/timer;
r.js -o name=timer baseUrl=. paths.requireLib=../../bower_components/requirejs/require include=requireLib out=timer-min.js;
