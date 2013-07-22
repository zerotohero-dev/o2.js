require([
    '../../object/core',
    './ajaxstate'
], function(
    ObjectUtil,
    AjaxState
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * ../../object/core
         */
        copyFn   = ObjectUtil.copyMethods,
        copyAttr = ObjectUtil.copy;

    /*
     * Inheritance implementation through mixins.
     */

    copyFn(exports, AjaxState);

    exports.protecteds = {};

    copyAttr(
        exports.protecteds,
        AjaxState.protecteds
    );

    return exports;
});
