require([
    '../../collection/core',
    './validation'
], function(
    Collection,
    Validation
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

         /*
          * ../../collection/core
          */
        indexOf = Collection.indexOf,

         /*
          * ./validation
          */
        isArray = Validation.isArray,
        isObject = Validation.isObject;

    exports.extend = function(toObj, fromObj) {
        var i,
            key,
            len,
            value;

        if (!toObj) {return {};}
        if (!isObject(toObj)) {return toObj;}
        if (!isObject(fromObj)) {return toObj;}

        if (isArray(toObj)) {
            if(!isArray(fromObj)) {return toObj;}

            for (i = 0, len = fromObj.length; i < len; i++) {
                value = fromObj[i];

                if(indexOf(toObj, value) === -1) {
                    toObj.push(value);
                }
            }

            return toObj;
        }

        for (key in fromObj) {
            if (fromObj.hasOwnProperty(key)) {
                toObj[key] = fromObj[key];
            }
        }

        return toObj;
    };

    exports.merge = exports.extend;

    return exports;
});


