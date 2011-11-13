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

            add('o2.DomHelper.getParent SHOULD get the parent with a given node name including self.');
            add('o2.DomHelper.getParent SHOULD get the parent with a given node name excluding self.');
            add('o2.DomHelper.getParent SHOULD return null if there is no such parent');
            add('o2.DomHelper.getParent SHOULD work equally well with string IDs');
            add('o2.DomHelper.getParentByAttribute SHOULD find parent by a given attribute, including self.');
            add('o2.DomHelper.getParentByAttribute SHOULD find parent by given attribute, including self.');
            add('o2.DomHelper.getParentByAttribute SHOULD work with risky attributes such as "class".');
            add('o2.DomHelper.getParentByAttribute SHOULD return null if nothing found');
            add('o2.DomHelper.getParentByAttribute SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getParentWithAttribute SHOULD find parent that has a given attribute, including self.');
            add('o2.DomHelper.getParentWithAttribute SHOULD find parent that has a given attribute, including self.');
            add('o2.DomHelper.getParentWithAttribute SHOULD work with risky attributes such as "class".');
            add('o2.DomHelper.getParentWithAttribute SHOULD return null if nothing found');
            add('o2.DomHelper.getParentWithAttribute SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getParentById SHOULD find parent by a given id, including self.');
            add('o2.DomHelper.getParentById SHOULD find parent by given id, including self.');
            add('o2.DomHelper.getParentById SHOULD return null if nothing found');
            add('o2.DomHelper.getParentById SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getParentWithId SHOULD find parent that has an id, including self.');
            add('o2.DomHelper.getParentWithId SHOULD find parent that has an id, including self.');
            add('o2.DomHelper.getParentWithId SHOULD return null if nothing found');
            add('o2.DomHelper.getParentWithId SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getFirstChild SHOULD get the first element node child of a given node.');
            add('o2.DomHelper.getFirstChild SHOULD get the first element node child, with a given node name, of a given node.');
            add('o2.DomHelper.getFirstChild SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getFirstChildById SHOULD get the first child by id');
            add('o2.DomHelper.getFirstChildById SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getFirstChildWithId SHOULD get the first child that has an id.');
            add('o2.DomHelper.getFirstChildWithId SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getLastChild SHOULD get the last element node child of a given node.');
            add('o2.DomHelper.getLastChild SHOULD get the last element node child, with a given node name, of a given node.');
            add('o2.DomHelper.getLastChild SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getLastChildById SHOULD get the last child by id');
            add('o2.DomHelper.getLastChildById SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getLastChildWithId SHOULD get the last child that has an id.');
            add('o2.DomHelper.getLastChildWithId SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getChildren SHOULD return non-textual immediate children of an element.');
            add('o2.DomHelper.getChildren SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getChildrenByClassName SHOULD get the immediate children with a given class name');
            add('o2.DomHelper.getChildrenByClassName SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getPrevious SHOULD get the previous sibling');
            add('o2.DomHelper.getPrevious SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getPreviousById SHOULD get the first previous sibling by a given ID.');
            add('o2.DomHelper.getPreviousById SHOULD work equally well with string Ids.');
            add('o2.DomHelper.getPreviousWithId SHOULD get the first previous sibling that has an ID.');
            add('o2.DomHelper.getPreviousWithId SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getNext SHOULD get the next sibling');
            add('o2.DomHelper.getNext SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getNextById SHOULD get the first next sibling by a given ID.');
            add('o2.DomHelper.getNextById SHOULD work equally well with string Ids.');
            add('o2.DomHelper.getNextWithId SHOULD get the first next sibling that has an ID.');
            add('o2.DomHelper.getNextWithId SHOULD work equally well with string IDs.');
            add('o2.DomHelper.getElementsByClassName SHOULD get all the elements within the node, by a given class name.');

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
