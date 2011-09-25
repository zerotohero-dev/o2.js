/*global o2 */

/**
 * @module eventhandler.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser event management object.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    var $ = framework.$;
    var nill = framework.nill;
    var format = framework.StringHelper.format;

    /*
     * Module configuration.
     */
    var config = {
        constants : {
            text : {
                err : {
                    CALLBACK_NOT_DEFINED : '{0}: Callback is not defined!'
                }
            }
        }
    };

    /**
     * @class {static} EventHandler
     *
     * <p>A cross-browser event handling and event utilities class.</p>
     */
    me.EventHandler = {

        /**
         * @struct {static} EventHandler.keyCode
         */
        keyCode : {

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.ENTER - enter key.
             */
            ENTER : 13,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.LEFT - left arrow key.
             */
            LEFT : 37,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.RIGHT - right arrow key.
             */
            RIGHT : 39,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.TOP - top arrow key.
             */
            TOP : 38,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.BOTTOM - bottom arrow key.
             */
            BOTTOM : 40,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.BACKSPACE - backspace key.
             */
            BACKSPACE : 8,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.TAB - TAB key.
             */
            TAB : 9,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.SHIFT - shift key.
             */
            SHIFT : 16,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.CTRL - CTRL key.
             */
            CTRL : 17,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.ALT - ALT key.
             */
            ALT : 18,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.CAPS_LOCK - caps lock key.
             */
            CAPS_LOCK : 20,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.ESCAPE - ESC key.
             */
            ESCAPE : 27,

            /**
             * @property {static const Integer}
             * EventHandler.keyCode.DELETE - DEL key.
             */
            DELETE : 46
        },

        /**
         * @function {static} EventHandler.addEventListener
         *
         * <p>Adds a new event listener to the <strong>DOM</strong> Node.</p>
         *
         * @param {DomNode} node - the <strong>DOM</strong> object (or its
         * <code>String</code> id) the evet shall be attached.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         * @throws {Exception} if <strong>fn</strong> callback is not defined.
         */
        addEventListener : function(node, evt, fn) {

            var kCallbackTemplate = config.constants.text.err.CALLBACK_NOT_DEFINED;
            var kCallbackNotDefined = format(kCallbackTemplate, 'addEventListener');

            var obj = $(node);

            if(!obj) {

                return;
            }

            if(obj.addEventListener) {
                me.EventHandler.addEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    // 'false' is for not to use event capturing.
                    // Event capturing is not very useful, since its
                    // implementation vastly deviates among vendors'
                    // implementations.
                    //
                    // See:
                    // http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow

                    obj.addEventListener(evt, fn, false);

                };


                me.EventHandler.addEventListener(obj, evt, fn);

                return;
            }

            if(obj.attachEvent) {
                me.EventHandler.addEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    var onEvent = ['on', evt].join('');
                    obj.attachEvent(onEvent, fn);

                };


                me.EventHandler.addEventListener(obj, evt, fn);

                return;
            }

            me.EventHandler.addEventListener = function(node, evt, fn) {

                var obj = $(node);

                if(!obj) {
                    return;
                }

                if(!fn) {
                    throw kCallbackNotDefined;
                }

                var onEvent = ['on', evt].join('');
                obj[onEvent] = fn;

            };


            me.EventHandler.addEventListener(obj, evt, fn);

        },

        //TODO: add documentation.
        addEventListeners : function(collection, eventName, handler) {

            if(!collection) {

                return;
            }

            var listen = me.EventHandler.addEventListener;

            for(var key in collection) {
                if(collection.hasOwnProperty(key)) {
                    listen(collection[key], eventName, handler);
                }
            }

        },

        /**
         * @function {static} EventHandler.removeEventListener
         *
         * <p>Removes an already-added new event listener from the DOM Node.</p>
         *
         * @param {DomNode} node - the DOM object (or its <code>String</code>
         * reference) the evet shall be removed.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         * @throws {Exception} if <strong>fn</strong> callback is not defined.
         */
        removeEventListener : function(node, evt, fn) {

            var kCallbackTemplate = config.constants.text.err.CALLBACK_NOT_DEFINED;
            var kCallbackNotDefined = format(kCallbackTemplate, 'removeEventListener');

            var obj = $(node);

            if(!obj) {

                return;
            }

            if(obj.removeEventListener) {
                me.EventHandler.removeEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    obj.removeEventListener(evt, fn, false);

                };


                me.EventHandler.removeEventListener(obj, evt, fn);

                return;
            }

            if(obj.detachEvent) {
                me.EventHandler.removeEventListener = function(node, evt, fn) {

                    var obj = $(node);

                    if(!obj) {

                        return;
                    }

                    if(!fn) {

                        throw kCallbackNotDefined;
                    }

                    var onEvent = ['on', evt].join('');
                    obj.detachEvent(onEvent, fn);

                };


                me.EventHandler.removeEventListener(obj, evt, fn);

                return;
            }

            me.EventHandler.removeEventListener = function(node, evt, fn) {

                var obj = $(node);

                if(!obj) {

                    return;
                }

                if(!fn) {

                    throw kCallbackNotDefined;
                }

                var onEvent = ['on', evt].join('');
                obj[onEvent] = nill;

            };


            me.EventHandler.removeEventListener(obj, evt, fn);

        },

        //TODO: removeAllEventListeners (obj)
        //TODO: removeAllEventListeners (obj, eventName)
        //TODO: removeAllEventListeners (eventName)
        //TODO: removeAllEventListeners ()

        /**
         * @function {static} EventHandler.getEventObject
         *
         * <p>Gets the actual event object.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
         * @return the actual <code>DOM Event</code> object.
         */
        getEventObject : function(evt) {

            me.EventHandler.getEventObject = window.event ? function() {

                return window.event;

            } : function(e) {

                return e;

            };

            return me.EventHandler.getEventObject(evt);

        },

        /**
         * @function {static} EventHandler.getTarget
         *
         * <p>Gets the originating source of the event.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
         * @return the actual DOM target of the event object.
         */
        getTarget : function(evt) {

            var target = window.event ? me.EventHandler.getTarget = function() {

                return window.event.srcElement;

            } : me.EventHandler.getTarget = function(e) {

                return e ? e.target : null;

            };

            return me.EventHandler.getTarget(evt);

        },

        /**
         * @function {static} EventHandler.preventDefault
         *
         * <p>Prevents the default action. When this method is called inside an
         * even
         * handling
         * callback, the default action associated with that event is not
         * triggered.
         * Like, if it is an <code>onclick</code> event on a link, then the
         * browser does
         * not go to the <code>href</code> of that link.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
         */
        preventDefault : function(evt) {

            me.EventHandler.preventDefault = window.event ? function() {

                window.event.returnValue = false;

                return false;

            } : function(e) {

                if(!e) {

                    return;
                }

                if(e.preventDefault) {
                    e.preventDefault();
                }

                return false;

            };


            me.EventHandler.preventDefault(evt);

        },

        /**
         * @function {static} EventHandler.stopPropagation
         *
         * <p>Stops the propagation of the event upwards in the DOM
         * hierarchy.</p>
         * <p>See {@link
         * http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow}
         * for details.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally
         * in {@link EventHandler.addEventListener}
         */
        stopPropagation : function(evt) {

            me.EventHandler.stopPropagation = window.event ? function() {

                window.event.cancelBubble = true;

            } : function(e) {

                if(!e) {

                    return;
                }

                e.stopPropagation();

            };


            me.EventHandler.stopPropagation(evt);

        }

    };

}(o2, this));
