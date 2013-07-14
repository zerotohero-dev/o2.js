/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: ensure that this file works.

/*
 * A production-optimized version of o2.meta.js
 */
(function(window) {
    'use strict';

    var kCache     = '_o2_cached',
        kFramework = 'o2';

    if (window[kFramework]) {
        window[kCache] = window[kFramework];

        return;
    }

    window[kFramework] = {isProduction : true};
}(this));

(function(framework) {
    'use strict';

    var kObject = 'object',
        kEmpty  = '',
        fp      = null;

    function init(root, key, value) {
        if (!root || typeof root !== kObject) {return null;}
        if (root[key]                       ) {return root[key];}

        root[key] = value;

        return root[key];
    }

    function namespace(root, key) {
        if (!root || typeof root !== kObject) {return null;}

        return init(root, key, {});
    }

    fp      = init(framework, 'protecteds', {});

    init(fp, 'alias', function(mixed, aliasName, existingName) {
        mixed[1][aliasName] = mixed[1][existingName];
    });

    init(fp, 'create', function(name) {
        return [null, namespace(framework, name)];
    });

    init(fp, 'construct', function(name, delegate) {
        framework[name] = delegate;

        return [null, delegate];
    });

    init(fp, 'define', function(mixed, name, fn) {
        var me = mixed[1];

        me[name] = fn;
    });

    init(fp, 'getAttr', function(root, name) {
        var elem = root[name];

        return elem;
    });

    init(fp, 'getObject', function(mixed) {
        return mixed[1];
    });

    init(fp, 'getRoot', function() {
        return [null, framework];
    });

    init(fp, 'override', function(mixed, methodName, fn) {
        var me = mixed[1];

        me.prototype[methodName] = fn;
    });

    init(fp, 'proto', function(mixed, methodName, fn) {
        var me = mixed[1];

        me.prototype[methodName] = fn;
    });

    init(fp, 'require', function(name, method) {
        var methodName = '',
            objName    = '';

        if (arguments.length === 1) {
            methodName = name;
            objName    = kEmpty;
        } else {
            methodName = method;
            objName    = name;
        }

        if (objName === kEmpty) {
            return framework[methodName];
        }

        return framework[objName][methodName];
    });
}(this.o2));
