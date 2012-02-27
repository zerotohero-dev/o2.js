/**
 * @module   validator.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-27 19:40:18.378252
 * -->
 *
 * <p>A validation helper.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var obj       = attr(_, 'getObject');

    /**
     * @class {static} o2.Validator
     *
     * <p>A simple class for validating various kinds of
     * <strong>object</strong>s.</p>
     */
    var me = create('Validator');

    /*
     * Aliases
     */
    var toString = attr(Object.prototype, 'toString');

    /*
     * Calendar Months
     */
    var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /*
     * Common Constants
     */
    var kDecimalBase          = 10;
    var kFebruaryIndex        = 1;
    var kLeapFebruaryDays     = 29;
    var kNormalFebruaryDays   = 28;
    var kObjectNameStartIndex = 8;
    var kTrimLastBraceIndex   = -1;
    var kYmdArgLen            = 3;

    /*
     * EcmaScript Types
     */
    var kArguments = 'Arguments';
    var kArray     = 'Array';
    var kBoolean   = 'Boolean';
    var kDate      = 'Date';
    var kFunction  = 'Function';
    var kNumber    = 'Number';
    var kObject    = 'Object';
    var kRegExp    = 'RegExp';
    var kString    = 'String';

    /*
     * Cheks whether the year is a leap year.
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

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
     *
     * @return <code>true</code> if the <strong>object</strong>'s type matches
     * the <strong>type</strong> parameter, <code>false</code> otherwise.
     */
    def(me, 'is', function(obj, type) {
        var klass = toString.call(obj).slice(
            kObjectNameStartIndex, kTrimLastBraceIndex);

        return obj !== undefined && obj !== null && klass === type;
    });

    var is = obj(me).is;

    /**
     * @function {static} o2.Validator.isArguments
     *
     * <p>Checks whether the object is an <code>arguments</code> object.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>arguments</code> object,
     * <code>false</code> otherwise.
     */
    def(me, 'isArguments', function(obj) {
        return is(obj, kArguments);
    });

    /**
     * @function {static} o2.Validator.isArray
     *
     * <p>Checks whether the object is an <code>Array</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>Array</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isArray', function(obj) {
        return is(obj, kArray);
    });


    /**
     * @function {static} o2.Validator.isBoolean
     *
     * <p>Checks whether the object is a <code>Boolean</code>.
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Boolean</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isBoolean', function(obj) {
        return obj === true || obj === false || is(obj, kBoolean);
    });

    /**
     * @function {static} o2.Validator.isDate
     *
     * <p>Checks whether the object is a <code>Date</code>.</p>
     *
     * @param {Arguments} varargin - if a single argument is given it checks
     * whether it identifies a <code>Date</code> object. Otherwise the
     * function takes three parameters (year, month, date) and cheks whether
     * they denote a valid Date.
     *
     * @return <code>true</code> if obj is a <code>Date</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isDate', function(objYear, objMonth, objDay) {
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

            months[kFebruaryIndex] = isLeapYear(year) ?
                kLeapFebruaryDays :
                kNormalFebruaryDays;

            maxDay = months[month - 1];

            return (day <= maxDay);
        }

        return is(objYear, kDate);
    });

    /**
     * @function {static} o2.Validator.isFunction
     *
     * <p>Checks whether the object is a <code>Function</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Function</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isFunction', function(obj) {
        return is(obj, kFunction);
    });

    /**
     * @function {static} o2.Validator.isNan
     *
     * <p>Checks whether the given parameter is <code>NaN</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>NaN</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isNaN', function(obj) {

        // NaN is the only value for which === is not reflexive.
        // JSLint whines about this, but it's normal.
        return obj !== obj;
    });

    /**
     * @function {static} o2.Validator.isNull
     *
     * <p>Checks whether the given parameter is <code>null</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>null</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isNull', function(obj) {
        return obj === null;
    });

    /**
     * @function {static} o2.Validator.isNumber
     *
     * <p>Checks whether the object is a <code>Number</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Number</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isNumber', function(obj) {
        return is(obj, kNumber);
    });

    /**
     * @function {static} o2.Validator.isNumeric
     *
     * <p>Checks whether the given parameter is a numeric entity.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is a numeric entity,
     * <code>false</code> otherwise.
     */
    def(me, 'isNumeric', function(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    });

    /**
     * @function {static} o2.Validator.isObject
     *
     * <p>Checks whether the object is an <code>Object</code>({}).</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>Object</code> ({}),
     * <code>false</code> otherwise.
     */
    def(me, 'isObject', function(obj) {
        return is(obj, kObject);
    });

    /**
     * @function {static} o2.Validator.isRegExp
     *
     * <p>Checks whether the object is a <code>RegExp</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>RegExp</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isRegExp', function(obj) {
        return is(obj, kRegExp);
    });

    /**
     * @function {static} o2.Validator.isString
     *
     * <p>Checks whether the object is a <code>String</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return true if obj is a String, false otherwise.
     */
    def(me, 'isString', function(obj) {
        return is(obj, kString);
    });

    /**
     * @function {static} o2.Validator.isUndefined
     *
     * <p>Checks whether the given parameter is <code>undefined</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>undefined</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isUndefined', function(obj) {
        return obj === void 0;
    });

    /**
     * @function {static} o2.Validator.isWindow
     *
     * <p>Checks whether the given parameter is a <code>window</code>
     * object.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is a <code>window</code>,
     * <code>false</code> otherwise.
     */
    def(me, 'isWindow', function(obj) {
        return obj && typeof obj === kObject && !!obj.setInterval;
    });
}(this.o2));
