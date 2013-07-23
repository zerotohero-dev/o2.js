require([
    '../core',
    './contants'
], function(
    Event,
    Constants
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
        getKeyCode = Event.getKeyCode,
        getEventObject = Event.getEventObject,

        /*
         * event.constants
         */
        keyCode = Constants.keyCode,
        kBackspace = keyCode.BACKSPACE,
        kBottom = keyCode.BOTTOM,
        kEnter = keyCode.ENTER,
        kEscape = keyCode.ESCAPE,
        kLeft = keyCode.LEFT,
        kTab = keyCode.TAB,

        /*
         * # DOM Enumerations
         */

        /*
         * According to W3C
         *     Left Button: 0
         *     Middle Button: 1
         *     Right Button: 2 (!)
         *
         * According to M$
         *     Left Button: 1
         *     Middle Button: 4
         *     Right Button: 2 (!)
         *     Left and Right: 3
         *     Left and Middle: 5
         *     Right and Middle: 6
         *     All three: 7
         *
         * ref: http://msdn.microsoft.com/en-us/library/ms533544(v=vs.85).aspx
         */
        kRightButton = 2,

        /*
         * # Common Constants
         */

        kNumber = 'number';

    exports.isArrowKey = function(evt) {
        var code = getKeyCode(evt);

        return code >= kLeft && code <= kBottom;
    };

    exports.isBackspaceKey = function(evt) {
        return getKeyCode(evt) === kBackspace;
    };

    if (window.event) {
        exports.isCharacterKeypressEvent = function(evt) {
            var e = getEventObject(evt);

            if (!e) {return false;}

            // M$IE only fires keypress events for printable keys:
            return true;
        };
    } else {
        exports.isCharacterKeypressEvent = function(evt) {
            var e = getEventObject(evt),
                which;

            if (!e) {return false;}

            // In other browsers evt.which is > 0 if and only if
            // the key pressed is a printable key.
            which = e.which;

            if (typeof which !== kNumber || which <= 0) {return false;}

            //TODO: test for ctrl+backspace shift+backspace alt+backspace etc.

            // The only exception for this is the backspace key.
            return which !== kBackspace;
        };
    }

    exports.isEnterKey = function(evt) {
        return getKeyCode(evt) === kEnter;
    };

    exports.isEscapeKey = function(evt) {
        return getKeyCode(evt) === kEscape;
    };

    if (window.event) {
        exports.isRightClick = function(evt) {
            var e = getEventObject(evt);

            if (!e) {return false;}

            return e.which === kRightButton;
        };
    } else {
        exports.isRightClick = function(evt) {
            var e = getEventObject(evt);

            if (!e) {return false;}

            return e.button === kRightButton;
        };
    }

    exports.isTabKey = function(evt) {
        return getKeyCode(evt) === kTab;
    };

    return exports;
});
