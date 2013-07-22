require([
    '../../core',
    './coordinate'
], function(
    o2,
    Coordinate
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
         * ../../core
         */
        $ = o2.$,

        /*
         * ./coordinate
         */
        getOffset = Coordinate.getOffset,

        /*
         * document
         */
        de  = document.documentElement,

        /*
         * Math
         */
        max = Math.max,

        /*
         * # To be Overridden
         */

        getWindowScrollOffset,
        scrollWindowToTop,
        scrollWindowToBottom;

    if(de) {

        exports.getWindowScrollOffset = function() {
            var db = document.body,
                left = 0,
                top = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = max(db.scrollLeft, de.scrollLeft);
                top = max(db.scrollTop, de.scrollTop);
            } else {
                left = de.scrollLeft;
                top = de.scrollTop;
            }

            return {
                left: left,
                top : top
            };
        };
    } else {
        exports.getWindowScrollOffset = function() {
            var db = document.body,
                left = 0,
                top = 0;

            // document.body may not be immediately available if
            // the script is placed in HEAD. check for it.
            if (db) {
                left = db.scrollLeft;
                top = db.scrollTop;
            }

            return {
                left: left,
                top: top
            };
        };
    }

    /*
     *
     */
    getWindowScrollOffset = exports.getWindowScrollOffset;

    exports.getObjectScrollOffset = function(obj) {
        var item = $(obj);

        if (obj === window) {
            return getWindowScrollOffset();
        }

        return {
            left : item.scrollLeft,
            top  : item.scrollTop
        };
    };

    exports.getScrollOffset = exports.getObjectScrollOffset;

    if (de) {
        exports.scrollWindowToBottom = function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
            de.scrollTop = de.scrollHeight;
        };
    } else {
        exports.scrollWindowToBottom =function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = db.scrollHeight;
        };
    }

    /*
     *
     */
    scrollWindowToBottom = exports.scrollWindowToBottom;

    if (de) {
        exports.scrollWindowToTop = function() {
            var db = document.body;

            if (!db) {
                return;
            }

            db.scrollTop = 0;
            de.scrollTop = 0;
        };
    } else {
        exports.scrollWindowToTop = function() {
            var db = document.body;

            if (!db) {return;}

            db.scrollTop = 0;
        };
    }

    /*
     *
     */
    scrollWindowToTop = exports.scrollWindowToTop;

    exports.scrollObjectToTop = function(obj) {
        obj = $(obj);

        if (!obj) {return;}

        if (obj === window) {
            scrollWindowToTop();
        }

        obj.scrollTop = 0;
    };

    exports.scrollObjectToBottom = function(obj) {
        obj = $(obj);

        if (!obj) {return;}

        if (obj === window) {
            scrollWindowToBottom();
        }

        obj.scrollTop = obj.scrollHeight;
    };

    exports.scrollTo = function(obj) {
        obj = $(obj);

        if (!obj) {return;}
        if (obj === window) {return;}

        var offset = getOffset(obj);

        window.scrollTo(offset.left, offset.top);
    };

    exports.scrollWindowToObject = exports.scrollTo;

    exports.scrollToObject = exports.scrollTo;

    return exports;
});
