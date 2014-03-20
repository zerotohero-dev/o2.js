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
 *
 *  lastModified: 2012-06-02 22:47:21.699341
 * -->
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc. A {@link JsonpController} should be registered to this
 * <strong>model</strong>.
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
    var kModuleName = 'JsonpState';

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var kObjectHelper = 'Object';
    var copyFn        = require(kObjectHelper, 'copyMethods');
    var copyAttr      = require(kObjectHelper, 'copy');

    /*
     * Inheritance
     */

    var kBaseName   = 'AjaxState';
    var kMyName     = kModuleName;
    var kProtecteds = 'protecteds';

    def(me, kProtecteds, {});

    var base   = require(kBaseName);
    var myself = require(kMyName);

    var baseProtecteds = require(kBaseName, kProtecteds);
    var myProtecteds   = require(kMyName,   kProtecteds);

    copyFn(myself, base);
    copyAttr(myProtecteds, baseProtecteds);
}(this.o2));
