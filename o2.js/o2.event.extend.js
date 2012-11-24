/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window) {
    'use strict';

     /**
      * @module   event.extend
      *
      * @requires core
      * @requires event.constants
      * @requires event.core
      *
      * <p>Extension methods for the {@link Event} object.</p>
      */
    fp.ensure(
        'event.extend',
    [
        'core',
        'event.constants',
        'event.core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Event',

        /*
         * Event (extend)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * event.core
         */
        kEvent         = kModuleName,
        getKeyCode     = require(kEvent, 'getKeyCode'),
        getEventObject = require(kEvent, 'getEventObject'),

        /*
         * event.constants
         */
        keyCode    = require(kModuleName, 'keyCode'),
        kBackspace = attr(keyCode, 'BACKSPACE'),
        kBottom    = attr(keyCode, 'BOTTOM'),
        kEnter     = attr(keyCode, 'ENTER'),
        kEscape    = attr(keyCode, 'ESCAPE'),
        kLeft      = attr(keyCode, 'LEFT'),
        kTab       = attr(keyCode, 'TAB'),

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

    /**
     * @function {static} o2.Event.isArrowKey
     *
     * <p>Checks whether the pressed key is an arrow key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keydown', function(evt) {
     *      var isArrowKey = o2.Event.isArrowKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is an arrow key,
     * <code>false</code> otherwise.
     */
    exports.isArrowKey = def(me, 'isArrowKey', function(evt) {
        var code = getKeyCode(evt);

        return code >= kLeft && code <= kBottom;
    });

    /**
     * @function {static} o2.Event.isBackspaceKey
     *
     * <p>Checks whether the pressed key is the backspace (DEL) key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keydown', function(evt) {
     *      var isBackspaceKey = o2.Event.isBackspaceKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the backspace key,
     * <code>false</code> otherwise.
     */
    exports.isBackspaceKey = def(me, 'isBackspaceKey', function(evt) {
        return getKeyCode(evt) === kBackspace;
    });

    if (window.event) {

        /**
         * @function {static} o2.Event.isCharacterKeypressEvent
         *
         * <p>Checks whether the character in a <code>onkeypress</code> event
         * actually produces a printable char.</p>
         *
         * <p>The thing you have to remember is that you can't reliably tell
         * <strong>anything at all</strong> about any character that may be
         * typed in a <code>onkeydown</code> or <code>onkeyup</code> event:
         * The printable key is determined only in the <code>onkeypress</code>
         * handler.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'keypress', function(evt) {
         *      var isCharKeypress = o2.Event.isCharacterKeypressEvent(evt);
         * });
         * </pre>
         *
         * @return <code>true</code> if the pressed key is a printable
         * character; <code>false</code> otherwise.
         */
        exports.isCharacterKeypressEvent = def(me, 'isCharacterKeypressEvent',
                    function(evt) {
            var e = getEventObject(evt);

            if (!e) {return false;}

            // M$IE only fires keypress events for printable keys:
            return true;
        });
    } else {
        exports.isCharacterKeypressEvent = def(me, 'isCharacterKeypressEvent',
                    function(evt) {
            var e     = getEventObject(evt),
                which = null;

            if (!e) {return false;}

            // In other browsers evt.which is > 0 if and only if
            // the key pressed is a printable key.
            which = e.which;

            if (typeof which !== kNumber || which <= 0) {return false;}

            //TODO: test for ctrl+backspace shift+backspace alt+backspace etc.

            // The only exception for this is the backspace key.
            return which !== kBackspace;
        });
    }

    /**
     * @function {static} o2.Event.isEnterKey
     *
     * <p>Checks whether the pressed key is the enter (return) key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keypress', function(evt) {
     *      var isEnterKey = o2.Event.isEnterKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the enter key,
     * <code>false</code> otherwise.
     */
    exports.isEnterKey = def(me, 'isEnterKey', function(evt) {
        return getKeyCode(evt) === kEnter;
    });

    /**
     * @function {static} o2.Event.isEscapeKey
     *
     * <p>Checks whether the pressed key is the escape (ESC) key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keypress', function(evt) {
     *      var isEscapeKey = o2.Event.isEscapeKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the escape key,
     * <code>false</code> otherwise.
     */
    exports.isEscapeKey = def(me, 'isEscapeKey', function(evt) {
        return getKeyCode(evt) === kEscape;
    });

    if (window.event) {

        /**
         * @function {static} o2.Event.isRightClick
         *
         * <p>Checks whether or not the curent action is a right click
         * action.</p>
         *
         * <p><strong>Usage example:</strong></p>
         *
         * <pre>
         * o2.Event.addEventListener('container', 'click', function(evt) {
         *      var isRightClick = o2.Event.isRightClick(evt);
         * });
         * </pre>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link o2.Event.addEventListener}.
         *
         * @return <code>true</code> if the event is a right click event,
         * <code>false</code> otherwise.
         */
        exports.isRightClick = def(me, 'isRightClick', function(evt) {
            var e = getEventObject(evt);

            if (!e) {return false;}

            return e.which === kRightButton;
        });
    } else {
        exports.isRightClick = def(me, 'isRightClick', function(evt) {
            var e = getEventObject(evt);

            if (!e) {return false;}

            return e.button === kRightButton;
        });
    }

    /**
     * @function {static} o2.Event.isTabKey
     *
     * <p>Checks whether the pressed key is the tab key.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Event.addEventListener('container', 'keypress', function(evt) {
     *      var isTabKey = o2.Event.isTabKey(evt);
     * });
     * </pre>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.Event.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the tab key,
     * <code>false</code> otherwise.
     */
    exports.isTabKey = def(me, 'isTabKey', function(evt) {
        return getKeyCode(evt) === kTab;
    });
}(this.o2, this.o2.protecteds, this));

