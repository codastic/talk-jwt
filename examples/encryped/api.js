var express = require('express');
var jwt = require('express-jwt');
var fs = require('fs');
var enc = require('../lib/enc');

var app = express();
app.use(jwt({ secret: 'supersafe_secret'}));

app.get('/user', function(req, res, next) {

    var safe = JSON.parse(enc.decrypt(req.user.safe, 'supersafe_secret'));
    res.status(200).json(safe);
});

app.listen(5001);
