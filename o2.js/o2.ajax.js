/*global window, o2, ActiveXObject*/

/**
 * @module o2.ajax.core
 * @requires o2
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser <strong>AJAX</strong> Wrapper.</p>
 */
( function(o2, window, UNDEFINED) {

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            prefix : {
                RANDOM : '?rnd='
            },
            verb : {
                GET : 'GET',
                POST : 'POST'
            },
            error : {
                NO_XHR : 'Failed to create an XHR instance'
            },
            readystate : {
                COMPLETE : 4
            },
            status : {
                OK : 200,
                CACHED : 304
            },
            header : {
                common : [{
                    //setting X-Requested-With header causes problem in ejabberd
                    // requests.
                    //'X-Requested-With': 'XmlHTTPRequest',
                    'Accept' : 'text/javascript, text/html, application/xml, text/xml, */*'
                }],
                post : [{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }]
            },
            GUID_MULTIPLIER : 10000
        },
        // @formatter:off
        progId : [
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP',
            'Msxml2.XMLHTTP.7.0',
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.5.0',
            'Msxml2.XMLHTTP.3.0'
       ]
       // @formatter:on
    };

    /*
     * <p>Creates a brand new <code>XmlHttpRequest</code> object.</p>
     */
    var createXhr = function() {

        var request = null;

        var constants = config.constants;

        var kNoXhr = constants.error.NO_XHR;

        if(window.XMLHttpRequest) {
            createXhr = function() {
                return new XMLHttpRequest();
            };

            request = createXhr();

            if(!request) {
                throw kNoXhr;
            }

            return request;
        }

        var progId = null;
        var progIds = config.progId;

        while(progIds.length > 0) {
            progId = progIds.shift();

            try {
                request = new ActiveXObject(progId);
                break;
            } catch(ignore) {
            }
        }

        if(!request) {
            throw kNoXhr;
        }
        createXhr = function() {
            return new ActiveXObject(progId);
        };

        return request;

    };

    /*
     * <p>Good boys clean their mess ;)</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     */
    function finalizeXhr(xhr) {

        if(!xhr) {
            return;
        }

        // To avoid memory leaks.
        xhr.onreadystatechange = o2.nill;
    }

    /*
     * <p>Processes callbacks and finalizes the <code>Xhr</code>.</p>
     *
     * @param {XmlHttpRequest} xhr - the current <code>Xhr</code> instance.
     * @param {Object} callbacks - oncomplete, onerror and onexception callbacks.
     */
    function processCallbacks(xhr, callbacks) {

        var nill = o2.nill;
        var constants = config.constants;

        var kComplete = constants.readystate.COMPLETE;
        var kOk = constants.status.OK;
        var kCached = constants.status.CACHED;
        callbacks = callbacks || {};

        var oncomplete = callbacks.oncomplete || nill;
        var onerror = callbacks.onerror || nill;
        var onexception = callbacks.onexception || nill;

        var status = xhr.status;
        var isSuccess = status == kOk || status == kCached;

        try {
            if(isSuccess) {
                oncomplete(xhr.responseText, xhr.responseXML, xhr);
                return;
            }

            onerror(xhr.status, xhr.statusText, xhr);

        } catch(ex) {
            onexception(xhr, ex);

        } finally {
            finalizeXhr(xhr);
        }

    }

    /*
     * <p>Registers the callbacks to the XmlHttpRequest instance.</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     * @param {Object} callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
     * statusText),
     * onexception: fn(originalXhr, exception)}. Any of these callbacks are
     * optional.
     */
    function registerCallbacks(xhr, callbacks) {

        if(!xhr) {
            return;
        }

        if(xhr.isInitialized) {
            return;
        }

        var nill = o2.nill;

        var oncomplete = callbacks.oncomplete ? callbacks.oncomplete : nill;
        var onerror = callbacks.onerror ? callbacks.onerror : nill;
        var onexception = callbacks.onexception ? callbacks.onexception : nill;

        xhr.onreadystatechange = function() {
            var status = null;
            var isSuccess = false;

            var constants = config.constants;

            var kComplete = constants.readystate.COMPLETE;
            var kOk = constants.status.OK;
            var kCached = constants.status.CACHED;

            if(xhr.readyState == kComplete) {
                processCallbacks(xhr, callbacks);
            }
        };


        xhr.isInitialized = true;

    }

    /*
     * <p>Adds headers.</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     * @param {Object} headers - a config.constants.headers.* collection.
     */
    function addHeaders(xhr, headers) {

        var header = null;

        for(var i = 0, len = headers.length; i < len; i++) {
            header = headers[i];

            for(var key in header) {
                if(header.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, header[key]);
                }
            }
        }

    }

    /*
     * <p>Adds common request headers.</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     */
    function addCommonRequestHeaders(xhr) {

        addHeaders(xhr, config.constants.header.common);

    }

    /*
     * <p>Adds request headers specific to <code>POST</code> requests.</p>
     *
     * @param {XmlHttpRequest} xhr - the original <code>XmlHttpRequest</code>
     * object.
     */
    function addPostRequestHeaders(xhr) {

        addHeaders(xhr, config.constants.header.post);

    }

    /*
     * <p>Parses the params JSON and returns a <code>String</code> of
     * the form "&name1=value1&name2=value2"</p>
     */
    function generateParametrizeQueryString(params) {

        var name = '';
        var value = '';
        var buffer = [];

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                buffer.push([encodeURIComponent(key), '=', encodeURIComponent(params[key])].join(''));
            }
        }

        return buffer.join('&').replace(/%20/g, '+');

    }

    /*
     * Copied from o2.stringhelper.core to eliminate cross-module dependency.
     */
    function generateGuid() {

        return [(new Date()).getTime(), Math.floor(config.constants.GUID_MULTIPLIER * Math.random())].join('');

    }

    /*
     * Copied from o2.stringhelper.core to eliminate cross-module dependency.
     */
    function concat() {

        return Array.prototype.slice.call(arguments).join('');

    }

    /*
     * <p>Sends the request.</p>
     *
     * @see {@link o2.Ajax.get} and {@link o2.Ajax.post} for details.
     * @return the original <code>XmlHttpRequest</code>
     */
    function send(url, verb, parameters, callbacks, isSync) {

        if(!url) {
            return null;
        }
        parameters = parameters || {};
        callbacks = callbacks || {};
        isSync = !!isSync;
        var isAsync = !isSync;

        var kRandom = config.constants.prefix.RANDOM;
        var kGet = config.constants.verb.GET;
        var isPost = verb != kGet;

        // name1=value1&name2=value2&name3=value3
        var parametrizedQuery = generateParametrizeQueryString(parameters);

        // &name1=value1&name2=value2&name3=value3 (for GET requests)
        var query = isPost ? '' : ['&', parametrizedQuery].join('');

        // name1=value1&name2=value2&name3=value3 (for POST requests)
        var postQuery = isPost ? parametrizedQuery : '';

        // A unique string to prevent caching.
        var guid = generateGuid();

        // http://example.com + ?rnd= + {guid} + &name1=value1
        url = concat(url, kRandom, guid, query);

        // Create a cross-browse XmlHttpRequest.
        var xhr = createXhr();

        // Open the connection.
        xhr.open(verb, url, isAsync);

        // Add headers.
        addCommonRequestHeaders(xhr);

        if(isPost) {
            // Add more headers.
            addPostRequestHeaders(xhr);
        }

        // Register callbacks.
        registerCallbacks(xhr, callbacks);

        // Send the request.
        try {
            xhr.send(postQuery);
        } catch(exception) {
            callbacks.onexception(xhr, exception);
        }

        if(isSync) {
            // If the request is sync, process response immediately.
            processCallbacks(xhr, callbacks);
        }

        return xhr;

    }

    /**
     * @class {static} o2.Ajax
     *
     * <p>A <strong>static</strong> class for making <strong>AJAX</strong>
     * <strong>GET</strong> and
     * <strong>POST</strong> requests.</p>
     */
    o2.Ajax = {

        /**
         * @function {static} o2.Ajax.post
         *
         * <p>Sends an <strong>AJAX POST</strong> request.</p>
         *
         * @param {String} url - the <strong>URL</strong> to send the request.
         * @param {Object} parameters - parameters collection as a
         * <strong>name/value</strong> pair object ({}).
         * @param {Object} callbacks - An object of the form
         * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
         * statusText),
         * onexception: fn(originalXhr, exception)}.
         * Any of these callbacks are optional.
         * @param {Boolean} isSync - (optional defaults to <code>false</code>).
         * Set this
         * <code>true</code> for sending a <strong>snychronous</strong> request.
         * @return the original <code>XmlHttpRequest</code> object.
         */
        post : function(url, parameters, callbacks, isSync) {

            return send(url, config.constants.verb.POST, parameters, callbacks, isSync);

        },

        /**
         * @function {static} o2.Ajax.get
         *
         * <p>Sends and <strong>AJAX GET</strong> request.</p>
         *
         * @param {String} url - the URL to send the request.
         * @param {Object} parameters - parameters collection as a name/value
         * pair object
         * ({}).
         * @param {Object} callbacks - An object of the form
         * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
         * statusText),
         * onexception: fn(originalXhr, exception)}.
         * Any of these callbacks are optional.
         * @param {Boolean} isSync - (optional defaults to <code>false</code>).
         * Set this
         * <code>true</code> for sending a snychronous request.
         * @return the original <code>XmlHttpRequest</code> object.
         */
        get : function(url, parameters, callbacks, isSync) {

            return send(url, config.constants.verb.GET, parameters, callbacks, isSync);

        },

        /**
         * @function {static} o2.Ajax.createXhr
         *
         * <p>Creates a native <code>XmlHttpRequest</code> object.
         * <p>This is a <strong>low-level</strong> function; it simply returns
         * the
         * browser's
         * native object.
         * You may most probably want to use {@link o2.Ajax.get} or {@link
         * o2.Ajax.post}
         * instead, for more functionality.
         *
         * @return the created <code>XmlHttpRequest</code> object.
         */
        createXhr : function() {

            return createXhr();

        }

    };

}(o2, this));
