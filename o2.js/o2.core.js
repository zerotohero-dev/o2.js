/**
 * <b>o2.js</b>
 *
 *  <p style="border:1px solid;background:#ccc;padding:10px;margin:10px">
 *  This program is distributed under the terms of the MIT license.<br />
 *  Please see the <strong><a
 *  href="https://github.com/v0lkan/o2.js/blob/master/LICENSE"
 *  >LICENSE</a></strong> file for details.<br /><br />
 *  <p>
 *
 * @project     o2.js
 * @version     0.25.a.0001332954994
 * @author      Volkan Özçelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */

/*
 *  lastModified: 2012-03-15 09:48:18.989469
 */

/**
 * @module   core
 * @requires core.meta
 *
 * <p>The core module.</p>
 */
(function(framework, window, document) {
    'use strict';

    var kFrameworkUndefined = 'Please include module "core.meta"!';

    if (framework === undefined) {
        throw kFrameworkUndefined;
    }

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var def       = attr(_, 'define');
    var obj       = attr(_, 'getObject');
    var require   = attr(_, 'require');
    var root      = attr(_, 'getRoot');

    /*
     * o2 (Root Namespace)
     */
    var me     = root();
    var myself = obj(me);

    /*
     * Aliases
     */
    var getElementsByName = attr(document, 'getElementsByName');

    /*
     * Common Constants
     */
    var kEmpty            = '';
    var kLoad             = 'load';
    var kObjectNotDefined = ' : Object is not defined.';
    var kString           = 'string';

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */
    def(me, 'nill', function() {});

    /**
     * @property {readonly String} o2.name
     *
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */
    def(me, 'name', 'o2js');

    /*
     *
     */
    var myName = require('name');

    /**
     * @property {readonly String} o2.url
     *
     * <p>URL of the project.</p>
     */
    def(me, 'url', 'http://o2js.com');

    /**
     * @property {readonly String} o2.longName
     *
     * <p>Full name of the project.</p>
     */
    def(
        me,
        'longName',
        'o2.js - a Coherent Solution to Your JavaScript Dilemma ;)'
    );

    /**
     * @property {readonly String} o2.version
     *
     * <p>Project version.</p>
     */
    def(me, 'version', '0.25.a');

    /**
     * @property {readonly String} o2.build
     *
     * <p>Project build number.</p>
     */
    def(me, 'build', '.0001332954994');

    /**
     * @function {static} o2.$
     *
     * <p>An alias for <code>document.getElementById</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Object} obj - the id to check.
     *
     * @return document.getElementById(obj) if obj is a <code>String</code>;
     * obj itself otherwise.
     *
     * @throws Exception - if obj is <code>undefined</code>.
     */
    def(me, '$', function(obj) {
        if (obj === undefined) {
            throw [myName, kObjectNotDefined].join(kEmpty);
        }

        if (typeof obj === kString) {
            return document.getElementById(obj);
        }

        return obj || null;
    });

    /*
     *
     */
    var $ = require('$');

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>Dom.ready</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */
    def(me, 'ready', function(callback) {
        require('Dom', 'ready')(callback);
    });

    /**
     * @function {static} o2.load
     *
     * <p>An alias for <code>EventHandler.addEventListener(window, 'load',
     * callback)</code>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} callback - The callback to execute when window is
     * loaded.
     */
    def(me, 'load', function(callback) {
        require('EventHandler', 'addEventListener')(window, kLoad, callback);
    });

    /**
     * @function {static} o2.now
     *
     * <p>Returns the unix time (i.e. the number of milliseconds since
     * midnight of January 1, 1970)</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @return the current unix time.
     */
    def(me, 'now', function() {
        return (new Date()).getTime();
    });

    /**
     * @function {static} o2.noConflict
     *
     * <p>Exports the <strong>o2</strong> namespace under a new name, so that
     * it can be used together with an older version of <strong>o2.js</strong>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * [script type="text/javascript" charset="UTF-8" src="o2.0.21.js"][/script]
     * [script type="text/javascript" charset="UTF-8"]
     *     // Now "o2 v.0.21" can be accessed through o3 variable
     *     // (or window.o3).
     *     o2.noConflict('o3');
     * [/script]
     * [script type="text/javascript" charset="UTF-8" src="o2.0.23.js"][/script]
     * </pre>
     *
     * @param {String} newName - the name of the new namespace.
     *
     * @return the new <code>Object</code>.
     */
    def(me, 'noConflict', function(newName) {
        window[newName] = myself;

        return window[newName];
    });

    /**
     * @function {static} o2.n
     *
     * <p>A <code>getElementsByName</code> wrapper.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} tagName - the name of the form item to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    def(me, 'n', function(name, parent) {
        var collection = getElementsByName(name);
        var i = 0;
        var len = 0;
        var result = [];
        var item = null;
        var isParent = require('Dom', 'isParent');

        if (!parent) {
            return collection;
        }

        var father = $(parent);

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
    var n = require('n');

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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} name - the name of the element to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    def(me, 'nn', function(name, parent) {
        var result = n(name, parent);

        return result ? result[0] : null;
    });

    /**
     * @function {static} o2.t
     *
     * <p>A <code>getElementsByTagName</code> wrapper.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    def(me, 't', function(tagName, parent) {
        var p = $(parent || document);

        if (!p) {
            return null;
        }

        return p.getElementsByTagName(tagName);
    });

    /*
     *
     */
    var t = require('t');

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
     * //TODO: add usage example.
     * </pre>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    def(me, 'tt', function(tagName, parent) {
        var p = $(parent);

        var result = t(tagName, p);

        return result ? result[0] : null;
    });
}(this.o2, this, this.document));
