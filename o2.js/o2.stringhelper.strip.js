/**
 * @module stringhelper.strip
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> stripping
 * operations.</p>
 */
(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.StringHelper;

    /*
     * Module configuration.
     */
    var config = {

        /*
         *
         */
        constants : {

            /*
             *
             */
            regExp : {
                NON_ALPHA : /[^A-Za-z ]+/g,
                NON_ALPHANUMERIC : /[^A-Za-z0-9 ]+/g,
                NON_NUMERIC : /[^0-9-.]/g,
                NUMERIC : /[0-9]/g,
                TAG : /<[\/]?([a-zA-Z0-9]+)[^>\^<]*>/ig
            }
        }
    };

    /*
     * Common regular expressions.
     */
    var ccr = config.constants.regExp;
    var kRegNonAlpha = ccr.NON_ALPHA;
    var kRegNonAlphaNumeric = ccr.NON_ALPHANUMERIC;
    var kRegNonNumeric = ccr.NON_NUMERIC;
    var kRegNumeric = ccr.NUMERIC;
    var kRegTag = ccr.TAG;

    /*
     * Common strings.
     */
    var kEmpty = '';

    /**
     * @function {static} o2.StringHelper.stripNonAlpha
     *
     * <p>Removes non alphabetical characters from the <code>String</code>
     * (excluding numbers).</p>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    me.stripNonAlpha = function(str) {
        return str.replace(kRegNonAlpha, kEmpty);
    };

    /**
     * @function {static} o2.StringHelper.stripNonAlphanumeric
     *
     * <p>Removes alpha-numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    me.stripNonAlphanumeric = function(str) {
        return str.replace(kRegNonAlphaNumeric, kEmpty);
    };

    /**
     * @function {static} o2.StringHelper.stripNonNumeric
     *
     * <p>Removes non-numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     -
     * @return the formatted <code>String</code>.
     */
    me.stripNonNumeric = function(str) {
        return str.replace(kRegNonNumeric, kEmpty);
    };

    /**
     * @function {static} o2.StringHelper.stripNumeric
     *
     * <p>Removes numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    me.stripNumeric = function(str) {
        return str.replace(kRegNumeric, kEmpty);
    };

    /**
     * @function {static} o2.StringHelper.stripTags
     *
     * <p>Removes tags from the <code>String</code>.
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    me.stripTags = function(str) {
        return str.replace(kRegTag, kEmpty);
    };
}(this.o2));
