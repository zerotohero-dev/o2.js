'use strict';

var then = require('o2.then/core');

var deferred = then.defer();

var promise = deferred.promise;

setTimeout(function() {
    deferred.resolve('geronimo!');
}, 1000);

promise.then(function(value) {
    console.log('Then 1 - ' + value);
});

promise.then(function(value) {
    console.log('Then 2 - ' + value);
});

promise.then(function(value) {
    console.log('Then 3 ' + value);

    return 42;
}).then(function(value) {
    var deferred = then.defer();

    var promise = deferred.promise;

    setTimeout(function() {
        deferred.resolve(value/2);
    }, 1000);

    return promise;
}).then(function(value) {
    console.log(value);
});
