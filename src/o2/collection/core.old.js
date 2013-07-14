define([
    'o2.method.core',
    'o2.validation.core'
], function(
    Method,
    Validation
) {
    'use strict';

        /*
         * # Module Exports
         */

    var  exports = {},

        /*
         * # Aliases
         */

        /*
         * method.core
         */
        identity = Method.identity,
        bind = Method.bind,

        /*
         * validation.core
         */
        isArguments = Validation.isArguments,
        isArray = Validation.isArray,
        isFunction = Validation.isFunction,
        isObject = Validation.isObject,

        /*
         * native
         */
        slice = Array.prototype.slice,
        floor = Math.floor,
        max = Math.max,
        min = Math.min,
        random = Math.random,

        /*
         * # Common Constants
         */

        kEmpty  = '',
        kLength = 'length',

        /*
         * # To be Overridden
         */

        indexOf,
        contains,
        isEmpty,
        getMax,
        toArray,
        map,
        unique,
        pluck,
        reduce,
        flatten;

















    return exports;
});
