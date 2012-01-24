/**
 * @module stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-24 08:41:03.402184
 * -->
 *
 * <p>A <code>String</code> helper.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases
     */
    var me     = framework;
    var slice  = Array.prototype.slice;
    var floor  = Math.floor;
    var random = Math.random;

    /*
     * Common Constants
     */
    var kBlank               = ' ';
    var kEmpty               = '';
    var kGlobal              = 'g';
    var kNumeric             = '([0-9]+)';
    var kRandomCharFeed      = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var kFormatStart         = '{';
    var kFormatEnd           = '}';

    /*
     * Default length for generating a random <strong>String</strong>s.
     */
    var kDefaultRandomLength = 8;

   /*
    * Common Regular Expressions
    */
    var kWhitespaceRegExp = /\s+/g;
    var kTrimRegExp       = /^\s+|\s+$/g;
    var kPrintfRegExp     = /(%(\w+):s)|(%s)/g;

    /*
     * Printf Replacement Indexes.
     */
    var kReplaceParameterStartIndex = 1;
    var kParametrizedMatchIndex     = 2;
    var kAllIndex                   = 0;

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
            return (
                (new Date()).getTime()+Math.random() * (1 << 30)
            ).toString(16).replace('.', '');
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
            var len = length || kDefaultRandomLength;

            var chars = kRandomCharFeed;
            var charsLength = chars.length;

            var randomNumber = 0;
            var i = 0;

            var buffer = [];

            for (i = 0; i < len; i++) {
                randomNumber = floor(random() * charsLength);

                buffer.push(chars.substring(randomNumber, randomNumber + 1));
            }

            return buffer.join(kEmpty);
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
            return slice.call(arguments).join(kEmpty);
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

            var pattern = new RegExp([kFormatStart, kNumeric,
                kFormatEnd].join(kEmpty), kGlobal);

            return args[0].replace(pattern, function(match, index) {
                var dummy = null;
                dummy = match;

                return args[(+index) + 1];
            });
        },

        /**
         * @function {static} o2.StringHelper.printf
         *
         * <p>Works similar to <strong>C</strong>'s <strong>printf</strong>
         * function.</p>
         *
         * <p>Usage example:</p>
         *
         * <pre>
         * var test1 = 'lorem %s %s sit amet';
         * var test2 = 'lorem %1:s %2:s sit %2:s amet %1:s';
         *
         * //This will return 'lorem ipsum dolor sit amet''
         * o2.StringHelper.printf(test1, 'ipsum', 'dolor');
         *
         * //This will return 'lorem ipsum dolor sit dolor amet ipsum'
         * o2.StringHelper.printf(test1, 'ipsum', 'dolor');
         * </pre>
         *
         * @param {String} str - the <code>String</code> to format.
         *
         * @return the formatted <code>String</code>.
         */
        printf : function(str) {
            var lastMatch = 0;
            var buffer = [];

            var index = kReplaceParameterStartIndex;

            var result = kPrintfRegExp.exec(str);

            while (result) {
                buffer.push(str.substring(lastMatch, result.index));

                if (!result[kParametrizedMatchIndex]) {
                    buffer.push(arguments[index++]);
                } else if (
                    arguments.hasOwnProperty(
                        result[kParametrizedMatchIndex]
                    )
                ) {
                    buffer.push(arguments[result[kParametrizedMatchIndex]]);
                } else {
                    buffer.push(result[kAllIndex]);
                }

                lastMatch = result.index + result[kAllIndex].length;

                result = kPrintfRegExp.exec(str);
            }

            buffer.push(str.substr(lastMatch));

            return buffer.join(kEmpty);
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
            return [kEmpty, str].join(kEmpty).replace(regExp, kEmpty);
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

            str = [kEmpty, str].join(kEmpty);

            return shouldCompact ? str.replace(kWhitespaceRegExp,
                kBlank).replace(kTrimRegExp, kEmpty) :
                str.replace(kTrimRegExp, kEmpty);
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
            return me.StringHelper.trim([kEmpty, str].join(kEmpty), false);
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
            return me.StringHelper.trim([kEmpty, str].join(kEmpty), true);
        }
    };
}(this.o2));
