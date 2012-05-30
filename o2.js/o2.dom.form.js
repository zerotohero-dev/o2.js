/**
 * @module   dom.form
 * @requires core
 * @requires dom.core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-24 18:18:15.724271
 * -->
 *
 * <p>A HTML <code>Form</code> utility class.</p>
 */
(function(framework, undefined) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * Module Name
     */
    var kModuleName = 'Dom';

    /*
     * Dom (form)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $ = require('$');

    var kString = 'String';
    var compact = require(kString, 'compact');
    var trim    = require(kString, 'trim');

    /*
     * Common Constants
     */
    var kPlaceholder = 'placeholder';
    var kEmpty       = '';

    /**
     * @function {static} o2.Dom.compactField
     *
     * <p>Trims a given field, and returns the compacted value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.compactField('txtInput');
     * </pre>
     *
     * @param {Object} field - the field to be compacted, or its
     * <strong>id</strong>.
     *
     * @return field's compacted value; or <code>null</code> if the field
     * does not exist.
     *
     * @see o2.String.compact
     */
    var compactField = def(me, 'compactField', function(field) {
        field = $(field);

        if (!field) {
            return null;
        }

        field.value = compact(field.value);

        return field.value;
    });

    /**
     * @function {static} o2.Dom.trimField
     *
     * <p>Trims a given field, and returns the trimmed value.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.trimField('txtInput');
     * </pre>
     *
     * @param {Object} field - the field to be trimmed, or its
     * <strong>id</strong>.
     *
     * @return field's trimmed value; or <code>null</code> if the field
     * does not exist.
     *
     * @see o2.String.trim
     */
    var trimField = def(me, 'trimField', function(field) {
        field = $(field);

        if (!field) {
            return null;
        }

        field.value = trim(field.value);

        return field.value;
    });

    /**
     * @function {static} o2.Dom.preventMultipleSubmit
     *
     * <p>Prevents the form to re-submit itself when the submit button
     * is pressed more than once.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.preventMultipleSubmit('actionForm');
     * </pre>
     *
     * @param {Object} form - A <strong>DOM</strong> reference to the form
     * object or its <code>String</code> id.
     */
    var preventMultipleSubmit = def(me, 'preventMultipleSubmit', function(form) {
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

    //TODO: add documentation.
    var removePlaceholder = def(me, 'removePlaceholder', function(elm) {
        var target = $(elm);

        if (!target) {
            return;
        }

        if(target.getAttribute(kPlaceholder) === target.value) {
            target.value = kEmpty;
        }
    });

    //TODO: add documentation.
    var resetField = def(me, 'resetField', function(elm) {
        var item = $(elm);

        if (!item) {
            return;
        }

        item.value = kEmpty;
    });

    //TODO: add documentation.
    var disable = def(me, 'disable', function() {
        var i    = 0;
        var item = null;
        var len  = 0;

        for(i = 0, len = arguments.length; i < len; i++) {
            item = $(arguments[i]);

            if(item) {
                item.disabled = true;
            }
        }
    });
}(this.o2));
