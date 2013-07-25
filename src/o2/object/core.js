require([
    '../core',
    '../string/core',
    '../collection/core'
], function(
    o2,
    StringUtil,
    Collection
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
         * ../core
         */
        frameworkName = o2.name,

        /*
         * ../string/core
         */
        format = String.format,
        concat = String.concat,

        /*
         * ../collection/core
         */
        toArray = Collection.toArray,

        /*
         * JSON
         */
        JSON = window.JSON,

        /*
         * # Common Constants
         */

        kNoJsonSupport = concat(frameworkName,
            ': {0}: No JSON support. quitting'),
        kFunction = 'function',
        kObject = 'object';

    exports.copy = function(child, base) {
        var key = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                child[key] = base[key];
            }
        }
    };

    exports.copyMethods = function(child, base) {
        var key,
            value;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                value = base[key];

                if (typeof value === kFunction) {
                    child[key] = value;
                }
            }
        }
    };

    exports.copyPrototype = function(child, base) {
        var baseProto = base.prototype,
            childProto = child.prototype,
            key;

        if (!childProto) {return;}
        if (!baseProto ) {return;}

        for (key in baseProto) {
            if (baseProto.hasOwnProperty(key)) {
                childProto[key] = baseProto[key];
            }
        }
    };

    exports.extend = function(childConstructor, baseConstructor,
                baseConstructed) {
        var Junction = function(){};

        childConstructor.prototype = new Junction();
        Junction.prototype = baseConstructed;
        childConstructor.prototype.constructor = childConstructor;
        childConstructor.prototype.parent = baseConstructor.prototype;
    };

    exports.toArray = function(obj) {
        return toArray(obj);
    };

    exports.toJsonString = function(obj) {
        var kMethodName = 'Object.toJsonString';

        if (JSON) {
            return JSON.stringify(obj);
        }

        throw format(kNoJsonSupport, kMethodName);
    };

    exports.stringify = exports.toJsonString;

    exports.touch = function(obj, delegate) {
        if (!obj) {return null;}
        if (typeof obj !== kObject) {return null;}

        delegate(obj);

        return obj;
    };
});

