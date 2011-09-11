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
 * @module o2.supports
 * @requires "all modules that the support will be checked"
 *
 * <p>An object support checker.</p>
 */
( function(o2, window, UNDEFINED) {

    /**
     * @class {static} o2.Supports
     *
     * <p>Checks support for various objects and properties like
     * <strong>DOM</strong>
     * and <strong>cookie</strong>s.</p>
     */
    o2.Supports = {

        /**
         * @function {static} o2.Supports.cookie
         *
         * <p>Checks for <strong>cookie</strong> support.</p>
         *
         * @return <code>true</code> if <strong>cookie</strong>s are supported,
         * <code>false</code> otherwise.
         */
        cookie : function() {

            var kTestCookie = 'o2jsTest';
            var cookie = o2.Cookie;

            cookie.save(kTestCookie, kTestCookie, 1);

            var value = null;

            try {
                value = cookie.read(kTestCookie);
            } catch(ignore) {
            }

            if(!value) {
                return false;
            }

            cookie.remove(kTestCookie);

            return true;

        },

        /**
         * @function {static} o2.Supports.dom
         *
         * <p>Checks whether <strong>DOM</strong> is adequately supported.
         *
         * @return <code>true</code> if <strong>DOM</strong> is supported,
         * <code>false</code> otherwise.
         */
        dom : function() {

            return document.getElementById && document.createElement && document.getElementsByTagName;

        },

        /**
         * @function {static} o2.Supports.ajax
         *
         * <p>Checks whether <strong>AJAX</strong> is supported.
         *
         * @return <code>true</code> if <strong>AJAX</strong> is supported,
         * <code>false</code> otherwise.
         */
        ajax : function() {

            return !!o2.Ajax.createXhr();

        }

    };

}(o2, this));
