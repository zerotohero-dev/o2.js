/**
 * @module   cookie.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>Cookie</strong> helper.</p>
 */

(function(framework, window, document) {
    'use strict';

    /*
     * Aliases
     */
    var me     = framework;
    var concat = framework.StringHelper.concat;
    var escape = window.escape;

    /*
     * Common Strings
     */
    var kEmpty     = '';
    var kBlank     = ' ';
    var kExpires   = '; expires=';
    var kPath      = '; path=';
    var kDomain    = '; domain=';
    var kSecure    = '; secure';
    var kDelimeter = ';';
    var kRootPath  = '/';
    var kEquals    = '=';

    /**
     * @class {static} o2.Cookie
     *
     * <p>A <strong>cookie</strong> helper class.</p>
     */
    me.Cookie = {

        /**
         * @function {static} o2.Cookie.save
         *
         * <p>Saves a <strong>cookie</strong>.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong>.
         * @param {String} value - the value of the <strong>cookie</strong>.
         * @param {Integer} days - (optional) how many days should the
         * <strong>cookie</strong> persist.
         * @param {String} path - (optional) the path of the cookie.
         * @param {String} domain - (optional) the domain of the cookie.
         * @param {Boolean} isSecure - (optional) will the cookie be used for a
         * secure connection.
         */
        save : function(name, value, days, path, domain, isSecure) {
            var ex = '';
            var d = new Date();

            if (days) {
                d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
                ex = concat(kExpires , d.toGMTString());
            } else {
                ex = kEmpty;
            }

            var cookiePath = path || kRootPath;

            // Do not use encodeURICompoent for paths as it replaces / with %2F
            var cookieString = concat(
                encodeURIComponent(name),
                kEquals,
                encodeURIComponent(value),
                ex,
                kPath,
                escape(cookiePath)
            );

            if (domain) {
                cookieString = concat(cookieString, kDomain, escape(domain));
            }

            if (isSecure) {
                cookieString = concat(cookieString, kSecure);
            }

            document.cookie = cookieString;
        },

        /**
         * @function {static} o2.Cookie.read
         *
         * <p>Reads the value of the <strong>cookie</strong> with the given
         * name.</p>
         *
         * @param {String} name - the name of the <strong>cookie</strong> to
         * read.
         *
         * @return the value of the <strong>cookie</strong>; or <code>null</code>
         * if the <strong>cookie</strong> is not found.
         */
        read : function(name) {
            var eq = concat(decodeURIComponent(name), kEmpty);
            var ca = document.cookie.split(kDelimeter);
            var i = 0;
            var kNextCharIndex = 1;

            for (i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) === kBlank) {
                    c = c.substring(kNextCharIndex, c.length);
                }

                if (c.indexOf(eq) === 0) {
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
         * @param {String} path - (optional) the path of the cookie.
         * @param {String} domain - (optional) the domain of the cookie.
         * @param {Boolean} isSecure - (optional) will the cookie be used for a
         * secure connection.
         */
        remove : function(name, path, domain) {
            me.Cookie.save(name, kEmpty, -1, path || kRootPath, domain || null);
        }

        // removeAll makes things too complicated if path, and domain
        // come into play... Will not implement it.
        // removeAll : function(){ }
    };
}(this.o2, this, this.document));
