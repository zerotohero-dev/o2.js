/**
 * @module   domhelper.scroll
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A window/div scroll helper.</p>
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var $ = framework.$;

    /**
     * @function {static} o2.DomHelper.scrollWindowToBottom
     *
     * <p>Scrolls window to bottom.</p>
     */
    me.scrollWindowToBottom = function() {
        if (document.documentElement) {
            me.scrollWindowToBottom = function() {
                document.body.scrollTop = document.body.scrollHeight;
                document.documentElement.scrollTop =
                    document.documentElement.scrollHeight;
            };

            me.scrollWindowToBottom();

            return;
        }

        me.scrollWindowToBottom = function() {
            document.body.scrollTop = document.body.scrollHeight;
        };

        me.scrollWindowToBottom();
    };

    /**
     * @function {static} o2.DomHelper.scrollWindowToTop
     *
     * <p>Scrolls window to top.</p>
     */
    me.scrollWindowToTop = function() {
        if(document.documentElement) {
            me.scrollWindowToTop = function() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            };

            me.scrollWindowToTop();

            return;
        }

        me.scrollWindowToTop = function() {
            document.body.scrollTop = 0;
        };

        me.scrollWindowToTop();
    };

    /**
     * @function {static} o2.DomHelper.scrollObjectToTop
     *
     * <p>Scrolls an element to top.</p>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of the
     * element, to scroll.
     */
    me.scrollObjectToTop = function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        obj.scrollTop = 0;
    };

    /**
     * @function {static} o2.DomHelper.scrollObjectToBottom
     *
     * <p>Scrolls an element to bottom.</p>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * scroll.
     */
    me.scrollObjectToBottom = function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        obj.scrollTop = obj.scrollHeight;
    };

    /**
     * @function {static} o2.DomHelper.scrollWindowToObject
     *
     * <p>Scrolls the window to the object's offset position..</p>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * scroll.
     */
    me.scrollWindowToObject = function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var offset = me.getOffset(obj);

        window.scrollTo(offset.left, offset.top);
    };

    /**
     * @function {static} o2.DomHelper.getWindowScrollOffset
     *
     * <p>Gets the <strong>window</strong>'s scroll offset.</p>
     *
     * @return the the <strong>window</strong>'s scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */
    me.getWindowScrollOffset = function() {
        if (document.documentElement) {
            if (document.body && document.body.scrollLeft !== undefined) {
                me.getWindowScrollOffset = function() {
                    var left = Math.max(document.body.scrollLeft,
                        document.documentElement.scrollLeft);
                    var top = Math.max(document.body.scrollTop,
                        document.documentElement.scrollTop);

                    return {
                        left : left,
                        top : top
                    };

                };

                return me.getWindowScrollOffset();
            }

            me.getWindowScrollOffset = function() {
                var left = document.documentElement.scrollLeft;
                var top = document.documentElement.scrollTop;

                return {
                    left : left,
                    top : top
                };

            };

            return me.getWindowScrollOffset();
        }

        // IE quirksmode
        me.getWindowScrollOffset = function() {
            var left = document.body.scrollLeft;
            var top = document.body.scrollTop;

            return {
                left : left,
                top : top
            };
        };

        return me.getWindowScrollOffset();
    };

    me.getObjectScrollOfset = function(obj) {
        obj = $(obj);

        return {
            left : obj.scrollLeft,
            top : obj.scrollTop
        };
    };
}(this.o2, this, this.document));
