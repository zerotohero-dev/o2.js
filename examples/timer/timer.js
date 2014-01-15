define([
    '../../amd/o2/debug/core',
    '../../amd/o2/timer/core'
], function(
    debugUtil,
    timer
) {
    'use strict';

    var log = debugUtil.log;

    timer.initialize();

    /**
     * The specifics of this function is not important.
     * This is just a function that intentionally takes too long to execute.
     *
     * @param {Element} container
     *
     * @returns {string}
     */
    function longOperation(container) {
        var i, len;

        for (i = 0, len = 1000000; i < len; i++) {
            container.setAttribute('foo',
                '' + Math.sin(
                        (Math.random() / (0.1 + Math.random())) * len * Math.PI
                    )
            );
        }

        return container.getAttribute('foo');
    }

    /**
     *
     * @param {Integer} i
     * @param {Element} container
     *
     * @returns {string}
     */
    function calculateIndex(i, container) {
        return (i + 1) + '.' + longOperation(container);
    }

    /**
     *
     */
    function render() {
        var i = 0, len = 20;

        timer.setTimeout(function loop() {
            var container = document.getElementById('Container');

            container.innerHTML = '<h1>' +
                calculateIndex(i, container) +
                '</h1>';

            log('set innerHTML to: "' + container.innerHTML + '"');

            i++;

            if(i <= len) {
                timer.setTimeout(loop, 0);
            }
        }, 0);
    }

// multiplexing test.
//    for(var i = 0; i < 30; i++) {
//        (function(i) {
//            //console.log("in for " + i);
//            timer.setTimeout(function() {
//                console.log("timed out " + i);
//            });
//        }(i));
//    }


    //render();
});
