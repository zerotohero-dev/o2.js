/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/*global o2, Demo*/
( function(o2, window, UNDEFINED) {

    /*
     * Aliases.
     */
    var add = o2.Unit.add;
    var run = o2.Unit.run;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var assertEqual = o2.Unit.assertEqual;
    var assert = o2.Unit.assert;

    /**
     *
     */
    var Suite = {

        /**
         *
         */
        init : function() {

            add('o2.DomHelper.isChild SHOULD return false if parent of child node is not a DOM node.');

            add('o2.DomHelper.isChild SHOULD return false if parent and child are the same nodes.');

            add('o2.DomHelper.isChild SHOULD return true if child is the child of parent.');

            add('o2.DomHelper.isChild SHOULD work equally well with string IDs for parent and child nodes');

            add('o2.DomHelper.create SHOULD create a DOM node of given type.');

            add('o2.DomHelper.removeNode SHOULD remove a node from the DOM tree.');

            add('o2.DomHelper.removeNode SHOULD work equally well with string IDs.');

            add('o2.DomHelper.removeEmptyTextNodes SHOULD remove all empty text nodes of an element recursively.');
            
            add('o2.DomHelper.removeEmptyTextNodes SHOULD remove only first-level empty text nodes of an element.');
            
            add('o2.DomHelper.removeEmptyTextNodes SHOULD work equally well with a string ID.');

            add('o2.DomHelper.removeEmptyTextNodes SHOULD work equally well with a string ID');
            
            add('o2.DomHelper.removeChildren SHOULD empty an element.');
             
            add('o2.DomHelper.empty SHOULD work the same as o2.DomHelper.removeChildren.');

            add('o2.DomHelper.insertAfter SHOULD insert the new node after the ref node.');
            
            add('o2.DomHelper.insertAfter SHOULD work equally well with string IDs.');
            
            add('o2.DomHelper.insertBefore SHOULD insert the new node before the ref node.');
            
            add('o2.DomHelper.insertBefore SHOULD work equally well with string IDs.');
            
            add('o2.DomHelper.createElement SHOULD create an element with given attributes');
            
            add('o2.DomHelper.prepend SHOULD prepend child to the top of parent.');
            
            add('o2.DomHelper.prepent SHOULD work equally well with string IDs.');
            
            add('o2.DomHelper.append SHOULD add child to the end of parent.');
            
            add('o2.DomHelper.append SHOULD work equally well with string IDs.');
            
            add('o2.DomHelper.getOffset SHOULD get the top-left position of an element.');
            
            add('o2.DomHelper.getOffset SHOULD work equally well with string IDs.');
            
            add('o2.DomHelper.getAttribute SHOULD get an attribute of an element');
            
            add('o2.DomHelper.getAttribute SHOULD work equally well with string IDs.');

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
