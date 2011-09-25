/*global o2 */

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
 * etc.
 * An {@link JsonpController} should be registered to this
 * <strong>model</strong>.
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework;
    var clone = me.MethodHelper.bind;

    /**
     * @class {static} JsonpState
     * @extends AjaxState
     *
     * <p>Implements all public methods of {@link AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    me.JsonpState = {
        // Note that JsonpState uses its own configutarion and state context:
        protecteds : {
            config : {
                LISTEN_TIMEOUT : 1001
            },
            state : {
                listenTimeoutId : null
            },
            observers : []
        }
    };

    var base = me.AjaxState;
    var baseProtected = base.protecteds;
    var key = '';

    for(key in base) {
        if(base.hasOwnProperty(key)) {
            if( typeof base[key] == 'function') {
                me.JsonpState[key] = clone(me.JsonpState, base[key]);
            }
        }
    }

    for(key in baseProtected) {
        if(baseProtected.hasOwnProperty(key)) {
            if( typeof baseProtected[key] == 'function') {
                me.JsonpState.protecteds[key] = clone(me.JsonpState.protecteds, baseProtected[key]);
            }
        }
    }

}(o2, this));
