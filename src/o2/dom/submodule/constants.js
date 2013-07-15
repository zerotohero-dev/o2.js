/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   dom.constants
     *
     * @requires core
     *
     * <p>Constant definitions for {@link o2.Dom}.</p>
     */
    fp.ensure(
        'dom.constants',
    [
        'core'
    ]);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Dom',

        /**
         * @class {static} o2.Dom
         *
         * A cross-browser <strong>DOM</strong> manipulation helper.
         */
        me = create(kModuleName);

    /**
     * @struct {static} o2.Dom.nodeType
     *
     * <code>DOM</code> node types.
     */
    exports.nodeType = def(me, 'nodeType', {

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ELEMENT - element node.
         */
        ELEMENT : 1,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ATTRIBUTE - atribute node.
         */
        ATTRIBUTE : 2,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.TEXT - text node.
         */
        TEXT : 3,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.CDATA - CDATA section.
         */
        CDATA : 4,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ENTITY_REFERENCE - entity reference.
         */
        ENTITY_REFERENCE : 5,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.ENTITY - entity.
         */
        ENTITY : 6,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.PROCESSING_INSTRUCTION - processing
         * instruction.
         */
        PROCESSING_INSTRUCTION : 7,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.COMMENT - comment node.
         */
        COMMENT : 8,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.DOCUMENT - document (root) node.
         */
        DOCUMENT : 9,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.DOCUMENT_TYPE - DTD node.
         */
        DOCUMENT_TYPE : 10,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.DOCUMENT_FRAGMENT - document fragment.
         */
        DOCUMENT_FRAGMENT : 11,

        /**
         * @property {static const Integer}
         * o2.Dom.nodeType.NOTATION - notation.
         */
        NOTATION : 12
    });
}(this.o2, this.o2.protecteds));

