requiere([
    '/o2/object/core',
    './core',
    './submodule/single'
], function(
    ObjectUtil,
    Ajax,
    single
) {
    'use strict';

    var exports = {},

        /*
         * # Aliases
         */

        /*
         * object
         */

        extend = ObjectUtil.extend;

    extend(exports, Ajax);
    extend(exports, single);

    return exports;
});
