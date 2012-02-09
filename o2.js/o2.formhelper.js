/**
 * @module formHelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 09:06:07.224261
 * -->
 *
 * <p>A <strong>HTML</strong> form helper module.</p>
 */
(function(framework) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = framework.FormHelper = {};
    var $ = use(framework.$);

    /**
     * @function {static} o2.FormHelper.preventMultipleSubmit
     *
     * <p>Prevents the form to re-submit itself when the submit button
     * is pressed more than once.</p>
     *
     * @param {Object} form - A <strong>DOM</strong> reference to the form
     * object or its <code>String</code> id.
     */
    me.preventMultipleSubmit = function(form) {
        form = $(form);

        if (!form) {
            return;
        }

        form.onsubmit = function() {
            form.onsubmit = function() {
                return false;
            };

            return true;
        };
    };
}(this.o2));
