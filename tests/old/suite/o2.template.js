/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/*global o2, Demo*/
(function(o2, window, UNDEFINED) {

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
            add('o2.Template.parse SHOULD parse a simple template.', {
               count : 1,
               test : function() {
                    var me = this;

                    var template = [
                        '<h1>', 'Some Title', '</h1>',
                        '<p>' , 'Some Text' , '</p>',
                        '<ul>',
                        '<li>', 'item 1'    , '</li>',
                        '<li>', 'item 2'    , '</li>',
                        '<li>', 'item 3'    , '</li>',
                        '</ul>'
                    ];

                    var result = o2.TemplateHelper.parse({}, template);
                    var exptectedResult =
                        '<h1>', 'Some Title', '</h1>',
                        '<p>' , 'Some Text' , '</p>',
                        '<ul>',
                        '<li>', 'item 1'    , '</li>',
                        '<li>', 'item 2'    , '</li>',
                        '<li>', 'item 3'    , '</li>',
                        '</ul>'
               }
            });

            add('o2.Template.parse SHOULD parse a template with variables.', {
               count : 1,
               test : function() {
                    var me = this;
               }
            });

            add('o2.Template.parse SHOULD iteratively parse a template.', {
               count : 1,
               test : function() {
                    var me = this;
               }
            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(o2, this));
