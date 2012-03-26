/**
 * @module   domhelper.dimension
 * @requires core
 * @requires domhelper.style
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:53:05.426552
 * -->
 *
 * <p>Includes dimension (<strong>i.e. width-height related</strong>) helper
 * methods.</p>
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
     * DomHelper (dimension)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $ = require('$');

    var concat = require('StringHelper', 'concat');

    var setStyle = require(kModuleName, 'setStyle');

    var self = attr(window, 'self');

    /*
     * Common Constants
     */
    var kHeight    = 'height';
    var kModernCss = 'CSS1Compat';
    var kPixel     = 'px';
    var kWidth     = 'width';

    /*
     *
     */
    var getDocumentElement = function() {

        // document.body can be null when refreshing.
        if (!document || !document.body) {
            return null;
        }

        var result = (document.documentElement &&
            document.compatMode === kModernCss
        ) ? document.documentElement : document.body;

        getDocumentElement = function() {
            return result;
        };

        return result;
    };

    /**
     * @function {static} o2.DomHelper.getDimension
     *
     * <p>Gets the dimension of the given element in the form
     * <code>{width: w, height: h}</code>, where <strong>w</strong> and
     * <strong>h</strong> are in pixels.
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the dimension of the <strong>DOMNode</strong> in the form
     * <code>{width: w, height: h}</code>.
     */
    def(me, 'getDimension', function(obj) {
        obj = $(obj);

        if (!obj || obj.offsetWidth === undefined) {
            return {width : 0, height : 0};
        }

        return {
            width : obj.offsetWidth,
            height : obj.offsetHeight
        };
    });

    /*
     *
     */
    var getDimension = require(kModuleName, 'getDimension');

    /**
     * @function {static} o2.DomHelper.getDocumentDimension
     *
     * <p>Gets the dimension of the document in the form <code>{width: w,
     * height: h}</code>. If the visible (i.e. <code>clientHeight</code>) is
     * greater than the document's height returns the height of the visible
     * area as the height portion.
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the dimension of the document in the form <code>{width: w,
     * height: h}</code>.
     */
    def(me, 'getDocumentDimension', function() {
        var doc = getDocumentElement();

        if(!doc) {
            return {width : 0, height : 0};
        }

        return {
            width : Math.max(
                doc.scrollHeight,
                doc.offsetHeight,
                doc.clientHeight
            ),
            height : Math.max(
                doc.scrollWidth,
                doc.offsetWidth,
                doc.clientWidth
            )
        };
    });

    /*
     *
     */
    var getDocumentDimension = require(kModuleName, 'getDocumentDimension');

    /**
     * @function {static} o2.DomHelper.getDocumentHeight
     *
     * <p>Gets the total height of the document in pixels.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the document's height.
     */
    def(me, 'getDocumentHeight', function() {
        return getDocumentDimension().height;
    });

    /**
     * @function {static} o2.DomHelper.getDocumentWidth
     *
     * <p>Gets the total width of the document in pixels.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the document's width.
     */
    def(me, 'getDocumentWidth', function() {
        return getDocumentDimension().width;
    });

    /**
     * @function {static} o2.DomHelper.getHeight
     *
     * <p>Gets the <strong>height</strong> of the given element, in pixels.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the height of the element, in pixels.
     */
    def(me, 'getHeight', function(obj) {
        return getDimension(obj).height;
    });

    /**
     * @function {static} o2.DomHelper.getViewportInfo
     *
     * <p>Gets the viewport information in the form
     * <code>{scrollTop : #, scrollLeft: #, width: #, height: #}</code>.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the viewport information.
     */
    def(me, 'getViewportInfo', function() {
        var d  = getDocumentElement();

        if (!d) {
            return {
                scrollTop : 0,
                scrollLeft : 0,
                width : 0,
                height : 0
            };
        }

        return {
            scrollTop : d.scrollTop,
            scrollLeft : d.scrollLeft,
            width : self.innerWidth || d.clientWidth,
            height : self.innerHeight || d.clientHeight
        };
    });

    /**
     * @function {static} o2.DomHelper.getWidth
     *
     * <p>Gets the <strong>width</strong> of the given element, in pixels.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the width of the element, in pixels.
     */
    def(me, 'getWidth', function(obj) {
        return getDimension(obj).width;
    });

    if (window.innerWidth !== undefined) {
        /**
         * @function {static} o2.DomHelper.getWindowInnerDimension
         *
         * <p>Gets the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         *
         * <p>Usage example:</p>
         *
         * <pre>
         * //TODO: add usage example.
         * </pre>
         *
         * @return the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         */
        def(me, 'getWindowInnerDimension', function() {
            return {
                width : window.innerWidth || 0,
                height : window.innerHeight || 0
            };
        });
    } else {
        def(me, 'getWindowInnerDimension', function() {
            var doc = getDocumentElement();

            if (!doc) {
                return {width : 0, height : 0};
            }

            return {
                width : doc.clientWidth || 0,
                height : doc.clientHeight || 0
            };
        });
    }

    /*
     *
     */
    var getWindowInnerDimension = require(kModuleName,
        'getWindowInnerDimension');

    /**
     * @function {static} o2.DomHelper.getWindowInnerHeight
     *
     * <p>Gets the inner height of the visible area.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the inner height of the window in pixels.
     */
    def(me, 'getWindowInnerHeight', function() {
        return getWindowInnerDimension().height;
    });

    /**
     * @function {static} o2.DomHelper.getWindowInnerWidth
     *
     * <p>Gets the inner width of the visible area.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the inner width of the window in pixels.
     */
    def(me, 'getWindowInnerWidth', function() {
        return getWindowInnerDimension().width;
    });

    /**
     * @function {static} o2.DomHelper.setWidth
     *
     * <p>Sets the <strong>width</strong> of the given element.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} width - the new width in pixels.
     */
    def(me, 'setWidth', function(obj, width) {
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
            setStyle(obj, kWidth, concat(width, kPixel));
            difference = obj.offsetWidth - width;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssWidth = width - difference;

        if (cssWidth <= 0) {
            return;
        }

        setStyle(obj, kWidth, concat(width, kPixel));
    });

    /*
     *
     */
     var setWidth = require(kModuleName, 'setWidth');

    /**
     * @function {static} o2.DomHelper.setHeight
     *
     * <p>Sets the <strong>height</strong> of the given element.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} height - the new height in pixels.
     */
    def(me, 'setHeight', function(obj, height) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var difference = 0;
        var cssHeight = 0;

        if (obj.offsetWidth !== undefined) {
            setStyle(obj, kHeight, concat(height, kPixel));
            difference = obj.offsetHeight - height;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssHeight = height - difference;

        if (cssHeight <= 0) {
            return;
        }

        setStyle(obj, kHeight, concat(height, kPixel));
    });

    /*
     *
     */
    var setHeight = require(kModuleName, 'setHeight');

    /**
     * @function {static} o2.DomHelper.setDimension
     *
     * <p>Sets the dimension of the given element.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Object} dimension - the new dimension in the form
     * <code>{width: w, height: h}</code>.
     */
    def(me, 'setDimension', function(obj, dimension) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        setWidth(obj, dimension.width);
        setHeight(obj, dimension.height);
    });
}(this.o2, this, this.document));
