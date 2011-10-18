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

            add('o2.Cookie.save SHOULD save a cookie with a limited life time.');
            
            add('o2.Cookie.save SHOULD save a session cookie.');
            
            add('o2.Cookie.save SHOULD save cookies for subdomains.');
            
            add('o2.Cookie.save SHOULD save cookies for paths.');
            
            add('o2.Cookie.save SHOULD save secure cookies.');
            
            add('o2.Cookie.read SHOULD read a valid cookie.');
            
            add('o2.Cookie.remove SHOULD delete a cookie with a limited life time.');
            
            add('o2.Cookie.remove SHOULD delete a session cookie.');
            
            add('o2.Cookie.remove SHOULD delete cookies for subdomains.');
            
            add('o2.Cookie.remove SHOULD delete cookies for paths.');
            
            add('o2.Cookie.remove SHOULD delete secure cookies.');

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
