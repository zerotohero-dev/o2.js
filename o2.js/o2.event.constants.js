/**
 * @module   event.constants
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-28 20:11:19.012650
 * -->
 *
 * <p>A cross-browser event management object.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'Event';

    /**
     * @class {static} o2.Event
     *
     * <p>A cross-browser event handling and event utilities class.</p>
     */
    var me = create(kModuleName);

    /**
    * @struct {static} o2.Event.keyCode
    */
    def(me, 'keyCode', {

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.ENTER - enter key.
         */
        ENTER : 13,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.RETURN - enter key.
         */
        RETURN : 13,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.LEFT - left arrow key.
         */
        LEFT : 37,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.RIGHT - right arrow key.
         */
        RIGHT : 39,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.TOP - up arrow key.
         */
        TOP : 38,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.BOTTOM - down arrow key.
         */
        BOTTOM : 40,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.UP - up arrow key.
         */
        UP : 38,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.DOWN - down arrow key.
         */
        DOWN : 40,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.BACKSPACE - backspace key.
         */
        BACKSPACE : 8,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.TAB - TAB key.
         */
        TAB : 9,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.SHIFT - shift key.
         */
        SHIFT : 16,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.CTRL - CTRL key.
         */
        CTRL : 17,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.ALT - ALT key.
         */
        ALT : 18,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.CAPS_LOCK - caps lock key.
         */
        CAPS_LOCK : 20,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.ESCAPE - ESC key.
         */
        ESCAPE : 27,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.DELETE - DEL key.
         */
        DELETE : 46,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.SPACE - SPACE key.
         */
        SPACE : 32,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.PAGE_UP - PAGE UP key.
         */
        PAGE_UP : 33,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.PAGE_DOWN - PAGE DOWN key.
         */
        PAGE_DOWN : 34,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.END - END key.
         */
        END : 35,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.HOME - HOME key.
         */
        HOME : 36,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.NUMPAD_ENTER - NUMPAD ENTER key.
         */
        NUMPAD_ENTER : 108,

        /**
         * @property {static const Integer}
         * o2.Event.keyCode.COMMA - COMMA key.
         */
        COMMA : 188
    });
}(this.o2));
