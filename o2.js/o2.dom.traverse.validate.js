/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
//TODO: add header and documentation
(function(framework, fp, document, UNDEFINED) {
    'use strict';

    fp.ensure(
       'dom.traverse.validate',
    [
        'core'
    ]);

    var attr    = fp.getAttr,
        alias   = attr(fp, 'alias'),
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Dom',

        /*
         * Dom (traverse.validate)
         */
        me = create(kModuleName);

    /**
     * @function {static} o2.Dom.isChild
     *
     * <p>Checks whether <strong>elm</strong> is the child of
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isChild = o2.Dom.isChild('child', 'parent');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a child of
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isChild = def(me, 'isChild', function(elm, ref) {
        if (!ref) {return false;}

        return contains(getChildren(ref), elm);
    });

    /**
     * @function {static} o2.Dom.isNext
     *
     * <p>Checks whether <strong>elm</strong> is a sibling after
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isNext = o2.Dom.isNext('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a sibling after
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isNext = def(me, 'isNext', function(elm, ref) {
        if (!ref) {return false;}

        return contains(getNextAll(ref), elm);
    });

    /**
     * @function {static} o2.Dom.isParent
     *
     * <p>Checks whether <strong>elm</strong> is a parent of
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isParent = o2.Dom.isParent('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a parent of
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isParent = def(me, 'isParent', function(elm, ref) {
        if (!ref) {return false;}

        return contains(getParents(ref), elm);
    });

    /*
     *
     */
    isParent = require(kModuleName, 'isParent');

    /**
     * @function {static} o2.Dom.isParentOrSelf
     *
     * <p>Checks whether <strong>elm</strong> is parent of
     * <strong>ref</strong>, or it's the <strong>ref</strong> itself.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isParent = o2.Dom.isParentOrSelf('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a parent of
     * <strong>ref</strong>, or the node itself; <code>false</code> otherwise.
     */
    exports.isParentOrSelf = def(me, 'isParentOrSelf', function(elm, ref) {
        if (!ref       ) {return false;}
        if (ref === elm) {return true;}

        return isParent(elm, ref);
    });

    /**
     * @function {static} o2.Dom.isPrev
     *
     * <p>Checks whether <strong>elm</strong> is a sibling before
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isParent = o2.Dom.isPrev('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a sibling before
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isPrev = def(me, 'isPrev', function(elm, ref) {
        if (!ref) {return false;}

        return contains(getPrevAll(ref), elm);
    });

    /**
     * @function {static} o2.Dom.isSibling
     *
     * <p>Checks whether <strong>elm</strong> is a sibling of
     * <strong>ref</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isSibling = o2.Dom.isSibling('itemId', 'refId');
     * </pre>
     *
     * @param {Object} elm - the source element, or a <code>String</code>
     * id of it.
     * @param {Object} ref - the reference element, or a <code>String</code>
     * id of it.
     *
     * @return <code>true</code> if <strong>elm</strong> is a sibling of
     * <strong>ref</strong>; <code>false</code> otherwise.
     */
    exports.isSibling = def(me, 'isSibling', function(elm, ref) {
        if (!ref) {return false;}

        return contains(getSiblings(ref), elm);
    });

    //TODO: add documentation to the stuff below too.
    //TODO: ensure that these below are referenced directly via Dom, not Dom.protecteds.
    /*
     * Does the node have a given `attribute = value` pair?
     */
    exports.isAttributeEquals = def(me, 'isAttributeEquals',
                function(node, attribute, value) {
        return getAttribute(node, attribute) === value;
    });

    /*
     * Does the node have an id?
     */
    exports.hasIdAttribute = def(me, 'hasIdAttribute', function(node) {
        return node && !!node.id;
    });

    /*
     * Does the node have a class?
     */
    exports.hasClassAttribute = def(me, 'hasClassAttribute', function(node) {
        return node && !!node.className;
    });

    /*
     * Does the node have a given attribute.
     */
    exports.hasAttribute = def(me, 'hasAttribute', function(node, attribute) {
        return getAttribute(node, attribute) !== UNDEFINED;
    });

    /*
     * Does the node hava that class?
     */
    exports.hasClassName = def(me, 'hasClassName', function(node, name) {
        return node && node.className.indexOf(name) > -1;
    });
}(this.o2, this.o2.protecteds, this.document));
