require([
], function() {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Common Regular Expressions
         */

        kAllCapsRegExp = /([A-Z])/g,
        kCamelCaseRegExp = /(\-[a-z])/g,
        kLineBreakToNewLineRegExp = /<br\s*\/?>/g,
        kNewLineToLineBreakRegExp = /\r\n|\n|\r/g,
        //kRemoveTagsRegExp = /<[\/]?([a-zA-Z0-9]+)[^><]*>/ig;

        /*
         * # Common Text
         */

        kBr = '<br />',
        kDash = '-',
        kEllipsis = '&hellip;',
        kEmpty = '',
        kJsonNotSupported = 'JSON support cannot be found!',
        kNewLine = '\n',
        kUnderscore = '_',

        /*
         * <p>Maximum length, after which the string is truncated with an
         * ellipsis (...)</p>
         */
        kTruncationLength = 100;

    exports.br2nl = function(str) {
        return str.replace(kLineBreakToNewLineRegExp, kNewLine);
    };

    exports.nl2br = function(str) {
        return str.replace(kNewLineToLineBreakRegExp, kBr);
    };

    exports.toCamelCase = function(input) {
        return input.replace(kCamelCaseRegExp, function(match) {
            return match.toUpperCase().replace(kDash, kEmpty);
        });
    };

    exports.toDashedFromCamelCase = function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kDash, match.toLowerCase()].join(kEmpty);
        });
    };

    exports.toJson = function(str) {
        if (!JSON) {throw kJsonNotSupported;}

        return JSON.parse(str);
    };

    exports.toUnderscoreFromCamelCase = function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kUnderscore, match.toLowerCase()].join(kEmpty);
        });
    };

    exports.truncate = function(str, maxLen) {
        var eLen = kEllipsis.length,
            maxLength = maxLen || kTruncationLength;

        if (str.length > maxLength) {
            return [str.substr(0, maxLength - eLen), kEllipsis].join(kEmpty);
        }

        return str;
    };

    return exports;
});



