'use strict';

/*
 * o2.js JavaScript Framework (http://o2js.com - info@o2js.com)
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

var then = require('o2.then/core'),
    deferred = then.defer(),
    promise = deferred.promise;

setTimeout(function() {
    deferred.resolve('o2js.com:');
}, 1000);

promise.then(function(value) {
    console.log(value);

    var deferred = then.defer();

    setTimeout(function() {
        deferred.resolve(value + ' A coherent');
    }, 1000);

    promise = deferred.promise;

    promise.then(function(value) {
        console.log(value);

        var deferred = then.defer();

        setTimeout(function() {
            deferred.resolve(value + ' solution');
        }, 2000);

        return deferred.promise.then(function(value) {
            return value + ' to your JavaScript';
        });
    }).then(function(value) {
        console.log(value);

        return value + ' dilemma!';
    }).then(function(value) {
        console.log(value);
    });

    return promise;
}).then(function(value) {
    console.log(value);
});

promise.then(function(value) {
    console.log(value);
});
