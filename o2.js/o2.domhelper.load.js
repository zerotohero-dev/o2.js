/**
 * @module   domhelper.load
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-25 09:29:22.238661
 * -->
 *
 * <p>This package is for asynchronously loading resources such as images and
 * scripts.</p>
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Aliases
     */
    var me           = framework.DomHelper;
    var myName       = framework.name;
    var nill         = framework.nill;
    var format       = framework.StringHelper.format;
    var concat       = framework.StringHelper.concat;
    var generateGuid = framework.StringHelper.generateGuid;
    var Image        = window.Image;
    var setTimeout   = window.setTimeout;

    /*
     * Common Strings
     */
    var kLink       = 'link';
    var kHead       = 'head';
    var kRel        = 'rel';
    var kSheet      = 'stylesheet';
    var kScript     = 'script';
    var kSheetType  = 'text/css';
    var kScriptType = 'text/javascript';

    /*
     * Common Constants
     */
    var kMaxCssCheckAttempt = 500;
    var kCssCheckInterval   = 100;
    var kCssId              = concat(myName, '-css-{0}');

    /*
     * Common Regular Expressions
     */
    var kCompleteRegExp = /loaded|complete/;

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
     * @param {String} url - the <strong>URL</strong> of the
     * <strong>image</strong>.
     * @param {Function} successCallback - gets called when the
     * <strong>image</strong> is loaded successfully.
     * @param {Function} failureCallback - gets called when the
     * <strong>image</strong> can <strong>not</strong> be loaded successfully.
     */
    me.loadImage = function(url, succesCallback, failureCallback) {
        var succesCallbackCached = succesCallback || nill;
        var failureCallbackCached = failureCallback || nill;
        var testImg = new Image();

        testImg.onload = succesCallbackCached;
        testImg.onerror = failureCallbackCached;
        testImg.onabort = failureCallbackCached;
        testImg.src = url;

        return testImg;
    };

    /**
     * @function {static} o2.DomHelper.loadScript
     *
     * <p>Asynchronously loads a <strong>script</strong> with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>script</strong> does not
     * have to be in the same domain as the web page.</p>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>script</strong>.
     * @param {Function} callback - the callback to execute when the load
     * operation completes.
     */
    me.loadScript = function(src, callback) {
        var s = document.createElement(kScript);
        var x = document.getElementsByTagName(kScript)[0] ||
            document.getElementsByTagName(kHead)[0];

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
    };

    /**
     * @function {static} o2.DomHelper.loadCss
     *
     * <p>Asynchronously loads a <strong>css</strong> file with a given
     * <strong>src</strong>.</p>
     * <p>Cross-domain loading is also okay: The <strong>css</strong> file does
     * not have to be in the same domain as the web page.</p>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>css</strong> file.
     * @param {Function} callback - the callback to execute when the load
     * operation completes.
     */
    me.loadCss = function(src, callback) {
        var s = document.createElement(kLink);
        var x = document.getElementsByTagName(kHead)[0];

        var id = format(kCssId, generateGuid());
        var counter = 0;

        s.setAttribute(kRel, kSheet);

        s.id = id;
        s.type = kSheetType;
        s.href = src;

        x.appendChild(s);

        setTimeout(function check() {
            var sheets = document.styleSheets;

            var i = 0;
            var len = 0;
            var sheet = null;

            for (i = 0, len = sheets.length; i < len; i++) {
                sheet = sheets[i];
                sheet = sheet.ownerNode || sheet.owningElement;

                if (sheet && sheet.id === id) {
                    callback();
                    break;
                }
            }

            counter++;

            if(counter <= kMaxCssCheckAttempt) {
                setTimeout(check, kCssCheckInterval);
            }
        }, kCssCheckInterval);
    };

    /**
     * @function {static} o2.DomHelper.loadImage
     *
     * <p>Asynchronously loads (precaches) an <strong>image</strong> file
     * with a given <strong>src</strong>.</p>
     *
     * @param {String} src - the source <strong>URL</strong> of the
     * <strong>image</strong> file.
     * @param {Function} callback - the callback to execute when the load
     * operation completes.
     */
    me.loadImage = function(src, callback) {
        var img = new Image();
        img.onload = callback;
        img.src = src;
    };
}(this.o2, this, this.document));
