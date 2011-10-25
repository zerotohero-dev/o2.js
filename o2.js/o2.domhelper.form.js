/*global o2 */

/**
 * @module domhelper.form
 * @requires stringhelper
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A HTML <code>Form</code> utility class.</p>
 */
( function(framework) {

    // Strict mode on.
    'use strict';

    /*
     * Aliases.
     */
    var me = framework.DomHelper;

    /**
     * @function {static} o2.DomHelper.trimField
     *
     * <p>Trims a given field, and returns the trimmed value.</p>
     *
     * @param {Object} field - the field to be trimmed, or its
     * <strong>id</strong>.
     *
     * @return field's trimmed value.
     *
     * @see o2.StringHelper.trim
     */
    me.trimField = function(field) {

        //
        field = o2.$(field);

        if(!field) {

            return null;
        }

        field.value = o2.StringHelper.trim(field.value);

        return field.value;
    };

    /**
     * @function {static} o2.DomHelper.compactField
     *
     * <p>Trims a given field, and returns the compacted value.</p>
     *
     * @param {Object} field - the field to be compacted, or its
     * <strong>id</strong>.
     *
     * @return field's compacted value.
     *
     * @see o2.StringHelper.compact
     */
    me.compactField = function(field) {

        //
        field = o2.$(field);

        if(!field) {

            return null;
        }

        field.value = o2.StringHelper.compact(field.value);

        return field.value;
    };

}(this.o2));
