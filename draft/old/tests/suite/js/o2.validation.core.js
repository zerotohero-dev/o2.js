/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(window, o2, ns) {
    'use strict';

    var u      = o2.Unit,
        assert = u.assert,
        run    = u.run,
        add    = u.add;

    ns.o2 = {
        tests : 'validation.core',
        cases : {
            is          : function() {},
            isArguments : function() {},
            isArray     : function() {},
            isBoolean   : function() {},
            isDate      : function() {},
            isFunction  : function() {},
            isNaN       : function() {},
            isNull      : function() {},
            isNumber    : function() {},
            isNumeric   : function() {},
            isObject    : function() {},
            isRegExp    : function() {},
            isString    : function() {},
            isUndefined : function() {},
            isWindow    : function() {}
        },
        run : function() {

        }
    };
}(this, this.o2, ((this.o2Test = {}).suites = {})));

