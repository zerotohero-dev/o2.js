/**
 * @module validator.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-22 09:06:41.422058
 * -->
 *
 * <p>A validation helper.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases
     */
    var me       = framework;
    var toString = Object.prototype.toString;

    /*
     * Calendar Months
     */
    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /*
     * Common Constants
     */
    var kDecimalBase          = 10;
    var kTrimLastBraceIndex   = -1;
    var kYmdArgLen            = 3;
    var kFebruaryIndex        = 1;
    var kObjectNameStartIndex = 8;

    /*
     * EcmaScript Types
     */
    var kArray     = 'Array';
    var kBoolean   = 'Boolean';
    var kDate      = 'Date';
    var kFunction  = 'Function';
    var kNumber    = 'Number';
    var kObject    = 'Object';
    var kRegExp    = 'RegExp';
    var kString    = 'String';
    var kArguments = 'Arguments';

    /**
     * @function {private} o2.Validator.is
     *
     * <p>Returns the type information of the given object.</p>
     * <p>The type can be any of the following:</p>
     * <p><code>Array, Boolean, Date, Error, Function, JSON,
     * Math, Number, Object, RegExp, String, Arguments</code>.</p>
     *
     * @param {Object} obj - the object to check type against.
     * @param {String} type - the type to compare.
     * @return <code>true</code> if the <strong>object</strong>'s type matches
     * the <strong>type</strong> parameter, <code>false</code> otherwise.
     */
    function is(obj, type) {
        var klass = toString.call(obj).slice(
            kObjectNameStartIndex, kTrimLastBraceIndex);

        return obj !== undefined && obj !== null && klass === type;
    }

    /*
     * Cheks whether the year is a leap year.
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * @class {static} o2.Validator
     *
     * <p>A simple class for validating various kinds of
     * <strong>object</strong>s.</p>
     */
    me.Validator = {

        /**
         * @function {static} o2.Validator.isArray
         *
         * <p>Checks whether the object is an <code>Array</code>.</p>
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is an <code>Array</code>,
         * <code>false</code>
         * otherwise.
         */
        isArray : function(obj) {
            return is(obj, kArray);
        },

        /**
         * @function {static} o2.Validator.isBoolean
         *
         * <p>Checks whether the object is a <code>Boolean</code>.
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is a <code>Boolean</code>,
         * <code>false</code>
         * otherwise.
         */
        isBoolean : function(obj) {
            return is(obj, kBoolean);
        },

        /**
         * @function {static} o2.Validator.isDate
         *
         * <p>Checks whether the object is a <code>Date</code>.</p>
         *
         * @param {Arguments} varargin - if a single argument is given it checks
         * whether it identifies a <code>Date</code> object. Otherwise the
         * function takes
         * three parameters (year, month, date) and cheks whether they denote a
         * valid Date.
         * @return <code>true</code> if obj is a <code>Date</code>,
         * <code>false</code> otherwise.
         */
        isDate : function(objYear, objMonth, objDay) {
            var maxDay = 0;
            var year = objYear;
            var month = objMonth;
            var day = objDay;

            if (arguments.length === kYmdArgLen) {
                if (!year || !month || !day) {
                    return false;
                }

                month = parseInt(month, kDecimalBase);
                year = parseInt(year, kDecimalBase);
                day = parseInt(day, kDecimalBase);

                if (month < 0 || month > months.length) {
                    return false;
                }

                months[kFebruaryIndex] = isLeapYear(year) ? 29 : 28;

                maxDay = months[month - 1];

                return (day <= maxDay);
            }

            return is(objYear, kDate);
        },

        /**
         * @function {static} o2.Validator.isFunction
         *
         * <p>Checks whether the object is a <code>Function</code>.</p>
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is a <code>Function</code>,
         * <code>false</code> otherwise.
         */
        isFunction : function(obj) {
            return is(obj, kFunction);
        },

        /**
         * @function {static} o2.Validator.isNumber
         *
         * <p>Checks whether the object is a <code>Number</code>.</p>
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is a <code>Number</code>,
         * <code>false</code>
         * otherwise.
         */
        isNumber : function(obj) {
            return is(obj, kNumber);
        },

        /**
         * @function {static} o2.Validator.isObject
         *
         * <p>Checks whether the object is an <code>Object</code>({}).</p>
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is an <code>Object</code> ({}),
         * <code>false</code> otherwise.
         */
        isObject : function(obj) {
            return is(obj, kObject);
        },

        /**
         * @function {static} o2.Validator.isRegExp
         *
         * <p>Checks whether the object is a <code>RegExp</code>.</p>
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is a <code>RegExp</code>,
         * <code>false</code>
         * otherwise.
         */
        isRegExp : function(obj) {
            return is(obj, kRegExp);
        },

        /**
         * @function {static} o2.Validator.isString
         *
         * <p>Checks whether the object is a <code>String</code>.</p>
         *
         * @param {Object} obj - the object to test.
         * @return true if obj is a String, false otherwise.
         */
        isString : function(obj) {
            return is(obj, kString);
        },

        /**
         * @function {static} o2.Validator.isArguments
         *
         * <p>Checks whether the object is an <code>arguments</code> object.</p>
         *
         * @param {Object} obj - the object to test.
         * @return <code>true</code> if obj is an <code>arguments</code> object,
         * <code>false</code> otherwise.
         */
        isArguments : function(obj) {
            return is(obj, kArguments);
        }
    };
}(this.o2));
