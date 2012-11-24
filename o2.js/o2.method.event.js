/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp) {
    'use strict';

    /**
     * @module   method.event
     *
     * @requires core
     *
     * <p>Event-handling-related helper methods.</p>
     */
    fp.ensure(
        'method.event',
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

        kModuleName = 'Method',

        /*
         * Method (event)
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * native
         */
        slice = attr(Array.prototype, 'slice');

    /**
    * @function {static} o2.Method.bindAsEventListener
    *
    * <p>Binds the given function as an event listener, ensuring that
    * the first parameter is always the event object.</p>
    *
    * <p>This method is generally used in conjunction with
    * {@link o2.Event.addEventListener}.</p>
    *
    * <p><strong>Usage example:</strong></p>
    *
    * <pre>
    * var $ = o2.$;
    * var listen = o2.Event.addEventListener;
    * var getTarget = o2.Event.getTarget;
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
    * @see o2.Event.addEventListener
    */
    exports.bindAsEventListener = def(me, 'bindAsEventListener', function() {
        var args    = slice.call(arguments),
            context = args.shift(),
            fn      = args.shift();

        return function(e) {
            args.unshift(e);

            return fn.apply(context, args);
        };
    });
}(this.o2, this.o2.protecteds));

