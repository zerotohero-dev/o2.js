/**
 * @module stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <code>String</code> helper.</p>
 */
( function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;

    /*
     * Module Configuration
     */
    var config = {

        /*
         *
         */
        constants : {

            /*
             * @property {private const Integer}
             * o2.StringHelper.config.constants.DEFAULT_RANDOM_LENGTH - default
             * length for
             * generating a random <strong>String</strong>s.
             */
            DEFAULT_RANDOM_LENGTH : 8,

            /*
             *
             */
            RANDOM_CHAR_FEED : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',

            /*
             *
             */
            GUID_MULTIPLIER : 10000,

            /*
             *
             */
            regExp : {
                TRIM : /^\s+|\s+$/g,
                WHITESPACE : /\s+/g
            }
        }
    };

    /**
     * @class {static} o2.StringHelper
     *
     * <p>A <strong>String</strong> helper <strong>class</strong>.</p>
     */
    me.StringHelper = {

        /**
         * @function {static} o2.StringHelper.generateGuid
         *
         * <p>Creates a globally unique identifier (i.e. <strong>GUID</strong>),
         * for that browsing session.</p>
         *
         * @return a <strong>GUID</strong>.
         */
        generateGuid : function() {
            return [(new Date()).getTime(), Math.floor(
                config.constants.GUID_MULTIPLIER * Math.random())].join('');
        },

        /**
         * @function {static} o2.StringHelper.generateRandom
         *
         * <p>Generates a random <strong>String</strong>.</p>
         *
         * @param {Integer} length - (optional - default: {@link
         * StringHelper.config.constants.DEFAULT_RANDOM_LENGTH})
         * length of the <code>String</code> to be generated.
         *
         * @return the generated <code>String</code>.
         */
        generateRandom : function(length) {
            var chars = config.constants.RANDOM_CHAR_FEED;
            var len = length || config.constants.DEFAULT_RANDOM_LENGTH;
            var charsLength = chars.length;
            var randomNumber = 0;
            var buffer = [];
            var i = 0;

            for (i = 0; i < len; i++) {
                randomNumber = Math.floor(Math.random() * charsLength);
                buffer.push(chars.substring(randomNumber, randomNumber + 1));
            }

            return buffer.join('');
        },

        /**
         * @function {static} o2.StringHelper.concat
         *
         * <p>Concatanes all its arguments into a single <strong>String</strong>.
         * This is faster than adding those <strong>String</strong>s with
         * <code>+</code>.</p>
         *
         * @return the concataneted <strong>String</strong>.
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
         * @return the formated <strong>String</strong>.
         */
        format : function() {
            var args = arguments;

            if (args.length === 0) {
                return null;
            }

            if (args.length === 1) {
                return args[0];
            }

            var pattern = new RegExp(['{', '([0-', (args.length - 2), '])', '}'].join(''), 'g');
            var lastMatch = null;

            return args[0].replace(pattern, function(match, index) {
                lastMatch = match;

                return args[+index + 1];
            });
        },

        /**
         * @function {static} o2.StringHelper.remove
         *
         * <p>Simply removes the phrases that match the <code>RegExp</code> from
         * the <strong>String</strong>.</p>
         *
         * @param {String} str - the <strong>String</strong> to process.
         * @param {RegExp} regExp - the <code>RegExp</code> to process agains.
         *
         * @return the processed <strong>String</strong>.
         */
        remove : function(str, regExp) {
            return str.replace(regExp, '');
        },

        /**
         * @function {static} o2.StringHelper.trim
         *
         * <p>Trims white space from beginning and end of the
         * <strong>String</strong>.</p>
         *
         * @param {String} str - the <strong>String</strong> to process.
         * @param {Boolean} shouldCompact - Optional (default:
         * <code>false</code>)
         *     if <code>true</code>, multiple whitespace is compacted into single
         * whitespace.
         *
         * @return the processed <strong>String</strong>.
         */
        trim : function(str, shouldCompact) {
            shouldCompact = shouldCompact || false;

            var constants = config.constants;
            var regExp = constants.regExp;

            return shouldCompact ? str.replace(regExp.WHITESPACE,
                ' ').replace(regExp.TRIM, '') : str.replace(regExp.TRIM, '');
        },

        /**
         * @function {static} o2.StringHelper.strip
         *
         * <p>Simply returns
         * <code>o2.StringHelper.trim(str, false)</code>.
         *
         * @param {String} str - the <strong>String</strong> to strip.
         *
         * @return the stripped <strong>String</strong>.
         *
         * @see o2.StringHelper.trim
         */
        strip : function(str) {
            return me.StringHelper.trim(str, false);
        },

        /**
         * @function {static} o2.StringHelper.compact
         *
         * <p>Works identical to <code>StringHelper.trim(str,
         * true)</code>.</p>
         *
         * @param {String} str - the <strong>String</strong> to process.
         *
         * @return the processed <strong>String</strong>.
         *
         * @see StringHelper.trim
         */
        compact : function(str) {
            return me.StringHelper.trim(str, true);
        }
    };
}(this.o2));
