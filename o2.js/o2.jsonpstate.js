/**
 * @module jsonpstate
 * @requires ajaxstate
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc. A {@link JsonpController} should be registered to this
 * <strong>model</strong>.
 */
(function(framework) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;
    var clone = framework.MethodHelper.bind;

    /*
     * Base Class.
     */
    var base = framework.AjaxState;
    var baseProtected = base.protecteds;
    var key = '';
    var kFunction = 'function';

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    me.JsonpState = {

        // Note that JsonpState uses its own configutarion and state context:
        protecteds : {

            /*
             *
             */
            config : {
                LISTEN_TIMEOUT : 1001
            },

            /*
             *
             */
            state : {
                listenTimeoutId : null
            },

            /*
             *
             */
            observers : []
        }
    };

    for (key in base) {
        if (base.hasOwnProperty(key)) {
            if (typeof base[key] === kFunction) {
                me.JsonpState[key] = clone(me.JsonpState, base[key]);
            }
        }
    }

    for (key in baseProtected) {
        if (baseProtected.hasOwnProperty(key)) {
            if (typeof baseProtected[key] === kFunction) {
                me.JsonpState.protecteds[key] = clone(me.JsonpState.protecteds,
                    baseProtected[key]);
            }
        }
    }
}(this.o2));
