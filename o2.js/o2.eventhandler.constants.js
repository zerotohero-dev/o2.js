/**
 * @module eventhandler.constants
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser event management object.</p>
 */
(function(framework){
    'use strict';

    var me = framework;

    /**
     * @class {static} o2.EventHandler
     *
     * <p>A cross-browser event handling and event utilities class.</p>
     */
    me.EventHandler = {

        /**
         * @struct {static} o2.EventHandler.keyCode
         */
        keyCode : {

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.ENTER - enter key.
             */
            ENTER : 13,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.LEFT - left arrow key.
             */
            LEFT : 37,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.RIGHT - right arrow key.
             */
            RIGHT : 39,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.TOP - up arrow key.
             */
            TOP : 38,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.BOTTOM - down arrow key.
             */
            BOTTOM : 40,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.UP - up arrow key.
             */
            UP : 38,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.DOWN - down arrow key.
             */
            DOWN : 40,
            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.BACKSPACE - backspace key.
             */
            BACKSPACE : 8,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.TAB - TAB key.
             */
            TAB : 9,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.SHIFT - shift key.
             */
            SHIFT : 16,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.CTRL - CTRL key.
             */
            CTRL : 17,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.ALT - ALT key.
             */
            ALT : 18,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.CAPS_LOCK - caps lock key.
             */
            CAPS_LOCK : 20,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.ESCAPE - ESC key.
             */
            ESCAPE : 27,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.DELETE - DEL key.
             */
            DELETE : 46,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.SPACE - SPACE key.
             */
            SPACE : 32,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.PAGE_UP - PAGE UP key.
             */
            PAGE_UP : 33,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.PAGE_DOWN - PAGE DOWN key.
             */
            PAGE_DOWN : 34,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.END - END key.
             */
            END : 35,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.HOME - HOME key.
             */
            HOME : 36,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.NUMPAD_ENTER - NUMPAD ENTER key.
             */
            NUMPAD_ENTER : 108,

            /**
             * @property {static const Integer}
             * o2.EventHandler.keyCode.COMMA - COMMA key.
             */
            COMMA : 188
        }
    };
}(this.o2));
