define([
    '../core',
    '../string/core'
], function(
    o2,
    StringUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * ../core
         */
        nill = o2.nill,

        /*
         * ../string/core
         */
        concat = StringUtil.concat,
        generateGuid = StringUtil.generateGuid,

        /*
         * # Headers
         */

        commonHeaders = [{
            'Accept':
                'text/javascript, text/html, application/xml, text/xml, */*'
        }],
        postHeaders = [{
            'Content-Type':
                'application/x-www-form-urlencoded'
        }],

        /*
         * # Microsoft-Specific ProgIds
         */

        // TODO: check this IDs against the supported browser range, we might
        // not need them anymore.
        progIds = [
            'Msxml2.XMLHTTP',
            'Microsoft.XMLHTTP',
            'Msxml2.XMLHTTP.7.0',
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.5.0',
            'Msxml2.XMLHTTP.3.0'
        ],

        /*
         * # Error Messages
         */

        kNoXhr = 'Failed to create an XHR instance',

        /*
         * # Statuses
         */

        kCached = 304,
        kComplete = 4,
        kOk = 200,

        /*
         * # Verbs
         */

        kGet = 'GET',
        kPost = 'POST',

        /*
         * # Text, Prefix, Suffix
         */

        kAnd = '&',
        kEmpty = '',
        kEquals = '=',
        kKey = 'r',
        kPlus = '+',
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
         * # To Be Overridden
         */

        createXhr;

    /*
     * Creates a brand new `XMLHttpRequest` object.
     */
    createXhr = function() {
        var progId,
            request;

        if (window.XMLHttpRequest) {
            createXhr = function() {
                var request = new window.XMLHttpRequest();

                if (!request) {throw kNoXhr;}

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
     * Good boys clean their mess ;)
     *
     * @param `XMLHttpRequest` xhr - the original XMLHttpRequest object.
     */
    function finalizeXhr(xhr) {
        if (!xhr) {return;}

        // To avoid memory leaks.
        xhr.onreadystatechange = nill;

        // Request is finalized
        xhr.isFinalized = true;

        delete requestCache[xhr.index];

        activeRequestCount--;

        // `<= 0` is just for defensive coding.
        // `=== 0` would suffice as well.
        if (activeRequestCount <= 0) {
            counter = 0;
            activeRequestCount = 0;
        }
    }

    /*
     * Processes callbacks and finalizes the `Xhr`.
     *
     * @param `XMLHttpRequest` xhr - the current `Xhr` instance.
     * @param `Object` callbacks - oncomplete, onerror and onexception
     * callbacks.
     */
    function processCallbacks(xhr, callbacks) {
        var isSuccess = false,
            onaborted = callbacks.onaborted || nill,
            oncomplete = callbacks.oncomplete || nill,
            onerror = callbacks.onerror || nill,
            onexception  = callbacks.onexception || nill,
            responseText = kEmpty,
            responseXml = null,
            status = 0,
            statusText = kEmpty;

        if (xhr.isAborted) {
            onaborted(xhr);

            return;
        }

        // IE9 throws an error when accessing these properties
        // while the request is in an "aborted" state.
        try {
            status = xhr.status;
            responseText = xhr.responseText;
            responseXml = xhr.responseXML;
            statusText = xhr.statusText;
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
     * Registers the callbacks to the `XMLHttpRequest`
     * instance.
     *
     * @param `XMLHttpRequest` xhr - the original `XMLHttpRequest` object.
     * @param `Object` callbacks - An object of the form
     * {oncomplete: fn(responseText, responseXml, xhr, status),
     * onerror: fn(status, statusText, xhr),
     * onexception: fn(originalXhr, exception)}. Any of these callbacks are
     * optional.
     */
    function registerCallbacks(xhr, callbacks) {
        if (!xhr) {return;}
        if (xhr.isInitialized) {return;}

        xhr.onreadystatechange = function() {
            if (xhr.readyState === kComplete) {
                processCallbacks(xhr, callbacks);
            }
        };

        xhr.isInitialized = true;
    }

    /*
     * Adds headers.
     *
     * @param `XMLHttpRequest` xhr - the original `XMLHttpRequest` object.
     * @param `Object` headers - a config.constants.headers.* collection.
     */
    function addHeaders(xhr, headers) {
        var header,
            i,
            key,
            len;

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
     * Adds common request headers.
     *
     * @param `XMLHttpRequest` xhr - the original XMLHttpRequest object.
     */
    function addCommonRequestHeaders(xhr) {
        addHeaders(xhr, commonHeaders);
    }

    /*
     * Adds request headers specific to <code>POST</code> requests.
     *
     * @param `XMLHttpRequest` xhr - the original `XMLHttpRequest` object.
     */
    function addPostRequestHeaders(xhr) {
        addHeaders(xhr, postHeaders);
    }

    /*
     * Parses the params JSON and returns a `String` of
     * the form "&name1=value1&name2=value2".
     */
    function generateParametrizeQueryString(params) {
        var buffer = [],
            key;

        for (key in params) {
            if (params.hasOwnProperty(key)) {
                buffer.push([encodeURIComponent(key), kEquals,
                    encodeURIComponent(params[key])].join(''));
            }
        }

        return buffer.join(kAnd).replace(kUrlSpaceRegExp, kPlus);
    }

    /*
     * Sends the request.
     *
     * @see `Ajax.get` and `Ajax.post` for details.
     * @return the original `XMLHttpRequest`
     */
    function send(url, verb, parameters, callbacks, isSync) {
        if (!url) {return null;}

        var ajaxCallbacks = callbacks || {},
            ajaxParameters = parameters || {},

            parametrizedQuery = generateParametrizeQueryString(ajaxParameters),

            isPost = verb !== kGet,

            getQuery = isPost ? kEmpty : concat(kAnd, parametrizedQuery),

            index = counter++,
            isAsync = !!!isSync,

            postQuery = isPost ? parametrizedQuery : kEmpty,
            xhr = createXhr();

        // Add request to cache.
        requestCache[kKey + index] = xhr;

        xhr.index = (kKey + index);

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

    exports.abort = function(xhr) {
        if (!xhr || xhr.isAborted) {return;}

        try {
            xhr.isAborted = true;
            xhr.abort();
        } catch (ignore) {}
    };

    exports.createXhr = function() {
        return createXhr();
    };

    exports.get = function(url, parameters, callbacks, isSync) {
        return send(url, kGet, parameters, callbacks, isSync);
    };

    exports.post = function(url, parameters, callbacks, isSync) {
        return send(url, kPost, parameters, callbacks, isSync);
    };

    return exports;
});
