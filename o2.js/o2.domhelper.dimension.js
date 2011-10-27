/**
 * @module domhelper.dimension
 * @requires domhelper.core
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
     * Aliases
     */
    var me = framework.DomHelper;

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
}(this.o2, this, this.document));
