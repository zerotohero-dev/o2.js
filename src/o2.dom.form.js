/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   dom.form
     *
     * @requires core
     * @requires string.core
     *
     * <p>A HTML <code>Form</code> utility class.</p>
     */
    fp.ensure(
        'dom.form',
    [
        'core',
        'string.core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Definition
         */
        kModuleName = 'Dom',

        /*
         * Dom (form)
         */
        me = create(kModuleName),

        /*
         * Aliases
         */

        /*
         * core
         */
        $ = require('$'),

        /*
         * string.core
         */
        kString = 'String',
        compact = require(kString, 'compact'),
        trim    = require(kString, 'trim'),

        /*
         * # Common Constants
         */

        kPlaceholder = 'placeholder',
        kEmpty       = '';

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
    exports.compactField = def(me, 'compactField', function(field) {
        field = $(field);

        if (!field) {return null;}

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
    exports.trimField = def(me, 'trimField', function(field) {
        field = $(field);

        if (!field) {return null;}

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
    exports.preventMultipleSubmit = def(me, 'preventMultipleSubmit',
                function(form) {
        form = $(form);

        if (!form) {return;}

        form.onsubmit = function() {
            form.onsubmit = function() {return false;};

            return true;
        };
    });

    //TODO: add documentation.
    exports.removePlaceholder = def(me, 'removePlaceholder', function(elm) {
        var target = $(elm);

        if (!target) {return;}

        if(target.getAttribute(kPlaceholder) === target.value) {
            target.value = kEmpty;
        }
    });

    //TODO: add documentation.
    exports.resetField = def(me, 'resetField', function(elm) {
        var item = $(elm);

        if (!item) {return;}

        item.value = kEmpty;
    });

    //TODO: add documentation.
    exports.disable = def(me, 'disable', function() {
        var i    = 0,
            item = null,
            len  = 0;

        for(i = 0, len = arguments.length; i < len; i++) {
            item = $(arguments[i]);

            if(item) {
                item.disabled = true;
            }
        }
    });
}(this.o2, this.o2.protecteds));

