var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var fs = require('fs');
var pw = require('../lib/pw');

var SECRET = 'supersafe_secret'

var app = express();

app.use(expressJwt({ secret: SECRET}).unless({path: ['/auth']}));
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

    var token = jwt.sign({}, SECRET, {
        algorithm: 'HS256',
        expiresInMinutes: 120,
        subject: user.id
    });

    res.status(200).json({
        access_token: token,
        user: {
            id: user.id
        }
    });

});

app.get('/user', function(req, res, next) {
    res.status(200).json(req.user);
});

app.listen(5000);
