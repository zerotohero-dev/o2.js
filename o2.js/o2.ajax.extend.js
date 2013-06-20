/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */

/**
 * @module ajax.extend
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */
define([
    'o2.core',
    'o2.ajax.core'
], function(
    o2,
    Ajax
) {
    'use strict';

    //TODO: use a new documentation generator.

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * ajax.core
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

   /**
    * @function {static} o2.Ajax.getSingle
    *
    * <p>Sends a single <strong>AJAX</strong> <strong>GET</strong> request,
    * and discards further requests until a response comes from the first
    * request.</p>
    *
    * <p>Two requests that have identical <strong>URL</strong>s and parameter
    * name-value pairs, are considered unique. This method, ensures that no two
    * unique <strong>GET</strong> requests will be fired without waiting for the
    * other.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var request = o2.Ajax.getSingle('/api.php', {
    *      name   : 'Volkan Özçelik',
    *      action : 'add'
    * }, {
    *      oncomplete  : function(text, xml, xhr, status) {},
    *      onerror     : function(statusCode, statusText, xhr) {},
    *      onaborted   : function(xhr) {},
    *      onexception : function(exception, xhr) {}
    * });
    * </pre>
    *
    * @param {String} url - the URL to send the request.
    * @param {Object} parameters - parameters collection as a name/value
    * pair object ({}).
    * @param {Object} callbacks - An object of the form
    * {oncomplete: fn(responseText, responseXml, xhr, status),
    * onerror: fn(status, statusText, xhr), onaborted: fn(xhr),
    * onexception: fn(exception, originalXhr)}.
    * Any of these callbacks are optional.
    *
    * @return the active <code>XMLHttpRequest</code> object.
    *
    * @see o2.Ajax.get
    */
    function getSingle(url, parameters, callbacks) {
        var token = prepareToken(url, parameters),
            request = getCache[token];

        if (request && !request.isComplete) {return request;}

        delete getCache[token];

        request = getCache[token] = get(url, parameters, callbacks);

        return request;
    }

   /**
    * @function {static} o2.Ajax.postSingle
    *
    * <p>Sends a single <strong>AJAX</strong> <strong>POST</strong> request,
    * and discards further requests until a response comes from the first
    * request.</p>
    *
    * <p>Two requests that have identical <strong>URL</strong>s and parameter
    * name-value pairs, are considered unique. This method, ensures that no two
    * unique <strong>POST</strong> requests will be fired without waiting for
    * the other.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var request = o2.Ajax.postSingle('/api.php', {
    *      name   : 'Volkan Özçelik',
    *      action : 'add'
    * }, {
    *      oncomplete  : function(text, xml, xhr, status) {},
    *      onerror     : function(statusCode, statusText, xhr) {},
    *      onaborted   : function(xhr) {},
    *      onexception : function(exception, xhr) {}
    * });
    * </pre>
    *
    * @param {String} url - the URL to send the request.
    * @param {Object} parameters - parameters collection as a name/value
    * pair object ({}).
    * @param {Object} callbacks - An object of the form
    * {oncomplete: fn(responseText, responseXml, xhr, status),
    * onerror: fn(status, statusText, xhr), onaborted: fn(xhr),
    * onexception: fn(exception, originalXhr)}.
    * Any of these callbacks are optional.
    *
    * @return the active <code>XMLHttpRequest</code> object.
    *
    * @see o2.Ajax.post
    */
    function postSingle(url, parameters, callbacks) {
        var token = prepareToken(url, parameters),
            request = postCache[token];

        if (request && !request.isComplete) {return request;}

        delete postCache[token];

        request = postCache[token] = post(url, parameters, callbacks);

        return request;
    }

    /**
     * propose usage:
     * ajaxMixin.extend(Ajax)
     */
    exports.extend = function(obj) {
        obj.getSingle = getSingle;
        obj.postSingle = postSingle;
    };

    return exports;
});
