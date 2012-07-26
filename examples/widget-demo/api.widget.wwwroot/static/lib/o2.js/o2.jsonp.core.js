/**
 * @module   jsonp.core
 * @requires core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-26 19:10:32.635045
 * -->
 *
 * <p>An object to make <strong>JSONP</strong> calls.</p>
 */
(function(framework, window, document) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'Jsonp';

    /**
     * @class {static} o2.Jsonp
     *
     * <p>An object to make <strong>JSONP</strong> calls.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var myName = require('name');
    var nill   = require('nill');

    var concat = require('String', 'concat');

    /*
     * State
     */
    var counter = 0;

    /*
     * Common Constants
     */
    var kAnd      = '&';
    var kCallback = 'callback';
    var kEmpty    = '';
    var kEquals   = '=';
    var kHead     = 'head';
    var kJson     = concat(myName, '_json_');
    var kLoaded   = 'loaded';
    var kQuery    = '?';
    var kScript   = 'script';

    /*
     *
     */
    function load(url) {
        var done   = false;
        var head   = document.getElementsByTagName(kHead)[0];
        var script = document.createElement(kScript);

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
        var key   = null;
        var query = kEmpty;

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
    });
}(this.o2, this, this.document));
