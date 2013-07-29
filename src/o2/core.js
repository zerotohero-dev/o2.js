define([
    './dom/core',
    './event/core'
],
function(
    Dom,
    Event
) {
    'use strict';

        /*
         * # Module Exports
         */

    var exports = {},

        /*
         * # Common Constants
         */

        kLoad = 'load',
        kString = 'string',

        /*
         * # To Be Overridden
         */

        myName,
        t,
        n,
        $;

    exports.nill = function() {};

    exports.name = 'o2js';

    /*
     *
     */
    myName = exports.name;

    // TODO: these should be grunt-template-generated.
    // exports.url = 'http://o2js.com';
    // exports.longName = [
    //     'o2.js - ',
    //     'a Coherent Solution to Your JavaScript Dilemma ;)'
    // ].join('');
    // exports.version = '0.25.a';
    // exports.build = '.0001369602378';

    exports.$ = function(obj) {
        if (!obj) {
            return null;
        }

        if (typeof obj === kString) {
            return document.getElementById(obj);
        }

        return obj || null;
    };

    /*
     *
     */
    $ = exports.$;

    exports.ready = function(callback) {
        Dom.ready(callback);
    };

    exports.load = function(callback) {
        Event.addEventListener(window, kLoad, callback);
    };

    exports.now = function() {
        return (new Date()).getTime();
    };

    exports.n = function(name, parent) {
        var collection = document.getElementsByName(name),
            isParent = Dom.isParent,
            result = [],
            father,
            i,
            item,
            len;

        if (!parent) {return collection;}

        father = $(parent);

        for (i = 0, len = collection.length; i < len; i++) {
            item = collection[i];

            if (isParent(father, item)) {
                result.push(item);
            }
        }

        return result;
    };

    /*
     *
     */
    n = exports.n;

    exports.nn = function(name, parent) {
        var result = n(name, parent);

        return result ? result[0] : null;
    };

    exports.t = function(tagName, parent) {
        var p = $(parent || document);

        if (!p) {return null;}

        return p.getElementsByTagName(tagName);
    };

    /*
     *
     */
    t = exports.t;

    exports.tt = function(tagName, parent) {
        var p = $(parent),
            result = t(tagName, p);

        return result ? result[0] : null;
    };

    return exports;
});
