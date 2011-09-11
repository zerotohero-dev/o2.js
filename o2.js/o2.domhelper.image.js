/*global window, o2*/

/*
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE file for details.
 */

if(!o2.DomHelper) {
    o2.DomHelper = {};
}

/**
 * @module o2.domhelper.image
 * @requires o2
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>Includes image-related <strong>DOM</strong> helper methods.</p>
 */
( function(me, window, UNDEFINED) {

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
        //
        succesCallback = succesCallback || o2.nill;
        failureCallback = failureCallback || o2.nill;
        var testImg = new Image();
        testImg.onload = succesCallback;
        testImg.onerror = failureCallback;
        testImg.onabort = failureCallback;
        testImg.src = url;
        return testImg;

    };

}(o2.DomHelper, this));
