(function() {
    'use strict';

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
                    (Math.random() / (0.1 + Math.random())
                ) * len *Math.PI )
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

    function render() {
        var container = document.getElementById('Container'),
            i, len;

        for (i = 0, len = 20; i < len; i++) {
            container.innerHTML = '<h1>' +
                calculateIndex(i, container) +
                '</h1>';
        }
    }

    render();
}());
