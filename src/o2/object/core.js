'use strict';

/**
 * @module o2.object
 * @requires o2.validate
 */

/**
 * @class o2.object.core
 * @static
 */

var isArray = require('./node_modules/o2.validate/core').isArray,

    kObject = 'object';


/**
 *
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
    return typeof obj === kObject;
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

/**
 * Extends a base object, with the attributes of an extension object.
 *
 * This does not clone the object **obj**; it modifies it **by ref**.
 *
 * @method extend
 * @static
 * @final
 *
 * @example
 *     var base = {lorem: 'dolor'};
 *     var extension = {ipsum: 'amet'};
 *     var extend = require('amd/o2/object').extend;
 *
 *     extend(base, extension);
 *
 *     // Will log "amet".
 *     console.log(base.ipsum);
 *
 * @param {Object} obj - the base object.
 * @param {Object} extension - the object to merge with.
 *
 * @returns {Object} - A reference to the the original object **obj**.
 */
exports.extend = function(obj, extension) {
    if (isObject(obj)) {
        var key;

        for (key in extension) {
            if (extension.hasOwnProperty(key)) {
                obj[key] = extension[key];
            }
        }
    }

    return obj;
};
