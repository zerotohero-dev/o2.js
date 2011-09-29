/*global o2 */

( function(framework, window, UNDEFINED) {
    //TODO: add documentation.
    
    var me = framework.DomHelper;
    var nill = framework.nill;
    
    /**
     * @funciton {static} o2.DomHelper.loadImage
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

    me.loadScript = function(src) {

        var s = document.createElement('script');

        s.type = 'text/javascript';
        s.async = true;
        s.src = src;

        var x = document.getElementsByTagName('script')[0] || document.getElementsByTagName('head')[0];

        x.parentNode.insertBefore(s, x);

    };


    me.loadCss = function(src) {

        var s = document.createElement('link');

        s.setAttribute('rel', 'stylesheet');
        s.type = 'text/css';
        s.href = src;

        var x = document.getElementsByTagName('head')[0];

        x.appendChild(s);

    };

}(o2, this));
