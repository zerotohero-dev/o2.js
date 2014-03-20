/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-11 05:57:27.999144
 * -->
 */
(function(app, o2) {
    'use strict';

    /**
     *
     */
    var me = app.EventCallback = {};

    /*
     * Aliases
     */
    var eh             = o2.EventHandler;
    var getTarget      = eh.getTarget;
    var preventDefault = eh.preventDefault;

    /*
     * Logger
     */
    var log = app.Logger.log;

    /*
     * Factory
     */
    var factory = app.EventCallbackFactory;

    /**
     *
     */
    me.document_click = function(evt) {
        log('app.EventCallback.document_click');

        var src = getTarget(evt);

        if (!src) {
            return;
        }

        var mixed = factory.create(src);
        var delegate = mixed.callback;
        var args = mixed.args;

        var shouldPreventDefault = !!delegate;

        if (shouldPreventDefault) {
            preventDefault(evt);
        }

        if (!delegate) {
            return;
        }

        delegate.apply(src, [src, args]);
    };
}(this.VCardApp, this.o2));
