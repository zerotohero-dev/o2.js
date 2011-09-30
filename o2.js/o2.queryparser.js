/*global o2 */

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
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;

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
            var href = url ? url : window.location.href;
            var index = href.indexOf('?');

            if(index == -1) {
       
                return args;
            }

            var query = href.substring(index + 1);
            var nameValuePairs = query.split('&');

            var nameValuePair = null;
            
            var kNameIndex = 0;
            var kValueIndex = 1;

            for(var i = 0; i < nameValuePairs.length; i++) {
                nameValuePair = nameValuePairs[i].split('=');
                args[nameValuePair[kNameIndex]] = decodeURIComponent(nameValuePair[kValueIndex]);
            }

            return args;

        }

    };

}(o2, this));
