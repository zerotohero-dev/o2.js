define(function (require, exports, module) {'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var validate = require('../validation/core'),

    isArray,

    kUndefined = 'undefined';

if (!validate) {
    throw new Error('Please run `npm install o2.validate` first.');
}

isArray = validate.isArray;

exports.clone = function(obj) {
    var clone = isArray(obj) ? [] : {},
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = obj[key];
        }
    }

    return clone;
};

exports.deepClone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

exports.extend = function(obj, extension) {
    if (typeof obj === kUndefined) {return obj;}

    var key;

    for (key in extension) {
        if (extension.hasOwnProperty(key)) {
            obj[key] = extension[key];
        }
    }

    return obj;
};

});
