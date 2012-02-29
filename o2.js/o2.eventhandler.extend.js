/**
 * @module   eventhandler.extend
 * @requires core
 * @requires eventhandler.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-28 20:53:49.020733
 * -->
 *
 * <p>Extension methods for the {@link EventHandler} object.</p>
 */
(function(framework, window) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * EventHandler (extend)
     */
    var me = require('EventHandler');

    /*
     * Aliases
     */

    var kEventHandler  = 'EventHandler';
    var getKeyCode     = require(kEventHandler, 'getKeyCode');
    var getEventObject = require(kEventHandler, 'getEventObject');

    var keyCode    = require('EventHandler', 'keyCode');
    var kBackspace = attr(keyCode, 'BACKSPACE');
    var kBottom    = attr(keyCode, 'BOTTOM');
    var kEnter     = attr(keyCode, 'ENTER');
    var kEscape    = attr(keyCode, 'ESCAPE');
    var kLeft      = attr(keyCode, 'LEFT');
    var kTab       = attr(keyCode, 'TAB');

    var kNumber = 'number';

    // According to W3C
    //     Left Button: 0
    //     Middle Button: 1
    //     Right Button: 2 (!)
    //
    // According to M$
    //     Left Button: 1
    //     Middle Button: 4
    //     Right Button: 2 (!)
    //     Left and Right: 3
    //     Left and Middle: 5
    //     Right and Middle: 6
    //     All three: 7
    //
    // ref: http://msdn.microsoft.com/en-us/library/ms533544(v=vs.85).aspx
    var kRightButton = 2;

    /**
     * @function {static} o2.EventHandler.isArrowKey
     *
     * <p>Checks whether the pressed key is an arrow key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is an arrow key,
     * <code>false</code> otherwise.
     */
    def(me, 'isArrowKey', function(evt) {
        var code = getKeyCode(evt);

        return code >= kLeft && code <= kBottom;
    });

    /**
     * @function {static} o2.EventHandler.isBackspaceKey
     *
     * <p>Checks whether the pressed key is the backspace (DEL) key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the backspace key,
     * <code>false</code> otherwise.
     */
    def(me, 'isBackspaceKey', function(evt) {
        return getKeyCode(evt) === kBackspace;
    });

    if (window.event) {

        /**
         * @function {static} o2.EventHandler.isCharacterKeypressEvent
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
         * @return <code>true</code> if the pressed key is a printable
         * character; <code>false</code> otherwise.
         */
        def(me, 'isCharacterKeypressEvent', function(evt) {
            var e = getEventObject(evt);

            if (!e) {
                return false;
            }

            // M$IE only fires keypress events for printable keys:
            return true;
        });
    } else {
        def(me, 'isCharacterKeypressEvent', function(evt) {
            var e = getEventObject(evt);

            if (!e) {
                return false;
            }

            // In other browsers evt.which is > 0 if and only if
            // the key pressed is a printable key.
            if (typeof e.which !== kNumber || e.which <= 0) {
                return false;
            }

            // The only exception for this is the backspace key.
            return e.which !== kBackspace;
        });
    }

    /**
     * @function {static} o2.EventHandler.isEnterKey
     *
     * <p>Checks whether the pressed key is the enter (return) key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the enter key,
     * <code>false</code> otherwise.
     */
    def(me, 'isEnterKey', function(evt) {
        return getKeyCode(evt) === kEnter;
    });

    /**
     * @function {static} o2.EventHandler.isEscapeKey
     *
     * <p>Checks whether the pressed key is the escape (ESC) key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the escape key,
     * <code>false</code> otherwise.
     */
    def(me, 'isEscapeKey', function(evt) {
        return getKeyCode(evt) === kEscape;
    });

    if (window.event) {
        /**
         * @function {static} o2.EventHandler.isRightClick
         *
         * <p>Checks whether or not the curent action is a right click action.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link o2.EventHandler.addEventListener}.
         *
         * @return <code>true</code> if the event is a right click event,
         * <code>false</code> otherwise.
         */
        def(me, 'isRightClick', function(evt) {
            var e = getEventObject(evt);

            if (!e) {
                return false;
            }

            return e.which === kRightButton;
        });
    } else {
        def(me, 'isRightClick', function(evt) {
            var e = getEventObject(evt);

            if (!e) {
                return false;
            }

            return e.button === kRightButton;
        });
    }

    /**
     * @function {static} o2.EventHandler.isTabKey
     *
     * <p>Checks whether the pressed key is the tab key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the tab key,
     * <code>false</code> otherwise.
     */
    def(me, 'isTabKey', function(evt) {
        return getKeyCode(evt) === kTab;
    });
}(this.o2, this));
