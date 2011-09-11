/*global window, o2*/

/**
 * @module o2.queryparser
 * @requires o2
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>A <strong>query string</strong> parser.</p>
 */
( function(o2, window, UNDEFINED) {

    /**
     * @class {static} o2.QueryParser
     *
     * <p>Used for parsing the browser's <strong>query string</strong>.</p>
     */
    o2.QueryParser = {

        /**
         * @function {static} parse
         *
         * <p>Parses the <strong>query string</strong>.</p>
         *
         * @param {String} url - (Optional) if given, parses the
         * <strong>URL</strong>
         * given,
         * parses <code>window.location.href</code> otherwise.
         * @return the parsed <strong>query string</strong> as a {name1:value1,
         * name2:value2}
         * <code>Object</code>.
         */
        parse : function(url) {

            var args = {};
            var href = url ? url : window.location.href;
            var index = href.indexOf('?');

            if(index == -1) {
                return args;
            }
            href = href.substring(index + 1);

            var nameValuePairs = href.split('&');
            var nameValuePair = null;

            for(var i = 0; i < nameValuePairs.length; i++) {
                nameValuePair = nameValuePairs[i].split('=');
                args[nameValuePair[0]] = decodeURIComponent(nameValuePair[1]);
            }

            return args;

        }

    };

}(o2, this));
