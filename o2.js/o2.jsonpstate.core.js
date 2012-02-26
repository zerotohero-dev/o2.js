/**
 * @module   jsonpstate.core
 * @requires ajaxstate.core
 * @requires core
 * @requires objecthelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-26 13:16:07.917177
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
    var obj       = attr(_, 'getObject');
    var require   = attr(_, 'require');

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    var me     = create('JsonpState');
    var myself = obj(me);

    /*
     * Aliases
     */

    var copyFn   = require('ObjectHelper', 'copyMethods');
    var copyAttr = require('ObjectHelper', 'copy');
    /*
     * Base Class
     */
    var base           = require('AjaxState');
    var baseProtecteds = require('AjaxState', 'protecteds');

    def(me, 'protecteds', {});

    var myProtecteds = require('JsonpState', 'protecteds');

    copyFn(myself, base);
    copyAttr(myProtecteds, baseProtecteds);
}(this.o2));
