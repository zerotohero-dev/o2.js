/**
 * @module   jsonp.core
 * @requires core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:41:52.873413
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

    var concat = require('StringHelper', 'concat');

    var createElement        = attr(document, 'createElement');
    var getElementsByTagName = attr(document, 'getElementsByTagName');

    /*
     * State
     */
    var counter = 0;

    /*
     * Common Constants
     */
    var kAnd      = '&';
    var kCallback = 'callback';
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
        var script = createElement(kScript);
        var head = getElementsByTagName(kHead)[0];
        var done = false;

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
     * @function {static} o2.Jsonp.get
     *
     * <p>Creates a <strong>JSONP</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>JSONP</strong> service.
     * @param {Object} params - parameters in the form of {name1:value1,...}
     * @param {Function} callback - callback to execute after
     * <strong>JSONP</strong> arrives.
     */
    def(me, 'get', function(url, params, callback) {
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
