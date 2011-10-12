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

            add('o2.Ajax.post SHOULD receive a proper response if the request is on the same domain.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD return an object.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD have an "complete" flag, set to true when a response is received.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD be able to send cross-domain requests, if an options header is set.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD clean up initial XHR object, when request is complete.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD handle exceptional cases.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD handle HTTP errors.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD be able to send and receive UTF-8 data without loss.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.post SHOULD be able to send sync requests.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            /*-----------*/

            add('o2.Ajax.get SHOULD receive a proper response if the request is on the same domain.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD return an object.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD have an "complete" flag, set to true when a response is received.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD be able to send cross-domain requests, if an options header is set.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD clean up initial XHR object, when request is complete.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD handle exceptional cases.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD handle HTTP errors.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD be able to send and receive UTF-8 data without loss.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            add('o2.Ajax.get SHOULD be able to send sync requests.', {
                count : 1,
                test : function() {

                    var me = this;

                    assert(me, false, 'I pass.');

                }

            });

            /*-------------------*/

            add('o2.Ajax.createXhr SHOULD return an object.', {
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
