/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

     /**
     * @module   jsonpstate.core
     *
     * @requires core
     * @requires ajaxstate.core
     * @requires object.core
     *
     * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
     * etc. A {@link JsonpController} should be registered to this
     * <strong>model</strong>.
     */
    fp.ensure(
        'jsonpstate.core',
    [
        'core',
        'ajaxstate.core',
        'object.core'
    ]);

    var attr    = fp.getAttr,
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Definition
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
         * # Aliases
         */

        /*
         * object.core
         */
        kObject  = 'Object',
        copyFn   = require(kObject, 'copyMethods'),
        copyAttr = require(kObject, 'copy'),

        /*
         * # Inheritance-Related Constants
         */

        kBaseName   = 'AjaxState',
        kMyName     = kModuleName,
        kProtecteds = 'protecteds';

    //TODO: copy with require: f(kMyName, kBaseName)

    /*
     * Inheritance implementation through mixins.
     */
    function inherit() {
        copyFn(require(kMyName), require(kBaseName));
        def(me, kProtecteds, {});
        copyAttr(
            require(kMyName,   kProtecteds),
            require(kBaseName, kProtecteds)
        );
    }

    inherit();
}(things.o2, this.o2.protecteds));
