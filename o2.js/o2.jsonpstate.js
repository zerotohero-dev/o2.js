/*global window, o2*/

/**
 * @module o2.jsonpstate
 * @requires o2.ajaxstate
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc.
 * An {@link o2.JsonpController} should be registered to this
 * <strong>model</strong>.
 */
( function(o2, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var clone = o2.MethodHelper.bind;

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link o2.AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    o2.JsonpState = {
        // Note that o2.JsonpState uses its own configutarion and state context:
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

    var base = o2.AjaxState;
    var baseProtected = o2.AjaxState.protecteds;
    var key = '';

    for(key in base) {
        if(base.hasOwnProperty(key)) {
            if( typeof base[key] == 'function') {
                o2.JsonpState[key] = clone(o2.JsonpState, base[key]);
            }
        }
    }

    for(key in baseProtected) {
        if(baseProtected.hasOwnProperty(key)) {
            if( typeof baseProtected[key] == 'function') {
                o2.JsonpState.protecteds[key] = clone(o2.JsonpState.protecteds, baseProtected[key]);
            }
        }
    }
}(o2, this));
