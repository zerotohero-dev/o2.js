/**
 * @module   dom.scroll
 * @requires core
 * @requires dom.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-03 00:12:56.288837
 * -->
 *
 * <p>A window/div scroll helper.</p>
 */
(function(framework, window, document) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (scroll)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $ = require('$');

    var de       = document.documentElement;
    var scrollTo = attr(window, 'scrollTo');

    if(de) {

        /**
         * @function {static} o2.Dom.getWindowScrollOffset
         *
         * <p>Gets the <strong>window</strong>'s scroll offset.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * var offsets = o2.Dom.getWindowScrollOffset();
         * </pre>
         *
         * @return the the <strong>window</strong>'s scroll offset in the form
         * <code>{left: l, top: t}</code>.
         */
        exports.getWindowScrollOffset = def(me, 'getWindowScrollOffset',
                    function() {
            var db = document.body;

            var left = 0;
            var top  = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = Math.max(db.scrollLeft, de.scrollLeft);
                top  = Math.max(db.scrollTop, de.scrollTop);
            } else {
                left = de.scrollLeft;
                top  = de.scrollTop;
            }

            return {
                left : left,
                top  : top
            };
        });
    } else {
        exports.getWindowScrollOffset = def(me, 'getWindowScrollOffset',
                    function() {
            var db = document.body;

            var left = 0;
            var top  = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = db.scrollLeft;
                top  = db.scrollTop;
            }

            return {
                left : left,
                top  : top
            };
        });
    }

    /*
     *
     */
    var getWindowScrollOffset = require(kModuleName, 'getWindowScrollOffset');

    /**
     * @function {static} o2.Dom.getObjectScrollOffset
     *
     * <p>Gets the <strong>DOM</strong> object's scroll offset.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var offsets = o2.Dom.getObjectScrollOfset('container');
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> node to check, or its
     * <code>String</code> id.
     *
     * @return the the <strong>DOM</strong> object's scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */
    exports.getObjectScrollOffset = def(me, 'getObjectScrollOffset',
                function(obj) {
        var item = $(obj);

        if (obj === window) {
            return getWindowScrollOffset();
        }

        return {
            left : item.scrollLeft,
            top  : item.scrollTop
        };
    });

    /**
     * @function {static} o2.Dom.getScrollOffset
     *
     * <p>An alias to {@link o2.Dom.getObjectStrollOffset}.</p>
     *
     * @see o2.Dom.getObjectScrollOffset
     */
    exports.getScrollOffset = alias(me, 'getScrollOffset',
        'getObjectScrollOfset');

    if (de) {

        /**
         * @function {static} o2.Dom.scrollWindowToBottom
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Dom.scrollWindowToBottom();
         * </pre>
         *
         * <p>Scrolls window to bottom.</p>
         */
        exports.scrollWindowToBottom = def(me, 'scrollWindowToBottom',
                    function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
            de.scrollTop = de.scrollHeight;
        });
    } else {
        exports.scrollWindowToBottom = def(me, 'scrollWindowToBottom',
                    function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
        });
    }

    /*
     *
     */
    var scrollWindowToBottom = require(kModuleName, 'scrollWindowToBottom');

    if (de) {

        /**
         * @function {static} o2.Dom.scrollWindowToTop
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Dom.scrollWindowToTop();
         * </pre>
         *
         * <p>Scrolls window to top.</p>
         */
        exports.scrollWindowToTop = def(me, 'scrollWindowToTop', function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = 0;
            de.scrollTop = 0;
        });
    } else {
        exports.scrollWindowToTop = def(me, 'scrollWindowToTop', function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = 0;
        });
    }

    /*
     *
     */
    var scrollWindowToTop = require(kModuleName, 'scrollWindowToTop');

    /**
     * @function {static} o2.Dom.scrollObjectToTop
     *
     * <p>Scrolls an element to top.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.scrollObjectToTop('container');
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of the
     * element, to scroll.
     */
    exports.scrollObjectToTop = def(me, 'scrollObjectToTop', function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        if(obj === window) {
            scrollWindowToTop();
        }

        obj.scrollTop = 0;
    });

    /**
     * @function {static} o2.Dom.scrollObjectToBottom
     *
     * <p>Scrolls an element to bottom.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.scrollObjectToBottom('container');
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * scroll.
     */
    exports.scrollObjectToBottom = def(me, 'scrollObjectToBottom',
                function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        if (obj === window) {
            scrollWindowToBottom();
        }

        obj.scrollTop = obj.scrollHeight;
    });

    /**
     * @function {static} o2.Dom.scrollTo
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * @see o2.Dom.scrollWindowToObject
     */
    exports.scrollTo = def(me, 'scrollTo', function(obj) {
        obj = $(obj);

        if (!obj) {
            return;
        }

        if (obj === window) {
            return;
        }

        var offset = me.getOffset(obj);

        scrollTo(offset.left, offset.top);
    });

    /**
     * @function {static} o2.Dom.scrollWindowToObject
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * @see o2.Dom.scrollWindowToObject
     */
    exports.scrollWindowToObject = alias(me, 'scrollWindowToObject', 'scrollTo');

    /**
     * @function {static} o2.Dom.scrollToObject
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * @see o2.Dom.scrollWindowToObject
     */
    exports.scrollToObject = alias(me, 'scrollToObject', 'scrollTo');
}(this.o2, this, this.document));
