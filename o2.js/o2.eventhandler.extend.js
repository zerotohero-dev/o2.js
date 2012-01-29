/**
 * @module   eventhandler.extend
 * @requires eventhandler.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-29 10:36:02.905988
 * -->
 *
 * <p>Extension methods for the {@link EventHandler} object.</p>
 */

(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.EventHandler;

    /**
     * @function {static} isEnterKey
     *
     * <p>Checks whether the pressed key is the enter (return) key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the enter key,
     * <code>false</code> otherwise.
     */
    me.isEnterKey = function(evt) {
        return me.getKeyCode(evt) === me.keyCode.ENTER;
    };

    /**
     * @function {static} isTabKey
     *
     * <p>Checks whether the pressed key is the tab key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the tab key,
     * <code>false</code> otherwise.
     */
    me.isTabKey = function(evt) {
        return me.getKeyCode(evt) === me.keyCode.TAB;
    };

    /**
     * @function {static} isArrowKey
     *
     * <p>Checks whether the pressed key is an arrow key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is an arrow key,
     * <code>false</code> otherwise.
     */
    me.isArrowKey = function(evt) {
        var code = me.getKeyCode(evt);
        var keyCode = me.keyCode;
        var kLeft = keyCode.LEFT;
        var kBottom = keyCode.BOTTOM;

        return code >= kLeft && code <= kBottom;
    };

    /**
     * @function {static} isEnterKey
     *
     * <p>Checks whether the pressed key is the backspace (DEL) key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the backspace key,
     * <code>false</code> otherwise.
     */
    me.isBackspaceKey = function(evt) {
        return me.getKeyCode(evt) === me.keyCode.BACKSPACE;
    };

    /**
     * @function {static} isEscapeKey
     *
     * <p>Checks whether the pressed key is the escape (ESC) key.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>true</code> if the pressed key is the escape key,
     * <code>false</code> otherwise.
     */
    me.isEscapeKey = function(evt) {
        return me.getKeyCode(evt) === me.keyCode.ESCAPE;
    };

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
    me.isRightClick = function(evt) {
        var e = me.getEventObject(evt);

        //
        // According to W3C
        //     Left Button: 0
        //     Middle Button: 1
        //     Right Button: 2 (!)
        //
        // According to M$
        //     Lef Button: 1
        //     Middle Button: 4
        //     Right Button: 2 (!)
        //     Left and Right: 3
        //     Left and Middle: 5
        //     Right and Middle: 6
        //     All three: 7
        //
        // http://msdn.microsoft.com/en-us/library/ms533544(v=vs.85).aspx
        //

        if (!e) {
            return false;
        }

        if (e.which) {
            me.isRightClick = function(e) {
                return e.which === 3;
            };

            return me.isRightClick(evt);
        }

        if (e.button) {
            me.isRightClick = function(e) {
                return e.button === 2;
            };

            return me.isRightClick(evt);
        }

        return false;
    };
}(this.o2));
