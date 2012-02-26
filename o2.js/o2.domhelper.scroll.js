/**
 * @module   domhelper.scroll
 * @requires core
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-17 07:43:56.380392
 * -->
 *
 * <p>A window/div scroll helper.</p>
 */

(function(framework, window, document) {
    'use strict';

/*    var _         = framework.protecteds;
    var alias     = _.alias;
    var attr      = _.getAttr;
    var construct = _.construct;
    var create    = _.create;
    var def       = _.define;
    var obj       = _.getObject;
    var proto     = _.proto;
    var require   = _.require;
*/

function use() {}

    /*
     * Aliases
     */
    var me = use(framework.DomHelper);
    var $ = use(framework.$);

    var de = document.documentElement;
    var scrollTo = window.scrollTo;

    if (de) {

        /**
         * @function {static} o2.DomHelper.scrollWindowToBottom
         *
         * <p>Scrolls window to bottom.</p>
         */
        me.scrollWindowToBottom = function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
            de.scrollTop = de.scrollHeight;
        };
    } else {
        me.scrollWindowToBottom = function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
        };
    }

    if (de) {

        /**
         * @function {static} o2.DomHelper.scrollWindowToTop
         *
         * <p>Scrolls window to top.</p>
         */
        me.scrollWindowToTop = function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = 0;
            de.scrollTop = 0;
        };
    } else {
        me.scrollWindowToTop = function() {
            var db = document.body;

            if (!db) {
                return;
            }

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
     * scroll, or an <code>Object</code> in the form
     * <code>{left : leftPx, top : topPx}</code>.
     */

    /**
     * @function {static} o2.DomHelper.scrollToObject
     *
     * <p>An alias to {@link o2.DomHelper.scrollWindowToObject}.</p>
     *
     * @see o2.DomHelper.scrollWindowToObject
     */

    /**
     * @function {static} o2.DomHelper.scrollTo
     *
     * <p>An alias to {@link o2.DomHelper.scrollWindowToObject}.</p>
     *
     * @see o2.DomHelper.scrollWindowToObject
     */
    me.scrollTo = me.scrollToObject = me.scrollWindowToObject = function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        var offset = me.getOffset(obj);

        scrollTo(offset.left, offset.top);
    };

    if(de) {

        /**
         * @function {static} o2.DomHelper.getWindowScrollOffset
         *
         * <p>Gets the <strong>window</strong>'s scroll offset.</p>
         *
         * @return the the <strong>window</strong>'s scroll offset in the form
         * <code>{left: l, top: t}</code>.
         */
        me.getWindowScrollOffset = function() {
            var db = document.body;

            var left = 0;
            var top = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = Math.max(db.scrollLeft, de.scrollLeft);
                top = Math.max(db.scrollTop, de.scrollTop);
            } else {
                left = de.scrollLeft;
                top = de.scrollTop;
            }

            return {
                left : left,
                top : top
            };
        };
    } else {
        me.getWindowScrollOffset = function() {
            var db = document.body;

            var left = 0;
            var top = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = db.scrollLeft;
                top = db.scrollTop;
            }

            return {
                left : left,
                top : top
            };
        };
    }

    /**
     * @function {static} o2.DomHelper.getObjectScrollOfset
     *
     * <p>Gets the <strong>DOM</strong> object's scroll offset.</p>
     *
     * @param {Object} obj - the <strong>DOM</strong> node to check, or its
     * <code>String</code> id.
     *
     * @return the the <strong>DOM</strong> object's scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */

    /**
     * @function {static} o2.DomHelper.getStrollOffset
     *
     * <p>An alias to {@link o2.DomHelper.getObjectStrollOffset}.</p>
     *
     * @see {o2.DomHelper.getObjectScrollOffset}
     */
    me.scrollOffset = me.getScrollOffset = me.getObjectScrollOfset = function(
                obj) {
        var item = $(obj);

        return {
            left : item.scrollLeft,
            top : item.scrollTop
        };
    };
}(this.o2, this, this.document));
