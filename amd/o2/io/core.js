define(function (require, exports, module) {var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1); 'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var path = require('path');

exports.require = function(baseDir, appDir) {
    return function(name) {
        return require(path.join(
            __dirname, name[0] === '/' ? baseDir || '.' : appDir || '.'
        ));
    };
};

});
