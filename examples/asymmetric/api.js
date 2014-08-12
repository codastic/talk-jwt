var express = require('express');
var jwt = require('express-jwt');
var fs = require('fs');

var publicKey = fs.readFileSync('./keys/jwt.pub');

var app = express();
app.use(jwt({ secret: publicKey}));

app.get('/user', function(req, res, next) {
    res.status(200).json(req.user);
});

app.listen(5001);
