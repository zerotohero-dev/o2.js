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

            add('o2.CollectionHelper.merge SHOULD merge two objects, passing deeper object by ref.');

            add('o2.CollectionHelper.merge SHOULD merge two Arrays, passing deeper Arrays by ref.');

            add('o2.CollectionHelper.merge SHOULD merge two objects, by value, recursively.');

            add('o2.CollectionHelper.merge SHOULD merge two Arrays, by value, recursively.');

            add('o2.CollectionHelper.merge SHOULD merge an Array and an object, passing deeper members by ref.');

            add('o2.CollectionHelper.merge SHOULD merge an object and an Array, passing deeper memebers by ref.');

            add('o2.CollectionHelper.merge SHOULD merge and Array and an object recursively.');

            add('o2.CollectionHelper.merge SHOULD merge an object and an Array recursively.');

            add('o2.CollectionHelper.indexOf SHOULD give the first index of an element in an Array.');

            add('o2.CollectionHelper.indexOf SHOULD give the first index of an element in an object.');

            add('o2.CollectionHelper.contains SHOULD check whether an Array contains an element.');

            add('o2.CollectionHelper.contains SHOULD check whether an object contains a memeber.');

            add('o2.CollectionHelper.copy SHOULD be able to shallow copy an object.');

            add('o2.CollectionHelper.copy SHOULD be able to shallow copy an Array.');

            add('o2.CollectionHelper.copy SHOULD be able to deep copy an object.');

            add('o2.CollectionHelper.copy SHOULD be able to deep copy an Array.');

            add('o2.CollectionHelper.clear SHOULD remove all elements of an object.');

            add('o2.CollectionHelper.clear SHOULD empty an Array.');

            add('o2.CollectionHelper.removeElementByValue SHOULD do a shallow removal of an element matching a value.');

            add('o2.CollectionHelper.removeElementByValue SHOULD do a nested removal of an element matching a value.');

            add('o2.CollectionHelper.getFirst SHOULD get the first element of an Array.');

            add('o2.CollectionHelper.getFirst SHOULD get the first element of an object.');

            add('o2.CollectionHelper.getLast SHOULD get the last element of an Array.');

            add('o2.CollectionHelper.getLast SHOULD get the last element of an object.');

            add('o2.CollectionHelper.compact SHOULD do a shallow removal of null and undefined values from an Array.');

            add('o2.CollectionHelper.compact SHOULD do a shallow removal of null and undefined values from an object.');

            add('o2.CollectionHelper.compact SHOULD do a deep removal of null and undefined values from an Array.');

            add('o2.CollectionHelper.compact SHOULD do a deep removal of null and undefined values from an object.');

            add('dummy test case', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
