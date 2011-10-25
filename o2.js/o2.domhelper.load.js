( function(framework, document, Image) {

    // Strict mode on.
    'use strict';

    var me = framework.DomHelper;
    var nill = framework.nill;

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
    me.loadScript = function(src) {

        var s = document.createElement('script');

        s.type = 'text/javascript';
        s.async = true;
        s.src = src;

        // @formatter:off
        var x = document.getElementsByTagName('script')[0] || 
            document.getElementsByTagName('head')[0];
        // @formatter:on

        x.parentNode.insertBefore(s, x);

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
    me.loadCss = function(src) {

        var s = document.createElement('link');

        s.setAttribute('rel', 'stylesheet');
        s.type = 'text/css';
        s.href = src;

        var x = document.getElementsByTagName('head')[0];

        x.appendChild(s);

    };

}(this.o2, this.document, this.Image));
