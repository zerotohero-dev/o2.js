/**
 * @module   domhelper.constants
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-28 18:35:25.711423
 * -->
 *
 * <p>Constant definitions for {@link o2.DomHelper}.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');


    /**
     * @class {static} o2.DomHelper
     *
     * A cross-browser <strong>DOM</strong> manipulation helper.
     */
    var me = create('DomHelper');

    /**
     * @struct {static} o2.DomHelper.nodeType
     *
     * <code>DOM</code> node types.
     */
    def(me, 'nodeType', {

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.ELEMENT - element node.
         */
        ELEMENT : 1,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.ATTRIBUTE - atribute node.
         */
        ATTRIBUTE : 2,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.TEXT - text node.
         */
        TEXT : 3,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.CDATA - CDATA section.
         */
        CDATA : 4,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.ENTITY_REFERENCE - entity reference.
         */
        ENTITY_REFERENCE : 5,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.ENTITY - entity.
         */
        ENTITY : 6,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.PROCESSING_INSTRUCTION - processing
         * instruction.
         */
        PROCESSING_INSTRUCTION : 7,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.COMMENT - comment node.
         */
        COMMENT : 8,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.DOCUMENT - document (root) node.
         */
        DOCUMENT : 9,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.DOCUMENT_TYPE - DTD node.
         */
        DOCUMENT_TYPE : 10,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.DOCUMENT_FRAGMENT - document fragment.
         */
        DOCUMENT_FRAGMENT : 11,

        /**
         * @property {static const Integer}
         * o2.DomHelper.nodeType.NOTATION - notation.
         */
        NOTATION : 12
    });
}(this.o2));
