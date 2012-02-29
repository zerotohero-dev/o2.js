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
 *  lastModified: 2012-02-28 12:22:39.902763
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
     * DomHelper (form)
     */
    var me = create('DomHelper');

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
}(this.o2));
