/**
 * @module   jsonpstate.core
 * @requires ajaxstate.core
 * @requires core
 * @requires object.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc. A {@link JsonpController} should be registered to this
 * <strong>model</strong>.
 */
(function(framework, fp) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('jsonpstate.core', ['core', 'ajaxstate.core', 'object.core']);

    var attr      = fp.getAttr,
        create    = attr(fp, 'create'),
        def       = attr(fp, 'define'),
        require   = attr(fp, 'require'),

        /*
         * Module Name
         */
        kModuleName = 'JsonpState',

        /**
         * @class {static} o2.JsonpState
         * @extends o2.AjaxState
         *
         * <p>Implements all public methods of {@link AjaxState} for
         * <strong>JSONP</strong> requests.</p>
         */
        me = create(kModuleName),

        /*
         * Aliases
         */

        kObjectHelper = 'Object',
        copyFn        = require(kObjectHelper, 'copyMethods'),
        copyAttr      = require(kObjectHelper, 'copy'),

        /*
         * Inheritance-Related Constants
         */

        kBaseName   = 'AjaxState',
        kMyName     = kModuleName,
        kProtecteds = 'protecteds';

    //TODO: copy with require: f(kMyName, kBaseName)

    // Inheritance implementation (through mixins):
    copyFn(require(kMyName), require(kBaseName));
    def(me, kProtecteds, {});
    copyAttr(
        require(kMyName,   kProtecteds),
        require(kBaseName, kProtecteds)
    );
}(this.o2, this.o2.protecteds));
