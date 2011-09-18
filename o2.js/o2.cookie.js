/*global o2 */

/**
 * @module o2.cookie.core
 * @requires o2
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>Cookie</strong> helper.</p>
 */
//VMERGE: merge with fw.
( function(o2, window, UNDEFINED) {

    /**
     * @class {static} o2.Cookie
     *
     * <p>A <strong>cookie</strong> helper class.</p>
     */
    o2.Cookie = {

        /**
         * @function {static} o2.Cookie.save
         *
         * <p>Saves a <strong>cookie</strong>.
         *
         * @param {String} name - the name of the <strong>cookie</strong>.
         * @param {String} value - the value of the <strong>cookie</strong>.
         * @param {Integer} days - how many days should the
         * <strong>cookie</strong>
         * persist.
         */
        save : function(name, value, days) {

            var ex = '';

            if(days) {
                var d = new Date();
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                ex = '; expires=' + d.toGMTString();
            } else {
                ex = '';
            }

            document.cookie = [name, '=', value, ex, '; path=/'].join('');

        },

        /**
         * @function {static} o2.Cookie.read
         *
         * <p>Reads the value of the <strong>cookie</strong> with the given
         * name.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong> to
         * read.
         * @return the value of the <strong>cookie</strong>; or <code>null</code>
         * if the
         * <strong>cookie</strong> is not found.
         */
        read : function(name) {

            var eq = [name, '='].join('');
            var ca = document.cookie.split(';');

            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while(c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }

                if(c.indexOf(eq) === 0) {

                    return c.substring(eq.length, c.length);
                }
            }

            return null;

        },

        /**
         * @function {static} o2.Cookie.remove
         *
         * <p>Removes a <strong>cookie</strong>.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong> to
         * remove.
         */
        remove : function(name) {

            o2.Cookie.save(name, '', -1);

        },

        /**
         * @function {static} o2.Cookie.removeAll
         *
         * <p>Removes all the <strong>HttpOnly</strong> cookies the belong the
         * the current domain
         * and all paths (i.e. "... <code>domain=example.com path=/;</code>"). If
         * the cookie is set for a specific subdomain,
         * or if it has a specific path other than "/", then it won't be deleted.
         * Similarly, if the cookie is not marked with <strong>HttpOnly</strong>
         * flag, it won't be deleted.</p>
         */
        removeAll : function() {

            var cookies = document.cookie.split(";");

            // document.cookie = name + "=; expires=" + +new Date + "; domain=" +
            // domain + "; path=" + path;
            var remove = o2.Cookie.remove;

            for(var i = 0, len = cookies.length; i < len; i++) {
                remove(cookies[i].split('=')[0]);
            }

        }

    };

}(o2, this));
