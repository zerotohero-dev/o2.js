/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window, document) {
    'use strict';

    /**
     * @module   dom.load
     *
     * @requires core
     * @requires string.core
     *
     * <p>This package is for asynchronously loading resources such as images
     * and scripts.</p>
     */
    fp.ensure(
        'dom.load',
    [
        'core',
        'string.core'
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

        kModuleName = 'Dom',

        /*
         * Dom (load)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        frameworkName = require('name'),
        nill          = require('nill'),

        /*
         * string.core
         */
        kString       = 'String',
        concat        = require(kString, 'concat'),
        format        = require(kString, 'format'),
        generateGuid  = require(kString, 'generateGuid'),

        /*
         * # Common Strings
         */

        kCssId      = concat(frameworkName, '-css-{0}'),
        kHead       = 'head',
        kLink       = 'link',
        kRel        = 'rel',
        kScript     = 'script',
        kScriptType = 'text/javascript',
        kSheet      = 'stylesheet',
        kSheetType  = 'text/css',

        /*
         * # Common Constants
         */

        kCssCheckInterval   = 100,
        kMaxCssCheckAttempt = 500,

        /*
         * # Common Regular Expressions
         */

        kCompleteRegExp = /loaded|complete/,

        /*
         * # Minimal Browser Detection
         *
         *     "In the future, they said; things will be better, they said."
         *
         *     It's year 2012+ and it's a shame that still sometimes the only
         *     workaround is browser sniffing.
         */

        kM$     = 'MSIE',
        isCrap  = window.navigator.userAgent.indexOf(kM$) > -1 &&
            !window.opera,
        isOpera = !!window.opera;

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
    exports.loadCss = def(me, 'loadCss', function(src, successCallback) {
        var s = document.createElement(kLink),
            x = document.getElementsByTagName(kHead)[0] || document.body,

            id      = format(kCssId, generateGuid()),
            counter = 0,

            onsuccess = successCallback || nill;

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
            var i      = 0,
                len    = 0,
                sheet  = null,
                sheets = document.styleSheets;

            if (onsuccess === nill) {return;}

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
    exports.loadImage = def(me, 'loadImage', function(url, succesCallback) {
        var succesCallbackCached = succesCallback || nill,
            testImg = null;

        function done() {
            succesCallbackCached();
            succesCallbackCached = nill;
        }

        testImg = new window.Image();

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
    exports.loadScript = def(me, 'loadScript', function(src, callback) {
        var s = document.createElement(kScript),
            x = document.getElementsByTagName(kScript)[0] ||
                document.getElementsByTagName(kHead)[0];

        s.type  = kScriptType;
        s.async = true;
        s.src   = src;

        x.parentNode.insertBefore(s, x);

        if (!callback) {return;}

        s.onreadystatechange = function() {
            if(kCompleteRegExp.test(s.readyState)) {
                callback();
            }
        };

        s.onload = callback;
    });
}(this.o2, this.o2.protecteds, this, this.document));
