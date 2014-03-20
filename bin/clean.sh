#!/bin/sh

#
# o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
#
# This program is distributed under the terms of the MIT license.
# Please see the LICENSE.md file for details.
#

# TODO: do this with node.js (use an o2.js module for that) so that it can be platform-independent. This is also true fo other shell scripts.

# Remove all AMD files.

find amd/o2/ajax/ -maxdepth 1 -type f -delete;
find amd/o2/debug/ -maxdepth 1 -type f -delete;
find amd/o2/io/ -maxdepth 1 -type f -delete;
find amd/o2/string/ -maxdepth 1 -type f -delete;
find amd/o2/timer/ -maxdepth 1 -type f -delete;
find amd/o2/object/ -maxdepth 1 -type f -delete;
find amd/o2/validate/ -maxdepth 1 -type f -delete;

# Remove all helper node_modules in /src/ and their corresponding AMD files.

find src/o2/ajax/node_modules/o2.string -maxdepth 1 -type f -delete;
find amd/o2/ajax/node_modules/o2.string -maxdepth 1 -type f -delete;

find src/o2/timer/node_modules/o2.debug -maxdepth 1 -type f -delete;
find amd/o2/timer/node_modules/o2.debug -maxdepth 1 -type f -delete;

find src/o2/timer/node_modules/o2.object -maxdepth 1 -type f -delete;
find amd/o2/timer/node_modules/o2.object -maxdepth 1 -type f -delete;

find src/o2/timer/node_modules/o2.object/node_modules/o2.validate -maxdepth 1 -type f -delete;
find amd/o2/timer/node_modules/o2.object/node_modules/o2.validate -maxdepth 1 -type f -delete;

find src/o2/object/node_modules/o2.validate -maxdepth 1 -type f -delete;
find amd/o2/object/node_modules/o2.validate -maxdepth 1 -type f -delete;
