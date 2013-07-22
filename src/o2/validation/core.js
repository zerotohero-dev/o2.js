require([
], function(
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Module Definition
         */

        /*
         * # Aliases
         */

        /*
         * Object.prototype
         */
        toString = Object.prototype.toString,

        /*
         * # Configuration
         */

        /*
         * Calendar Months
         */
        months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

        /*
         * # Common Constants
         */

        kDecimalBase = 10,
        kFebruaryIndex = 1,
        kLeapFebruaryDays = 29,
        kNormalFebruaryDays = 28,
        kObjectNameStartIndex = 8,
        kTrimLastBraceIndex = -1,
        kYmdArgLen = 3,

        /*
         * # EcmaScript Types
         */

        kArguments = 'Arguments',
        kArray = 'Array',
        kBoolean = 'Boolean',
        kDate = 'Date',
        kFunction = 'Function',
        kNumber = 'Number',
        kObject = 'Object',
        kRegExp = 'RegExp',
        kString = 'String',

        /*
         * # To Be Overridden
         */

        is = null;

    /*
     * Cheks whether the year is a leap year.
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    exports.is = function(obj, type) {
        var klass = toString.call(obj).slice(
            kObjectNameStartIndex, kTrimLastBraceIndex);

        return obj !== undefined && obj !== null && klass === type;
    };

    is = exports.is;

    exports.isArguments = function(obj) {
        return is(obj, kArguments);
    };

    exports.isArray = function(obj) {
        return is(obj, kArray);
    };

    exports.isBoolean = function(obj) {
        return obj === true || obj === false || is(obj, kBoolean);
    };

    exports.isDate = function(objYear, objMonth, objDay) {
        var day = objDay,
            maxDay = 0,
            month = objMonth,
            year = objYear;

        if (arguments.length === kYmdArgLen) {
            if (!year || !month || !day) {return false;}

            month = parseInt(month, kDecimalBase);
            year  = parseInt(year, kDecimalBase);
            day   = parseInt(day, kDecimalBase);

            if (month < 0 || month > months.length) {return false;}

            months[kFebruaryIndex] = isLeapYear(year) ?
                kLeapFebruaryDays :
                kNormalFebruaryDays;

            maxDay = months[month - 1];

            return (day <= maxDay);
        }

        return is(objYear, kDate);
    };

    exports.isFunction = function(obj) {
        return is(obj, kFunction);
    };

    exports.isNaN = function(obj) {

        // NaN is the only value for which === is not reflexive.
        // JSLint whines about this, but it's normal.
        return obj !== obj;
    };

    exports.isNull = function(obj) {
        return obj === null;
    };

    exports.isNumber = function(obj) {
        return is(obj, kNumber);
    };

    exports.isNumeric = function(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    };

    exports.isObject = function(obj) {
        return is(obj, kObject);
    };

    exports.isRegExp = function(obj) {
        return is(obj, kRegExp);
    };

    exports.isString = function(obj) {
        return is(obj, kString);
    };

    exports.isUndefined =function(obj) {

        //JSLint complains. It's okay.
        return obj === void 0;
    };

    exports.isWindow = function(obj) {
        return obj && typeof obj === kObject && !!obj.setInterval;
    };
});
