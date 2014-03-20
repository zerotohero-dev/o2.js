/**
 * @module   string.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-02 22:47:21.699341
 * -->
 *
 * <p>A <code>String</code> helper.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'String';

    /**
     * @class {static} o2.String
     *
     * <p>A <code>String</code> helper <strong>class</strong>.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var floor  = attr(Math, 'floor');
    var random = attr(Math, 'random');
    var slice  = attr(Array.prototype, 'slice');

    var trim   = String.prototype.trim;

    /*
     * Common Constants
     */
    var kBlank          = ' ';
    var kDecimalPoint   = '.';
    var kEmpty          = '';
    var kFormatEnd      = '}';
    var kFormatStart    = '{';
    var kGlobal         = 'g';
    var kNumeric        = '([0-9]+)';
    var kRandomCharFeed = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    /*
     * Default length for generating a random <code>String</code>s.
     */
    var kDefaultRandomLength = 8;

   /*
    * Common Regular Expressions
    */
    var kPrintfRegExp     = /(%(\w+):s)|(%s)/g;
    var kTrimRegExp       = /^\s+|\s+$/g;
    var kWhitespaceRegExp = /\s+/g;

    /*
     * Printf Replacement Indexes
     */
    var kAllIndex                   = 0;
    var kParametrizedMatchIndex     = 2;
    var kReplaceParameterStartIndex = 1;

    /*
     * Guid
     */
    var kGuidRadix = 36;
    var kGuidShift = 30;

    /**
     * @function {static} o2.String.concat
     *
     * <p>Concatanes all its arguments into a single <code>String</code>.
     * This is faster than adding those <code>String</code>s with
     * <code>+</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var joined = o2.String.concat('lorem', ipsum);
     * </pre>
     *
     * @return the concataneted <code>String</code>.
     */
    exports.concat = def(me, 'concat', function() {
        return slice.call(arguments).join(kEmpty);
    });

    /*
     *
     */
    var concat = require(kModuleName, 'concat');

    /**
     * @function {static} o2.String.format
     *
     * <p>Works similar to <strong>C#</strong>'s
     * <code>String.Format</code>.</p>
     *
     * <p>Usage example:<p>
     *
     * <pre>
     * o2.String.format("Hello {0}. What's going on in {1}?", 'Ninja',
     * 'California');
     * //will return "Hello Ninja. What's going on in California"
     * </pre>
     *
     * @return the formated <code>String</code>.
     */
    exports.format = def(me, 'format', function() {
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
            dummy     = match;

            return args[(+index) + 1];
        });
    });

    /**
     * @function {static} o2.String.generateGuid
     *
     * <p>Creates a globally unique identifier (i.e. <strong>GUID</strong>),
     * for that browsing session.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var guid = o2.String.generateGuid();
     * </pre>
     *
     * @return a <strong>GUID</strong>.
     */
    exports.generateGuid = def(me, 'generateGuid', function() {
        return (
            (new Date()).getTime() + Math.random() * (1 << kGuidShift)
        ).toString(kGuidRadix).replace(kDecimalPoint, kEmpty);
    });

    /**
     * @function {static} o2.String.generateRandom
     *
     * <p>Generates a random <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var rnd = o2.String.generateRandom();
     * </pre>
     *
     * @param {Integer} length - (optional - default: {@link
     * String.config.constants.DEFAULT_RANDOM_LENGTH})
     * length of the <code>String</code> to be amd.
     *
     * @return the amd <code>String</code>.
     */
    exports.generateRandom = def(me, 'generateRandom', function(length) {
        var buffer       = [];
        var chars        = kRandomCharFeed;
        var charsLength  = chars.length;
        var i            = 0;
        var len          = length || kDefaultRandomLength;
        var randomNumber = 0;

        for (i = 0; i < len; i++) {
            randomNumber = floor(random() * charsLength);

            buffer.push(chars.substring(randomNumber, randomNumber + 1));
        }

        return buffer.join(kEmpty);
    });

    /**
     * @function {static} o2.String.printf
     *
     * <p>Works similar to <strong>C</strong>'s <strong>printf</strong>
     * function.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var test1 = 'lorem %s %s sit amet';
     * var test2 = 'lorem %1:s %2:s sit %2:s amet %1:s';
     * var test3 = 'lorem %id:s ipsum';
     *
     * //This will return 'lorem ipsum dolor sit amet''
     * o2.String.printf(test1, 'ipsum', 'dolor');
     *
     * //This will return 'lorem ipsum dolor sit dolor amet ipsum'
     * o2.String.printf(test1, 'ipsum', 'dolor');
     *
     * //This will return 'lorem test ipsum'.
     * o2.String.printf(test3, {id : 'test'});
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.printf = def(me, 'printf', function(str) {
        var buffer    = [];
        var index     = kReplaceParameterStartIndex;
        var lastMatch = 0;
        var result    = kPrintfRegExp.exec(str);
        var rep       = null;
        var par       = null;

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
    });

    /**
     * @function {static} o2.String.remove
     *
     * <p>Simply removes the phrases that match the <code>RegExp</code> from
     * the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var removed = o2.String.remove('lorem', /e/ig);
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {RegExp} regExp - the <code>RegExp</code> to process against.
     *
     * @return the processed <code>String</code>.
     */
    exports.remove = def(me, 'remove', function(str, regExp) {
        return concat(kEmpty, str).replace(regExp, kEmpty);
    });

    if (trim) {

        /**
         * @function {static} o2.String.trim
         *
         * <p>Trims white space from beginning and end of the
         * <code>String</code>.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var trimmed = o2.String.trim('    lorem     ');
         * </pre>
         *
         * @param {String} str - the <code>String</code> to process.
         * @param {Boolean} shouldCompact - Optional (default:
         * <code>false</code>)
         *     if <code>true</code>, multiple whitespace is compacted into single
         * whitespace.
         *
         * @return the processed <code>String</code>.
         */
        exports.trim = def(me, 'trim', function(str, shouldCompact) {
            var s           = concat(kEmpty, str);
            var willCompact = shouldCompact || false;

            return willCompact ?
                s.replace(kWhitespaceRegExp, kBlank).trim() :
                s.trim();
        });
    } else {
        exports.trim = def(me, 'trim', function(str, shouldCompact) {
            var s           = concat(kEmpty, str);
            var willCompact = shouldCompact || false;

            return willCompact ?
                s.replace(kWhitespaceRegExp, kBlank).replace(
                    kTrimRegExp, kEmpty) :
                s.replace(kTrimRegExp, kEmpty);
        });
    }

    var strim = require(kModuleName, 'trim');

    /**
     * @function {static} o2.String.compact
     *
     * <p>Works identical to <code>String.trim(str,
     * true)</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var compacted = o2.String.compact('   lorem      ipsum     ');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     *
     * @return the processed <code>String</code>.
     *
     * @see String.trim
     */
    exports.compact = def(me, 'compact', function(str) {
        return strim(concat(kEmpty, str), true);
    });
}(this.o2));
