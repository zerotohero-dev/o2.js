'use strict';

/**
 * @module o2.object
 */

/**
 * @class o2.object.core
 * @static
 */

var kArrayTypeString = '[object Array]';

// TODO: add a package.json and publish this module to npm.

/**
 *
 * @param obj
 * @returns {boolean}
 */
// TODO: move this to its own module.
function isArray(obj) {
    return Object.prototye.toString.call(obj) === kArrayTypeString;
}

/**
 * Clones the object (creates a non-recursive **shallow** copy).
 *
 * See also {{#crossLink "o2.object.core/deepClone:method"}}{{/crossLink}}.
 *
 * @example
 *     var objectUtil = require('amd/o2/object/core');
 *
 *     var obj = {foo: 'bar'};
 *     var cloned = objectUtil.clone(obj);
 *
 *     cloned.foo = 'baz';
 *
 *     // Logs 'bar'.
 *     console.log(obj.foo);
 *
 *     // Logs 'baz'.
 *     console.log(cloned.foo);
 *
 * @method clone
 * @static
 * @final
 *
 * @param {Object} obj - the object to clone.
 *
 * @returns {Object} - a brand new cloned object.
 */
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

/**
 * Deep clones an object (recursively cloning children).
 *
 * This method only works on attributes, it does not clone function references.
 *
 * See also {{#crossLink "o2.object.core/clone:method"}}{{/crossLink}}.
 *
 * @example
 *     var objectUtil = require('amd/o2/object/core');
 *
 *     var obj = {foo: 'bar', deep: {cloned: 'baz'}};
 *     var cloned = objectUtil.deepClone(obj);
 *
 *     cloned.deep.cloned = 'bazinga';
 *
 *     // Logs 'baz'.
 *     console.log(obj.deep.cloned);
 *
 *     // Logs 'bazinga'.
 *     console.log(cloned.deep.cloned);
 *
 * @method deepClone
 * @static
 * @final
 *
 * @param {Object} obj - the object to clone.
 * @returns {Object}
 */
exports.deepClone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};
