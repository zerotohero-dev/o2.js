/**
 * @module ajax.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser <strong>AJAX</strong> Wrapper.</p>
 */
(function(framework, window) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;
    var generateGuid = framework.StringHelper.generateGuid;
    var concat = framework.StringHelper.concat;
    var nill = framework.nill;
    var ActiveXObject = window.ActiveXObject;
    var XMLHttpRequest = window.XMLHttpRequest;

    /*
     * Module configuration.
     */
    var config = {
        constants : {

            /*
             *
             */
            prefix : {
                RANDOM : '?rnd='
            },

            /*
             *
             */
            verb : {
                GET : 'GET',
                POST : 'POST'
            },

            /*
             *
             */
            error : {
                NO_XHR : 'Failed to create an XHR instance'
            },

            /*
             *
             */
            readystate : {
                COMPLETE : 4
            },

            /*
             *
             */
            status : {
                OK : 200,
                CACHED : 304
            },

            /*
             *
             */
            GUID_MULTIPLIER : 10000
        },

        /*
         *
         */
        header : {

            /*
             *
             */
            common : [{
                'Accept' :
                'text/javascript, text/html, application/xml, text/xml, */*'
            }],

            /*
             *
             */
            post : [{
                'Content-Type' : 'application/x-www-form-urlencoded'
            }]

        },

        progId : [
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP',
            'Msxml2.XMLHTTP.7.0',
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.5.0',
            'Msxml2.XMLHTTP.3.0'
       ]
    };

    /*
     * Common string constants.
     */
    var constants = config.constants;
    var kNoXhr = constants.error.NO_XHR;
    var kOk = constants.status.OK;
    var kCached = constants.status.CACHED;
    var kComplete = constants.readystate.COMPLETE;
    var kEquals = '=';
    var kAnd = '&';
    var kPlus = '+';
    var kRandom = config.constants.prefix.RANDOM;
    var kGet = config.constants.verb.GET;

    /*
     * Common collections.
     */
    var progIds = config.progId;

    /*
     * Common regular expressions.
     */
    var kUrlSpaceRegExp = /%20/g;

    /*
     * <p>Creates a brand new <code>XmlHttpRequest</code> object.</p>
     */
    var createXhr = function() {
        var request = null;
        var progId = null;

        if (window.XMLHttpRequest) {
            createXhr = function() {
                var request = new XMLHttpRequest();

                if (!request) {
                    throw kNoXhr;
                }

                // Request is not completed yet.
                request.isComplete = false;

                return request;
            };

            return createXhr();
        }

        while (progIds.length > 0) {
            progId = progIds.shift();

            try {
                request = new ActiveXObject(progId);

                break;
            } catch(ignore) {
            }
        }

        if (!request) {
            throw kNoXhr;
        }

        createXhr = function() {
            var request = new ActiveXObject(progId);

            // Request is not completed yet.
            request.isComplete = false;

            return request;
        };

        return createXhr();
    };

    /*
     * <p>Good boys clean their mess ;)</p>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest object.
     */
    function finalizeXhr(xhr) {
        if (!xhr) {
            return;
        }

        // To avoid memory leaks.
        xhr.onreadystatechange = nill;

        xhr.isFinalized = true;
    }

    /*
     * <p>Processes callbacks and finalizes the <code>Xhr</code>.</p>
     *
     * @param {XmlHttpRequest} xhr - the current <code>Xhr</code> instance.
     * @param {Object} callbacks - oncomplete, onerror and onexception callbacks.
     */
    function processCallbacks(xhr, callbacks) {
        var nillCached = nill;
        var oncomplete = callbacks.oncomplete || nillCached;
        var onerror = callbacks.onerror || nillCached;
        var onexception = callbacks.onexception || nillCached;
        var status = xhr.status;
        var isSuccess = status === kOk || status === kCached;

        callbacks = callbacks || {};

        // Since the response has come, mark the request as "completed".
        xhr.isComplete = true;

        try {
            if (isSuccess) {
                oncomplete(xhr.responseText, xhr.responseXML, xhr);

                return;
            }

            onerror(xhr.status, xhr.statusText, xhr);
        } catch(ex) {
            onexception(ex, xhr);
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
        if (!xhr) {
            return;
        }

        if (xhr.isInitialized) {
            return;
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === kComplete) {
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
        var i = 0;
        var len = 0;
        var key = 0;

        for (i = 0, len = headers.length; i < len; i++) {
            header = headers[i];

            for (key in header) {
                if (header.hasOwnProperty(key)) {
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
        addHeaders(xhr, config.header.common);
    }

    /*
     * <p>Adds request headers specific to <code>POST</code> requests.</p>
     *
     * @param {XmlHttpRequest} xhr - the original <code>XmlHttpRequest</code>
     * object.
     */
    function addPostRequestHeaders(xhr) {
        addHeaders(xhr, config.header.post);
    }

    /*
     * <p>Parses the params JSON and returns a <code>String</code> of
     * the form "&name1=value1&name2=value2"</p>
     */
    function generateParametrizeQueryString(params) {
        var buffer = [];
        var key = null;

        for (key in params) {
            if (params.hasOwnProperty(key)) {
                buffer.push([encodeURIComponent(key), kEquals,
                    encodeURIComponent(params[key])].join(''));
            }
        }

        return buffer.join(kAnd).replace(kUrlSpaceRegExp, kPlus);
    }

    /*
     * <p>Sends the request.</p>
     *
     * @see {@link Ajax.get} and {@link Ajax.post} for details.
     * @return the original <code>XmlHttpRequest</code>
     */
    function send(url, verb, parameters, callbacks, isSync) {
        if (!url) {
            return null;
        }

        var ajaxParameters = parameters || {};
        var ajaxCallbacks = callbacks || {};
        var isAsync = !!!isSync;
        var isPost = verb !== kGet;
        var xhr = createXhr();
        var parametrizedQuery = generateParametrizeQueryString(ajaxParameters);
        var getQuery = isPost ? '' : concat(kAnd, parametrizedQuery);
        var postQuery = isPost ? parametrizedQuery : '';

        xhr.open(verb, concat(url, kRandom, generateGuid(), getQuery), isAsync);

        addCommonRequestHeaders(xhr);

        if (isPost) {
            addPostRequestHeaders(xhr);
        }

        registerCallbacks(xhr, ajaxCallbacks);

        try {
            xhr.send(postQuery);
        } catch(exception) {
            ajaxCallbacks.onerror(xhr.status, xhr.statusText, xhr);
        }

        return xhr;
    }

    /**
     * @class {static} o2.Ajax
     *
     * <p>A <strong>static</strong> class for making <strong>AJAX</strong>
     * <strong>GET</strong> and <strong>POST</strong> requests.</p>
     */
    me.Ajax = {

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
         * onexception: fn(exception, originalXhr)}.
         * Any of these callbacks are optional.
         * @param {Boolean} isSync - (optional defaults to <code>false</code>).
         * Set this
         * <code>true</code> for sending a <strong>snychronous</strong> request.
         * @return the original <code>XmlHttpRequest</code> object.
         */
        post : function(url, parameters, callbacks, isSync) {
            return send(url, config.constants.verb.POST, parameters, callbacks,
                isSync);
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
         * onexception: fn(exception, originalXhr)}.
         * Any of these callbacks are optional.
         * @param {Boolean} isSync - (optional defaults to <code>false</code>).
         * Set this
         * <code>true</code> for sending a snychronous request.
         * @return the original <code>XmlHttpRequest</code> object.
         */
        get : function(url, parameters, callbacks, isSync) {
            return send(url, config.constants.verb.GET, parameters, callbacks,
                isSync);
        },

        /**
         * @function {static} o2.Ajax.createXhr
         *
         * <p>Creates a native <code>XmlHttpRequest</code> object.
         * <p>This is a <strong>low-level</strong> function; it simply returns
         * the browser's native object.
         * You may most probably want to use {@link Ajax.get} or {@link
         * Ajax.post} instead, for more functionality.</p>
         *
         * @return the created <code>XmlHttpRequest</code> object.
         */
        createXhr : function() {
            return createXhr();
        }
    };
}(this.o2, this));
