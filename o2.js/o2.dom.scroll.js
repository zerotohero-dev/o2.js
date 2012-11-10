/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window, document) {
    'use strict';

    /**
     * @module   dom.scroll
     *
     * @requires core
     * @requires dom.core
     *
     * <p>A window/div scroll helper.</p>
     */
    fp.ensure(
        'dom.scroll',
    [
        'core',
        'dom.core'
    ]);

    var attr      = fp.getAttr,
        alias     = attr(fp, 'alias'),
        create    = attr(fp, 'create'),
        def       = attr(fp, 'define'),
        require   = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Dom',

        /*
         * Dom (scroll)
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
         * native
         */
        de  = document.documentElement,
        max = attr(Math, 'max'),

        /*
         * # To be Overridden
         */

        getWindowScrollOffset,
        scrollWindowToTop,
        scrollWindowToBottom;

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
            var db   = document.body,
                left = 0,
                top  = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = max(db.scrollLeft, de.scrollLeft);
                top  = max(db.scrollTop, de.scrollTop);
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
            var db   = document.body,
                left = 0,
                top  = 0;

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
    getWindowScrollOffset = require(kModuleName, 'getWindowScrollOffset');

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
    scrollWindowToBottom = require(kModuleName, 'scrollWindowToBottom');

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

            if (!db) {return;}

            db.scrollTop = 0;
        });
    }

    /*
     *
     */
    scrollWindowToTop = require(kModuleName, 'scrollWindowToTop');

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

        if (!obj) {return;}

        if (obj === window) {
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

        if (!obj) {return;}

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

        if (!obj          ) {return;}
        if (obj === window) {return;}

        var offset = me.getOffset(obj);

        window.scrollTo(offset.left, offset.top);
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
}(this.o2, this.o2.protecteds, this, this.document));
