var express = require('express');

console.log('hello');

var app = express.createServer();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.send([

        '<!doctype html>',
        '<html>',
        '<head>',
        '</head>',
        '<body>',
        '<h2>Welcome to Publisher Website</h2>',
        '</body>',
        '</html>'

    ].join(''));
});

app.listen(8080);