/*global o2, window*/

/*
* Copyright © by Volkan Özçelik - http://o2js.com/
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/

/**
 * @module o2.validator.core
 * @requires o2
 *
 * <p>A validation helper.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            /*
             * A struct containing all valid
             * EcmaScript types.
             */
            ecmaScriptType : {
                ARRAY : 'Array',
                BOOLEAN : 'Boolean',
                NUMBER : 'Number',
                DATE : 'Date',
                FUNCTION : 'Function',
                OBJECT : 'Object',
                STRING : 'String',
                ARGUMENTS : 'Arguments',
                REGEXP : 'RegExp'
            }
        }
    };

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

        var objectNameStartIndex = 8;
        var trimLastBraceIndex = -1;
        var klass = Object.prototype.toString.call(obj).slice(objectNameStartIndex, trimLastBraceIndex);
        
        return obj !== UNDEFINED && obj !== null && klass === type;

    }

    /**
     * @class {static} o2.Validator
     *
     * <p>A simple class for validating various kinds of
     * <strong>object</strong>s.</p>
     */
    o2.Validator = {

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

            return is(obj, config.constants.ecmaScriptType.ARRAY);

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

            return is(obj, config.constants.ecmaScriptType.BOOLEAN);

        },

        /**
         * @function {static} o2.Validator.isDate
         *
         * <p>Checks whether the object is a <code>Date</code>.</p>
         *
         * @param {Arguments} varargin - if a single argument is given it checks
         * whether
         * it identifies a <code>Date</code> object. Otherwise the function takes
         * three
         * parameters (year, month, date) and cheks whether they denote a valid
         * Date.
         * @return <code>true</code> if obj is a <code>Date</code>,
         * <code>false</code>
         * otherwise.
         */
        isDate : function(obj) {

            if(arguments.length == 3) {
                var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                var maxDay = 0;
                var year = arguments[0];
                var month = arguments[1];
                var day = arguments[2];

                if(!year || !month || !day) {
                    return false;
                }

                months[1] = ((parseInt(year, 10) % 4 === 0 && parseInt(year, 10) % 100 !== 0) || parseInt(year, 10) % 400 === 0) ? 29 : 28;
                maxDay = months[parseInt(month, 10) - 1];

                if(parseInt(day, 10) > maxDay) {
                    return false;
                }

                return true;
            }

            return is(obj, config.constants.ecmaScriptType.DATE);

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

            return is(obj, config.constants.ecmaScriptType.FUNCTION);

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

            return is(obj, config.constants.ecmaScriptType.NUMBER);

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

            return is(obj, config.constants.ecmaScriptType.OBJECT);

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

            return is(obj, config.constants.ecmaScriptType.REGEXP);

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

            return is(obj, config.constants.ecmaScriptType.STRING);

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

            return is(obj, config.constants.ecmaScriptType.ARGUMENTS);

        }

    };

}(o2, this));
