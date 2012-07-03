var express = require('express');

console.log('hello');

var app = express.createServer();

app.use(express.static(__dirname + '/static'));

app.get('/api/v.0.1/login', function(req, res) {
    res.send('hello authentication');
});

app.listen(80);