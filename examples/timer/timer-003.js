(function() {
    'use strict';

    var container = document.getElementById('Container'),
        i = 0, len, timer;


    function longOperation() {
        var i, len;

        for (i = 0, len = 1000000; i < len; i++) {
            container.setAttribute('foo', Math.sin((Math.random()/(0.1+Math.random()))*len*Math.PI));
        }

        return container.getAttribute('foo');
    }

    function calculateIndex() {
        return (i + 1) + '.' + longOperation();
    }

    function loop() {
        if ( i > 20 ) {
            return;
        }

        timer = window.requestAnimationFrame(loop);

        i++;

        container.innerHTML = '<h1>' + calculateIndex() + '</h1>';
    }

    loop();
}());
