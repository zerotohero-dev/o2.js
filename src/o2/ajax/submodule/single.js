define([
    '../core'
], function(
    Ajax
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * ../core
         */
        get = Ajax.get,
        post = Ajax.post,

        /*
         * # Caches
         */

        getCache = {},
        postCache = {},

        /*
         * # Common Constants
         */

        kDelimeter = ',';

    /*
     *
     */
    function prepareToken(url, parameters) {
        var ar = [],
            key = null;

        ar.push(url);

        for (key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                ar.push(key);
                ar.push(parameters[key]);
            }
        }

        return ar.join(kDelimeter);
    }

    exports.getSingle = function(url, parameters, callbacks) {
        var token = prepareToken(url, parameters),
            request = getCache[token];

        if (request && !request.isComplete) {return request;}

        delete getCache[token];

        request = getCache[token] = get(url, parameters, callbacks);

        return request;
    };

    exports.postSingle = function(url, parameters, callbacks) {
        var token = prepareToken(url, parameters),
            request = postCache[token];

        if (request && !request.isComplete) {return request;}

        delete postCache[token];

        request = postCache[token] = post(url, parameters, callbacks);

        return request;
    };

    return exports;
});
