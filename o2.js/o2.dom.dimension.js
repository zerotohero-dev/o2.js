/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window, document, UNDEFINED) {
    'use strict';

    /**
     * @module   dom.dimension
     *
     * @requires core
     * @requires dom.style
     * @requires string.core
     *
     * <p>Includes dimension (<strong>i.e. width-height related</strong>)
     * helper methods.</p>
     */
    fp.ensure(
        'dom.dimension',
    [
        'core',
        'dom.style',
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
         * Dom (dimension)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = require('$'),

        /*
         * string.core
         */
        concat = require('String', 'concat'),

        /*
         * dom.style
         */
        setStyle = require(kModuleName, 'setStyle'),

        /*
         * native
         */
        max = attr(Math, 'max'),

        /*
         * # Common Constants
         */

        kHeight    = 'height',
        kModernCss = 'CSS1Compat',
        kPixel     = 'px',
        kWidth     = 'width',

        /*
         * # To be Overridden
         */

        getDocumentElement      = null,
        getDimension            = null,
        getDocumentDimension    = null,
        getWindowInnerDimension = null,
        setWidth                = null,
        setHeight               = null;

    /*
     *
     */
    getDocumentElement = function() {

        // document.body can be null while refreshing.
        if (!document || !document.body) {return null;}

        var result = (document.documentElement &&
            document.compatMode === kModernCss
        ) ? document.documentElement : document.body;

        getDocumentElement = function() {return result;};

        return result;
    };

    /**
     * @function {static} o2.Dom.getDimension
     *
     * <p>Gets the dimension of the given element in the form
     * <code>{width: w, height: h}</code>, where <strong>w</strong> and
     * <strong>h</strong> are in pixels.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var dimensions = o2.Dom.getDimension('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the dimension of the <strong>DOMNode</strong> in the form
     * <code>{width: w, height: h}</code>.
     */
    exports.getDimension = def(me, 'getDimension', function(obj) {
        obj = $(obj);

        if (!obj || obj.offsetWidth === UNDEFINED) {
            return {width : 0, height : 0};
        }

        return {
            width  : obj.offsetWidth,
            height : obj.offsetHeight
        };
    });

    /*
     *
     */
    getDimension = require(kModuleName, 'getDimension');

    /**
     * @function {static} o2.Dom.getDocumentDimension
     *
     * <p>Gets the dimension of the document in the form <code>{width: w,
     * height: h}</code>. If the visible (i.e. <code>clientHeight</code>) is
     * greater than the document's height returns the height of the visible
     * area as the height portion.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var viewportInfo = o2.Dom.getDocumentDimension();
     * </pre>
     *
     * @return the dimension of the document in the form <code>{width: w,
     * height: h}</code>.
     */
    exports.getDocumentDimension = def(me, 'getDocumentDimension', function() {
        var doc = getDocumentElement();

        if(!doc) {return {width : 0, height : 0};}

        return {
            width : max(
                doc.scrollHeight,
                doc.offsetHeight,
                doc.clientHeight
            ),
            height : max(
                doc.scrollWidth,
                doc.offsetWidth,
                doc.clientWidth
            )
        };
    });

    /*
     *
     */
    getDocumentDimension = require(kModuleName, 'getDocumentDimension');

    /**
     * @function {static} o2.Dom.getDocumentHeight
     *
     * <p>Gets the total height of the document in pixels.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var viewportHeight = o2.Dom.getDocumentHeight();
     * </pre>
     *
     * @return the document's height.
     */
    exports.getDocumentHeight = def(me, 'getDocumentHeight', function() {
        return getDocumentDimension().height;
    });

    /**
     * @function {static} o2.Dom.getDocumentWidth
     *
     * <p>Gets the total width of the document in pixels.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var viewportWidth = o2.Dom.getDocumentWidth();
     * </pre>
     *
     * @return the document's width.
     */
    exports.getDocumentWidth = def(me, 'getDocumentWidth', function() {
        return getDocumentDimension().width;
    });

    /**
     * @function {static} o2.Dom.getHeight
     *
     * <p>Gets the <strong>height</strong> of the given element, in pixels.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var containerHeight = o2.Dom.getHeight('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * @return the height of the element, in pixels.
     */
    exports.getHeight = def(me, 'getHeight', function(obj) {
        return getDimension(obj).height;
    });

    /**
     * @function {static} o2.Dom.getViewportInfo
     *
     * <p>Gets the viewport information in the form
     * <code>{scrollTop : #, scrollLeft: #, width: #, height: #}</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var details = o2.Dom.getViewportInfo();
     * </pre>
     *
     * @return the viewport information.
     */
    exports.getViewportInfo = def(me, 'getViewportInfo', function() {
        var d    = getDocumentElement(),
            self = window.self;

        if (!d) {
            return {
                scrollTop  : 0,
                scrollLeft : 0,
                width      : 0,
                height     : 0
            };
        }

        return {
            scrollTop  : d.scrollTop,
            scrollLeft : d.scrollLeft,
            width      : self.innerWidth  || d.clientWidth,
            height     : self.innerHeight || d.clientHeight
        };
    });

    /**
     * @function {static} o2.Dom.getWidth
     *
     * <p>Gets the <strong>width</strong> of the given element, in pixels.</p>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var elementWidth = o2.Dom.getWidth('container');
     * </pre>
     *
     * @return the width of the element, in pixels.
     */
    exports.getWidth = def(me, 'getWidth', function(obj) {
        return getDimension(obj).width;
    });

    if (window.innerWidth !== UNDEFINED) {

        /**
         * @function {static} o2.Dom.getWindowInnerDimension
         *
         * <p>Gets the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var windowDimensions = o2.Dom.getWindowInnerDimension();
         * </pre>
         *
         * @return the dimension of the visible area of the browser in the form
         * <code>{width: w, height: h}</code>.
         */
        exports.getWindowInnerDimension = def(me, 'getWindowInnerDimension',
                    function() {
            return {
                width  : window.innerWidth  || 0,
                height : window.innerHeight || 0
            };
        });
    } else {
        exports.getWindowInnerDimension = def(me, 'getWindowInnerDimension',
                    function() {
            var doc = getDocumentElement();

            if (!doc) {
                return {width : 0, height : 0};
            }

            return {
                width  : doc.clientWidth  || 0,
                height : doc.clientHeight || 0
            };
        });
    }

    /*
     *
     */
    getWindowInnerDimension = require(kModuleName, 'getWindowInnerDimension');

    /**
     * @function {static} o2.Dom.getWindowInnerHeight
     *
     * <p>Gets the inner height of the visible area.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var innerHeight = o2.Dom.getWindowInnerHeight();
     * </pre>
     *
     * @return the inner height of the window in pixels.
     */
    exports.getWindowInnerHeight = def(me, 'getWindowInnerHeight', function() {
        return getWindowInnerDimension().height;
    });

    /**
     * @function {static} o2.Dom.getWindowInnerWidth
     *
     * <p>Gets the inner width of the visible area.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var innerWidth = o2.Dom.getWindowInnerWidth();
     * </pre>
     *
     * @return the inner width of the window in pixels.
     */
    exports.getWindowInnerWidth = def(me, 'getWindowInnerWidth', function() {
        return getWindowInnerDimension().width;
    });

    /**
     * @function {static} o2.Dom.setWidth
     *
     * <p>Sets the <strong>width</strong> of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setWidth('container', 500);
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} width - the new width in pixels.
     */
    exports.setWidth = def(me, 'setWidth', function(obj, width) {
        obj = $(obj);

        if (!obj) {return;}

        var difference = 0,
            cssWidth   = 0;

        // IE (as always) doesn't play nice with the box model.
        // The calculation below takes care of that.
        // Also note that since offsetWidth is a read-only property
        // we can only change the element's width through it's style
        // collection.

        if (obj.offsetWidth !== UNDEFINED) {
            setStyle(obj, kWidth, concat(width, kPixel));

            difference = obj.offsetWidth - width;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssWidth = width - difference;

        if (cssWidth <= 0) {return;}

        setStyle(obj, kWidth, concat(width, kPixel));
    });

    /*
     *
     */
    setWidth = require(kModuleName, 'setWidth');

    /**
     * @function {static} o2.Dom.setHeight
     *
     * <p>Sets the <strong>height</strong> of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setHeight('container', 300);
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Integer} height - the new height in pixels.
     */
     exports.setHeight = def(me, 'setHeight', function(obj, height) {
        obj = $(obj);

        if (!obj) {return;}

        var difference = 0,
            cssHeight  = 0;

        if (obj.offsetWidth !== UNDEFINED) {
            setStyle(obj, kHeight, concat(height, kPixel));
            difference = obj.offsetHeight - height;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssHeight = height - difference;

        if (cssHeight <= 0) {return;}

        setStyle(obj, kHeight, concat(height, kPixel));
    });


    /*
     *
     */
    setHeight = require(kModuleName, 'setHeight');

    /**
     * @function {static} o2.Dom.setDimension
     *
     * <p>Sets the dimension of the given element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.setDimension('container', {width: 400, height: 200});
     * </pre>
     *
     * @param {Object} obj - the <strong>DOMNode</strong> to get the dimension
     * of, or the <code>String</code> <strong>id</strong> of it.
     * @param {Object} dimension - the new dimension in the form
     * <code>{width: w, height: h}</code>.
     */
    exports.setDimension = def(me, 'setDimension', function(obj, dimension) {
        obj = $(obj);

        if (!obj) {return;}

        setWidth (obj, dimension.width);
        setHeight(obj, dimension.height);
    });
}(this.o2, this.o2.protecteds, this, this.document));

