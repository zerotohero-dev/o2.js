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

app.use(express.static(__dirname + '/static', {maxAge : ONE_YEAR}));

app.get('/api/v.0.1/login', function(req, res) {
    res.send('hello authentication');
});

app.listen(80);