/*global o2 */

/**
 * @module domhelper.class
 * @requires stringhelper.core
 * @requires domhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A utility package to add/remove/modify <code>class</code>es.</p>
 */
( function(framework, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var me = framework.DomHelper;
    var myName = me.name;
    var generateGuid = me.StringHelper.generateGuid;
    var $ = me.$;

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
     * @function {static} DomHelper.hasClass
     *
     * <p>Checks whether an element has the given className.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
     */
    me.hasClass = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return false;
        }

        return createClassNameRegExp(c).test(el.className);

    };

    /**
     * @function {static} DomHelper.addClass
     *
     * <p>Add a class to the given node.</p>
     *
     * @param {DomNode} el - the element to add.
     * @param {String} c - the className to add.
     */
    me.addClass = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return;
        }

        if(me.hasClass(el, c)) {

            return;
        }

        el.className += [' ', c].join('');

    };

    /**
     * @function {static} DomHelper.removeClass
     *
     * <p>Removes a class from the given node.</p>
     *
     * @param {DomNode} el - the element to remove the class of.
     * @param {String} c - the className to remove.
     */
    me.removeClass = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return;
        }

        if(!me.hasClass(el, c)) {

            return;
        }

        el.className = el.className.replace(createClassNameRegExp(c), ' ');

    };

    /**
     * @function {static} DomHelper.getChildrenByClassName
     *
     * <p>Gets immediate descendants, with a given class name, of the
     * element.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return the immediate descendants with the given class name.
     */
    //TODO: add space delimited multiple classes.
    me.getChildrenByClassName = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return null;
        }

        //NOTE: IE7+ supports child selector ( > ), IE8+ supports
        // querySelectorAll

        if(el.querySelectorAll) {
            me.getChildrenByClassName = function(el, c) {

                //
                el = $(el);

                if(!el) {

                    return null;
                }

                var children = el.childNodes;

                if(!el.id) {
                    el.id = [myName, generateGuid()].join('');
                }

                return el.querySelectorAll(['#', el.id, ' > .', c].join(''));

            };

            return me.getChildrenByClassName(el, c);
        }

        me.getChildrenByClassName = function(el, c) {

            //
            el = $(el);

            if(!el) {

                return null;
            }

            var children = el.childNodes;

            return filterChildren(children, createClassNameRegExp(c));

        };

        return me.getChildrenByClassName(el, c);

    };

    /**
     * @function {static} DomHelper.getElementsByClassName
     *
     * <p>Gets all children, with a given class name, of the element.</p>
     *
     * @param {DomNode} el - the element to test.
     * @param {String} c - the className to test.
     * @return all of the elements with the given class name.
     */
    //TODO: add space delimeted multiple classes
    me.getElementsByClassName = function(el, c) {

        //
        el = $(el);

        if(!el) {

            return null;
        }

        if(el.querySelectorAll) {
            me.getElementsByClassName = function(el, c) {

                //
                el = $(el);

                if(!el) {

                    return null;
                }

                var children = el.getElementsByTagName('*');

                return el.querySelectorAll(['.', c].join(''));

            };

            return me.getElementsByClassName(el, c);
        }

        me.getElementsByClassName = function(el, c) {

            //
            el = $(el);

            if(!el) {

                return null;
            }

            var children = el.getElementsByTagName('*');

            return filterChildren(children, createClassNameRegExp(c));

        };

        return me.getElementsByClassName(el, c);

    };

}(o2, this));
