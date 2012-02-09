/**
 * @module   domhelper.class
 * @requires domhelper.core
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 09:29:00.684095
 * -->
 *
 * <p>A utility package to add/remove/modify <code>class</code>es.</p>
 */
(function(framework) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = use(framework.DomHelper);
    var $ = use(framework.$);
    var concat = use(framework.StringHelper.concat);

    /*
     * Common Constants
     */
    var kBlank = ' ';
    var kBeginOrBlank = '(\\s|^)';
    var kEndOrBlank = '(\\s|$)';

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

    /**
     * @function {static} o2.DomHelper.hasClass
     *
     * <p>Checks whether an <strong>element</strong> has the given
     * <strong>className</strong>.</p>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to test.
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
     */
    me.hasClass = function(el, c) {
        el = $(el);

        if (!el) {
            return false;
        }

        return me.createClassNameRegExp(c).test(el.className);
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

        if (me.hasClass(el, c)) {
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

        if (!me.hasClass(el, c)) {
            return;
        }

        el.className = el.className.replace(me.createClassNameRegExp(c),
            kBlank);
    };
}(this.o2, this));
