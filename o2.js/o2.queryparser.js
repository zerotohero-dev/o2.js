/**
 * @module queryparser
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-28 13:42:45.245493
 * -->
 *
 * <p>A <strong>query string</strong> parser.</p>
 */
(function(framework, window) {
    'use strict';

    /*
     * Aliases
     */
    var location = window.location;

    /*
     * Common Strings
     */
    var kAnd = '&';
    var kQuery = '?';
    var kEquals = '=';

    /*
     * Common Indexes
     */
    var kNameIndex = 0;
    var kValueIndex = 1;

    /**
     * @class {static} o2.QueryParser
     *
     * <p>Used for parsing the browser's <strong>query string</strong>.</p>
     */
    var me = framework.QueryParser = {};

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
    me.parse = function(url) {
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
    };

    /**
     * @function {static} o2.QueryParser.encode
     *
     * <p>Converts the <strong>JSON</strong> object in parameters into a
     * query string.</p>
     */
    me.encode = function(collection) {
        var key = null;
        var buffer = [];

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                buffer.push(encodeURIComponent(key));
                buffer.push(kEquals);
                buffer.push(encodeURIComponent(collection[key]));
            }
        }

        buffer.sort();

        return buffer.join(kAnd);
    };
}(this.o2, this));
