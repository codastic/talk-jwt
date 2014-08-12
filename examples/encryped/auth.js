var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var pw = require('../lib/pw');
var enc = require('../lib/enc');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

var users = {
    'mnug@testuser.invalid': {
        pw: pw.hash('supersafe'),
        id: 1
    }
}

app.post('/auth', function(req, res, next) {
    var email = req.body.email;
    var pass = req.body.password;

    var user = users[email];

    if(user === undefined) {
        return res.status(404);
    }

    if(pw.validate(pass, user.pw)) {
        return res.status(403);
    }

    var plainToken = JSON.stringify({
        isAdmin: true,
        sub: user.id
    });

    var token = jwt.sign({safe: enc.encrypt(plainToken, 'supersafe_secret')}, 'supersafe_secret', {
        expiresInMinutes: 120
    });

    res.status(200).json({
        access_token: token,
        user: {
            id: user.id
        }
    });

});

app.listen(5000);
