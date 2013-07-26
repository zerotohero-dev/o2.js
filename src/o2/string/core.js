define([
], function(
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
         * Array.prototype
         */
        slice = Array.prototype.slice,

        /*
         * String.prototype
         */
        trim = String.prototype.trim,

        /*
         * Math
         */
        floor = Math.floor,
        random = Math.random,

        /*
         * # Common Constants
         */

        kBlank = ' ',
        kDecimalPoint = '.',
        kEmpty = '',
        kFormatEnd = '}',
        kFormatStart = '{',
        kGlobal = 'g',
        kNumeric = '([0-9]+)',
        kRandomCharFeed =
            '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',

        /*
         * Default length for generating a random <code>String</code>s.
         */
        kDefaultRandomLength = 8,

       /*
        * # Common Regular Expressions
        */

        kPrintfRegExp = /(%(\w+):s)|(%s)/g,
        kTrimRegExp = /^\s+|\s+$/g,
        kWhitespaceRegExp = /\s+/g,

        /*
         * # Printf Replacement Indexes
         */

        kAllIndex = 0,
        kParametrizedMatchIndex = 2,
        kReplaceParameterStartIndex = 1,

        /*
         * # Guid-Related
         */

        kGuidRadix = 36,
        kGuidShift = 30,

        /*
         * # To Be Overridden
         */

        concat,
        strim;

    exports.concat = function() {
        return slice.call(arguments).join(kEmpty);
    };

    /*
     *
     */
    concat = exports.concat;

    exports.format = function() {
        var args = arguments,
            pattern = new RegExp([kFormatStart, kNumeric,
                kFormatEnd].join(kEmpty), kGlobal);

        if (args.length === 0) {return null;}
        if (args.length === 1) {return args[0];}

        return args[0].replace(pattern, function(match, index) {
            match = undefined;

            return args[(+index) + 1];
        });
    };

    exports.generateGuid = function() {
        return (
            (new Date()).getTime() + random() * (1 << kGuidShift)
        ).toString(kGuidRadix).replace(kDecimalPoint, kEmpty);
    };

    exports.generateRandom = function(length) {
        var buffer = [],
            chars = kRandomCharFeed,
            charsLength  = chars.length,
            len = length || kDefaultRandomLength,
            randomNumber = 0,
            i;

        for (i = 0; i < len; i++) {
            randomNumber = floor(random() * charsLength);

            buffer.push(chars.substring(randomNumber, randomNumber + 1));
        }

        return buffer.join(kEmpty);
    };

    exports.printf = function(str) {
        var buffer = [],
            index = kReplaceParameterStartIndex,
            lastMatch = 0,
            result = kPrintfRegExp.exec(str),
            rep,
            par;

        while (result) {
            buffer.push(str.substring(lastMatch, result.index));

            rep = arguments[kReplaceParameterStartIndex];
            par = result[kParametrizedMatchIndex];

            if (!par) {
                buffer.push(arguments[index++]);
            } else if (rep && rep.hasOwnProperty(par)) {
                buffer.push(rep[par]);
            } else if (arguments.hasOwnProperty(par)) {
                buffer.push(arguments[par]);
            } else {
                buffer.push(result[kAllIndex]);
            }

            lastMatch = result.index + result[kAllIndex].length;

            result = kPrintfRegExp.exec(str);
        }

        buffer.push(str.substr(lastMatch));

        return buffer.join(kEmpty);
    };

    exports.remove = function(str, regExp) {
        return concat(kEmpty, str).replace(regExp, kEmpty);
    };

    if (trim) {
        exports.trim = function(str, shouldCompact) {
            var s = concat(kEmpty, str),
                willCompact = shouldCompact || false;

            return willCompact ?
                s.replace(kWhitespaceRegExp, kBlank).trim() :
                s.trim();
        };
    } else {
        exports.trim = function(str, shouldCompact) {
            var s = concat(kEmpty, str),
                willCompact = shouldCompact || false;

            return willCompact ?
                s.replace(kWhitespaceRegExp, kBlank).replace(
                    kTrimRegExp, kEmpty) :
                s.replace(kTrimRegExp, kEmpty);
        };
    }

    strim = exports.trim;

    exports.compact = function(str) {
        return strim(concat(kEmpty, str), true);
    };

    return exports;
});
