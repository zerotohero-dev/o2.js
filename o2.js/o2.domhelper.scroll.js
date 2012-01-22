/**
 * @module   domhelper.scroll
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-22 08:55:33.251754
 * -->
 *
 * <p>A window/div scroll helper.</p>
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me       = framework.DomHelper;
    var $        = framework.$;
    var db       = document.body;
    var de       = document.documentElement;
    var scrollTo = window.scrollTo;

    /**
     * @function {static} o2.DomHelper.scrollWindowToBottom
     *
     * <p>Scrolls window to bottom.</p>
     */
    if (de) {
        me.scrollWindowToBottom = function() {
            db.scrollTop = db.scrollHeight;
            de.scrollTop = de.scrollHeight;
        };
    } else {
        me.scrollWindowToBottom = function() {
            db.scrollTop = db.scrollHeight;
        };
    }

    /**
     * @function {static} o2.DomHelper.scrollWindowToTop
     *
     * <p>Scrolls window to top.</p>
     */
    if (de) {
        me.scrollWindowToTop = function() {
            db.scrollTop = 0;
            de.scrollTop = 0;
        };
    } else {
        me.scrollWindowToTop = function() {
            db.scrollTop = 0;
        };
    }

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

        scrollTo(offset.left, offset.top);
    };

    /**
     * @function {static} o2.DomHelper.getWindowScrollOffset
     *
     * <p>Gets the <strong>window</strong>'s scroll offset.</p>
     *
     * @return the the <strong>window</strong>'s scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */
    if (db && db.scrollLeft !== undefined) {
        if(de) {
            me.getWindowScrollOffset = function() {
                var left = Math.max(db.scrollLeft, de.scrollLeft);
                var top  = Math.max(db.scrollTop, de.scrollTop);

                return {
                    left : left,
                    top : top
                };

            };
        } else {
            me.getWindowScrollOffset = function() {
                var left = db.scrollLeft;
                var top  = db.scrollTop;

                return {
                    left : left,
                    top : top
                };
            };
        }
    } else if(de) {
        me.getWindowScrollOffset = function() {
            var left = de.scrollLeft;
            var top  = de.scrollTop;

            return {
                left : left,
                top : top
            };
        };
    } else {
        me.getWindowScrollOffset = function() {
            return {
                left : 0,
                top : 0
            };
        };
    }

    //TODO: add documentation.
    me.getObjectScrollOfset = function(obj) {
        obj = $(obj);

        return {
            left : obj.scrollLeft,
            top : obj.scrollTop
        };
    };
}(this.o2, this, this.document));
