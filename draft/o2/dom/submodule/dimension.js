define([
    '../../core',
    '../../string/core',
    './submodule/style'
], function(
    o2,
    StringUtil,
    StyleUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = o2.$,

        /*
         * string.core
         */
        concat = StringUtil.concat,

        /*
         * dom.style
         */
        setStyle = StyleUtil.setStyle,

        /*
         * native
         */
        max = Math.max,

        /*
         * # Common Constants
         */

        kHeight = 'height',
        kModernCss = 'CSS1Compat',
        kPixel = 'px',
        kWidth = 'width',

        /*
         * # To Be Overridden
         */

        getDocumentElement,
        getDimension,
        getDocumentDimension,
        getWindowInnerDimension,
        setWidth,
        setHeight;

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

    exports.getDimension = function(obj) {
        obj = $(obj);

        if (!obj || obj.offsetWidth === undefined) {
            return {width : 0, height : 0};
        }

        return {
            width: obj.offsetWidth,
            height: obj.offsetHeight
        };
    };

    /*
     *
     */
    getDimension = exports.getDimension;

    exports.getDocumentDimension = function() {
        var doc = getDocumentElement();

        if(!doc) {return {width : 0, height : 0};}

        return {
            width: max(
                doc.scrollHeight,
                doc.offsetHeight,
                doc.clientHeight
            ),
            height: max(
                doc.scrollWidth,
                doc.offsetWidth,
                doc.clientWidth
            )
        };
    };

    /*
     *
     */
    getDocumentDimension = exports.getDocumentDimension;

    exports.getDocumentHeight = function() {
        return getDocumentDimension().height;
    };

    exports.getDocumentWidth = function() {
        return getDocumentDimension().width;
    };

    exports.getHeight = function(obj) {
        return getDimension(obj).height;
    };

    exports.getViewportInfo = function() {
        var d = getDocumentElement(),
            self = window.self;

        if (!d) {
            return {
                scrollTop: 0,
                scrollLeft: 0,
                width: 0,
                height: 0
            };
        }

        return {
            scrollTop: d.scrollTop,
            scrollLeft: d.scrollLeft,
            width: self.innerWidth || d.clientWidth,
            height: self.innerHeight || d.clientHeight
        };
    };

    exports.getWidth = function(obj) {
        return getDimension(obj).width;
    };

    if (window.innerWidth !== undefined) {
        exports.getWindowInnerDimension = function() {
            return {
                width: window.innerWidth || 0,
                height: window.innerHeight || 0
            };
        };
    } else {
        exports.getWindowInnerDimension = function() {
            var doc = getDocumentElement();

            if (!doc) {
                return {width: 0, height: 0};
            }

            return {
                width: doc.clientWidth || 0,
                height: doc.clientHeight || 0
            };
        };
    }

    /*
     *
     */
    getWindowInnerDimension = exports.getWindowInnerDimension;

    exports.getWindowInnerHeight = function() {
        return getWindowInnerDimension().height;
    };

    exports.getWindowInnerWidth = function() {
        return getWindowInnerDimension().width;
    };

    exports.setWidth = function(obj, width) {
        obj = $(obj);

        if (!obj) {return;}

        var difference = 0,
            cssWidth = 0;

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

        if (cssWidth <= 0) {return;}

        setStyle(obj, kWidth, concat(width, kPixel));
    };

    /*
     *
     */
    setWidth = exports.setWidth;

    exports.setHeight = function(obj, height) {
        obj = $(obj);

        if (!obj) {return;}

        var difference = 0,
            cssHeight = 0;

        if (obj.offsetWidth !== undefined) {
            setStyle(obj, kHeight, concat(height, kPixel));
            difference = obj.offsetHeight - height;
        }

        if (isNaN(difference)) {
            difference = 0;
        }

        cssHeight = height - difference;

        if (cssHeight <= 0) {return;}

        setStyle(obj, kHeight, concat(height, kPixel));
    };


    /*
     *
     */
    setHeight = exports.setHeight;

    exports.setDimension = function(obj, dimension) {
        obj = $(obj);

        if (!obj) {return;}

        setWidth (obj, dimension.width);
        setHeight(obj, dimension.height);
    };

    return exports;
});
