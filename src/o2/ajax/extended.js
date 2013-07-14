requiere([
    '/o2/core',
    'core',
    './submodule/single'
], function(
    o2,
    Ajax,
    single
) {
    'use strict';

    var exports = {};

    o2.extend(exports, Ajax);
    o2.extend(exports, single);

    return exports;
});
