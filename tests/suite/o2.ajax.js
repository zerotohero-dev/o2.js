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

            add('#1 o2.Ajax.post SHOULD receive a proper response if the request is on the same domain.', {
                count : 1,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, responseText, '0', 'responseText is okay.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();
                        }

                    });

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('#2 o2.Ajax.post SHOULD return an object and the object should be passed to success callback.', {
                count : 2,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, request, transport, 'request is transport.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    assertStrictEqual(me, ( typeof request), 'object', 'request is an object.');

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.post SHOULD have a "complete" flag, set to true when a response is received.', {
                count : 2,
                test : function() {

                    var me = this;

                    var isComplete = null;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, request.isComplete, true, 'request is complete.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    assertStrictEqual(me, (request.isComplete), false, 'request is not complete.');

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.post SHOULD be able to send cross-domain requests, if an options header is set.', {
                count : 1,
                test : function() {

                    var me = this;

                    var url = 'http://external.o2js.com/o2.js/tests/service/service.php';
                    var params = {
                        options : 1
                    };

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, responseText, '0', 'cross-domain request has been completed successfully.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.post SHOULD clean up initial XHR object, when request is complete with success.', {
                count : 3,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request has been completed successfully.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');

                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.post SHOULD clean up initial XHR object, when request is complete with error.', {
                count : 3,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {
                        error : 1
                    };

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, false, 'Request successfully completed.');
                            me.terminate();

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, true, 'An error has occured.');

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');

                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.post SHOULD clean up initial XHR object, when request is complete with exception.', {
                count : 4,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request successfully completed.');

                            this.will.create.an.exception._.thats.the.point(';)');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, true, 'An exception has occured.');

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');
                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.post SHOULD be able to send and receive UTF-8 data without loss.', {
                count : 4,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {
                        data : 'iüğşçöİÜĞŞÇÖIı',
                        echo : 1
                    };

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request has been completed successfully.');

                            assert(me, responseText == params.data, 'Data has been received without loss.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');
                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.post SHOULD be able to send sync requests.', {
                count : 4,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var sequence = '';

                    var request = o2.Ajax.post(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request has been completed successfully.');
                            sequence += '1';

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    }, true);
                    sequence += '2';

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');
                        assert(me, sequence == '12', 'Sequence is correct.');
                        me.terminate();

                    }, 1000);

                }

            });

            /*-----------*/

            add('o2.Ajax.get SHOULD receive a proper response if the request is on the same domain.', {
                count : 1,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, responseText, '0', 'responseText is okay.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();
                        }

                    });

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.get SHOULD return an object and the object should be passed to success callback.', {
                count : 2,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, request, transport, 'request is transport.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    assertStrictEqual(me, ( typeof request), 'object', 'request is an object.');

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.get SHOULD have a "complete" flag, set to true when a response is received.', {
                count : 2,
                test : function() {

                    var me = this;

                    var isComplete = null;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, request.isComplete, true, 'request is complete.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    assertStrictEqual(me, (request.isComplete), false, 'request is not complete.');

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.get SHOULD be able to send cross-domain requests, if an options header is set.', {
                count : 1,
                test : function() {

                    var me = this;

                    var url = 'http://external.o2js.com/o2.js/tests/service/service.php';
                    var params = {
                        options : 1
                    };

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assertStrictEqual(me, responseText, '0', 'cross-domain request has been completed successfully.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        if(!request.isComplete) {
                            assert(me, false, 'Request has timed out.');
                        }

                        me.terminate();

                    }, 5000);

                }

            });

            add('o2.Ajax.get SHOULD clean up initial XHR object, when request is complete with success.', {
                count : 3,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request has been completed successfully.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');

                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.get SHOULD clean up initial XHR object, when request is complete with error.', {
                count : 3,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {
                        error : 1
                    };

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, false, 'Request successfully completed.');
                            me.terminate();

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, true, 'An error has occured.');

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');

                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.get SHOULD clean up initial XHR object, when request is complete with exception.', {
                count : 4,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request successfully completed.');

                            this.will.create.an.exception._.thats.the.point(';)');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, true, 'An exception has occured.');

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');
                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.get SHOULD be able to send and receive UTF-8 data without loss.', {
                count : 4,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {
                        data : 'iüğşçöİÜĞŞÇÖIı',
                        echo : 1
                    };

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request has been completed successfully.');

                            assert(me, responseText == params.data, 'Data has been received without loss.');

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    });

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');
                        me.terminate();

                    }, 1000);

                }

            });

            add('o2.Ajax.get SHOULD be able to send sync requests.', {
                count : 4,
                test : function() {

                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var sequence = '';

                    var request = o2.Ajax.get(url, params, {

                        oncomplete : function(responseText, responseXml, transport) {

                            assert(me, true, 'Request has been completed successfully.');
                            sequence += '1';

                        },

                        onerror : function(status, statusText, transport) {

                            assert(me, false, 'An error has occured.');
                            me.terminate();

                        },

                        onexception : function(exception, transport) {

                            assert(me, false, 'An exception has occured.');
                            me.terminate();

                        }

                    }, true);

                    //
                    sequence += '2';

                    setTimeout(function() {

                        assert(me, request.isComplete, 'Request has been timely processed.');
                        assert(me, request.isFinalized, 'Request has been cleaned up successfully.');
                        assert(me, sequence == '12', 'Sequence is correct.');
                        me.terminate();

                    }, 1000);

                }

            });

            /*-------------------*/

            add('o2.Ajax.createXhr SHOULD return an object.', {
                count : 1,
                test : function() {

                    var me = this;

                    var xhr = o2.Ajax.createXhr();

                    assert(me, typeof xhr == 'object', 'xhr is an object.');

                }

            });

            run(parent && parent.Runner && parent.Runner.processCompletedSuite);

        }

    };

    Suite.init();

}(o2, this));
