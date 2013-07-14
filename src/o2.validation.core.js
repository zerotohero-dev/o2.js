/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, UNDEFINED) {
    'use strict';

    /**
     * @module   validation.core
     *
     * @requires core
     *
     * <p>A validation helper.</p>
     */
    fp.ensure(
        'validation.core',
    [
        'core'
    ]);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),
        obj    = attr(fp, 'getObject'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Validation',

        /**
         * @class {static} o2.Validation
         *
         * <p>A simple class for validating various kinds of
         * <strong>object</strong>s.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * native
         */
        toString = attr(Object.prototype, 'toString'),

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

        kDecimalBase          = 10,
        kFebruaryIndex        = 1,
        kLeapFebruaryDays     = 29,
        kNormalFebruaryDays   = 28,
        kObjectNameStartIndex = 8,
        kTrimLastBraceIndex   = -1,
        kYmdArgLen            = 3,

        /*
         * # EcmaScript Types
         */

        kArguments = 'Arguments',
        kArray     = 'Array',
        kBoolean   = 'Boolean',
        kDate      = 'Date',
        kFunction  = 'Function',
        kNumber    = 'Number',
        kObject    = 'Object',
        kRegExp    = 'RegExp',
        kString    = 'String',

        /*
         * To be Overridden
         */

        is = null;

    /*
     * Cheks whether the year is a leap year.
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * @function {private} o2.Validation.is
     *
     * <p>Returns the type information of the given object.</p>
     * <p>The type can be any of the following:</p>
     * <p><code>Array, Boolean, Date, Error, Function, JSON,
     * Math, Number, Object, RegExp, String, Arguments</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 'dolor'};
     * var isObject = o2.Validation.is(obj, 'Object');
     * </pre>
     *
     * @param {Object} obj - the object to check type against.
     * @param {String} type - the type to compare.
     *
     * @return <code>true</code> if the <strong>object</strong>'s type matches
     * the <strong>type</strong> parameter, <code>false</code> otherwise.
     */
    exports.is = def(me, 'is', function(obj, type) {
        var klass = toString.call(obj).slice(
            kObjectNameStartIndex, kTrimLastBraceIndex);

        return obj !== UNDEFINED && obj !== null && klass === type;
    });

    is = obj(me).is;

    /**
     * @function {static} o2.Validation.isArguments
     *
     * <p>Checks whether the object is an <code>arguments</code> object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isArguments = o2.Validation.isArguments(arguments);
     * </pre>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>arguments</code> object,
     * <code>false</code> otherwise.
     */
    exports.isArguments = def(me, 'isArguments', function(obj) {
        return is(obj, kArguments);
    });

    /**
     * @function {static} o2.Validation.isArray
     *
     * <p>Checks whether the object is an <code>Array</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isArray = o2.Validation.isArray([]);
     * </pre>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>Array</code>,
     * <code>false</code> otherwise.
     */
    exports.isArray = def(me, 'isArray', function(obj) {
        return is(obj, kArray);
    });


    /**
     * @function {static} o2.Validation.isBoolean
     *
     * <p>Checks whether the object is a <code>Boolean</code>.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isBoolean = o2.Validation.isBoolean(false);
     * </pre>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Boolean</code>,
     * <code>false</code> otherwise.
     */
    exports.isBoolean = def(me, 'isBoolean', function(obj) {
        return obj === true || obj === false || is(obj, kBoolean);
    });

    /**
     * @function {static} o2.Validation.isDate
     *
     * <p>Checks whether the object is a <code>Date</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDate = o2.Validation.isDate((ew Date());
     * </pre>
     *
     * @param {Arguments} varargin - if a single argument is given it checks
     * whether it identifies a <code>Date</code> object. Otherwise the
     * function takes three parameters (year, month, date) and cheks whether
     * they denote a valid Date.
     *
     * @return <code>true</code> if obj is a <code>Date</code>,
     * <code>false</code> otherwise.
     */
    exports.isDate = def(me, 'isDate', function(objYear, objMonth, objDay) {
        var day    = objDay,
            maxDay = 0,
            month  = objMonth,
            year   = objYear;

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
    });

    /**
     * @function {static} o2.Validation.isFunction
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isFunction = o2.Validation.isFunction(fnTest);
     * </pre>
     *
     * <p>Checks whether the object is a <code>Function</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Function</code>,
     * <code>false</code> otherwise.
     */
    exports.isFunction = def(me, 'isFunction', function(obj) {
        return is(obj, kFunction);
    });

    /**
     * @function {static} o2.Validation.isNaN
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNaN = o2.Validation.isNaN('lorem');
     * </pre>
     *
     * <p>Checks whether the given parameter is <code>NaN</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>NaN</code>,
     * <code>false</code> otherwise.
     */
    exports.isNaN = def(me, 'isNaN', function(obj) {

        // NaN is the only value for which === is not reflexive.
        // JSLint whines about this, but it's normal.
        return obj !== obj;
    });

    /**
     * @function {static} o2.Validation.isNull
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNull = o2.Validation.isNull(null);
     * </pre>
     *
     * <p>Checks whether the given parameter is <code>null</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>null</code>,
     * <code>false</code> otherwise.
     */
    exports.isNull = def(me, 'isNull', function(obj) {
        return obj === null;
    });

    /**
     * @function {static} o2.Validation.isNumber
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNumber = o2.Validation.isNumber(42);
     * </pre>
     *
     * <p>Checks whether the object is a <code>Number</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>Number</code>,
     * <code>false</code> otherwise.
     */
    exports.isNumber = def(me, 'isNumber', function(obj) {
        return is(obj, kNumber);
    });

    /**
     * @function {static} o2.Validation.isNumeric
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNumeric = o2.Validation.isNumeric('4.2');
     * </pre>
     *
     * <p>Checks whether the given parameter is a numeric entity.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is a numeric entity,
     * <code>false</code> otherwise.
     */
    exports.isNumeric = def(me, 'isNumeric', function(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    });

    /**
     * @function {static} o2.Validation.isObject
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isObject = o2.Validation.isObject({});
     * </pre>
     *
     * <p>Checks whether the object is an <code>Object</code>({}).</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is an <code>Object</code> ({}),
     * <code>false</code> otherwise.
     */
    exports.isObject = def(me, 'isObject', function(obj) {
        return is(obj, kObject);
    });

    /**
     * @function {static} o2.Validation.isRegExp
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isRegExp = o2.Validation.isRegExp(/test/ig);
     * </pre>
     *
     * <p>Checks whether the object is a <code>RegExp</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return <code>true</code> if obj is a <code>RegExp</code>,
     * <code>false</code> otherwise.
     */
    exports.isRegExp = def(me, 'isRegExp', function(obj) {
        return is(obj, kRegExp);
    });

    /**
     * @function {static} o2.Validation.isString
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isString = o2.Validation.isString('lorem');
     * </pre>
     *
     * <p>Checks whether the object is a <code>String</code>.</p>
     *
     * @param {Object} obj - the object to test.
     *
     * @return true if obj is a String, false otherwise.
     */
    exports.isString = def(me, 'isString', function(obj) {
        return is(obj, kString);
    });

    /**
     * @function {static} o2.Validation.isUndefined
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isUndefined = o2.Validation.isUndefined(undefined);
     * </pre>
     *
     * <p>Checks whether the given parameter is <code>undefined</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is <code>undefined</code>,
     * <code>false</code> otherwise.
     */
    exports.isUndefined = def(me, 'isUndefined', function(obj) {

        //JSLint complains. It's okay.
        return obj === void 0;
    });

    /**
     * @function {static} o2.Validation.isWindow
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isWindow = o2.Validation.isWindow(window);
     * </pre>
     *
     * <p>Checks whether the given parameter is a <code>window</code>
     * object.</p>
     *
     * @param {Object} obj - the <code>Object</code> to test.
     *
     * @return <code>true</code> if the item is a <code>window</code>,
     * <code>false</code> otherwise.
     */
    exports.isWindow = def(me, 'isWindow', function(obj) {
        return obj && typeof obj === kObject && !!obj.setInterval;
    });
}(this.o2, this.o2.protecteds));

