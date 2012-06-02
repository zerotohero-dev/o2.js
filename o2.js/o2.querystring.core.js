/**
 * @module   querystring.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-19 16:48:06.696714
 * -->
 *
 * <p>A <strong>query string</strong> parser.</p>
 */
(function(framework, window) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'QueryString';

    /**
     * @class {static} o2.QueryString
     *
     * <p>Used for parsing the browser's <strong>query string</strong>.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var location = attr(window, 'location');

    /*
     * Common Strings
     */
    var kAnd    = '&';
    var kEquals = '=';
    var kQuery  = '?';

    /*
     * Common Indexes
     */
    var kNameIndex  = 0;
    var kValueIndex = 1;

    /**
     * @function {static} o2.QueryString.encode
     *
     * <p>Converts the <strong>JSON</strong> object in parameters into a
     * query string.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var query = {lorem : 'ipsum', dolor : sit};
     * var qs = o2.QueryString.encode(query);
     * </pre>
     *
     */
    exports.encode = def(me, 'encode', function(collection) {
        var key    = null;
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
    });

    /**
     * @function {static} o2.QueryString.parse
     *
     * <p>Parses the <strong>query string</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var params = o2.QueryString.parse(window.location.href);
     * </pre>
     *
     * @param {String} url - (Optional) if given, parses the
     * <strong>URL</strong>.
     * given, parses <code>window.location.href</code> otherwise.
     *
     * @return the parsed <strong>query string</strong> as a {name1:value1,
     * name2:value2} <code>Object</code>.
     */
    exports.parse = def(me, 'parse', function(url) {
        var args  = {};
        var href  = url || location.href;
        var index = href.indexOf(kQuery);

        if (index === -1) {
            return args;
        }

        var i              = 0;
        var nameValuePair  = null;

        var query          = href.substring(index + 1);
        var nameValuePairs = query.split(kAnd);

        for (i = 0; i < nameValuePairs.length; i++) {
            nameValuePair = nameValuePairs[i].split(kEquals);
            args[nameValuePair[kNameIndex]] = decodeURIComponent(
                nameValuePair[kValueIndex]);
        }

        return args;
    });

    return exports;
}(this.o2, this));
