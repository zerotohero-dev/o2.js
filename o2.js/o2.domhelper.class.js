/*global window, o2*/

/*
 * Copyright © by Volkan Özçelik - http://o2js.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if(!o2.DomHelper) {
    o2.DomHelper = {};
}

//VMERGE: merge this file with fw.

/**
 * @module o2.domhelper.class
 * @requires o2
 * @requires o2.stringhelper.core
 *
 * <p>A utility package to add/remove/modify <code>class</code>es.</p>
 */
( function(o2, window, UNDEFINED) {

    var me = o2.DomHelper;

    /*
     *
     */
    function createClassNameRegExp(c) {

        return new RegExp(['(\\s|^)', c, '(\\s|$)'].join(''));

    }

    /*
     *
     */
    function filterChildren(children, regClassName) {

        var child = null;
        var result = [];

        for(var i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if(regClassName.test(child.className)) {
                result.push(children[i]);
            }
        }

        return result;

    }

    /**
     * @function {static} o2.DomHelper.hasClass
     *
     * <p>Checks whether an element has the given className.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
     */
    me.hasClass = function(el, c) {

        return createClassNameRegExp(c).test(el.className);

    };

    /**
     * @function {static} o2.DomHelper.addClass
     *
     * <p>Add a class to the given node.</p>
     *
     * @param {DomNode} el - the element to add.
     * @param {String} c - the className to add.
     */
    me.addClass = function(el, c) {

        if(me.hasClass(el, c)) {
            return;
        }

        el.className += [' ', c].join('');

    };

    /**
     * @function {static} o2.DomHelper.removeClass
     *
     * <p>Removes a class from the given node.</p>
     *
     * @param {DomNode} el - the element to remove the class of.
     * @param {String} c - the className to remove.
     */
    me.removeClass = function(el, c) {

        if(!me.hasClass(el, c)) {
            return;
        }

        el.className = el.className.replace(createClassNameRegExp(c), ' ');

    };

    /**
     * @function {static} o2.DomHelper.getChildrenByClassName
     *
     * <p>Gets immediate descendants, with a given class name, of the
     * element.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return the immediate descendants with the given class name.
     */
    me.getChildrenByClassName = function(el, c) {

        if(!el) {
            return null;
        }

        //NOTE: IE7+ supports child selector ( > ), IE8+ supports
        // querySelectorAll

        if(el.querySelectorAll) {
            me.getChildrenByClassName = function(el, c) {

                var children = el.childNodes;

                if(!el) {
                    return null;
                }

                if(!el.id) {
                    el.id = ['o2', o2.StringHelper.generateGuid()].join('');
                }

                return el.querySelectorAll(['#', el.id, ' > .', c].join(''));

            };

            return me.getChildrenByClassName(el, c);
        }

        me.getChildrenByClassName = function(el, c) {

            if(!el) {
                return null;
            }

            var children = el.childNodes;

            return filterChildren(children, createClassNameRegExp(c));

        };

        return me.getChildrenByClassName(el, c);

    };

    /**
     * @function {static} o2.DomHelper.getElementsByClassName
     *
     * <p>Gets all children, with a given class name, of the element.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return all of the elements with the given class name.
     */
    me.getElementsByClassName = function(el, c) {

        if(!el) {
            return null;
        }

        if(el.querySelectorAll) {
            me.getElementsByClassName = function(el, c) {

                if(!el) {
                    return null;
                }

                var children = el.getElementsByTagName('*');

                return el.querySelectorAll(['.', c].join(''));

            };

            return me.getElementsByClassName(el, c);
        }

        me.getElementsByClassName = function(el, c) {

            if(!el) {
                return null;
            }

            var children = el.getElementsByTagName('*');

            return filterChildren(children, createClassNameRegExp(c));

        };

        return me.getElementsByClassName(el, c);

    };

}(o2, this));
