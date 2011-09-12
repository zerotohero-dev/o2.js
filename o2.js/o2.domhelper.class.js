/*global window, o2*/

if(!o2.DomHelper) {
    o2.DomHelper = {};
}

//VMERGE: merge this file with fw.

/**
 * @module o2.domhelper.class
 * @requires o2
 * @requires o2.stringhelper.core
 *
 * <!--
 *  This program is distributed under 
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details. 
 * -->
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
