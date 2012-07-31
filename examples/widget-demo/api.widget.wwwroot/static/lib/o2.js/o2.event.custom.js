//TODO: add header.
(function(framework) {
    'use strict';

//2012-07-31 21:21:58.177362

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    var kModuleName = 'Event';

    var me = create(kModuleName);

    /*
     * Aliases
     */

    var isArray = require('Validation', 'isArray');

    //TODO: add documentations.

    var cache = {};

    exports.publish = def(me, 'publish', function(name, argv) {
        var delegates = cache[name];

        var args = argv || [];

        if (!isArray(args)) {
            args = [args];
        }

        var i         = 0;
        var len       = 0;

        if (!delegates) {
            return;
        }

        for (i = 0, len = delegates.length; i < len; i++) {
            try {
                delegates[i].apply(null, args);
            } catch (ignore) {}
        }
    });

    exports.subscribe = def(me, 'subscribe', function(name, callback) {
        if (!cache[name]) {
            cache[name] = [];
        }

        cache[name].push(callback);

        var handle = {
            name     : name,
            callback : callback
        };

        return handle;
    });

    exports.unsubscribe = def(me, 'unsubscribe', function(handle) {
        var name = handle.name;
        var callback = handle.callback;

        var delegates = cache[name];
        var i         = 0;
        var len       = 0;
        var delegate  = null;

        if (!delegates) {
            return;
        }

        for (i = 0, len = delegates.length; i < len; i++) {
            delegate = delegates[i];

            if (delegate === callback) {
                delegates.splice(i, 1);
                len = delegates.length;
                i--;
            }
        }
    });


}(this.o2));