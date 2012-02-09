/**
 * @module   domhelper.form
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 09:32:00.832571
 * -->
 *
 * <p>A HTML <code>Form</code> utility class.</p>
 */
(function(framework) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = use(framework.DomHelper);
    var $ = use(framework.$);
    var compact = use(framework.StringHelper.compact);
    var trim = use(framework.StringHelper.trim);

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
        field = $(field);

        if (!field) {
            return null;
        }

        field.value = trim(field.value);

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
        field = $(field);

        if (!field) {
            return null;
        }

        field.value = compact(field.value);

        return field.value;
    };
}(this.o2));
