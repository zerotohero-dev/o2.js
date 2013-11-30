define([
    '../../core',
    '../../string/core'
], function(
    o2,
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
         * ../../core
         */
        frameworkName = o2.name,
        nill = o2.nill,

        /*
         * ../../string/core
         */
        concat = StringUtil.concat,

        /*
         * # Common Constants
         */

        kAnd = '&',
        kCallback = 'callback',
        kEmpty = '',
        kEquals = '=',
        kHead = 'head',
        kJson = concat(frameworkName, '_json_'),
        kLoaded = 'loaded',
        kQuery = '?',
        kScript = 'script',

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

    exports.get = function(url, params, callback) {
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
    };
});
