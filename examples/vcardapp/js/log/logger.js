/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 12:18:39.120815
 * -->
 */
(function(app) {
    'use strict';

    var me = app.Logger = app.Logger || {};

    var isProduction = false;

    if (!isProduction) {

        /**
         *
         */
        me.log = function(stuff) {
            if (window.console) {
                window.console.log(stuff);
            }
        }
    } else {
        me.log = function() {

        };
    }
}(this.VCardApp));