/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(o2, window) {
    'use strict';

    var classes = o2.protecteds.classes,

        /*
         * # Aliases
         */

        dbg    = o2.Debugger,
        assert = dbg.assert,
        log    = dbg.log,
        init   = dbg.init,
        error  = dbg.error,

        /*
         * # State Information
         */

        /*
         * Contains meta information about the modules to be tested.
         */
        queue   = [],

        /*
         * A stack of <code>RunPromise</code>s
         */
        promises = [],

        /*
         * Contains an aggregated data for the overall status of the test Suites
         * that have run so far.
         */
        state = {
            totalFailureCount : 0,
            totalSuccessCount : 0
        };

    /*
     *
     */
    (function initialize() {
        init('Output', false);

        var key     = null,
            itemKey = null,
            modules = {},
            items   = null;

        for (key in classes) {
            if (classes.hasOwnProperty(key)) {
                items = classes[key].items;

                for (itemKey in items) {
                    if (items.hasOwnProperty(itemKey)) {
                        modules[items[itemKey].MODULE] = items[itemKey].MODULE;
                    }
                }
            }
        }

        for (key in modules) {
            if (modules.hasOwnProperty(key)) {
                queue.push(key);
            }
        }
    }());

    /*
     *
     */
    var RunPromise = (function() {

        /*
         *
         */
        function incrementFailureCount() {
            state.totalFailureCount++;
        }

        /*
         *
         */
        function incrementSuccessCount() {
            state.totalSuccessCount++;
        }

        /*
         *
         */
        function RunPromise(file) {
            //TODO: magic number.
            this.state     = 0;
            this.file      = file;
            this.timerId   = null;
            this.delegates = [];
        }

        /*
         *
         */
        RunPromise.prototype.keep = function() {
            clearTimeout(this.timerId);

            var file            = this.file,
                id              = 0,
                kPromiseTimeout = 1000;

            log(['Started testing <b>"', this.file , '"</b>...'].join(''));

            if (!file) {
                this.reject();

                return;
            }

            var self = this;

            this.timerId = setTimeout(function() {
                error(['Rejecting <b>"', self.file,
                      '"</b>. Test suite timed out.'].join(''));

                self.reject();
            }, kPromiseTimeout);
        };

        /*
         *
         */
        RunPromise.prototype.reject = function() {
            clearTimeout(this.timerId);

            if (this.state !== 0) {
                throw 'Cannot reject a completed promise!';
            }

            this.state = 2;

            incrementFailureCount();

            for(var i = 0, len = this.delegates.length; i < len; i++) {
                this.delegates[i]();
            }

            window.scrollTop = window.scrollHeight;
        };

        /*
         *
         */
        RunPromise.prototype.resolve = function() {
            clearTimeout(this.timerId);

            if (this.state !== 0) {
                throw 'Cannot resolve a completed promise!';
            }

            this.state = 3;

            incrementSuccessCount();

            for(var i = 0, len = this.delegates.length; i < len; i++) {
                this.delegates[i]();
            }

            window.scrollTop = window.scrollHeight;
        };

        /*
         *
         */
        RunPromise.prototype.always = function(delegate) {
            this.delegates.push(delegate);
        };

        return { klass : RunPromise };
    }()).klass;

    /*
     *
     */
    var Runner = (function() {
        var isRunnerInited = false;

        /*
         *
         */
        var Runner = {

            /*
             *
             */
            init : function() {
                if (isRunnerInited) {
                    return Runner;
                }

                o2.Debugger.init('Output', false);

                isRunnerInited = true;

                log('Initialized Runner');

                return Runner;
            },

            /*
             *
             */
            run : function() {
                if (!isRunnerInited) {throw 'Initialize Runner first.';}

                var promise = new RunPromise(queue.pop());

                document.getElementById('TestFrame').src = [
                    'suite/html/o2.', promise.file, '.html'
                ].join('')

                promises.push(promise);

                promise.always(function() {
                    if (queue.length === 0) {
                        assert(state.totalFailureCount === 0, [
                            '<p><b>All done!</b> ',
                            'Total failure count: <b>',
                            state.totalFailureCount, '</b>, ',
                            'Total success count: <b>',
                            state.totalSuccessCount, '</b>.</p>'
                        ].join(''));

                        return;
                    }

                    Runner.run();
                });

                promise.keep();

                return Runner;
            }
        };

        return { klass : Runner };
    }()).klass.init().run();

    /*
     *
     */
    (function(window, promises) {

        function findPromise(file) {
            var i       = 0,
                len     = promises.length,
                promise = null;

            for (i = 0; i < len; i++) {
                promise = promises[i];

                if (promise.file === file) {
                    return promise;
                }
            }

            return null;
        }

        function deletePromise(promise) {
            var i              = 0,
                len            = promises.length,
                currentPromise = null;

            for (i = 0; i < len; i++) {
                currentPromise = promises[i];

                if (currentPromise === promise) {
                    promises.splice(i, 1);

                    return;
                }
            }

            return;
        }

        function isTimedOut(file) {
            var promise = findPromise(file);

            if (!promise           ) {return true;}
            if (promise.state !== 0) {return true;}

            return false;
        }

        function extractMethodNames(file) {
            var methods = [],
                classes = o2.protecteds.classes,
                items   = null,
                item    = null,
                itemKey = null,
                key     = null;

            for (key in classes) {
                if (classes.hasOwnProperty(key)) {
                    items = classes[key].items;

                    for (itemKey in items) {
                        if (items.hasOwnProperty(itemKey)) {
                            item = items[itemKey];

                            if (item.MODULE === file) {
                                methods.push(itemKey);
                            }
                        }
                    }
                }
            }

            return methods;
        }

        /*
         * Runner extends Observer
         */
        window.Runner = {
            notify : function(meta) {
                if (!meta) {throw 'Subject does not have meta information';}

                var file = meta.subject.file;

                switch (meta.action) {
                    case 'loaded':

                        // Promise has already been processed.
                        //TODO: rename method.
                        if (isTimedOut(file)) {
                            return;
                        }

                        var promise = findPromise(file);

                        if (!promise) {
                            log(meta);

                            throw 'Promise not found!';
                        }

                        var cases = meta.subject.cases;
                        var subject = meta.subject;

                        if (!cases) {
                            error(['Rejecting <b>"', file,
                                '"</b>. Suite does not have',
                                '<strong>cases</strong> defined.'
                            ].join(''));

                            promise.reject();

                            return;
                        }

                        var methods = extractMethodNames(file);

                        var i      = 0,
                            len    = 0,
                            method = '';

                        for (i = 0, len = methods.length; i < len; i++) {
                            method = methods[i];

                            if (!cases[method]) {
                                error(['Rejecting <b>"', file,
                                    '"</b>. Suite does not have <b>"',
                                    method ,'"</b> defined in its cases.'
                                ].join(''));

                                promise.reject();

                                return;
                            }
                        }

                        promise.resolve();

                        deletePromise(promise);

                        return;
                    default:
                        return;
                }
            }
        };
    }(window, promises));
}(this.o2, this));

