/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window, document) {
    'use strict';

    /**
     * @module   jsonp.core
     *
     * @requires core
     * @requires string.core
     *
     * <p>An object to make <strong>JSONP</strong> calls.</p>
     */
    fp.ensure(
        'jsonp.core',
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

        kModuleName = 'Jsonp',

        /**
         * @class {static} o2.Jsonp
         *
         * <p>An object to make <strong>JSONP</strong> calls.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        frameworkName = require('name'),
        nill          = require('nill'),

        /*
         * string.core
         */
        concat = require('String', 'concat'),

        /*
         * # Common Constants
         */

        kAnd      = '&',
        kCallback = 'callback',
        kEmpty    = '',
        kEquals   = '=',
        kHead     = 'head',
        kJson     = concat(frameworkName, '_json_'),
        kLoaded   = 'loaded',
        kQuery    = '?',
        kScript   = 'script',

        /*
         * # Static State
         */

        counter = 0;

    /*
     *
     */
    function load(url) {
        var done   = false,
            head   = document.getElementsByTagName(kHead)[0],
            script = document.createElement(kScript);

        script.async = true;
        script.src   = url;

        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState === kLoaded)) {
                done = true;

                script.onload = script.onreadystatechange = nill;

                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        };

        head.appendChild(script);
    }

    /*
     *
     */
    function createQuery(params) {
        var key   = null,
            query = kEmpty;

        for (key in params) {
            if (params.hasOwnProperty(key)) {
                query = concat(query,
                    key, kEquals, encodeURIComponent(params[key]),
                    kAnd);
            }
        }

        return query;
    }

    /**
     * @function {static} o2.Jsonp.get
     *
     * <p>Creates a <strong>JSONP</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Jsonp.get('http://example.com/api.php', {param: 'value'},
     *      function(data) {
     *
     *      }
     * );
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>JSONP</strong> service.
     * @param {Object} params - parameters in the form of {name1:value1,...}
     * @param {Function} callback - callback to execute after
     * <strong>JSONP</strong> arrives.
     */
    exports.get = def(me, 'get', function(url, params, callback) {
        var query = createQuery(params),
            jsonp = concat(kJson, (++counter));

        params = params || {};

        window[jsonp] = function(data) {
            callback(data, params);
            window[jsonp] = null;

            delete window[jsonp];
        };

        load(concat(url, kQuery, query, kCallback, kEquals, jsonp));

        return jsonp;
    });
}(this.o2, this.o2.protecteds, this, this.document));
