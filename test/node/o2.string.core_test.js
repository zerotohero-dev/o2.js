'use strict';

var core = require('../../src/o2/string/core');
var assert = require('assert');
var vows = require('vows');

vows.describe('o2.string.core').addBatch({
    'sayHi': {
        'when "sayHi()" is called': {
            topic: function() {
                return core.sayHi().toLowerCase().indexOf('hello') > -1;
            },
            'it should return a greeting': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
