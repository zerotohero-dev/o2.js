define([
    '../core',
    '../string/core'
], function(
    o2,
    StringUtil
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
         * ../core
         */
        $  = o2.$,
        myName = o2.name,
        nill = o2.nill,

        /*
         * ../string/core
         */
        concat = StringUtil.concat,
        format = StringUtil.format,

        /*
         * # Common Constants
         */

        kCallbackNotDefined = format('{0}: Callback is not defined!', myName),
        kOn = 'on',

        /*
         * # Feature Detection
         */

        isAddEventListener = !!document.addEventListener,
        isAttachEvent = !!document.attachEvent,
        windowEventHandle  = window.event,

        /*
         * # To Be Overridden
         */

        addEventListener,
        getEventObject,
        getMouseCoordinates;

    if (isAddEventListener) {
        exports.addEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {return;}
            if (!fn ) {throw kCallbackNotDefined;}

            // `false` disables event capturing.
            //
            // Event capturing is not very useful, since its
            // implementation vastly deviates among vendors.
            //
            // See:
            // http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow
            obj.addEventListener(evt, fn, false);
        };

        exports.removeEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {return;}
            if (!fn ) {throw kCallbackNotDefined;}

            obj.removeEventListener(evt, fn, false);
        };
    } else if (isAttachEvent) {
        exports.addEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {return;}
            if (!fn ) {throw kCallbackNotDefined;}

            obj.attachEvent(concat(kOn, evt), fn);
        };

        exports.removeEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {return;}
            if (!fn ) {throw kCallbackNotDefined;}

            obj.detachEvent(concat(kOn, evt), fn);
        };
    } else {
        exports.addEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {return;}
            if (!fn ) {throw kCallbackNotDefined;}

            obj[concat(kOn, evt)] = fn;
        };

        exports.removeEventListener = function(node, evt, fn) {
            var obj = $(node);

            //TODO: if (!guard(obj, fn)) {return;}
            if (!obj) {return;}
            if (!fn ) {throw kCallbackNotDefined;}

            obj[concat(kOn, evt)] = nill;
        };
    }

    //TODO: add documentation, add to meta defs:
    exports.on = exports.addEventListener;

    //TODO: add documentation, add to meta defs:
    exports.off = exports.removeEventListener;

    /*
     *
     */
    addEventListener = exports.addEventListener;

    exports.addEventListeners = function(collection, eventName, handler) {
        if (!collection) {return;}

        var listen = addEventListener,
            key    = null;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                listen(collection[key], eventName, handler);
            }
        }
    };

    if (windowEventHandle) {
        exports.getEventObject = function() {
           return windowEventHandle;
        };

        exports.getTarget = function() {
            return windowEventHandle.srcElement;
        };
    } else {
        exports.getEventObject = function(evt) {
           return evt;
        };

        exports.getTarget = function(evt) {
            return evt ? evt.target : null;
        };
    }

    /*
     *
     */
    getEventObject = exports.getEventObject;

    exports.getKeyCode = function(evt) {
        var e = getEventObject(evt);

        if (!e) {return 0;}

        // For a cross-event (i.e. keydown, keyup, keypress)
        // result we normalize the code.
        // ref: http://www.quirksmode.org/js/keys.html

        // for @ input
        // onkeypress : {which: 50, keyCode: 50, charCode: 0 , value  '2' }
        // onkeydown  : {which: 64, keyCode: 0 , charCode: 64, value: '@' }

        return e.charCode || e.keyCode || 0;
    };

    /*
     *
     */
    getMouseCoordinates = function(evt) {
        var e = getEventObject(evt),
            origin = {x : 0, y : 0},
            posx = 0,
            posy = 0;

        if (!e) {return origin;}

        if (e.pageX) {
            getMouseCoordinates = function(e) {
                if (!e) {return origin;}

                posx = e.pageX || 0;
                posy = e.pageY || 0;

                return {x : posx, y : posy};
            };

            return getMouseCoordinates(evt);
        }

        if(e.clientX) {
            getMouseCoordinates = function(e) {
                if (!e) {return origin;}

                var clientX = e.clientX || 0,
                    clientY = e.clientY || 0,
                    wd      = document;

                posx = clientX + wd.body.scrollLeft +
                    wd.documentElement.scrollLeft;
                posy = clientY + wd.body.scrollTop +
                    wd.documentElement.scrollTop;

                return {x : posx, y : posy};
            };

            return getMouseCoordinates(evt);
        }

        // The current event object has neither pageX, nor clientX defined.
        return origin;
    };

    exports.getMouseCoordinates = function(evt) {
        return getMouseCoordinates(evt);
    };

    if (windowEventHandle) {
        exports.preventDefault = function() {
            windowEventHandle.returnValue = false;

            return false;
        };
    } else {
        exports.preventDefault = function(evt) {
            if (!evt) {return false;}

            if (evt.preventDefault) {
                evt.preventDefault();
            }

            return false;
        };
    }

    if (windowEventHandle) {
        exports.stopPropagation = function() {
            windowEventHandle.cancelBubble = true;
        };
    } else {
        exports.stopPropagation = function(evt) {
            if (!evt) {return;}

            evt.stopPropagation();
        };
    }

    return exports;
});
