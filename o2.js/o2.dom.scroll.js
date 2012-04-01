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
 *  lastModified: 2012-04-01 14:46:49.973159
 * -->
 *
 * <p>A window/div scroll helper.</p>
 */
(function(framework, window, document, undefined) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var alias     = attr(_, 'alias');
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

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
         * //TODO: add usage example.
         * </pre>
         *
         * @return the the <strong>window</strong>'s scroll offset in the form
         * <code>{left: l, top: t}</code>.
         */
        def(me, 'getWindowScrollOffset', function() {
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
        });
    } else {
        def(me, 'getWindowScrollOffset', function() {
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
        });
    }

    /*
     *
     */
    var getWindowScrollOffset = require(kModuleName, 'getWindowScrollOffset');

    /**
     * @function {static} o2.Dom.getObjectScrollOfset
     *
     * <p>Gets the <strong>DOM</strong> object's scroll offset.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the <strong>DOM</strong> node to check, or its
     * <code>String</code> id.
     *
     * @return the the <strong>DOM</strong> object's scroll offset in the form
     * <code>{left: l, top: t}</code>.
     */
    def(me, 'getObjectScrollOfset', function(obj) {
        var item = $(obj);

        if (obj === window) {
            return getWindowScrollOffset(item);
        }

        return {
            left : item.scrollLeft,
            top : item.scrollTop
        };
    });

    /**
     * @function {static} o2.Dom.getStrollOffset
     *
     * <p>An alias to {@link o2.Dom.getObjectStrollOffset}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @see {o2.Dom.getObjectScrollOffset}
     */
    alias(me, 'getScrollOffset', 'getObjectScrollOfset');

    if (de) {

        /**
         * @function {static} o2.Dom.scrollWindowToBottom
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * //TODO: add usage example.
         * </pre>
         *
         * <p>Scrolls window to bottom.</p>
         */
        def(me, 'scrollWindowToBottom', function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
            de.scrollTop = de.scrollHeight;
        });
    } else {
        def(me, 'scrollWindowToBottom', function() {
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
         * //TODO: add usage example.
         * </pre>
         *
         * <p>Scrolls window to top.</p>
         */
        def(me, 'scrollWindowToTop', function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = 0;
            de.scrollTop = 0;
        });
    } else {
        def(me, 'scrollWindowToTop', function() {
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of the
     * element, to scroll.
     */
    def(me, 'scrollObjectToTop', function(obj) {
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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * scroll.
     */
    def(me, 'scrollObjectToBottom', function(obj) {
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
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @see o2.Dom.scrollWindowToObject
     */
    def(me, 'scrollTo', function(obj) {
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
     * <p>Scrolls the window to the object's offset position..</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the element, or the <strong>id</strong> of it, to
     * scroll, or an <code>Object</code> in the form
     * <code>{left : leftPx, top : topPx}</code>.
     */
    alias(me, 'scrollWindowToObject', 'scrollTo');

    /**
     * @function {static} o2.Dom.scrollToObject
     *
     * <p>An alias to {@link o2.Dom.scrollWindowToObject}.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @see o2.Dom.scrollWindowToObject
     */
    alias(me, 'scrollToObject', 'scrollTo');
}(this.o2, this, this.document));
