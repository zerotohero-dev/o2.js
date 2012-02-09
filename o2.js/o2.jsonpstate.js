/**
 * @module   jsonpstate
 * @requires ajaxstate
 * @requires methodhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 08:57:59.897716
 * -->
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc. A {@link JsonpController} should be registered to this
 * <strong>model</strong>.
 */

(function(framework) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var clone = use(framework.MethodHelper.bind);

    /*
     * Base Class
     */
    var base = use(framework.AjaxState);
    var baseProtecteds = use(base.protecteds);

    /*
     * Common Constants
     */
    var kFunction = 'function';

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    var me = framework.JsonpState = {};

    /*
     * Note that JsonpState uses its own configutarion and state context:
     */
    me.protecteds = {
        config : { LISTEN_TIMEOUT : 1001 },
        state : { listenTimeoutId : null },
        observers : []
    };

    function copy(root, base) {
        var key = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                if (typeof base[key] === kFunction) {
                    root[key] = clone(root, base[key]);
                }
            }
        }
    }

    var myProtecteds = use(me.protecteds);

    copy(me, base);
    copy(myProtecteds, baseProtecteds);
}(this.o2));
