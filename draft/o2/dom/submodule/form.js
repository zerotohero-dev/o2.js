define([
    '../../core',
    '../../string/core'
], function(
    o2,
    StringUtil
) {
    'use strict';

        /*
         * # Module Exports
         */

    var  exports = {},

        /*
         * # Aliases
         */

        /*
         * core
         */
        $ = o2.$,

        /*
         * string.core
         */
        compact = StringUtil.compact,
        trim = StringUtil.trim,

        /*
         * # Common Constants
         */

        kPlaceholder = 'placeholder',
        kEmpty = '';

    exports.compactField = function(field) {
        field = $(field);

        if (!field) {return null;}

        field.value = compact(field.value);

        return field.value;
    };

    exports.trimField = function(field) {
        field = $(field);

        if (!field) {return null;}

        field.value = trim(field.value);

        return field.value;
    };

    exports.preventMultipleSubmit = function(form) {
        form = $(form);

        if (!form) {return;}

        form.onsubmit = function() {
            form.onsubmit = function() {return false;};

            return true;
        };
    };

    //TODO: add documentation.
    exports.removePlaceholder = function(elm) {
        var target = $(elm);

        if (!target) {return;}

        if(target.getAttribute(kPlaceholder) === target.value) {
            target.value = kEmpty;
        }
    };

    //TODO: add documentation.
    exports.resetField = function(elm) {
        var item = $(elm);

        if (!item) {return;}

        item.value = kEmpty;
    };

    //TODO: add documentation.
    exports.disable = function() {
        var i,
            item ,
            len;

        for(i = 0, len = arguments.length; i < len; i++) {
            item = $(arguments[i]);

            if(item) {
                item.disabled = true;
            }
        }
    };

    return exports;
});
