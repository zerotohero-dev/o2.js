/*global window, o2*/

/**
 * @module o2.supports
 * @requires "all modules that the support will be checked"
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
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
