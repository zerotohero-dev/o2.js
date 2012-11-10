/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window) {
    'use strict';

    /**
     * @module   querystring.core
     *
     * @requires core
     *
     * <p>A <strong>query string</strong> parser.</p>
     */
    fp.ensure(
        'querystring.core',
    [
        'core'
    ]);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * # Module Exports
         */
        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'QueryString',

        /**
         * @class {static} o2.QueryString
         *
         * <p>Used for parsing the browser's <strong>query string</strong>.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * native
         */
        location = attr(window, 'location'),

        /*
         * # Common Strings
         */

        kAnd    = '&',
        kEquals = '=',
        kQuery  = '?',
        kEmpty  = '',

        /*
         * # Common Indexes
         */

        kNameIndex  = 0,
        kValueIndex = 1;

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
        var key    = null,
            buffer = [];

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
        var args           = {},
            href           = url || location.href,
            index          = href.indexOf(kQuery),
            i              = 0,
            nameValuePair  = null,
            nameValuePairs = null,
            query          = kEmpty;

        if (index === -1) {return args;}

        query          = href.substring(index + 1);
        nameValuePairs = query.split(kAnd);

        for (i = 0; i < nameValuePairs.length; i++) {
            nameValuePair = nameValuePairs[i].split(kEquals);
            args[nameValuePair[kNameIndex]] = decodeURIComponent(
                nameValuePair[kValueIndex]);
        }

        return args;
    });
}(this.o2, this.o2.protecteds, this));
