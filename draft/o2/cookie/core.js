define([
    '../string/core'
], function(
    StringUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * string.core
         */
        concat = StringUtil.concat,

        /*
         * native
         */
        escape = window.escape,

        /*
         * # Common Constants
         */

        kBlank = ' ',
        kDelimeter = ';',
        kDomain = '; domain=',
        kEmpty = '',
        kEquals = '=',
        kExpires = '; expires=',
        kNextCharIndex = 1,
        kPath = '; path=',
        kRootPath = '/',
        kSecure = '; secure',

        /*
         * # To Be Overridden
         */

        save;

    exports.read = function(name) {
        var ca = document.cookie.split(kDelimeter),
            eq = concat(decodeURIComponent(name), kEmpty),
            i,
            c;

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
    };

    exports.save = function(name, value, days, path, domain, isSecure) {
        var d = new Date(),
            ex = kEmpty,
            cookiePath = kEmpty,
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
    };

    /*
     *
     */
    save = exports.save;

    exports.remove = function(name, path, domain) {
        save(name, kEmpty, -1, path || kRootPath, domain || null);
    };

    // TODO: open this as an issue for tracking, and close it and label as
    // wontfix
    // removeAll makes things too complicated if path, and domain
    // come into play... Will not implement it.
    // removeAll : function(){ }

    return exports;
});
