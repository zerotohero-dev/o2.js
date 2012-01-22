/**
 * @module queryparser
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>query string</strong> parser.</p>
 */
(function(framework, window) {
    'use strict';

    /*
     * Aliases
     */
    var me       = framework;
    var location = window.location;

    /*
     * Common Strings
     */
    var kAnd    = '&';
    var kQuery  = '?';
    var kEquals = '=';

    /*
     * Common Indexes
     */
    var kNameIndex  = 0;
    var kValueIndex = 1;

    /**
     * @class {static} o2.QueryParser
     *
     * <p>Used for parsing the browser's <strong>query string</strong>.</p>
     */
    me.QueryParser = {

        /**
         * @function {static} o2.QueryParser.parse
         *
         * <p>Parses the <strong>query string</strong>.</p>
         *
         * @param {String} url - (Optional) if given, parses the
         * <strong>URL</strong>.
         * given, parses <code>window.location.href</code> otherwise.
         *
         * @return the parsed <strong>query string</strong> as a {name1:value1,
         * name2:value2} <code>Object</code>.
         */
        parse : function(url) {
            var args = {};
            var href = url || location.href;
            var index = href.indexOf(kQuery);

            if (index === -1) {
                return args;
            }

            var query = href.substring(index + 1);
            var nameValuePairs = query.split(kAnd);
            var nameValuePair = null;
            var i = 0;

            for (i = 0; i < nameValuePairs.length; i++) {
                nameValuePair = nameValuePairs[i].split(kEquals);
                args[nameValuePair[kNameIndex]] = decodeURIComponent(
                    nameValuePair[kValueIndex]);
            }

            return args;
        }

        //TODO: add documentation.
        encode : function(collection) {
            var delimeter = kAnd;
            var equals = kEquals;

            var key = null;
            var buffer = [];

            for (key in collection) {
                buffer.push(encodeURIComponent(key));
                buffer.push(equals);
                buffer.push(encodeURIComponent(collection[key]));
            }

            buffer.sort();

            return buffer.join(delimeter);
        }
    };
}(this.o2, this));
