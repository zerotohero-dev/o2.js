/*global window, o2*/

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
 * @module o2.stringhelper.core
 * @requires o2
 *
 * <p>A <code>String</code> helper.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Module Configuration
     */
    var config = {
        constants : {
            /*
             * @property {private const Integer}
             * o2.StringHelper.config.constants.DEFAULT_RANDOM_LENGTH - default
             * length for
             * generating a random String.
             */
            DEFAULT_RANDOM_LENGTH : 8,
            RANDOM_CHAR_FEED : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
            GUID_MULTIPLIER : 10000,
            regExp : {
                TRIM : /^\s+|\s+$/g,
                WHITESPACE : /\s+/g
            }
        }
    };

    /**
     * @class {static} o2.StringHelper
     *
     * <p>A <code>String</code> helper <strong>class</strong>.</p>
     */
    o2.StringHelper = {

        /**
         * @function {static} o2.StringHelper.generateGuid
         *
         * <p>Creates a globally unique identifier (i.e. <strong>GUID</strong>),
         * for that
         * browsing session.</p>
         *
         * @return a <strong>GUID</strong>.
         */
        generateGuid : function() {

            return [(new Date()).getTime(), Math.floor(config.constants.GUID_MULTIPLIER * Math.random())].join('');

        },

        /**
         * @function {static} o2.StringHelper.generateRandom
         *
         * <p>Generates a random <code>String</code>.</p>
         *
         * @param {Integer} length - (optional - default: {@link
         * o2.StringHelper.config.constants.DEFAULT_RANDOM_LENGTH})
         *     length of the <code>String</code> to be generated.
         * @return the generated <code>String</code>.
         */
        generateRandom : function(length) {

            var chars = config.constants.RANDOM_CHAR_FEED;

            var len = length || config.constants.DEFAULT_RANDOM_LENGTH;
            var charsLength = chars.length;
            var randomString = '';
            var randomNumber = 0;

            var buffer = [];

            for(var i = 0; i < len; i++) {
                randomNumber = Math.floor(Math.random() * charsLength);
                buffer.push(chars.substring(randomNumber, randomNumber + 1));
            }

            return buffer.join('');

        },

        /**
         * @function {static} o2.StringHelper.concat
         *
         * <p>Concatanes all its arguments into a single <code>String</code>.
         * This is faster than adding those <code>String</code>s with
         * <code>+</code>.</p>
         *
         * @return the concataneted <code>String</code>.
         */
        concat : function() {

            return Array.prototype.slice.call(arguments).join('');

        },

        /**
         * @function {static} o2.StringHelper.format
         *
         * <p>Works similar to <strong>C#</strong>'s
         * <code>String.Format</code>.</p>
         * <p>Usage Example:<p>
         * <pre>
         * o2.StrinHelper.format("Hello {0}. What's going on in {1}?", 'Ninja',
         * 'California');
         * //will return "Hello Ninja. What's going on in California"
         * </pre>
         *
         * @return the formated <code>String</code>.
         */
        format : function(string) {

            var args = arguments;

            if(args.length === 0) {
                return null;
            }

            if(args.length == 1) {
                return args[0];
            }

            var pattern = RegExp(['{', '([0-', (args.length - 2), '])', '}'].join(''), 'g');

            return args[0].replace(pattern, function(match, index) {
                return args[+index + 1];
            });

        },

        /**
         * @function {static} o2.StringHelper.remove
         *
         * <p>Simply removes the phrases that match the <code>RegExp</code> from
         * the
         * <code>String</code>.</p>
         *
         * @param {String} str - the <code>String</code> to process.
         * @param {RegExp} regExp - the <code>RegExp</code> to process agains.
         * @return the processed <code>String</code>.
         */
        remove : function(str, regExp) {

            return str.replace(regExp, '');

        },

        /**
         * @function {static} o2.StringHelper.trim
         *
         * <p>Trims white space from beginning and end of the
         * <code>String</code>.</p>
         *
         * @param {String} str - the <code>String</code> to process.
         * @param {Boolean} shouldCompact - Optional (default:
         * <code>false</code>)
         *     if <code>true</code>, multiple whitespace is compacted into single
         * whitespace.
         * @return the processed <code>String</code>.
         */
        trim : function(str, shouldCompact) {

            shouldCompact = shouldCompact || false;
            var constants = config.constants;
            var regExp = constants.regExp;

            return shouldCompact ? str.replace(regExp.WHITESPACE, ' ').replace(regExp.TRIM, '') : str.replace(regExp.TRIM, '');

        },

        /**
         * @function {static} o2.StringHelper.compact
         *
         * <p>Works identical to <code>o2.StringHelper.trim(str,
         * true)</code>.</p>
         *
         * @param {String} str - the <code>String</code> to process.
         * @return the processed <code>String</code>.
         * @see o2.StringHelper.trim
         */
        compact : function(str) {

            return o2.StringHelper.trim(str, true);

        }

    };
}(o2, this));
