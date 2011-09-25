/*global o2 */

/**
 * @module supports
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
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    var myName = framework.name;

    /**
     * @class {static} Supports
     *
     * <p>Checks support for various objects and properties like
     * <strong>DOM</strong>
     * and <strong>cookie</strong>s.</p>
     */
    me.Supports = {

        /**
         * @function {static} Supports.cookie
         *
         * <p>Checks for <strong>cookie</strong> support.</p>
         *
         * @return <code>true</code> if <strong>cookie</strong>s are supported,
         * <code>false</code> otherwise.
         */
        cookie : function() {

            var kTestCookie = [myName, 'tst'].join('');

            var cookie = me.Cookie;

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
         * @function {static} Supports.dom
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
         * @function {static} Supports.ajax
         *
         * <p>Checks whether <strong>AJAX</strong> is supported.
         *
         * @return <code>true</code> if <strong>AJAX</strong> is supported,
         * <code>false</code> otherwise.
         */
        ajax : function() {

            return !!me.Ajax.createXhr();

        }

    };

}(o2, this));
