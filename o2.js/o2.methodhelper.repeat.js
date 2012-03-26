/**
 * @module   methodhelper.repeat
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-15 08:36:50.239049
 * -->
 *
 * <p>A <code>Function</code> helper for stuff repetitive method calls.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');

    /*
     * Module Name
     */
    var kModuleName = 'MethodHelper';

    /*
     * MethodHelper (repeat)
     */
    var me = create(kModuleName);

    /**
     * @function {static} o2.MethodHelper.after
     *
     * <p>Creates a <code>Function</code> that only executes after being called
     * <strong>count</strong> times.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Integer} count - the numer of calls required to the
     * <code>Function</code> before executing it.
     * @param {Function} delegate - the delegate to execute.
     *
     * @return a <code>Function</code> that will only execute after being
     * called <strong>count</strong> times.
     */
    def(me, 'after', function(count, delegate) {
        if (count <= 0) {
            return;
        }

        return function() {
            count--;

            var context = this;
            var args = arguments;

            if (count < 1) {
                return delegate.apply(context, args);
            }
        };
    });

    /**
     * @function {static} o2.MethodHelper.once
     *
     * <p>Creates a <code>Function</code> that will only get called once.<p>
     * <p>May be useful for creating <strong>singleton</strong>
     * <code>Object</code>s, or for lazy-loading modules.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
     * </pre>
     *
     * @param {Function} delegate - the <code>Function</code> to execute.
     *
     * @return a <code>Function</code> that will execute only once.
     */
    def(me, 'once', function(delegate) {
        var did = false;
        var cache = null;

        return function() {
            var context = this;
            var args = arguments;

            if (did) {
                return cache;
            }

            did = true;

            cache = delegate.apply(context, args);

            return cache;
        };
    });

    /**
     * @function {static} o2.MethodHelper.times
     *
     * <p>Sequentially executes a given <code>Function</code> given amount
     * of times.</p>
     *
     * <p>Usage example:</p>
     *
     * <pre>
     * //TODO: add usage example.
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
    def(me, 'times', function(count, delegate, context, payload) {
        var i = 0;

        for (i = 0; i < count; i++) {
            delegate.apply(context, [i, payload]);
        }
    });
}(this.o2));
