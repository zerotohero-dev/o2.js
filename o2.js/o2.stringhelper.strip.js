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

if(!o2.StringHelper) {
    o2.StringHelper = {};
}

/**
 * @module o2.stringhelper.strip
 * @requires o2
 *
 * <p>This package is responsible for simple <code>String</code> stripping
 * operations.</p>
 */
( function(me, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            regExp : {
                NON_ALPHA : /[^A-Za-z ]+/g,
                NON_ALPHANUMERIC : /[^A-Za-z0-9 ]+/g,
                NON_NUMERIC : /[^0-9-.]/g,
                NUMERIC : /[0-9]/g,
                TAG : /<[\/]?([a-zA-Z0-9]+)[^>\^<]*>/ig
            }
        }
    };

    /**
     * @function {static} o2.StringHelper.stripNonAlpha
     *
     * <p>Removes non alphabetical characters from the <code>String</code>
     * (excluding
     * numbers).</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.stripNonAlpha = function(str) {

        return str.replace(config.constants.regExp.NON_ALPHA, '');

    };

    /**
     * @function {static} o2.StringHelper.stripNonAlphanumeric
     *
     * <p>Removes alpha numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.stripNonAlphanumeric = function(str) {

        return str.replace(config.constants.regExp.NON_ALPHANUMERIC, '');

    };

    /**
     * @function {static} o2.StringHelper.stripNonNumeric
     *
     * <p>Removes non numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.stripNonNumeric = function(str) {

        return str.replace(config.constants.regExp.NON_NUMERIC, '');

    };

    /**
     * @function {static} o2.StringHelper.stripNumeric
     *
     * <p>Removes numeric characters from the <code>String</code>.</p>
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.stripNumeric = function(str) {

        return str.replace(config.constants.regExp.NUMERIC, '');

    };

    /**
     * @function {static} o2.StringHelper.stripTags
     *
     * <p>Removes tags from the <code>String</code>.
     *
     * @param {String} str - the <code>String</code> to format.
     * @return the formatted <code>String</code>.
     */
    me.stripTags = function(str) {

        return str.replace(config.constants.regExp.TAG, '');

    };

}(o2.StringHelper, this));
