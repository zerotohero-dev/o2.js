/*global o2, escape */

/**
 * @module cookie.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>Cookie</strong> helper.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;

    /**
     * @class {static} Cookie
     *
     * <p>A <strong>cookie</strong> helper class.</p>
     */
    me.Cookie = {

        /**
         * @function {static} Cookie.save
         *
         * <p>Saves a <strong>cookie</strong>.
         *
         * @param {String} name - the name of the <strong>cookie</strong>.
         * @param {String} value - the value of the <strong>cookie</strong>.
         * @param {Integer} days - how many days should the
         * <strong>cookie</strong>
         * persist.
         */
        save : function(name, value, days, path, domain, isSecure) {

            var ex = '';

            if(days) {
                var d = new Date();
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                ex = '; expires=' + d.toGMTString();
            } else {
                ex = '';
            }

            var cookiePath = path ? path : '/';

            // Do not use encodeURICompoent for paths as it replaces / with
            // %2F
            var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ex + '; path=' + escape(cookiePath);

            if(domain) {
                cookieString += '; domain=' + escape(domain);
            }

            if(isSecure) {
                cookieString += '; secure';
            }

            document.cookie = cookieString;

        },

        /**
         * @function {static} Cookie.read
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

            var eq = [decodeURIComponent(name), '='].join('');
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
         * @function {static} Cookie.remove
         *
         * <p>Removes a <strong>cookie</strong>.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong> to
         * remove.
         */
        //TODO: update all documentation of this file.
        remove : function(name, path, domain, isSecure) {

            var cookiePath = path ? path : '/';
            var cookieDomain = domain ? domain : null;
            var isCookieSecure = !!isSecure;

            me.Cookie.save(name, '', -1, cookiePath, cookieDomain, isCookieSecure);

        },

        /**
         * @function {static} Cookie.removeAll
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
            var remove = me.Cookie.remove;

            for(var i = 0, len = cookies.length; i < len; i++) {
                remove(cookies[i].split('=')[0]);
            }

        }

    };

}(o2, this));
