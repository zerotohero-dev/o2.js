/**
 * @module   method.event
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-04-01 14:46:49.973159
 * -->
 *
 * <p>Event-handling-related helper methods.</p>
 */
(function(framework, undefined) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'Method';

    /*
     * Method (event)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var slice = attr(Array.prototype, 'slice');

    /**
    * @function {static} o2.Method.bindAsEventListener
    *
    * <p>Binds the given function as an event listener, ensuring that
    * the first parameter is always the event object.</p>
    *
    * <p>This method is generally used in conjunction with
    * {@link o2.EventHandler.addEventListener}.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var $ = o2.$;
    * var listen = o2.EventHandler.addEventListener;
    * var getTarget = o2.EventHandler.getTarget;
    * var bind = o2.Method.bindAsEventListener;
    *
    * var context = {id : 1, description : 'hello world.'};
    * var kClick = 'click';
    * var menu = $('mainMenu');
    *
    * function test(evt, a, b) {
    *      console.log( getTarget(evt) );
    *      console.log( this.id );
    *      console.log( this.description );
    *      console.log( a );
    *      console.log( b );
    * }
    *
    * var delegate = bind(context, test, 20, 30);
    * listen(menu, kClick, delegate);
    *
    * // When mainMenu element is clicked the output will be as follows:
    * //
    * // [DOM Element]
    * // 1
    * // hello world
    * // 20
    * // 30
    * </pre>
    *
    * @return the bound <code>Function</code>.
    *
    * @see o2.EventHandler.addEventListener
    */
    def(me, 'bindAsEventListener', function() {
        var args    = slice.call(arguments);
        var context = args.shift();
        var fn      = args.shift();

        return function(e) {
            args.unshift(e);
            return fn.apply(context, args);
        };
    });
}(this.o2));
