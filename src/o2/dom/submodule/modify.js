require([
    '../../core',
    '../../dom/core'
], function(
    o2,
    Dom
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Module Definition
         */

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = o2.$,

        /*
         * dom.core
         */
        append = Dom.append,
        insertAfter = Dom.insertAfter,
        insertBefore = Dom.nsertBefore,
        isElement = Dom.isElement,
        remove = Dom.remove;

    exports.replace = function(elmTarget, elmToReplace) {
        var target = $(elmTarget),
            replace = $(elmToReplace);

        append(target, replace);
        remove(target);
    };

    exports.unwrap = function(elmTarget) {
        var target = $(elmTarget),
            child = null;

        if (!target) {return;}

        while (target.hasChildNodes()) {
            child = remove(target.firstChild);

            if (isElement(child)) {
                insertAfter(child, target);
            }
        }

        remove(target);
    };

    exports.wrap = function(elmTarget, elmWrapper) {
        var target  = $(elmTarget),
            wrapper = $(elmWrapper);

        if (!target || !wrapper) {return;}

        insertBefore(wrapper, target);
        append(target, wrapper);

        return elmTarget;
    };

    return exports;
});
