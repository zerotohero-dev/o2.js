/**
 * @module   extend
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-17 00:06:37.854306
 * -->
 *
 * Extension functions.
 */
(function(framework, document) {
    'use strict';

/*    var _         = framework.protecteds;
    var alias     = _.alias;
    var attr      = _.getAttr;
    var construct = _.construct;
    var create    = _.create;
    var def       = _.define;
    var obj       = _.getObject;
    var proto     = _.proto;
    var require   = _.require;*/

    function use() {}

    var getElementsByName = document.getElementsByName;

    /*
     * Aliases
     */
    var $ = use(framework.$);

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
    framework.t = function(tagName, parent) {
        var p = $(parent || document);

        if (!p) {
            return null;
        }

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
    framework.n = function(name, parent) {
        var collection = getElementsByName(name);
        var i = 0;
        var len = 0;
        var isParent = framework.DomHelper.isParent;
        var result = [];
        var item = null;

        if (!parent) {
            return collection;
        }

        var father = framework.$(parent);

        for (i = 0, len = collection.length; i < len; i++) {
            item = collection[i];

            if (isParent(father, item)) {
                result.push(item);
            }
        }

        return result;
    };

    /**
     * @function {static} o2.nn
     *
     * <p>Acts similar to {link o2.n} -- with one exception: The method
     * returns the first matched node, instead of returning a node
     * collection.</p>
     *
     * @param {String} name - the name of the element to search.
     * @param {DOMNode} parent - (optional defaults to <code>document</code>)
     * the parent container, or the id of the parent container, to search.
     *
     * @return the first matched element if found; <code>null</code>
     * otherwise.
     */
    framework.nn = function(name, parent) {
        var result = framework.n(name, parent);

        return result ? result[0] : null;
    };

    /**
     * @function {static} o2.tt
     *
     * <p>Acts similar to {link o2.t} -- with one exception: The method
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
    framework.tt = function(tagName, parent) {
        parent = framework.$(parent);

        var result = framework.t(tagName, parent);

        return result ? result[0] : null;
    };
}(this.o2, this.document));
