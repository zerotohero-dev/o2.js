/**
 * @module eventhandler.extend
 * @requires eventhandler.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>Extension methods for the {@link EventHandler} object.</p>
 */
(function(framework, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.EventHandler;

    /**
     * @function {static} o2.EventHandler.getMouseCoordinates
     *
     * <p>Gets the current mouse coordinates.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the coordinates in the form of <code>{x: mouseX, y: mouseY}</code>
     * where <code>x</code> is the distance from the top of the screen, and
     * <code>y</code> is the distance from the left of the screen.
     */
    me.getMouseCoordinates = function(evt) {
        var e = me.getEventObject(evt);

        if (!e) {
            return {
                x : 0,
                y : 0
            };
        }

        var posx = 0;
        var posy = 0;

        if (e.pageX) {
            me.getMouseCoordinates = function(e) {
                if (!e) {
                    return {
                        x : 0,
                        y : 0
                    };
                }

                posx = e.pageX || 0;
                posy = e.pageY || 0;

                return {
                    x : posx,
                    y : posy
                };
            };

            return me.getMouseCoordinates(evt);
        }

        if(e.clientX) {
            me.getMouseCoordinates = function(e) {
                if (!e) {
                    return {
                        x : 0,
                        y : 0
                    };
                }

                var clientX = e.clientX || 0;
                var clientY = e.clientY || 0;
                var wd = document;

                posx = clientX + wd.body.scrollLeft +
                    wd.documentElement.scrollLeft;
                posy = clientY + wd.body.scrollTop +
                    wd.documentElement.scrollTop;

                return {
                    x : posx,
                    y : posy
                };
            };

            return me.getMouseCoordinates(evt);
        }

        // The current event object has neither pageX, nor clientX defined.
        return {
            x : 0,
            y : 0
        };
    };

    /**
     * @function {static} o2.EventHandler.getKeyCode
     *
     * <p>Gets the key code of the key-related event (keydown, keyup, keypress
     * etc.).</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <code>keyCode</code> associated with the event as an
     * <code>Integer</code>
     */
    me.getKeyCode = function(evt) {
        var e = me.getEventObject(evt);

        if (!e) {
            return null;
        }

        if (e.charCode) {
            me.getKeyCode = function(e) {
                return e.charCode;
            };

            return me.getKeyCode(evt);
        }

        if (e.keyCode) {
            me.getKeyCode = function(e) {
                return e.keyCode;
            };

            return me.getKeyCode(evt);
        }

        if (e.which) {
            me.getKeyCode = function(e) {
                return e.which;
            };

            return me.getKeyCode(evt);
        }

        return null;
    };

    //TODO: add documentation.
    me.isEnterKey = function(evt) {
        return me.getKeyCode(evt) === me.kyCode.ENTER;
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

}(this.o2, this.document));
