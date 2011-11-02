/**
 * @module domhelper.dimension
 * @requires domhelper.core
 * @requires stringhelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>Includes dimension (<strong>i.e. width-height related</strong>) helper
 * methods.</p>
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var concat = framework.StringHelper.concat;

    /*
     * Common constants
     */
    var kWidth = 'width';
    var kHeight = 'height';
    var kPixel = 'px';

    /**
     * @function {static} o2.DomHelper.getDocumentDimension
     *
     * <p>Gets the dimension of the document in the form <code>{width: w, height:
     * h}</code>. If the visible (i.e. <code>clientHeight</code>) is greater than
     * the document's height returns the height of the visible area as the height
     * portion.
     *
     * @return the dimension of the document in the form <code>{width: w, height:
     * h}</code>.
     */
    me.getDocumentDimension = function() {
        if(document.documentElement) {
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

            return me.getDocumentDimension();
        }

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

        return me.getDocumentDimension();
    };

    //TODO: add documentation.
    me.getDocumentWidth = function() {
        return me.getDocumentDimension().width;
    };

    me.getDocumentHeight = function() {
        return me.getDocumentDimension().height;
    };

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
        if (window.innerWidth !== undefined) {
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

            return me.getWindowInnerDimension();
        }

        if(document.documentElement && document.documentElement.clientWidth) {
            me.getWindowInnerDimensions = function() {
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

            return me.getWindowInnerDimension();
        }

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

        return me.getWindowInnerDimension();
    };

    me.getWindowInnerWidth = function() {
        return me.getWindowInnerDimension().width;
    };

    me.getWindowInnerHeight = function() {
        return me.getWindowInnerDimension().height;
    };

    me.getDimension = function(obj) {
        obj = $(obj);

        if (!obj || obj.offsetWidth != undefined) {
            return {
                width : 0,
                height : 0
            };
        }

        if(!)

        return {
            width : obj.offsetWidth,
            height : obj.offsetHeight
        }
    };

    me.getWidth = function(obj) {
        return me.getDimension(obj).width;
    };

    me.getHeight = function(obj) {
        return me.getDimension(obj).height;
    };

    me.setWidth = function(obj, width) {
        obj = $(obj);

        if( !obj) {
            return;
        }

        var difference = 0;
        var cssWidth = 0;

        // IE (as always) doesn't play nice with the box model.
        // The calculation below takes care of that.
        // Also note that since offsetWidth is a read-only property
        // we can only change the element's width through it's style
        // collection.

        if (obj.offsetWidth != undefined) {
            me.setStyle(obj, kWidth, concat(width, kPixel);
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

    me.setHeight = function(obj, height) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var difference = 0;
        var cssHeight = 0;

        if (obj.offsetWidth != undefined) {
            me.setStyle(obj, kHeight, concat(height, kPixel);
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

    //TODO: add documentation.
    me.setDimension = function(obj, dimension) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        me.setWidth(obj, dimension.width);
        me.setHeight(obj, dimension.height);
    };

    me.getOffset = function(obj) {

    };

    me.offset = me.getOffset = function(obj) {
        return me.getOffset(obj);
    };

    me.getOffsetHeight = function(obj) {

    };

    me.offsetHeight = function(obj) {
        return me.getOffsetHeight(obj);
    }

    me.getOffsetWidth = function(obj) {

    };

    me.offsetWidth = function(obj) {
        return me.getOffsetWidth(obj);
    };
}(this.o2, this, this.document));
