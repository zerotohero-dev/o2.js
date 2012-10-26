/**
 * @module   method.repeat
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>A <code>Function</code> helper for stuff repetitive method calls.</p>
 */
(function(framework, fp) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('method.repeat', ['core']);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'Method',

        /*
         * Method (repeat)
         */
        me = create(kModuleName);

    /**
     * @function {static} o2.Method.after
     *
     * <p>Creates a <code>Function</code> that only executes after being called
     * <strong>count</strong> times.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var bump = o2.Method.after(3, function() {
     *      console.log('bump');
     * });
     *
     * bump();bump();bump();bump();
     * // Will log 'bump' only once.
     * </pre>
     *
     * @param {Integer} count - the numer of calls required to the
     * <code>Function</code> before executing it.
     * @param {Function} delegate - the delegate to execute.
     *
     * @return a <code>Function</code> that will only execute after being
     * called <strong>count</strong> times.
     */
    exports.after = def(me, 'after', function(count, delegate) {
        if (count <= 0) {return;}

        return function() {
            count--;

            var context = this,
                args   = arguments;

            if (count < 1) {
                return delegate.apply(context, args);
            }
        };
    });

    /**
     * @function {static} o2.Method.once
     *
     * <p>Creates a <code>Function</code> that will only get called once.<p>
     * <p>May be useful for creating <strong>singleton</strong>
     * <code>Object</code>s, or for lazy-loading modules.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var init = o2.Method.once(function() {
     *      console.log('done');
     * });
     *
     * init();init();
     * // Will log 'done' only once.
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to execute.
     *
     * @return a <code>Function</code> that will execute only once.
     */
    exports.once = def(me, 'once', function(delegate) {
        var did   = false,
            cache = null;

        return function() {
            var context = this,
                args    = arguments;

            if (did) {return cache;}

            did   = true;
            cache = delegate.apply(context, args);

            return cache;
        };
    });

    /**
     * @function {static} o2.Method.times
     *
     * <p>Sequentially executes a given <code>Function</code> given amount
     * of times.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Method.times(3, function(i) {
     *   console.log(i);
     * });
     * // Will log:
     * // 0
     * // 1
     * // 2
     * </pre>
     *
     * @param {Integer} count - number of times to execute.
     * @param {Function} delegate - the <code>Function</code> to execute (in
     * the form <code>function(i, payload)</code>).
     * @param {Object} context - what should <code>this</code> refer to inside
     * the <code>Function</code>.
     * @param {Object} payload - the <code>Object</code> to pass to the
     * <strong>delegate</strong> as a second argument.
     */
    exports.times = def(me, 'times', function(count, delegate, context,
                payload) {
        var i = 0;

        for (i = 0; i < count; i++) {
            delegate.apply(context, [i, payload]);
        }
    });
}(this.o2, this.o2.protecteds));
