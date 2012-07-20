/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-07-09 00:48:16.229892
 * -->
 */

var express = require('express');

var app = express.createServer();

var ONE_YEAR = 31536000000;

/**
 * Make sure that the static assets have a far future expiration date.
 */
app.use(express.static(__dirname + '/static', {maxAge : ONE_YEAR}));

// Set path to the views (template) directory
app.set('views', './views');

app.get('/api/v.0.1/login', function(req, res) {
    res.send('hello authentication');
});

/**
 * Beacon to validate the cache of the JS API.
 */
app.get('/api/v.0.1/beacon', function(req, res) {
    var currentVersion   = 'v.0.1';
    var requestedVersion = req.param('v', currentVersion);

    if (requestedVersion !== currentVersion) {
        res.header('Content-Type', 'text/javascript');

        res.render('update.jade');

        return;
    }

    res.send(204);
});

app.listen(80);