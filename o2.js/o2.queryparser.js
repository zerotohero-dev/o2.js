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

/**
 * @module o2.queryparser
 * @requires o2
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
