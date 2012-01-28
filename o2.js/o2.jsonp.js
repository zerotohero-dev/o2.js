/**
 * @module   jsonp
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastUpdate: 2012-01-28 15:16:57.981847
 * -->
 *
 * <p>An object to make <strong>JSONP</strong> calls.</p>
 */

(function(framework, window, document) {
    'use strict';

    /*
     * Aliases
     */
    var myName = framework.name;
    var concat = framework.StringHelper.concat;
    var nill = framework.nill;

    /*
     * State
     */
    var counter = 0;

    /*
     * Common Constants
     */
    var kScript = 'script';
    var kLoaded = 'loaded';
    var kHead = 'head';
    var kQuery = '?';
    var kEquals = '=';
    var kAnd = '&';
    var kJson = concat(myName, '_json_');
    var kCallback = 'callback';

    /*
     *
     */
    function load(url) {
        var script = document.createElement(kScript);
        var done = false;
        var head = document.getElementsByTagName(kHead)[0];

        script.async = true;
        script.src = url;

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
        var query = '';
        var key = null;

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
     * @class {static} o2.Jsonp
     *
     * <p>An object to make <strong>JSONP</strong> calls.</p>
     */
    var me = framework.Jsonp = {};

    /**
     * @function {static} o2.Jsonp.get
     *
     * <p>Creates a <strong>JSONP</strong> request.</p>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>JSONP</strong> service.
     * @param {Object} params - parameters in the form of {name1:value1,...}
     * @param {Function} callback - callback to execute after
     * <strong>JSONP</strong> arrives.
     */
    me.get = function(url, params, callback) {
        var query = createQuery(params);
        var jsonp = concat(kJson, (++counter));

        params = params || {};

        window[jsonp] = function(data) {
            callback(data, params);
            window[jsonp] = null;

            delete window[jsonp];
        };

        load(concat(url, kQuery, query, kCallback, kEquals, jsonp));

        return jsonp;
    };
}(this.o2, this, this.document));
