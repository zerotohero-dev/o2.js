/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, document) {
    'use strict';

    /**
     * @module   supports.core
     *
     * @requires core
     *
     * <p>An object support checker.</p>
     */
    fp.ensure(
        'supports.core',
    [
        'core'
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

        kModuleName = 'Supports',

        /**
         * @class {static} o2.Supports
         *
         * <p>Checks support for various objects and properties like
         * <strong>DOM</strong> and <strong>cookie</strong>s.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        myName = require('name'),

        /*
         * # Feature Detection
         */

        /*
         * <code>true</code> if there's an adequate level of
         * <strong>DOM</strong> support.
         */
        isDomSupported = document.getElementById &&
            document.createElement && document.getElementsByTagName,

        /*
         * # Common Constants
         */

        kEmpty            = '',
        kTestCookiePrefix = 'tst';

    /**
     * @function {static} o2.Supports.ajax
     *
     * <p>Checks whether <strong>AJAX</strong> (At least XmlHttpRequest Level 1)
     * is supported.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isAjaxSupported = o2.Supports.ajax();
     * </pre>
     *
     * @return <code>true</code> if <strong>AJAX</strong> is supported,
     * <code>false</code> otherwise.
     *
     * @throws Exception - if <code>o2.Ajax</code> does not exist.
     */
    exports.ajax = def(me, 'ajax', function() {
        return !!require('Ajax', 'createXhr')();
    });

    /**
     * @function {static} o2.Supports.cookie
     *
     * <p>Checks for <strong>cookie</strong> support.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isCookieSupported = o2.Supports.cookie();
     * </pre>
     *
     * @return <code>true</code> if <strong>cookie</strong>s are supported,
     * <code>false</code> otherwise.
     *
     * @throws Exception - if <code>o2.Cookie</code> does not exist.
     */
    exports.cookie = def(me, 'cookie', function() {
        var testCookieName = [myName, kTestCookiePrefix].join(kEmpty),
            value = null,

            kCookie = 'Cookie',
            save    = require(kCookie, 'save'),
            read    = require(kCookie, 'read'),
            remove  = require(kCookie, 'remove');

        save(testCookieName, testCookieName, 1);

        try {
            value = read(testCookieName);
        } catch(ignore) {}

        if (value) {
            remove(testCookieName);

            return true;
        }

        return false;
    });

    /**
     * @function {static} o2.Supports.dom
     *
     * <p>Checks whether <strong>DOM</strong> is adequately supported.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDomSupported = o2.Supports.dom();
     * </pre>
     *
     * @return <code>true</code> if <strong>DOM</strong> is supported,
     * <code>false</code> otherwise.
     */
    exports.dom = def(me, 'dom', function() {
        return isDomSupported;
    });
}(this.o2, this.o2.protecteds, this.document));

