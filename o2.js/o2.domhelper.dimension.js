/**
 * @module   domhelper.dimension
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 09:30:02.728672
 * -->
 *
 * <p>Includes dimension (<strong>i.e. width-height related</strong>) helper
 * methods.</p>
 */
(function(framework, window, document) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = use(framework.DomHelper);
    var $ = use(framework.$);
    var concat = use(framework.StringHelper.concat);

    var self = window.self;

    /*
     * Common Constants
     */
    var kWidth  = 'width';
    var kHeight = 'height';
    var kPixel  = 'px';
    var kLegacyCss = 'CSS1Compat';

    if (document.documentElement) {

        /**
         * @function {static} o2.DomHelper.getDocumentDimension
         *
         * <p>Gets the dimension of the document in the form <code>{width: w,
         * height: h}</code>. If the visible (i.e. <code>clientHeight</code>) is
         * greater than the document's height returns the height of the visible area
         * as the height portion.
         *
         * @return the dimension of the document in the form <code>{width: w,
         * height: h}</code>.
         */
        me.getDocumentDimension = function() {
            var d = document;

            // d.body can be null when refreshing.
            if (!d || !d.body) {
                return {
                    width : 0,
                    height : 0
                };
            }

            var height = Math.max(
                d.body.scrollHeight, d.documentElement.scrollHeight,
                d.body.offsetHeight, d.documentElement.offsetHeight,
                d.body.clientHeight, d.documentElement.clientHeight
            );
            var width = Math.max(
                d.body.scrollWidth, d.documentElement.scrollWidth,
                d.body.offsetWidth, d.documentElement.offsetWidth,
                d.body.clientWidth, d.documentElement.clientWidth
            );

            return {
                width : width,
                height : height
            };
        };
    } else {
        me.getDocumentDimension = function() {
            var d = document;

            if (!d || !d.body) {
                return {
                    width : 0,
                    height : 0
                };
            }

            var height = Math.max(
                d.body.scrollHeight, d.body.offsetHeight, d.body.clientHeight
            );
            var width = Math.max(
                d.body.scrollWidth, d.body.offsetWidth, d.body.clientWidth
            );

            return {
                width : width,
                height : height
            };
        };
    }

    /**
     * @function {static} o2.DomHelper.getDocumentWidth
     *
     * <p>Gets the total width of the document in pixels.</p>
     *
     * @return the document's width.
     */
    me.getDocumentWidth = function() {
        return me.getDocumentDimension().width;
    };

    /**
     * @function {static} o2.DomHelper.getDocumentHeight
     *
     * <p>Gets the total height of the document in pixels.</p>
     *
     * @return the document's height.
     */
    me.getDocumentHeight = function() {
        return me.getDocumentDimension().height;
    };

    if (window.innerWidth !== undefined) {
        /**
         * @function {static} o2.DomHelper.getWindowInnerDimension
         *
         * <p>Gets the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         *
         * @return the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         */
        me.getWindowInnerDimension = function() {
            if (!window) {
                return {
                    width : 0,
                    height : 0
                };
            }

            return {
                width : window.innerWidth,
                height : window.innerHeight
            };
        };
    } else if (document.documentElement &&
                document.documentElement.clientWidth) {
       me.getWindowInnerDimension = function() {
            var d = document.documentElement;

            if (!d) {
                return {
                    width : 0,
                    height : 0
                };
            }

            return {
                width : d.clientWidth,
                height : d.clientHeight
            };
        };
    } else {
        me.getWindowInnerDimension = function() {
            var d = document.body;

            if (!d) {
                return {
                    width : 0,
                    height : 0
                };
            }

            return {
                width : d.clientWidth,
                height : d.clientHeight
            };
        };
    }

    /**
     * @function {static} o2.DomHelper.getWindowInnerWidth
     *
     * <p>Gets the inner width of the visible area.</p>
     *
     * @return the inner width of the window in pixels.
     */
    me.getWindowInnerWidth = function() {
        return me.getWindowInnerDimension().width;
    };

    /**
     * @function {static} o2.DomHelper.getWindowInnerHeight
     *
     * <p>Gets the inner height of the visible area.</p>
     *
     * @return the inner height of the window in pixels.
     */
    me.getWindowInnerHeight = function() {
        return me.getWindowInnerDimension().height;
    };

    /**
     * @function {static} o2.DomHelper.getDimension
     *
     * <p>Gets the dimension of the given element in the form
     * <code>{width: w, height: h}</code>, where <strong>w</strong> and
     * <strong>h</strong> are in pixels.
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the dimension of the <strong>DOMNode</strong> in the form
     * <code>{width: w, height: h}</code>.
     */
    me.getDimension = function(obj) {
        obj = $(obj);

        if (!obj || obj.offsetWidth === undefined) {
            return {
                width : 0,
                height : 0
            };
        }

        return {
            width : obj.offsetWidth,
            height : obj.offsetHeight
        };
    };

    /**
     * @function {static} o2.DomHelper.getWidth
     *
     * <p>Gets the <strong>width</strong> of the given element, in pixels.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the width of the element, in pixels.
     */
    me.getWidth = function(obj) {
        return me.getDimension(obj).width;
    };

    /**
     * @function {static} o2.DomHelper.getHeight
     *
     * <p>Gets the <strong>height</strong> of the given element, in pixels.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the height of the element, in pixels.
     */
    me.getHeight = function(obj) {
        return me.getDimension(obj).height;
    };

    /**
     * @function {static} o2.DomHelper.setWidth
     *
     * <p>Sets the <strong>width</strong> of the given element.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} width - the new width in pixels.
     */
    me.setWidth = function(obj, width) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var difference = 0;
        var cssWidth = 0;

        // IE (as always) doesn't play nice with the box model.
        // The calculation below takes care of that.
        // Also note that since offsetWidth is a read-only property
        // we can only change the element's width through it's style
        // collection.

        if (obj.offsetWidth !== undefined) {
            me.setStyle(obj, kWidth, concat(width, kPixel));
            difference = obj.offsetWidth - width;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssWidth = width - difference;

        if (cssWidth <= 0) {
            return;
        }

        me.setStyle(obj, kWidth, concat(width, kPixel));
    };

    /**
     * @function {static} o2.DomHelper.setHeight
     *
     * <p>Sets the <strong>height</strong> of the given element.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} height - the new height in pixels.
     */
    me.setHeight = function(obj, height) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var difference = 0;
        var cssHeight = 0;

        if (obj.offsetWidth !== undefined) {
            me.setStyle(obj, kHeight, concat(height, kPixel));
            difference = obj.offsetHeight - height;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssHeight = height - difference;

        if (cssHeight <= 0) {
            return;
        }

        me.setStyle(obj, kHeight, concat(height, kPixel));
    };

    /**
     * @function {static} o2.DomHelper.setDimension
     *
     * <p>Sets the dimension of the given element.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Object} dimension - the new dimension in the form
     * <code>{width: w, height: h}</code>.
     */
    me.setDimension = function(obj, dimension) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        me.setWidth(obj, dimension.width);
        me.setHeight(obj, dimension.height);
    };

    /*
     *
     */
    var getDocumentElement = function() {
        var result = (document.documentElement &&
            document.compatMode === kLegacyCss
        ) ? document.documentElement : document.body;

        getDocumentElement = function() {
            return result;
        };

        return result;
    };

    /**
     * @function {static} o2.DomHelper.getViewportInfo
     *
     * <p>Gets the viewport information in the form
     * <code>{scrollTop : #, scrollLeft: #, width: #, height: #}</code>.</p>
     *
     * @return the viewport information.
     */
    me.getViewportInfo = function() {
        var d  = getDocumentElement();

        return {
            scrollTop : d.scrollTop,
            scrollLeft : d.scrollLeft,
            width : self.innerWidth || d.clientWidth,
            height : self.innerHeight || d.clientHeight
        };
    };
}(this.o2, this, this.document));
