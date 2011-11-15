/**
 * @module eventhandler.core
 * @requires stringhelper.core
 * @requires eventhandler.constants
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A cross-browser event management object.</p>
 */
(function(framework, window) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.EventHandler;
    var $ = framework.$;
    var format = framework.StringHelper.format;
    var nill = framework.nill;

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

    /*
     * Common constants.
     */
    var kRemoveEventListener = 'removeEventListener';
    var kAddEventListener = 'addEventListener';
    var kOn = 'on';
    var kEmpty = '';
    var kCallbackTemplate = config.constants.text.err.CALLBACK_NOT_DEFINED;

    /**
     * @function {static} o2.EventHandler.addEventListener
     *
     * <p>Adds a new event listener to the <strong>DOM</strong> Node.</p>
     *
     * @param {DomNode} node - the <strong>DOM</strong> object (or its
     * <code>String</code> id) the evet shall be attached.
     * @param {String} evt - the name of the event (like "click",
     * "mousemove"...)
     * @param {Function} fn - a reference to the on[event] callback action.
     *
     * @throws exception - if <strong>fn</strong> callback is not defined.
     */
    me.addEventListener = function(node, evt, fn) {
        var kCallbackNotDefined = format(kCallbackTemplate, kAddEventListener);

        var obj = $(node);

        if (!obj) {
            return;
        }

        if (obj.addEventListener) {
            me.addEventListener = function(node, evt, fn) {
                var obj = $(node);

                if (!obj) {
                    return;
                }

                if (!fn) {
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

            me.addEventListener(obj, evt, fn);

            return;
        }

        if (obj.attachEvent) {
            me.addEventListener = function(node, evt, fn) {

                var obj = $(node);

                if (!obj) {
                    return;
                }

                if (!fn) {
                    throw kCallbackNotDefined;
                }

                var onEvent = [kOn, evt].join(kEmpty);
                obj.attachEvent(onEvent, fn);
            };

            me.addEventListener(obj, evt, fn);

            return;
        }

        me.addEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            var onEvent = [kOn, evt].join(kEmpty);

            obj[onEvent] = fn;
        };

        me.addEventListener(obj, evt, fn);
    };

    /**
     * @function {static} o2.EventHandler.addEventListeners
     *
     * <p>Adds a set of event handlers the the <strong>eventName</strong> of
     * the given <strong>collection</strong>.</p>
     *
     * @param {Object} collection - an <code>Object</code> or an
     * <code>Array</code> of <strong>DOM</strong> nodes, or their
     * <strong>id</strong>s.
     * @param {String} eventName - the name of the <strong>event</strong> to
     * attach to.
     * @param {Function} handler - the common event handling
     * <strong>callback</strong>.
     *
     * @throws exception - if the <strong>handler</strong> callback is not
     * defined.
     */
    me.addEventListeners = function(collection, eventName, handler) {
        if (!collection) {
            return;
        }

        var listen = me.addEventListener;
        var key = null;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                listen(collection[key], eventName, handler);
            }
        }
    };

    /**
     * @function {static} o2.EventHandler.removeEventListener
     *
     * <p>Removes an already-added new event listener from the DOM Node.</p>
     *
     * @param {DomNode} node - the DOM object (or its <code>String</code>
     * reference) the evet shall be removed.
     * @param {String} evt - the name of the event (like "click",
     * "mousemove"...)
     * @param {Function} fn - a reference to the on[event] callback action.
     *
     * @throws exception - if <strong>fn</strong> callback is not defined.
     */
    me.removeEventListener = function(node, evt, fn) {
        var kCallbackNotDefined = format(kCallbackTemplate, kRemoveEventListener);
        var obj = $(node);

        if (!obj) {
            return;
        }

        if (obj.removeEventListener) {
            me.removeEventListener = function(node, evt, fn) {
                var obj = $(node);

                if (!obj) {
                    return;
                }

                if (!fn) {
                    throw kCallbackNotDefined;
                }

                obj.removeEventListener(evt, fn, false);
            };

            me.removeEventListener(obj, evt, fn);

            return;
        }

        if (obj.detachEvent) {
            me.removeEventListener = function(node, evt, fn) {
                var obj = $(node);

                if (!obj) {
                    return;
                }

                if (!fn) {
                    throw kCallbackNotDefined;
                }

                var onEvent = [kOn, evt].join(kEmpty);
                obj.detachEvent(onEvent, fn);
            };


            me.removeEventListener(obj, evt, fn);

            return;
        }

        me.removeEventListener = function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            var onEvent = [kOn, evt].join(kEmpty);

            obj[onEvent] = nill;
        };

        me.removeEventListener(obj, evt, fn);
    };

    /**
     * @function {static} o2.EventHandler.getEventObject
     *
     * <p>Gets the actual event object.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link EventHandler.addEventListener}
     *
     * @return the actual <code>DOM Event</code> object.
     */
    me.getEventObject = function(evt) {
        me.getEventObject = window.event ? function() {
            return window.event;
        } : function(e) {
            return e;
        };

        return me.getEventObject(evt);
    };

    /**
     * @function {static} o2.EventHandler.getTarget
     *
     * <p>Gets the originating source of the event.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link EventHandler.addEventListener}
     *
     * @return the actual <strong>DOM</strong> target of the event object.
     */
    me.getTarget = function(evt) {
        if (window.event) {
            me.getTarget = function() {
                return window.event.srcElement;
            };
        } else {
            me.getTarget = function(e) {
                return e ? e.target : null;
            };
        }

        return me.getTarget(evt);
    };

    /**
     * @function {static} o2.EventHandler.preventDefault
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
     * internally in {@link EventHandler.addEventListener}
     */
    me.preventDefault = function(evt) {
        me.preventDefault = window.event ? function() {
            window.event.returnValue = false;

            return false;
        } : function(e) {
            if (!e) {
                return false;
            }

            if (e.preventDefault) {
                e.preventDefault();
            }

            return false;
        };

        // Cancel event's default action.
        me.preventDefault(evt);
    };

    /**
     * @function {static} o2.EventHandler.stopPropagation
     *
     * <p>Stops the propagation of the event upwards in the DOM
     * hierarchy.</p>
     *
     * <p>Note that "change" event does not bubble.</p>
     *
     * <p>Also, events: change, submit, reset, focus, blur do not bubble
     * in Internet Explorer.</p>
     *
     * <p>According to specification, "focus" and "blur" should not bubble,
     * while "change", "submit", "reset" should.</p>
     *
     * <p>This behavior implemented properly in all web browsers but IE.</p>
     *
     * <p>See {@link
     * http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow}
     * for details.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link EventHandler.addEventListener}
     */
    me.stopPropagation = function(evt) {
        me.stopPropagation = window.event ? function() {
            window.event.cancelBubble = true;
        } : function(e) {
            if (!e) {
                return;
            }

            e.stopPropagation();
        };

        // This stops event bubbling.
        me.stopPropagation(evt);
    };
}(this.o2, this));
