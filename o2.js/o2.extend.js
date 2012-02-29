/**
 * @module   extend
 * @requires core
 * @requires domhelper.traverse
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-28 21:15:11.004055
 * -->
 *
 * Extension functions.
 */
(function(framework, document) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');
    var root      = attr(_, 'getRoot');

    /*
     * framework (extend)
     */
    var me = root();

    /*
     * Aliases
     */

    var $ = require('$');

    var isParent = require('DomHelper', 'isParent');

    var getElementsByName = attr(document, 'getElementsByName');

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
    def(me, 'n', function(name, parent) {
        var collection = getElementsByName(name);
        var i = 0;
        var len = 0;
        var result = [];
        var item = null;

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
}(this.o2, this.document));
