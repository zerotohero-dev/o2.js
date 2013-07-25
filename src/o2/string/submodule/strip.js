require([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Common Regular Expressions
         */

        kNonAlphaNumericRegExp = /[^A-Za-z0-9 ]+/g,
        kNonAlphaRegExp = /[^A-Za-z ]+/g,
        kNonNumericRegExp = /[^0-9\-.]/g,
        kNumericRegExp = /[0-9]/g,
        kTagRegExp = /<[\/]?([a-zA-Z0-9]+)[^>\^<]*>/ig,

        /*
         * # Common Strings
         */

        kEmpty = '';

    exports.stripNonAlpha = function(str) {
        return str.replace(kNonAlphaRegExp, kEmpty);
    };

    exports.stripNonAlphanumeric = function(str) {
        return str.replace(kNonAlphaNumericRegExp, kEmpty);
    };

    exports.stripTags = function(str) {
        return str.replace(kTagRegExp, kEmpty);
    };

    exports.stripNonNumeric = function(str) {
        return str.replace(kNonNumericRegExp, kEmpty);
    };

    exports.stripNumeric = function(str) {
        return str.replace(kNumericRegExp, kEmpty);
    };

    return exports;
});
