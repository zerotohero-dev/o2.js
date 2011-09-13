/*global o2 */

/**
 * @module o2.jsonp
 * @requires o2
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>An object to make <strong>JSONP</strong> calls.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        state : {
            counter : 0
        },
        constants : {
            prefix : {
                JSON : 'o2_json_'
            },
            key : {
                CALLBACK : 'callback'
            }
        }
    };

    /*
     *
     */
    function load(url) {

        var script = document.createElement('script');
        var done = false;

        script.async = true;
        script.src = url;

        script.onload = script.onreadystatechange = function() {

            if(!done && (!this.readyState || this.readyState == 'loaded')) {
                done = true;
                script.onload = script.onreadystatechange = o2.nill;

                if(script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }

        };

        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);

    }

    /**
     * @class {static} o2.Jsonp
     *
     * <p>An object to make <strong>JSONP</strong> calls.</p>
     */
    o2.Jsonp = {

        /**
         * @function {static} o2.Jsonp.get
         *
         * <p>Creates a <strong>JSONP</strong> request.</p>
         *
         * @param {String} url - the <strong>URL</strong> of the
         * <strong>JSONP</strong>
         * Service
         * @param {Object} params - parameters in the form of {name1:value1,...}
         * @param {Function} callback - callback to execute after
         * <strong>JSONP</strong>
         * arrives.
         */
        get : function(url, params, callback) {

            var query = '';
            params = params || {};

            for(var key in params) {
                if(params.hasOwnProperty(key)) {
                    query = [query, key, '=', encodeURIComponent(params[key]), '&'].join('');
                }
            }

            var constants = config.constants;
            var kJson = constants.prefix.JSON;
            var kCallback = constants.key.CALLBACK;

            var jsonp = [kJson, (++config.state.counter)].join('');

            window[jsonp] = function(data) {
                callback(data, params);
                window[jsonp] = null;
                delete window[jsonp];
            };

            load([url, '?', query, kCallback, '=', jsonp].join(''));

            return jsonp;

        }

    };

}(o2, this));
