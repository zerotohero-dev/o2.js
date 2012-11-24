/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header.
(function(framework, fp) {
    'use strict';

    //TODO: add documentations.

    fp.ensure(
        'event.custom',
    [
        'core',
        'validation.core'
    ]);

    var attr      = fp.getAttr,
        create    = attr(fp, 'create'),
        def       = attr(fp, 'define'),
        require   = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Event',

        /**
         *
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * validation.core
         */
        isArray = require('Validation', 'isArray'),

        /*
         * # Static State
         */

        cache = {};

    exports.publish = def(me, 'publish', function(name, argv) {
        if (!name) {return;}

        var delegates = cache[name],
            args      = argv || [],
            i         = 0,
            len       = 0;

        if (!delegates    ) {return;}
        if (!isArray(args)) {args = [args];}

        for (i = 0, len = delegates.length; i < len; i++) {
            try {
                delegates[i].apply(null, args);
            } catch (ignore) {}
        }
    });

    exports.subscribe = def(me, 'subscribe', function(name, callback) {
        if (!name) {return;}

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
        var name      = handle.name,
            callback  = handle.callback,
            delegates = cache[name],
            i         = 0,
            len       = 0,
            delegate  = null;

        if (!delegates) {return;}

        for (i = 0, len = delegates.length; i < len; i++) {
            delegate = delegates[i];

            if (delegate === callback) {
                delegates.splice(i, 1);
                len = delegates.length;
                i--;
            }
        }
    });
}(this.o2, this.o2.protecteds));

