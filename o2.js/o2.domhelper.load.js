/**
 * @module   domhelper.load
 * @requires core
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:51:26.811415
 * -->
 *
 * <p>This package is for asynchronously loading resources such as images and
 * scripts.</p>
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
    var kModuleName = 'DomHelper';

    /*
     * DomHelper (load)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var myName = require('name');
    var nill   = require('nill');

    var kStringHelper = 'StringHelper';
    var concat        = require(kStringHelper, 'concat');
    var format        = require(kStringHelper, 'format');
    var generateGuid  = require(kStringHelper, 'generateGuid');

    var Image                = attr(window, 'Image');
    var setTimeout           = attr(window, 'setTimeout');
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

    /**
     * @function {static} o2.DomHelper.loadCss
     *
     * <p>Asynchronously loads a <strong>css</strong> file with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>css</strong> file does
     * not have to be in the same domain as the web page.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>css</strong> file.
     * @param {Function} successCallback - the callback to execute when the load
     * operation completes.
     * @param {Function} failureCallback - the callback to execute when the load
     * operation times out or fails.
     */
    def(me, 'loadCss', function(src, successCallback, failureCallback) {
        var s = createElement(kLink);
        var x = getElementsByTagName(kHead)[0];

        var id = format(kCssId, generateGuid());
        var counter = 0;

        var onsuccess = successCallback || nill;
        var onfailure = failureCallback || nill;

        s.setAttribute(kRel, kSheet);

        s.id = id;
        s.type = kSheetType;
        s.href = src;

        x.appendChild(s);

        setTimeout(function check() {
            var i = 0;
            var len = 0;
            var sheet = null;

            for (i = 0, len = sheets.length; i < len; i++) {
                sheet = sheets[i];
                sheet = sheet.ownerNode || sheet.owningElement;

                if (sheet && sheet.id === id) {
                    onsuccess();
                    break;
                }
            }

            counter++;

            if(counter <= kMaxCssCheckAttempt) {
                setTimeout(check, kCssCheckInterval);
            } else {
                onfailure();
            }
        }, kCssCheckInterval);
    });

    /**
     * @function {static} o2.DomHelper.loadImage
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>image</strong>.
     * @param {Function} successCallback - gets called when the
     * <strong>image</strong> is loaded successfully.
     * @param {Function} failureCallback - gets called when the
     * <strong>image</strong> can <strong>not</strong> be loaded successfully.
     */
    def(me, 'loadImage', function(url, succesCallback, failureCallback) {
        var succesCallbackCached = succesCallback || nill;
        var failureCallbackCached = failureCallback || nill;
        var testImg = new Image();

        testImg.onload = succesCallbackCached;
        testImg.onerror = failureCallbackCached;
        testImg.onabort = failureCallbackCached;
        testImg.src = url;

        return testImg;
    });

    /**
     * @function {static} o2.DomHelper.loadScript
     *
     * <p>Asynchronously loads a <strong>script</strong> with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>script</strong> does not
     * have to be in the same domain as the web page.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>script</strong>.
     * @param {Function} callback - the callback to execute when the load
     * operation completes.
     */
    def(me, 'loadScript', function(src, callback) {
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
