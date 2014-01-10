define(function (require, exports, module) {'use strict';


/**
 * @module o2.object
 */

/**
 * @class o2.object.core
 * @static
 */

/**
 * Clones the object (creates a non-recursive **shallow** copy).
 *
 * See also `o2.object.core.deepClone`.
 *
 * @example
 *     // TODO: insert example.
 *
 * @method clone
 * @static
 * @final
 *
 * @param {Object} obj - the object to clone.
 */
exports.clone = function(obj) {
    //TODO: implement me.
};

/**
 * Deep clones an object (recursively cloning children).
 *
 * This method only works on attributes, it does not clone function references.
 *
 * See also: `
 *
 * @example
 *     // TODO: insert example
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

});
