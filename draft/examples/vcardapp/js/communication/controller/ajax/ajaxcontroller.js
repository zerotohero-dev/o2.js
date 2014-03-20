/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 12:27:29.265356
 * -->
 */
(function(app) {
    'use strict';

    /**
     *
     */
    var me = app.AjaxController = {};

    /*
     * Config
     */

    var ac   = app.config;
    var acc  = ac.constants;

    var kUsername    = ac.serviceKey.USERNAME;

    var kCurrentUser = acc.user.USERNAME;

    /*
     * Logger
     */
    var log = app.Logger.log;

    /*
     * Proxy
     */
    var proxy = app.AjaxProxy;


    me.showVCard = function() {
        log('app.AjaxController.showVCard');

        var params = {};

        params[kUsername] = kCurrentUser;

        proxy.sendShowVCardRequrest(params);
    };
}(this.VCardApp));