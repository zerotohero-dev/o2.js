/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */
(function(o2, window) {
    'use strict';

    /*
     * Aliases.
     */
    var add = o2.Unit.add;
    var run = o2.Unit.run;
    var assertStrictEqual = o2.Unit.assertStrictEqual;
    var assert = o2.Unit.assert;
    var setTimeout = window.setTimeout;

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

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {
                        oncomplete : function(responseText) {
                            assertStrictEqual(me, responseText, '0', 'responseText is okay.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
                        }

                        me.terminate();
                    }, 5000);
                }
            });

            add('o2.Ajax.post SHOULD return an object and the object should be passed to success callback.', {
                count : 2,
                test : function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {
                        oncomplete : function(responseText, responseXml, transport) {
                            var dummy = null;
                            dummy = responseText;
                            dummy = responseXml;
                            assertStrictEqual(me, request, transport, 'request is transport.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    assertStrictEqual(me, ( typeof request), 'object', 'request is an object.');

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
                        }

                        me.terminate();
                    }, 5000);
                }
            });

            add('o2.Ajax.post SHOULD have a "complete" flag, set to true when a response is received.', {
                count : 2,
                test : function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.post(url, params, {
                        oncomplete : function() {
                            assertStrictEqual(me, request.isComplete, true, 'request is complete.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    assertStrictEqual(me, (request.isComplete), false, 'request is not complete.');

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
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
                        oncomplete : function(responseText) {
                            assertStrictEqual(me, responseText, '0', 'cross-domain request is completed successfully.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
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
                        oncomplete : function() {
                            assert(me, true, 'Request is completed successfully.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');

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
                        oncomplete : function() {
                            assert(me, false, 'Request successfully completed.');
                            me.terminate();
                        },
                        onerror : function() {
                            assert(me, true, 'An error occured.');
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');

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
                        oncomplete : function() {
                            assert(me, true, 'Request successfully completed.');
                            this.will.create.an.exception._.thats.the.point(';)');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, true, 'An exception occured.');
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');
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
                        oncomplete : function(responseText) {
                            assert(me, true, 'Request is completed successfully.');
                            assert(me, responseText === params.data, 'Data is received without loss.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');
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
                        oncomplete : function() {
                            assert(me, true, 'Request is completed successfully.');
                            sequence += '1';
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    }, true);

                    sequence += '2';

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');
                        assert(me, sequence === '12', 'Sequence is correct.');
                        me.terminate();
                    }, 1000);
                }
            });

            add('o2.Ajax.get SHOULD receive a proper response if the request is on the same domain.', {
                count : 1,
                test : function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {
                        oncomplete : function(responseText) {
                            assertStrictEqual(me, responseText, '0', 'responseText is okay.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
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
                            var dummy = null;
                            dummy = responseText;
                            dummy = responseXml;

                            assertStrictEqual(me, request, transport, 'request is transport.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    assertStrictEqual(me, ( typeof request), 'object', 'request is an object.');

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
                        }

                        me.terminate();
                    }, 5000);
                }

            });

            add('o2.Ajax.get SHOULD have a "complete" flag, set to true when a response is received.', {
                count : 2,
                test : function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {};

                    var request = o2.Ajax.get(url, params, {
                        oncomplete : function() {
                            assertStrictEqual(me, request.isComplete, true, 'request is complete.');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    assertStrictEqual(me, (request.isComplete), false, 'request is not complete.');

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
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
                        oncomplete : function(responseText) {
                            assertStrictEqual(me, responseText, '0', 'cross-domain request is completed successfully.');
                        },
                        onerror : function() {
                            //TODO: would it be better if we use me.assert(bln, str)
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        if(!request.isComplete) {
                            assert(me, false, 'Request timed out.');
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
                        oncomplete : function() {
                            assert(me, true, 'Request is completed successfully.');
                        },

                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },

                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');

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
                        oncomplete : function() {
                            assert(me, false, 'Request successfully completed.');
                            me.terminate();
                        },

                        onerror : function() {
                            assert(me, true, 'An error occured.');
                        },

                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');

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
                        oncomplete : function() {
                            assert(me, true, 'Request successfully completed.');
                            this.will.create.an.exception._.thats.the.point(';)');
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, true, 'An exception occured.');
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');
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
                        oncomplete : function(responseText) {
                            assert(me, true, 'Request is completed successfully.');
                            assert(me, responseText === params.data, 'Data is received without loss.');
                        },

                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },

                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');
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
                        oncomplete : function() {
                            assert(me, true, 'Request is completed successfully.');
                            sequence += '1';
                        },
                        onerror : function() {
                            assert(me, false, 'An error occured.');
                            me.terminate();
                        },
                        onexception : function() {
                            assert(me, false, 'An exception occured.');
                            me.terminate();
                        }
                    }, true);

                    sequence += '2';

                    setTimeout(function() {
                        assert(me, request.isComplete, 'Request is timely processed.');
                        assert(me, request.isFinalized, 'Request is cleaned up successfully.');
                        assert(me, sequence === '12', 'Sequence is correct.');
                        me.terminate();
                    }, 1000);
                }
            });

            add('o2.Ajax.createXhr SHOULD return an object.', {
                count : 1,
                test : function() {
                    var me = this;

                    var xhr = o2.Ajax.createXhr();

                    assert(me, typeof xhr === 'object', 'xhr is an object.');
                }
            });

            add('o2.Ajax SHOULD return to onerror handler, after aborting a request', {
                count: 1,
                test: function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {wait : true};
                    var isDone = false;

                    var request = o2.Ajax.get(url, params, {
                        onerror: function() {
                            isDone = true;
                            assert(me, true, 'onerror fired.');
                            me.terminate();
                        }
                    });

                    setTimeout(function() {
                        request.abort();
                    }, 500);

                    setTimeout(function() {
                        assertStrictEqual(me, isDone, true, 'Request is timely processed.');
                        me.terminate();
                    }, 2000);
                }
            });

            add('o2.Ajax SHOULD be able to send a second request, after aborting the first.', {
                count: 2,
                test: function() {
                    var me = this;

                    var url = 'service/service.php';
                    var params = {wait : true};

                    var request = o2.Ajax.get(url, params, {
                        onerror: function() {
                            assert(me, true, 'onerror of first request fired.');
                        }
                    });

                    setTimeout(function() {
                        request.abort();

                        params = {};

                        request = o2.Ajax.get(url, params, {
                            oncomplete: function() {
                                assert(me, true, 'oncomplete of second request fired.');
                                me.terminate();
                            }
                        });
                    }, 500);

                    setTimeout(function() {
                        assert(me, false, 'Request timed out.');
                        me.terminate();
                    }, 2000);
                }
            });

            run(window.parent && window.parent.Runner && window.parent.Runner.processCompletedSuite);
        }
    };

    Suite.init();
}(this.o2, this));
