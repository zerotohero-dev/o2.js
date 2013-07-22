require([
    '../../validation/core'
], function(
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
          * ../../validation/core
          */
        isArray = Validation.isArray,
        isFunction = Validation.isFunction,
        isObject = Validation.isObject,


        /*
         * Array.prototype
         */
        slice = Array.prototype.slice,

        /*
         * Math
         */
        max = Math.max,

        /*
         * # Common Constants
         */

        kEmpty = '';

    exports.getFirst = function(obj) {
        var key;

        if (!obj) {return null;}
        if (!isObject(obj)) {return null;}

        if (isArray(obj)) {
            return obj[0] || null;
        }

        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                return obj[key];
            }
        }

        return null;
    };

    exports.getFirstN = function(obj, n) {
        var result = [],
            i,
            key,
            len;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0; i < len && i < n; i++) {
                result.push(obj[i]);
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (i < n) {
                    result.push(obj[key]);
                }
            }
        }

        return result;
    };

    exports.getFunctions = function(obj) {
        var result = [],
            i,
            key,
            len,
            value;

        //TODO: repeated code; extract function
        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        if (!isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                value = obj[i];

                if (isFunction(value)) {
                    result.push(value);
                }
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];

                if (isFunction(value)) {
                    result.push(value);
                }
            }
        }

        return result;
    };

    exports.getMethods = exports.getFunctions;

    exports.getKeys = function(obj) {
        var result = [],
            i,
            key,
            len;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                result.push([kEmpty, i].join(kEmpty));
            }

            return result;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key);
            }
        }

        return result;
    };

    exports.getLast = function(obj) {
        var key,
            last,
            len;

        if (!obj) {return last;}
        if (!isObject(obj)) {return last;}

        if (isArray(obj)) {
            len = obj.length;

            return len ? obj[len - 1] : null;
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                last = obj[key];
            }
        }

        return last;
    };

    exports.getLastN = function(obj, n) {
        var result = [],
            i,
            key,
            len;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}
        if (!n) {return result;}

        if (isArray(obj)) {
            return slice.apply(obj, [max(obj.length - n, 0)]);
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                len++;
            }
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (i >= len - n) {
                    result.push(obj[key]);
                }
            }
        }

        return result;
    };

    exports.getRest = function(obj, n) {
        var cutAt = 0,
            index = 0,
            result = [],
            key;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        cutAt = n === undefined ? 1 : n;

        if (obj.slice) {
            return obj.slice(cutAt);
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (index >= cutAt) {
                    result.push(obj[key]);
                }
            }
        }

        return result;
    };

    exports.getValues = function(obj) {
        var result = [],
            key;

        if (!obj) {return null;}
        if (!isObject(obj)) {return null;}

        if (obj.slice) {
            return obj.slice();
        }

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }

        return result;
    };

    exports.pluck = function(obj, key) {
        var result = [],
            i,
            k,
            len;

        if (!obj) {return result;}
        if (!isObject(obj)) {return result;}

        if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                result.push(obj[i][key]);
            }

            return result;
        }

        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                result.push(obj[k][key]);
            }
        }

        return result;
    };

    return exports;
});
