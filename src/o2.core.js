// TODO: add these banners with Grunt!
/**
 *  <b>o2.js</b>
 *
 *  <p style="border:1px solid;background:#ccc;padding:10px;margin:10px">
 *  This program is distributed under the terms of the "MIT License".<br />
 *  Please see the <strong><a
 *  href="https://github.com/v0lkan/o2.js/blob/master/LICENSE"
 *  >LICENSE</a></strong> file for details.<br /><br />
 *  <p>
 *
 * @project     o2.js
 * @version     0.25.a.0001369602378
 * @author      Volkan Özçelik and Community
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */

/**
 * @module   core
 *
 * @requires core.meta
 *
 * <p>The core module.</p>
 */
define([
    'o2.dom.core',
    'o2.event.core'
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
         * # Guid (copied from String.core to remove dependency)
         */

        kGuidRadix = 36,
        kGuidShift = 30,
        kDecimalPoint = '.',

        /*
         * # Common Constants
         */

        kEmpty = '',
        kLoad = 'load',
        kObjectNotDefined = ' : Object is not defined.',
        kString = 'string',

        /*
         * # To be Overridden
         */

        myName,
        t,
        n,
        $;

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */
    exports.nill = function() {};

    /**
     * @property {readonly String} o2.name
     *
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */
    exports.name = 'o2js';

    /*
     *
     */
    myName = exports.name;

    /**
     * @property {readonly String} o2.url
     *
     * <p>URL of the project.</p>
     */
    exports.url = 'http://o2js.com';

    /**
     * @property {readonly String} o2.longName
     *
     * <p>Full name of the project.</p>
     */
    exports.longName = 'o2.js - a Coherent Solution to Your JavaScript Dilemma ;)';

    /**
     * @property {readonly String} o2.appVersion
     *
     * <p>Project version.</p>
     */
    exports.version = '0.25.a';

    /**
     * @property {readonly String} o2.build
     *
     * <p>Project build number.</p>
     */
    exports.build = '.0001369602378';

    /**
     * @function {static} o2.$
     *
     * <p>An alias for <code>document.getElementById</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var domRef = o2.$('elementId');
     * </pre>
     *
     * @param {Object} obj - the id to check.
     *
     * @return document.getElementById(obj) if obj is a <code>String</code>;
     * obj itself otherwise.
     *
     * @throws Exception - if obj is <code>undefined</code>.
     */
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

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>Dom.ready</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.ready(function() {
     *      initializeWidget();
     * });
     * </pre>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */
    exports.ready = function(callback) {
        Dom.ready(callback);
    };

    /**
     * @function {static} o2.load
     *
     * <p>An alias for <code>Event.addEventListener(window, 'load',
     * callback)</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.load(function() {
     *      initializeWidget();
     * });
     * </pre>
     *
     * @param {Function} callback - The callback to execute when window is
     * loaded.
     */
    exports.load = function(callback) {
        Event.addEventListener(window, kLoad, callback);
    };

    /**
     * @function {static} o2.now
     *
     * <p>Returns the Unix time (i.e. the number of milliseconds since
     * midnight of January 1, 1970)</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var unixTimestamp = o2.now();
     * </pre>
     *
     * @return the current Unix time.
     */
    exports.now = function() {
        return (new Date()).getTime();
    };

    /**
     * @function {static} o2.n
     *
     * <p>A <code>getElementsByName</code> wrapper.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var allTags = o2.n('username', 'testForm');
     * </pre>
     *
     * @param {String} tagName - the name of the form item to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    exports.n = def(me, 'n', function(name, parent) {
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
    });

    /*
     *
     */
    n = exports.n;

    /**
     * @function {static} o2.nn
     *
     * <p>Acts similar to {link o2.n} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var firstDiv = o2.nn('userprefs', 'testForm');
     * </pre>
     *
     * @param {String} name - the name of the element to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    exports.nn = function(name, parent) {
        var result = n(name, parent);

        return result ? result[0] : null;
    };

    /**
     * @function {static} o2.t
     *
     * <p>A <code>getElementsByTagName</code> wrapper.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var allNodes = o2.t('*')
     * </pre>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    exports.t = function(tagName, parent) {
        var p = $(parent || document);

        if (!p) {return null;}

        return p.getElementsByTagName(tagName);
    };

    /*
     *
     */
    t = exports.t;

    /**
     * @function {static} o2.tt
     *
     * <p>Acts similar to {link o2.t} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var firstDiv = o2.tt('div', 'MasterContainer');
     * </pre>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    exports.tt = function(tagName, parent) {
        var p = $(parent),
            result = t(tagName, p);

        return result ? result[0] : null;
    };

    return exports;
});
