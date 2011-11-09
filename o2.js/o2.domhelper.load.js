/**
 * @module domhelper.load
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>This package is for asynchronously loading resources such as images and
 * scripts.</p>
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var nill = framework.nill;
    var Image = window.Image;
    var setTimeout = window.setTimeout;

    /*
     * Common strings.
     */
    var kLink = 'link';
    var kHead = 'head';
    var kRel = 'rel';
    var kSheet = 'stylesheet';
    var kScript = 'script';
    var kSheetType = 'text/css';
    var kScriptType = 'text/javascript';

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
     */
    //TODO: update documentation.
    me.loadScript = function(src, callback) {
        var s = document.createElement(kScript);
        var x = document.getElementsByTagName(kScript)[0] ||
            document.getElementsByTagName(kHead)[0];

        s.type = kScriptType;
        s.async = true;
        s.src = src;

        x.parentNode.insertBefore(s, x);

        if(!callback) {
            return;
        }

        //TODO: test the below callbacks in a wide spectrum of browsers:

        s.onreadystatechange = function() {
            if((/loaded|complete/).test(s.readyState)) {
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
     */
    //TODO: update documentation.
    me.loadCss = function(src, callback) {
        var s = document.createElement(kLink);
        var x = document.getElementsByTagName(kHead)[0];

        s.setAttribute(kRel, kSheet);
        s.type = kSheetType;
        s.href = src;

        x.appendChild(s);

        if(!callback) {
            return;
        }

        //TODO: test the below callbacks in a wide spectrum of browsers:

        s.onreadystatechange = function(){
            if(/loaded|complete/.test(s.readyState)) {
                callback();
            }
        };

        s.onload = callback;

        (function check(){
            try {
                var temp = null;
                temp = s.sheet.cssRule;
            } catch(e){
                setTimeout(check, 20);
                return;
            }

            callback();
        }());
    };

    me.loadImage = function(src, callback) {
        var img = new Image();
        img.onload = callback;
        img.src = src;
    };
}(this.o2, this, this.document));
