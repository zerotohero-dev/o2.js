/*global o2 */

/**
 * @module jsonp
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>An object to make <strong>JSONP</strong> calls.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    var myName = me.name;
    var nill = me.nill;

    /*
     * Module configuration.
     */
    var config = {
        state : {
            counter : 0
        },
        constants : {
            prefix : {
                JSON : [myName,'_json_'].join('')
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
                script.onload = script.onreadystatechange = nill;

                if(script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }

        };

        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);

    }

    /**
     * @class {static} Jsonp
     *
     * <p>An object to make <strong>JSONP</strong> calls.</p>
     */
    me.Jsonp = {

        /**
         * @function {static} Jsonp.get
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
                
                //
                delete window[jsonp];
            
            };

            load([url, '?', query, kCallback, '=', jsonp].join(''));

            return jsonp;

        }

    };

}(o2, this));
