/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window, document) {
    'use strict';

    /**
     * @module   cookie.core
     *
     * @requires core
     * @requires string.core
     *
     * <p>A <strong>Cookie</strong> helper.</p>
     */
    fp.ensure(
        'cookie.core',
    [
        'core',
        'string.core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Cookie',

        /**
         * @class {static} o2.Cookie
         *
         * <p>A <strong>cookie</strong> helper class.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * string.core
         */
        concat = require('String', 'concat'),

        /*
         * native
         */
        escape = attr(window, 'escape'),

        /*
         * # Common Constants
         */

        kBlank         = ' ',
        kDelimeter     = ';',
        kDomain        = '; domain=',
        kEmpty         = '',
        kEquals        = '=',
        kExpires       = '; expires=',
        kNextCharIndex = 1,
        kPath          = '; path=',
        kRootPath      = '/',
        kSecure        = '; secure',

        /*
         * # To be Overridden
         */

        save = null;

    /**
     * @function {static} o2.Cookie.read
     *
     * <p>Reads the value of the <strong>cookie</strong> with the given
     * name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var value = o2.Cookie.read('cookieName');
     * </pre>
     *
     * @param {String} name - the name of the <strong>cookie</strong> to
     * read.
     *
     * @return the value of the <strong>cookie</strong>; or <code>null</code>
     * if the <strong>cookie</strong> is not found.
     */
    exports.read = def(me, 'read', function(name) {
        var ca = document.cookie.split(kDelimeter),
            eq = concat(decodeURIComponent(name), kEmpty),
            i  = 0,
            c  = 0;

        for (i = 0; i < ca.length; i++) {
            c = ca[i];

            while (c.charAt(0) === kBlank) {
                c = c.substring(kNextCharIndex, c.length);
            }

            if (c.indexOf(eq) === 0) {
                return c.substring(eq.length + kNextCharIndex, c.length);
            }
        }

        return null;
    });

    /**
     * @function {static} o2.Cookie.save
     *
     * <p>Saves a <strong>cookie</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Cookie.save('testCookie', 'testValue', 10);
     * </pre>
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
    exports.save = def(me, 'save', function(name, value, days, path, domain,
                isSecure) {
        var d            = new Date(),
            ex           = kEmpty,
            cookiePath   = kEmpty,
            cookieString = kEmpty;

        if (days) {
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            ex = concat(kExpires , d.toGMTString());
        } else {
            ex = kEmpty;
        }

        cookiePath = path || kRootPath;

        // Do not use encodeURICompoent for paths,
        // as it replaces "/" with "%2F".
        cookieString = concat(
            encodeURIComponent(name), kEquals,
            encodeURIComponent(value), ex, kPath,
            escape(cookiePath)
        );

        if (domain) {
            cookieString = concat(cookieString, kDomain, escape(domain));
        }

        if (isSecure) {
            cookieString = concat(cookieString, kSecure);
        }

        document.cookie = cookieString;
    });

    /*
     *
     */
    save = require(kModuleName, 'save');

    /**
     * @function {static} o2.Cookie.remove
     *
     * <p>Removes a <strong>cookie</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Cookie.remove('testCookie');
     * </pre>
     *
     * @param {String} name - the name of the <strong>cookie</strong> to
     * remove.
     * @param {String} path - (optional) the path of the cookie.
     * @param {String} domain - (optional) the domain of the cookie.
     * @param {Boolean} isSecure - (optional) will the cookie be used for a
     * secure connection.
     */
    exports.remove = def(me, 'remove', function(name, path, domain) {
        save(name, kEmpty, -1, path || kRootPath, domain || null);
    });

    // removeAll makes things too complicated if path, and domain
    // come into play... Will not implement it.
    // removeAll : function(){ }
}(this.o2, this.o2.protecteds, this, this.document));

