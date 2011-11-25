/**
 * <b>o2.js</b>
 * @project o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 * @version 0.23.#1322119982#
 * @author Volkan Özçelik
 * @description o2.js - a Coherent Solution to Your JavaScript Dilemma ;)
 */

/**
 * Root namespace &ndash; magic goes here ;)
 * @namespace o2
 */
this.o2 = {};

/**
 *
 */
(function(framework, window, document) {
    'use strict';

    /*
     * Aliases.
     */
    var me = framework;

    var config = {
        constants : {
            errorMessage : {
                OBJECT_NOT_DEFINED : ' : Object is not defined.'
            }
        }
    };

    /*
     * Common string constants.
     */
    var kString = 'string';
    var kObjectNotDefined = config.constants.errorMessage.OBJECT_NOT_DEFINED;
    var kLoad = 'load';

    /**
     * @function {static} o2.nill
     *
     * <p>An empty function.</p>
     */
    me.nill = function() {
    };

    /**
     * @property {String} o2.name
     *
     * <p>Short name of the framework, to be used in
     * prefixes, class names etc.</p>
     */
    me.name = 'o2js';

    /**
     * @property {String} o2.url
     *
     * <p>URL of the project.</p>
     */
    me.url = 'http://o2js.com';

    /**
     * @property {String} o2.longName
     *
     * <p>Full name of the project.</p>
     */
    me.longName = 'o2.js JavaScript Framework';

    /**
     * @property {String} o2.version
     *
     * <p>Project version.</p>
     */
    me.version = '0.23';

    /**
     * @property {String} o2.build
     *
     * <p>Project build number.</p>
     */
    me.build = '#1322119982#';

    /**
     * @function {static} o2.$
     *
     * <p>An alias for <code>document.getElementById</code>.</p>
     *
     * @param {Object} obj - the id to check.
     *
     * @return document.getElementById(obj) if obj is a <code>String</code>;
     * obj itself otherwise.
     *
     * @throws exception - if obj is <code>undefined</code>.
     */
    me.$ = function(obj) {
        if (obj === undefined) {
            throw [me.name, kObjectNotDefined].join('');
        }

        if (typeof obj === kString) {
            return document.getElementById(obj);
        }

        return obj || null;
    };

    /**
     * @function {static} o2.t
     *
     * <p>A <code>getElementsByTagName</code> wrapper.</p>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    me.t = function(tagName, parent) {
        if (!parent) {
            parent = document;
        }

        parent = framework.$(parent);

        var p = parent || document;

        return p.getElementsByTagName(tagName);
    };


    /**
     * @function {static} o2.n
     *
     * <p>A <code>getElementsByName</code> wrapper.</p>
     *
     * @param {String} tagName - the name of the form item to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return a collection of matching elements.
     */
    me.n = function(name, parent) {
        var collection = document.getElementsByName(name);
        var i = 0;
        var len = 0;
        var isParent = me.DomHelper.isParent;
        var result = [];
        var item = null;

        if (!parent) {
            return collection;
        }

        for (i = 0, len = collection.length; i < len; i++) {
            item = collection[i];

            if (isParent(parent, item)) {
                result.push(item);
            }
        }

        return result;
    };

    /**
     * @function {static} o2.tt
     *
     * <p>Acts similar to {link t} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * @param {String} tagName - the name of the tag to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    me.tt = function(tagName, parent) {
        parent = framework.$(parent);

        var result = framework.t(tagName, parent);

        return result ? result[0] : null;
    };

    /**
     * @function {static} o2.ready
     *
     * <p>An alias for <code>DomHelper.ready</code>.</p>
     *
     * @param {Function} callback - The callback to execute when DOM is
     * ready.
     */
    me.ready = function(callback) {
        framework.DomHelper.ready(callback);
    };

    /**
     * @function {static} o2.load
     *
     * <p>An alias for <code>EventHandler.addEventListener(window, 'load',
     * callback)</code>.</p>
     *
     * @param {Function} callback - The callback to execute when window is
     * loaded.
     */
    me.load = function(callback) {
        framework.EventHandler.addEventListener(window, kLoad, callback);
    };
}(this.o2, this, this.document));
