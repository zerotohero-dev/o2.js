/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window) {
    'use strict';

    /**
     * @module   ajax.core
     *
     * @requires core
     * @requires string.core
     * @requires event.core
     *
     * <p>A cross-browser <strong>AJAX</strong> Wrapper.</p>
     */
    fp.ensure(
        'ajax.core',
    [
        'core',
        'string.core',
        'event.core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */
        exports = {},

        /*
         * # Module Definition
         */
        kModuleName = 'Ajax',

        /**
         * @class {static} o2.Ajax
         *
         * <p>A <strong>static</strong> class for making <strong>AJAX</strong>
         * <strong>GET</strong> and <strong>POST</strong> requests.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        nill = require('nill'),

        /*
         * string.core
         */
        kString       = 'String',
        concat        = require(kString, 'concat'),
        generateGuid  = require(kString, 'generateGuid'),

        /*
         * event.core
         */
        listen = require('Event', 'addEventListener'),

        /*
         * # Headers
         */

        commonHeaders = [{
            'Accept' :
            'text/javascript, text/html, application/xml, text/xml, */*'
        }],
        postHeaders = [{
            'Content-Type' : 'application/x-www-form-urlencoded'
        }],

        /*
         * # Microsoft-Specific ProgIds
         */

        progIds = [
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP',
            'Msxml2.XMLHTTP.7.0',
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.5.0',
            'Msxml2.XMLHTTP.3.0'
        ],

        /*
         * # Events
         */

        kUnload = 'unload',

        /*
         * # Error Messages
         */

        kNoXhr = 'Failed to create an XHR instance',

        /*
         * # Statuses
         */

        kCached   = 304,
        kComplete = 4,
        kOk       = 200,

        /*
         * # Verbs
         */

        kGet  = 'GET',
        kPost = 'POST',

        /*
         * # Text, Prefix, Suffix
         */

        kAnd    = '&',
        kEmpty  = '',
        kEquals = '=',
        kKey    = 'r',
        kPlus   = '+',
        kRandom = '?rnd=',

        /*
         * # Common Regular Expressions
         */

        kUrlSpaceRegExp = /%20/g,

        /*
         * # Static State
         */

        /*
         * Active requests are cached here.
         */
        requestCache = {},

        /*
         * To uniquely mark xhr requests.
         */
        counter = 0,

        /*
         * The total number of opened, but not completed (i.e. active) requests.
         */
        activeRequestCount = 0,

        /*
         * # To be Overridden
         */

        createXhr = null;

    /*
     * <p>Creates a brand new <code>XMLHttpRequest</code> object.</p>
     */
    createXhr = function() {
        var progId  = null,
            request = null;

        if (window.XMLHttpRequest) {
            createXhr = function() {
                var request = new window.XMLHttpRequest();

                if (!request) { throw kNoXhr; }

                // Request is not completed yet.
                request.isComplete = false;

                return request;
            };

            return createXhr();
        }

        while (progIds.length > 0) {
            progId = progIds.shift();

            try {
                request = new window.ActiveXObject(progId);

                break;
            } catch(ignore) {}
        }

        if (!request) {throw kNoXhr;}

        createXhr = function() {
            var request = new window.ActiveXObject(progId);

            // Request is not completed yet.
            request.isComplete = false;

            return request;
        };

        return createXhr();
    };

    /*
     * <p>Good boys clean their mess ;)</p>
     *
     * @param {XMLHttpRequest} xhr - the original XMLHttpRequest object.
     */
    function finalizeXhr(xhr) {
        if (!xhr) {return;}

        // To avoid memory leaks.
        xhr.onreadystatechange = nill;

        // Request is finalized
        xhr.isFinalized = true;

        delete requestCache[xhr.index];

        activeRequestCount--;

        // " <= 0 "  is just for devensive coding.
        // " === 0 " would suffice as well.
        if (activeRequestCount <= 0) {
            counter = 0;
            activeRequestCount = 0;
        }
    }

    /*
     * <p>Processes callbacks and finalizes the <code>Xhr</code>.</p>
     *
     * @param {XMLHttpRequest} xhr - the current <code>Xhr</code> instance.
     * @param {Object} callbacks - oncomplete, onerror and onexception
     * callbacks.
     */
    function processCallbacks(xhr, callbacks) {
        var isSuccess    = false,
            onaborted    = callbacks.onaborted   || nill,
            oncomplete   = callbacks.oncomplete  || nill,
            onerror      = callbacks.onerror     || nill,
            onexception  = callbacks.onexception || nill,
            responseText = kEmpty,
            responseXml  = null,
            status       = 0,
            statusText   = kEmpty;

        if (xhr.isAborted) {
            onaborted(xhr);

            return;
        }

        // IE9 throws an error when accessing these properties
        // while the request is in an "aborted" state.
        try {
            status = xhr.status;
            responseText = xhr.responseText;
            responseXml  = xhr.responseXML;
            statusText   = xhr.statusText;
        } catch (ignore) {}

        isSuccess = status === kOk || status === kCached;

        callbacks = callbacks || {};

        // Since the response has come, mark the request as "completed".
        xhr.isComplete = true;

        try {
            if (isSuccess) {
                oncomplete(responseText, responseXml, xhr, status);

                return;
            }

            onerror(status, statusText, xhr);
        } catch(ex) {
            onexception(ex, xhr);
        } finally {
            finalizeXhr(xhr);
        }
    }

    /*
     * <p>Registers the callbacks to the <code>XMLHttpRequest</code>
     * instance.</p>
     *
     * @param {XMLHttpRequest} xhr - the original XMLHttpRequest object.
     * @param {Object} callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml, xhr, status),
     * onerror: fn(status, statusText, xhr),
     * onexception: fn(originalXhr, exception)}. Any of these callbacks are
     * optional.
     */
    function registerCallbacks(xhr, callbacks) {
        if (!xhr             ) {return;}
        if (xhr.isInitialized) {return;}

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
     * @param {XMLHttpRequest} xhr - the original XMLHttpRequest object.
     * @param {Object} headers - a config.constants.headers.* collection.
     */
    function addHeaders(xhr, headers) {
        var header = null,
            i      = 0,
            key    = 0,
            len    = 0;

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
     * @param {XMLHttpRequest} xhr - the original XMLHttpRequest object.
     */
    function addCommonRequestHeaders(xhr) {
        addHeaders(xhr, commonHeaders);
    }

    /*
     * <p>Adds request headers specific to <code>POST</code> requests.</p>
     *
     * @param {XMLHttpRequest} xhr - the original <code>XMLHttpRequest</code>
     * object.
     */
    function addPostRequestHeaders(xhr) {
        addHeaders(xhr, postHeaders);
    }

    /*
     * <p>Parses the params JSON and returns a <code>String</code> of
     * the form "&name1=value1&name2=value2"</p>
     */
    function generateParametrizeQueryString(params) {
        var buffer = [],
            key    = null;

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
     * @return the original <code>XMLHttpRequest</code>
     */
    function send(url, verb, parameters, callbacks, isSync) {
        if (!url) {return null;}

        var ajaxCallbacks  = callbacks  || {},
            ajaxParameters = parameters || {},

        parametrizedQuery = generateParametrizeQueryString(ajaxParameters),

        isPost   = verb !== kGet,

        getQuery = isPost ? kEmpty : concat(kAnd, parametrizedQuery),

        index     = counter++,
        isAsync   = !!!isSync,

        postQuery = isPost ? parametrizedQuery : kEmpty,
        xhr       = createXhr();

        // Add request to cache.
        requestCache[kKey+index] = xhr;

        xhr.index = (kKey+index);

        activeRequestCount++;

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
     * @function {static} o2.Ajax.abort
     * <p>Explicitly abort the request.</p>
     * <p>When the request is explicitly abourted, <strong>onaborted</strong>
     * callback is fired.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get(url, params, callbacks);
     *
     * ...
     *
     * if (someCondition) {
     *      o2.Ajax.abort(request);
     * }
     * </pre>
     *
     * @param {XMLHttpRequest} xhr - the original
     * <strong>XMLHttpRequest</strong> being sent.
     */
    exports.abort = def(me, 'abort', function(xhr) {
        if (!xhr || xhr.isAborted) {return;}

        try {
            xhr.isAborted = true;
            xhr.abort();
        } catch (ignore) {}
    });

    /**
     * @function {static} o2.Ajax.createXhr
     *
     * <p>Creates a native <code>XMLHttpRequest</code> object.
     * <p>This is a <strong>low-level</strong> function; it simply returns
     * the browser's native object.
     * You may most probably want to use {@link Ajax.get} or {@link
     * Ajax.post} instead, for more functionality.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * // Creates a low-level cross-browser XmlHttpRequest object.
     * var request = o2.Ajax.createXhr();
     * </pre>
     * @return the created <code>XMLHttpRequest</code> object.
     */
    exports.createXhr = def(me, 'createXhr', function() {
        return createXhr();
    });

    /**
     * @function {static} o2.Ajax.get
     *
     * <p>Sends and <strong>AJAX GET</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get('/api.php', {
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
     * @param {Boolean} isSync - (optional defaults to <code>false</code>).
     * Set this <code>true</code> for sending a snychronous request.
     *
     * @return the original <code>XMLHttpRequest</code> object.
     */
    exports.get = def(me, 'get', function(url, parameters, callbacks, isSync) {
        return send(url, kGet, parameters, callbacks, isSync);
    });

    /**
     * @function {static} o2.Ajax.post
     *
     * <p>Sends an <strong>AJAX POST</strong> request.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.post('/api.php', {
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
     * @param {String} url - the <strong>URL</strong> to send the request.
     * @param {Object} parameters - parameters collection as a
     * <strong>name/value</strong> pair object ({}).
     * @param {Object} callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml, xhr, status),
     * onerror: fn(status, statusText, xhr), onaborted : fn(xhr),
     * onexception: fn(exception, originalXhr)}.
     * Any of these callbacks are optional.
     * @param {Boolean} isSync - (optional defaults to <code>false</code>).
     * Set this <code>true</code> for sending a <strong>snychronous</strong>
     * request.
     *
     * @return the original <code>XMLHttpRequest</code> object.
     */
    exports.post = def(me, 'post', function(url, parameters, callbacks,
                isSync) {
        return send(url, kPost, parameters, callbacks, isSync);
    });

    // There is a bug in IE (seen in 7, heard about in others) where AJAX
    // requests that are open when the window is closed still reserve
    // connections. This means that if you open and close two windows using
    // long-polling, the next time you open a page on that domain it will
    // hang forever. The below event listener fixes that.
    listen(window, kUnload, function() {
        var key     = null,
            request = null;

        try {

            // TODO: v8 does not make performance optimization inside
            // a try block, encapsulate this logic into a function and
            // take it out of the try-catch. search all trys, and do the
            // same.
            for(key in requestCache) {
                if(requestCache.hasOwnProperty(key)) {
                    request = requestCache[key];
                    request.abort();

                    delete requestCache[key];
                }
            }
        } catch(ignore) {}
    });
}(this.o2, this.o2.protecteds, this));
