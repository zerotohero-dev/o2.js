/**
 * @module   domhelper.form
 * @requires core
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-20 09:11:14.837157
 * -->
 *
 * <p>A HTML <code>Form</code> utility class.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'DomHelper';

    /*
     * DomHelper (form)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $ = require('$');

    var kStringHelper = 'StringHelper';
    var compact       = require(kStringHelper, 'compact');
    var trim          = require(kStringHelper, 'trim');

    /**
     * @function {static} o2.DomHelper.compactField
     *
     * <p>Trims a given field, and returns the compacted value.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} field - the field to be compacted, or its
     * <strong>id</strong>.
     *
     * @return field's compacted value; or <code>null</code> if the field
     * does not exist.
     *
     * @see o2.StringHelper.compact
     */
    def(me, 'compactField', function(field) {
        field = $(field);

        if (!field) {
            return null;
        }

        field.value = compact(field.value);

        return field.value;
    });

    /**
     * @function {static} o2.DomHelper.trimField
     *
     * <p>Trims a given field, and returns the trimmed value.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} field - the field to be trimmed, or its
     * <strong>id</strong>.
     *
     * @return field's trimmed value; or <code>null</code> if the field
     * does not exist.
     *
     * @see o2.StringHelper.trim
     */
    def(me, 'trimField', function(field) {
        field = $(field);

        if (!field) {
            return null;
        }

        field.value = trim(field.value);

        return field.value;
    });

    /**
     * @function {static} o2.FormHelper.preventMultipleSubmit
     *
     * <p>Prevents the form to re-submit itself when the submit button
     * is pressed more than once.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} form - A <strong>DOM</strong> reference to the form
     * object or its <code>String</code> id.
     */
    def(me, 'preventMultipleSubmit', function(form) {
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
    });
}(this.o2));
