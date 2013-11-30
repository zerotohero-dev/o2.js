/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-08 08:04:46.842332
 * -->
 */
(function(app) {
    'use strict';

    var controller = app.PageController;

    /*
     * Logger
     */
    var log = app.Logger.log;

    log('bootstrapping...')

    controller.init();

    log('ready!');
}(this.VCardApp));
