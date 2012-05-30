/**
 * @module   dom.load
 * @requires core
 * @requires dom.core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-24 09:46:03.289550
 * -->
 *
 * <p>This package is for asynchronously loading resources such as images and
 * scripts.</p>
 */
(function(framework, window, document, undefined) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (load)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var myName = require('name');
    var nill   = require('nill');

    var kString       = 'String';
    var concat        = require(kString, 'concat');
    var format        = require(kString, 'format');
    var generateGuid  = require(kString, 'generateGuid');

    var Image                = attr(window,   'Image');
    var setTimeout           = attr(window,   'setTimeout');
    var createElement        = attr(document, 'createElement');
    var getElementsByTagName = attr(document, 'getElementsByTagName');
    var sheets               = attr(document, 'styleSheets');

    /*
     * Common Strings
     */
    var kCssId      = concat(myName, '-css-{0}');
    var kHead       = 'head';
    var kLink       = 'link';
    var kRel        = 'rel';
    var kScript     = 'script';
    var kScriptType = 'text/javascript';
    var kSheet      = 'stylesheet';
    var kSheetType  = 'text/css';

    /*
     * Common Constants
     */
    var kCssCheckInterval   = 100;
    var kMaxCssCheckAttempt = 500;

    /*
     * Common Regular Expressions
     */
    var kCompleteRegExp = /loaded|complete/;

    var kM$     = 'MSIE';
    var isCrap  = window.navigator.userAgent.indexOf(kM$) > -1 && !window.opera;
    var isOpera = !!window.opera;

    /**
     * @function {static} o2.Dom.loadCss
     *
     * <p>Asynchronously loads a <strong>css</strong> file with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>css</strong> file does
     * not have to be in the same domain as the web page.</p>
     *
     * <p>The success and failure callbacks is a somewhat hacky way of handling
     * <strong>CSS</strong> load events. In deed, detecting <strong>CSS</strong>
     * load is not an easy task, and it's not necessary most of the time.</p>
     * <p>Though it may get handy to prevent the Flash of Unstyled Content
     * (FOUC) issues.</p>
     * <p>A more robust way of handling load callbacks is polling
     * the property of a test element (such as the background color), that
     * you know that the loaded <strong>CSS</strong> will change for sure.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.loadCss('http://cdn.example/com/theme.css', function() {
     *      handleSuccess();
     * });
     * </pre>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>css</strong> file.
     * @param {Function} successCallback - the callback to execute when the load
     * operation completes.
     */
    var loadCss = def(me, 'loadCss', function(src, successCallback) {
        var s = createElement(kLink);
        var x = getElementsByTagName(kHead)[0];

        var id      = format(kCssId, generateGuid());
        var counter = 0;

        var onsuccess = successCallback || nill;

        s.setAttribute(kRel, kSheet);

        s.id   = id;
        s.type = kSheetType;
        s.href = src;

        x.appendChild(s);

        // for MSIE
        if (isCrap) {
            s.onreadystatechange = function() {
                if(kCompleteRegExp.test(s.readyState)) {
                    onsuccess();
                    onsuccess = nill;
                }
            };

            return;
        }

        // for Opera
        if (isOpera) {
            s.onload = function() {
                onsuccess();
                onsuccess = nill;
            };

            return;
        }

        // worst-case fallback
        setTimeout(function check() {
            var i     = 0;
            var len   = 0;
            var sheet = null;

            if (onsuccess === nill) {
                return;
            }

            for (i = 0, len = sheets.length; i < len; i++) {
                sheet = sheets[i];
                sheet = sheet.ownerNode || sheet.owningElement;

                if (sheet && sheet.id === id) {
                    onsuccess();
                    onsuccess = nill;

                    break;
                }
            }

            counter++;

            if(counter <= kMaxCssCheckAttempt) {
                setTimeout(check, kCssCheckInterval);
            } else {
                onsuccess();
                onsuccess = nill;
            }
        }, kCssCheckInterval);
    });

    /**
     * @function {static} o2.Dom.loadImage
     *
     * <p>Tries to load the image into a <strong>JavaScript</strong>
     * <code>Image</code> object; then triggers
     * <code>successCallback</code> or <code>failureCallback</code> depending on
     * the
     * result of the load attempt.</p>
     * <p>This function can be used for pre-loading or post-loading images.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.loadImage('http//asset.example.com/spinner.png', function() {
     *      handleSuccess();
     * });
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>image</strong>.
     * @param {Function} successCallback - gets called when the
     * <strong>image</strong> is loaded successfully.
     */
    var loadImage = def(me, 'loadImage', function(url, succesCallback) {
        var succesCallbackCached = succesCallback || nill;

        function done() {
            succesCallbackCached();
            succesCallbackCached = nill;
        }

        var testImg = new Image();

        testImg.onload  = done;
        testImg.onerror = done;
        testImg.onabort = done;
        testImg.src     = url;

        return testImg;
    });

    /**
     * @function {static} o2.Dom.loadScript
     *
     * <p>Asynchronously loads a <strong>script</strong> with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>script</strong> does not
     * have to be in the same domain as the web page.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.loadImage('http//asset.example.com/script.js', function() {
     *      handleSuccess();
     * });
     * </pre>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>script</strong>.
     * @param {Function} callback - the callback to execute when the load
     * operation completes.
     */
    var loadScript = def(me, 'loadScript', function(src, callback) {
        var s = createElement(kScript);
        var x = getElementsByTagName(kScript)[0] ||
            getElementsByTagName(kHead)[0];

        s.type = kScriptType;
        s.async = true;
        s.src = src;

        x.parentNode.insertBefore(s, x);

        if (!callback) {
            return;
        }

        s.onreadystatechange = function() {
            if(kCompleteRegExp.test(s.readyState)) {
                callback();
            }
        };

        s.onload = function() {
            callback();
        };
    });
}(this.o2, this, this.document));
