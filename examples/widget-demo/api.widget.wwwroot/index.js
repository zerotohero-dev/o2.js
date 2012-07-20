/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-20 16:21:28.592534
 * -->
 */

var express = require('express');

var app = express.createServer();

var kOneYear = 31536000000;

/*
 * Make sure that the static assets have a far future expiration date.
 */
app.use(express.static(__dirname + '/static', {maxAge : kOneYear}));

/*
 * Set path to the views (template) directory
 */
app.set('views', './views');

/**
 *
 */
app.get('/api/v.0.1/login', function(req, res) {
    res.send('hello authentication');
});

/**
 *
 */
app.get('/api/v.0.1/update', function(req, res) {
    res.header('Content-Type', 'text/html');
    res.header('Cache-Control', 'public, max-age=0');
    res.header('Expires', new Date(Date.now()).toUTCString());

    res.render('update.jade', {
        apiBootstrapUrl : 'http://api.widget.www/api.v.0.1.js'
    });
});

/**
 * Beacon to validate the cache of the JS API.
 */
app.get('/api/v.0.1/beacon', function(req, res) {
    res.header('Content-Type', 'text/javascript');

    var kOneMinute = 60;

    res.header('Cache-Control', 'public, max-age=' + kOneMinute);
    res.header('Expires',
        new Date(Date.now() + kOneMinute * 1000).toUTCString()
    );

    var versionTimestamp   = '20120720135547909116';
    var requestedVersion = req.param('v', versionTimestamp);

    if (requestedVersion !== versionTimestamp) {
        res.render('js/update.jade', {
            iframeUrl : 'http://api.widget.www/api/v.0.1/update'
        });

        return;
    }

    res.send(204);
});

app.listen(80);