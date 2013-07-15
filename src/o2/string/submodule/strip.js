/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   string.strip
     *
     * @requires core
     *
     * <p>This package is responsible for simple <code>String</code> stripping
     * operations.</p>
     */
    fp.ensure(
        'string.strip',
    [
        'core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'String',

        /*
         * String (strip)
         */
        me = create(kModuleName),

        /*
         * # Common Regular Expressions
         */

        kNonAlphaNumericRegExp = /[^A-Za-z0-9 ]+/g,
        kNonAlphaRegExp        = /[^A-Za-z ]+/g,
        kNonNumericRegExp      = /[^0-9\-.]/g,
        kNumericRegExp         = /[0-9]/g,
        kTagRegExp             = /<[\/]?([a-zA-Z0-9]+)[^>\^<]*>/ig,

        /*
         * # Common Strings
         */

        kEmpty = '';

    /**
     * @function {static} o2.String.stripNonAlpha
     *
     * <p>Removes non alphabetical characters from the <code>String</code>
     * (excluding numbers).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNonAlpha('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.stripNonAlpha = def(me, 'stripNonAlpha', function(str) {
        return str.replace(kNonAlphaRegExp, kEmpty);
    });

    /**
     * @function {static} o2.String.stripNonAlphanumeric
     *
     * <p>Removes alpha-numeric characters from the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNonAlphanumeric('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.stripNonAlphanumeric = def(me, 'stripNonAlphanumeric',
                function(str) {
        return str.replace(kNonAlphaNumericRegExp, kEmpty);
    });

    /**
     * @function {static} o2.String.stripTags
     *
     * <p>Removes tags from the <code>String</code>.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripTags('<p>abc123.!</p>');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.stripTags = def(me, 'stripTags', function(str) {
        return str.replace(kTagRegExp, kEmpty);
    });

    /**
     * @function {static} o2.String.stripNonNumeric
     *
     * <p>Removes non-numeric characters from the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNonNumeric('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     -
     * @return the formatted <code>String</code>.
     */
    exports.stripNonNumeric = def(me, 'stripNonNumeric', function(str) {
        return str.replace(kNonNumericRegExp, kEmpty);
    });

    /**
     * @function {static} o2.String.stripNumeric
     *
     * <p>Removes numeric characters from the <code>String</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var stripped = o2.String.stripNumeric('abc123.!');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.stripNumeric = def(me, 'stripNumeric', function(str) {
        return str.replace(kNumericRegExp, kEmpty);
    });
}(this.o2, this.o2.protecteds));

