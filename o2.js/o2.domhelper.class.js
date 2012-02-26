/**
 * @module   domhelper.class
 * @requires core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-17 09:04:50.933695
 * -->
 *
 * <p>A utility package to add/remove/modify <code>class</code>es.</p>
 */
(function(framework) {
    'use strict';

/*    var _         = framework.protecteds;
    var alias     = _.alias;
    var attr      = _.getAttr;
    var construct = _.construct;
    var create    = _.create;
    var def       = _.define;
    var obj       = _.getObject;
    var proto     = _.proto;
    var require   = _.require;
*/

function define() {

}

function use() {

}

function require() {

}

function hasClass() {

}

function addClass() {

}

function removeClass() {

}

    var kObjectName = 'DomHelper';

    var me = define(framework, kObjectName);

    /*
     * Aliases
     */
    var $ = use(framework.$);
    var concat = use(framework.StringHelper.concat);

    /*
     * Common Constants
     */
    var kBlank = ' ';
    var kBeginOrBlank = '(\\s|^)';
    var kEndOrBlank = '(\\s|$)';
    var kUndefined = 'undefined';

    /**
     * @function {static} o2.DomHelper.createClassNameRegExp
     *
     * <p>Creates a regular expression that will match a given
     * <strong>CSS</strong> class name.</p>
     *
     * @param {String} c - The name of the class.
     *
     * @returns a <code>RegExp</code> that matches the given class name.
     */
    me.createClassNameRegExp = function(c) {
        return new RegExp(concat(kBeginOrBlank, c, kEndOrBlank));
    };

    var createClassNameRegExp = require('DomHelper', 'createClassNameRegExp');

    /**
     * @function {static} o2.DomHelper.hasClass
     *
     * <p>Checks whether an <strong>element</strong> has the given
     * <strong>className</strong>.</p>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to test.
     *
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
     */
    me.hasClass = function(el, c) {
        el = $(el);

        if (!el) {
            return false;
        }

        return createClassNameRegExp(c).test(el.className);
    };

    /**
     * @function {static} o2.DomHelper.addClass
     *
     * <p>Add a class to the given node.</p>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to add.
     */
    me.addClass = function(el, c) {
        el = $(el);

        if (!el) {
            return;
        }

        if (hasClass(el, c)) {
            return;
        }

        el.className += concat(kBlank, c);
    };

    /**
     * @function {static} o2.DomHelper.removeClass
     *
     * <p>Removes a <strong>class</strong> name from the given node.</p>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the className to remove.
     */
    me.removeClass = function(el, c) {
        el = $(el);

        if (!el) {
            return;
        }

        if (!hasClass(el, c)) {
            return;
        }

        el.className = el.className.replace(createClassNameRegExp(c), kBlank);
    };

    /**
     * @function {static} o2.DomHelper.toggleClass
     *
     * <p>Toggles the <strong>CSS<strong> <code>className</code> of a given
     * element.</p>
     *
     * @param {Object} el - the <strong>DOM</strong> element to toggle or its
     * <code>String</code> id.
     * @param {String} c - the class name to toggle.
     * @param {Boolean} state - (Optional, defaults to <code>undefined</code>),
     * if <code>true</code> add class <strong>c</strong> to
     * <strong>el</strong>, if <code>true</code> removes class
     * <strong>c</strong> from <strong>el</strong>. If the parameter is not
     * given, the class is toggled (i.e. added if the class does not exist,
     * and removed if the class exists).
     */
    me.toggleClass = function(el, c, state) {
        if (typeof state !== kUndefined) {
            if (state) {
                addClass(el, c);

                return;
            }

            removeClass(el, c);

            return;
        }

        if (hasClass(el, c)) {
            removeClass(el, c);

            return;
        }

        addClass(el, c);
    };
}(this.o2, this));
