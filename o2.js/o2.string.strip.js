/**
 * @module   string.strip
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-28 21:05:17.842229
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> stripping
 * operations.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'String';

    /*
     * String (strip)
     */
    var me = create(kModuleName);

    /*
     * Common Regular Expressions
     */
    var kNonAlphaNumericRegExp = /[^A-Za-z0-9 ]+/g;
    var kNonAlphaRegExp        = /[^A-Za-z ]+/g;
    var kNonNumericRegExp      = /[^0-9-.]/g;
    var kNumericRegExp         = /[0-9]/g;
    var kTagRegExp             = /<[\/]?([a-zA-Z0-9]+)[^>\^<]*>/ig;

    /*
     * Common Strings
     */
    var kEmpty = '';

    /**
     * @function {static} o2.String.stripNonAlpha
     *
     * <p>Removes non alphabetical characters from the <code>String</code>
     * (excluding numbers).</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'stripNonAlpha', function(str) {
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'stripNonAlphanumeric', function(str) {
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'stripTags', function(str) {
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     -
     * @return the formatted <code>String</code>.
     */
    def(me, 'stripNonNumeric', function(str) {
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    def(me, 'stripNumeric', function(str) {
        return str.replace(kNumericRegExp, kEmpty);
    });
}(this.o2));
